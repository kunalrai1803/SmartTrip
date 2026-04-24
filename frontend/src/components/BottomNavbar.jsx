import { NavLink, useLocation } from "react-router-dom";
import { HomeIcon, TripsIcon } from "./AppIcons";

const navItems = [
  { id: "home", label: "Home", path: "/home", icon: HomeIcon },
  { id: "trips", label: "Trips", path: "/trips", icon: TripsIcon },
];

export default function BottomNavbar({ activeTab }) {
  const location = useLocation();

  const currentTab = activeTab || (location.pathname.startsWith("/trips") ? "trips" : "home");

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-4">
      <div className="mx-auto w-full max-w-xs">
        <nav className="glass-card grid grid-cols-2 rounded-[28px] p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-1 rounded-[22px] px-3 py-3 text-xs font-semibold transition ${
                  isActive
                    ? "bg-white/12 text-cyanGlow"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
