import { Header } from "../components/Header.tsx";
import { Card } from "../components/Card.tsx";

export default function About() {
  return (
    <div class="w-full h-screen flex flex-col items-center justify-items-center bg-[#1C1E25] font-mono text-[#DADADA]">
      <Header />
      <div class="max-w-4xl ">
        <Card>
          <span>
            Theta Gang Calculator is a website created to help you manage and
            track more details on your trading. All data is retrieved from
            thetagang.com. I do not own this data and I am in no way affiliated
            with the site. I have been using the site for a couple years and
            started to write code for personal use to track how I was doing with
            my trades. I realized this might be useful to others so I made into
            a site where others can use it as well.
            <br />
            <br />
            To use simply enter your username in the username search bar, no
            passwords required. All data is on public apis. All issues can be
            directed toward the github repo, or message me on thetagang.com
            @rostsunshine.
          </span>
        </Card>
      </div>
    </div>
  );
}
