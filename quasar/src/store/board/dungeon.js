import Dungeon from "dungeon-generator";

const generateDungeonBoard = () => {
  let dungeon = new Dungeon({
    size: [100, 100],
    seed: "abcd", //omit for generated seed
    rooms: {
      initial: {
        min_size: [4, 4],
        max_size: [5, 5],
        max_exits: 1,
        position: [0, 0] //OPTIONAL pos of initial room
      },
      any: {
        min_size: [5, 5],
        max_size: [6, 6],
        max_exits: 100
      }
    },
    max_corridor_length: 6,
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
          return {
            emoji: null, //randomSquare(),
            color: dungeon.walls.get([i, j]) === true ? "black" : "white", // random floor color
            position: [i, j],
            tone: Math.floor(Math.random() * 6) + 1
          };
        });
    });

  return dungeonBoard;
};

export default generateDungeonBoard;
