const n=`import { useRef, useState } from "react";

type GalleryProps = { speed?: number; intensity?: number; color?: string };
const items = [
  { n: "01", title: "LOREM", hue: "lime" },
  { n: "02", title: "IPSUM", hue: "orange" },
  { n: "03", title: "DOLOR", hue: "blue" },
  { n: "04", title: "AMET", hue: "cream" },
];

export function InfiniteEditorial({
  speed = 0.8,
  intensity = 0.8,
}: GalleryProps) {
  return (
    <div
      className="gallery-stage infinite-editorial"
      style={
        {
          "--effect-speed": \`\${18 / speed}s\`,
          "--effect-intensity": intensity,
        } as React.CSSProperties
      }
      aria-label="Continuously moving editorial cards"
    >
      <div className="infinite-editorial__track">
        {[...items, ...items].map((item, i) => (
          <div
            className={\`gallery-tile gallery-tile--\${item.hue}\`}
            key={i}
            aria-hidden={i >= items.length}
          >
            <span>{item.n} / 04</span>
            <strong>{item.title}</strong>
            <i>↗</i>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DepthDeck({ intensity = 0.8, speed = 0.8 }: GalleryProps) {
  const [active, setActive] = useState(0);
  return (
    <div
      className="gallery-stage depth-deck"
      style={
        {
          "--effect-intensity": intensity,
          "--effect-speed": \`\${0.7 / speed}s\`,
        } as React.CSSProperties
      }
    >
      <div className="depth-deck__cards">
        {items.map((item, i) => {
          const distance = (i - active + items.length) % items.length;
          return (
            <button
              type="button"
              className={\`gallery-tile gallery-tile--\${item.hue} depth-deck__card\`}
              key={item.n}
              onClick={() => setActive(i)}
              aria-label={\`Show \${item.title}\`}
              style={{ "--depth": distance } as React.CSSProperties}
            >
              <span>{item.n} / 04</span>
              <strong>{item.title}</strong>
              <i>↗</i>
            </button>
          );
        })}
      </div>
      <div className="depth-deck__controls">
        <span>0{active + 1} / 04</span>
        <button
          type="button"
          onClick={() => setActive((active + 1) % items.length)}
          aria-label="Next card"
        >
          NEXT <b>↗</b>
        </button>
      </div>
    </div>
  );
}

export function DragIndex({ intensity = 0.8, speed = 0.8 }: GalleryProps) {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef({ start: 0, offset: 0, dragging: false });
  const down = (event: React.PointerEvent<HTMLDivElement>) => {
    drag.current.start = event.clientX;
    drag.current.dragging = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.dragging || !ref.current) return;
    const next =
      drag.current.offset + (event.clientX - drag.current.start) * intensity;
    ref.current.style.transform = \`translate3d(\${Math.max(-550, Math.min(0, next))}px,0,0)\`;
  };
  const up = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.dragging) return;
    drag.current.offset = Math.max(
      -550,
      Math.min(
        0,
        drag.current.offset + (event.clientX - drag.current.start) * intensity,
      ),
    );
    drag.current.dragging = false;
  };
  return (
    <div
      className="gallery-stage drag-index"
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      style={{ "--effect-speed": \`\${0.5 / speed}s\` } as React.CSSProperties}
      aria-label="Drag the gallery horizontally"
    >
      <div className="drag-index__track" ref={ref}>
        {items.map((item) => (
          <div
            className={\`gallery-tile gallery-tile--\${item.hue}\`}
            key={item.n}
          >
            <span>{item.n} / 04</span>
            <strong>{item.title}</strong>
            <i>↗</i>
          </div>
        ))}
      </div>
      <span className="drag-index__hint">← DRAG TO EXPLORE →</span>
    </div>
  );
}
`;export{n as default};
