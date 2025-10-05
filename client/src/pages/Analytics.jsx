import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip, // hover karte hi data ka pop-up dikhega
  ResponsiveContainer, // chart automatically parent container ke size ke according adjust ho jaye
  CartesianGrid,
} from 'recharts';
import { motion } from 'framer-motion';

const API = '/api';

export default function Analytics() {
  const [records, setRecords] = useState([]);
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch(`${API}/gdp?limit=1000`);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setRecords(data);
      if (data.length) setCountry(data[0].country);
    } catch (err) {
      console.error('Fetch error:', err);
      setRecords([]);
      setCountry('');
    } finally {
      setLoading(false);
    }
  }

  const series = {};
  records
    .filter((r) => r.country === country)
    .forEach((r) => {
      series[r.year] = (series[r.year] || 0) + r.gdpValue;
    });

  const chartData = Object.keys(series)
    .sort()
    .map((k) => ({ year: k, value: series[k] }));

  const countries = Array.from(new Set(records.map((r) => r.country)));

  if (loading)
    return (
      <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
        Loading...
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 hover:scale-[1.01] transition-transform duration-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Analytics
          </h2>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm hover:shadow-md transition-all"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {chartData.length ? (
          <motion.div
            className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-inner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="year"
                  stroke="#4b5563"
                  tick={{ fill: '#4b5563' }}
                />
                <YAxis stroke="#4b5563" tick={{ fill: '#4b5563' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f9fafb',
                    borderRadius: '0.5rem',
                    border: 'none',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="url(#gradient)"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#6366f1', stroke: '#6366f1' }}
                  activeDot={{ r: 6 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No data available for {country}
          </p>
        )}
      </div>
    </motion.div>
  );
}
