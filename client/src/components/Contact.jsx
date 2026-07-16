import { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import api from '../lib/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await api.post('/contact', formData);
      if (response.data && response.data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(response.data.message || 'An unexpected error occurred.');
      }
    } catch (error) {
      console.error('Contact submission request error:', error);
      const apiMsg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg;
      setStatus('error');
      setErrorMessage(apiMsg || 'Failed to connect to the backend server. Please verify connections.');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-left mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="h-6 w-6 text-teal-600 dark:text-teal-400" />
            Get In Touch
          </h2>
          <div className="h-1 w-12 bg-teal-500 mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Info Card Column */}
          <div className="lg:col-span-5 text-left space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Let's build something great together.
            </h3>
            <p className="text-slate-650 dark:text-slate-400 text-sm leading-relaxed">
              If you have any questions, want to discuss a potential partnership, or just want to chat about AI/ML integrations or web applications, feel free to fill in the contact form or send me a message directly.
            </p>
            
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div>
                <span className="text-xs font-semibold text-slate-450 uppercase block mb-1">Direct Email</span>
                <a href="mailto:adityaakankar@gmail.com" className="text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline">
                  adityaakankar@gmail.com
                </a>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-450 uppercase block mb-1">Social Networks</span>
                <div className="flex gap-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  <a href="https://github.com/Adityaaknkar16" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500">GitHub</a>
                  <span>&middot;</span>
                  <a href="https://linkedin.com/in/aditya-akankar" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card Column */}
          <div className="lg:col-span-7">
            <div className="p-6 md:p-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm text-left">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                    placeholder="name@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                {/* Status Banners */}
                {status === 'success' && (
                  <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-450 text-xs font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <span>Your message has been sent successfully. Thank you!</span>
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-450 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 rounded-lg bg-teal-655 bg-teal-600 text-white font-medium hover:bg-teal-700 transition-colors shadow-md shadow-teal-600/10 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Submit Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
