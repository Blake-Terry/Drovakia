import { useState } from "react";

type ScrollProps = { intensity?: number; speed?: number; color?: string };

export function PinnedNarrative({
  intensity = 0.8,
  color = "#d9f36a",
}: ScrollProps) {
  const [progress, setProgress] = useState(0);
  const scroll = (event: React.UIEvent<HTMLDivElement>) => {
    const node = event.currentTarget;
    setProgress(node.scrollTop / (node.scrollHeight - node.clientHeight));
  };
  const chapter = Math.min(2, Math.floor(progress * 3));
  return (
    <div
      className="scroll-stage pinned-narrative"
      onScroll={scroll}
      tabIndex={0}
      aria-label="Scroll to progress through three pinned chapters"
      style={{ "--effect-color": color } as React.CSSProperties}
    >
      <div className="pinned-narrative__track">
        <div className="pinned-narrative__sticky">
          <span className="scroll-stage__label">SCROLL / 001</span>
          <strong
            style={{ transform: `translateY(${-progress * 26 * intensity}px)` }}
          >
            {["LOREM", "IPSUM", "DOLOR"][chapter]}
          </strong>
          <span className="pinned-narrative__chapter">0{chapter + 1} / 03</span>
          <div className="pinned-narrative__progress">
            <i style={{ height: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LateralPassage({
  intensity = 0.8,
  color = "#d9f36a",
}: ScrollProps) {
  const [progress, setProgress] = useState(0);
  const scroll = (event: React.UIEvent<HTMLDivElement>) => {
    const node = event.currentTarget;
    setProgress(node.scrollTop / (node.scrollHeight - node.clientHeight));
  };
  return (
    <div
      className="scroll-stage lateral-passage"
      onScroll={scroll}
      tabIndex={0}
      aria-label="Scroll to move panels horizontally"
      style={{ "--effect-color": color } as React.CSSProperties}
    >
      <div className="lateral-passage__track">
        <div className="lateral-passage__sticky">
          <span className="scroll-stage__label">SCROLL / 002</span>
          <div
            className="lateral-passage__row"
            style={{ transform: `translateX(${-progress * 75 * intensity}%)` }}
          >
            {["LOREM", "IPSUM", "DOLOR"].map((title, i) => (
              <div key={title}>
                <small>0{i + 1} / 03</small>
                <strong>{title}</strong>
                <p>Lorem ipsum dolor sit amet.</p>
              </div>
            ))}
          </div>
          <span
            className="lateral-passage__meter"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function DepthScroll({
  intensity = 0.8,
  color = "#d9f36a",
}: ScrollProps) {
  const [progress, setProgress] = useState(0);
  const scroll = (event: React.UIEvent<HTMLDivElement>) => {
    const node = event.currentTarget;
    setProgress(node.scrollTop / (node.scrollHeight - node.clientHeight));
  };
  return (
    <div
      className="scroll-stage depth-scroll"
      onScroll={scroll}
      tabIndex={0}
      aria-label="Scroll to move layered geometric planes"
      style={{ "--effect-color": color } as React.CSSProperties}
    >
      <div className="depth-scroll__track">
        <div className="depth-scroll__sticky">
          <span className="scroll-stage__label">SCROLL / 003</span>
          <div
            className="depth-scroll__plane depth-scroll__plane--one"
            style={{
              transform: `translate3d(0,${-progress * 70 * intensity}px,0) rotate(${progress * 28}deg)`,
            }}
          />
          <div
            className="depth-scroll__plane depth-scroll__plane--two"
            style={{
              transform: `translate3d(0,${progress * 85 * intensity}px,0) rotate(${-progress * 18}deg)`,
            }}
          />
          <div
            className="depth-scroll__plane depth-scroll__plane--three"
            style={{
              transform: `scale(${1 + progress * intensity * 0.8}) rotate(${progress * 20}deg)`,
            }}
          />
          <strong>
            DEPTH
            <br />
            <em>STUDY</em>
          </strong>
        </div>
      </div>
    </div>
  );
}
