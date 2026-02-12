import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import { createPageUrl } from '@/utils';

export default function AdminProtectedRoute({ children }) {
    const { isAdminAuthenticated, isLoading } = useAdminAuth();
    const location = useLocation();

    // Show loading while checking auth status
    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-100 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                        <span className="text-white font-bold text-2xl">T</span>
                    </div>
                    <div className="w-8 h-8 border-4 border-slate-200 border-t-indigo-600 rounded-full animate-spin" />
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAdminAuthenticated) {
        return <Navigate to={createPageUrl('AdminLogin')} state={{ from: location }} replace />;
    }

    // Render the protected content
    return children;
}
