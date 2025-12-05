import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                        <NavLink
                            to="/login"
                            className="ml-4 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Login
                        </NavLink>
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
                            <NavLink
                                to="/login"
                                onClick={() => setIsMenuOpen(false)}
                                className="mt-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center"
                            >
                                Login
                            </NavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
