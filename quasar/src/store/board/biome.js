import SimplexNoise from "simplex-noise";
import tinycolor from "tinycolor2";
import _ from "lodash";

import Astar from "./utils/graph";

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
    const sortedLayers = config["layers"].concat().sort((a, b) => a.z - b.z);
    for (let i = 0; i < sortedLayers.length; i++) {
      if (elevation < sortedLayers[i].z) {
        return sortedLayers[i].uuid;
      }
    }
    return sortedLayers[sortedLayers.length - 1].uuid;
  }

  function getEmojiForLayer(layerId) {
    let emoji = "";

    const layer = config["layers"].find(x => x.uuid === layerId);
    const emojis = layer.emoji;
    if (emojis.length > 0) {
      const rn = Math.random();

      if (rn < layer.density) {
        emoji = _.sample(emojis).code;
      }
    }

    return emoji;
  }

  function getColorForLayer(layerId) {
    let colors = "#000000";
    try {
      colors = config["layers"].find(x => x.uuid === layerId).colors;
    } catch (err) {
      console.log("err");
    }

    const color = tinycolor(_.sample(colors).base)
      .darken(Math.random() * 4)
      .toString();

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
          const elevation = noise(i / 35, j / 35) * 100;
          const layerId = getLayerIdForElevation(elevation);

          return {
            emoji: getEmojiForLayer(layerId),
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

  console.log(path);
  // TODO: add this back in with options
  // path.map(coord => {
  //   board[coord[0]][coord[1]].color = tinycolor("654321")
  //     .darken(Math.random() * 4)
  //     .toString();
  // });
  return board;
};

export default generateBiome;
