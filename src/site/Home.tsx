import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  TidalLattice,
  ContourField,
  AuroraVeil,
} from "../effects/backgrounds/Fields";
import { OrbitLetters } from "../effects/text/TypeStudies";
import { FoilCard } from "../effects/cards/CardStudies";
import { OrbitalMatter } from "../effects/experimental/Systems";
import { useReducedMotion } from "../hooks/useMotion";

gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [density, setDensity] = useState(18);
  const [intensity, setIntensity] = useState(0.8);
  const [speed, setSpeed] = useState(0.7);
  useEffect(() => {
    if (reduced || !root.current) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 960px)", () => {
      const scope = root.current!;
      const statement = scope.querySelector<HTMLElement>(".statement");
      const journey = scope.querySelector<HTMLElement>(".journey");
      const rail = scope.querySelector<HTMLElement>(".journey__rail");
      if (statement) {
        gsap.fromTo(
          ".statement__line",
          { yPercent: 18, opacity: 0.32 },
          {
            yPercent: -10,
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: {
              trigger: statement,
              start: "top 85%",
              end: "bottom 15%",
              scrub: 1,
            },
          },
        );
      }
      if (journey && rail) {
        gsap.to(rail, {
          x: () => -(rail.scrollWidth - journey.clientWidth + 80),
          ease: "none",
          scrollTrigger: {
            trigger: journey,
            start: "top top",
            end: () => `+=${rail.scrollWidth - journey.clientWidth + 550}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });
      }
    });
    return () => media.revert();
  }, [reduced]);
  return (
    <div ref={root} className="home">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__visual">
          <TidalLattice speed={0.45} intensity={0.9} density={19} />
          <div className="hero__visual-mask" />
        </div>
        <div className="hero__meta">
          <span>
            <i className="status-dot" /> INTERACTIVE SYSTEMS / VOL. 01
          </span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
        <div className="hero__type">
          <div className="hero__intro">
            A FICTIONAL COMPONENT INDEX
            <br />
            BUILT FOR THE UNEXPECTED.
          </div>
          <h1 id="hero-title">
            <span>FORM</span>
            <span>
              <em>/</em> FIELD<span className="hero__asterisk">✳</span>
            </span>
          </h1>
          <div className="hero__bottom">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum id ligula porta felis euismod semper.
            </p>
            <a href="#/effect/tidal-lattice">
              ENTER THE INDEX <span>↗</span>
            </a>
          </div>
        </div>
        <div className="hero__number">
          FF
          <br />/ 01
        </div>
      </section>

      <section className="statement">
        <div className="statement__top">
          <span>001 / THE PREMISE</span>
          <span>FORM IS NEVER STILL</span>
        </div>
        <div className="statement__body">
          <div className="statement__cross">✳</div>
          <h2>
            <span className="statement__line">MOTION</span>
            <span className="statement__line">
              WITH <em>MASS.</em>
            </span>
          </h2>
          <div className="statement__lower">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              commodo cursus magna, vel scelerisque nisl consectetur et. Nullam
              id dolor id nibh ultricies vehicula ut id elit.
            </p>
            <span>
              31 STUDIES
              <br />
              09 FAMILIES
              <br />∞ POSSIBILITIES
            </span>
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="section-intro">
          <div>
            <span className="overline">002 / SELECTED STUDIES</span>
            <h2>
              Signals from
              <br />
              <em>the index.</em>
            </h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            lacinia bibendum nulla sed consectetur. Explore the live material.
          </p>
        </div>
        <div className="featured__grid">
          <a className="feature feature--wide" href="#/effect/contour-field">
            <div className="feature__surface">
              <ContourField speed={0.45} density={24} intensity={1} />
            </div>
            <div className="feature__caption">
              <span>BACKGROUND / 03</span>
              <strong>Contour Field</strong>
              <b>↗</b>
            </div>
          </a>
          <a className="feature feature--card" href="#/effect/foil-card">
            <div className="feature__surface">
              <FoilCard />
            </div>
            <div className="feature__caption">
              <span>CARDS / 02</span>
              <strong>Foil Card</strong>
              <b>↗</b>
            </div>
          </a>
          <a className="feature feature--type" href="#/effect/orbit-letters">
            <div className="feature__surface">
              <OrbitLetters text="LOREM IPSUM" intensity={1} />
            </div>
            <div className="feature__caption">
              <span>TEXT / 02</span>
              <strong>Orbit Letters</strong>
              <b>↗</b>
            </div>
          </a>
        </div>
      </section>

      <section className="playground">
        <div className="playground__header">
          <span className="overline">003 / MAKE IT MOVE</span>
          <span>LIVE / FULLY CONFIGURABLE</span>
        </div>
        <div className="playground__layout">
          <div className="playground__copy">
            <h2>
              The field
              <br />
              <em>is yours.</em>
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              faucibus mollis interdum. Shape the system in real time.
            </p>
            <div className="playground__controls">
              <label>
                INTENSITY <output>{intensity.toFixed(1)}</output>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.1"
                  value={intensity}
                  onChange={(event) => setIntensity(Number(event.target.value))}
                />
              </label>
              <label>
                DENSITY <output>{density}</output>
                <input
                  type="range"
                  min="7"
                  max="40"
                  step="1"
                  value={density}
                  onChange={(event) => setDensity(Number(event.target.value))}
                />
              </label>
              <label>
                VELOCITY <output>{speed.toFixed(1)}</output>
                <input
                  type="range"
                  min="0.1"
                  max="1.5"
                  step="0.1"
                  value={speed}
                  onChange={(event) => setSpeed(Number(event.target.value))}
                />
              </label>
            </div>
            <a href="#/effect/tidal-lattice">
              EXPLORE THIS COMPONENT <span>↗</span>
            </a>
          </div>
          <div className="playground__visual">
            <TidalLattice
              intensity={intensity}
              density={density}
              speed={speed}
            />
            <div className="playground__coordinates">
              <span>POINTER RESPONSIVE</span>
              <span>FF / 0001</span>
            </div>
          </div>
        </div>
      </section>

      <section className="journey">
        <div className="journey__head">
          <span>004 / THE COLLECTION</span>
          <span>DRAG THE PAGE WITH YOUR SCROLL ↓</span>
        </div>
        <div className="journey__rail">
          <div className="journey__lead">
            <h2>
              EVERY
              <br />
              <em>GESTURE</em>
              <br />
              MATTERS.
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante venenatis dapibus.
            </p>
          </div>
          {[
            {
              name: "TEXT",
              count: "05",
              slug: "split-reveal",
              mark: "A",
              className: "journey__tile--text",
            },
            {
              name: "FIELDS",
              count: "05",
              slug: "tidal-lattice",
              mark: "✳",
              className: "journey__tile--fields",
            },
            {
              name: "OBJECTS",
              count: "04",
              slug: "bearing-card",
              mark: "◩",
              className: "journey__tile--objects",
            },
            {
              name: "SYSTEMS",
              count: "02",
              slug: "orbital-matter",
              mark: "◎",
              className: "journey__tile--systems",
            },
          ].map((item, i) => (
            <a
              className={`journey__tile ${item.className}`}
              href={`#/effect/${item.slug}`}
              key={item.name}
            >
              <span>0{i + 1} / COLLECTION</span>
              <b>{item.mark}</b>
              <div>
                <strong>{item.name}</strong>
                <span>{item.count} STUDIES ↗</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="experimental">
        <div className="experimental__visual">
          <OrbitalMatter speed={0.5} density={48} intensity={0.9} />
        </div>
        <div className="experimental__content">
          <span className="overline">005 / THE EDGE</span>
          <h2>
            BEYOND
            <br />
            <em>THE FRAME.</em>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            ullamcorper nulla non metus auctor fringilla.
          </p>
          <a href="#/effect/orbital-matter">
            ENTER EXPERIMENTAL <b>↗</b>
          </a>
        </div>
        <span className="experimental__coordinate">X: 48.02 / Y: 16.81</span>
      </section>

      <section className="finale">
        <div className="finale__texture">
          <AuroraVeil speed={0.25} intensity={0.35} />
        </div>
        <div className="finale__top">
          <span>006 / END OF INTRODUCTION</span>
          <span>START OF EVERYTHING ELSE</span>
        </div>
        <h2>
          TAKE THE
          <br />
          <em>LONG WAY</em>
          <span> ↗</span>
        </h2>
        <div className="finale__bottom">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae
            elit libero, a pharetra augue.
          </p>
          <a href="#/effect/split-reveal">
            BROWSE ALL 31 STUDIES <b>↗</b>
          </a>
        </div>
      </section>
      <footer className="site-footer">
        <span>FORM / FIELD — A FICTIONAL TEMPLATE</span>
        <span>BUILT TO BE TAKEN APART.</span>
        <a href="#/">BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}
