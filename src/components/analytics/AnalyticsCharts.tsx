import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const data = [
  { name: 'Mon', completed: 12, pending: 8 },
  { name: 'Tue', completed: 18, pending: 12 },
  { name: 'Wed', completed: 15, pending: 5 },
  { name: 'Thu', completed: 22, pending: 10 },
  { name: 'Fri', completed: 30, pending: 4 },
  { name: 'Sat', completed: 10, pending: 2 },
  { name: 'Sun', completed: 5, pending: 1 },
];

const pieData = [
  { name: 'Strategy', value: 400 },
  { name: 'Design', value: 300 },
  { name: 'Systems', value: 300 },
  { name: 'Marketing', value: 200 },
];

const COLORS = ['#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];

export const ProductivityChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
          <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
      <XAxis 
        dataKey="name" 
        axisLine={false} 
        tickLine={false} 
        tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }}
        dy={10}
      />
      <YAxis 
        axisLine={false} 
        tickLine={false} 
        tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }}
      />
      <Tooltip 
        contentStyle={{ 
          backgroundColor: '#1E293B', 
          borderRadius: '0.75rem', 
          border: '1px solid rgba(255,255,255,0.1)', 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', 
          fontSize: '12px',
          color: '#F8FAFC'
        }}
        itemStyle={{ color: '#F8FAFC' }}
      />
      <Area type="monotone" dataKey="completed" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorComp)" />
    </AreaChart>
  </ResponsiveContainer>
);

export const ComparisonChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
      <XAxis 
        dataKey="name" 
        axisLine={false} 
        tickLine={false} 
        tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }}
        dy={10}
      />
      <YAxis 
        axisLine={false} 
        tickLine={false} 
        tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }}
      />
      <Tooltip 
        cursor={{ fill: 'rgba(255,255,255,0.03)' }}
        contentStyle={{ 
          backgroundColor: '#1E293B', 
          borderRadius: '0.75rem', 
          border: '1px solid rgba(255,255,255,0.1)', 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', 
          fontSize: '12px'
        }}
        itemStyle={{ color: '#F8FAFC' }}
      />
      <Bar dataKey="completed" fill="#10B981" radius={[4, 4, 0, 0]} barSize={16} />
      <Bar dataKey="pending" fill="rgba(16, 185, 129, 0.2)" radius={[4, 4, 0, 0]} barSize={16} />
    </BarChart>
  </ResponsiveContainer>
);

export const DistributionChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={pieData}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={8}
        dataKey="value"
        stroke="none"
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip 
        contentStyle={{ 
          backgroundColor: '#1E293B', 
          borderRadius: '0.75rem', 
          border: '1px solid rgba(255,255,255,0.1)', 
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', 
          fontSize: '12px'
        }}
        itemStyle={{ color: '#F8FAFC' }}
      />
    </PieChart>
  </ResponsiveContainer>
);
