import BinaryHeap from "./binaryHeap";

var astar = {
  init: function(grid) {
    for (var x = 0, xl = grid.length; x < xl; x++) {
      for (var y = 0, yl = grid[x].length; y < yl; y++) {
        var node = grid[x][y];
        node.f = 0;
        node.g = 0;
        node.h = 0;
        node.cost = 1;
        node.visited = false;
        node.closed = false;
        node.parent = null;
      }
    }
  },
  heap: function() {
    return new BinaryHeap(function(node) {
      return node.f;
    });
  },
  search: function(grid, start, end, diagonal, heuristic) {
    astar.init(grid);
    heuristic = heuristic || astar.manhattan;
    diagonal = !!diagonal;

    var openHeap = astar.heap();

    openHeap.push(start);

    while (openHeap.size() > 0) {
      // Grab the lowest f(x) to process next.  Heap keeps this sorted for us.
      var currentNode = openHeap.pop();

      // End case -- result has been found, return the traced path.
      if (currentNode === end) {
        var curr = currentNode;
        var ret = [];
        while (curr.parent) {
          ret.push(curr);
          curr = curr.parent;
        }
        return ret.reverse().map(x => x.position);
      }
      // Normal case -- move currentNode from open to closed, process each of its neighbors.
      currentNode.closed = true;

      // Find all neighbors for the current node. Optionally find diagonal neighbors as well (false by default).
      var neighbors = astar.neighbors(grid, currentNode, diagonal);

      for (var i = 0, il = neighbors.length; i < il; i++) {
        var neighbor = neighbors[i];
        if (neighbor.closed || neighbor.emoji !== "" || neighbor.zombie) {
          // Not a valid node to process, skip to next neighbor.
          continue;
        }

        // The g score is the shortest distance from start to current node.
        // We need to check if the path we have arrived at this neighbor is the shortest one we have seen yet.
        var gScore = currentNode.g + neighbor.cost;
        var beenVisited = neighbor.visited;

        if (!beenVisited || gScore < neighbor.g) {
          // Found an optimal (so far) path to this node.  Take score for node to see how good it is.
          neighbor.visited = true;
          neighbor.parent = currentNode;
          neighbor.h = neighbor.h || heuristic(neighbor.position, end.position);
          neighbor.g = gScore;
          neighbor.f = neighbor.g + neighbor.h;

          if (!beenVisited) {
            // Pushing to heap will put it in proper place based on the 'f' value.
            openHeap.push(neighbor);
          } else {
            // Already seen the node, but since it has been rescored we need to reorder it in the heap
            openHeap.rescoreElement(neighbor);
          }
        }
      }
    }
    // No result was found - empty array signifies failure to find path.
    return [];
  },
  manhattan: function(pos0, pos1) {
    // See list of heuristics: http://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
    var d1 = Math.abs(pos1[0] - pos0[0]);
    var d2 = Math.abs(pos1[1] - pos0[1]);
    return d1 + d2;
  },
  neighbors: function(grid, node) {
    var ret = [];
    var x = node.position[0];
    var y = node.position[1];

    // West
    if (grid[x - 1] && grid[x - 1][y]) {
      ret.push(grid[x - 1][y]);
    }

    // East
    if (grid[x + 1] && grid[x + 1][y]) {
      ret.push(grid[x + 1][y]);
    }

    // South
    if (grid[x] && grid[x][y - 1]) {
      ret.push(grid[x][y - 1]);
    }

    // North
    if (grid[x] && grid[x][y + 1]) {
      ret.push(grid[x][y + 1]);
    }
    // if (diagonals) {
    //   // Southwest
    //   if (grid[x - 1] && grid[x - 1][y - 1]) {
    //     ret.push(grid[x - 1][y - 1]);
    //   }

    //   // Southeast
    //   if (grid[x + 1] && grid[x + 1][y - 1]) {
    //     ret.push(grid[x + 1][y - 1]);
    //   }

    //   // Northwest
    //   if (grid[x - 1] && grid[x - 1][y + 1]) {
    //     ret.push(grid[x - 1][y + 1]);
    //   }

    //   // Northeast
    //   if (grid[x + 1] && grid[x + 1][y + 1]) {
    //     ret.push(grid[x + 1][y + 1]);
    //   }
    // }

    return ret;
  }
};

export default astar;
