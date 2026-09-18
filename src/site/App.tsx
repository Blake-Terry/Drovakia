import { useEffect, useMemo, useState } from "react";
import { categories, demos } from "../demos/registry";
import { Home } from "./Home";
import { DemoPage } from "./DemoPage";

function useRoute() {
  const [route, setRoute] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const update = () => {
      setRoute(window.location.hash || "#/");
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return route;
}

function Symbol({ size = 29 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
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
  const route = useRoute();
  const [query, setQuery] = useState("");
  const [drawer, setDrawer] = useState(false);
  const current = route.startsWith("#/effect/")
    ? demos.find((demo) => demo.slug === route.split("/")[2])
    : undefined;
  const filtered = useMemo(
    () =>
      demos.filter((demo) =>
        demo.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );
  useEffect(() => {
    setDrawer(false);
  }, [route]);
  useEffect(() => {
    document.title = `${current ? `${current.name} — ` : ""}FORM / FIELD`;
  }, [current]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <aside
        className={`sidebar ${drawer ? "sidebar--open" : ""}`}
        aria-label="Component navigation"
      >
        <div className="sidebar__header">
          <a className="brand" href="#/" aria-label="Form Field home">
            <Symbol />
            <span>
              FORM<span className="brand__slash">/</span>FIELD
              <small>MOTION INDEX</small>
            </span>
          </a>
          <button
            className="sidebar__close"
            type="button"
            onClick={() => setDrawer(false)}
            aria-label="Close navigation"
          >
            ×
          </button>
        </div>
        <div className="sidebar__search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the index"
            aria-label="Search components"
          />
          <kbd>31</kbd>
        </div>
        <nav className="sidebar__nav">
          {!query && (
            <div className="sidebar__group">
              <div className="sidebar__category">
                <span>GET STARTED</span>
                <span>00</span>
              </div>
              <a
                className={`sidebar__link ${route === "#/" ? "is-active" : ""}`}
                href="#/"
              >
                <span>Introduction</span>
                <span>↗</span>
              </a>
              <a
                className={`sidebar__link ${route === "#/guide/installation" ? "is-active" : ""}`}
                href="#/guide/installation"
              >
                <span>Installation</span>
                <span>↗</span>
              </a>
              <a
                className={`sidebar__link ${route === "#/guide/usage" ? "is-active" : ""}`}
                href="#/guide/usage"
              >
                <span>Usage</span>
                <span>↗</span>
              </a>
            </div>
          )}
          {categories.map((category) => {
            const items = filtered.filter((demo) => demo.category === category);
            return (
              items.length > 0 && (
                <div className="sidebar__group" key={category}>
                  <div className="sidebar__category">
                    <span>{category.toUpperCase()}</span>
                    <span>{String(items.length).padStart(2, "0")}</span>
                  </div>
                  {items.map((demo) => (
                    <a
                      className={`sidebar__link ${current?.slug === demo.slug ? "is-active" : ""}`}
                      href={`#/effect/${demo.slug}`}
                      key={demo.slug}
                    >
                      <span>{demo.name}</span>
                      <span>↗</span>
                    </a>
                  ))}
                </div>
              )
            );
          })}
          {filtered.length === 0 && (
            <p className="sidebar__empty">No matching studies.</p>
          )}
        </nav>
        <div className="sidebar__footer">
          <span>
            <i className="status-dot" /> SYSTEM ONLINE
          </span>
          <span>V.01 / 2026</span>
        </div>
      </aside>
      {drawer && (
        <button
          className="drawer-scrim"
          aria-label="Close navigation"
          type="button"
          onClick={() => setDrawer(false)}
        />
      )}
      <div className="site-main">
        <header className="topbar">
          <button
            type="button"
            className="topbar__menu"
            onClick={() => setDrawer(true)}
            aria-label="Open navigation"
          >
            ☰ <span>INDEX</span>
          </button>
          <a className="topbar__wordmark" href="#/">
            FORM / FIELD
          </a>
          <span className="topbar__trail">
            {current
              ? `${current.category.toUpperCase()} / ${current.name.toUpperCase()}`
              : route.startsWith("#/guide")
                ? "GET STARTED / GUIDE"
                : "THE MOTION INDEX"}
          </span>
          <a href="#/effect/tidal-lattice" className="topbar__action">
            EXPLORE INDEX <span>↗</span>
          </a>
        </header>
        <main id="main">
          {current ? (
            <DemoPage key={current.slug} demo={current} />
          ) : route === "#/guide/installation" || route === "#/guide/usage" ? (
            <Guide kind={route.endsWith("usage") ? "usage" : "installation"} />
          ) : (
            <Home />
          )}
        </main>
      </div>
    </div>
  );
}

function Guide({ kind }: { kind: "installation" | "usage" }) {
  return (
    <div className="guide-page">
      <div className="eyebrow">
        <span>00 / GET STARTED</span>
        <span>FORM / FIELD</span>
      </div>
      <h1>
        {kind === "installation" ? "INSTALLATION" : "USAGE"}
        <em> / notes.</em>
      </h1>
      <p className="guide-page__lead">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        blandit tempus porttitor.
      </p>
      {kind === "installation" ? (
        <>
          <div className="guide-page__block">
            <span>01 / INSTALL</span>
            <code>npm install</code>
          </div>
          <div className="guide-page__block">
            <span>02 / RUN</span>
            <code>npm run dev</code>
          </div>
          <div className="guide-page__block">
            <span>03 / BUILD</span>
            <code>npm run build</code>
          </div>
        </>
      ) : (
        <>
          <div className="guide-page__block">
            <span>01 / IMPORT</span>
            <code>{`import { TidalLattice } from './effects/backgrounds/Fields';`}</code>
          </div>
          <div className="guide-page__block">
            <span>02 / COMPOSE</span>
            <code>{`<TidalLattice speed={0.8} intensity={0.8} density={18} />`}</code>
          </div>
          <p className="guide-page__lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Each study
            includes its source and live properties in the index.
          </p>
        </>
      )}
      <a className="guide-page__next" href="#/effect/tidal-lattice">
        OPEN FIRST STUDY <span>↗</span>
      </a>
    </div>
  );
}
