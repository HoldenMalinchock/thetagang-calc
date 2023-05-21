import { Handlers, PageProps } from "$fresh/server.ts";
import averageLoss from "../../utils/averageLoss.ts";
import averageWin from "../../utils/averageWin.ts";
import getWinPercentageByTradeType from "../../utils/getWinPercentageByTradeType.ts";
import { Head } from "$fresh/runtime.ts";
import { TradeTypeWins } from "../../components/TradeTypeWins.tsx";
import { Card } from "../../components/Card.tsx";
import { Header } from "../../components/Header.tsx";
import { WinRateCalc } from "../../components/WinRateCalc.tsx";
import { thetaGangResponseV1JsonSchema } from "../../zods/thetaGangResponseJsonSchema.ts";
import { thetaGangResponseV3JsonSchema } from "../../zods/thetaGangResponseJsonSchema.ts";
import YearlyBarChart from "../../components/YearlyProfitChart.tsx";

import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

type ThetaGangResponseV1JsonSchema = z.infer<
  typeof thetaGangResponseV1JsonSchema
>;

type ThetaGangResponseV3JsonSchema = z.infer<
  typeof thetaGangResponseV3JsonSchema
>;

interface TradeWinsResponse {
  [key: string]: { total: number; wins: number; winPercentage?: number };
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    // We need to provde some zod schema to validate the response
    // This api's trades are not accurate anymore
    const respProfile = await fetch(
      `https://api.thetagang.com/trades?username=${username}`,
    );
    if (respProfile.status === 400) {
      return ctx.render(null);
    }

    // The old API does not hold all trades, it seems to only update every so often.
    // So we will make a second call to the new API to get our updated trades
    const respTrades = await fetch(
      `https://api3.thetagang.com/trades?username=${username}`,
    );
    if (respTrades.status === 400) {
      return ctx.render(null);
    }

    const trades = await respTrades.json();
    const profile = await respProfile.json();
    trades.data = trades.data.filter((e: any) => {
      return e !== undefined;
    });
    profile.data.trades = trades.data;
    thetaGangResponseV1JsonSchema.parse(profile);
    thetaGangResponseV3JsonSchema.parse(trades);

    const winAmount = averageWin(trades.data);
    const lossAmount = averageLoss(trades.data);
    const tradeWins = getWinPercentageByTradeType(trades.data);
    return ctx.render({ profile, username, winAmount, lossAmount, tradeWins });
  },
};

export default function Page(
  { data }: PageProps<
    {
      profile: ThetaGangResponseV1JsonSchema;
      username: string;
      winAmount: number;
      lossAmount: number;
      tradeWins: TradeWinsResponse;
    }
  >,
) {
  if (!data) {
    return <h1>User not found</h1>;
  }
  return (
    <div class="w-full h-screen flex flex-col items-center bg-[#1C1E25] text-[#DADADA] font-mono">
      <Header />
      <Card>
        <Head>
          <title>{data.username}</title>
        </Head>
        <h1 class="my-1">User: {data.username}</h1>
        <table class="table-auto">
          <tbody>
            <tr>
              <td class="pr-3">Average Win:</td>
              <td
                className={data.winAmount > 0
                  ? "text-[#0FCE18]"
                  : "text-[#FF0000]"}
              >
                ${data.winAmount}
              </td>
            </tr>
            <tr>
              <td class="pr-3">Average Loss:</td>
              <td
                className={data.lossAmount < data.winAmount
                  ? "text-[#0FCE18]"
                  : "text-[#FF0000]"}
              >
                ${data.lossAmount}
              </td>
            </tr>
            <tr>
              <td class="pr-3">Win Percentage:</td>
              <td
                className={parseInt(data.profile.data.metadata.winPercentage) >
                    50
                  ? "text-[#0FCE18]"
                  : "text-[#FF0000]"}
              >
                {data.profile.data.metadata.winPercentage}%
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
      <TradeTypeWins tradeWins={data.tradeWins} />
      <WinRateCalc
        winAmount={data.winAmount}
        lossAmount={data.lossAmount}
        winPercentage={data.profile.data.metadata.winPercentage}
      />
      <YearlyBarChart metadata={data.profile.data.metadata} />
    </div>
  );
}
