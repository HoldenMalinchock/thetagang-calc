import { Card } from "./Card.tsx";

const determineCurrentEV = (
  winAmount: number,
  lossAmount: number,
  winPercentage: string,
) => {
  // for 100 trades
  // TODO this needs to be generalized for more than 100 trades
  const t = winAmount * parseInt(winPercentage) -
    lossAmount * (100 - parseInt(winPercentage));
  return t;
};

const determinePostiveEV = (
  winAmount: number,
  lossAmount: number,
) => {
  // What win rate would I need to be profitable over 100 trades based on my current win/loss amounts
  // you could do a sort, start at 50% and go up or down
  let winRateFinder = 50;

  if (winAmount < lossAmount) {
    let EV = 0;
    while (EV < 1) {
      EV = determineCurrentEV(winAmount, lossAmount, winRateFinder.toString());
      if (EV < 1) {
        winRateFinder++;
      } else {
        winRateFinder--;
      }
    }
  } else {
    let EV = 2;
    while (EV > 1) {
      EV = determineCurrentEV(winAmount, lossAmount, winRateFinder.toString());
      if (EV < 1) {
        winRateFinder++;
      } else {
        winRateFinder--;
      }
    }
  }
  return winRateFinder;
};

export function WinRateCalc(
  props: { winAmount: number; lossAmount: number; winPercentage: string },
) {
  return (
    <Card>
      <h1 class="my-1">
        Current EV over 100 trades: ${determineCurrentEV(
          props.winAmount,
          props.lossAmount,
          props.winPercentage,
        )}
      </h1>
      <h1 class="flex">
        Required WR for profitability: {determinePostiveEV(
          props.winAmount,
          props.lossAmount,
        )}%
      </h1>
    </Card>
  );
}
