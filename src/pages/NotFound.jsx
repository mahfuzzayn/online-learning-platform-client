import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    useEffect(() => {
        document.title = 'Hiko | 404 Not Found';
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-16">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
                <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Page Not Found</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">The page you are looking for does not exist.</p>
                <Link
                    to="/"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
