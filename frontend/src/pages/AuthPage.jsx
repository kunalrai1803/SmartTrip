import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { loginUser, signupUser } from "../services/api";

const initialForm = {
  name: "",
  email: "",
  password: "",
};

export default function AuthPage() {
  const [mode, setMode] = useState("login");
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (mode === "signup" && !formData.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Please fill in email and password.");
      return;
    }

    try {
      setLoading(true);
      const response =
        mode === "login"
          ? await loginUser({ email: formData.email, password: formData.password })
          : await signupUser(formData);

      localStorage.setItem("smarttrip_user", JSON.stringify(response.data.user));
      navigate("/home");
    } catch (apiError) {
      setError(apiError.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell relative flex min-h-screen items-center overflow-hidden px-4 py-10">
      <div className="soft-dot left-[-40px] top-12 h-36 w-36 bg-cyanGlow" />
      <div className="soft-dot bottom-10 right-[-20px] h-44 w-44 bg-roseGlow" />

      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col justify-center"
        >
          <span className="mb-4 inline-flex w-fit rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyanGlow">
            SmartTrip Travel Planner
          </span>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-white md:text-6xl">
            Build city trips in seconds with a clean travel planner.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 md:text-lg">
            Choose a destination, select the places you love, and get a balanced day-wise plan with food, restaurants, and transport suggestions.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              "Local city dataset",
              "Instant schedule generation",
              "Responsive glassmorphism UI",
            ].map((item) => (
              <div key={item} className="glass-card rounded-3xl p-4 text-sm text-slate-200">
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-[32px] p-6 sm:p-8"
        >
          <div className="mb-6 flex rounded-full bg-white/5 p-1">
            <button
              className={`flex-1 rounded-full px-4 py-3 text-sm font-bold transition ${mode === "login" ? "bg-white text-slate-900" : "text-slate-300"}`}
              onClick={() => setMode("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 rounded-full px-4 py-3 text-sm font-bold transition ${mode === "signup" ? "bg-white text-slate-900" : "text-slate-300"}`}
              onClick={() => setMode("signup")}
            >
              Signup
            </button>
          </div>

          <h2 className="text-2xl font-extrabold text-white">{mode === "login" ? "Welcome back" : "Create your account"}</h2>
          <p className="mt-2 text-sm text-slate-400">
            {mode === "login" ? "Continue planning your next city escape." : "Start building smart itineraries with local travel insights."}
          </p>

          {loading ? (
            <LoadingSpinner label={mode === "login" ? "Signing you in..." : "Creating your account..."} />
          ) : (
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              {mode === "signup" && (
                <input
                  className="input-field"
                  name="name"
                  placeholder="Full name"
                  value={formData.name}
                  onChange={updateField}
                />
              )}

              <input
                className="input-field"
                name="email"
                placeholder="Email address"
                type="email"
                value={formData.email}
                onChange={updateField}
              />
              <input
                className="input-field"
                name="password"
                placeholder="Password"
                type="password"
                value={formData.password}
                onChange={updateField}
              />

              {error ? <p className="rounded-2xl border border-roseGlow/30 bg-roseGlow/10 px-4 py-3 text-sm text-rose-200">{error}</p> : null}

              <button className="primary-button w-full" type="submit">
                {mode === "login" ? "Login to SmartTrip" : "Create SmartTrip account"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
