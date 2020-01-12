import SimplexNoise from "simplex-noise";
import tinycolor from "tinycolor2";

let gen = new SimplexNoise();

function noise(nx, ny) {
  // Rescale from -1.0:+1.0 to 0.0:1.0
  return gen.noise2D(nx, ny) / 2 + 0.5;
}

const DEEP_WATER = "#00439e";
const NAVY = "#0077ea";
const WATER = "#0063ea";
const FOREST = "#004e00"; // "darkgreen";
const BEACH = "#ffd500"; // "yellow";
const JUNGLE = "#007600"; // "green";
const SAVANNAH = "#008900"; // "yellow";
const DESERT = "#009d00"; //"beige";
const SNOW = "#009d00"; //"white";
// "#004e00", "#006200", "#007600", "#008900", "#009d00";

function biome(e) {
  if (e < 0.1) return DEEP_WATER;
  else if (e < 0.2) return NAVY;
  else if (e < 0.5) return WATER;
  else if (e < 0.55) return BEACH;
  else if (e < 0.6) return BEACH;
  else if (e < 0.7) return FOREST;
  else if (e < 0.8) return JUNGLE;
  else if (e < 0.85) return SAVANNAH;
  else if (e < 0.9) return DESERT;
  else return SNOW;
}

const generateBiome = (h, w) =>
  Array(h)
    .fill()
    .map((_, i) => {
      return Array(w)
        .fill()
        .map((_, j) => {
          return {
            emoji: null, //randomSquare(),
            color: tinycolor(biome(noise(i / 35, j / 30)))
              .darken(Math.random() * 4)
              .toString(),
            position: [i, j],
            tone: Math.floor(Math.random() * 6) + 1
          };
        });
    });

export default generateBiome;
