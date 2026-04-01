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
        <div className="max-w-6xl mx-auto space-y-8 px-2">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Transactions</h1>
                    <p className="text-slate-400">All automatic transfers</p>
                </div>
                <Button variant="outline" className="sm:ml-auto">Export</Button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="p-6">
                    <p className="text-xs uppercase text-slate-400">Total This Month</p>
                    <p className="text-2xl font-semibold mt-2">₦{totalSaved.toLocaleString()}</p>
                </Card>
                <Card className="p-6">
                    <p className="text-xs uppercase text-slate-400">Success Rate</p>
                    <p className="text-2xl font-semibold mt-2 text-emerald-400">100%</p>
                </Card>
                <Card className="p-6">
                    <p className="text-xs uppercase text-slate-400">Last Transfer</p>
                    <p className="text-2xl font-semibold mt-2">₦45,000</p>
                </Card>
            </div>

            {/* Filters */}
            <Card className="p-5">
                <div className="relative mb-4">
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-11 py-3 bg-slate-800 border border-slate-600 rounded-2xl text-sm"
                    />
                </div>
                <div className="flex gap-2">
                    {['all', 'debit', 'credit'].map(f => (
                        <Button key={f} variant={filter === f ? "primary" : "outline"} onClick={() => setFilter(f)} className="flex-1 text-sm py-2">
                            {f === 'all' ? 'All' : f === 'debit' ? 'Outgoing' : 'Incoming'}
                        </Button>
                    ))}
                </div>
            </Card>

            {/* Table - Scrollable on mobile */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px]">
                        <thead>
                            <tr className="border-b border-slate-700">
                                <th className="text-left py-5 px-6 text-xs font-medium text-slate-400">Date</th>
                                <th className="text-left py-5 px-6 text-xs font-medium text-slate-400">Description</th>
                                <th className="text-left py-5 px-6 text-xs font-medium text-slate-400">From → To</th>
                                <th className="text-right py-5 px-6 text-xs font-medium text-slate-400">Amount</th>
                                <th className="text-center py-5 px-6 text-xs font-medium text-slate-400">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {filteredTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-800/70 transition-colors">
                                    <td className="py-6 px-6">
                                        <div>
                                            <p className="font-medium text-sm">{format(new Date(tx.date), 'dd MMM yyyy')}</p>
                                            <p className="text-xs text-slate-500 mt-1">{tx.time}</p>
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 text-sm font-medium pr-4">{tx.description}</td>
                                    <td className="py-6 px-6 text-sm text-slate-400">
                                        <div className="line-clamp-2">
                                            {tx.from} <span className="text-slate-500 mx-1">→</span> {tx.to}
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 text-right">
                                        <div className={`font-semibold text-lg flex items-center justify-end gap-1 ${tx.type === 'debit' ? 'text-red-400' : 'text-emerald-400'}`}>
                                            {tx.type === 'debit' ? <ArrowDownRight size={20} /> : <ArrowUpRight size={20} />}
                                            ₦{tx.amount.toLocaleString()}
                                        </div>
                                    </td>
                                    <td className="py-6 px-6 text-center">
                                        <span className="inline-block px-5 py-1.5 bg-emerald-900 text-emerald-400 text-xs font-medium rounded-full">
                                            {tx.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredTransactions.length === 0 && (
                    <div className="py-20 text-center text-slate-400">
                        No transactions found
                    </div>
                )}
            </Card>
        </div>
    );
}