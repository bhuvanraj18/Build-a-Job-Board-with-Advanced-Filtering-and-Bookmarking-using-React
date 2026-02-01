import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }: { children: ReactNode }) => {
    const location = useLocation();
    const isTracker = location.pathname === '/tracker';

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link to="/" className="flex-shrink-0 flex items-center">
                                <span className="text-2xl font-bold text-blue-600 tracking-tight">JobBoard</span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${!isTracker ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Find Jobs
                            </Link>
                            <Link
                                to="/tracker"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isTracker ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                My Tracker
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
