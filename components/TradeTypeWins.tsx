import { Card } from "./Card.tsx";

const sortTradeWinsByWinPercentage = (tradeWins: any) => {
  const sortedTradeWins = Object.entries(tradeWins).sort((a: any, b: any) => {
    return b[1].winPercentage - a[1].winPercentage;
  });
  return sortedTradeWins;
};

export function TradeTypeWins(props: { tradeWins: any }) {
  return (
    <Card>
      <table class="table-auto">
        <tbody>
          {sortTradeWinsByWinPercentage(props.tradeWins).map(
            (
              tradeType: any,
            ) => (
              <tr>
                <td class="pr-3">{tradeType}:</td>
                <td
                  className={tradeType[1].winPercentage >= 60
                    ? "text-[#0FCE18]"
                    : "text-[#FF0000]"}
                >
                  {tradeType[1].winPercentage}%
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
    </Card>
  );
}
