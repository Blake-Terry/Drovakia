import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import type { Demo, DemoSettings, ControlKey } from "../demos/registry";
import { loadDemo, loadSource, usageCode } from "../demos/registry";

const controlLabels: Record<ControlKey, string> = {
  speed: "SPEED",
  intensity: "INTENSITY",
  density: "DENSITY",
  color: "COLOR",
  text: "TEXT",
};

function Control({
  name,
  value,
  onChange,
}: {
  name: ControlKey;
  value: string | number;
  onChange: (value: string | number) => void;
}) {
  const id = `control-${name}`;
  if (name === "color")
    return (
      <div className="control">
        <label htmlFor={id}>{controlLabels[name]}</label>
        <div className="control__color">
          <input
            id={id}
            type="color"
            value={String(value)}
            onChange={(event) => onChange(event.target.value)}
          />
          <span>{String(value).toUpperCase()}</span>
        </div>
      </div>
    );
  if (name === "text")
    return (
      <div className="control">
        <label htmlFor={id}>{controlLabels[name]}</label>
        <input
          id={id}
          type="text"
          maxLength={28}
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    );
  const min = name === "density" ? 7 : 0.1;
  const max = name === "density" ? 45 : 1.5;
  const step = name === "density" ? 1 : 0.1;
  return (
    <div className="control">
      <label htmlFor={id}>
        {controlLabels[name]}{" "}
        <output htmlFor={id}>
          {Number(value).toFixed(name === "density" ? 0 : 1)}
        </output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

export function DemoPage({ demo }: { demo: Demo }) {
  const [settings, setSettings] = useState<DemoSettings>({ ...demo.defaults });
  const [tab, setTab] = useState<"usage" | "source">("usage");
  const [source, setSource] = useState("");
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const Component = useMemo(() => lazy(() => loadDemo(demo)), [demo]);
  const usage = usageCode(demo, settings);
  useEffect(() => {
    if (tab === "source" && !source) void loadSource(demo).then(setSource);
  }, [tab, source, demo]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, []);
  const update = (key: ControlKey, value: string | number) =>
    setSettings((current) => ({ ...current, [key]: value }));
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(tab === "usage" ? usage : source);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <div className="demo-page">
      <div className="demo-page__intro">
        <div className="eyebrow">
          <span>
            {demo.category.toUpperCase()} / {demo.index}
          </span>
          <span>INTERACTIVE STUDY — 2026</span>
        </div>
        <h1>
          {demo.name.split(" ").map((word, i) => (
            <span key={word} className={i === 1 ? "demo-page__accent" : ""}>
              {word}{" "}
            </span>
          ))}
        </h1>
        <div className="demo-page__sub">
          <p>{demo.description}</p>
          <span>LIVE / CONFIGURABLE / REUSABLE</span>
        </div>
      </div>
      <div
        className={`demo-page__preview ${fullscreen ? "demo-page__preview--fullscreen" : ""}`}
      >
        <div className="demo-page__preview-head">
          <span>
            <i className="status-dot" /> LIVE PREVIEW
          </span>
          <span>FF — {demo.index}</span>
          <div>
            <button
              type="button"
              onClick={() => setSettings({ ...demo.defaults })}
            >
              RESET ↺
            </button>
            <button
              type="button"
              onClick={() => setFullscreen((value) => !value)}
              aria-label={
                fullscreen ? "Exit fullscreen preview" : "Fullscreen preview"
              }
            >
              {fullscreen ? "CLOSE ×" : "EXPAND ↗"}
            </button>
          </div>
        </div>
        <div className="demo-page__canvas">
          <Suspense
            fallback={<div className="demo-loading">LOADING STUDY / ...</div>}
          >
            <Component {...settings} />
          </Suspense>
        </div>
        <div className="demo-page__preview-foot">
          <span>MOVE / CLICK / SCROLL TO INTERACT</span>
          <span>REDUCED MOTION SUPPORTED WHERE APPLICABLE</span>
        </div>
      </div>
      <div className="demo-page__workbench">
        <div className="demo-page__controls">
          <div className="section-heading">
            <span>01 / TUNE</span>
            <h2>Control room.</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adjust the
            properties and inspect the live result.
          </p>
          {demo.controls.map((control) => (
            <Control
              key={control}
              name={control}
              value={settings[control] ?? ""}
              onChange={(value) => update(control, value)}
            />
          ))}
          <button
            type="button"
            className="text-button"
            onClick={() => setSettings({ ...demo.defaults })}
          >
            RESET TO DEFAULT <span>↺</span>
          </button>
        </div>
        <div className="demo-page__code">
          <div className="section-heading">
            <span>02 / IMPLEMENT</span>
            <h2>Under the hood.</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Working
            usage and the source module are available below.
          </p>
          <div className="code-window">
            <div className="code-window__tabs">
              <div role="tablist" aria-label="Code view">
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "usage"}
                  className={tab === "usage" ? "is-active" : ""}
                  onClick={() => setTab("usage")}
                >
                  USAGE
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === "source"}
                  className={tab === "source" ? "is-active" : ""}
                  onClick={() => setTab("source")}
                >
                  SOURCE
                </button>
              </div>
              <button type="button" onClick={copy}>
                {copied ? "COPIED ✓" : "COPY CODE ↗"}
              </button>
            </div>
            <pre role="tabpanel">
              <code>
                {tab === "usage" ? usage : source || "Loading source..."}
              </code>
            </pre>
          </div>
        </div>
      </div>
      <div className="demo-page__props">
        <div className="section-heading">
          <span>03 / REFERENCE</span>
          <h2>Parameters.</h2>
        </div>
        <div className="prop-table">
          <div className="prop-table__row prop-table__row--head">
            <span>PROPERTY</span>
            <span>TYPE</span>
            <span>DEFAULT</span>
            <span>DESCRIPTION</span>
          </div>
          {demo.controls.map((control) => (
            <div className="prop-table__row" key={control}>
              <strong>{control}</strong>
              <span>
                {control === "color" || control === "text"
                  ? "string"
                  : "number"}
              </span>
              <code>{String(demo.defaults[control])}</code>
              <span>
                {control === "speed"
                  ? "Motion rate."
                  : control === "intensity"
                    ? "Visual response."
                    : control === "density"
                      ? "Element count."
                      : control === "color"
                        ? "Accent color."
                        : "Visible label."}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="demo-page__next">
        <span>CONTINUE EXPLORING</span>
        <a href={`#/effect/${nextSlug(demo.slug)}`}>
          NEXT STUDY <b>↗</b>
        </a>
      </div>
    </div>
  );
}

function nextSlug(slug: string) {
  const list = [
    "split-reveal",
    "orbit-letters",
    "cipher-text",
    "blur-cascade",
    "chromatic-type",
    "tidal-lattice",
    "aurora-veil",
    "contour-field",
    "raster-current",
    "noise-bloom",
    "orbit-pointer",
    "halo-lens",
    "echo-trail",
    "bearing-card",
    "foil-card",
    "aperture-card",
    "fold-card",
    "infinite-editorial",
    "depth-deck",
    "drag-index",
    "elastic-rail",
    "sliding-index",
    "curtain-nav",
    "magnetic-action",
    "ink-ripple",
    "split-action",
    "pinned-narrative",
    "lateral-passage",
    "depth-scroll",
    "orbital-matter",
    "parallax-prism",
  ];
  return list[(list.indexOf(slug) + 1) % list.length];
}
