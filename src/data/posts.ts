import { marked } from "marked";
import writeupWeb from "@/assets/writeup-web.jpg";

/**
 * Posts are plain markdown files in /content.
 * Drop a new .md file in there, push it, and the post + its table of
 * contents show up automatically. Nothing else to edit.
 *
 * Frontmatter keys: title, date, category, tags, cover, excerpt
 */

const covers: Record<string, string> = {
  "writeup-web": writeupWeb,
};

export type TocItem = { id: string; heading: string; level:number; };

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

marked.use({
  renderer: {
    heading(this: any, token: any) {
      const text = this.parser.parseInline(token.tokens);
      const id = slugify(token.text);
      return `<h${token.depth} id="${id}" class="scroll-mt-28">${text}</h${token.depth}>\n`;
    },
  },
});

function parseFrontmatter(raw: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  const meta: Record<string, string> = {};
  if (!match) return { meta, body: raw };
  for (const line of (match[1] ?? "").split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    meta[line.slice(0, i).trim()] = line
      .slice(i + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
  }
  return { meta, body: raw.slice(match[0].length) };
}

const files = import.meta.glob("../../content/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const posts: Post[] = Object.entries(files)
  .map(([path, raw]) => {
    const { meta, body } = parseFrontmatter(raw);
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    const toc: TocItem[] = [...body.matchAll(/^(#{1,6})\s+(.+)$/gm)].map(
  (m) => ({
    heading: (m[2] ?? "").trim(),
    id: slugify((m[2] ?? "").trim()),
    level: m[1]?.length ?? 2,
  }),
);
    return {
      slug,
      title: meta["title"] ?? slug,
      date: meta["date"] ?? "",
      category: meta["category"] ?? "Misc",
      tags: (meta["tags"] ?? "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      excerpt: meta["excerpt"] ?? "",
      cover: covers[meta["cover"] ?? ""] ?? writeupWeb,
      toc,
      html: marked.parse(body) as string,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
