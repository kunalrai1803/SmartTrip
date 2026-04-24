import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash

from services.planner import generate_plan
from services.storage import load_cities, load_users, save_users


load_dotenv()

app = Flask(__name__)
from flask_cors import CORS
CORS(app)

def find_matching_key(options, target_value):
    normalized_target = target_value.strip().lower()
    for option in options:
        if option.strip().lower() == normalized_target:
            return option
    return None


def find_city(state_name, city_name):
    cities = load_cities()
    if not isinstance(cities, dict):
        return None

    matched_state = find_matching_key(cities.keys(), state_name)
    if not matched_state:
        return None

    state_data = cities.get(matched_state, {})
    matched_city = find_matching_key(state_data.keys(), city_name)
    if not matched_city:
        return None

    city_data = state_data.get(matched_city, {})

    return {
        "state": matched_state,
        "city": matched_city,
        "places": city_data.get("places", []),
        "restaurants": city_data.get("restaurants", []),
        "food": city_data.get("food", []),
    }


@app.get("/")
def home():
    return jsonify({"message": "SmartTrip backend is running."})


@app.get("/locations")
def get_locations():
    cities = load_cities()
    if not isinstance(cities, dict):
        return jsonify({"locations": []})

    return jsonify(
        {
            "locations": [
                {"state": state, "cities": sorted(state_cities.keys())}
                for state, state_cities in sorted(cities.items())
            ]
        }
    )


@app.post("/signup")
def signup():
    payload = request.get_json(silent=True) or {}
    name = payload.get("name", "").strip()
    email = payload.get("email", "").strip().lower()
    password = payload.get("password", "").strip()

    if not name or not email or not password:
        return jsonify({"error": "Name, email, and password are required."}), 400

    users = load_users()
    if any(user["email"] == email for user in users):
        return jsonify({"error": "An account with this email already exists."}), 409

    new_user = {
        "name": name,
        "email": email,
        "password": generate_password_hash(password),
    }
    users.append(new_user)
    save_users(users)

    return jsonify({"message": "Signup successful.", "user": {"name": name, "email": email}}), 201


@app.post("/login")
def login():
    payload = request.get_json(silent=True) or {}
    email = payload.get("email", "").strip().lower()
    password = payload.get("password", "").strip()

    if not email or not password:
        return jsonify({"error": "Email and password are required."}), 400

    users = load_users()
    user = next((item for item in users if item["email"] == email), None)

    if not user or not check_password_hash(user["password"], password):
        return jsonify({"error": "Invalid email or password."}), 401

    return jsonify({"message": "Login successful.", "user": {"name": user["name"], "email": user["email"]}})


@app.get("/get_places")
def get_places():
    state = request.args.get("state", "").strip()
    city = request.args.get("city", "").strip()

    if not state or not city:
        return jsonify({"error": "State and city are required."}), 400

    city_data = find_city(state, city)
    if not city_data:
        return jsonify({"error": "City not found in dataset."}), 404

    return jsonify(
        {
            "state": city_data["state"],
            "city": city_data["city"],
            "places": city_data["places"],
            "restaurants": city_data["restaurants"],
            "food": city_data["food"],
        }
    )


@app.post("/generate_plan")
def create_plan():
    payload = request.get_json(silent=True) or {}
    state = payload.get("state", "").strip()
    city = payload.get("city", "").strip()
    selected_places = payload.get("selectedPlaces", [])
    days = payload.get("days", 0)
    budget = payload.get("budget", 0)

    if not state or not city:
        return jsonify({"error": "State and city are required."}), 400

    try:
        days = int(days)
        budget = int(budget)
    except (TypeError, ValueError):
        return jsonify({"error": "Days and budget must be valid numbers."}), 400

    if days <= 0 or budget <= 0:
        return jsonify({"error": "Days and budget must be greater than zero."}), 400

    city_data = find_city(state, city)
    if not city_data:
        return jsonify({"error": "City not found in dataset."}), 404

    try:
        plan = generate_plan(city_data, selected_places, days, budget)
    except ValueError as error:
        return jsonify({"error": str(error)}), 400

    return jsonify(plan)


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=os.getenv("FLASK_ENV", "development") == "development")
