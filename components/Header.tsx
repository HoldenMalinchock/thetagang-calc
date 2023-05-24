export function Header() {
  // TODO we need to add some more things here, first we need to add a link to the github repo
  // We also need a information page with some about information
  return (
    <header class="h-[110px] w-full bg-cover bg-no-repeat relative bg-green-500">
      <div class="rainfall w-full h-full absolute" />
      <nav class="w-11/12 h-24 max-w-5xl mx-auto flex items-center relative text-[#DADADA] justify-around">
        <a href="/">
          <div>Theta Gang Calculator</div>
        </a>
        <a href="/about">
          <div>About</div>
        </a>
        <a href="https://github.com/HoldenMalinchock/thetagang-calc">
          <img
            src="/github-mark.svg"
            alt="Github Link"
            class="h-7 w-14"
          />
        </a>
      </nav>
    </header>
  );
}
