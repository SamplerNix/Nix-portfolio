// Centralized API URL helper that automatically normalizes protocol and trailing slashes

const getApiUrl = () => {
  let url = import.meta.env.VITE_API_URL || "http://localhost:5000";
  url = url.trim();

  // If user forgot https:// in environment variables (e.g., 'my-app.vercel.app' or 'my-app.onrender.com')
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  // Remove trailing slash if present
  return url.replace(/\/+$/, "");
};

export const API_URL = getApiUrl();
