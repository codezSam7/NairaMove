import { useEffect, useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Target, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const savingsData = [
    { month: 'Jan', saved: 45000 },
    { month: 'Feb', saved: 62000 },
    { month: 'Mar', saved: 58000 },
    { month: 'Apr', saved: 89000 },
];

const recentPlans = [
    { id: 1, name: "School Fees", amount: 150000, frequency: "Monthly", progress: 65 },
    { id: 2, name: "New Laptop", amount: 450000, frequency: "Weekly", progress: 28 },
    { id: 3, name: "Emergency Fund", amount: 100000, frequency: "One-time", progress: 100 },
];

export default function Dashboard() {
    const [totalSaved] = useState(1245000);
    const [totalPlanned] = useState(2450000);

    useEffect(() => {
        console.log("Premium Dashboard loaded");
    }, []);

    return (
        <div className="max-w-7xl mx-auto space-y-10">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">
                    Good morning, Samuel 👋
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                    Here's how your money discipline is looking today
                </p>
            </div>

            {/* Quick Stats - Bigger & Cleaner */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">Total Saved</p>
                            <p className="text-4xl font-semibold mt-4 tracking-tighter">₦{totalSaved.toLocaleString()}</p>
                        </div>
                        <div className="p-4 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-3xl">
                            <TrendingUp size={32} />
                        </div>
                    </div>
                    <p className="mt-6 text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        ↑ 12.5% from last month
                    </p>
                </Card>

                <Card className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">Active Plans</p>
                            <p className="text-4xl font-semibold mt-4 tracking-tighter">7</p>
                        </div>
                        <div className="p-4 bg-sky-100 dark:bg-sky-900/50 text-primary rounded-3xl">
                            <Target size={32} />
                        </div>
                    </div>
                    <p className="mt-6 text-slate-500 dark:text-slate-400">3 transfers due this week</p>
                </Card>

                <Card className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400">Next Transfer</p>
                            <p className="text-4xl font-semibold mt-4 tracking-tighter">₦45,000</p>
                        </div>
                        <div className="p-4 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 rounded-3xl">
                            <Clock size={32} />
                        </div>
                    </div>
                    <p className="mt-6 text-slate-500 dark:text-slate-400">Tomorrow — School Fees</p>
                </Card>
            </div>

            {/* Savings Trend Chart - More Premium */}
            <Card className="p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold tracking-tight">Savings Trend</h2>
                    <Button variant="outline" className="text-sm">Last 6 Months</Button>
                </div>

                <div className="h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={savingsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" className="dark:stroke-slate-700" />
                            <XAxis dataKey="month" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                                formatter={(value) => [`₦${value.toLocaleString()}`, 'Saved']}
                                contentStyle={{ backgroundColor: '#1e2937', border: 'none', borderRadius: '12px', color: '#f1f5f9' }}
                            />
                            <Line
                                type="natural"
                                dataKey="saved"
                                stroke="#0ea5e9"
                                strokeWidth={5}
                                dot={{ fill: '#0ea5e9', r: 7, strokeWidth: 3, stroke: '#fff' }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Active Plans + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Active Plans */}
                <Card className="p-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-semibold tracking-tight">Active Plans</h2>
                        <Button
                            variant="primary"
                            onClick={() => window.location.href = '/plans'}
                        >
                            Manage Plans
                        </Button>
                    </div>

                    <div className="space-y-6">
                        {recentPlans.map((plan) => (
                            <div key={plan.id} className="flex items-center justify-between p-6 border border-slate-100 dark:border-slate-700 rounded-3xl hover:border-sky-200 dark:hover:border-sky-800 transition-all">
                                <div className="flex items-center gap-5">
                                    <div className="w-14 h-14 bg-sky-100 dark:bg-sky-900/60 text-primary rounded-3xl flex items-center justify-center">
                                        <Target size={28} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-lg">{plan.name}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{plan.frequency}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-xl">₦{plan.amount.toLocaleString()}</p>
                                    <div className="text-xs text-slate-500 mt-2 mb-2">{plan.progress}% complete</div>
                                    <div className="w-36 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full"
                                            style={{ width: `${plan.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-8">
                    <h2 className="text-2xl font-semibold tracking-tight mb-8">Quick Actions</h2>

                    <div className="space-y-4">
                        <Button
                            variant="primary"
                            className="w-full h-16 text-lg justify-start"
                            onClick={() => window.location.href = '/plans'}
                        >
                            <Target className="mr-4" size={26} />
                            Create New Plan
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-16 text-lg justify-start border-slate-300 dark:border-slate-600"
                            onClick={() => window.location.href = '/bank-connect'}
                        >
                            <ArrowRight className="mr-4" size={26} />
                            Connect Another Bank
                        </Button>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-700">
                        <p className="text-sm text-slate-500 dark:text-slate-400">Total Planned This Month</p>
                        <p className="text-5xl font-semibold tracking-tighter mt-3">₦{totalPlanned.toLocaleString()}</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}