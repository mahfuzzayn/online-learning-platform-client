import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <nav className="bg-blue-600 text-white p-4">
                <div className="container mx-auto">
                    <h2 className="text-xl font-bold">Navbar Placeholder</h2>
                </div>
            </nav>

            {/* Main content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 mt-auto">
                <div className="container mx-auto text-center">
                    <p>Footer Placeholder</p>
                </div>
            </footer>
        </div>
    );
}

export default Layout;
