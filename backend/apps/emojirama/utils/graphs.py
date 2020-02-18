class AStarGraph:
    def __init__(self, grid):
        self.grid = grid
        self.height = len(grid)
        self.width = len(grid[0])
        self.barriers = []
        self.walls = self.get_wall_coords()

    def get_wall_coords(self):
        wall_coords = []
        for i, row in enumerate(self.grid):
            for j, square in enumerate(row):
                if square["emoji"] != "":
                    wall_coords.append((j, i))
        return wall_coords

    def heuristic(self, start, goal):
        D = 1
        D2 = 1
        dx = abs(start[0] - goal[0])
        dy = abs(start[1] - goal[1])
        return D * (dx + dy) + (D2 - 2 * D) * min(dx, dy)

    def get_vertex_neighbors(self, pos):
        n = []
        for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
            x2 = pos[0] + dx
            y2 = pos[1] + dy
            if (
                x2 < 0
                or x2 > self.width
                or y2 < 0
                or y2 > self.height
                or (x2, y2) in self.walls
            ):
                continue
            n.append((x2, y2))
        return n

    def move_cost(self, a, b):
        """This function is used in calculating G, the actual cost of moving to a node"""
        for barrier in self.barriers:
            if b in barrier:
                return 1  # float("inf")
        return 1


def AStarSearch(start, end, graph):
    # AGCTUAL cost
    G = (
        {}
    )  # actual movement cost to each position from the start position

    F = (
        {}
    )  # estimated movement cost of start to end going via this position

    G[start] = 0
    F[start] = graph.heuristic(start, end)

    closedVerticies = set()
    openVerticies = set([start])
    cameFrom = {}

    while len(openVerticies) > 0:

        # clean slate
        current = None
        currentFscore = None

        # get the vertex in the open list with the lowest F score
        # on the first pass, the only open vertex is the start vertex
        # so it gets set to the current vertex and we start with our F score of heuristic(start, end)

        # on the next pass we have added the children to open vertices, and one of them may have the best
        # fscore, so we will continue with that one
        for pos in openVerticies:
            if current is None or F[pos] < currentFscore:
                current = pos
                currentFscore = F[pos]

        # check if we have reached the goal
        # we could use deque here instead of reversing
        if current == end:
            # retrace route backward
            path = [current]
            # came from is similar to previous in Dijkstra's Algorithm
            while current in cameFrom:
                current = cameFrom[current]
                path.append(current)
            path.reverse()
            return path, F[end]

        # mark the current index as closed
        openVerticies.remove(current)
        closedVerticies.add(current)

        # update scores for verticies near current positions
        # preparing for the next round of vertex selection
        for neighbor in graph.get_vertex_neighbors(current):

            # before we adopt the score, do some checks, including use of cost score
            if neighbor in closedVerticies:
                continue  # we have already processed this node exhaustively
            candidateG = G[current] + graph.move_cost(
                current, neighbor
            )

            # see if the neighbor is in the openVerticies set
            if neighbor not in openVerticies:
                openVerticies.add(
                    neighbor
                )  # discovered a new vertex

            # this part is not clear to me
            # we could have already gotten to the neighbor with a better score? from somewhere else?
            # we have opened the vertex (prepared to work with it, but it hasn't been closed yet)
            elif candidateG >= G[neighbor]:
                print(candidateG, G[neighbor])
                continue  # This G score is worse than previously found

            # adopt this G score
            cameFrom[neighbor] = current
            G[neighbor] = candidateG
            H = graph.heuristic(neighbor, end)
            F[neighbor] = G[neighbor] + H
    raise RuntimeError("A* failed to find a solution")
