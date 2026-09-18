import { useEffect, useRef, useState } from "react";
import { Home } from "./Home";

const navigation = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "PLAY", href: "#play" },
  { label: "PROCESS", href: "#process" },
];

function Mark() {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 2 37.3 12v16L20 38 2.7 28V12L20 2Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M20 2v36M2.7 12 37.3 28M37.3 12 2.7 28"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="20" cy="20" r="3" fill="currentColor" />
    </svg>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const amount = scrollable > 0 ? window.scrollY / scrollable : 0;
        if (progress.current)
          progress.current.style.transform = `scaleX(${amount})`;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="site-main" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="topbar topbar--landing">
        <a
          className="topbar__brand"
          href="#top"
          aria-label="Form Field, back to top"
        >
          <Mark />
          <span>
            FORM <b>/</b> FIELD<small>FICTIONAL MOTION STUDIO</small>
          </span>
        </a>
        <nav
          className={`topbar__nav ${menuOpen ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {navigation.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              <small>0{index + 1}</small>
              {item.label}
            </a>
          ))}
          <a
            className="topbar__nav-contact"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            CONTACT ↗
          </a>
        </nav>
        <a className="topbar__contact" href="#contact">
          LET'S BEGIN <span>↗</span>
        </a>
        <button
          className="topbar__toggle"
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "CLOSE ×" : "MENU +"}
        </button>
        <span className="topbar__progress" ref={progress} aria-hidden="true" />
      </header>
      <main id="main">
        <Home />
      </main>
    </div>
  );
}
