// TODO we should use zod to validate the data we are getting back so we can use types for our app
const averageWin = (trades: Array<any>) => {
  // Calculate average win amount
  let winAmounts = [];
  for (const trade of trades) {
    if (trade.win) {
      winAmounts.push(Math.floor(trade.pl * 100) / 100);
    }
  }

  winAmounts = winAmounts.map((value) => Math.trunc(value * 100));

  const winSum = winAmounts.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);

  const averageWinAmount = winSum / winAmounts.length;
  console.log("AVERAGE WIN: ", Math.trunc(averageWinAmount));
  return Math.trunc(averageWinAmount);
};

export default averageWin;
