// import { useEffect, useState } from 'react';
// import Card from '../components/Card';
// import Button from '../components/Button';
// import { Target, TrendingUp, Clock, ArrowRight } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const savingsData = [
//     { month: 'Jan', saved: 45000 },
//     { month: 'Feb', saved: 62000 },
//     { month: 'Mar', saved: 58000 },
//     { month: 'Apr', saved: 89000 },
// ];

// const recentPlans = [
//     { id: 1, name: "School Fees", amount: 150000, frequency: "Monthly", progress: 65 },
//     { id: 2, name: "New Laptop", amount: 450000, frequency: "Weekly", progress: 28 },
//     { id: 3, name: "Emergency Fund", amount: 100000, frequency: "One-time", progress: 100 },
// ];

// export default function Dashboard() {
//     const [totalSaved] = useState(1245000);
//     const [totalPlanned] = useState(2450000);

//     return (
//         <div className="max-w-7xl mx-auto space-y-8 lg:space-y-10">
//             <div>
//                 <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">Good morning, Samuel 👋</h1>
//                 <p className="text-slate-400 mt-2 text-base lg:text-lg">Here's how your money discipline is looking</p>
//             </div>

//             {/* Stats - Better on Mobile */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
//                 <Card className="p-6 lg:p-8">
//                     <p className="text-sm uppercase tracking-widest text-slate-400">Total Saved</p>
//                     <p className="text-3xl lg:text-4xl font-semibold tracking-tighter mt-4">₦{totalSaved.toLocaleString()}</p>
//                     <p className="mt-5 text-emerald-400 text-sm">↑ 12.5% this month</p>
//                 </Card>

//                 <Card className="p-6 lg:p-8">
//                     <p className="text-sm uppercase tracking-widest text-slate-400">Active Plans</p>
//                     <p className="text-3xl lg:text-4xl font-semibold tracking-tighter mt-4">7</p>
//                     <p className="mt-5 text-slate-400 text-sm">3 due this week</p>
//                 </Card>

//                 <Card className="p-6 lg:p-8 sm:col-span-2 lg:col-span-1">
//                     <p className="text-sm uppercase tracking-widest text-slate-400">Next Transfer</p>
//                     <p className="text-3xl lg:text-4xl font-semibold tracking-tighter mt-4">₦45,000</p>
//                     <p className="mt-5 text-slate-400 text-sm">Tomorrow • School Fees</p>
//                 </Card>
//             </div>

//             {/* Chart */}
//             <Card className="p-6 lg:p-8">
//                 <div className="flex justify-between items-center mb-6">
//                     <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">Savings Trend</h2>
//                 </div>
//                 <div className="h-72 lg:h-96">
//                     <ResponsiveContainer width="100%" height="100%">
//                         <LineChart data={savingsData}>
//                             <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
//                             <XAxis dataKey="month" stroke="#64748b" />
//                             <YAxis stroke="#64748b" />
//                             <Tooltip
//                                 formatter={(value) => [`₦${value.toLocaleString()}`, 'Saved']}
//                                 contentStyle={{ backgroundColor: '#1e2937', border: 'none', borderRadius: '12px' }}
//                             />
//                             <Line type="natural" dataKey="saved" stroke="#0ea5e9" strokeWidth={5} dot={{ fill: '#0ea5e9', r: 6 }} />
//                         </LineChart>
//                     </ResponsiveContainer>
//                 </div>
//             </Card>

//             {/* Plans + Quick Actions - Stacked nicely on mobile */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
//                 <Card className="p-6 lg:p-8">
//                     <div className="flex justify-between items-center mb-8">
//                         <h2 className="text-xl lg:text-2xl font-semibold tracking-tight">Active Plans</h2>
//                         <Button variant="primary" onClick={() => window.location.href = '/plans'}>Manage</Button>
//                     </div>
//                     <div className="space-y-6">
//                         {recentPlans.map(plan => (
//                             <div key={plan.id} className="flex justify-between items-center p-5 border border-slate-700 rounded-3xl">
//                                 <div className="flex items-center gap-4">
//                                     <div className="w-12 h-12 bg-sky-900/50 text-sky-400 rounded-2xl flex items-center justify-center">
//                                         <Target size={26} />
//                                     </div>
//                                     <div>
//                                         <p className="font-medium">{plan.name}</p>
//                                         <p className="text-sm text-slate-400">{plan.frequency}</p>
//                                     </div>
//                                 </div>
//                                 <div className="text-right">
//                                     <p className="font-semibold">₦{plan.amount.toLocaleString()}</p>
//                                     <div className="w-24 h-1.5 bg-slate-700 rounded-full mt-3 overflow-hidden">
//                                         <div className="h-full bg-sky-400" style={{ width: `${plan.progress}%` }} />
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </Card>

