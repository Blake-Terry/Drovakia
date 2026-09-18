const n=`import { useMemo } from "react";
import { useCanvasScene } from "../../hooks/useMotion";

type FieldProps = {
  speed?: number;
  intensity?: number;
  density?: number;
  color?: string;
};

/** An elastic drawing surface. Pointer velocity folds nearby grid intersections. */
export function TidalLattice({
  speed = 0.7,
  intensity = 0.8,
  density = 18,
  color = "#d9f36a",
}: FieldProps) {
  const canvas = useCanvasScene(
    (ctx, { width, height, time, pointer }) => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#11130f";
      ctx.fillRect(0, 0, width, height);
      const step = Math.max(18, Math.min(width, height) / density);
      const columns = Math.ceil(width / step) + 1;
      const rows = Math.ceil(height / step) + 1;
      const px = pointer.x * width;
      const py = pointer.y * height;
      const radius = Math.max(width, height) * 0.39;
      const point = (x: number, y: number) => {
        const dx = x - px;
        const dy = y - py;
        const distance = Math.hypot(dx, dy);
        const falloff = pointer.active
          ? Math.pow(Math.max(0, 1 - distance / radius), 2)
          : 0;
        const wave =
          Math.sin(
            x * 0.012 + time * speed * 1.35 + Math.cos(y * 0.009 - time * 0.4),
          ) *
          5 *
          intensity;
        return {
          x:
            x +
            wave +
            dx * falloff * 0.13 * intensity +
            pointer.vx * falloff * width * 1.7,
          y:
            y +
            Math.cos(y * 0.01 + time * speed) * 4 * intensity +
            dy * falloff * 0.13 * intensity +
            pointer.vy * falloff * height * 1.7,
          glow: falloff,
        };
      };
      for (let row = 0; row < rows; row++) {
        ctx.beginPath();
        for (let col = 0; col < columns; col++) {
          const p = point(col * step, row * step);
          col === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = "rgba(228,232,214,.16)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let col = 0; col < columns; col++) {
        ctx.beginPath();
        for (let row = 0; row < rows; row++) {
          const p = point(col * step, row * step);
          row === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < columns; col++) {
          const p = point(col * step, row * step);
          const bright = p.glow > 0.12 || (row + col) % 5 === 0;
          ctx.beginPath();
          ctx.arc(p.x, p.y, bright ? 1.4 + p.glow * 2.3 : 0.65, 0, Math.PI * 2);
          ctx.fillStyle = bright ? color : "rgba(230,232,213,.28)";
          ctx.globalAlpha = bright ? 0.38 + p.glow * 0.6 : 1;
          ctx.fill();
        }
      ctx.globalAlpha = 1;
      const halo = ctx.createRadialGradient(px, py, 0, px, py, radius);
      halo.addColorStop(0, pointer.active ? \`\${color}20\` : "transparent");
      halo.addColorStop(1, "transparent");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, width, height);
    },
    [speed, intensity, density, color],
  );
  return (
    <canvas
      ref={canvas}
      className="effect-canvas"
      aria-label="Interactive elastic lattice"
      role="img"
    />
  );
}

export function AuroraVeil({
  speed = 0.6,
  intensity = 0.8,
  color = "#d9f36a",
}: FieldProps) {
  return (
    <div
      className="aurora-veil"
      style={
        {
          "--effect-speed": \`\${12 / speed}s\`,
          "--effect-opacity": intensity,
          "--effect-color": color,
        } as React.CSSProperties
      }
      aria-label="Animated aurora color field"
      role="img"
    >
      <span />
      <span />
      <span />
      <i className="aurora-veil__grain" />
    </div>
  );
}

/** Contours are real SVG paths with independent phase offsets. */
export function ContourField({
  speed = 0.7,
  intensity = 0.8,
  density = 18,
  color = "#d9f36a",
}: FieldProps) {
  const lines = useMemo(
    () =>
      Array.from({ length: Math.round(density) }, (_, i) => {
        const base = 24 + i * (452 / Math.max(1, density - 1));
        const points = Array.from({ length: 21 }, (_, j) => {
          const x = j * 50;
          const y =
            base +
            Math.sin(j * 0.75 + i * 0.36) * 13 * intensity +
            Math.cos(j * 0.3 - i * 0.54) * 9 * intensity;
          return \`\${j === 0 ? "M" : "L"}\${x},\${y.toFixed(1)}\`;
        });
        return points.join(" ");
      }),
    [density, intensity],
  );
  return (
    <div
      className="contour-field"
      style={{ "--effect-speed": \`\${10 / speed}s\` } as React.CSSProperties}
    >
      <svg
        viewBox="0 0 1000 500"
        preserveAspectRatio="xMidYMid slice"
        aria-label="Moving topographic contour lines"
        role="img"
      >
        <defs>
          <linearGradient id="contour-gradient">
            <stop stopColor={color} />
            <stop offset=".55" stopColor="#e7e8d8" />
            <stop offset="1" stopColor={color} stopOpacity=".2" />
          </linearGradient>
        </defs>
        {lines.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="url(#contour-gradient)"
            strokeWidth={i % 5 === 0 ? 1.4 : 0.55}
            opacity={i % 5 === 0 ? 0.74 : 0.37}
            style={{ animationDelay: \`\${-i * 0.25}s\` }}
          />
        ))}
      </svg>
      <span className="contour-field__orb" />
    </div>
  );
}

export function RasterCurrent({
  speed = 0.7,
  intensity = 0.8,
  density = 22,
  color = "#d9f36a",
}: FieldProps) {
  const canvas = useCanvasScene(
    (ctx, { width, height, time, pointer }) => {
      ctx.fillStyle = "#171a15";
      ctx.fillRect(0, 0, width, height);
      const spacing = Math.max(16, width / (density * 1.5));
      const columns = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);
      const px = pointer.x * width;
      const py = pointer.y * height;
      ctx.lineWidth = 1.2;
      for (let y = 0; y <= rows; y++)
        for (let x = 0; x <= columns; x++) {
          const cx = x * spacing;
          const cy = y * spacing;
          const flow =
            Math.sin(cx * 0.012 + time * speed) +
            Math.cos(cy * 0.016 - time * speed * 0.7);
          const distance = Math.hypot(cx - px, cy - py);
          const influence = pointer.active
            ? Math.max(0, 1 - distance / 170)
            : 0;
          const angle = flow * 0.7 * intensity + influence * 2.8;
          const length = 3 + Math.abs(flow) * 5 + influence * 13;
          ctx.beginPath();
          ctx.moveTo(
            cx - Math.cos(angle) * length,
            cy - Math.sin(angle) * length,
          );
          ctx.lineTo(
            cx + Math.cos(angle) * length,
            cy + Math.sin(angle) * length,
          );
          ctx.strokeStyle =
            influence > 0.15
              ? color
              : \`rgba(224,231,204,\${0.15 + Math.abs(flow) * 0.19})\`;
          ctx.stroke();
        }
    },
    [speed, intensity, density, color],
  );
  return (
    <canvas
      ref={canvas}
      className="effect-canvas"
      aria-label="Interactive vector field of flowing line segments"
      role="img"
    />
  );
}

export function NoiseBloom({
  speed = 0.5,
  intensity = 0.8,
  color = "#d9f36a",
}: FieldProps) {
  const canvas = useCanvasScene(
    (ctx, { width, height, time, pointer }) => {
      ctx.fillStyle = "#11130f";
      ctx.fillRect(0, 0, width, height);
      const centers = [
        [0.18, 0.4, 160],
        [0.75, 0.54, 180],
        [0.47, 0.68, 90],
      ];
      centers.forEach(([cx, cy, radius], i) => {
        const x = width * cx + Math.sin(time * speed + i * 2) * width * 0.09;
        const y =
          height * cy + Math.cos(time * speed * 0.8 + i) * height * 0.09;
        const gradient = ctx.createRadialGradient(
          x,
          y,
          0,
          x,
          y,
          radius * (0.8 + intensity * 0.6),
        );
        gradient.addColorStop(0, i === 1 ? "#ef895e90" : \`\${color}85\`);
        gradient.addColorStop(0.45, i === 1 ? "#bb4d4440" : \`\${color}2b\`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      });
      const count = Math.min(1300, Math.round((width * height) / 300));
      for (let i = 0; i < count; i++) {
        const x = (i * 127.43) % width;
        const y = (i * 269.71) % height;
        const near = pointer.active
          ? Math.max(
              0,
              1 -
                Math.hypot(x - pointer.x * width, y - pointer.y * height) / 150,
            )
          : 0;
        ctx.fillStyle = \`rgba(245,246,221,\${(0.045 + near * 0.25) * intensity})\`;
        ctx.fillRect(x + Math.sin(time * speed + i) * 1.5, y, 1, 1);
      }
    },
    [speed, intensity, color],
  );
  return (
    <canvas
      ref={canvas}
      className="effect-canvas"
      aria-label="Animated luminous noise field"
      role="img"
    />
  );
}
`;export{n as default};
