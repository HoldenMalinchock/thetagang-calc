import Counter from "../islands/Counter.tsx";

export default function Home() {
  const v = { username: "rostunshine" };

  return (
    <div class="p-4 mx-auto  dark:(bg-gray-900 text-white)">
      <img
        src="/logo.svg"
        class="w-32 h-32"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p class="my-6">
        Welcome to `fresh` user {v}
      </p>
      <Counter start={3} />
    </div>
  );
}
