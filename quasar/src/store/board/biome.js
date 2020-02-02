import SimplexNoise from "simplex-noise";
import tinycolor from "tinycolor2";

import Astar from "./utils/graph";

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

const generateBiome = (h, w) => {
  let gen = new SimplexNoise();

  function noise(nx, ny) {
    // Rescale from -1.0:+1.0 to 0.0:1.0
    return gen.noise2D(nx, ny) / 2 + 0.5;
  }
  const board = Array(h)
    .fill()
    .map((_, i) => {
      return Array(w)
        .fill()
        .map((_, j) => {
          const elevation = noise(i / 35, j / 30);
          return {
            emoji:
              elevation <= 0.7 || Math.random() < 0.5 ? "" : "deciduous_tree",
            color: tinycolor(biome(elevation))
              .darken(Math.random() * 4)
              .toString(),
            position: [i, j],
            tone: Math.floor(Math.random() * 6) + 1
          };
        });
    });

  const t0 = performance.now();
  const path = new Astar.search(board, board[0][0], board[25][25]);
  const t1 = performance.now();
  console.log(`Completed A * in searched in ${t1 - t0} ms`);
  path.map(coord => {
    board[coord[0]][coord[1]].color = tinycolor("654321")
      .darken(Math.random() * 4)
      .toString();
  });
  return board;
};

export default generateBiome;
