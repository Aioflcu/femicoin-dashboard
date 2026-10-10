import { useWallet } from '@/contexts/WalletContext';
import { Eye, EyeOff, TrendingUp, Sparkles, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#8B5CF6', '#EC4899', '#06B6D4'];

const WalletOverview = () => {
  const { balances, totalBalance } = useWallet();
  const [showBalance, setShowBalance] = useState(true);
  const [hoveredCoin, setHoveredCoin] = useState<string | null>(null);
  const navigate = useNavigate();

  const chartData = balances.map((b, i) => ({
    name: b.symbol,
    value: b.usdValue,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden group"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-warning/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Sparkle effect */}
      <motion.div
        className="absolute top-4 right-4 text-primary/20"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <Sparkles className="w-8 h-8" />
      </motion.div>
      
      <div className="flex flex-col lg:flex-row gap-6 relative z-10">
        {/* Balance Section */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-sm font-medium text-muted-foreground">Total Portfolio Balance</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowBalance(!showBalance)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </motion.button>
          </div>
          
          <div className="flex items-baseline gap-3 mb-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={showBalance ? 'visible' : 'hidden'}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="text-4xl font-display font-bold"
              >
                {showBalance ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
              </motion.span>
            </AnimatePresence>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-1 text-success text-sm font-medium bg-success/10 px-2 py-1 rounded-full"
            >
              <TrendingUp className="w-4 h-4" />
              +5.23%
            </motion.span>
          </div>

          {/* Portfolio List */}
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
            {balances.map((balance, index) => (
              <motion.div
                key={balance.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCoin(balance.symbol)}
                onMouseLeave={() => setHoveredCoin(null)}
                onClick={() => navigate(`/coin/${balance.symbol.toLowerCase()}`)}
                className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                  hoveredCoin === balance.symbol
                    ? 'bg-primary/10 scale-[1.02] shadow-lg'
                    : 'bg-secondary/50 hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <motion.img
                    src={balance.image}
                    alt={balance.coin}
                    className="w-10 h-10 rounded-full"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div>
                    <p className="font-medium flex items-center gap-1">
                      {balance.coin}
                      {hoveredCoin === balance.symbol && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <ArrowUpRight className="w-3 h-3 text-primary" />
                        </motion.span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">{balance.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    {showBalance ? balance.amount.toLocaleString('en-US', { maximumFractionDigits: 4 }) : '••••'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {showBalance ? `$${balance.usdValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chart Section */}
        <div className="lg:w-64">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Distribution</h3>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="h-48"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  animationDuration={1000}
                  animationBegin={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      className="transition-all duration-300 hover:opacity-80"
                      style={{
                        filter: hoveredCoin === entry.name ? 'brightness(1.2)' : 'none',
                        transform: hoveredCoin === entry.name ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: 'center',
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-popover/95 backdrop-blur-xl border border-border rounded-lg px-3 py-2 shadow-2xl"
                        >
                          <p className="font-medium">{payload[0].name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${Number(payload[0].value).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </p>
                        </motion.div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {chartData.slice(0, 4).map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onMouseEnter={() => setHoveredCoin(item.name)}
                onMouseLeave={() => setHoveredCoin(null)}
                className={`flex items-center gap-2 p-1.5 rounded-lg cursor-pointer transition-all ${
                  hoveredCoin === item.name ? 'bg-secondary' : ''
                }`}
              >
                <motion.div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                  whileHover={{ scale: 1.3 }}
                />
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WalletOverview;