//                 <Card className="p-6 lg:p-8">
//                     <h2 className="text-xl lg:text-2xl font-semibold tracking-tight mb-8">Quick Actions</h2>
//                     <div className="space-y-4">
//                         <Button variant="primary" className="w-full h-14 text-lg" onClick={() => window.location.href = '/plans'}>
//                             <Target className="mr-3" size={24} /> Create New Plan
//                         </Button>
//                         <Button variant="outline" className="w-full h-14 text-lg border-slate-600" onClick={() => window.location.href = '/bank-connect'}>
//                             <ArrowRight className="mr-3" size={24} /> Connect Bank
//                         </Button>
//                     </div>
//                 </Card>
//             </div>
//         </div>
//     );
// }





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

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-10">

            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
                    Good morning, Samuel 👋
                </h1>
                <p className="text-slate-400 mt-2 text-sm sm:text-base lg:text-lg">
                    Here's how your money discipline is looking
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                <Card className="p-5 sm:p-6 lg:p-8">
                    <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400">Total Saved</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">
                        ₦{totalSaved.toLocaleString()}
                    </p>
                    <p className="mt-4 text-emerald-400 text-xs sm:text-sm">↑ 12.5% this month</p>
                </Card>

                <Card className="p-5 sm:p-6 lg:p-8">
                    <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400">Active Plans</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">7</p>
                    <p className="mt-4 text-slate-400 text-xs sm:text-sm">3 due this week</p>
                </Card>

                <Card className="p-5 sm:p-6 lg:p-8 sm:col-span-2 lg:col-span-1">
                    <p className="text-xs sm:text-sm uppercase tracking-widest text-slate-400">Next Transfer</p>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold mt-3">₦45,000</p>
                    <p className="mt-4 text-slate-400 text-xs sm:text-sm">Tomorrow • School Fees</p>
                </Card>
            </div>

            {/* Chart */}
            <Card className="p-5 sm:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                        Savings Trend
                    </h2>
                </div>

                <div className="h-64 sm:h-72 lg:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={savingsData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis dataKey="month" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip
                                formatter={(value) => [`₦${value.toLocaleString()}`, 'Saved']}
                                contentStyle={{
                                    backgroundColor: '#1e2937',
                                    border: 'none',
                                    borderRadius: '12px'
                                }}
                            />
                            <Line
                                type="natural"
                                dataKey="saved"
                                stroke="#0ea5e9"
                                strokeWidth={4}
                                dot={{ fill: '#0ea5e9', r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Plans + Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

                {/* Plans */}
                <Card className="p-5 sm:p-6 lg:p-8">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                            Active Plans
                        </h2>
                        <Button variant="primary" className="w-full sm:w-auto"
                            onClick={() => window.location.href = '/plans'}>
                            Manage
                        </Button>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        {recentPlans.map(plan => (
                            <div
                                key={plan.id}
                                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 sm:p-5 border border-slate-700 rounded-2xl sm:rounded-3xl"
                            >
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sky-900/50 text-sky-400 rounded-xl sm:rounded-2xl flex items-center justify-center">
                                        <Target size={22} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-sm sm:text-base">{plan.name}</p>
                                        <p className="text-xs sm:text-sm text-slate-400">{plan.frequency}</p>
                                    </div>
                                </div>

                                <div className="text-left sm:text-right w-full sm:w-auto">
                                    <p className="font-semibold text-sm sm:text-base">
                                        ₦{plan.amount.toLocaleString()}
                                    </p>
                                    <div className="w-full sm:w-24 h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
                                        <div
                                            className="h-full bg-sky-400"
                                            style={{ width: `${plan.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card className="p-5 sm:p-6 lg:p-8">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6">
                        Quick Actions
                    </h2>

                    <div className="space-y-3 sm:space-y-4">
                        <Button
                            variant="primary"
                            className="w-full h-12 sm:h-14 text-base sm:text-lg"
                            onClick={() => window.location.href = '/plans'}
                        >
                            <Target className="mr-2 sm:mr-3" size={20} />
                            Create New Plan
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-12 sm:h-14 text-base sm:text-lg border-slate-600"
                            onClick={() => window.location.href = '/bank-connect'}
                        >
                            <ArrowRight className="mr-2 sm:mr-3" size={20} />
                            Connect Bank
                        </Button>
                    </div>
                </Card>

            </div>
        </div>
    );
}