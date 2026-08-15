import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import pfp from "@/assets/pfp.jpg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hellbound" },
      { name: "description", content: "Who Hellbound is: CTF player, writeup hoarder, night owl." },
      { property: "og:title", content: "About — Hellbound" },
      { property: "og:description", content: "CTF player, writeup hoarder, night owl." },
      { property: "og:image", content: pfp.url },
      { name: "twitter:image", content: pfp.url },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell title="About me">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 sm:flex-row sm:items-start">
        <img
          src={pfp.url}
          alt="Hellbound avatar"
          width={190}
          height={190}
          className="pixel-border h-[190px] w-[190px] shrink-0 object-cover"
        />
        <div className="space-y-4">
          <h2 className="ember-text text-sm">Hellbound</h2>
          <p className="text-muted-foreground">
            I play CTFs and write down what worked, what didn't, and the dumb detour in between.
            Mostly web and crypto. Occasionally something with a shell.
          </p>
          <p className="text-muted-foreground">
            This place is a notebook first and a blog second. No trackers, no popups, no newsletter.
            Read what you need and leave.
          </p>
          <ul className="space-y-1 font-pixel text-[9px] text-muted-foreground">
            <li>· focus — web exploitation, crypto</li>
            <li>· tools — burp, python, too much coffee</li>
            <li>· contact — github.com/Hellbound</li>
          </ul>
        </div>
      </div>
    </PageShell>
  );
}
