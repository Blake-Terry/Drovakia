import { useRef } from "react";
import { useCanvasScene, useReducedMotion } from "../../hooks/useMotion";

type CursorProps = { intensity?: number; color?: string; speed?: number };

export function OrbitPointer({
  intensity = 0.8,
  color = "#d9f36a",
}: CursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
    node.style.setProperty("--orbit-scale", `${0.7 + intensity * 0.65}`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={move}
      className="cursor-stage orbit-pointer"
      style={{ "--effect-color": color } as React.CSSProperties}
    >
      <div className="cursor-stage__cross">+</div>
      <span className="cursor-stage__label">MOVE / 001</span>
      <strong>
        LOREM
        <br />
        <em>IPSUM</em>
      </strong>
      <span className="orbit-pointer__ring" aria-hidden="true" />
      <span className="orbit-pointer__dot" aria-hidden="true" />
    </div>
  );
}

export function HaloLens({ intensity = 0.8, color = "#d9f36a" }: CursorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty(
      "--x",
      `${((event.clientX - rect.left) / rect.width) * 100}%`,
    );
    node.style.setProperty(
      "--y",
      `${((event.clientY - rect.top) / rect.height) * 100}%`,
    );
  };
  return (
    <div
      ref={ref}
      onPointerMove={move}
      className="cursor-stage halo-lens"
      style={
        {
          "--effect-color": color,
          "--effect-opacity": intensity,
        } as React.CSSProperties
      }
    >
      <span className="cursor-stage__label">FOLLOW / 002</span>
      <div className="halo-lens__grid" />
      <strong>
        CURSOR
        <br />
        <em>STUDY</em>
      </strong>
      <div className="halo-lens__light" aria-hidden="true" />
    </div>
  );
}

export function EchoTrail({
  intensity = 0.8,
  speed = 0.8,
  color = "#d9f36a",
}: CursorProps) {
  const reduced = useReducedMotion();
  const canvas = useCanvasScene(
    (ctx, { width, height, pointer, time }) => {
      ctx.fillStyle = reduced ? "#11130f" : "rgba(17,19,15,.13)";
      ctx.fillRect(0, 0, width, height);
      if (!pointer.active) return;
      const x = pointer.x * width,
        y = pointer.y * height;
      for (let i = 0; i < 4; i++) {
        const angle = time * speed * 4 + (i * Math.PI) / 2;
        ctx.beginPath();
        ctx.arc(
          x + Math.cos(angle) * 15 * intensity,
          y + Math.sin(angle) * 15 * intensity,
          2 + i * 1.6,
          0,
          Math.PI * 2,
        );
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8 - i * 0.17;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    },
    [intensity, speed, color, reduced],
  );
  return (
    <div className="cursor-stage echo-trail">
      <canvas
        ref={canvas}
        className="effect-canvas"
        aria-label="Pointer leaves luminous orbital traces"
        role="img"
      />
      <span className="cursor-stage__label">TRACE / 003</span>
      <strong>
        LEAVE
        <br />
        <em>A MARK</em>
      </strong>
    </div>
  );
}
