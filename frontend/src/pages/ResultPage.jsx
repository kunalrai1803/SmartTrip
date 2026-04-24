import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import { generatePlan } from "../services/api";
import { saveTripToHistory } from "../services/tripStorage";

const FALLBACK_IMAGE = "/background.jpg";

const getFoodName = (foodItem) =>
  typeof foodItem === "string" ? foodItem : foodItem?.name || "";

export default function ResultPage() {
  const [tripInput] = useState(() =>
    JSON.parse(localStorage.getItem("smarttrip_trip_input") || "null")
  );
  const [selectedPlaces] = useState(() =>
    JSON.parse(localStorage.getItem("smarttrip_places") || "[]")
  );
  const [cachedPlan] = useState(() =>
    JSON.parse(localStorage.getItem("smarttrip_plan") || "null")
  );

  const [plan, setPlan] = useState(cachedPlan);
  const [loading, setLoading] = useState(!cachedPlan);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!tripInput || selectedPlaces.length === 0) {
      navigate("/home");
      return;
    }

    const shouldReusePlan =
      cachedPlan &&
      cachedPlan.city === tripInput.city &&
      cachedPlan.state === tripInput.state &&
      cachedPlan.days === tripInput.days &&
      cachedPlan.budget === tripInput.budget &&
      JSON.stringify(cachedPlan.schedule.flatMap((day) => day.places.map((place) => place.name)).sort()) ===
        JSON.stringify([...selectedPlaces].sort());

    if (shouldReusePlan) {
      return;
    }

    const fetchPlan = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await generatePlan({
          ...tripInput,
          selectedPlaces,
        });
        setPlan(response.data);
        localStorage.setItem("smarttrip_plan", JSON.stringify(response.data));
      } catch (apiError) {
        setError(apiError.response?.data?.error || "Unable to generate your travel plan.");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [cachedPlan, navigate, selectedPlaces, tripInput]);

  useEffect(() => {
    if (plan && !error) {
      saveTripToHistory(plan);
    }
  }, [error, plan]);

  if (!tripInput) {
    return null;
  }

  return (
    <div className="page-shell min-h-screen px-4 pb-28 pt-6">
      <Navbar />

      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[32px] p-6 sm:p-8"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyanGlow">Your travel plan</p>
              <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-5xl">
                {tripInput.city}, {tripInput.state}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                {tripInput.days} days
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                INR {tripInput.budget.toLocaleString()}
              </div>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner label="Building your smart itinerary..." />
          ) : error ? (
            <div className="mt-6 rounded-2xl border border-roseGlow/30 bg-roseGlow/10 px-4 py-4 text-rose-200">
              {error}
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">Budget profile</p>
                  <h3 className="mt-2 text-2xl font-extrabold capitalize text-white">{plan?.budgetLevel}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{plan?.budgetTip}</p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">Places selected</p>
                  <h3 className="mt-2 text-2xl font-extrabold text-white">{selectedPlaces.length}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Balanced across your trip days with a simple rule-based planner.
                  </p>
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-400">Local food vibes</p>
                  <h3 className="mt-2 text-lg font-extrabold text-white">
                    {(plan?.food || [])
                      .slice(0, 2)
                      .map(getFoodName)
                      .filter(Boolean)
                      .join(" \u2022 ")}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Discover iconic dishes while exploring the city.
                  </p>
                </div>
              </div>
            </>
          )}
        </motion.section>

        {!loading && !error && plan ? (
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="glass-card rounded-[32px] p-6 sm:p-8">
              <h3 className="text-2xl font-extrabold text-white">{"\u{1F4C5} Day-wise schedule"}</h3>
              <div className="mt-6 space-y-4">
                {plan.schedule.map((dayPlan) => (
                  <div key={dayPlan.day} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold text-white">Day {dayPlan.day}</h4>
                      <span className="rounded-full bg-cyanGlow/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-cyanGlow">
                        {dayPlan.places.length} stops
                      </span>
                    </div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {dayPlan.places.length > 0 ? (
                        dayPlan.places.map((place) => (
                          <div
                            key={place.name}
                            className="overflow-hidden rounded-3xl border border-white/10 bg-white/10"
                          >
                            <img
                              src={place.image}
                              alt={place.name}
                              className="h-32 w-full object-cover"
                              loading="lazy"
                              onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = FALLBACK_IMAGE;
                              }}
                            />
                            <div className="p-3">
                              <p className="text-sm font-semibold text-slate-100">{place.name}</p>
                              <p className="mt-1 text-xs text-slate-400">{place.type}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-slate-400">Free day</span>
                      )}
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{dayPlan.summary}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="flex flex-col gap-6">
              <div className="glass-card rounded-[32px] p-6 sm:p-8">
                <h3 className="text-2xl font-extrabold text-white">{"\u{1F37D} Restaurants"}</h3>
                <div className="mt-5 space-y-3">
                  {plan.restaurants.map((restaurant) => (
                    <div key={restaurant.name} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <p className="font-bold text-white">{restaurant.name}</p>
                      <p className="mt-1 text-sm text-slate-400">{restaurant.type}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-[32px] p-6 sm:p-8">
                <h3 className="text-2xl font-extrabold text-white">{"\u{1F35B} Famous food"}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {plan.food.map((foodItem) => (
                    <span
                      key={getFoodName(foodItem)}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200"
                    >
                      {getFoodName(foodItem)}
                    </span>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-[32px] p-6 sm:p-8">
                <h3 className="text-2xl font-extrabold text-white">{"\u{1F695} Transport suggestions"}</h3>
                <div className="mt-5 space-y-3">
                  {plan.transport.map((item) => (
                    <div key={item.place} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-bold text-white">{item.place}</p>
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                          {item.distance}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-300">{item.suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <button className="secondary-button" onClick={() => navigate("/places")}>
            Edit Place Selection
          </button>
          <button
            className="primary-button"
            onClick={() => {
              localStorage.removeItem("smarttrip_places");
              localStorage.removeItem("smarttrip_plan");
              navigate("/home");
            }}
          >
            Plan Another Trip
          </button>
        </div>
      </div>

      <BottomNavbar activeTab="home" />
    </div>
  );
}
