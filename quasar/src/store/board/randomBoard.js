import generateDungeonBoard from "./dungeon";
import generateBiomeBoard from "./biome";

const generateBoard = (boardType, config) => {
  switch (boardType) {
    case "biome":
      return generateBiomeBoard(config);
    case "dungeon":
      return generateDungeonBoard();
  }
};

export default generateBoard;
