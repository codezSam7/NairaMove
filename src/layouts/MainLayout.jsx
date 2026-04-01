import { useState, useEffect } from 'react';
import { Menu, X, Home, Target, History, Banknote, Sun, Moon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { label: 'Dashboard', icon: Home, path: '/' },
    { label: 'Plans', icon: Target, path: '/plans' },
    { label: 'Transactions', icon: History, path: '/transactions' },
    { label: 'Connect Bank', icon: Banknote, path: '/bank-connect' },
];

export default function MainLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    return (
        <div className="flex h-screen overflow-hidden font-sans">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static w-72 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-transform z-50`}>
                <div className="p-8 border-b border-slate-200 dark:border-slate-700">
                    <h1 className="text-3xl font-bold tracking-tighter text-sky-600 dark:text-sky-400">NairaMove</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Discipline in every transfer</p>
                </div>

                <nav className="p-6 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-4 px-6 py-4 rounded-2xl text-[15px] font-medium transition-all ${isActive
                                    ? 'bg-sky-600 text-white'
                                    : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                                    }`}
                            >
                                <Icon size={22} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Main Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 flex items-center z-40">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="lg:hidden text-2xl text-slate-700 dark:text-slate-300"
                    >
                        {sidebarOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                    <div className="flex items-center gap-6 ml-auto">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-3 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            {isDark ? <Sun size={22} /> : <Moon size={22} />}
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="font-semibold text-slate-900 dark:text-white">Samuel</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Ikeja, Lagos</p>
                            </div>
                            <div className="w-10 h-10 bg-sky-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">S</div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-auto p-8 bg-slate-50 dark:bg-slate-950">
                    {children}
                </main>
            </div>
        </div>
    );
}