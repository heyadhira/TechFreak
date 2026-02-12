import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext(undefined);

// Admin credentials (in production, this should be on the backend)
const ADMIN_CREDENTIALS = {
    email: 'adhirasudhir@gmail.com',
    password: 'Adhira@1682'
};

export function AdminAuthProvider({ children }) {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [adminUser, setAdminUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if admin is already logged in on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem('adminAuth');
        if (storedAuth) {
            try {
                const authData = JSON.parse(storedAuth);
                if (authData.isAuthenticated && authData.email) {
                    setIsAdminAuthenticated(true);
                    setAdminUser({ email: authData.email });
                }
            } catch (e) {
                localStorage.removeItem('adminAuth');
            }
        }
        setIsLoading(false);
    }, []);

    const adminLogin = async (email, password) => {
        // Validate credentials
        if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
            setIsAdminAuthenticated(true);
            setAdminUser({ email });
            localStorage.setItem('adminAuth', JSON.stringify({
                isAuthenticated: true,
                email,
                loginTime: new Date().toISOString()
            }));
            return { success: true };
        }
        return { success: false, error: 'Invalid email or password' };
    };

    const adminLogout = () => {
        setIsAdminAuthenticated(false);
        setAdminUser(null);
        localStorage.removeItem('adminAuth');
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
