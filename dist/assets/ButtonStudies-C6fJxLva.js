const n=`import { useRef, useState } from "react";

type ButtonProps = { intensity?: number; speed?: number; color?: string };

export function MagneticAction({
  intensity = 0.8,
  speed = 0.8,
  color = "#d9f36a",
}: ButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const move = (event: React.PointerEvent<HTMLButtonElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = \`translate(\${x * 0.2 * intensity}px,\${y * 0.27 * intensity}px)\`;
    node.style.setProperty("--inner-x", \`\${x * 0.14 * intensity}px\`);
    node.style.setProperty("--inner-y", \`\${y * 0.16 * intensity}px\`);
  };
  return (
    <div className="button-stage">
      <button
        type="button"
        ref={ref}
        className="magnetic-action"
        onPointerMove={move}
        onPointerLeave={() => {
          if (ref.current) {
            ref.current.style.transform = "";
            ref.current.style.setProperty("--inner-x", "0px");
            ref.current.style.setProperty("--inner-y", "0px");
          }
        }}
        style={
          {
            "--effect-color": color,
            "--effect-speed": \`\${0.55 / speed}s\`,
          } as React.CSSProperties
        }
      >
        <span>
          EXPLORE MORE <b>↗</b>
        </span>
      </button>
    </div>
  );
}

export function InkRipple({ speed = 0.8, color = "#d9f36a" }: ButtonProps) {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const click = (event: React.MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples((previous) => [
      ...previous.slice(-3),
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);
    window.setTimeout(
      () =>
        setRipples((previous) => previous.filter((ripple) => ripple.id !== id)),
      850 / speed,
    );
  };
  return (
    <div className="button-stage">
      <button
        type="button"
        className="ink-ripple"
        onClick={click}
        style={
          {
            "--effect-color": color,
            "--effect-speed": \`\${0.8 / speed}s\`,
          } as React.CSSProperties
        }
      >
        <span>LOREM IPSUM</span>
        <b>→</b>
        {ripples.map((ripple) => (
          <i key={ripple.id} style={{ left: ripple.x, top: ripple.y }} />
        ))}
      </button>
    </div>
  );
}

export function SplitAction({ speed = 0.8, color = "#d9f36a" }: ButtonProps) {
  return (
    <div className="button-stage">
      <button
        type="button"
        className="split-action"
        style={
          {
            "--effect-color": color,
            "--effect-speed": \`\${0.55 / speed}s\`,
          } as React.CSSProperties
        }
      >
        <span>DISCOVER</span>
        <span aria-hidden="true">DISCOVER</span>
        <b>↗</b>
      </button>
    </div>
  );
}
`;export{n as default};
