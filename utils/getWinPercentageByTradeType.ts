// TODO we should use zod to validate the data we are getting back so we can use types for our app
const getWinPercentageByTradeType = (trades: Array<any>) => {
  // Calculate wins by the type
  // We will keep track of our values in a object with the key being the type of trade and the value being the number of wins
  // We will also keep track of the total number of trades by category
  const winsByTradeType: {
    [key: string]: { total: number; wins: number; winPercentage?: number };
  } = {};
  for (const trade of trades) {
    // Set the total
    winsByTradeType[trade.type] = {
      total: winsByTradeType[trade.type]?.total + 1 || 1,
      wins: winsByTradeType[trade.type]?.wins || 0,
    };

    if (trade.win) {
      winsByTradeType[trade.type] = {
        total: winsByTradeType[trade.type]?.total,
        wins: winsByTradeType[trade.type]?.wins + 1 || 1,
      };
    }
  }
  // Determine the win percentage
  for (const key in winsByTradeType) {
    winsByTradeType[key].winPercentage = Math.round(
      winsByTradeType[key].wins / winsByTradeType[key].total * 100,
    );
    // Remove our common stock selling trades
    if (key.includes("COMMON")) {
      delete winsByTradeType[key];
    }
  }
  return winsByTradeType;
};

export default getWinPercentageByTradeType;
