const emojiChoices = [
  "deciduous_tree",
  "deciduous_tree",
  "deciduous_tree",
  "deciduous_tree",
  "deciduous_tree",
  "deciduous_tree",
  "butterfly",
  // "elf",
  // "female_elf",
  "owl",
  "snail",
  "circus_tent",
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
];
const colorChoices = [
  // "darkgreen",
  // "#4F7942",
  // "#228B22"
  // "#ffc04c",
  // "#ffc04c",
  // "#ffc04c",
  // "#ffc04c",
  // "#ffc04c",
  // "#ffd27f",
  // "#ffc04c",
  // "lightblue"
  "#004e00",
  "#006200",
  "#007600",
  "#008900",
  "#009d00"
];

const randomSquare = () =>
  emojiChoices[Math.floor(Math.random() * emojiChoices.length)];
const randomColor = () =>
  colorChoices[Math.floor(Math.random() * colorChoices.length)];

const generateBoard = (h, w) =>
  Array(h)
    .fill()
    .map((_, i) => {
      return Array(w)
        .fill()
        .map((_, j) => {
          return {
            emoji: randomSquare(),
            color: randomColor(),
            position: [i, j],
            tone: Math.floor(Math.random() * 6) + 1
          };
        });
    });

export default generateBoard;
