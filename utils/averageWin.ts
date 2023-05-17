import { TradesList } from "../zods/thetaGangResponseJsonSchema.ts";
import { round } from "https://deno.land/x/math/mod.ts";

const averageWin = (trades: TradesList): number => {
  // Calculate average win amount
  const winAmounts = [];
  for (const trade of trades) {
    if (trade.win) {
      winAmounts.push(parseInt(trade.profitLoss as string));
    }
  }
  const winSum = winAmounts.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const averageWinAmount = winSum / winAmounts.length;
  return parseInt(round(averageWinAmount, 0));
};

export default averageWin;
