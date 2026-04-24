from math import ceil


LOW_BUDGET_LIMIT = 5000
HIGH_BUDGET_LIMIT = 15000

PREMIUM_KEYWORDS = {"fine dining", "premium dining", "premium casual", "seafood fine dining", "premium vegetarian"}
BUDGET_KEYWORDS = {"budget dining", "budget vegetarian", "street food", "casual dining", "cafe"}
NEARBY_TYPES = {"Market", "Museum", "Lifestyle", "Landmark", "Historic", "Monument"}
MEDIUM_TYPES = {"Temple", "Heritage", "Nature", "Waterfront", "Scenic", "Spiritual"}


def classify_budget(total_budget):
    if total_budget <= LOW_BUDGET_LIMIT:
        return "low"
    if total_budget >= HIGH_BUDGET_LIMIT:
        return "high"
    return "medium"


def get_budget_tip(budget_level):
    if budget_level == "low":
        return "Focus on local eateries, shared transport, and packed sightseeing days to save money."
    if budget_level == "high":
        return "You can add premium dining and more comfortable transport like taxis for longer routes."
    return "Mix comfort and savings by using metro or auto for city travel and a premium meal or two."


def estimate_distance(place, index):
    place_type = place.get("type", "")
    if place_type in NEARBY_TYPES:
        return "nearby"
    if place_type in MEDIUM_TYPES:
        return "medium"
    return "far" if index % 3 == 0 else "medium"


def transport_for_distance(distance, budget_level):
    if distance == "nearby":
        return "Walk / Auto"
    if distance == "medium":
        return "Metro / Bike" if budget_level != "high" else "Metro / Taxi"
    return "Taxi / Bus" if budget_level == "high" else "Bus / Shared Taxi"


def select_restaurants(restaurants, budget_level):
    picked = []
    for restaurant in restaurants:
        restaurant_type = restaurant.get("type", "").lower()
        if budget_level == "low" and any(keyword in restaurant_type for keyword in BUDGET_KEYWORDS):
            picked.append(restaurant)
        elif budget_level == "medium" and ("cafe" in restaurant_type or "casual" in restaurant_type or "budget" in restaurant_type or "premium" in restaurant_type):
            picked.append(restaurant)
        elif budget_level == "high" and ("premium" in restaurant_type or "fine dining" in restaurant_type):
            picked.append(restaurant)

    if len(picked) < 3:
        for restaurant in restaurants:
            if restaurant not in picked:
                picked.append(restaurant)
            if len(picked) == 4:
                break

    return picked[:4]


def build_daily_schedule(selected_places, days, budget_level):
    schedule = []
    remaining_places = list(selected_places)
    remaining_days = max(days, 1)

    for day_number in range(1, days + 1):
        places_left = len(remaining_places)
        if places_left == 0:
            schedule.append(
                {
                    "day": day_number,
                    "places": [],
                    "summary": "Keep this day flexible for shopping, local walks, or rest.",
                }
            )
            remaining_days -= 1
            continue

        places_today = ceil(places_left / remaining_days)
        todays_places = remaining_places[:places_today]
        remaining_places = remaining_places[places_today:]
        remaining_days -= 1

        day_summary = (
            "Use local transport and keep food stops budget-friendly."
            if budget_level == "low"
            else "This day balances sightseeing and comfortable meal breaks."
            if budget_level == "medium"
            else "Plan for a relaxed pace with premium food and flexible transport."
        )

        schedule.append(
            {
                "day": day_number,
                "places": todays_places,
                "summary": day_summary,
            }
        )

    return schedule


def generate_plan(city_data, selected_place_names, days, budget):
    all_places = city_data.get("places", [])
    selected_places = [place for place in all_places if place["name"] in selected_place_names]
    if not selected_places:
        raise ValueError("Please select at least one place to generate a plan.")

    budget_level = classify_budget(budget)
    schedule = build_daily_schedule(selected_places, days, budget_level)
    restaurants = select_restaurants(city_data.get("restaurants", []), budget_level)

    transport_suggestions = []
    for index, place in enumerate(selected_places):
        distance = estimate_distance(place, index)
        transport_suggestions.append(
            {
                "place": place["name"],
                "distance": distance,
                "suggestion": transport_for_distance(distance, budget_level),
            }
        )

    return {
        "city": city_data.get("city"),
        "state": city_data.get("state"),
        "days": days,
        "budget": budget,
        "budgetLevel": budget_level,
        "budgetTip": get_budget_tip(budget_level),
        "schedule": schedule,
        "restaurants": restaurants,
        "food": city_data.get("food", []),
        "transport": transport_suggestions,
    }

