import React, { useEffect, useState } from 'react';
import GDPTable from '../components/GDPTable';
import { motion } from 'framer-motion';

const API = '/api';

export default function Dashboard() {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []); // fetch on mount

  async function fetchRecords() {
    setLoading(true);
    try {
      const url = filter
        ? `${API}/gdp?country=${encodeURIComponent(filter)}`
        : `${API}/gdp`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setRecords([]); // fallback to empty
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete record?')) return;
    try {
      await fetch(`${API}/gdp/${id}`, { method: 'DELETE' });
      fetchRecords();
    } catch (err) {
      console.error('Delete error:', err);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Filter Section */}
      <div className="flex gap-3 max-w-2xl mx-auto">
        <input
          className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
          placeholder="Filter by country"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button
          onClick={fetchRecords}
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-200"
        >
          Search
        </button>
      </div>

      {/* Records Table Card */}
      <motion.div
        className="max-w-5xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.01 }}
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          GDP Records
        </h2>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading...
          </p>
        ) : (
          <GDPTable records={records} onDelete={handleDelete} />
        )}
      </motion.div>
    </motion.div>
  );
}
