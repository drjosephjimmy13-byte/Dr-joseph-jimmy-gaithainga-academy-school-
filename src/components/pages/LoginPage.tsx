import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../common/SchoolLogo';
import { UserRole } from '../../types';
import { SCHOOL_NAME } from '../../data/initialData';
import {
  ShieldAlert,
  Briefcase,
  GraduationCap,
  Users,
  Lock,
  Mail,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  KeyRound,
  AlertCircle,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

type PortalRole = 'admin' | 'teacher' | 'student' | 'parent';

interface LoginPageProps {
  onNavigate: (page: string) => void;
  defaultRole?: UserRole;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate, defaultRole = 'admin' }) => {
  const { loginAs, students, teachers, adminPassword, changeAdminPassword, verifyAdminPassword } = useSchool();
  const [activeRole, setActiveRole] = useState<PortalRole>(defaultRole === 'public' ? 'admin' : (defaultRole as PortalRole));
  
  // Custom form inputs
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [selectedEntityId, setSelectedEntityId] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Set / Change password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [passwordModalSuccess, setPasswordModalSuccess] = useState<string | null>(null);

  const handleRoleSelect = (role: PortalRole) => {
    setActiveRole(role);
    setIdentifier('');
    setPassword('');
    setErrorMessage(null);
    if (role === 'teacher') setSelectedEntityId(teachers[0]?.id || '');
    if (role === 'student' || role === 'parent') setSelectedEntityId(students[0]?.id || '');
  };

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate admin password
    if (activeRole === 'admin') {
      if (!password) {
        setErrorMessage('Please enter the administrator password to proceed.');
        return;
      }
      if (!verifyAdminPassword(password)) {
        setErrorMessage(`Invalid admin password. The current active password is "${adminPassword}".`);
        return;
      }
    }

    loginAs(activeRole, selectedEntityId || undefined);
    redirectAfterLogin(activeRole);
  };

  const handleQuickDemoLogin = (role: PortalRole, targetId?: string) => {
    loginAs(role, targetId);
    redirectAfterLogin(role);
  };

  const redirectAfterLogin = (role: UserRole) => {
    if (role === 'admin') onNavigate('admin-dashboard');
    else if (role === 'teacher') onNavigate('teacher-portal');
    else if (role === 'student') onNavigate('student-portal');
    else if (role === 'parent') onNavigate('parent-portal');
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPassword) return;
    if (newAdminPassword !== confirmAdminPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }
    changeAdminPassword(newAdminPassword);
    setPassword(newAdminPassword);
    setPasswordModalSuccess(`Admin password updated to "${newAdminPassword}"!`);
    setTimeout(() => {
      setPasswordModalSuccess(null);
      setShowPasswordModal(false);
      setNewAdminPassword('');
      setConfirmAdminPassword('');
    }, 1500);
  };

  const roleConfigs = {
    admin: {
      title: 'Administrator Portal',
      subtitle: 'Executive school management, enrollment, fees & staff oversight',
      icon: ShieldAlert,
      themeColor: 'from-blue-900 to-indigo-950',
      badgeColor: 'bg-amber-400 text-blue-950',
      idLabel: 'Admin Email / System ID',
      defaultId: 'drjosephjimmy13@gmail.com'
    },
    teacher: {
      title: 'Teacher & Faculty Portal',
      subtitle: 'Marks entry, class attendance register, timetables & remarks',
      icon: Briefcase,
      themeColor: 'from-blue-950 to-slate-900',
      badgeColor: 'bg-emerald-400 text-slate-950',
      idLabel: 'Staff ID / Staff Email',
      defaultId: 'd.kariuki@gaithainga-academy.ac.ke'
    },
    student: {
      title: 'Student Learning Portal',
      subtitle: 'Timetables, academic report cards, attendance & class assignments',
      icon: GraduationCap,
      themeColor: 'from-indigo-950 to-blue-900',
      badgeColor: 'bg-blue-300 text-blue-950',
      idLabel: 'Admission Number',
      defaultId: 'DJGA/2024/001'
    },
    parent: {
      title: 'Parent & Guardian Portal',
      subtitle: 'Child academic progress, fee balances, receipt history & notices',
      icon: Users,
      themeColor: 'from-slate-900 to-blue-950',
      badgeColor: 'bg-amber-300 text-slate-950',
      idLabel: 'Parent Mobile / Registered Email',
      defaultId: '+254 711 223 344'
    }
  };

  const currentConfig = roleConfigs[activeRole];
  const Icon = currentConfig.icon;

  return (
    <div className="min-h-[85vh] py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center bg-slate-50">
      <div className="max-w-xl w-full space-y-6">
        {/* Branding Title */}
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <SchoolLogo size="lg" showText={false} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight">
            {SCHOOL_NAME}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Centralized School Information & Management Gateway
          </p>
        </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-200/80 p-1.5 rounded-2xl">
          {(['admin', 'teacher', 'student', 'parent'] as PortalRole[]).map(role => {
            const roleConf = roleConfigs[role];
            const TabIcon = roleConf.icon;
            const isSelected = activeRole === role;
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelect(role)}
                className={`flex flex-col items-center justify-center gap-1.5 py-3 px-2 rounded-xl text-xs font-bold transition ${
                  isSelected
                    ? 'bg-blue-950 text-white shadow-md'
                    : 'text-slate-600 hover:text-blue-950 hover:bg-slate-100'
                }`}
              >
                <TabIcon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="capitalize">{role}</span>
              </button>
            );
          })}
        </div>

        {/* Login Container Box */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
          {/* Header Banner */}
          <div className={`p-6 bg-gradient-to-r ${currentConfig.themeColor} text-white flex items-center justify-between`}>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-white">
                  {currentConfig.title}
                </h3>
                <p className="text-xs text-blue-200">
                  {currentConfig.subtitle}
                </p>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-black uppercase ${currentConfig.badgeColor}`}>
              {activeRole}
            </span>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Quick Demo Login Shortcut */}
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Instant Evaluator 1-Click Access
                </span>
                <span className="text-[10px] text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-full font-semibold">
                  No password required
                </span>
              </div>
              <p className="text-[11px] text-slate-600 leading-tight">
                Instantly authenticate as {activeRole === 'admin' ? 'Executive Administrator Dr. Gaithainga' : activeRole === 'teacher' ? 'Senior Master David Kariuki' : activeRole === 'student' ? 'Scholar Brian Kipchumba' : 'Parent Stephen Kipchumba'}:
              </p>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin(activeRole)}
                className="w-full mt-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-blue-950 font-extrabold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4 text-blue-950" />
                <span>Launch Demo {currentConfig.title} &rarr;</span>
              </button>
            </div>

            {/* Standard Login Credentials Form */}
            <form onSubmit={handleCustomLogin} className="space-y-4 text-xs">
              <div className="flex items-center justify-center gap-2 text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                <span className="h-px w-16 bg-slate-200"></span>
                <span>Or Sign In With Account Details</span>
                <span className="h-px w-16 bg-slate-200"></span>
              </div>

              {/* Specific user selector for Teacher / Student / Parent */}
              {(activeRole === 'student' || activeRole === 'parent') && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Select Sample Student / Child Profile
                  </label>
                  <select
                    value={selectedEntityId || students[0]?.id}
                    onChange={e => setSelectedEntityId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  >
                    {students.map(st => (
                      <option key={st.id} value={st.id}>
                        {st.admissionNo} - {st.firstName} {st.lastName} ({st.grade})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {activeRole === 'teacher' && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Select Faculty Profile
                  </label>
                  <select
                    value={selectedEntityId || teachers[0]?.id}
                    onChange={e => setSelectedEntityId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  >
                    {teachers.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} - {t.title} ({t.department})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {currentConfig.idLabel}
                </label>
                <input
                  type="text"
                  placeholder={currentConfig.defaultId}
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* Error message */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{errorMessage}</p>
                    {activeRole === 'admin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setIdentifier('drjosephjimmy13@gmail.com');
                          setPassword(adminPassword);
                          setErrorMessage(null);
                        }}
                        className="text-blue-900 font-bold underline mt-1 block"
                      >
                        Click here to auto-fill current password ({adminPassword})
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Secure Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-3" />
                </div>

                {/* Admin Password Helper Bar */}
                {activeRole === 'admin' && (
                  <div className="mt-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <div className="flex items-center gap-1.5 text-amber-950 font-medium">
                      <KeyRound className="w-3.5 h-3.5 text-amber-600" />
                      <span>Configured Password: <strong className="font-mono bg-amber-100 px-1.5 py-0.5 rounded text-amber-900">{adminPassword}</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIdentifier('drjosephjimmy13@gmail.com');
                          setPassword(adminPassword);
                          setErrorMessage(null);
                        }}
                        className="px-2 py-0.5 bg-amber-200 hover:bg-amber-300 text-blue-950 font-bold rounded text-[10px] transition"
                      >
                        Auto-Fill
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setNewAdminPassword('');
                          setConfirmAdminPassword('');
                          setShowPasswordModal(true);
                        }}
                        className="px-2 py-0.5 bg-blue-950 hover:bg-blue-900 text-amber-300 font-bold rounded text-[10px] transition"
                      >
                        Set New Password
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-blue-900" />
                  <span>Remember session</span>
                </label>
                {activeRole === 'admin' ? (
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(true)}
                    className="text-blue-900 font-semibold hover:underline"
                  >
                    Set / Change Admin Password
                  </button>
                ) : (
                  <span className="text-blue-900 hover:underline cursor-pointer">
                    Forgot credentials?
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-xl transition shadow-md flex items-center justify-center gap-2"
              >
                <span>Authorize & Enter Portal</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </form>
          </div>
        </div>

        {/* Set Admin Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-300 space-y-4 animate-in fade-in duration-200">
              <div className="flex justify-between items-center border-b pb-3">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-amber-500" />
                  <h3 className="font-serif font-bold text-base text-slate-900">
                    Set Administrator Password
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border text-xs text-slate-600 space-y-1">
                <div className="flex justify-between">
                  <span>Current Admin Password:</span>
                  <strong className="font-mono text-blue-950">{adminPassword}</strong>
                </div>
                <p className="text-[11px] text-slate-500">
                  Enter your desired new password below. It will be stored securely and required for subsequent admin sign-ins.
                </p>
              </div>

              {passwordModalSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{passwordModalSuccess}</span>
                </div>
              )}

              <form onSubmit={handleSaveNewPassword} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    New Admin Password *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gaithainga#2026 or Jimmy@Admin"
                    value={newAdminPassword}
                    onChange={e => setNewAdminPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Confirm New Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-type new password"
                    value={confirmAdminPassword}
                    onChange={e => setConfirmAdminPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 font-mono"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="px-4 py-2 border rounded-lg font-semibold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-lg shadow-sm"
                  >
                    Save Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Footer Support Info */}
        <div className="text-center text-xs text-slate-500 space-y-1">
          <p>
            Having trouble logging in? Contact IT Support directly at:
          </p>
          <p className="font-semibold text-slate-700">
            WhatsApp: +254 143 265 743 &bull; Email: drjosephjimmy13@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};
