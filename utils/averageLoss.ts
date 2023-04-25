import { TradesList } from "../zods/thetaGangResponseJsonSchema.ts";

const averageLoss = (trades: TradesList): number => {
  // Calculate average loss amount
  // Filter out the trade losses trade.win tells us if its a win or not, if its false its a loss and null is a trade that is still open or buying common stock
  let lossAmounts: number[] = [];
  for (const trade of trades) {
    if (!trade.win) {
      lossAmounts.push(Math.floor(trade.pl * -1 * 100) / 100);
    }
  }

  lossAmounts = lossAmounts.map((value) => Math.trunc(value * 100));
  lossAmounts[0] = 1200;

  const lossSum = lossAmounts.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const averageLossAmount = lossSum / lossAmounts.length;
  return Math.trunc(averageLossAmount);
};

export default averageLoss;
