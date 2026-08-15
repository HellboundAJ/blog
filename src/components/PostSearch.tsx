import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { searchPosts } from "@/lib/search.functions";

type Hit = {
  slug: string;
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  cover: string;
};

/** Debounced AJAX search over the writeups. */
export function usePostSearch(initial: Hit[]) {
  const [q, setQ] = useState("");
  const [debounced, setDebounced] = useState("");
  const run = useServerFn(searchPosts);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(q), 250);
    return () => clearTimeout(t);
  }, [q]);

  const query = useQuery({
    queryKey: ["search", debounced],
    queryFn: () => run({ data: { q: debounced } }),
    enabled: debounced.trim().length > 0,
  });

  const hits: Hit[] = debounced.trim() ? (query.data?.hits ?? []) : initial;

  return { q, setQ, hits, loading: query.isFetching && debounced.trim().length > 0 };
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
