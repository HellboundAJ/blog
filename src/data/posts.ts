import { Marked } from "marked";
import hljs from "highlight.js/lib/common";

export type TocItem = {
  id: string;
  heading: string;
  level: number;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  cover: string;
  toc: TocItem[];
  html: string;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);

  const meta: Record<string, string> = {};

  if (!match) {
    return {
      meta,
      body: raw,
    };
  }

  for (const line of (match[1] ?? "").split(/\r?\n/)) {
    const i = line.indexOf(":");

    if (i === -1) {
      continue;
    }

    meta[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }

  return {
    meta,
    body: raw.slice(match[0].length),
  };
}

function processImages(body: string, slug: string) {
  return body.replace(
    /!\[([^\]]*)\]\((?!https?:\/\/|\/|data:)([^)]+)\)/g,
    (_, alt, filename) => {
      const imagePath = `/blog/writeups/${slug}/${encodeURIComponent(
        filename.trim(),
      )}`;

      return `![${alt}](${imagePath})`;
    },
  );
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/*
 * =========================================================
 * MARKDOWN PARSER
 * =========================================================
 */

const markdown = new Marked({
  gfm: true,
  breaks: false,
});

markdown.use({
  renderer: {
    heading(token: any) {
      const text = this.parser.parseInline(token.tokens);
      const id = slugify(token.text);

      return `
<h${token.depth}
  id="${id}"
  class="scroll-mt-28"
>
  ${text}
</h${token.depth}>
`;
    },

    code(token: any) {
      const code = token.text ?? "";

      const language =
        (token.lang ?? "text")
          .trim()
          .split(/\s+/)[0] || "text";

      let highlighted = escapeHtml(code);

      if (
        language !== "text" &&
        hljs.getLanguage(language)
      ) {
        highlighted = hljs.highlight(code, {
          language,
        }).value;
      }

      const label = language.toUpperCase();

      return `
<details class="code-block" open>
  <summary>
    <span class="code-language">
      ${escapeHtml(label)}
    </span>

    <button
      type="button"
      data-copy-code
    >
      Copy
    </button>
  </summary>

  <pre><code class="language-${escapeHtml(
    language,
  )}">${highlighted}</code></pre>
</details>
`;
    },
  },
});

/*
 * =========================================================
 * LOAD MARKDOWN FILES
 * =========================================================
 */

const files = import.meta.glob(
  "../../content/*.md",
  {
    query: "?raw",
    import: "default",
    eager: true,
  },
) as Record<string, string>;

/*
 * =========================================================
 * BUILD POSTS
 * =========================================================
 */

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const { meta, body } =
      parseFrontmatter(raw);

    const slug = path
      .split("/")
      .pop()!
      .replace(/\.md$/, "");

    /*
     * =======================================================
     * TABLE OF CONTENTS
     * =======================================================
     */

    const toc: TocItem[] = [
      ...body.matchAll(
        /^(#{1,6})\s+(.+)$/gm,
      ),
    ].map((m) => ({
      heading: (m[2] ?? "").trim(),
      id: slugify(
        (m[2] ?? "").trim(),
      ),
      level: m[1]?.length ?? 1,
    }));

    /*
     * =======================================================
     * IMAGES
     * =======================================================
     */

    const processedBody =
      processImages(body, slug);

    /*
     * =======================================================
     * COVER
     * =======================================================
     */

    const coverName =
      meta["cover"]?.trim();

    const cover = coverName
      ? `/blog/writeups/${slug}/${encodeURIComponent(
          coverName,
        )}`
      : "";

    /*
     * =======================================================
     * MARKDOWN -> HTML
     * =======================================================
     */

    const html =
      markdown.parse(processedBody) as string;

    return {
      slug,

      title:
        meta["title"] ?? slug,

      date:
        meta["date"] ?? "",

      category:
        meta["category"] ?? "Misc",

      tags:
        (meta["tags"] ?? "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),

      excerpt:
        meta["excerpt"] ?? "",

      cover,

      toc,

      html,
    };
  })
  .sort((a, b) =>
    b.date.localeCompare(a.date),
  );

export const getPost = (slug: string) =>
  posts.find((p) => p.slug === slug);