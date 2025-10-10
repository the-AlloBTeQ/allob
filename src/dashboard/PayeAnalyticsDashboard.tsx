import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Calculator, Clock, AlertCircle, Eye, MousePointer, Activity } from 'lucide-react';

const PayeAnalyticsDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [realtimeData, setRealtimeData] = useState<RealtimeData | null>(null);
  const [salaryRangeData, setSalaryRangeData] = useState<SalaryRangeData[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_ANALYTICS_API_URL || 'http://localhost:3002';

  // Fetch dashboard data
  const fetchDashboardData = async (period = '7d') => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/analytics/dashboard?period=${period}`);
      const result = await response.json();
      
      if (result.success) {
        setDashboardData(result.data);
      } else {
        setError('Failed to fetch dashboard data');
      }
    } catch (err) {
      setError('Error connecting to analytics service');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch real-time data
  const fetchRealtimeData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/analytics/realtime`);
      const result = await response.json();
      
      if (result.success) {
        setRealtimeData(result.data);
      }
    } catch (err) {
      console.error('Realtime fetch error:', err);
    }
  };

  // Fetch salary range data
  const fetchSalaryRangeData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/analytics/salary-ranges`);
      const result = await response.json();
      
      if (result.success) {
        setSalaryRangeData(result.data);
      }
    } catch (err) {
      console.error('Salary range fetch error:', err);
    }
  };

  useEffect(() => {
    fetchDashboardData(selectedPeriod);
    fetchSalaryRangeData();
    
    // Set up real-time updates
    const realtimeInterval = setInterval(fetchRealtimeData, 30000); // Every 30 seconds
    fetchRealtimeData(); // Initial fetch
    
    return () => clearInterval(realtimeInterval);
  }, [selectedPeriod]);

interface DashboardSummary {
    totalCalculations: number;
    uniqueUsers: number;
    totalPageViews: number;
    averageTimeOnPage: number;
    errorRate: number;
}

interface DailyTrendEvent {
    _id: string;
    events: { count: number }[];
}

interface PopularTime {
    _id: number;
    count: number;
}

interface TopSalaryRange {
    _id: string;
    count: number;
}

interface DashboardData {
    summary: DashboardSummary;
    dailyTrend: DailyTrendEvent[];
    popularTimes: PopularTime[];
    topSalaryRanges: TopSalaryRange[];
}

interface RealtimeEvent {
    eventType: string;
    eventAction: string;
    calculatorInputs?: {
        annualSalary?: number;
    };
    timestamp: string;
    country?: string;
}

interface RealtimeData {
    activeUsers: number;
    recentCalculations: number;
    timestamp: string;
    recentEvents: RealtimeEvent[];
}

interface SalaryRangeData {
    _id: string;
    count: number;
    averageSalary: number;
    averageTax?: number;
    [key: string]: string | number | undefined;
}

const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
};

interface FormatNumber {
    (num: number | undefined): string;
}

const formatNumber: FormatNumber = (num) => {
    if (num === undefined) return '';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
};

interface FormatCurrency {
    (amount: number | undefined): string;
}

const formatCurrency: FormatCurrency = (amount) => {
    return `R ${amount?.toLocaleString()}`;
};

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC0CB'];

  if (loading && !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analytics Unavailable</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => fetchDashboardData(selectedPeriod)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">PAYE Calculator Analytics</h1>
          
          {/* Period Selector */}
          <div className="flex space-x-2">
            {['24h', '7d', '30d', '90d'].map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodChange(period)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  selectedPeriod === period
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {period === '24h' ? '24 Hours' : 
                 period === '7d' ? '7 Days' : 
                 period === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>

        {/* Real-time Stats */}
        {realtimeData && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-500" />
              Real-time Activity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Users className="w-8 h-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Active Users (5 min)</p>
                    <p className="text-2xl font-bold">{realtimeData.activeUsers}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Calculator className="w-8 h-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Calculations (1 hour)</p>
                    <p className="text-2xl font-bold">{realtimeData.recentCalculations}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 text-orange-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="text-lg font-semibold">
                      {new Date(realtimeData.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center">
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">Trend</p>
                    <p className="text-lg font-semibold text-green-600">
                      {realtimeData.recentCalculations > 10 ? '↗️ High' : 
                       realtimeData.recentCalculations > 5 ? '→ Normal' : '↘️ Low'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        {dashboardData && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Calculations</p>
                  <p className="text-2xl font-bold">{formatNumber(dashboardData.summary.totalCalculations)}</p>
                </div>
                <Calculator className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unique Users</p>
                  <p className="text-2xl font-bold">{formatNumber(dashboardData.summary.uniqueUsers)}</p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Page Views</p>
                  <p className="text-2xl font-bold">{formatNumber(dashboardData.summary.totalPageViews)}</p>
                </div>
                <Eye className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Time on Page</p>
                  <p className="text-2xl font-bold">{Math.round(dashboardData.summary.averageTimeOnPage)}s</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Error Rate</p>
                  <p className="text-2xl font-bold">{dashboardData.summary.errorRate}%</p>
                </div>
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
            </div>
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Trend Chart */}
          {dashboardData?.dailyTrend && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Daily Activity Trend</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dashboardData.dailyTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="events.0.count" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Calculations"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Popular Hours Chart */}
          {dashboardData?.popularTimes && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Popular Calculation Hours</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dashboardData.popularTimes as PopularTime[]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="_id"
                      tickFormatter={(hour: number) => `${hour}:00`}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(hour: number) => `${hour}:00 - ${hour + 1}:00`}
                    />
                    <Bar dataKey="count" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>

        {/* Salary Ranges and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Salary Range Distribution */}
          {salaryRangeData.length > 0 && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Salary Range Distribution</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={salaryRangeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="count"
                      label={(props) => {
                        const { _id, percent } = props as any;
                        return `${_id} (${(percent * 100).toFixed(0)}%)`;
                      }}
                    >
                      {salaryRangeData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Top Salary Ranges Table */}
          {dashboardData?.topSalaryRanges && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Popular Salary Ranges</h3>
              <div className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Range</th>
                      <th className="text-right py-2">Calculations</th>
                      <th className="text-right py-2">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData.topSalaryRanges.slice(0, 8).map((range, index) => (
                      <tr key={range._id} className="border-b">
                        <td className="py-2">{range._id}</td>
                        <td className="text-right py-2">{range.count}</td>
                        <td className="text-right py-2">
                          {((range.count / dashboardData.summary.totalCalculations) * 100).toFixed(1)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {realtimeData?.recentEvents && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {realtimeData.recentEvents.slice(0, 10).map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      event.eventType === 'calculation' ? 'bg-blue-500' :
                      event.eventType === 'page_view' ? 'bg-green-500' :
                      event.eventType === 'button_click' ? 'bg-orange-500' :
                      'bg-gray-500'
                    }`}></div>
                    <div>
                      <p className="font-medium capitalize">
                        {event.eventAction.replace('_', ' ')}
                      </p>
                      {event.calculatorInputs?.annualSalary && (
                        <p className="text-sm text-gray-600">
                          Salary: {formatCurrency(event.calculatorInputs.annualSalary)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </p>
                    {event.country && (
                      <p className="text-xs text-gray-400">{event.country}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Detailed Salary Analytics */}
        {salaryRangeData.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Detailed Salary Analytics</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Salary Range</th>
                    <th className="text-right py-2">Calculations</th>
                    <th className="text-right py-2">Avg Salary</th>
                    <th className="text-right py-2">Avg Tax</th>
                    <th className="text-right py-2">Effective Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {salaryRangeData.map((range) => (
                    <tr key={range._id} className="border-b">
                      <td className="py-3">{range._id}</td>
                      <td className="text-right py-3">{range.count}</td>
                      <td className="text-right py-3">
                        {formatCurrency(Math.round(range.averageSalary))}
                      </td>
                      <td className="text-right py-3">
                        {formatCurrency(Math.round(range.averageTax || 0))}
                      </td>
                      <td className="text-right py-3">
                        {range.averageSalary && range.averageTax ? 
                          ((range.averageTax / range.averageSalary) * 100).toFixed(1) + '%' : 
                          'N/A'
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayeAnalyticsDashboard;