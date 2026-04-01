import { Routes, Route } from 'react-router-dom';
import Dashboard from './features/Dashboard';
import Plans from './features/Plans';
import Transactions from './features/Transactions';
import BankConnect from './features/BankConnect';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/bankConnect" element={<BankConnect />} />

            {/* Fallback route */}
            <Route path="*" element={
                <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
                        <p className="text-gray-500 mt-2">The page you're looking for doesn't exist.</p>
                    </div>
                </div>
            } />
        </Routes>
    );
}