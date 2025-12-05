import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout failed');
        }
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200"
                    >
                        LearnHub
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 ${isActive
                                    ? 'text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/courses"
                            className={({ isActive }) =>
                                `text-sm font-medium transition-colors duration-200 ${isActive
                                    ? 'text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`
                            }
                        >
                            Courses
                        </NavLink>
                        {user && (
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors duration-200 ${isActive
                                        ? 'text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>
                        )}

                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2">
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt={user.displayName || 'User'}
                                            className="w-8 h-8 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
                                            {user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.displayName || user.email}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-5 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                className="ml-4 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Login
                            </NavLink>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-1">
                            <NavLink
                                to="/"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/courses"
                                onClick={() => setIsMenuOpen(false)}
                                className={({ isActive }) =>
                                    `px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                    }`
                                }
                            >
                                Courses
                            </NavLink>
                            {user && (
                                <NavLink
                                    to="/dashboard"
                                    onClick={() => setIsMenuOpen(false)}
                                    className={({ isActive }) =>
                                        `px-4 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            )}

                            {user ? (
                                <>
                                    <div className="px-4 py-2.5 text-sm text-gray-600">
                                        {user.displayName || user.email}
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="mx-4 mt-2 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200 text-center"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <NavLink
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="mt-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                                >
                                    Login
                                </NavLink>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
