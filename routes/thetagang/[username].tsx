import { Handlers, PageProps } from "$fresh/server.ts";
import averageLoss from "../../utils/averageLoss.ts";
import averageWin from "../../utils/averageWin.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const { username } = ctx.params;
    const resp = await fetch(
      `https://api.thetagang.com/trades?username=${username}`,
    );
    if (resp.status === 400) {
      return ctx.render(null);
    }
    const profile = await resp.json();
    return ctx.render({ profile, username });
  },
};

export default function Page({ data }: PageProps) {
  if (!data) {
    return <h1>User not found</h1>;
  }

  return (
    <div class="w-full h-screen flex flex-col items-center bg-[#1C1E25] text-[#DADADA] font-mono">
      <div class="p-6 mt-3 max-w-sm bg-white rounded-lg border-gray-200 shadow-xl dark:border-gray-700 bg-[#23252F]">
        <h1 class="my-1">User: {data.username}</h1>
        <table class="table-auto">
          <tbody>
            <tr>
              <td>Average Win:</td>
              <td>{averageWin(data.profile.data.trades)}</td>
            </tr>
            <tr>
              <td>Average Loss:</td>
              <td>{averageLoss(data.profile.data.trades)}</td>
            </tr>
            <tr>
              <td>Win Percentage:</td>
              <td>{data.profile.data.metadata.winPercentage}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
