import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { posts } from "@/data/posts";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Hellbound" },
      { name: "description", content: "Writeups grouped by category: web, crypto, pwn and more." },
      { property: "og:title", content: "Categories — Hellbound" },
      { property: "og:description", content: "Writeups grouped by category." },
    ],
  }),
  component: Categories,
});

function Categories() {
  const groups = posts.reduce<Record<string, typeof posts>>((acc, p) => {
    (acc[p.category] ||= []).push(p);
    return acc;
  }, {});

  return (
    <PageShell title="Categories" subtitle="Everything sorted by the pit it came from.">
      <div className="grid gap-6 sm:grid-cols-2">
        {Object.entries(groups).map(([cat, list]) => (
          <section key={cat} className="pixel-card p-5">
            <h2 className="ember-text text-xs">
              {cat} <span className="text-muted-foreground">({list.length})</span>
            </h2>
            <ul className="mt-4 space-y-2">
              {list.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/writeups/$slug"
                    params={{ slug: p.slug }}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    › {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </PageShell>
  );
}
