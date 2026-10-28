import React, { useState } from 'react';
import {
  SCHOOL_NAME,
  SCHOOL_PHONE,
  SCHOOL_PHONE_CLEAN,
  SCHOOL_EMAIL,
  SCHOOL_LOCATION
} from '../../data/initialData';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Admissions Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappInquiryUrl = `https://wa.me/${SCHOOL_PHONE_CLEAN}?text=${encodeURIComponent(
    `Hello ${SCHOOL_NAME},\nName: ${formData.name || 'Prospective Parent'}\nPhone: ${formData.phone || 'N/A'}\nSubject: ${formData.subject}\nInquiry: ${formData.message || 'I would like to inquire about admissions and school programs.'}`
  )}`;

  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
            <Phone className="w-4 h-4 text-amber-400" />
            <span>Open Communication & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
            Contact Us
          </h1>
          <h2 className="text-xl sm:text-2xl font-serif text-amber-300 font-bold">
            {SCHOOL_NAME}
          </h2>
          <p className="text-base text-blue-100 max-w-2xl mx-auto">
            Our admissions directors, accounts department, and administrative team are on standby to assist you.
          </p>
        </div>
      </section>

      {/* Prominent Large WhatsApp & Email Action Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Large WhatsApp Card */}
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="space-y-3 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white shadow-md">
                <MessageCircle className="w-8 h-8 fill-white/20" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Chat with us on WhatsApp
              </h3>
              <p className="text-emerald-100 text-sm leading-relaxed max-w-md">
                Connect instantly with our school admissions and administrative desk on WhatsApp. Fast responses, document sharing, and instant guidance.
              </p>
              <div className="text-xl font-bold font-mono tracking-wider text-amber-300 pt-1">
                {SCHOOL_PHONE}
              </div>
            </div>

            <div className="pt-2 relative z-10">
              <a
                href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=Hello%20${encodeURIComponent(SCHOOL_NAME)}%2C%20I%20am%20reaching%20out%20via%20your%20website%20to%20inquire%20about%20the%20school.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-slate-100 text-emerald-800 font-extrabold text-base rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-6 h-6 text-emerald-600 fill-emerald-600/30" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Large Email Card */}
          <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden group border-2 border-amber-400/40">
            <div className="space-y-3 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-amber-300 shadow-md">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Email Us
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed max-w-md">
                Send official inquiries, student transfer requests, fee payment confirmations, or partnership proposals directly to the school principal.
              </p>
              <div className="text-lg font-bold font-mono tracking-wide text-amber-300 pt-1 break-all">
                {SCHOOL_EMAIL}
              </div>
            </div>

            <div className="pt-2 relative z-10">
              <a
                href={`mailto:${SCHOOL_EMAIL}?subject=Inquiry%20to%20DR%20JOSEPH%20JIMMY%20GAITHAINGA%20ACADEMY%20SCHOOL`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-blue-950 font-extrabold text-base rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
              >
                <Mail className="w-6 h-6 text-blue-950" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Contact Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-2">
                Quick Message Portal
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Send Us an Online Inquiry
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill the fields below to send an immediate inquiry to the administrative secretariat of {SCHOOL_NAME}.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-950">
                  Thank You! Your Message Has Been Dispatched
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Our team has received your message. For immediate real-time response, you can also forward your query via WhatsApp directly.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-md hover:bg-emerald-500"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Forward to WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Admissions Inquiry', message: '' });
                    }}
                    className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-300"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Christine Wangari"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2.5 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +254 712 345 678"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2.5 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. parent@gmail.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2.5 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Subject / Department</label>
                    <select
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 py-2.5 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                    >
                      <option value="General Admissions Inquiry">Admissions Inquiry</option>
                      <option value="Fees and Finance Department">Fees & Payment Assistance</option>
                      <option value="Academic Curriculum & STEM">Academic Curriculum & STEM</option>
                      <option value="Boarding & Transport Services">Boarding & Transport</option>
                      <option value="Director's Office">Office of the Director</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Message or Inquiry *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Please specify child's grade level, current school, or any questions..."
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2.5 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Submit Message Online</span>
                  </button>

                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right: Key Contact Card Details & Campus Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-lg space-y-6">
              <div>
                <h4 className="font-serif font-bold text-xl text-amber-400 mb-1">
                  Campus Visiting & Working Hours
                </h4>
                <p className="text-xs text-slate-400">
                  You are warmly invited to visit our administration offices during regular operating hours:
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Weekdays (Monday - Friday)</strong>
                    <span className="text-slate-300">7:30 AM – 5:00 PM (Admissions & Registrar Open)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Saturdays (Interviews & Campus Tours)</strong>
                    <span className="text-slate-300">8:00 AM – 1:00 PM (Prior Booking Preferred)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold">Campus Location Address</strong>
                    <span className="text-slate-300">{SCHOOL_LOCATION}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
                <div className="font-bold text-amber-300">Direct Departmental WhatsApp & Email:</div>
                <div className="text-slate-300 flex justify-between">
                  <span>Admissions Desk:</span>
                  <span className="font-mono text-emerald-400">{SCHOOL_PHONE}</span>
                </div>
                <div className="text-slate-300 flex justify-between">
                  <span>General Registrar:</span>
                  <span className="text-amber-200">{SCHOOL_EMAIL}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
