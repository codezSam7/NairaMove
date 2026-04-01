import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus, Target, Calendar, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export default function Plans() {
    const [plans, setPlans] = useState([
        {
            id: 1,
            name: "School Fees",
            targetAmount: 150000,
            frequency: "Monthly",
            nextDate: "2026-04-15",
            status: "active",
            progress: 65,
            connectedAccount: "GTBank •••• 4582"
        },
        {
            id: 2,
            name: "New Laptop",
            targetAmount: 450000,
            frequency: "Weekly",
            nextDate: "2026-04-05",
            status: "active",
            progress: 28,
            connectedAccount: "Access Bank •••• 7391"
        },
        {
            id: 3,
            name: "Emergency Fund",
            targetAmount: 100000,
            frequency: "One-time",
            nextDate: "2026-04-10",
            status: "completed",
            progress: 100,
            connectedAccount: "Zenith Bank •••• 1123"
        }
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newPlan, setNewPlan] = useState({
        name: '',
        targetAmount: '',
        frequency: 'Monthly',
        startDate: '',
        connectedAccount: 'GTBank'
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

    const deletePlan = (id) => {
        setPlans(plans.filter(plan => plan.id !== id));
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">My Plans</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">Set automatic transfers and build discipline</p>
                </div>
                <Button
                    variant="primary"
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-3 px-8 py-3 text-lg"
                >
                    <Plus size={24} />
                    New Plan
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plans.length === 0 ? (
                    <Card className="col-span-full py-24 text-center">
                        <Target className="mx-auto text-slate-300 dark:text-slate-600" size={80} />
                        <p className="mt-6 text-xl text-slate-500 dark:text-slate-400">No plans yet</p>
                        <p className="text-slate-400 dark:text-slate-500 mt-2">Create your first automatic savings plan</p>
                    </Card>
                ) : (
                    plans.map((plan) => (
                        <Card key={plan.id} className="p-8 group">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900/60 text-primary rounded-3xl flex items-center justify-center">
                                        <Target size={32} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-2xl tracking-tight">{plan.name}</h3>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{plan.connectedAccount}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => deletePlan(plan.id)}
                                    className="text-red-400 hover:text-red-600 dark:hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={22} />
                                </button>
                            </div>

                            <div className="mt-10">
                                <div className="flex justify-between mb-3">
                                    <span className="text-slate-500 dark:text-slate-400">Target</span>
                                    <span className="font-semibold text-2xl">₦{plan.targetAmount.toLocaleString()}</span>
                                </div>

                                <div className="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden mb-8">
                                    <div
                                        className="h-full bg-primary rounded-full transition-all duration-300"
                                        style={{ width: `${plan.progress}%` }}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-8 text-sm">
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400">Frequency</p>
                                        <p className="font-medium flex items-center gap-2 mt-1">
                                            <Calendar size={18} /> {plan.frequency}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400">Next Transfer</p>
                                        <p className="font-medium mt-1">{format(new Date(plan.nextDate), 'dd MMM yyyy')}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                <span className={`px-5 py-2 text-xs font-semibold rounded-full ${plan.status === 'completed'
                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400'
                                    : 'bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-400'
                                    }`}>
                                    {plan.status.toUpperCase()}
                                </span>
                                <span className="text-slate-500 dark:text-slate-400">{plan.progress}% complete</span>
                            </div>
                        </Card>
                    ))
                )}
            </div>

            {/* Create Plan Modal - Premium */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-lg overflow-hidden">
                        <div className="p-10">
                            <h2 className="text-3xl font-semibold tracking-tight mb-8">Create New Plan</h2>

                            <form onSubmit={handleCreatePlan} className="space-y-8">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Plan Name</label>
                                    <input
                                        type="text"
                                        value={newPlan.name}
                                        onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                                        placeholder="e.g. Hostel Rent"
                                        className="w-full px-6 py-4 border border-slate-300 dark:border-slate-600 rounded-2xl focus:outline-none focus:border-primary bg-white dark:bg-slate-800"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Target Amount (₦)</label>
                                    <input
                                        type="number"
                                        value={newPlan.targetAmount}
                                        onChange={(e) => setNewPlan({ ...newPlan, targetAmount: e.target.value })}
                                        placeholder="150000"
                                        className="w-full px-6 py-4 border border-slate-300 dark:border-slate-600 rounded-2xl focus:outline-none focus:border-primary bg-white dark:bg-slate-800"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Frequency</label>
                                        <select
                                            value={newPlan.frequency}
                                            onChange={(e) => setNewPlan({ ...newPlan, frequency: e.target.value })}
                                            className="w-full px-6 py-4 border border-slate-300 dark:border-slate-600 rounded-2xl focus:outline-none focus:border-primary bg-white dark:bg-slate-800"
                                        >
                                            <option value="Daily">Daily</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="One-time">One-time</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Start Date</label>
                                        <input
                                            type="date"
                                            value={newPlan.startDate}
                                            onChange={(e) => setNewPlan({ ...newPlan, startDate: e.target.value })}
                                            className="w-full px-6 py-4 border border-slate-300 dark:border-slate-600 rounded-2xl focus:outline-none focus:border-primary bg-white dark:bg-slate-800"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">Bank Account</label>
                                    <select
                                        value={newPlan.connectedAccount}
                                        onChange={(e) => setNewPlan({ ...newPlan, connectedAccount: e.target.value })}
                                        className="w-full px-6 py-4 border border-slate-300 dark:border-slate-600 rounded-2xl focus:outline-none focus:border-primary bg-white dark:bg-slate-800"
                                    >
                                        <option value="GTBank">GTBank</option>
                                        <option value="Access Bank">Access Bank</option>
                                        <option value="Zenith Bank">Zenith Bank</option>
                                        <option value="UBA">UBA</option>
                                    </select>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1 py-4 text-lg"
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="flex-1 py-4 text-lg"
                                    >
                                        Create Plan
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}