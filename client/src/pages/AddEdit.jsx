import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GDPForm from '../components/GDPForm';
import { motion } from 'framer-motion';

const API = '/api';

export default function AddEdit() {
  const [form, setForm] = useState({
    country: '',
    year: new Date().getFullYear(),
    gdpValue: '',
    currency: 'USD',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const { id } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    if (id) load();
  }, [id]);

  async function load() {
    const res = await fetch(`${API}/gdp/${id}`);
    const data = await res.json();
    setForm({
      country: data.country,
      year: data.year,
      gdpValue: data.gdpValue,
      currency: data.currency,
      notes: data.notes || '',
    });
  }

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    const payload = { ...form, year: Number(form.year), gdpValue: Number(form.gdpValue) };
    if (id) {
      await fetch(`${API}/gdp/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(`${API}/gdp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    setSubmitting(false);
    nav('/');
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          {id ? 'Edit Record' : 'Add New Record'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {id ? 'Update the GDP details for this country' : 'Fill out the form to add a new record'}
        </p>
      </div>

      <GDPForm form={form} setForm={setForm} onSubmit={submit} submitting={submitting} />

      <div className="mt-4 text-center">
        <motion.button
          type="submit"
          onClick={submit}
          disabled={submitting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Saving...' : id ? 'Update Record' : 'Add Record'}
        </motion.button>
      </div>
    </motion.div>
  );
}
