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
  const [active, setActive] = useState(post.sections[0]?.id ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    post.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [post]);

  return (
    <>
      <main className="relative z-10 mx-auto w-full max-w-5xl px-4 py-12">
        <header className="text-center">
          <p className="font-pixel text-[8px] text-muted-foreground">
            {post.date} · {post.category}
          </p>
          <h1 className="ember-text mx-auto mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
            {post.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{post.excerpt}</p>
        </header>

        <img
          src={post.cover}
          alt={`Cover art for ${post.title}`}
          width={1088}
          height={608}
          className="pixel-border mt-8 w-full object-cover"
        />

        <div className="mt-12 gap-10 lg:flex lg:items-start">
          <aside className="shrink-0 lg:sticky lg:top-24 lg:w-60">
            <nav className="pixel-border bg-card p-4">
              <p className="font-pixel text-[8px] text-muted-foreground">TABLE OF CONTENTS</p>
              <ul className="mt-4 space-y-2 text-sm">
                {post.sections.map((s) => (
                  <li key={s.id}>
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

          <article className="mt-12 min-w-0 flex-1 space-y-10 lg:mt-0">
            {post.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-xs text-foreground">{s.heading}</h2>
                {s.body.map((b, i) => (
                  <p key={i} className="mt-4 text-muted-foreground">
                    {b}
                  </p>
                ))}
                {s.code && (
                  <pre className="pixel-border mt-5 overflow-x-auto bg-card p-4 text-sm text-primary">
                    <code>{s.code}</code>
                  </pre>
                )}
              </section>
            ))}
          </article>
        </div>

      </main>
      <Watcher />
    </>
  );
}
