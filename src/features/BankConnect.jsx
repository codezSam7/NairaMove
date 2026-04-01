import { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import { Banknote, CheckCircle, Shield, ArrowRight } from 'lucide-react';

export default function BankConnect() {
    const [connectedBanks, setConnectedBanks] = useState([
        {
            id: 1,
            bankName: "GTBank",
            accountNumber: "•••• 4582",
            accountName: "Samuel Okafor",
            status: "connected",
            balance: "₦248,750"
        },
        {
            id: 2,
            bankName: "Access Bank",
            accountNumber: "•••• 7391",
            accountName: "Samuel Okafor",
            status: "connected",
            balance: "₦87,320"
        }
    ]);

    const [isConnecting, setIsConnecting] = useState(false);
    const [selectedBank, setSelectedBank] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    const nigerianBanks = [
        "GTBank", "Access Bank", "Zenith Bank", "UBA",
        "First Bank", "Fidelity Bank", "Stanbic IBTC",
        "Sterling Bank", "Wema Bank", "Polaris Bank"
    ];

    const handleConnectBank = () => {
        if (!selectedBank) return;
        setIsConnecting(true);

        setTimeout(() => {
            const newBank = {
                id: Date.now(),
                bankName: selectedBank,
                accountNumber: "•••• " + Math.floor(1000 + Math.random() * 9000),
                accountName: "Samuel Okafor",
                status: "connected",
                balance: "₦" + Math.floor(Math.random() * 500000).toLocaleString()
            };

            setConnectedBanks([...connectedBanks, newBank]);
            setIsConnecting(false);
            setSelectedBank("");
            setShowSuccess(true);

            setTimeout(() => setShowSuccess(false), 4000);
        }, 1800);
    };

    const disconnectBank = (id) => {
        setConnectedBanks(connectedBanks.filter(bank => bank.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <div>
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white">Connect Bank</h1>
                <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                    Securely link your accounts to enable automatic transfers
                </p>
            </div>

            {/* Security Banner */}
            <Card className="p-8 bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900">
                <div className="flex gap-5">
                    <Shield className="text-emerald-600 dark:text-emerald-400 mt-1" size={36} />
                    <div>
                        <h3 className="font-semibold text-lg text-emerald-800 dark:text-emerald-300">Bank-Level Security</h3>
                        <p className="text-emerald-700 dark:text-emerald-400 mt-2">
                            Powered by Mono.co. We never store your login details or passwords.
                        </p>
                    </div>
                </div>
            </Card>

            {/* Connected Accounts */}
            <Card className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold tracking-tight">Connected Accounts</h2>
                    <span className="text-slate-500 dark:text-slate-400">{connectedBanks.length} account(s)</span>
                </div>

                {connectedBanks.length === 0 ? (
                    <div className="text-center py-20">
                        <Banknote className="mx-auto text-slate-300 dark:text-slate-600" size={80} />
                        <p className="mt-6 text-xl text-slate-500">No accounts connected yet</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {connectedBanks.map((bank) => (
                            <div key={bank.id} className="flex items-center justify-between p-7 border border-slate-100 dark:border-slate-700 rounded-3xl hover:border-sky-200 transition-all group">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-sky-600 text-white rounded-3xl flex items-center justify-center font-bold text-2xl">
                                        {bank.bankName.slice(0, 2)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-2xl tracking-tight">{bank.bankName}</p>
                                        <p className="text-slate-500 dark:text-slate-400">{bank.accountNumber}</p>
                                        <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">{bank.accountName}</p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold text-2xl">{bank.balance}</p>
                                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm mt-2">
                                        <CheckCircle size={18} />
                                        Connected
                                    </div>
                                </div>

                                <Button
                                    variant="outline"
                                    className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950 border-red-200"
                                    onClick={() => disconnectBank(bank.id)}
                                >
                                    Disconnect
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Connect New Bank */}
            <Card className="p-8">
                <h2 className="text-2xl font-semibold tracking-tight mb-8">Connect a New Bank Account</h2>

                <div className="space-y-8">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Select Bank</label>
                        <select
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            className="w-full px-6 py-5 border border-slate-300 dark:border-slate-600 rounded-3xl focus:outline-none focus:border-primary text-lg bg-white dark:bg-slate-800"
                        >
                            <option value="">Choose your bank...</option>
                            {nigerianBanks.map((bank) => (
                                <option key={bank} value={bank}>{bank}</option>
                            ))}
                        </select>
                    </div>

                    <Button
                        variant="primary"
                        className="w-full py-5 text-xl flex items-center justify-center gap-3"
                        onClick={handleConnectBank}
                        disabled={!selectedBank || isConnecting}
                    >
                        {isConnecting ? "Connecting securely..." : (
                            <>Connect {selectedBank || "Bank"} <ArrowRight size={26} /></>
                        )}
                    </Button>

                    <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Secure connection powered by Mono.co
                    </p>
                </div>
            </Card>

            {/* Success Toast */}
            {showSuccess && (
                <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 z-50">
                    <CheckCircle size={28} />
                    <div>
                        <p className="font-semibold">Bank Connected Successfully</p>
                        <p className="text-sm opacity-90">You can now create plans with this account</p>
                    </div>
                </div>
            )}
        </div>
    );
}