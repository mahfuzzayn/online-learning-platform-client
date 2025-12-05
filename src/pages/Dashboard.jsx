import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        document.title = 'Online Learning | Dashboard';
        // Redirect to enrolled courses by default
        if (window.location.pathname === '/dashboard') {
            navigate('/dashboard/enrolled');
        }
    }, [navigate]);

    const navItems = [
        {
            path: '/dashboard/enrolled',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            label: 'Enrolled Courses'
        },
        {
            path: '/dashboard/progress',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            label: 'Progress'
        },
        {
            path: '/dashboard/add-course',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
            ),
            label: 'Add Course'
        },
        {
            path: '/dashboard/my-courses',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
            label: 'My Courses'
        }
    ];


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Dashboard Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Dashboard
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Welcome back, {user?.displayName || user?.email}!
                            </p>
                        </div>
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isSidebarOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`lg:w-64 ${isSidebarOpen ? 'block' : 'hidden lg:block'}`}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4">
                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <NavLink
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsSidebarOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`
                                        }
                                    >
                                        {item.icon}
                                        <span>{item.label}</span>
                                    </NavLink>
                                ))}
                            </nav>
                        </div>

                        {/* User Info Card */}
                        <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-center gap-4">
                                {user?.photoURL ? (
                                    <img
                                        src={user.photoURL}
                                        alt={user.displayName || 'User'}
                                        className="w-12 h-12 rounded-full"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                                        {user?.displayName?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">
                                        {user?.displayName || 'User'}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.aside>

                    {/* Main Content Area */}
                    <motion.main
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex-1"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                            <Outlet />
                        </div>
                    </motion.main>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
