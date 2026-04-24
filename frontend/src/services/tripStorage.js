const TRIP_HISTORY_KEY = "smarttrip_trip_history";

function getPlanKey(plan) {
  const placeNames = (plan?.schedule || [])
    .flatMap((day) => day.places || [])
    .map((place) => place.name)
    .sort()
    .join("|");

  return [plan?.state, plan?.city, plan?.days, plan?.budget, placeNames].join("::");
}

function formatDateRange(createdAt, days) {
  const startDate = new Date(createdAt);
  const endDate = new Date(createdAt);
  endDate.setDate(startDate.getDate() + Math.max(Number(days || 1) - 1, 0));

  const formatter = new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
  });

  return `${formatter.format(startDate)} - ${formatter.format(endDate)}`;
}

export function loadTripHistory() {
  try {
    const savedTrips = JSON.parse(localStorage.getItem(TRIP_HISTORY_KEY) || "[]");
    return Array.isArray(savedTrips)
      ? savedTrips.sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
      : [];
  } catch {
    return [];
  }
}

export function saveTripToHistory(plan) {
  if (!plan?.city || !plan?.state) {
    return;
  }

  const trips = loadTripHistory();
  const planKey = getPlanKey(plan);
  const existingTrip = trips.find((trip) => trip.id === planKey);
  const createdAt = existingTrip?.createdAt || new Date().toISOString();
  const coverImage =
    (plan.schedule || []).flatMap((day) => day.places || [])[0]?.image || "/background.jpg";

  const tripEntry = {
    id: planKey,
    tripName: `${plan.city} Escape`,
    city: plan.city,
    state: plan.state,
    days: plan.days,
    budget: plan.budget,
    coverImage,
    createdAt,
    dateRange: formatDateRange(createdAt, plan.days),
  };

  const updatedTrips = [tripEntry, ...trips.filter((trip) => trip.id !== planKey)].slice(0, 12);
  localStorage.setItem(TRIP_HISTORY_KEY, JSON.stringify(updatedTrips));
}

