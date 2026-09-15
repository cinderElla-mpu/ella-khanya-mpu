import React, { useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ExternalLink,
  Edit3,
  MapPin,
  MessageSquare,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext.tsx';

export const Contact: React.FC = () => {
  const { data, submitContactMessage, openEditModal } = usePortfolio();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!subject.trim()) {
      setError('Please enter a message subject.');
      return;
    }
    if (!message.trim() || message.length < 10) {
      setError('Please enter a message with at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate network request & save to persistent context messages
      await new Promise((resolve) => setTimeout(resolve, 600));
      await submitContactMessage(name, email, subject, message);
      setSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setTimeout(() => setSuccess(false), 6000);
    } catch (err) {
      setError('An error occurred while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5 text-cyan-600" />
            <span>Get in Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Contact Me
          </h2>
          <p className="mt-3 text-slate-600 text-base sm:text-lg leading-relaxed">
            Interested in learning more about my projects, discussing an internship or learning programme opportunity, or connecting?
            Feel free to send a message or reach out via my links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50/70 border border-slate-200 space-y-6">
              <h3 className="text-xl font-display font-bold text-slate-900">
                Connect Directly
              </h3>

              {/* GitHub */}
              <a
                href={data.personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-xs transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <Github className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    GitHub
                  </span>
                  <div className="text-sm font-bold text-slate-900 truncate group-hover:text-cyan-600 transition-colors">
                    github.com/cinderElla-mpu
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-600" />
              </a>

              {/* LinkedIn */}
              {data.personalInfo.linkedInUrl ? (
                <a
                  href={data.personalInfo.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-xs transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-600 text-white flex items-center justify-center shrink-0">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      LinkedIn
                    </span>
                    <div className="text-sm font-bold text-slate-900 truncate group-hover:text-cyan-600 transition-colors">
                      {data.personalInfo.linkedInUrl.replace('https://', '')}
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-cyan-600" />
                </a>
              ) : (
                <div
                  onClick={() => openEditModal('general')}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-dashed border-cyan-300 hover:border-cyan-500 hover:bg-cyan-50/30 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">
                      LinkedIn
                    </span>
                    <div className="text-sm font-medium text-slate-600 group-hover:text-cyan-700">
                      + Click to add your profile link
                    </div>
                  </div>
                  <Edit3 className="w-4 h-4 text-cyan-600" />
                </div>
              )}

              {/* Email */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-cyan-400 hover:shadow-xs transition-all group">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Email Address
                  </span>
                  <div className="text-sm font-bold text-slate-900 truncate">
                    <a
                      href={`mailto:${data.personalInfo.email}`}
                      className="hover:text-cyan-600 transition-colors"
                    >
                      {data.personalInfo.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => openEditModal('general')}
                  className="p-1 text-slate-600 hover:text-cyan-600"
                  title="Edit email address"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200">
                <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-cyan-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Location
                  </span>
                  <div className="text-sm font-bold text-slate-900">
                    {data.personalInfo.location || 'South Africa'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Fill out the form below and I will respond to your email as soon as possible.
            </p>

            {success && (
              <div className="mb-6 p-4 rounded-2xl bg-cyan-50 border border-cyan-300 text-cyan-900 flex items-start gap-3 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Message Sent Successfully!</h4>
                  <p className="text-xs text-cyan-800 mt-0.5">
                    Thank you for reaching out. Your message has been recorded and received.
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-300 text-rose-900 flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Validation Notice</h4>
                  <p className="text-xs text-rose-800 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 mb-1.5 font-display">
                    Your Name <span className="text-cyan-600">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-sm transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-700 mb-1.5 font-display">
                    Your Email <span className="text-cyan-600">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-slate-700 mb-1.5 font-display">
                  Subject <span className="text-cyan-600">*</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Collaboration on AI Project / Internship Inquiry"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-sm transition-all"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-slate-700 mb-1.5 font-display">
                  Message <span className="text-cyan-600">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 outline-none text-sm transition-all resize-y"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-300 text-white font-semibold text-sm rounded-xl shadow-xs transition-all transform active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
