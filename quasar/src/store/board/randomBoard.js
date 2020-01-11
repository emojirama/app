import generateDungeonBoard from "./dungeon";
import generateBiomeBoard from "./biome";

const generateBoard = boardType => {
  switch (boardType) {
    case "biome":
      return generateBiomeBoard(50, 50);
    case "dungeon":
      return generateDungeonBoard();
  }
};

export default generateBoard;
