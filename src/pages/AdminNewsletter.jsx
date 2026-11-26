import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, RefreshCw, Download, Users, Mail, Loader2, LogOut, AlertCircle } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminNewsletter = () => {
  const [key, setKey] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchSubscribers = async (e) => {
    if (e) e.preventDefault();
    if (!key.trim()) {
      setError('Enter the admin key');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/newsletter`, {
        headers: { 'x-admin-api-key': key.trim() },
      });

      if (res.status === 401) {
        setError('Invalid key. Check your ADMIN_API_KEY.');
        setLoading(false);
        return;
      }

      if (!res.ok) throw new Error('Request failed');

      const json = await res.json();
      setData(json);
      sessionStorage.setItem('admin_key', key.trim());
    } catch {
      setError('Could not fetch subscribers. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('admin_key');
    setKey('');
    setData(null);
    setError('');
  };

  const exportCSV = () => {
    if (!data?.data) return;
    const rows = [['Email', 'Subscribed At']];
    data.data.forEach((s) => {
      rows.push([s.email, new Date(s.createdAt).toLocaleString()]);
    });
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Login screen
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="w-12 h-12 bg-geofoam-highlight/10 rounded-xl flex items-center justify-center mb-4">
            <Lock className="text-geofoam-highlight" size={24} />
          </div>
          <h1 className="text-2xl font-bold mb-1">Admin Access</h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your admin key to view newsletter subscribers.
          </p>

          <form onSubmit={fetchSubscribers}>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Admin API key"
              className="w-full border border-gray-200 rounded-xl p-3.5 mb-3 focus:ring-2 focus:ring-geofoam-highlight focus:border-transparent outline-none"
              autoFocus
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Lock size={18} />}
              {loading ? 'Verifying...' : 'Unlock'}
            </button>
          </form>

          {error && (
            <p className="flex items-center gap-1.5 text-sm text-red-500 mt-3">
              <AlertCircle size={14} /> {error}
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  // Data screen
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-geofoam-dark flex items-center gap-2">
              <Users className="text-geofoam-highlight" size={24} />
              Newsletter Subscribers
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {data.count} {data.count === 1 ? 'subscriber' : 'subscribers'} total
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchSubscribers()}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button
              onClick={exportCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-geofoam-highlight text-white text-sm font-medium hover:bg-red-600 transition-colors"
            >
              <Download size={14} />
              Export CSV
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut size={14} />
              Lock
            </button>
          </div>
        </div>

        {/* Table */}
        {data.data.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">
            <Mail className="mx-auto text-gray-300 mb-3" size={40} />
            <p className="text-gray-500">No subscribers yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">#</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Subscribed</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((s, i) => (
                  <motion.tr
                    key={s._id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{s.email}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(s.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-4 text-center">
          Private view. Do not share this URL or your admin key.
        </p>
      </div>
    </div>
  );
};

export default AdminNewsletter;