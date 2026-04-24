import axios from "axios";

const api = axios.create({
  baseURL: "https://smarttrip-z2fx.onrender.com",
});

export const signupUser = (payload) => api.post("/signup", payload);
export const loginUser = (payload) => api.post("/login", payload);
export const getLocations = () => api.get("/locations");
export const getPlaces = (state, city) =>
  api.get("/get_places", {
    params: { state, city },
  });
export const generatePlan = (payload) => api.post("/generate_plan", payload);

export default api;