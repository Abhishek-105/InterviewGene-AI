import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
  login,
  register,
  logout,
} from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, setLoading } = context;

  // Login
  const handleLogin = async (credentials) => {
    setLoading(true);

    try {
      const data = await login(credentials);

      // Backend returns:
      // {
      //   message: "...",
      //   user: {...}
      // }

      setUser(data.user);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register
  const handleRegister = async (userData) => {
    setLoading(true);

    try {
      const data = await register(userData);

      setUser(data.user);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const handleLogout = async () => {
    setLoading(true);

    try {
      await logout();

      setUser(null);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
  };
};