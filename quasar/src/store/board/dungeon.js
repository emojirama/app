import Dungeon from "dungeon-generator";
import tinycolor from "tinycolor2";
import uuidv1 from "uuid/v1";

const generateDungeonBoard = () => {
  let dungeon = new Dungeon({
    size: [100, 100],
    seed: uuidv1().slice(0, 8), //omit for generated seed
    rooms: {
      initial: {
        min_size: [4, 4],
        max_size: [5, 5],
        max_exits: 1,
        position: [0, 0] //OPTIONAL pos of initial room
      },
      any: {
        min_size: [5, 5],
        max_size: [8, 8],
        max_exits: 100
      }
    },
    max_corridor_length: 12,
    min_corridor_length: 2,
    corridor_density: 0.5, //corridors per room
    symmetric_rooms: false, // exits must be in the center of a wall if true
    interconnects: 1, //extra corridors to connect rooms and make circular paths. not 100% guaranteed
    max_interconnect_length: 10,
    room_count: 20
  });

  dungeon.generate();
  const dungeonBoard = Array(dungeon.size[0])
    .fill()
    .map((_, i) => {
      return Array(dungeon.size[1])
        .fill()
        .map((_, j) => {
          const room = dungeon.walls.get([i, j]) === true;
          return {
            emoji:
              room === true
                ? (i + j) % 2 === 0
                  ? "white_square_button"
                  : "black_square_button"
                : "",
            color:
              room === true
                ? (i + j) % 2 === 0
                  ? "black"
                  : "black"
                : tinycolor("white")
                    .darken(Math.random() * 25 + 20)
                    .toString(), //randomSquare(),
            position: [i, j],
            tone: Math.floor(Math.random() * 6) + 1
          };
        });
    });

  return dungeonBoard;
};

export default generateDungeonBoard;
