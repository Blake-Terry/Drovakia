const n=`import { useRef, useState } from "react";

type NavProps = { intensity?: number; speed?: number; color?: string };
const links = ["LOREM", "IPSUM", "DOLOR", "AMET"];

export function ElasticRail({ intensity = 0.8, color = "#d9f36a" }: NavProps) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.PointerEvent<HTMLButtonElement>) => {
    const rail = ref.current;
    if (!rail) return;
    const buttons = rail.querySelectorAll<HTMLElement>("button");
    buttons.forEach((button) => {
      const rect = button.getBoundingClientRect();
      const distance = Math.abs(event.clientX - rect.left - rect.width / 2);
      const proximity = Math.max(0, 1 - distance / 155);
      button.style.transform = \`translateY(\${-proximity * 25 * intensity}px) scale(\${1 + proximity * 0.28 * intensity})\`;
    });
  };
  const leave = () =>
    ref.current?.querySelectorAll<HTMLElement>("button").forEach((button) => {
      button.style.transform = "";
    });
  return (
    <div className="nav-stage">
      <div
        ref={ref}
        className="elastic-rail"
        onPointerLeave={leave}
        style={{ "--effect-color": color } as React.CSSProperties}
        aria-label="Interactive navigation rail"
      >
        {links.map((link, i) => (
          <button
            type="button"
            key={link}
            onPointerMove={move}
            aria-label={link}
          >
            <span>0{i + 1}</span>
            {link}
          </button>
        ))}
      </div>
    </div>
  );
}

export function SlidingIndex({ speed = 0.8, color = "#d9f36a" }: NavProps) {
  const [active, setActive] = useState(0);
  return (
    <div className="nav-stage">
      <div
        className="sliding-index"
        style={
          {
            "--active": active,
            "--effect-speed": \`\${0.5 / speed}s\`,
            "--effect-color": color,
          } as React.CSSProperties
        }
        role="tablist"
        aria-label="Placeholder navigation"
      >
        {links.map((link, i) => (
          <button
            type="button"
            role="tab"
            aria-selected={active === i}
            key={link}
            onClick={() => setActive(i)}
          >
            {link}
          </button>
        ))}
        <span className="sliding-index__marker" />
      </div>
      <div className="sliding-index__panel" role="tabpanel">
        <span>0{active + 1} / 04</span>
        <strong>{links[active]}</strong>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </div>
  );
}

export function CurtainNav({ speed = 0.8, color = "#d9f36a" }: NavProps) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={\`nav-stage curtain-nav \${open ? "is-open" : ""}\`}
      style={
        {
          "--effect-speed": \`\${0.75 / speed}s\`,
          "--effect-color": color,
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        className="curtain-nav__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        {open ? "CLOSE" : "EXPLORE"} <span>{open ? "×" : "+"}</span>
      </button>
      <div className="curtain-nav__sheet" aria-hidden={!open}>
        {links.map((link, i) => (
          <button
            type="button"
            key={link}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <small>0{i + 1}</small>
            {link}
            <span>↗</span>
          </button>
        ))}
      </div>
    </div>
  );
}
`;export{n as default};
