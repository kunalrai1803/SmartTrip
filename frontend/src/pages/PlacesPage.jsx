import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import LoadingSpinner from "../components/LoadingSpinner";
import Navbar from "../components/Navbar";
import { getPlaces } from "../services/api";

const FALLBACK_IMAGE = "/background.jpg";

export default function PlacesPage() {
  const [tripInput] = useState(() =>
    JSON.parse(localStorage.getItem("smarttrip_trip_input") || "null")
  );
  const [cityData, setCityData] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!tripInput) {
      return;
    }

    let isMounted = true;

    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPlaces(tripInput.state, tripInput.city);

        if (isMounted) {
          setCityData(response.data);
        }
      } catch (apiError) {
        if (isMounted) {
          setError(apiError.response?.data?.error || "Unable to fetch places.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPlaces();

    return () => {
      isMounted = false;
    };
  }, [tripInput]);

  const togglePlace = (placeName) => {
    setError("");
    setSelectedPlaces((current) =>
      current.includes(placeName)
        ? current.filter((item) => item !== placeName)
        : [...current, placeName]
    );
  };

  const continueToPlan = () => {
    if (selectedPlaces.length === 0) {
      setError("Please select at least one place.");
      return;
    }

    localStorage.setItem("smarttrip_places", JSON.stringify(selectedPlaces));
    navigate("/result");
  };

  if (!tripInput) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="page-shell min-h-screen px-4 pb-28 pt-6">
      <Navbar />

      <div className="mx-auto mt-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[32px] p-6 sm:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyanGlow">Select attractions</p>
              <h2 className="mt-3 text-3xl font-extrabold text-white">
                Famous places in {tripInput.city}
              </h2>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              {tripInput.days} days {"\u2022"} INR {tripInput.budget.toLocaleString()}
            </div>
          </div>

          {loading ? (
            <LoadingSpinner label={`Loading places for ${tripInput.city}...`} />
          ) : (
            <>
              <p className="mt-4 text-slate-400">
                Pick the places you want to explore. SmartTrip will balance them across your trip days.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {(cityData?.places || []).map((place) => {
                  const active = selectedPlaces.includes(place.name);

                  return (
                    <button
                      key={place.name}
                      type="button"
                      onClick={() => togglePlace(place.name)}
                      className={`rounded-[28px] border p-5 text-left transition ${
                        active
                          ? "border-cyanGlow bg-cyanGlow/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      <div className="mb-4 overflow-hidden rounded-3xl border border-white/10">
                        <img
                          src={place.image}
                          alt={place.name}
                          className="h-44 w-full object-cover"
                          loading="lazy"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = FALLBACK_IMAGE;
                          }}
                        />
                      </div>

                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">{place.name}</h3>
                          <p className="mt-2 text-sm text-slate-400">{place.type}</p>
                        </div>
                        <div
                          className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border text-sm ${
                            active ? "border-cyanGlow text-cyanGlow" : "border-white/20 text-slate-400"
                          }`}
                        >
                          {active ? "\u2713" : ""}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {!error && cityData?.places?.length === 0 ? (
                <p className="mt-5 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  No places found for this city right now.
                </p>
              ) : null}

              {error ? (
                <p className="mt-5 rounded-2xl border border-roseGlow/30 bg-roseGlow/10 px-4 py-3 text-sm text-rose-200">
                  {error}
                </p>
              ) : null}

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
                <button className="secondary-button" onClick={() => navigate("/home")}>
                  Back
                </button>
                <button className="primary-button" onClick={continueToPlan}>
                  Generate Travel Plan
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>

      <BottomNavbar activeTab="home" />
    </div>
  );
}
