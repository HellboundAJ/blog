import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { posts } from "@/data/posts";

/** AJAX search endpoint — the home page calls this over the network. */
export const searchPosts = createServerFn({ method: "GET" })
  .inputValidator((data) => z.object({ q: z.string().max(80) }).parse(data))
  .handler(async ({ data }) => {
    const q = data.q.trim().toLowerCase();
    const hits = posts
      .filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .map(({ slug, title, date, category, tags, excerpt, cover }) => ({
        slug,
        title,
        date,
        category,
        tags,
        excerpt,
        cover,
      }));
    return { hits };
  });
