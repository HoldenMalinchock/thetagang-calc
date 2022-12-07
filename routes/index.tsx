import { Handlers } from "$fresh/server.ts";
import { Button } from "../components/Button.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const query = url.searchParams.get("q") || "";

    if (query) {
      return new Response("", {
        status: 307,
        headers: { Location: `/thetagang/${query}` },
      });
    } else {
      return ctx.render();
    }
  },
};

export default function Page() {
  const query = "";
  return (
    <div class="w-full h-screen flex flex-col items-center justify-center bg-[#1C1E25]">
      <div class="p-6 max-w-sm bg-white rounded-lg border-gray-200 shadow-xl dark:border-gray-700 bg-[#23252F]">
        <h1 class="text-[#DADADA] font-mono">Enter your username:</h1>
        <form>
          <input
            type="text"
            name="q"
            value={query}
            class="rounded-lg p-1 mr-2 font-mono"
          />
          <Button class="m-2" type="submit">Search</Button>
        </form>
      </div>
      <div class="align-bottom flex justify-end">
        <a href="https://fresh.deno.dev">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge-dark.svg"
            alt="Made with Fresh"
          />
        </a>
      </div>
    </div>
  );
}
