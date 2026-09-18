const e=`import { useEffect, useRef, useState } from "react";
import { useReducedMotion, useVisible } from "../../hooks/useMotion";

type TypeProps = {
  text?: string;
  speed?: number;
  intensity?: number;
  color?: string;
};

export function SplitReveal({
  text = "Lorem ipsum",
  speed = 0.8,
  intensity = 0.8,
}: TypeProps) {
  const { ref, visible } = useVisible<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={\`type-study split-reveal \${visible ? "is-visible" : ""}\`}
      aria-label={text}
      style={
        {
          "--effect-speed": \`\${0.85 / speed}s\`,
          "--effect-intensity": intensity,
        } as React.CSSProperties
      }
    >
      {text.split(" ").map((word, i) => (
        <span
          className="split-reveal__mask"
          key={\`\${word}-\${i}\`}
          aria-hidden="true"
        >
          <span style={{ transitionDelay: \`\${i * 65}ms\` }}>{word}&nbsp;</span>
        </span>
      ))}
    </div>
  );
}

export function OrbitLetters({
  text = "Lorem ipsum",
  intensity = 0.8,
  speed = 0.8,
}: TypeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const letters = node.querySelectorAll<HTMLElement>(".orbit-letters__char");
    letters.forEach((letter, i) => {
      const rect = letter.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;
      const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / 180);
      letter.style.transform = \`translate3d(\${(-dx * falloff * intensity * 0.13).toFixed(1)}px,\${(-dy * falloff * intensity * 0.32).toFixed(1)}px,0) rotate(\${(dx * falloff * intensity * 0.07).toFixed(1)}deg)\`;
      letter.style.transitionDuration = \`\${0.55 / speed}s\`;
      letter.style.zIndex = \`\${Math.round(falloff * 10) + i}\`;
    });
  };
  const leave = () =>
    ref.current
      ?.querySelectorAll<HTMLElement>(".orbit-letters__char")
      .forEach((letter) => {
        letter.style.transform = "";
      });
  return (
    <div
      ref={ref}
      className="type-study orbit-letters"
      onPointerMove={move}
      onPointerLeave={leave}
      aria-label={text}
    >
      {Array.from(text).map((character, i) => (
        <span className="orbit-letters__char" aria-hidden="true" key={i}>
          {character === " " ? "\\u00a0" : character}
        </span>
      ))}
    </div>
  );
}

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export function CipherText({
  text = "Lorem ipsum",
  speed = 0.8,
  intensity = 0.8,
}: TypeProps) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<number | null>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    setDisplay(text);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [text]);
  const activate = () => {
    if (reduced) return;
    if (timer.current) window.clearInterval(timer.current);
    let frame = 0;
    const total = Math.ceil(text.length * (1.3 + intensity));
    timer.current = window.setInterval(() => {
      frame++;
      const settled = Math.floor(frame / (1.3 + intensity));
      setDisplay(
        Array.from(text)
          .map((char, i) =>
            char === " "
              ? " "
              : i < settled
                ? char
                : alphabet[(Math.random() * alphabet.length) | 0],
          )
          .join(""),
      );
      if (frame >= total) {
        setDisplay(text);
        if (timer.current) window.clearInterval(timer.current);
        timer.current = null;
      }
    }, 35 / speed);
  };
  return (
    <button
      type="button"
      className="type-study cipher-text"
      onPointerEnter={activate}
      onFocus={activate}
      onClick={activate}
      aria-label={\`\${text}, activate text scramble\`}
    >
      <span aria-hidden="true">{display}</span>
    </button>
  );
}

export function BlurCascade({
  text = "Lorem ipsum",
  speed = 0.8,
  intensity = 0.8,
}: TypeProps) {
  const { ref, visible } = useVisible<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={\`type-study blur-cascade \${visible ? "is-visible" : ""}\`}
      aria-label={text}
      style={
        {
          "--effect-speed": \`\${0.95 / speed}s\`,
          "--effect-blur": \`\${intensity * 18}px\`,
        } as React.CSSProperties
      }
    >
      {Array.from(text).map((char, i) => (
        <span
          aria-hidden="true"
          key={i}
          style={{ transitionDelay: \`\${i * 35}ms\` }}
        >
          {char === " " ? "\\u00a0" : char}
        </span>
      ))}
    </div>
  );
}

export function ChromaticType({
  text = "Lorem ipsum",
  intensity = 0.8,
  color = "#d9f36a",
}: TypeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 20 * intensity;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 16 * intensity;
    ref.current.style.setProperty("--shift-x", \`\${x}px\`);
    ref.current.style.setProperty("--shift-y", \`\${y}px\`);
  };
  return (
    <div
      ref={ref}
      className="type-study chromatic-type"
      onPointerMove={move}
      onPointerLeave={() => {
        ref.current?.style.setProperty("--shift-x", "0px");
        ref.current?.style.setProperty("--shift-y", "0px");
      }}
      style={{ "--effect-color": color } as React.CSSProperties}
      aria-label={text}
    >
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true">{text}</span>
    </div>
  );
}
`;export{e as default};
