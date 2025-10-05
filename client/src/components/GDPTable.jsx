import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function GDPTable({ records = [], onDelete }) {
  return (
    <motion.div
      className="overflow-x-auto rounded-2xl shadow-lg bg-white dark:bg-gray-900 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Country</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Year</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">GDP</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Currency</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Notes</th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {records.map(r => (
            <motion.tr
              key={r._id}
              className="hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.01 }}
            >
              <td className="px-4 py-3">{r.country}</td>
              <td className="px-4 py-3">{r.year}</td>
              <td className="px-4 py-3 font-mono text-indigo-600 dark:text-indigo-400">
                {Number(r.gdpValue).toLocaleString()}
              </td>
              <td className="px-4 py-3">{r.currency}</td>
              <td className="px-4 py-3">{r.notes || '-'}</td>
              <td className="px-4 py-3 space-x-2 flex">
                <Link
                  to={`/edit/${r._id}`}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow hover:opacity-90 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(r._id)}
                  className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow hover:opacity-90 transition"
                >
                  Delete
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
