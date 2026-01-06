import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useWallet } from '@/contexts/WalletContext';
import { TrendingUp, TrendingDown, Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type TimeRange = '24h' | '7d' | '30d' | '90d' | '1y' | 'all';

interface ChartDataPoint {
  date: string;
  value: number;
  timestamp: number;
}

const timeRanges: { label: string; value: TimeRange }[] = [
  { label: '24H', value: '24h' },
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: '90D', value: '90d' },
  { label: '1Y', value: '1y' },
  { label: 'All', value: 'all' },
];

// Generate realistic-looking historical data
const generateHistoricalData = (totalBalance: number, range: TimeRange): ChartDataPoint[] => {
  const now = Date.now();
  let points: number;
  let interval: number;
  
  switch (range) {
    case '24h':
      points = 24;
      interval = 3600000; // 1 hour
      break;
    case '7d':
      points = 7 * 24;
      interval = 3600000;
      break;
    case '30d':
      points = 30;
      interval = 86400000; // 1 day
      break;
    case '90d':
      points = 90;
      interval = 86400000;
      break;
    case '1y':
      points = 365;
      interval = 86400000;
      break;
    case 'all':
      points = 730; // 2 years
      interval = 86400000;
      break;
    default:
      points = 30;
      interval = 86400000;
  }

  const data: ChartDataPoint[] = [];
  let currentValue = totalBalance * 0.4; // Start from 40% of current value
  const targetGrowth = totalBalance / currentValue;
  const growthPerPoint = Math.pow(targetGrowth, 1 / points);
  
  for (let i = 0; i < points; i++) {
    const timestamp = now - (points - i - 1) * interval;
    const date = new Date(timestamp);
    
    // Add some realistic volatility
    const volatility = 0.03; // 3% volatility
    const noise = (Math.random() - 0.5) * 2 * volatility;
    const trendNoise = Math.sin(i / 10) * 0.02; // Cyclical patterns
    
    currentValue = currentValue * growthPerPoint * (1 + noise + trendNoise);
    
    let dateLabel: string;
    if (range === '24h') {
      dateLabel = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    } else if (range === '7d') {
      dateLabel = date.toLocaleDateString('en-US', { weekday: 'short', hour: '2-digit' });
    } else {
      dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    
    data.push({
      date: dateLabel,
      value: Math.max(0, currentValue),
      timestamp,
    });
  }
  
  // Ensure last point is the actual balance
  if (data.length > 0) {
    data[data.length - 1].value = totalBalance;
  }
  
  return data;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-popover/95 backdrop-blur-xl border border-border rounded-xl px-4 py-3 shadow-2xl"
      >
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-lg font-display font-bold text-gradient">
          ${Number(payload[0].value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
      </motion.div>
    );
  }
  return null;
};

const PortfolioChart = () => {
  const { totalBalance } = useWallet();
  const [selectedRange, setSelectedRange] = useState<TimeRange>('30d');
  const [isAnimating, setIsAnimating] = useState(true);
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  
  const chartData = useMemo(() => 
    generateHistoricalData(totalBalance, selectedRange),
    [totalBalance, selectedRange]
  );
  
  const startValue = chartData[0]?.value || 0;
  const endValue = chartData[chartData.length - 1]?.value || totalBalance;
  const percentChange = startValue > 0 ? ((endValue - startValue) / startValue) * 100 : 0;
  const absoluteChange = endValue - startValue;
  const isPositive = percentChange >= 0;
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1500);
    return () => clearTimeout(timer);
  }, [selectedRange]);

  const displayValue = hoveredValue ?? endValue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-2xl p-6 relative overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: isPositive 
            ? 'radial-gradient(ellipse at 50% 100%, hsl(var(--success) / 0.2) 0%, transparent 60%)'
            : 'radial-gradient(ellipse at 50% 100%, hsl(var(--destructive) / 0.2) 0%, transparent 60%)',
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Portfolio Performance
            </h2>
            <motion.div
              key={displayValue}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-baseline gap-3"
            >
              <span className="text-3xl sm:text-4xl font-display font-bold">
                ${displayValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className={`flex items-center gap-2 mt-2 ${isPositive ? 'text-success' : 'text-destructive'}`}
            >
              {isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-medium">
                {isPositive ? '+' : ''}{percentChange.toFixed(2)}%
              </span>
              <span className="text-muted-foreground text-sm">
                ({isPositive ? '+' : ''}${Math.abs(absoluteChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
              </span>
            </motion.div>
          </div>
          
          {/* Time Range Selector - Desktop */}
          <div className="hidden sm:flex gap-1 bg-secondary/50 rounded-xl p-1">
            {timeRanges.map((range) => (
              <motion.button
                key={range.value}
                onClick={() => setSelectedRange(range.value)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  selectedRange === range.value
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {range.label}
              </motion.button>
            ))}
          </div>
          
          {/* Time Range Selector - Mobile */}
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  {timeRanges.find(r => r.value === selectedRange)?.label}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {timeRanges.map((range) => (
                  <DropdownMenuItem
                    key={range.value}
                    onClick={() => setSelectedRange(range.value)}
                    className={selectedRange === range.value ? 'bg-secondary' : ''}
                  >
                    {range.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Chart */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedRange}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-64 sm:h-72"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                onMouseMove={(e: any) => {
                  if (e.activePayload?.[0]?.value) {
                    setHoveredValue(e.activePayload[0].value);
                  }
                }}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
                      stopOpacity={0.4}
                    />
                    <stop
                      offset="100%"
                      stopColor={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor={isPositive ? 'hsl(var(--success))' : 'hsl(var(--destructive))'} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
                  tickMargin={8}
                  interval="preserveStartEnd"
                />
                <YAxis
                  hide
                  domain={['dataMin * 0.95', 'dataMax * 1.05']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="url(#lineGradient)"
                  strokeWidth={2.5}
                  fill="url(#portfolioGradient)"
                  animationDuration={isAnimating ? 1500 : 0}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
        
        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border/50"
        >
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Starting Value</p>
            <p className="font-display font-semibold">
              ${startValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Highest</p>
            <p className="font-display font-semibold text-success">
              ${Math.max(...chartData.map(d => d.value)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Lowest</p>
            <p className="font-display font-semibold text-destructive">
              ${Math.min(...chartData.map(d => d.value)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PortfolioChart;
