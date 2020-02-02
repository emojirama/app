import numpy as np
from noise import pnoise2

# https://engineeredjoy.com/blog/perlin-noise/
# TODO: support passing options for shape, scale and octaves
def perlin_array(
    shape=(200, 200),
    scale=100,
    octaves=100,
    persistence=0.5,
    lacunarity=2.0,
    seed=None,
):

    if not seed:

        seed = np.random.randint(0, 100)

    arr = np.zeros(shape)
    for i in range(shape[0]):
        for j in range(shape[1]):
            arr[i][j] = pnoise2(
                i / scale,
                j / scale,
                octaves=octaves,
                persistence=persistence,
                lacunarity=lacunarity,
                repeatx=1024,
                repeaty=1024,
                base=seed,
            )

    max_arr = np.max(arr)
    min_arr = np.min(arr)
    norm_me = lambda x: (x - min_arr) / (max_arr - min_arr)
    norm_me = np.vectorize(norm_me)
    arr = norm_me(arr)
    return arr


DEEP_WATER = "#00439e"
NAVY = "#0077ea"
WATER = "#0063ea"
FOREST = "#004e00"
BEACH = "#ffd500"
JUNGLE = "#007600"
SAVANNAH = "#008900"
DESERT = "#009d00"
SNOW = "#009d00"


def biome(e):
    if e < 0.1:
        return DEEP_WATER
    elif e < 0.2:
        return NAVY
    elif e < 0.5:
        return WATER
    elif e < 0.55:
        return BEACH
    elif e < 0.6:
        return BEACH
    elif e < 0.7:
        return FOREST
    elif e < 0.8:
        return JUNGLE
    elif e < 0.85:
        return SAVANNAH
    elif e < 0.9:
        return DESERT
    else:
        return SNOW


def generate_grid_data():
    noise_grid = perlin_array(scale=10)
    blank_grid = [
        [
            {
                "emoji": "",
                "tone": 1,
                "color": biome(noise_grid[i][j]),
                "position": [j, i],
            }
            for i in range(40)
        ]
        for j in range(40)
    ]
    return blank_grid
