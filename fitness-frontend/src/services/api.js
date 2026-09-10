import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/";

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    config.headers["X-User-ID"] = import.meta.env.VITE_DEMO_USER_ID || "demo-user-001";
    return config;
});

export const getActivities = () => api.get("/activities");

export const addActivity = (activity) => api.post("/activities", activity);

export const getActivityDetail = (id) =>
    api.get(`/recommendations/activity/${id}`);