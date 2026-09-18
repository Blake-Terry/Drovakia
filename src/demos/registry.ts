import type { ComponentType } from "react";

export type DemoSettings = {
  speed?: number;
  intensity?: number;
  density?: number;
  color?: string;
  text?: string;
};
export type ControlKey = keyof DemoSettings;
export type Demo = {
  slug: string;
  name: string;
  category: string;
  component: string;
  file: string;
  index: string;
  description: string;
  controls: ControlKey[];
  defaults: DemoSettings;
};

const base = {
  speed: 0.8,
  intensity: 0.8,
  density: 18,
  color: "#d9f36a",
  text: "Lorem ipsum",
};
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.";

function group(
  category: string,
  file: string,
  definitions: [string, string, string, ControlKey[], DemoSettings?][],
): Demo[] {
  return definitions.map(([slug, name, component, controls, overrides], i) => ({
    slug,
    name,
    category,
    component,
    file,
    index: `${String(i + 1).padStart(2, "0")}`,
    description: lorem,
    controls,
    defaults: { ...base, ...overrides },
  }));
}

export const categories = [
  "Text",
  "Backgrounds",
  "Cursors",
  "Cards",
  "Galleries",
  "Navigation",
  "Buttons",
  "Scroll",
  "Experimental",
];

export const demos: Demo[] = [
  ...group("Text", "text/TypeStudies.tsx", [
    [
      "split-reveal",
      "Split Reveal",
      "SplitReveal",
      ["text", "speed", "intensity"],
    ],
    [
      "orbit-letters",
      "Orbit Letters",
      "OrbitLetters",
      ["text", "speed", "intensity"],
    ],
    [
      "cipher-text",
      "Cipher Text",
      "CipherText",
      ["text", "speed", "intensity"],
    ],
    [
      "blur-cascade",
      "Blur Cascade",
      "BlurCascade",
      ["text", "speed", "intensity"],
    ],
    [
      "chromatic-type",
      "Chromatic Type",
      "ChromaticType",
      ["text", "intensity", "color"],
    ],
  ]),
  ...group("Backgrounds", "backgrounds/Fields.tsx", [
    [
      "tidal-lattice",
      "Tidal Lattice",
      "TidalLattice",
      ["speed", "intensity", "density", "color"],
    ],
    [
      "aurora-veil",
      "Aurora Veil",
      "AuroraVeil",
      ["speed", "intensity", "color"],
    ],
    [
      "contour-field",
      "Contour Field",
      "ContourField",
      ["speed", "intensity", "density", "color"],
    ],
    [
      "raster-current",
      "Raster Current",
      "RasterCurrent",
      ["speed", "intensity", "density", "color"],
    ],
    [
      "noise-bloom",
      "Noise Bloom",
      "NoiseBloom",
      ["speed", "intensity", "color"],
    ],
  ]),
  ...group("Cursors", "cursors/CursorStudies.tsx", [
    ["orbit-pointer", "Orbit Pointer", "OrbitPointer", ["intensity", "color"]],
    ["halo-lens", "Halo Lens", "HaloLens", ["intensity", "color"]],
    ["echo-trail", "Echo Trail", "EchoTrail", ["speed", "intensity", "color"]],
  ]),
  ...group("Cards", "cards/CardStudies.tsx", [
    ["bearing-card", "Bearing Card", "BearingCard", ["speed", "intensity"]],
    ["foil-card", "Foil Card", "FoilCard", ["intensity", "color"]],
    ["aperture-card", "Aperture Card", "ApertureCard", ["speed", "color"]],
    ["fold-card", "Fold Card", "FoldCard", ["speed", "intensity"]],
  ]),
  ...group("Galleries", "galleries/GalleryStudies.tsx", [
    [
      "infinite-editorial",
      "Infinite Editorial",
      "InfiniteEditorial",
      ["speed", "intensity"],
    ],
    ["depth-deck", "Depth Deck", "DepthDeck", ["speed", "intensity"]],
    ["drag-index", "Drag Index", "DragIndex", ["speed", "intensity"]],
  ]),
  ...group("Navigation", "navigation/NavStudies.tsx", [
    ["elastic-rail", "Elastic Rail", "ElasticRail", ["intensity", "color"]],
    ["sliding-index", "Sliding Index", "SlidingIndex", ["speed", "color"]],
    ["curtain-nav", "Curtain Nav", "CurtainNav", ["speed", "color"]],
  ]),
  ...group("Buttons", "buttons/ButtonStudies.tsx", [
    [
      "magnetic-action",
      "Magnetic Action",
      "MagneticAction",
      ["speed", "intensity", "color"],
    ],
    ["ink-ripple", "Ink Ripple", "InkRipple", ["speed", "color"]],
    ["split-action", "Split Action", "SplitAction", ["speed", "color"]],
  ]),
  ...group("Scroll", "scroll/ScrollStudies.tsx", [
    [
      "pinned-narrative",
      "Pinned Narrative",
      "PinnedNarrative",
      ["intensity", "color"],
    ],
    [
      "lateral-passage",
      "Lateral Passage",
      "LateralPassage",
      ["intensity", "color"],
    ],
    ["depth-scroll", "Depth Scroll", "DepthScroll", ["intensity", "color"]],
  ]),
  ...group("Experimental", "experimental/Systems.tsx", [
    [
      "orbital-matter",
      "Orbital Matter",
      "OrbitalMatter",
      ["speed", "intensity", "density", "color"],
    ],
    [
      "parallax-prism",
      "Parallax Prism",
      "ParallaxPrism",
      ["speed", "intensity", "density", "color"],
    ],
  ]),
];

