import { useEffect, useRef, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function useVisible<T extends HTMLElement>(margin = "100px") {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: margin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);
  return { ref, visible };
}

export type PointerState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  active: boolean;
};

export function usePointerField<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const pointer = useRef<PointerState>({
    x: 0.5,
    y: 0.5,
    vx: 0,
    vy: 0,
    active: false,
  });
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let previousX = 0.5;
    let previousY = 0.5;
    const move = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      pointer.current = {
        x,
        y,
        vx: x - previousX,
        vy: y - previousY,
        active: true,
      };
      previousX = x;
      previousY = y;
    };
    const leave = () => {
      pointer.current.active = false;
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, []);
  return { ref, pointer };
}

export type CanvasFrame = {
  width: number;
  height: number;
  time: number;
  pointer: PointerState;
};

export function useCanvasScene(
  draw: (context: CanvasRenderingContext2D, frame: CanvasFrame) => void,
  dependencies: unknown[],
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let width = 0;
    let height = 0;
    let active = true;
    let frameId = 0;
    let start = performance.now();
    const target: PointerState = {
      x: 0.5,
      y: 0.5,
      vx: 0,
      vy: 0,
      active: false,
    };
    const eased: PointerState = { ...target };
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      render(performance.now());
    };
    const move = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      target.vx = x - target.x;
      target.vy = y - target.y;
      target.x = x;
      target.y = y;
      target.active = true;
    };
    const leave = () => {
      target.active = false;
    };
    function render(now: number) {
      if (!context || !active) return;
      eased.x += (target.x - eased.x) * 0.075;
      eased.y += (target.y - eased.y) * 0.075;
      eased.vx += (target.vx - eased.vx) * 0.12;
      eased.vy += (target.vy - eased.vy) * 0.12;
      target.vx *= 0.84;
      target.vy *= 0.84;
      eased.active = target.active;
      draw(context, {
        width,
        height,
        time: reduced ? 0 : (now - start) / 1000,
        pointer: eased,
      });
    }
    const tick = (now: number) => {
      render(now);
      frameId = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active && !reduced) {
          start = performance.now();
          cancelAnimationFrame(frameId);
          frameId = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(frameId);
          if (active) render(performance.now());
        }
      },
      { rootMargin: "80px" },
    );
    const resizer = new ResizeObserver(resize);
    resizer.observe(canvas);
    observer.observe(canvas);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      resizer.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
    };
    // The draw closure is intentionally refreshed when its visual parameters change.
  }, [reduced, ...dependencies]);
  return canvasRef;
}
