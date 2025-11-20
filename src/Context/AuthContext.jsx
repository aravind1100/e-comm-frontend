import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import API from "../utils/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // track initial fetch

  // Fetch user info on initial load if token exists
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoadingUser(false);
        return;
      }

      try {
        const res = await API.get("/users/me"); // backend route to get current user
        setUser(res.data.user);
      } catch (err) {
        console.log("Failed to fetch user:", err);
        Cookies.remove("token");
        setToken(null);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, [token]);

  // LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });

      if (res.data.token && res.data._id) {
        // Save token in cookies
        Cookies.set("token", res.data.token, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        setToken(res.data.token);

        // Set user data from login response
        const userData = {
          _id: res.data._id,
          username: res.data.username || "",
          email: res.data.email,
          role: res.data.role || "user",
        };
        setUser(userData);

        return { success: true, message: "Login successful" };
      }

      return { success: false, message: res.data.message || "Login failed" };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Network error. Try again.",
      };
    }
  };

  // LOGOUT FUNCTION
  const logout = () => {
    Cookies.remove("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!user,
        loadingUser, // expose this so UI can wait for user load
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
