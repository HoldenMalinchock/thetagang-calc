export function Header() {
  return (
    <header class="h-[110px] w-full bg-cover bg-no-repeat relative bg-green-500">
      <div class="rainfall w-full h-full absolute" />
      <nav class="w-11/12 h-24 max-w-5xl mx-auto flex items-center ">
        <a href="/">
          {
            /* <img
            src="/logo.svg"
            alt="Deno Logo"
            class="h-14 w-14"
          /> */
          }
          <h1>Theta Gang Calculator</h1>
        </a>
      </nav>
    </header>
  );
}
