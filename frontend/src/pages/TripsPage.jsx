import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavbar from "../components/BottomNavbar";
import TripCard from "../components/TripCard";
import { loadTripHistory } from "../services/tripStorage";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const refreshTrips = () => {
      setTrips(loadTripHistory());
    };

    refreshTrips();
    window.addEventListener("focus", refreshTrips);
    window.addEventListener("storage", refreshTrips);

    return () => {
      window.removeEventListener("focus", refreshTrips);
      window.removeEventListener("storage", refreshTrips);
    };
  }, []);

  return (
    <div className="page-shell min-h-screen px-4 pb-28 pt-6">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-[32px] p-6"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cyanGlow">SmartTrip journal</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white">My Trips</h1>
          <p className="mt-2 text-sm text-slate-400">
            {trips.length} {trips.length === 1 ? "trip planned" : "trips planned"}
          </p>
        </motion.section>

        {trips.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="space-y-4"
          >
            {trips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </motion.div>
        ) : (
          <motion.section
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="glass-card rounded-[32px] p-6 text-center"
          >
            <h2 className="text-2xl font-extrabold text-white">No trips yet</h2>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Plan your first city escape and it will appear here with a cover image, dates, and budget.
            </p>
            <button className="primary-button mt-6" onClick={() => navigate("/home")}>
              Start Planning
            </button>
          </motion.section>
        )}
      </div>

      <BottomNavbar activeTab="trips" />
    </div>
  );
}

