import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { getCityImage } from "../data/cityImages";
import { getLocations } from "../services/api";

export default function PlanTripPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedState = location.state?.state || "";
  const preselectedCity = location.state?.city || "";

  const [locations, setLocations] = useState([]);
  const [stateName, setStateName] = useState("");
  const [city, setCity] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getLocations();
        const fetchedLocations = response.data.locations || [];
        setLocations(fetchedLocations);

        if (fetchedLocations.length === 0) {
          return;
        }

        const matchedState =
          fetchedLocations.find((item) => item.state === preselectedState) || fetchedLocations[0];
        const matchedCity =
          matchedState.cities.find((cityName) => cityName === preselectedCity) || matchedState.cities[0];

        setStateName(matchedState.state);
        setCity(matchedCity);
      } catch (apiError) {
        setError(apiError.response?.data?.error || "Unable to load cities right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, [preselectedCity, preselectedState]);

  const selectedState = useMemo(
    () => locations.find((item) => item.state === stateName),
    [locations, stateName]
  );

  const handleStateChange = (event) => {
    const nextState = event.target.value;
    setStateName(nextState);
    const currentState = locations.find((item) => item.state === nextState);
    setCity(currentState?.cities?.[0] || "");
  };

  const handleContinue = () => {
    setError("");

    if (!stateName || !city || !days || !budget) {
      setError("Please select a state, city, number of days, and budget.");
      return;
    }

    const tripInput = {
      state: stateName,
      city,
      days: Number(days),
      budget: Number(budget),
    };

    localStorage.setItem("smarttrip_trip_input", JSON.stringify(tripInput));
    navigate("/places");
  };

  return (
    <div className="page-shell min-h-screen px-4 pb-28 pt-6">
      <div className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-xl items-center">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card w-full rounded-[36px] p-6 sm:p-8"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cyanGlow">Plan your getaway</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Plan Your Trip</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Choose your destination, set the number of days, and define your budget to build a clean travel plan.
          </p>

          {loading ? (
            <LoadingSpinner label="Loading city dataset..." />
          ) : (
            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">State</label>
                <select className="input-field" value={stateName} onChange={handleStateChange}>
                  {locations.map((item) => (
                    <option key={item.state} value={item.state} className="bg-slate-900">
                      {item.state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">City</label>
                <select className="input-field" value={city} onChange={(event) => setCity(event.target.value)}>
                  {(selectedState?.cities || []).map((cityName) => (
                    <option key={cityName} value={cityName} className="bg-slate-900">
                      {cityName}
                    </option>
                  ))}
                </select>
              </div>

              {city ? (
                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                  <img
                    src={getCityImage(city)}
                    alt={city}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/background.jpg";
                    }}
                  />
                  <div className="p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-cyanGlow">{stateName}</p>
                    <h2 className="mt-2 text-xl font-extrabold text-white">{city}</h2>
                    <p className="mt-1 text-sm text-slate-400">
                      Preview your destination before building the itinerary.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Number of days</label>
                  <input
                    className="input-field"
                    min="1"
                    placeholder="Example: 3"
                    type="number"
                    value={days}
                    onChange={(event) => setDays(event.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Budget (INR)</label>
                  <input
                    className="input-field"
                    min="1000"
                    placeholder="Example: 8000"
                    type="number"
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                  />
                </div>
              </div>

              {error ? (
                <p className="rounded-2xl border border-roseGlow/30 bg-roseGlow/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </p>
              ) : null}

              <button className="primary-button w-full" onClick={handleContinue}>
                Continue to Place Selection
              </button>
            </div>
          )}
        </motion.section>
      </div>

      <BottomNavbar activeTab="home" />
    </div>
  );
}
