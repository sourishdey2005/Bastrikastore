import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active sessions and sets the user
        const getSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
            } catch (err) {
                console.error('Auth error fetching session:', err);
            } finally {
                setLoading(false);
            }
        };

        getSession();

        // Listen for changes on auth state
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
                setLoading(false);
            }
        );

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    const signup = (email, password) => {
        return supabase.auth.signUp({ email, password });
    };

    const login = (email, password) => {
        return supabase.auth.signInWithPassword({ email, password });
    };

    const logout = () => {
        return supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
            {loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'serif', color: '#6B1D1D' }}>Loading Bastrika...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
