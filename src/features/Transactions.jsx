import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { ArrowUpRight, ArrowDownRight, Download, Search } from 'lucide-react';
import { format } from 'date-fns';

export default function Transactions() {
    const [transactions] = useState([
        {
            id: 1,
            type: "debit",
            amount: 45000,
            description: "School Fees - Monthly Transfer",
            date: "2026-03-28",
            time: "09:15 AM",
            status: "success",
            from: "GTBank •••• 4582",
            to: "School Fees Plan"
        },
        {
            id: 2,
            type: "credit",
            amount: 120000,
            description: "Pocket Money Received",
            date: "2026-03-27",
            time: "14:30 PM",
            status: "success",
            from: "Parent",
            to: "Main Account"
        },
        {
            id: 3,
            type: "debit",
            amount: 25000,
            description: "New Laptop Plan - Weekly",
            date: "2026-03-25",
            time: "08:00 AM",
            status: "success",
            from: "Access Bank •••• 7391",
            to: "New Laptop Plan"
        },
        {
            id: 4,
            type: "debit",
            amount: 15000,
            description: "Emergency Fund Contribution",
            date: "2026-03-20",
            time: "11:45 AM",
            status: "success",
            from: "GTBank •••• 4582",
            to: "Emergency Fund"
        }
    ]);

    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTransactions = transactions
        .filter(tx => {
            if (filter === "debit") return tx.type === "debit";
            if (filter === "credit") return tx.type === "credit";
            return true;
        })
        .filter(tx =>
            tx.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => new Date(b.date) - new Date(a.date));

    const totalSaved = transactions
        .filter(tx => tx.type === "debit")
        .reduce((sum, tx) => sum + tx.amount, 0);

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Transactions</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">All your automatic transfers and movements</p>
                </div>
                <Button variant="outline" className="flex items-center gap-3">
                    <Download size={20} />
                    Export CSV
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="p-8">
                    <p className="uppercase tracking-widest text-sm text-slate-500 dark:text-slate-400">Total Transferred</p>
                    <p className="text-4xl font-semibold tracking-tighter mt-5">₦{totalSaved.toLocaleString()}</p>
                </Card>
                <Card className="p-8">
                    <p className="uppercase tracking-widest text-sm text-slate-500 dark:text-slate-400">Success Rate</p>
                    <p className="text-4xl font-semibold tracking-tighter mt-5 text-emerald-600">100%</p>
                </Card>
                <Card className="p-8">
                    <p className="uppercase tracking-widest text-sm text-slate-500 dark:text-slate-400">Last Transfer</p>
                    <p className="text-4xl font-semibold tracking-tighter mt-5">₦45,000</p>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-1 relative">
                        <Search className="absolute left-6 top-4 text-slate-400" size={22} />
                        <input
                            type="text"
                            placeholder="Search transactions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-14 py-4 border border-slate-300 dark:border-slate-600 rounded-3xl focus:outline-none focus:border-primary text-lg bg-white dark:bg-slate-800"
                        />
                    </div>

                    <div className="flex gap-3">
                        {['all', 'debit', 'credit'].map((f) => (
                            <Button
                                key={f}
                                variant={filter === f ? "primary" : "outline"}
                                onClick={() => setFilter(f)}
                                className="capitalize"
                            >
                                {f === 'all' ? 'All' : f === 'debit' ? 'Outgoing' : 'Incoming'}
                            </Button>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Transactions Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-700">
                                <th className="text-left py-6 px-8 font-medium text-slate-500 dark:text-slate-400">Date</th>
                                <th className="text-left py-6 px-8 font-medium text-slate-500 dark:text-slate-400">Description</th>
                                <th className="text-left py-6 px-8 font-medium text-slate-500 dark:text-slate-400">From → To</th>
                                <th className="text-right py-6 px-8 font-medium text-slate-500 dark:text-slate-400">Amount</th>
                                <th className="text-center py-6 px-8 font-medium text-slate-500 dark:text-slate-400">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="py-7 px-8">
                                        <p className="font-medium">{format(new Date(tx.date), 'dd MMM yyyy')}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{tx.time}</p>
                                    </td>
                                    <td className="py-7 px-8 font-medium">{tx.description}</td>
                                    <td className="py-7 px-8 text-slate-600 dark:text-slate-400">
                                        {tx.from} <span className="text-slate-300 mx-2">→</span> {tx.to}
                                    </td>
                                    <td className="py-7 px-8 text-right">
                                        <span className={`font-semibold text-xl flex items-center justify-end gap-1 ${tx.type === 'debit' ? 'text-red-600' : 'text-emerald-600'}`}>
                                            {tx.type === 'debit' ? <ArrowDownRight size={22} /> : <ArrowUpRight size={22} />}
                                            ₦{tx.amount.toLocaleString()}
                                        </span>
                                    </td>
                                    <td className="py-7 px-8 text-center">
                                        <span className="inline-block px-6 py-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 text-sm font-medium rounded-full">
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}