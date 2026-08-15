import { Link } from "@tanstack/react-router";
import heart from "@/assets/heart.png";

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
      <nav className="mx-auto flex max-w-[88rem] flex-col items-center gap-2 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={heart}
            alt="Hellbound"
            width={28}
            height={28}
            className="pixelated flip360 h-6 w-6 object-contain sm:h-[28px] sm:w-[28px]"
          />
          <span className="font-pixel text-[11px] text-foreground sm:text-[13px]">Hellbound</span>
        </Link>
        <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-pixel text-[9px] sm:gap-x-5 sm:text-[11px]">
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
