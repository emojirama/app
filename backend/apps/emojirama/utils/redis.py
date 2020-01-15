import json
from apps.emojirama.models import Emojirama
from django.conf import settings

r = settings.REDIS

def write_emojirama_to_redis(emojirama):
    scene_list = emojirama.board["scenes"].keys()
    p = r.pipeline()
    for scene in scene_list:
        for i, row in enumerate(emojirama.board["scenes"][scene]["data"]):
            for j, square in enumerate(row):
                p.hset(f"emojirama___{emojirama.id}___{scene}___{i}___{j}___square", 'emoji', square['emoji'])
                p.hset(f"emojirama___{emojirama.id}___{scene}___{i}___{j}___square", 'color', square['color'])
                p.hset(f"emojirama___{emojirama.id}___{scene}___{i}___{j}___square", 'tone', square['tone'])
                p.hset(f"emojirama___{emojirama.id}___{scene}___{i}___{j}___square", 'position', str(square['position']))
    return p.execute()


def get_emojirama_from_redis(emojirama):
    emojirama_id = emojirama.id

    # to round trips to redis
    keys = r.keys(f'emojirama___{emojirama_id}___*___*___*___square')
    p = r.pipeline()
    for key in keys:
        p.hgetall(key)
    hashes = p.execute()
    key_hash_dict = {key: _hash for key, _hash in zip(keys,hashes)}


    scene_list = emojirama.board["scenes"].keys()
    json_data = {"scenes":{scene: {} for scene in scene_list}}
    for scene in scene_list:
        row_num = 0
        col_num = 0
        rows = []

        while True:
            row = []
            col_num = 0
            try:
                _ = key_hash_dict[f"emojirama___{emojirama_id}___{scene}___{row_num}___{col_num}___square"]
            except KeyError:
                break
            while True:
                try:
                    h = key_hash_dict[f"emojirama___{emojirama_id}___{scene}___{row_num}___{col_num}___square"]
                    h["tone"] = int(h["tone"])
                    h["position"] = json.loads(h["position"])
                    row.append(h)
                except KeyError:
                    break
                col_num += 1

            rows.append(row)

            row_num += 1

        json_data["scenes"][scene]["data"] = rows

    return json_data


def update_square_in_redis(emojirama_id, message):
    """Attempt to update the square"""
    square_info = message["square_info"]
    # get the position to update
    position = square_info["position"]
    scene = square_info["scene"]
    x, y = position[0], position[1]
    emoji = square_info['emoji']
    key_name = f"emojirama___{emojirama_id}___{scene}___{x}___{y}___square"
    return r.hset(key_name, "emoji", emoji)
