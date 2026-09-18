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
    const intro = gsap.context(() => {
      gsap.fromTo(
        ".hero h1 > span",
        { yPercent: 28, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.25,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.12,
        },
      );
      gsap.fromTo(
        ".hero__bottom",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          delay: 0.45,
        },
      );
      gsap.fromTo(
        ".feature__surface",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power3.inOut",
          stagger: 0.12,
          scrollTrigger: { trigger: ".featured__grid", start: "top 75%" },
        },
      );
      gsap.fromTo(
        ".experimental__visual",
        { scale: 0.78, rotate: -9 },
        {
          scale: 1.13,
          rotate: 7,
          ease: "none",
          scrollTrigger: {
            trigger: ".experimental",
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, root);
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
    return () => {
      intro.revert();
      media.revert();
    };
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
            <i className="status-dot" /> FICTIONAL STUDIO / VOL. 01
          </span>
          <span>SCROLL TO EXPLORE ↓</span>
        </div>
        <div className="hero__type">
          <div className="hero__intro">
            A FICTIONAL CREATIVE STUDIO
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
            <a href="#work">
              EXPLORE THE WORK <span>↗</span>
            </a>
          </div>
        </div>
        <div className="hero__number">
          FF
          <br />/ 01
        </div>
      </section>

      <section className="statement" id="about">
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
              04 DIRECTIONS
              <br />
              12 MOMENTS
              <br />∞ POSSIBILITIES
            </span>
          </div>
        </div>
      </section>

      <section className="featured" id="work">
        <div className="section-intro">
          <div>
            <span className="overline">002 / SELECTED MOMENTS</span>
            <h2>
              Signals from
              <br />
              <em>the field.</em>
            </h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            lacinia bibendum nulla sed consectetur. Explore the live material.
          </p>
        </div>
        <div className="featured__grid">
          <div className="feature feature--wide">
            <div className="feature__surface">
              <ContourField speed={0.45} density={24} intensity={1} />
            </div>
            <div className="feature__caption">
              <span>FORM STUDY / 01</span>
              <strong>Lorem contour</strong>
              <b>✳</b>
            </div>
          </div>
          <div className="feature feature--card">
            <div className="feature__surface">
              <FoilCard />
            </div>
            <div className="feature__caption">
              <span>OBJECT STUDY / 02</span>
              <strong>Ipsum form</strong>
              <b>✳</b>
            </div>
          </div>
          <div className="feature feature--type">
            <div className="feature__surface">
              <OrbitLetters text="LOREM IPSUM" intensity={1} />
            </div>
            <div className="feature__caption">
              <span>TYPE STUDY / 03</span>
              <strong>Dolor type</strong>
              <b>✳</b>
            </div>
          </div>
        </div>
      </section>

      <section className="playground" id="play">
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
            <a href="#process">
              CONTINUE THE JOURNEY <span>↗</span>
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

      <section className="journey" id="process">
        <div className="journey__head">
          <span>004 / THE PROCESS</span>
          <span>SCROLL TO MOVE THROUGH THE STORY ↓</span>
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
              name: "LOREM",
              count: "01",
              mark: "A",
              className: "journey__tile--text",
            },
            {
              name: "IPSUM",
              count: "02",
              mark: "✳",
              className: "journey__tile--fields",
            },
            {
              name: "DOLOR",
              count: "03",
              mark: "◩",
              className: "journey__tile--objects",
            },
            {
              name: "AMET",
              count: "04",
              mark: "◎",
              className: "journey__tile--systems",
            },
          ].map((item, i) => (
            <div className={`journey__tile ${item.className}`} key={item.name}>
              <span>0{i + 1} / PHASE</span>
              <b>{item.mark}</b>
              <div>
                <strong>{item.name}</strong>
                <span>PHASE {item.count} / 04</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="experimental" id="experiments">
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
          <a href="#contact">
            TO THE FINAL FRAME <b>↗</b>
          </a>
        </div>
        <span className="experimental__coordinate">X: 48.02 / Y: 16.81</span>
      </section>

      <section className="finale" id="contact">
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
          <a href="#top">
            REPLAY THE JOURNEY <b>↗</b>
          </a>
        </div>
      </section>
      <footer className="site-footer">
        <span>FORM / FIELD — A FICTIONAL TEMPLATE</span>
        <span>BUILT TO BE TAKEN APART.</span>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </div>
  );
}
