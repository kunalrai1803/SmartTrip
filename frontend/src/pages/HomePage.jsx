import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "../components/AppIcons";
import BottomNavbar from "../components/BottomNavbar";
import DestinationCard from "../components/DestinationCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { getCityImage } from "../data/cityImages";
import { getLocations } from "../services/api";

const featuredCities = [
  { state: "Maharashtra", city: "Mumbai" },
  { state: "Rajasthan", city: "Jaipur" },
  { state: "Kerala", city: "Kochi" },
  { state: "Telangana", city: "Hyderabad" },
  { state: "Tamil Nadu", city: "Chennai" },
  { state: "Goa", city: "Panaji" },
];

export default function HomePage() {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getLocations();
        setLocations(response.data.locations || []);
      } catch (apiError) {
        setError(apiError.response?.data?.error || "Unable to load destinations right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const allDestinations = useMemo(
    () =>
      locations.flatMap((locationItem) =>
        locationItem.cities.map((city) => ({
          state: locationItem.state,
          city,
        }))
      ),
    [locations]
  );

  const popularDestinations = useMemo(
    () =>
      featuredCities
        .map((destination) =>
          allDestinations.find(
            (item) => item.city === destination.city && item.state === destination.state
          )
        )
        .filter(Boolean)
        .map((destination) => ({
          ...destination,
          country: "India",
          rating: 4.8,
          image: getCityImage(destination.city),
        })),
    [allDestinations]
  );

  const searchMatches = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return [];
    }

    return allDestinations
      .filter((destination) =>
        `${destination.city} ${destination.state}`.toLowerCase().includes(normalizedQuery)
      )
      .slice(0, 6);
  }, [allDestinations, searchQuery]);

  const goToPlanTrip = (destination) => {
    navigate("/plan-trip", {
      state: destination
        ? {
            state: destination.state,
            city: destination.city,
          }
        : undefined,
    });
  };

  return (
    <div className="page-shell min-h-screen px-4 pb-28 pt-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[32px] p-6"
        >
          <p className="text-sm font-semibold text-cyanGlow">
            Hello, Traveller {"\u{1F44B}"}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white sm:text-5xl">
            Where do you want to go?
          </h1>

          <div className="mt-6 flex items-center gap-3 rounded-[24px] border border-white/10 bg-white/5 px-4 py-4">
            <SearchIcon className="h-5 w-5 text-slate-400" />
            <input
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>

          {searchMatches.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchMatches.map((destination) => (
                <button
                  key={`${destination.state}-${destination.city}`}
                  type="button"
                  onClick={() => goToPlanTrip(destination)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                >
                  {destination.city}, {destination.state}
                </button>
              ))}
            </div>
          ) : null}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white">Popular Destinations</h2>
              <p className="mt-1 text-sm text-slate-400">Scroll through hand-picked city escapes</p>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-cyanGlow">
              India
            </span>
          </div>

          {loading ? (
            <div className="glass-card rounded-[28px] p-6">
              <LoadingSpinner label="Loading destinations..." />
            </div>
          ) : (
            <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1">
              {popularDestinations.map((destination) => (
                <DestinationCard
                  key={`${destination.state}-${destination.city}`}
                  destination={destination}
                  onClick={() => goToPlanTrip(destination)}
                />
              ))}
            </div>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass-card rounded-[32px] p-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold text-white">Plan a New Trip</h3>
              <p className="mt-2 text-sm text-slate-400">Create your perfect itinerary</p>
            </div>
            <button className="primary-button w-full sm:w-auto" onClick={() => goToPlanTrip()}>
              Start Planning
            </button>
          </div>

          {error ? (
            <p className="mt-4 rounded-2xl border border-roseGlow/30 bg-roseGlow/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </p>
          ) : null}
        </motion.section>
      </div>

      <BottomNavbar activeTab="home" />
    </div>
  );
}
