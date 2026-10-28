import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ComposedChart
} from 'recharts';
import { useSchool } from '../../context/SchoolContext';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  CheckCircle2,
  Filter,
  ArrowUpRight
} from 'lucide-react';

interface FeeTrendsChartProps {
  className?: string;
}

export const FeeTrendsChart: React.FC<FeeTrendsChartProps> = ({ className = '' }) => {
  const { payments, students } = useSchool();
  const [selectedView, setSelectedView] = useState<'all' | 'term1' | 'term2' | 'term3'>('all');

  // Calculate monthly aggregation from recorded payments + academic year baseline
  const monthlyData = useMemo(() => {
    // 2026 Academic Year base targets and collections (in KES)
    const baseMonths = [
      { month: 'Jan', fullName: 'January', term: 'Term 1', baseline: 1450000, target: 1600000, monthNum: '01' },
      { month: 'Feb', fullName: 'February', term: 'Term 1', baseline: 820000, target: 900000, monthNum: '02' },
      { month: 'Mar', fullName: 'March', term: 'Term 1', baseline: 460000, target: 500000, monthNum: '03' },
      { month: 'Apr', fullName: 'April', term: 'Term 1', baseline: 210000, target: 250000, monthNum: '04' },
      { month: 'May', fullName: 'May', term: 'Term 2', baseline: 1680000, target: 1800000, monthNum: '05' },
      { month: 'Jun', fullName: 'June', term: 'Term 2', baseline: 790000, target: 850000, monthNum: '06' },
      { month: 'Jul', fullName: 'July', term: 'Term 2', baseline: 420000, target: 450000, monthNum: '07' },
      { month: 'Aug', fullName: 'August', term: 'Term 2', baseline: 250000, target: 300000, monthNum: '08' },
      { month: 'Sep', fullName: 'September', term: 'Term 3', baseline: 1850000, target: 1950000, monthNum: '09' },
      { month: 'Oct', fullName: 'October', term: 'Term 3', baseline: 640000, target: 800000, monthNum: '10' },
      { month: 'Nov', fullName: 'November', term: 'Term 3', baseline: 280000, target: 400000, monthNum: '11' },
      { month: 'Dec', fullName: 'December', term: 'Term 3', baseline: 120000, target: 200000, monthNum: '12' },
    ];

    // Calculate dynamic additional collections from payments state
    return baseMonths.map(m => {
      // Sum any payments made in this month of 2026
      const monthPayments = payments.filter(p => {
        if (!p.date) return false;
        const [year, month] = p.date.split('-');
        return year === '2026' && month === m.monthNum;
      });

      const dynamicAmount = monthPayments.reduce((sum, p) => sum + p.amount, 0);
      const totalRevenue = m.baseline + dynamicAmount;

      return {
        month: m.month,
        fullName: m.fullName,
        term: m.term,
        revenue: totalRevenue,
        target: m.target,
        variance: totalRevenue - m.target
      };
    });
  }, [payments]);

  // Filter based on selected term
  const displayData = useMemo(() => {
    if (selectedView === 'term1') {
      return monthlyData.filter(d => d.term === 'Term 1');
    }
    if (selectedView === 'term2') {
      return monthlyData.filter(d => d.term === 'Term 2');
    }
    if (selectedView === 'term3') {
      return monthlyData.filter(d => d.term === 'Term 3');
    }
    return monthlyData;
  }, [monthlyData, selectedView]);

  // Totals for the current view
  const currentTotalRevenue = displayData.reduce((sum, d) => sum + d.revenue, 0);
  const currentTotalTarget = displayData.reduce((sum, d) => sum + d.target, 0);
  const targetAchieved = currentTotalTarget > 0 ? Math.round((currentTotalRevenue / currentTotalTarget) * 100) : 0;
  const highestMonth = [...displayData].sort((a, b) => b.revenue - a.revenue)[0];

  const formatCurrency = (val: number) => {
    if (val >= 1000000) {
      return `KES ${(val / 1000000).toFixed(2)}M`;
    }
    if (val >= 1000) {
      return `KES ${(val / 1000).toFixed(0)}k`;
    }
    return `KES ${val.toLocaleString()}`;
  };

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const revenue = payload.find((p: any) => p.dataKey === 'revenue')?.value || 0;
      const target = payload.find((p: any) => p.dataKey === 'target')?.value || 0;
      const dataPoint = payload[0]?.payload;

      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs space-y-1.5 z-50">
          <div className="font-bold text-amber-400 border-b border-slate-700 pb-1 flex justify-between gap-4">
            <span>{dataPoint?.fullName || label} (2026)</span>
            <span className="text-[10px] text-slate-400">{dataPoint?.term}</span>
          </div>
          <div className="flex justify-between gap-4 text-emerald-400">
            <span>Revenue Collected:</span>
            <span className="font-mono font-bold">KES {revenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4 text-slate-300">
            <span>Target Budget:</span>
            <span className="font-mono">KES {target.toLocaleString()}</span>
          </div>
          <div className="flex justify-between gap-4 text-[11px] pt-1 border-t border-slate-800">
            <span className="text-slate-400">Target Efficiency:</span>
            <span className={`font-bold ${revenue >= target ? 'text-emerald-400' : 'text-amber-400'}`}>
              {Math.round((revenue / target) * 100)}%
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6 ${className}`}>
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>Academic Year 2026 Financial Velocity</span>
          </div>
          <h3 className="text-xl font-serif font-bold text-slate-900">
            Fee Payment & Monthly Revenue Trends
          </h3>
          <p className="text-xs text-slate-500">
            Monthly collections versus targeted institutional revenue projections across all terms.
          </p>
        </div>

        {/* Term Switcher Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {[
            { id: 'all', label: 'Full Year' },
            { id: 'term1', label: 'Term 1' },
            { id: 'term2', label: 'Term 2' },
            { id: 'term3', label: 'Term 3' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id as any)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                selectedView === tab.id
                  ? 'bg-blue-950 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-950'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Performance Summary Pill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
          <div className="text-[11px] text-slate-500 font-semibold mb-0.5">Total Revenue in Period</div>
          <div className="text-xl font-black text-blue-950 font-mono">
            {formatCurrency(currentTotalRevenue)}
          </div>
          <div className="text-[10px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>{targetAchieved}% of Institutional Target</span>
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
          <div className="text-[11px] text-slate-500 font-semibold mb-0.5">Target Budget</div>
          <div className="text-xl font-black text-slate-700 font-mono">
            {formatCurrency(currentTotalTarget)}
          </div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5">
            Operational & Capital Budget
          </div>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
          <div className="text-[11px] text-slate-500 font-semibold mb-0.5">Peak Intake Month</div>
          <div className="text-xl font-black text-emerald-700 font-serif">
            {highestMonth ? `${highestMonth.fullName}` : 'September'}
          </div>
          <div className="text-[10px] text-slate-500 font-medium mt-0.5 font-mono">
            {highestMonth ? formatCurrency(highestMonth.revenue) : 'KES 1.85M'} collected
          </div>
        </div>
      </div>

      {/* Line Chart Container */}
      <div className="w-full h-80 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={displayData}
            margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 600 }}
            />

            <YAxis
              tickLine={false}
              axisLine={{ stroke: '#cbd5e1' }}
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickFormatter={(val) => `${(val / 1000000).toFixed(1)}M`}
              domain={[0, 'auto']}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: '16px', fontSize: '12px', fontWeight: 600 }}
            />

            {/* Area Fill for Visual Depth */}
            <Area
              type="monotone"
              dataKey="revenue"
              fill="url(#revenueGradient)"
              stroke="none"
              legendType="none"
            />

            {/* Target Line */}
            <Line
              type="monotone"
              dataKey="target"
              name="Target Revenue"
              stroke="#94a3b8"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />

            {/* Actual Collected Revenue Line */}
            <Line
              type="monotone"
              dataKey="revenue"
              name="Collected Revenue (KES)"
              stroke="#0f2b5c"
              strokeWidth={3.5}
              activeDot={{ r: 8, fill: '#f59e0b', stroke: '#0f2b5c', strokeWidth: 2 }}
              dot={{ r: 4, fill: '#059669', strokeWidth: 1.5, stroke: '#ffffff' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Highlights */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
          <span>Actual Fee Collections via M-Pesa, Bank Wire & Cash</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
          <span>Dashed Grey Line: Annual Operational Target Budget</span>
        </div>
      </div>
    </div>
  );
};
