def generate_grid_data():
    blank_grid = [
        [
            {
                "emoji": "",
                "tone": 1,
                "color": "#ffffff" if (i + j) % 2 == 0 else "#444",
                "position": [j, i],
            }
            for i in range(40)
        ]
        for j in range(40)
    ]
    return blank_grid
