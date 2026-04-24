import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("smarttrip_user") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("smarttrip_user");
    localStorage.removeItem("smarttrip_trip_input");
    localStorage.removeItem("smarttrip_places");
    localStorage.removeItem("smarttrip_plan");
    navigate("/auth");
  };

  return (
    <div className="glass-card mx-auto flex w-full max-w-7xl items-center justify-between rounded-[28px] px-5 py-4">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-cyanGlow">SmartTrip</p>
        <h1 className="text-lg font-extrabold text-white">Travel Planner</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-white">{user.name || "Traveler"}</p>
          <p className="text-xs text-slate-400">{user.email || "Local account"}</p>
        </div>
        <button className="secondary-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
