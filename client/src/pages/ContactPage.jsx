import React, { useState } from 'react';
import api from '../lib/api';
import { 
  Mail, 
  Linkedin, 
  Instagram, 
  Twitter, 
  Github, 
  Send, 
  Loader2, 
  CheckCircle, 
  AlertCircle 
} from 'lucide-react';
import { profile } from '../data/content';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [responseMsg, setResponseMsg] = useState('');

  const socials = [
    { name: 'Email', url: `mailto:${profile.email}`, icon: Mail, color: 'hover:text-red-400 hover:border-red-400/30' },
    { name: 'LinkedIn', url: profile.linkedin || 'https://linkedin.com', icon: Linkedin, color: 'hover:text-blue-400 hover:border-blue-400/30' },
    { name: 'GitHub', url: profile.github, icon: Github, color: 'hover:text-white hover:border-slate-500/30' },
    { name: 'Instagram', url: 'https://instagram.com/adityaaknkar16', icon: Instagram, color: 'hover:text-pink-400 hover:border-pink-400/30' },
    { name: 'Twitter/X', url: 'https://twitter.com', icon: Twitter, color: 'hover:text-sky-400 hover:border-sky-400/30' },
  ];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 100) {
      newErrors.name = 'Name must be less than 100 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters';
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
    setStatus(null);
    try {
      const res = await api.post('/contact', formData);
      if (res.data && res.data.success) {
        setStatus('success');
        setResponseMsg('Your message was sent successfully! I will reach out soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(res.data?.message || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setResponseMsg(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Failed to submit form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Contact</h1>
        <p className="text-sm text-slate-400 font-mono mt-1 uppercase tracking-wider text-cyan-500">Get in Touch or Send a Message</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 max-w-5xl">
        {/* Left Side: Social Blocks */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Social Channels</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {socials.map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`
                    flex items-center space-x-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800/60 bg-slate-900/20 dark:bg-slate-900/10 
                    transition-all duration-300 font-mono text-sm ${soc.color}
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{soc.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Side: Working Form */}
        <div className="lg:col-span-3 space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 font-sans">Send Me an Email</h2>

          <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/20 border border-slate-200 dark:border-slate-800/60 p-6 rounded-xl">
            {/* Status alerts */}
            {status === 'success' && (
              <div className="flex items-start space-x-2.5 p-3 rounded-lg border border-emerald-500/25 bg-emerald-500/5 text-emerald-400 text-xs">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{responseMsg}</span>
              </div>
            )}
            {status === 'error' && (
              <div className="flex items-start space-x-2.5 p-3 rounded-lg border border-red-500/25 bg-red-500/5 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{responseMsg}</span>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1">
              <label htmlFor="name" className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Name</label>
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-[10px] text-red-400 font-mono">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Email Address</label>
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-[10px] text-red-400 font-mono">{errors.email}</p>}
            </div>

            {/* Message Input */}
            <div className="space-y-1">
              <label htmlFor="message" className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                placeholder="Write your message here..."
              />
              {errors.message && <p className="text-[10px] text-red-400 font-mono">{errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800 disabled:opacity-50 text-white font-mono text-xs font-semibold py-2.5 rounded-lg transition duration-200"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
