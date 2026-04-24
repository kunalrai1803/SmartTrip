function IconBase({ children, className = "h-5 w-5", fill = "none" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function HomeIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M3 10.5L12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </IconBase>
  );
}

export function TripsIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </IconBase>
  );
}

export function SearchIcon({ className }) {
  return (
    <IconBase className={className}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-3.5-3.5" />
    </IconBase>
  );
}

export function StarIcon({ className }) {
  return (
    <IconBase className={className} fill="currentColor">
      <path d="M12 3.8l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8 2.5-5z" />
    </IconBase>
  );
}

export function MapPinIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M12 21s6-4.8 6-10a6 6 0 1 0-12 0c0 5.2 6 10 6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </IconBase>
  );
}

export function CalendarIcon({ className }) {
  return (
    <IconBase className={className}>
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </IconBase>
  );
}

export function WalletIcon({ className }) {
  return (
    <IconBase className={className}>
      <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5H18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 16.5z" />
      <path d="M4 8h14a2 2 0 0 1 2 2v1H15a2 2 0 0 0 0 4h5v1a2 2 0 0 1-2 2H6.5A2.5 2.5 0 0 1 4 15.5z" />
      <circle cx="15.5" cy="13" r=".8" />
    </IconBase>
  );
}
