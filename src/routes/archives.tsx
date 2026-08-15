import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/archives")({
  head: () => ({
    meta: [
      { title: "Archives — Hellbound" },
      { name: "description", content: "A timeline of every Hellbound writeup." },
      { property: "og:title", content: "Archives — Hellbound" },
      { property: "og:description", content: "A timeline of every Hellbound writeup." },
    ],
  }),
  component: Archives,
});

function Archives() {
  return (
    <PageShell title="Archives" subtitle="Ordered newest first.">
      <ol className="mx-auto max-w-2xl border-l-2 border-border pl-6">
        {posts.map((p) => (
          <li key={p.slug} className="relative mb-8">
            <span className="absolute -left-[31px] top-3 h-3 w-3 bg-primary" />
            <p className="font-pixel text-[8px] text-muted-foreground">{p.date}</p>
            <Link
              to="/writeups/$slug"
              params={{ slug: p.slug }}
              className="mt-2 inline-block text-lg transition-colors hover:text-primary"
            >
              {p.title}
            </Link>
            <p className="text-muted-foreground">{p.excerpt}</p>
          </li>
        ))}
      </ol>
    </PageShell>
  );
}
