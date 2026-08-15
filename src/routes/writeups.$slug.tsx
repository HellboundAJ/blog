import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getPost } from "@/data/posts";
import { Watcher } from "@/components/Watcher";

export const Route = createFileRoute("/writeups/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable — Hellbound" }, { name: "robots", content: "noindex" }] };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title} — Hellbound` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
      ],
    };
  },
  component: Writeup,
});

function Writeup() {
  const { post } = Route.useLoaderData();
  const [active, setActive] = useState(post.toc[0]?.id ?? "");

  useEffect(() => {
  const updateActive = () => {
    const offset = 140;
    let current = post.toc[0]?.id ?? "";

    for (const item of post.toc) {
      const el = document.getElementById(item.id);
      if (!el) continue;

      const top = el.getBoundingClientRect().top;

      if (top <= offset) {
        current = item.id;
      } else {
        break;
      }
    }

    setActive(current);
  };

  updateActive();
  window.addEventListener("scroll", updateActive, { passive: true });
  window.addEventListener("resize", updateActive);

  return () => {
    window.removeEventListener("scroll", updateActive);
    window.removeEventListener("resize", updateActive);
  };
}, [post]);

  return (
    <>
      <main className="relative z-10 mx-auto w-full max-w-[88rem] px-4 py-12">
        <header className="text-center">
          <p className="font-pixel text-[8px] text-muted-foreground">
            {post.date} · {post.category}
          </p>
          <h1 className="ember-text mx-auto mt-4 max-w-4xl text-base leading-relaxed sm:text-lg">
            {post.title}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">{post.excerpt}</p>
        </header>


        <div className="mt-12 gap-10 lg:flex lg:items-start">
          <aside className="shrink-0 lg:sticky lg:top-24 lg:w-72">
            <nav className="pixel-border bg-card p-4">
              <p className="font-pixel text-[8px] text-muted-foreground">TABLE OF CONTENTS</p>
              <ul className="mt-4 space-y-2 text-sm">
                {post.toc.map((s) => (
                  <li
                    key={s.id}
                    style={{
                      marginLeft: `${(s.level - 1) * 20}px`,
                    }}
                  >
                    <a
                      href={`#${s.id}`}
                      className={`block border-l-2 pl-3 transition-colors hover:text-primary ${
                        active === s.id
                          ? "border-primary text-primary"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="border-2 border-border px-2 py-0.5 text-xs text-muted-foreground">
                    #{t}
                  </span>
                ))}
              </div>
            </nav>
          </aside>

          <article
            className="md-body mt-12 min-w-0 flex-1 lg:mt-0"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </main>
      <Watcher />
    </>
  );
}
