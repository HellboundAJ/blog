import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hellbound — CTF writeups & notes" },
      {
        name: "description",
        content: "Hellbound's notebook: CTF writeups, exploit notes and security scribbles.",
      },
      { property: "og:title", content: "Hellbound — CTF writeups & notes" },
      {
        property: "og:description",
        content: "CTF writeups, exploit notes and security scribbles.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative z-10">
      <section className="flex min-h-[62vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="ember-text flicker text-2xl sm:text-4xl">HELLBOUND</h1>
        <p className="mt-6 max-w-md text-muted-foreground">
          You actually found this place. Writeups, exploit notes, and whatever else survived the burn.
        </p>
        <p className="mt-8 font-pixel text-[8px] text-muted-foreground">▼ scroll ▼</p>
      </section>

      <section className="mx-auto w-full max-w-[88rem] px-4 pb-10">
        <h2 className="mb-8 text-center text-sm text-foreground">Latest writeups</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              to="/writeups/$slug"
              params={{ slug: p.slug }}
              className="pixel-card group flex flex-col"
            >
              <div className="p-4">
                <h3 className="text-[11px] leading-relaxed text-foreground transition-colors group-hover:text-primary">
                  {p.title}
                </h3>
              </div>
              <img
                src={p.cover}
                alt={`Cover art for ${p.title}`}
                width={1088}
                height={608}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
              <div className="flex flex-1 flex-col justify-between gap-4 p-4">
                <p className="text-sm text-muted-foreground">{p.excerpt}</p>
                <div className="flex items-end justify-between font-pixel text-[8px] text-muted-foreground">
                  <span>
                    Writeup
                    <br />
                    <span className="text-primary">{p.date}</span>
                  </span>
                  <span>{p.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
