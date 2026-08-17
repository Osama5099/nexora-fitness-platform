import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const api = axios.create({
    baseURL: API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;

        // JWT payload se userId (sub) nikalna
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            const userId = payload.sub;

            if (userId) {
                config.headers["X-User-ID"] = userId;
            }
        } catch (error) {
            console.error("Token decode error:", error);
        }
    }

    return config;
});

export const getActivities = () => api.get("/activities");

export const addActivity = (activity) => api.post("/activities", activity);

export const getActivityDetail = (id) =>
    api.get(`/recommendations/activity/${id}`);