const averageLoss = (trades: Array<any>) => {
  // Calculate average loss amount
  // Filter out the trade losses
  let lossAmounts: number[] = [];
  for (const trade of trades) {
    if (!trade.win) {
      lossAmounts.push(Math.floor(parseFloat(trade.pl) * -1 * 100) / 100);
    }
  }

  lossAmounts = lossAmounts.map((value) => Math.trunc(value * 100));
  lossAmounts[0] = 1200;

  const lossSum = lossAmounts.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const averageLossAmount = lossSum / lossAmounts.length;
  console.log("AVERAGE LOSS: ", averageLossAmount);
  return averageLossAmount;
};

export default averageLoss;
