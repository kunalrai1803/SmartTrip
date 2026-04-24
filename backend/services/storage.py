import json
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[1]
USERS_FILE = BASE_DIR / "data" / "users.json"
DATASET_FILE = BASE_DIR.parent / "dataset" / "cities.json"


def read_json(file_path, default_value):
    if not file_path.exists():
        file_path.parent.mkdir(parents=True, exist_ok=True)
        with file_path.open("w", encoding="utf-8") as file:
            json.dump(default_value, file, indent=2)
        return default_value

    with file_path.open("r", encoding="utf-8") as file:
        try:
            return json.load(file)
        except json.JSONDecodeError:
            return default_value


def write_json(file_path, data):
    file_path.parent.mkdir(parents=True, exist_ok=True)
    with file_path.open("w", encoding="utf-8") as file:
        json.dump(data, file, indent=2)


def load_users():
    return read_json(USERS_FILE, [])


def save_users(users):
    write_json(USERS_FILE, users)


def load_cities():
    return read_json(DATASET_FILE, {})
