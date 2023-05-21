import { TradesList } from "../zods/thetaGangResponseJsonSchema.ts";
import { round } from "https://deno.land/x/math/mod.ts";

// Makes sense to use a type here given that we have already parsed this data before it gets here
const averageLoss = (listOfTrades: TradesList): number => {
  // Calculate average loss amount
  // Filter out the trade losses trade.win tells us if its a win or not, if its false its a loss and null is a trade that is still open or buying common stock
  const lossAmounts: number[] = [];
  for (const trade of listOfTrades) {
    if (trade === null) continue;
    if (!trade.win) {
      if (trade.profitLoss === null) continue;

      // We have issues where this is sometimes a number
      if (typeof trade.profitLoss === "number") {
        lossAmounts.push(trade.profitLoss);
      } else {
        lossAmounts.push(parseInt((trade.profitLoss as string).slice(1)));
      }
    }
  }
  const lossSum = lossAmounts.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const averageLossAmount = lossSum / lossAmounts.length;
  return parseInt(round(averageLossAmount, 0));
};

export default averageLoss;
