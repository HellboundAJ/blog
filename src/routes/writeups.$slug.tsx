import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getPost } from "@/data/posts";
import { Watcher } from "@/components/Watcher";

export const Route = createFileRoute("/writeups/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);

    if (!post) {
      throw notFound();
    }

    return { post };
  },

  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Unavailable — Hellbound" },
          { name: "robots", content: "noindex" },
        ],
      };
    }

    const { post } = loaderData;

    return {
      meta: [
        { title: `${post.title} — Hellbound` },
        {
          name: "description",
          content: post.excerpt,
        },
        {
          property: "og:title",
          content: post.title,
        },
        {
          property: "og:description",
          content: post.excerpt,
        },
      ],
    };
  },

  component: Writeup,
});

function Writeup() {
  const { post } = Route.useLoaderData();

  const [active, setActive] = useState(
    post.toc[0]?.id ?? "",
  );

  /*
   * =========================================================
   * TOC SCROLL TRACKING
   * =========================================================
   */

  useEffect(() => {
    const updateActive = () => {
      const offset = 140;
      let current = post.toc[0]?.id ?? "";

      for (const item of post.toc) {
        const el = document.getElementById(item.id);

        if (!el) {
          continue;
        }

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

    window.addEventListener(
      "scroll",
      updateActive,
      { passive: true },
    );

    window.addEventListener(
      "resize",
      updateActive,
    );

    return () => {
      window.removeEventListener(
        "scroll",
        updateActive,
      );

      window.removeEventListener(
        "resize",
        updateActive,
      );
    };
  }, [post]);

  /*
   * =========================================================
   * CODE COPY BUTTONS
   * =========================================================
   */

  /*
 * =========================================================
 * CODE COPY BUTTONS
 * =========================================================
 */

useEffect(() => {
  const article = document.querySelector(".md-body");

  if (!article) {
    return;
  }

  const buttons =
    article.querySelectorAll<HTMLButtonElement>(
      "[data-copy-code]",
    );

  const handlers = new Map<
    HTMLButtonElement,
    (event: MouseEvent) => void
  >();

  buttons.forEach((button) => {
    const handler = (event: MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const details = button.closest("details");
      const code = details?.querySelector("code");

      if (!code) {
        return;
      }

      const text = code.textContent ?? "";
      const original = button.textContent ?? "Copy";

      /*
       * Use the synchronous fallback FIRST.
       * This preserves the browser's user activation.
       */
      const textarea =
        document.createElement("textarea");

      textarea.value = text;

      textarea.setAttribute(
        "readonly",
        "",
      );

      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      textarea.style.top = "0";
      textarea.style.width = "1px";
      textarea.style.height = "1px";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      let copied = false;

      try {
        copied = document.execCommand("copy");
      } catch {
        copied = false;
      }

      document.body.removeChild(textarea);

      /*
       * If the synchronous method worked,
       * we're done.
       */
      if (copied) {
        button.textContent = "Copied!";

        window.setTimeout(() => {
          button.textContent = original;
        }, 1200);

        return;
      }

      /*
       * Otherwise try the modern Clipboard API.
       */
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            button.textContent = "Copied!";

            window.setTimeout(() => {
              button.textContent = original;
            }, 1200);
          })
          .catch(() => {
            button.textContent = "Failed";

            window.setTimeout(() => {
              button.textContent = original;
            }, 1200);
          });

        return;
      }

      button.textContent = "Failed";

      window.setTimeout(() => {
        button.textContent = original;
      }, 1200);
    };

    handlers.set(button, handler);

    button.addEventListener(
      "click",
      handler,
    );
  });

  return () => {
    handlers.forEach(
      (handler, button) => {
        button.removeEventListener(
          "click",
          handler,
        );
      },
    );
  };
}, [post]);

  return (
    <>
      <main className="relative z-10 mx-auto w-full max-w-[88rem] px-4 py-12">

        {/* =================================================
            WRITEUP HEADER
            ================================================= */}

        <header className="text-center">

          <p className="font-mono text-[11px] text-muted-foreground">
            {post.date} · {post.category}
          </p>

          <h1 className="ember-text mx-auto mt-4 max-w-4xl text-xl leading-relaxed sm:text-2xl">
            {post.title}
          </h1>

          <p className="mx-auto mt-4 max-w-3xl font-mono text-lg leading-relaxed text-muted-foreground">
            {post.excerpt}
          </p>

        </header>

        {/* =================================================
            CONTENT + TOC
            ================================================= */}

        <div className="mt-12 gap-10 lg:flex lg:items-start">

          {/* =================================================
              TABLE OF CONTENTS
              ================================================= */}

          <aside className="min-w-0 shrink-0 lg:sticky lg:top-24 lg:w-72">

            <nav className="pixel-border min-w-0 max-w-full overflow-hidden bg-card p-4">

              <p className="font-pixel text-[8px] text-muted-foreground">
                TABLE OF CONTENTS
              </p>

              <ul className="mt-4 min-w-0 max-w-full space-y-2 text-sm">

                {post.toc.map((item) => (
                  <li
  key={item.id}
  className="min-w-0 max-w-full"
  style={{
    marginLeft: `${Math.min((item.level - 2) * 20, 40)}px`,
  }}
>

                    <a
  href={`#${item.id}`}
  className={`
    block
    min-w-0
    max-w-full
    border-l-2
    pl-3
    transition-colors
    hover:text-primary
    ${
      active === item.id
        ? "border-primary text-primary"
        : "border-border text-muted-foreground"
    }
  `}
>
  {item.heading}
</a>

                  </li>
                ))}

              </ul>

              {/* =================================================
                  TAGS
                  ================================================= */}

              <div className="mt-5 flex flex-wrap gap-2">

                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-2 border-border px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}

              </div>

            </nav>

          </aside>

          {/* =================================================
              MARKDOWN ARTICLE
              ================================================= */}

          <article
            className="md-body mt-12 min-w-0 flex-1 lg:mt-0"
            dangerouslySetInnerHTML={{
              __html: post.html,
            }}
          />

        </div>

      </main>

      <Watcher />
    </>
  );
}