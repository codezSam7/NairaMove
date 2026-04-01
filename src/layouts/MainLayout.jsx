import { useState } from 'react';
import { Menu, X, Home, Target, History, Banknote } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Dashboard', icon: Home, path: '/' },
    { label: 'Plans', icon: Target, path: '/plans' },
    { label: 'Transactions', icon: History, path: '/transactions' },
    { label: 'Connect Bank', icon: Banknote, path: '/bank-connect' },
];

export default function MainLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <div className="flex h-screen overflow-hidden font-sans bg-[#0f172a] text-[#f1f5f9]">
            {/* Sidebar - Improved Mobile */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 fixed lg:static w-72 h-full bg-[#1e2937] border-r border-slate-700 
        transition-transform z-50 overflow-y-auto`}>

                <div className="p-8 border-b border-slate-700">
                    <h1 className="text-3xl font-bold tracking-tighter text-sky-400">SaveSmart</h1>
                    <p className="text-slate-400 mt-1 text-sm">Discipline in every transfer</p>
                </div>

                <nav className="p-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}   // Close sidebar on mobile when clicking link
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[15px] font-medium transition-all ${isActive
                                    ? 'bg-sky-600 text-white'
                                    : 'hover:bg-slate-800 text-slate-300'
                                    }`}
                            >
                                <Icon size={22} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navbar - Mobile Friendly */}
                <header className="h-20 bg-[#1e2937] border-b border-slate-700 px-6 lg:px-8 flex items-center z-40">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden text-3xl text-slate-300"
                    >
                        {sidebarOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right">
                            <p className="font-semibold">Samuel</p>
                            <p className="text-xs text-slate-400">Ikeja, Lagos</p>
                        </div>
                        <div className="w-10 h-10 bg-sky-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">S</div>
                    </div>
                </header>

                {/* Page Content - Better Mobile Padding */}
                <main className="flex-1 overflow-auto p-5 lg:p-8 bg-[#0f172a]">
                    {children}
                </main>
            </div>
        </div>
    );
}