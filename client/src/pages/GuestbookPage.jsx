import React, { useEffect, useState } from 'react';
import api from '../lib/api';
import { 
  BookOpen, 
  Send, 
  Loader2, 
  AlertCircle, 
  MessageSquare,
  BadgeAlert
} from 'lucide-react';

export default function GuestbookPage() {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postStatus, setPostStatus] = useState(null); // 'success' | 'error'
  const [postStatusMsg, setPostStatusMsg] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await api.get('/guestbook');
      if (res.data && res.data.success) {
        setMessages(res.data.data);
      } else {
        throw new Error('Failed to load guestbook messages');
      }
    } catch (err) {
      console.error(err);
      setError('Unable to fetch guestbook postings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Signature is required';
    } else if (formData.name.length > 50) {
      newErrors.name = 'Signature must be under 50 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message content is required';
    } else if (formData.message.length > 500) {
      newErrors.message = 'Message must be under 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setPostStatus(null);
    try {
      const res = await api.post('/guestbook', formData);
      if (res.data && res.data.success) {
        setPostStatus('success');
        setFormData({ name: '', message: '' });
        // Refresh list
        fetchMessages();
      } else {
        throw new Error(res.data?.message || 'Posting failed');
      }
    } catch (err) {
      console.error(err);
      setPostStatus('error');
      setPostStatusMsg(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to submit posting.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Guestbook</h1>
        <p className="text-sm text-slate-400 font-mono mt-1 uppercase tracking-wider text-purple-500">Leave a Signed Message on my board</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl">
        {/* Left Side: Signing form */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Sign the Book</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 p-5 rounded-xl">
            {postStatus === 'error' && (
              <div className="flex items-start space-x-2 p-3 rounded-lg border border-red-500/25 bg-red-500/5 text-red-400 text-xs font-mono">
                <BadgeAlert className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{postStatusMsg}</span>
              </div>
            )}

            {/* Signature Input */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Signature / Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="Coder123"
              />
              {errors.name && <p className="text-[10px] text-red-400 font-mono">{errors.name}</p>}
            </div>

            {/* Message Input */}
            <div className="space-y-1">
              <label htmlFor="message" className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Short Note</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Loved checking your stats!"
              />
              {errors.message && <p className="text-[10px] text-red-400 font-mono">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 bg-purple-650 hover:bg-purple-700 disabled:bg-purple-800 disabled:opacity-50 text-white font-mono text-xs font-semibold py-2 rounded-lg transition duration-200"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Signing...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Sign Guestbook</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Message feed */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Board Postings</h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              <span className="text-xs text-slate-400 mt-3 font-mono">Fetching board messages...</span>
            </div>
          ) : error ? (
            <div className="flex items-center space-x-3 border border-red-500/20 bg-red-500/5 rounded-xl p-6 text-red-400">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-sm font-mono">{error}</span>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-700/60 rounded-xl p-8 text-center text-slate-450 font-mono text-xs space-y-2">
              <MessageSquare className="w-8 h-8 text-slate-600" />
              <span>No messages left yet. Be the first to sign!</span>
            </div>
          ) : (
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1.5 scrollbar-thin">
              {messages.map((msg) => (
                <div 
                  key={msg._id}
                  className="bg-slate-900/30 dark:bg-slate-900/10 border border-slate-200 dark:border-slate-800/60 p-4 rounded-xl space-y-2 hover:border-purple-500/20 transition-all duration-300"
                >
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="font-bold text-purple-400">@{msg.name}</span>
                    <span className="text-slate-500 text-[10px]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-slate-300 font-sans leading-relaxed break-words">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
