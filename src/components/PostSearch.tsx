import { useEffect, useState } from "react";
import { posts } from "@/data/posts";

type Hit = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  cover: string;
};

export function usePostSearch(initial: Hit[]) {
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 200);
    return () => clearTimeout(t);
  }, [q]);

  const search = debounced.trim().toLowerCase();

  const hits: Hit[] = search
    ? posts
        .filter(
          (p) =>
            p.title.toLowerCase().includes(search) ||
            p.excerpt.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search) ||
            p.tags.some((t) => t.toLowerCase().includes(search)),
        )
        .map(({ slug, title, date, category, tags, excerpt, cover }) => ({
          slug,
          title,
          date,
          category,
          tags,
          excerpt,
          cover,
        }))
    : initial;

  return {
    q,
    setQ,
    hits,
    loading: false,
  };
}

export function SearchBar({
  value,
  onChange,
  loading,
  count,
}: {
  value: string;
  onChange: (v: string) => void;
  loading: boolean;
  count: number;
}) {
  return (
    <div className="mx-auto mb-10 w-full max-w-xl">
      <label className="pixel-border flex items-center gap-3 bg-card px-3 py-2 focus-within:border-primary">
        <span className="font-pixel text-[10px] text-primary">{">"}</span>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="search writeups, tags, categories..."
          aria-label="Search writeups"
          className="w-full bg-transparent text-base text-foreground outline-none placeholder:text-muted-foreground"
        />

        <span className="font-pixel text-[8px] text-muted-foreground">
          {loading ? "..." : `${count}`}
        </span>
      </label>
    </div>
  );
}