import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/api/supabaseClient';

const AdminAuthContext = createContext(undefined);

export function AdminAuthProvider({ children }) {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [adminUser, setAdminUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check existing session on mount and listen for auth changes
    useEffect(() => {
        // Get the current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setIsAdminAuthenticated(true);
                setAdminUser({ email: session.user.email });
            }
            setIsLoading(false);
        });

        // Listen for auth state changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setIsAdminAuthenticated(true);
                setAdminUser({ email: session.user.email });
            } else {
                setIsAdminAuthenticated(false);
                setAdminUser(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const adminLogin = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return { success: false, error: error.message };
            }

            setIsAdminAuthenticated(true);
            setAdminUser({ email: data.user.email });
            return { success: true };
        } catch (err) {
            return { success: false, error: 'An unexpected error occurred' };
        }
    };

    const adminLogout = async () => {
        await supabase.auth.signOut();
        setIsAdminAuthenticated(false);
        setAdminUser(null);
    };

    return (
        <AdminAuthContext.Provider value={{
            isAdminAuthenticated,
            adminUser,
            isLoading,
            adminLogin,
            adminLogout
        }}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
}
