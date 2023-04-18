const sortTradeWinsByWinPercentage = (tradeWins: any) => {
  const sortedTradeWins = Object.entries(tradeWins).sort((a: any, b: any) => {
    return b[1].winPercentage - a[1].winPercentage;
  });
  return sortedTradeWins;
};

export function TradeTypeWins(props: { tradeWins: any }) {
  return (
    <div class="p-6 mt-3 max-w-sm bg-white rounded-lg border-gray-200 shadow-xl dark:border-gray-700 bg-[#23252F]">
      <table class="table-auto">
        <tbody>
          {sortTradeWinsByWinPercentage(props.tradeWins).map(
            (
              tradeType: any,
            ) => (
              <tr>
                <td class="pr-3">{tradeType}:</td>
                <td
                  className={tradeType[1].winPercentage >= 75
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
    </div>
  );
}
