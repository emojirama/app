const moveMutation = (state, payload) => {
  let nextPos;
  let nextAnchor;
  const mode = payload.mode;
  switch (payload.direction) {
    case "left":
      nextPos = [state.position[0], state.position[1] - 1];
      nextAnchor = [state.anchor[0], state.anchor[1] - 1];
      if (mode === "normal") {
        if (nextPos[1] < state.anchor[1] + 1) {
          state.anchor = [
            state.anchor[0],
            Math.max(state.anchor[1] - state.cols + 2, 0)
          ];
          state.position = nextPos;
          break;
        }
        state.position = nextPos;
      } else if (mode === "fixed") {
        if (nextAnchor[1] < 0) {
          state.position = nextPos;
          return;
        }
        state.anchor = nextAnchor;
        state.position = nextPos;
      }
      break;
    case "right":
      nextPos = [state.position[0], state.position[1] + 1];
      nextAnchor = [state.anchor[0], state.anchor[1] + 1];
      if (mode === "normal") {
        if (nextPos[1] > state.anchor[1] + state.cols - 2) {
          state.anchor = [
            state.anchor[0],
            Math.min(
              state.anchor[1] + state.cols - 2,
              state.board["scenes"][state.currentScene]["data"][0].length -
                state.cols
            )
          ];
          state.position = nextPos;
          break;
        }
        // state.anchor = [state.anchor[0], state.anchor[1] + 1];
        state.position = nextPos;
      } else if (mode === "fixed") {
        if (
          nextAnchor[1] >
          state.board["scenes"][state.currentScene]["data"][0].length -
            state.cols
        ) {
          state.position = nextPos;
          return;
        }
        state.anchor = nextAnchor;
        state.position = nextPos;
      }
      break;
    case "up":
      nextPos = [state.position[0] - 1, state.position[1]];
      nextAnchor = [state.anchor[0] - 1, state.anchor[1]];
      if (mode === "normal") {
        if (nextPos[0] < state.anchor[0] + 1) {
          state.anchor = [
            Math.max(state.anchor[0] - state.rows + 2, 0),
            state.anchor[1]
          ];
          state.position = nextPos;
          break;
        }
        state.position = nextPos;
      } else if (mode === "fixed") {
        if (nextAnchor[0] < 0) {
          state.position = nextPos;
          return;
        }
        state.anchor = nextAnchor;
        state.position = nextPos;
      }
      break;
    case "down":
      nextPos = [state.position[0] + 1, state.position[1]];
      nextAnchor = [state.anchor[0] + 1, state.anchor[1]];
      if (mode === "normal") {
        if (nextPos[0] > state.anchor[0] + state.rows - 2) {
          state.anchor = [
            Math.min(
              state.anchor[0] + state.rows - 2,
              state.board["scenes"][state.currentScene]["data"].length -
                state.rows
            ),
            state.anchor[1]
          ];
          state.position = nextPos;
          break;
        }
        state.position = nextPos;
      } else if (mode === "fixed") {
        if (
          nextAnchor[0] >
          state.board["scenes"][state.currentScene]["data"].length - state.rows
        ) {
          state.position = nextPos;
          return;
        }
        state.anchor = nextAnchor;
        state.position = nextPos;
      }
      break;
  }
};

export default moveMutation;
