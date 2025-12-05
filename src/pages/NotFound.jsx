import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    useEffect(() => {
        document.title = 'Online Learning | 404 Not Found';
    }, []);

    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Page Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">The page you are looking for does not exist.</p>
            <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}

export default NotFound;
