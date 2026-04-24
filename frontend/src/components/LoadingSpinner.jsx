import { motion } from "framer-motion";

export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <motion.div
        className="h-14 w-14 rounded-full border-4 border-cyanGlow/20 border-t-cyanGlow"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  );
}

