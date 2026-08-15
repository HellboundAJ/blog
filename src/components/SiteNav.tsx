import { Link } from "@tanstack/react-router";
import heart from "@/assets/heart.png.asset.json";

const links = [
  { to: "/", label: "Main" },
  { to: "/categories", label: "Categories" },
  { to: "/tags", label: "Tags" },
  { to: "/archives", label: "Archives" },
  { to: "/about", label: "About me" },
] as const;

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b-2 border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-[88rem] items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={heart.url}
            alt="Hellbound"
            width={38}
            height={38}
            className="pixelated flip360 h-[38px] w-[38px] object-contain"
          />
          <span className="font-pixel text-[13px] text-foreground">Hellbound</span>
        </Link>
        <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-pixel text-[11px]">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "ember-text" }}
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t-2 border-border py-8 text-center text-sm text-muted-foreground">
      <p className="font-pixel text-[8px]">HELLBOUND · burn bright, log everything</p>
    </footer>
  );
}
