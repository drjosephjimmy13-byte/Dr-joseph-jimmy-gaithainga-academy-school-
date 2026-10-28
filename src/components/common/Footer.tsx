import React from 'react';
import { SchoolLogo } from './SchoolLogo';
import {
  SCHOOL_NAME,
  SCHOOL_PHONE,
  SCHOOL_PHONE_CLEAN,
  SCHOOL_EMAIL,
  SCHOOL_LOCATION,
  SCHOOL_MOTTO
} from '../../data/initialData';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ShieldCheck,
  ChevronRight,
  Award,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-gradient-to-b from-slate-900 to-blue-950 text-slate-300 border-t-4 border-amber-500">
      {/* High-Impact Contact Call-to-Action Bar */}
      <div className="bg-blue-900/60 border-b border-blue-800/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
              Connect With {SCHOOL_NAME}
            </h3>
            <p className="text-sm text-blue-200">
              Have questions regarding admissions, curriculum, or school visits? Reach out to our admissions team directly today.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=Hello%20DR%20JOSEPH%20JIMMY%20GAITHAINGA%20ACADEMY%20SCHOOL%2C%20I%20would%20like%20to%20inquire%20about%20admissions%20and%20enrollment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg hover:shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Chat on WhatsApp: {SCHOOL_PHONE}</span>
            </a>

            <a
              href={`mailto:${SCHOOL_EMAIL}`}
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold text-sm shadow-lg hover:shadow-amber-500/20 transition transform hover:-translate-y-0.5"
            >
              <Mail className="w-5 h-5 text-blue-950" />
              <span>Email Us: {SCHOOL_EMAIL}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: School Identity */}
          <div className="space-y-4">
            <SchoolLogo size="lg" textColor="text-white" subtextColor="text-amber-400" />
            <p className="text-xs text-slate-300 leading-relaxed">
              {SCHOOL_NAME} is dedicated to fostering an intellectually vibrant, morally grounded, and spiritually sound learning environment where each child discovers and develops their God-given potential.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold italic">
              <Award className="w-4 h-4 shrink-0" />
              <span>"{SCHOOL_MOTTO}"</span>
            </div>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Ministry of Education & KNEC Accredited</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 border-b border-slate-700/60 pb-2">
              Website Pages
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: 'Home Page' },
                { id: 'about', label: 'About Our Academy' },
                { id: 'admissions', label: 'Admissions & Fees Guide' },
                { id: 'classes', label: 'Classes, Streams & Subjects' },
                { id: 'announcements', label: 'School Announcements' },
                { id: 'contact', label: 'Contact Us & Campus Tour' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Management System & Portals */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 border-b border-slate-700/60 pb-2">
              Management & Portals
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'admin-dashboard', label: 'Admin Management Dashboard' },
                { id: 'teacher-portal', label: 'Teacher Assessment Portal' },
                { id: 'student-portal', label: 'Student Portal' },
                { id: 'parent-portal', label: 'Parent Progress Portal' },
                { id: 'login', label: 'Secure Login Hub' }
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="flex items-center gap-1.5 text-slate-300 hover:text-amber-400 transition"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-500/80" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 p-3 bg-blue-950/60 rounded-xl border border-blue-800/40 text-xs">
              <span className="font-semibold text-white block mb-1">Instant Demo Mode:</span>
              <span className="text-slate-400">Switch between Admin, Teacher, Student and Parent views instantly without passwords.</span>
            </div>
          </div>

          {/* Col 4: Verified Contact Coordinates */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-4 border-b border-slate-700/60 pb-2">
              School Coordinates
            </h4>
            
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{SCHOOL_LOCATION}</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href={`tel:${SCHOOL_PHONE}`} className="hover:text-amber-400 transition">
                {SCHOOL_PHONE}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${SCHOOL_PHONE_CLEAN}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-300 font-semibold transition"
              >
                WhatsApp: {SCHOOL_PHONE}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href={`mailto:${SCHOOL_EMAIL}`} className="hover:text-amber-400 transition">
                {SCHOOL_EMAIL}
              </a>
            </div>

            <div className="flex items-start gap-2.5 text-xs text-slate-300 pt-1">
              <Clock className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
              <div>
                <p>Monday - Friday: 7:30 AM - 5:00 PM</p>
                <p>Saturday: 8:00 AM - 1:00 PM</p>
                <p className="text-amber-400/80">Closed on Sundays & Public Holidays</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 pt-6 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-amber-400 font-semibold">{SCHOOL_NAME}</span>. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <span>Discipline</span>
            <span>&bull;</span>
            <span>Integrity</span>
            <span>&bull;</span>
            <span>Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
