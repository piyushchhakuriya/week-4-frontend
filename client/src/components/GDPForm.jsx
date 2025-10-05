import React from 'react';
import { motion } from 'framer-motion';

export default function GDPForm({ form, setForm, onSubmit, submitting }) {
  function change(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          name="country"
          value={form.country}
          onChange={change}
          placeholder="Country"
          className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 transition duration-300"
          required
        />
        <input
          name="year"
          value={form.year}
          onChange={change}
          placeholder="Year"
          type="number"
          className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 transition duration-300"
          required
        />
        <input
          name="gdpValue"
          value={form.gdpValue}
          onChange={change}
          placeholder="GDP Value"
          type="number"
          className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 transition duration-300"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="currency"
          value={form.currency}
          onChange={change}
          placeholder="Currency"
          className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 transition duration-300"
        />
        <input
          name="notes"
          value={form.notes}
          onChange={change}
          placeholder="Notes"
          className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 transition duration-300"
        />
      </div>

      <div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={submitting}
          className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
        >
          {submitting ? 'Saving...' : 'Save'}
        </motion.button>
      </div>
    </motion.form>
  );
}
