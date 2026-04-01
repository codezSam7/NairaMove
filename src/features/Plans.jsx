import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus, Target, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function Plans() {
    const [plans, setPlans] = useState([
        { id: 1, name: "School Fees", targetAmount: 150000, frequency: "Monthly", nextDate: "2026-04-15", status: "active", progress: 65, connectedAccount: "GTBank •••• 4582" },
        { id: 2, name: "New Laptop", targetAmount: 450000, frequency: "Weekly", nextDate: "2026-04-05", status: "active", progress: 28, connectedAccount: "Access Bank •••• 7391" },
        { id: 3, name: "Emergency Fund", targetAmount: 100000, frequency: "One-time", nextDate: "2026-04-10", status: "completed", progress: 100, connectedAccount: "Zenith Bank •••• 1123" }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlan, setNewPlan] = useState({
        name: '', targetAmount: '', frequency: 'Monthly', startDate: '', connectedAccount: 'GTBank'
    });

    const handleCreatePlan = (e) => {
        e.preventDefault();
        if (!newPlan.name || !newPlan.targetAmount) return;

        const plan = {
            id: Date.now(),
            name: newPlan.name,
            targetAmount: parseInt(newPlan.targetAmount),
            frequency: newPlan.frequency,
            nextDate: newPlan.startDate || format(new Date(), 'yyyy-MM-dd'),
            status: 'active',
            progress: 0,
            connectedAccount: `${newPlan.connectedAccount} •••• 4582`
        };

        setPlans([...plans, plan]);
        setIsModalOpen(false);
        setNewPlan({ name: '', targetAmount: '', frequency: 'Monthly', startDate: '', connectedAccount: 'GTBank' });
    };

    const deletePlan = (id) => setPlans(plans.filter(p => p.id !== id));

    return (
        <div className="max-w-6xl mx-auto space-y-8 px-2">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                <div className="flex-1">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">My Plans</h1>
                    <p className="text-slate-400 mt-1">Set automatic transfers</p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 text-base"
                >
                    <Plus size={20} /> New Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {plans.map((plan) => (
                    <Card key={plan.id} className="p-6 group">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-sky-900/50 text-sky-400 rounded-2xl flex items-center justify-center flex-shrink-0">
                                    <Target size={28} />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg leading-tight">{plan.name}</h3>
                                    <p className="text-sm text-slate-400 mt-0.5">{plan.connectedAccount}</p>
                                </div>
                            </div>
                            <button onClick={() => deletePlan(plan.id)} className="text-red-400 opacity-0 group-hover:opacity-100">
                                <Trash2 size={20} />
                            </button>
                        </div>

                        <div className="mt-8">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-400">Target</span>
                                <span className="font-semibold">₦{plan.targetAmount.toLocaleString()}</span>
                            </div>
                            <div className="h-2 bg-slate-700 rounded-full mb-6 overflow-hidden">
                                <div className="h-full bg-sky-400 transition-all" style={{ width: `${plan.progress}%` }} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-slate-400">Frequency</p>
                                    <p className="font-medium mt-1 flex items-center gap-1.5"><Calendar size={16} />{plan.frequency}</p>
                                </div>
                                <div>
                                    <p className="text-slate-400">Next</p>
                                    <p className="font-medium mt-1">{format(new Date(plan.nextDate), 'dd MMM')}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between text-sm">
                            <span className={`px-4 py-1 rounded-full text-xs font-medium ${plan.status === 'completed' ? 'bg-emerald-900 text-emerald-400' : 'bg-sky-900 text-sky-400'}`}>
                                {plan.status.toUpperCase()}
                            </span>
                            <span className="text-slate-400">{plan.progress}% done</span>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#1e2937] rounded-3xl w-full max-w-md overflow-hidden">
                        <div className="p-8">
                            <h2 className="text-2xl font-semibold mb-8">Create New Plan</h2>
                            <form onSubmit={handleCreatePlan} className="space-y-6">
                                <input type="text" placeholder="Plan Name" value={newPlan.name} onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })} className="w-full px-5 py-4 bg-slate-800 border border-slate-600 rounded-2xl" required />
                                <input type="number" placeholder="Target Amount (₦)" value={newPlan.targetAmount} onChange={(e) => setNewPlan({ ...newPlan, targetAmount: e.target.value })} className="w-full px-5 py-4 bg-slate-800 border border-slate-600 rounded-2xl" required />

                                <div className="grid grid-cols-2 gap-4">
                                    <select value={newPlan.frequency} onChange={(e) => setNewPlan({ ...newPlan, frequency: e.target.value })} className="px-5 py-4 bg-slate-800 border border-slate-600 rounded-2xl">
                                        <option value="Monthly">Monthly</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Daily">Daily</option>
                                        <option value="One-time">One-time</option>
                                    </select>
                                    <input type="date" value={newPlan.startDate} onChange={(e) => setNewPlan({ ...newPlan, startDate: e.target.value })} className="px-5 py-4 bg-slate-800 border border-slate-600 rounded-2xl" />
                                </div>

                                <select value={newPlan.connectedAccount} onChange={(e) => setNewPlan({ ...newPlan, connectedAccount: e.target.value })} className="w-full px-5 py-4 bg-slate-800 border border-slate-600 rounded-2xl">
                                    <option value="GTBank">GTBank</option>
                                    <option value="Access Bank">Access Bank</option>
                                    <option value="Zenith Bank">Zenith Bank</option>
                                </select>

                                <div className="flex gap-4 pt-4">
                                    <Button type="button" variant="outline" className="flex-1" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" variant="primary" className="flex-1">Create Plan</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}