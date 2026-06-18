import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'

const queryClient = new QueryClient()

const generateData = (points: number) =>
  Array.from({ length: points }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    revenue: Math.floor(Math.random() * 50000) + 20000,
    users: Math.floor(Math.random() * 1000) + 500,
    requests: Math.floor(Math.random() * 5000) + 2000,
    errors: Math.floor(Math.random() * 50),
  }))

function DataPulseDashboard() {
  const [data, setData] = useState(generateData(24))
  const [liveMetric, setLiveMetric] = useState({
    activeUsers: 1247,
    requestsPerSec: 342,
    errorRate: 0.02,
    avgResponseMs: 89
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetric(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
        requestsPerSec: prev.requestsPerSec + Math.floor(Math.random() * 30 - 15),
        errorRate: Math.max(0, prev.errorRate + (Math.random() * 0.01 - 0.005)),
        avgResponseMs: Math.max(10, prev.avgResponseMs + Math.floor(Math.random() * 20 - 10))
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">DataPulse</h1>
            <p className="text-gray-400 mt-1">Real-time analytics dashboard</p>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live — updating every 2s
          </div>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Users', value: liveMetric.activeUsers.toLocaleString(), color: 'text-blue-400', change: '+2.4%' },
            { label: 'Requests/sec', value: liveMetric.requestsPerSec.toLocaleString(), color: 'text-violet-400', change: '+5.1%' },
            { label: 'Error Rate', value: `${(liveMetric.errorRate * 100).toFixed(2)}%`, color: 'text-rose-400', change: '-0.3%' },
            { label: 'Avg Response', value: `${liveMetric.avgResponseMs}ms`, color: 'text-emerald-400', change: '-12ms' },
          ].map((m, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <p className="text-gray-400 text-xs mb-2">{m.label}</p>
              <p className={`text-3xl font-bold mb-1 ${m.color}`}>{m.value}</p>
              <p className="text-gray-500 text-xs">{m.change} vs yesterday</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="font-semibold mb-6">Revenue (24h)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="time" stroke="#4b5563" tick={{ fontSize: 11 }} />
                <YAxis stroke="#4b5563" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="revenue" stroke="#7c3aed" fill="url(#revenue)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="font-semibold mb-6">Active Users (24h)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="time" stroke="#4b5563" tick={{ fontSize: 11 }} />
                <YAxis stroke="#4b5563" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-semibold mb-6">API Requests vs Errors (24h)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
              <XAxis dataKey="time" stroke="#4b5563" tick={{ fontSize: 11 }} />
              <YAxis stroke="#4b5563" tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '8px' }} />
              <Bar dataKey="requests" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="errors" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataPulseDashboard />
    </QueryClientProvider>
  )
}