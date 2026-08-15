import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import pfp from "@/assets/pfp.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hellbound" },
      { name: "description", content: "Who Hellbound is: CTF player, loves web, night owl." },
      { property: "og:title", content: "About — Hellbound" },
      { property: "og:description", content: "CTF player, writeup hoarder, night owl." },
      { property: "og:image", content: pfp },
      { name: "twitter:image", content: pfp },
    ],
  }),
  component: About,
});

function About() {
  return (
    <PageShell title="About">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 sm:flex-row sm:items-start">
        <img
          src={pfp}
          alt="Hellbound avatar"
          width={190}
          height={190}
          className="pixel-border h-[190px] w-[190px] shrink-0 object-cover"
        />
        <div className="space-y-4">
          <h2 className="ember-text text-sm">Hellbound</h2>
          <p className="text-muted-foreground">
            nil
          </p>
          <p className="text-muted-foreground">
            lal
          </p>

        </div>
      </div>
    </PageShell>
  );
}
