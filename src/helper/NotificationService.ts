import axios from "axios";

// Force the correct base URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://vacanzagreece.gr/api";

console.log("🔧 NotificationService API_BASE_URL:", API_BASE_URL);

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Fix TypeScript errors with optional chaining and fallbacks
    const fullUrl = `${config.baseURL || ""}${config.url || ""}`;
    console.log("📡 Request:", config.method?.toUpperCase(), fullUrl);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ Success:", response.config.url, response.status);
    return response;
  },
  (error) => {
    // Fix TypeScript errors
    const fullUrl = `${error.config?.baseURL || ""}${error.config?.url || ""}`;
    console.error("❌ Error:", fullUrl, error.response?.status);
    return Promise.reject(error);
  }
);

export const sendNotification = async (
  userId: string,
  title: string,
  message: string
) => {
  const response = await apiClient.post("/notification/send", {
    userId,
    title,
    message,
  });
  return response.data;
};

export const getUnreadCount = async () => {
  const response = await apiClient.get("/notification/unread-count");
  return response.data;
};

export const getUserNotifications = async () => {
  const response = await apiClient.get("/notification/user");
  return response.data;
};

export const markAsRead = async (id: string) => {
  const response = await apiClient.post(`/notification/read/${id}`);
  return response.data;
};

export const markAllAsRead = async () => {
  const response = await apiClient.post("/notification/read-all");
  return response.data;
};

export const deleteNotification = async (id: string) => {
  const response = await apiClient.delete(`/notification/delete/${id}`);
  return response.data;
};

export const deleteAllNotifications = async () => {
  const response = await apiClient.delete(
    "/notification/delete-myAllNotification"
  );
  return response.data;
};
