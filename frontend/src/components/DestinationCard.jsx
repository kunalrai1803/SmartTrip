import { MapPinIcon, StarIcon } from "./AppIcons";
import { getCityImage } from "../data/cityImages";

const FALLBACK_IMAGE = "/background.jpg";

export default function DestinationCard({ destination, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`glass-card w-[244px] shrink-0 overflow-hidden rounded-[28px] text-left transition ${
        active ? "border-cyanGlow/80 ring-1 ring-cyanGlow/60" : "border-white/10"
      }`}
    >
      <div className="relative">
        <img
          src={getCityImage(destination.city) || destination.image || FALLBACK_IMAGE}
          alt={destination.city}
          className="h-40 w-full object-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slateNight/80 via-transparent to-transparent" />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-extrabold text-white">{destination.city}</h3>
            <p className="mt-1 text-sm text-slate-400">India</p>
          </div>

          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-xs font-semibold text-slate-100">
            <StarIcon className="h-3.5 w-3.5 text-amber-300" />
            <span>{destination.rating}</span>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400">
          <MapPinIcon className="h-3.5 w-3.5" />
          <span>{destination.state}</span>
        </div>
      </div>
    </button>
  );
}
