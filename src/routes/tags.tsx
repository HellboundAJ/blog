import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/tags")({
  head: () => ({
    meta: [
      { title: "Tags — Hellbound" },
      { name: "description", content: "Browse Hellbound writeups by tag." },
      { property: "og:title", content: "Tags — Hellbound" },
      { property: "og:description", content: "Browse Hellbound writeups by tag." },
    ],
  }),
  component: Tags,
});

function Tags() {
  const counts = posts
    .flatMap((p) => p.tags)
    .reduce<Record<string, number>>((a, t) => ({ ...a, [t]: (a[t] || 0) + 1 }), {});

  return (
    <PageShell title="Tags" subtitle="Small labels, long nights.">
      <div className="flex flex-wrap justify-center gap-3">
        {Object.entries(counts).map(([tag, n]) => (
          <span key={tag} className="pixel-card px-4 py-2 font-pixel text-[9px]">
            #{tag} <span className="text-muted-foreground">x{n}</span>
          </span>
        ))}
      </div>
      <ul className="mx-auto mt-10 max-w-2xl space-y-3">
        {posts.map((p) => (
          <li key={p.slug} className="pixel-card px-4 py-3">
            <Link to="/writeups/$slug" params={{ slug: p.slug }} className="hover:text-primary">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
