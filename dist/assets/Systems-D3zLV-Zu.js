const n=`import { useCanvasScene } from "../../hooks/useMotion";

type SystemProps = {
  speed?: number;
  intensity?: number;
  density?: number;
  color?: string;
};

export function OrbitalMatter({
  speed = 0.8,
  intensity = 0.8,
  density = 35,
  color = "#d9f36a",
}: SystemProps) {
  const canvas = useCanvasScene(
    (ctx, { width, height, time, pointer }) => {
      ctx.fillStyle = "rgba(16,18,14,.26)";
      ctx.fillRect(0, 0, width, height);
      const count = Math.min(750, Math.max(100, Math.round(density * 12)));
      const centerX =
        width *
        (pointer.active ? 0.5 + (pointer.x - 0.5) * 0.16 * intensity : 0.5);
      const centerY =
        height *
        (pointer.active ? 0.5 + (pointer.y - 0.5) * 0.16 * intensity : 0.5);
      for (let i = 0; i < count; i++) {
        const spiral = i / count;
        const angle = i * 2.39996 + time * speed * (0.25 + spiral * 0.4);
        const radius = Math.sqrt(spiral) * Math.min(width, height) * 0.41;
        const warp = Math.sin(angle * 3 + time * speed) * 12 * intensity;
        const x = centerX + Math.cos(angle) * (radius + warp);
        const y = centerY + Math.sin(angle) * (radius + warp) * 0.62;
        ctx.beginPath();
        ctx.arc(x, y, i % 11 === 0 ? 2.2 : 0.65 + spiral * 0.7, 0, Math.PI * 2);
        ctx.fillStyle =
          i % 5 === 0 ? color : i % 4 === 0 ? "#e98f6f" : "#e8e9d8";
        ctx.globalAlpha = 0.2 + (1 - spiral) * 0.7;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    },
    [speed, intensity, density, color],
  );
  return (
    <canvas
      ref={canvas}
      className="effect-canvas"
      role="img"
      aria-label="Reactive orbital particle system"
    />
  );
}

export function ParallaxPrism({
  speed = 0.8,
  intensity = 0.8,
  density = 12,
  color = "#d9f36a",
}: SystemProps) {
  const canvas = useCanvasScene(
    (ctx, { width, height, time, pointer }) => {
      ctx.fillStyle = "#171915";
      ctx.fillRect(0, 0, width, height);
      const count = Math.max(7, Math.round(density));
      const center = { x: width * 0.5, y: height * 0.5 };
      ctx.save();
      ctx.translate(center.x, center.y);
      for (let i = count - 1; i >= 0; i--) {
        const scale = 1 - i / (count + 2);
        const angle = time * speed * 0.07 * (i % 2 ? -1 : 1) + i * 0.18;
        const dx = (pointer.x - 0.5) * 70 * intensity * scale;
        const dy = (pointer.y - 0.5) * 55 * intensity * scale;
        ctx.save();
        ctx.translate(dx, dy);
        ctx.rotate(angle);
        const size = Math.min(width, height) * 0.43 * scale;
        ctx.beginPath();
        for (let j = 0; j < 6; j++) {
          const a = (Math.PI / 3) * j;
          const x = Math.cos(a) * size;
          const y = Math.sin(a) * size;
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = i % 3 === 0 ? color : "rgba(233,236,214,.35)";
        ctx.lineWidth = i % 3 === 0 ? 1.5 : 0.6;
        ctx.globalAlpha = 0.4 + scale * 0.5;
        ctx.stroke();
        ctx.restore();
      }
      ctx.restore();
      ctx.globalAlpha = 1;
    },
    [speed, intensity, density, color],
  );
  return (
    <canvas
      ref={canvas}
      className="effect-canvas"
      role="img"
      aria-label="Layered rotating prism geometry"
    />
  );
}
`;export{n as default};
