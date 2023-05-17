export function Header() {
  // TODO we need to add some more things here, first we need to add a link to the github repo
  // We also need a information page with some about information
  return (
    <header class="h-[110px] w-full bg-cover bg-no-repeat relative bg-green-500">
      <div class="rainfall w-full h-full absolute" />
      <nav class="w-11/12 h-24 max-w-5xl mx-auto flex items-center relative">
        <a href="/">
          <div>Theta Gang Calculator</div>
        </a>
      </nav>
    </header>
  );
}