type EffectModule = Record<string, ComponentType<DemoSettings>>;
const moduleLoaders: Record<string, () => Promise<EffectModule>> = {
  "text/TypeStudies.tsx": () =>
    import("../effects/text/TypeStudies") as Promise<EffectModule>,
  "backgrounds/Fields.tsx": () =>
    import("../effects/backgrounds/Fields") as Promise<EffectModule>,
  "cursors/CursorStudies.tsx": () =>
    import("../effects/cursors/CursorStudies") as Promise<EffectModule>,
  "cards/CardStudies.tsx": () =>
    import("../effects/cards/CardStudies") as Promise<EffectModule>,
  "galleries/GalleryStudies.tsx": () =>
    import("../effects/galleries/GalleryStudies") as Promise<EffectModule>,
  "navigation/NavStudies.tsx": () =>
    import("../effects/navigation/NavStudies") as Promise<EffectModule>,
  "buttons/ButtonStudies.tsx": () =>
    import("../effects/buttons/ButtonStudies") as Promise<EffectModule>,
  "scroll/ScrollStudies.tsx": () =>
    import("../effects/scroll/ScrollStudies") as Promise<EffectModule>,
  "experimental/Systems.tsx": () =>
    import("../effects/experimental/Systems") as Promise<EffectModule>,
};

export async function loadDemo(demo: Demo) {
  const module = await moduleLoaders[demo.file]();
  return { default: module[demo.component] };
}

const sourceLoaders = import.meta.glob("../effects/**/*.tsx", {
  query: "?raw",
  import: "default",
});
export async function loadSource(demo: Demo): Promise<string> {
  const loader = sourceLoaders[`../effects/${demo.file}`];
  return loader ? String(await loader()) : "";
}

export function usageCode(demo: Demo, settings: DemoSettings) {
  const lines = demo.controls
    .map((key) => {
      const value = settings[key];
      if (value === undefined) return "";
      return typeof value === "number"
        ? `  ${key}={${value}}`
        : `  ${key}=${JSON.stringify(value)}`;
    })
    .filter(Boolean);
  return `import { ${demo.component} } from './effects/${demo.file.replace(".tsx", "")}';\n\n<${demo.component}\n${lines.join("\n")}\n/>`;
}
