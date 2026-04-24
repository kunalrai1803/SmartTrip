import { CalendarIcon, WalletIcon } from "./AppIcons";

const FALLBACK_IMAGE = "/background.jpg";

export default function TripCard({ trip }) {
  return (
    <div className="glass-card flex items-center gap-4 rounded-[28px] p-4">
      <img
        src={trip.coverImage || FALLBACK_IMAGE}
        alt={trip.tripName}
        className="h-24 w-24 shrink-0 rounded-[22px] object-cover"
        loading="lazy"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = FALLBACK_IMAGE;
        }}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-extrabold text-white">{trip.tripName}</h3>
            <p className="mt-1 truncate text-sm text-slate-400">
              {trip.city}, {trip.state}
            </p>
          </div>

          <span className="rounded-full border border-cyanGlow/25 bg-cyanGlow/10 px-3 py-1 text-xs font-bold text-cyanGlow">
            ₹ {Number(trip.budget || 0).toLocaleString()}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="h-4 w-4 text-slate-400" />
            <span>{trip.dateRange}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <WalletIcon className="h-4 w-4 text-slate-400" />
            <span>{trip.days} day itinerary</span>
          </div>
        </div>
      </div>
    </div>
  );
}

