const n=`import { useRef, useState } from "react";

type CardProps = { intensity?: number; color?: string; speed?: number };
const CardContent = ({ index = "01" }: { index?: string }) => (
  <>
    <span className="study-card__top">
      FORM / FIELD <b>— {index}</b>
    </span>
    <div className="study-card__art">
      <span />
      <i />
      <b />
    </div>
    <span className="study-card__bottom">
      <strong>LOREM IPSUM</strong>
      <small>Placeholder / 2026</small>
    </span>
  </>
);

export function BearingCard({ intensity = 0.8, speed = 0.8 }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.setProperty("--rotate-x", \`\${-y * 19 * intensity}deg\`);
    node.style.setProperty("--rotate-y", \`\${x * 19 * intensity}deg\`);
    node.style.setProperty("--glow-x", \`\${(x + 0.5) * 100}%\`);
    node.style.setProperty("--glow-y", \`\${(y + 0.5) * 100}%\`);
  };
  return (
    <div className="card-stage">
      <div
        ref={ref}
        className="study-card bearing-card"
        onPointerMove={move}
        onPointerLeave={() => {
          ref.current?.style.setProperty("--rotate-x", "0deg");
          ref.current?.style.setProperty("--rotate-y", "0deg");
        }}
        style={{ "--effect-speed": \`\${0.5 / speed}s\` } as React.CSSProperties}
      >
        <CardContent />
      </div>
    </div>
  );
}

export function FoilCard({ intensity = 0.8, color = "#d9f36a" }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty(
      "--x",
      \`\${((event.clientX - rect.left) / rect.width) * 100}%\`,
    );
    node.style.setProperty(
      "--y",
      \`\${((event.clientY - rect.top) / rect.height) * 100}%\`,
    );
  };
  return (
    <div className="card-stage">
      <div
        ref={ref}
        className="study-card foil-card"
        onPointerMove={move}
        style={
          {
            "--effect-opacity": intensity,
            "--effect-color": color,
          } as React.CSSProperties
        }
      >
        <CardContent index="02" />
      </div>
    </div>
  );
}

export function ApertureCard({ speed = 0.8, color = "#d9f36a" }: CardProps) {
  return (
    <div className="card-stage">
      <div
        className="study-card aperture-card"
        tabIndex={0}
        style={
          {
            "--effect-speed": \`\${0.8 / speed}s\`,
            "--effect-color": color,
          } as React.CSSProperties
        }
      >
        <CardContent index="03" />
        <div className="aperture-card__reveal">
          <span>03 / HOVER STUDY</span>
          <strong>
            IPSUM
            <br />
            DOLOR
          </strong>
          <span>LOREM IPSUM DOLOR SIT AMET ↗</span>
        </div>
      </div>
    </div>
  );
}

export function FoldCard({ intensity = 0.8, speed = 0.8 }: CardProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card-stage">
      <button
        className={\`study-card fold-card \${open ? "is-open" : ""}\`}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        style={
          {
            "--effect-intensity": intensity,
            "--effect-speed": \`\${0.7 / speed}s\`,
          } as React.CSSProperties
        }
      >
        <CardContent index="04" />
        <span className="fold-card__flap">
          {open ? "CLOSE" : "OPEN"} <b>↗</b>
        </span>
        <span className="fold-card__inner">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit
          amet.
        </span>
      </button>
    </div>
  );
}
`;export{n as default};
