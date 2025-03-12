import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

interface User {
    id: number;
    email: string;
    name: string;
    role: string;
}

interface AuthContextData {
    user: User | null;
    loading: boolean;
    login: (accessToken: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('@App:token');
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            api.get('/users/me/')
                .then(response => {
                    setUser(response.data);
                })
                .catch(() => {
                    localStorage.removeItem('@App:token');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (accessToken: string) => {
        try {
            localStorage.setItem('@App:token', accessToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            
            const response = await api.get('/users/me/');
            setUser(response.data);
        } catch (error) {
            localStorage.removeItem('@App:token');
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('@App:token');
        api.defaults.headers.common['Authorization'] = '';
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 