import { createContext, useState, useEffect, useContext } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await getMe();
                setUser(data);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const handleRegister = async (userData) => {
        try {
            await register(userData);
            return true;
        } catch (err) {
            console.error("Context Register Error:", err);
            return false;
        }
    };

    const handleLogin = async (credentials) => {
        try {
            const data = await login(credentials);
            setUser(data);
            return true;
        } catch (err) {
            console.error("Context Login Error:", err);
            return false;
        }
    };

    // Yahan Provider add kar diya hai
    return (
        <AuthContext.Provider value={{ loading, user, handleRegister, handleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);