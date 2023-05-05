import { Handlers, PageProps } from "$fresh/server.ts";
import averageLoss from "../../utils/averageLoss.ts";
import averageWin from "../../utils/averageWin.ts";
import getWinPercentageByTradeType from "../../utils/getWinPercentageByTradeType.ts";
import { Head } from "$fresh/runtime.ts";
import { TradeTypeWins } from "../../components/TradeTypeWins.tsx";
import { Card } from "../../components/Card.tsx";
import { Header } from "../../components/Header.tsx";
import { WinRateCalc } from "../../components/WinRateCalc.tsx";
import { thetaGangResponseJsonSchema } from "../../zods/thetaGangResponseJsonSchema.ts";
import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";

type ThetaGangResponseJsonSchema = z.infer<
  typeof thetaGangResponseJsonSchema
>;

interface TradeWinsResponse {
  [key: string]: { total: number; wins: number; winPercentage?: number };
}

export const handler: Handlers = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    // We need to provde some zod schema to validate the response
    const resp = await fetch(
      `https://api.thetagang.com/trades?username=${username}`,
    );
    if (resp.status === 400) {
      return ctx.render(null);
    }
    const profile = await resp.json();
    // Todo We need to do something if the parse fails
    thetaGangResponseJsonSchema.parse(profile);
    const winAmount = averageWin(profile.data.trades);
    const lossAmount = averageLoss(profile.data.trades);
    const tradeWins = getWinPercentageByTradeType(profile.data.trades);
    return ctx.render({ profile, username, winAmount, lossAmount, tradeWins });
  },
};

export default function Page(
  { data }: PageProps<
    {
      profile: ThetaGangResponseJsonSchema;
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
    </div>
  );
}
