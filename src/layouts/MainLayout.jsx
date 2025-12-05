import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            <Navbar />

            {/* Main content */}
            <main className="flex-grow bg-white">
                <Outlet />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default MainLayout;
