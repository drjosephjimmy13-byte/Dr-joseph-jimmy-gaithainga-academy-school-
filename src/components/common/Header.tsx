import React, { useState } from 'react';
import { SchoolLogo } from './SchoolLogo';
import { useSchool } from '../../context/SchoolContext';
import {
  SCHOOL_PHONE,
  SCHOOL_PHONE_CLEAN,
  SCHOOL_EMAIL
} from '../../data/initialData';
import {
  Phone,
  Mail,
  MessageCircle,
  Menu,
  X,
  User,
  ShieldAlert,
  GraduationCap,
  Users,
  Briefcase,
  ChevronDown,
  LogOut,
  Layers,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { userSession, logout, loginAs } = useSchool();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'classes', label: 'Classes & Subjects' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const portals = [
    { id: 'admin-dashboard', label: 'School Admin Dashboard', icon: ShieldAlert, desc: 'Full Management & Controls' },
    { id: 'teacher-portal', label: 'Teacher Portal', icon: Briefcase, desc: 'Marks Entry & Class Attendance' },
    { id: 'student-portal', label: 'Student Portal', icon: GraduationCap, desc: 'Timetables, Grades & Materials' },
    { id: 'parent-portal', label: 'Parent Portal', icon: Users, desc: 'Fees, Report Cards & Progress' }
  ];

  const handlePortalClick = (portalId: string) => {
    // If not logged in into the appropriate role, auto set demo role for seamless testing
    if (portalId === 'admin-dashboard' && userSession?.role !== 'admin') {
      loginAs('admin');
    } else if (portalId === 'teacher-portal' && userSession?.role !== 'teacher') {
      loginAs('teacher');
    } else if (portalId === 'student-portal' && userSession?.role !== 'student') {
      loginAs('student');
    } else if (portalId === 'parent-portal' && userSession?.role !== 'parent') {
      loginAs('parent');
    }
    onNavigate(portalId);
    setPortalDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner with exact contact details */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white text-xs py-2 px-4 sm:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-6">
            <a
              href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=Hello%20DR%20JOSEPH%20JIMMY%20GAITHAINGA%20ACADEMY%20SCHOOL%2C%20I%20would%20like%20to%20inquire%20about%20admissions.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors font-medium text-emerald-300"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp: {SCHOOL_PHONE}</span>
            </a>
            <a
              href={`mailto:${SCHOOL_EMAIL}`}
              className="inline-flex items-center gap-1.5 hover:text-amber-300 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>{SCHOOL_EMAIL}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-blue-100/80">
            <span className="hidden lg:inline">Mon - Fri: 7:30 AM - 5:00 PM | Sat: 8:00 AM - 1:00 PM</span>
            <div className="h-3 w-px bg-blue-800 hidden lg:block"></div>
            {userSession ? (
              <div className="flex items-center gap-2 bg-blue-900/80 px-2 py-0.5 rounded-full border border-blue-700/50">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-semibold text-white capitalize">{userSession.role}: {userSession.name}</span>
                <button
                  onClick={() => { logout(); onNavigate('home'); }}
                  title="Sign out"
                  className="hover:text-red-300 text-slate-300 ml-1 transition"
                >
                  <LogOut className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold px-2.5 py-0.5 rounded-full transition text-xs shadow-xs"
              >
                <User className="w-3 h-3" />
                <span>Portal Logins</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Logo & Name */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left focus:outline-hidden hover:opacity-95 transition"
          >
            <SchoolLogo size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium text-sm text-slate-700">
            {navLinks.map(link => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`px-3 py-2 rounded-lg transition-colors font-medium ${
                    isActive
                      ? 'text-blue-900 bg-blue-50 font-semibold border-b-2 border-blue-900'
                      : 'hover:text-blue-900 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Portals Dropdown */}
            <div className="relative">
              <button
                onClick={() => setPortalDropdownOpen(!portalDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                  currentPage.includes('portal') || currentPage.includes('dashboard')
                    ? 'text-blue-900 bg-blue-100/70 font-bold'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-slate-50'
                }`}
              >
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Portals & Management</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${portalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {portalDropdownOpen && (
                <div
                  onMouseLeave={() => setPortalDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                    School System Portals
                  </div>
                  {portals.map(portal => {
                    const Icon = portal.icon;
                    return (
                      <button
                        key={portal.id}
                        onClick={() => handlePortalClick(portal.id)}
                        className="w-full text-left px-3 py-2.5 flex items-start gap-3 hover:bg-blue-50 transition group"
                      >
                        <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-900 group-hover:text-amber-400 text-blue-950 transition">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-800 group-hover:text-blue-950">
                            {portal.label}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {portal.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                  <div className="mt-1 pt-1 border-t border-slate-100 px-3 py-1">
                    <button
                      onClick={() => { onNavigate('login'); setPortalDropdownOpen(false); }}
                      className="text-xs text-blue-800 font-semibold hover:underline block py-1"
                    >
                      &rarr; View All Login Portals & Demo Switcher
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Quick Contact & Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=Hello%20DR%20JOSEPH%20JIMMY%20GAITHAINGA%20ACADEMY%20SCHOOL%2C%20I%20would%20like%20to%20inquire%20about%20admissions.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-lg transition shadow-xs"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-500/20" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={() => onNavigate('admissions')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-950 hover:bg-blue-900 rounded-lg transition shadow-sm hover:shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Apply Online</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-blue-950 hover:bg-slate-100 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
                  currentPage === link.id
                    ? 'bg-blue-900 text-white font-bold'
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Management Portals
            </div>
            <div className="grid grid-cols-1 gap-1">
              {portals.map(portal => {
                const Icon = portal.icon;
                return (
                  <button
                    key={portal.id}
                    onClick={() => handlePortalClick(portal.id)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 text-left"
                  >
                    <Icon className="w-4 h-4 text-amber-600" />
                    <span>{portal.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={`https://wa.me/${SCHOOL_PHONE_CLEAN}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-2 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold text-xs shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp: {SCHOOL_PHONE}</span>
            </a>
            <a
              href={`mailto:${SCHOOL_EMAIL}`}
              className="w-full inline-flex justify-center items-center gap-2 py-2.5 bg-blue-950 text-white rounded-lg font-semibold text-xs shadow-xs"
            >
              <Mail className="w-4 h-4 text-amber-400" />
              <span>Email: {SCHOOL_EMAIL}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
