import SimplexNoise from "simplex-noise";
import tinycolor from "tinycolor2";
import _ from "lodash";

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
  else if (e < 20) return NAVY;
  else if (e < 50) return WATER;
  else if (e < 55) return BEACH;
  else if (e < 60) return BEACH;
  else if (e < 70) return FOREST;
  else if (e < 80) return JUNGLE;
  else if (e < 85) return SAVANNAH;
  else if (e < 90) return DESERT;
  else return SNOW;
}
console.log(biome);

function getEmoji(elevation) {
  return elevation <= 70 || Math.random() < 0.5 ? "" : "deciduous_tree";
}

// function getColor(elevation) {
//   return tinycolor(biome(elevation))
//     .darken(Math.random() * 4)
//     .toString();
// }
const generateBiome = config => {
  let h;
  let w;
  if (!config) {
    h = 15;
    w = 15;
  } else {
    h = config["dimensions"][0];
    w = config["dimensions"][1];
  }
  let gen = new SimplexNoise("test.");

  function getLayerIdForElevation(elevation) {
    const sortedLayers = config.layers.sort((a, b) => a.z < b.z);
    for (let i = 0; i < sortedLayers.length; i++) {
      // console.log(config["layers"][i]);
      if (elevation > config.layers[i].z) {
        return config.layers[i].uuid;
      }
    }
    return config.layers[config.layers.length - 1].uuid;
  }

  function getColorForLayer(layerId) {
    let colors = "#000000";
    try {
      colors = config["layers"].find(x => x.uuid === layerId).colors;
    } catch (err) {
      console.log("err");
    }

    const color = _.sample(colors).base;
    return color;
  }

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
          const elevation = noise(i / 35, j / 30) * 100;
          const layerId = getLayerIdForElevation(elevation);

          return {
            emoji: getEmoji(elevation),
            color: getColorForLayer(layerId), //"#000", //getColor(elevation, config),
            position: [i, j],
            tone: Math.floor(Math.random() * 6) + 1
          };
        });
    });

  const t0 = performance.now();
  const path = new Astar.search(board, board[0][0], board[10][10]);
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
