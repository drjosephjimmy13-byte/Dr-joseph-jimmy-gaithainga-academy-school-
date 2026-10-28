import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../common/SchoolLogo';
import { StudentManagement } from './StudentManagement';
import { TeacherManagement } from './TeacherManagement';
import { FeesManagement } from './FeesManagement';
import { ExamsResults } from './ExamsResults';
import { AttendanceManagement } from './AttendanceManagement';
import { FeeTrendsChart } from './FeeTrendsChart';
import { Student, Teacher, ClassStream } from '../../types';
import { SCHOOL_NAME } from '../../data/initialData';
import {
  Users,
  Briefcase,
  Layers,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
  Award,
  Bell,
  Activity,
  PlusCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  KeyRound,
  X,
  Search,
  GraduationCap,
  DoorOpen,
  ArrowUpRight,
  Phone,
  Mail,
  Eye,
  Image as ImageIcon,
  Upload,
  RotateCcw
} from 'lucide-react';

interface AdminDashboardProps {
  initialTab?: string;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ initialTab = 'overview' }) => {
  const {
    students,
    teachers,
    classes,
    payments,
    reports,
    announcements,
    attendance,
    userSession,
    adminPassword,
    changeAdminPassword,
    customLogoUrl,
    updateSchoolLogo
  } = useSchool();
  const [activeTab, setActiveTab] = useState(initialTab);

  // Set / Change admin password modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [confirmAdminPassword, setConfirmAdminPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // Change school logo modal state
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [logoInput, setLogoInput] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoSuccessMessage, setLogoSuccessMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Global search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [selectedSearchResult, setSelectedSearchResult] = useState<{
    type: 'student' | 'teacher' | 'class';
    data: any;
  } | null>(null);
  const [searchCategoryFilter, setSearchCategoryFilter] = useState<'All' | 'Students' | 'Teachers' | 'Classes'>('All');

  // Close search dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute matched items across students, teachers, and classes
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { students: [], teachers: [], classes: [], totalCount: 0 };

    const matchedStudents = students.filter(s =>
      `${s.firstName} ${s.lastName}`.toLowerCase().includes(q) ||
      s.admissionNo.toLowerCase().includes(q) ||
      s.grade.toLowerCase().includes(q) ||
      s.parentPhone.toLowerCase().includes(q)
    );

    const matchedTeachers = teachers.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.staffId.toLowerCase().includes(q) ||
      t.department.toLowerCase().includes(q) ||
      t.subjects.some(sub => sub.toLowerCase().includes(q))
    );

    const matchedClasses = classes.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.roomNumber.toLowerCase().includes(q) ||
      c.classTeacherName.toLowerCase().includes(q) ||
      c.gradeLevel.toLowerCase().includes(q)
    );

    return {
      students: matchedStudents,
      teachers: matchedTeachers,
      classes: matchedClasses,
      totalCount: matchedStudents.length + matchedTeachers.length + matchedClasses.length
    };
  }, [searchQuery, students, teachers, classes]);

  // Computed metrics
  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const totalClasses = classes.length;
  const totalBilled = students.reduce((sum, s) => sum + s.totalFees, 0);
  const totalCollected = students.reduce((sum, s) => sum + s.paidFees, 0);
  const totalOutstanding = Math.max(0, totalBilled - totalCollected);
  const averageAttendance = totalStudents > 0
    ? Math.round(students.reduce((sum, s) => sum + s.attendanceRate, 0) / totalStudents)
    : 96;
  const meanExamScore = reports.length > 0
    ? Number((reports.reduce((sum, r) => sum + r.meanScore, 0) / reports.length).toFixed(1))
    : 88.5;

  // Recent activity stream
  const activities = [
    { type: 'payment', title: 'Fee Payment Received', desc: 'KES 65,000 via M-Pesa from Stephen Kipchumba (Brian Kipchumba)', time: '2 hours ago', icon: DollarSign, color: 'text-emerald-600 bg-emerald-50' },
    { type: 'exam', title: 'Exam Marks Submitted', desc: 'Term 2 End of Term Exam marks recorded for Precious Achieng (Grade 7 East)', time: '5 hours ago', icon: Award, color: 'text-blue-600 bg-blue-50' },
    { type: 'student', title: 'New Student Enrolled', desc: 'Faith Nyambura enrolled into Grade 7 West', time: '1 day ago', icon: Users, color: 'text-purple-600 bg-purple-50' },
    { type: 'announcement', title: 'Official Circular Published', desc: 'Admissions Open for Academic Year 2027 notice broadcast to parents', time: '2 days ago', icon: Bell, color: 'text-amber-600 bg-amber-50' },
    { type: 'attendance', title: 'Daily Roll Call Saved', desc: 'Grade 8 East attendance marked: 100% attendance rate today', time: 'Today 8:30 AM', icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' }
  ];

  const tabs = [
    { id: 'overview', label: 'Dashboard Overview', icon: Activity },
    { id: 'students', label: 'Students', icon: Users, count: totalStudents },
    { id: 'teachers', label: 'Teachers', icon: Briefcase, count: totalTeachers },
    { id: 'fees', label: 'Fees & Finance', icon: DollarSign },
    { id: 'exams', label: 'Exams & Results', icon: Award },
    { id: 'attendance', label: 'Attendance', icon: CheckCircle2 }
  ];

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminPassword) return;
    if (newAdminPassword !== confirmAdminPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }
    changeAdminPassword(newAdminPassword);
    setPasswordSuccess(`Admin password successfully updated to "${newAdminPassword}"!`);
    setTimeout(() => {
      setPasswordSuccess(null);
      setShowPasswordModal(false);
      setNewAdminPassword('');
      setConfirmAdminPassword('');
    }, 1500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Image file size should be under 2MB for browser local storage.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        setLogoPreview(result);
        setLogoInput(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLogo = (e: React.FormEvent) => {
    e.preventDefault();
    const finalLogo = logoPreview || (logoInput.trim() ? logoInput.trim() : null);
    updateSchoolLogo(finalLogo);
    setLogoSuccessMessage(finalLogo ? 'Official School Logo updated across website & portals!' : 'Reset to official Academy Crest emblem!');
    setTimeout(() => {
      setLogoSuccessMessage(null);
      setShowLogoModal(false);
    }, 1500);
  };

  const handleResetToDefaultLogo = () => {
    updateSchoolLogo(null);
    setLogoPreview(null);
    setLogoInput('');
    setLogoSuccessMessage('Reset to official Academy Crest emblem!');
    setTimeout(() => {
      setLogoSuccessMessage(null);
      setShowLogoModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-500/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <SchoolLogo size="lg" showText={false} />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Executive School Management System</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
                {SCHOOL_NAME}
              </h1>
              <p className="text-xs text-blue-200 mt-1">
                Welcome, {userSession?.name || 'Dr. Joseph Jimmy Gaithainga'} (Administrator) &bull; Academic Year 2026/2027
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('students')}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold text-xs rounded-xl shadow-xs transition"
            >
              + Enroll Student
            </button>
            <button
              onClick={() => setActiveTab('fees')}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Record Payment
            </button>
            <button
              onClick={() => setActiveTab('exams')}
              className="px-3.5 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs rounded-xl transition"
            >
              Report Cards
            </button>
            <button
              onClick={() => {
                setLogoInput(customLogoUrl || '');
                setLogoPreview(customLogoUrl);
                setShowLogoModal(true);
              }}
              className="px-3.5 py-2 bg-blue-900/80 hover:bg-blue-800 text-amber-300 font-bold text-xs rounded-xl border border-amber-400/40 shadow-xs transition flex items-center gap-1.5"
              title="Change or upload school logo"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Change Logo</span>
            </button>
            <button
              onClick={() => setShowPasswordModal(true)}
              className="px-3.5 py-2 bg-blue-900/80 hover:bg-blue-800 text-amber-300 font-bold text-xs rounded-xl border border-amber-400/40 shadow-xs transition flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Set Admin Password</span>
            </button>
          </div>
        </div>

        {/* Global Search Bar in Admin Dashboard Header */}
        <div className="mt-6 pt-5 border-t border-blue-800/60 relative" ref={searchContainerRef}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              placeholder="Global Search: Search students by name or ID (e.g. DJGA/2024/001), teachers by name or ID (e.g. DJGA/STF/001), or classes..."
              className="w-full pl-10 pr-28 py-3 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 placeholder:text-blue-200/70 focus:placeholder:text-slate-400 rounded-2xl text-xs sm:text-sm font-medium border border-white/20 focus:border-amber-400 focus:outline-hidden focus:ring-4 focus:ring-amber-400/20 transition backdrop-blur-md shadow-inner"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-blue-200 hover:text-white"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white/15 text-blue-200 border border-white/20">
                  Global Search
                </span>
              </div>
            )}
          </div>

          {/* Search Dropdown Results Popover */}
          {isSearchOpen && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl shadow-2xl border border-slate-200 max-h-[480px] overflow-y-auto text-slate-800 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Header with quick category tabs */}
              <div className="p-3 bg-slate-50 flex flex-wrap items-center justify-between gap-2 border-b">
                <div className="font-semibold text-xs text-slate-700 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-blue-900" />
                  <span>
                    Found <strong className="text-blue-950 font-bold">{searchResults.totalCount}</strong> results for &ldquo;{searchQuery}&rdquo;
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {(['All', 'Students', 'Teachers', 'Classes'] as const).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSearchCategoryFilter(cat)}
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition ${
                        searchCategoryFilter === cat
                          ? 'bg-blue-950 text-white shadow-xs'
                          : 'bg-white text-slate-600 hover:bg-slate-200 border'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 text-slate-400 hover:text-slate-600 text-xs font-bold px-1"
                  >
                    &times;
                  </button>
                </div>
              </div>

              {/* No results */}
              {searchResults.totalCount === 0 && (
                <div className="p-6 text-center text-xs text-slate-500 space-y-1">
                  <p className="font-semibold text-slate-700">No matching students, teachers, or classes found</p>
                  <p className="text-[11px] text-slate-400">
                    Try searching by student name or admission number (e.g. DJGA/2024/001), staff name or staff ID (e.g. DJGA/STF/001), or class name (e.g. Grade 7 East).
                  </p>
                </div>
              )}

              {/* Matched Students */}
              {(searchCategoryFilter === 'All' || searchCategoryFilter === 'Students') && searchResults.students.length > 0 && (
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-blue-900">
                    <span className="flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      <span>Students ({searchResults.students.length})</span>
                    </span>
                    <button
                      onClick={() => {
                        setActiveTab('students');
                        setIsSearchOpen(false);
                      }}
                      className="text-[10px] text-blue-700 hover:underline font-bold"
                    >
                      View in Students Tab &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResults.students.map(st => {
                      const balance = st.totalFees - st.paidFees;
                      return (
                        <div
                          key={st.id}
                          onClick={() => {
                            setSelectedSearchResult({ type: 'student', data: st });
                            setIsSearchOpen(false);
                          }}
                          className="p-2.5 rounded-xl border border-slate-200/80 hover:border-blue-900 hover:bg-blue-50/60 transition cursor-pointer flex items-center justify-between gap-2 group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-blue-950 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                              {st.firstName[0]}{st.lastName[0]}
                            </div>
                            <div className="min-w-0">
                              <span className="font-bold text-xs text-slate-900 block truncate group-hover:text-blue-950">
                                {st.firstName} {st.lastName}
                              </span>
                              <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                                <span className="text-blue-900 font-semibold">{st.admissionNo}</span>
                                <span>&bull;</span>
                                <span className="truncate">{st.grade}</span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className={`text-[10px] font-bold block ${balance > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                              {balance > 0 ? `KES ${balance.toLocaleString()}` : 'Cleared'}
                            </span>
                            <span className="text-[10px] text-slate-400">{st.attendanceRate}% Att.</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Matched Teachers */}
              {(searchCategoryFilter === 'All' || searchCategoryFilter === 'Teachers') && searchResults.teachers.length > 0 && (
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-emerald-900">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Teachers & Faculty ({searchResults.teachers.length})</span>
                    </span>
                    <button
                      onClick={() => {
                        setActiveTab('teachers');
                        setIsSearchOpen(false);
                      }}
                      className="text-[10px] text-emerald-700 hover:underline font-bold"
                    >
                      View in Teachers Tab &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResults.teachers.map(t => (
                      <div
                        key={t.id}
                        onClick={() => {
                          setSelectedSearchResult({ type: 'teacher', data: t });
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl border border-slate-200/80 hover:border-emerald-700 hover:bg-emerald-50/60 transition cursor-pointer flex items-center justify-between gap-2 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                            {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-xs text-slate-900 block truncate group-hover:text-emerald-900">
                              {t.name}
                            </span>
                            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                              <span className="text-emerald-800 font-semibold">{t.staffId}</span>
                              <span>&bull;</span>
                              <span className="truncate">{t.department}</span>
                            </div>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
                          {t.subjects[0]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Classes */}
              {(searchCategoryFilter === 'All' || searchCategoryFilter === 'Classes') && searchResults.classes.length > 0 && (
                <div className="p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-600" />
                      <span>Classes & Streams ({searchResults.classes.length})</span>
                    </span>
                    <button
                      onClick={() => {
                        setActiveTab('attendance');
                        setIsSearchOpen(false);
                      }}
                      className="text-[10px] text-amber-700 hover:underline font-bold"
                    >
                      Open Attendance &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResults.classes.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          setSelectedSearchResult({ type: 'class', data: c });
                          setIsSearchOpen(false);
                        }}
                        className="p-2.5 rounded-xl border border-slate-200/80 hover:border-amber-600 hover:bg-amber-50/60 transition cursor-pointer flex items-center justify-between gap-2 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-amber-500 text-blue-950 font-bold text-xs flex items-center justify-center shrink-0">
                            <DoorOpen className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-bold text-xs text-slate-900 block truncate group-hover:text-amber-900">
                              {c.name}
                            </span>
                            <div className="text-[10px] text-slate-500">
                              {c.roomNumber} &bull; Teacher: {c.classTeacherName}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[11px] font-mono font-bold text-blue-950 block">
                            {c.enrolled} / {c.capacity}
                          </span>
                          <span className="text-[9px] text-slate-400">Capacity</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                isActive
                  ? 'bg-blue-950 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${isActive ? 'bg-amber-400 text-blue-950 font-black' : 'bg-slate-100 text-slate-600'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Conditional Sub-Views */}
      {activeTab === 'students' && <StudentManagement />}
      {activeTab === 'teachers' && <TeacherManagement />}
      {activeTab === 'fees' && <FeesManagement />}
      {activeTab === 'exams' && <ExamsResults />}
      {activeTab === 'attendance' && <AttendanceManagement />}

      {/* Main Overview Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Executive Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Total Students */}
            <div
              onClick={() => setActiveTab('students')}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-900 transition cursor-pointer group"
            >
              <div className="flex justify-between items-center text-slate-500 text-xs font-semibold mb-2">
                <span>Total Students</span>
                <Users className="w-4 h-4 text-blue-900 group-hover:scale-110 transition" />
              </div>
              <div className="text-3xl font-black text-slate-900 font-mono">{totalStudents}</div>
              <div className="text-[11px] text-blue-800 font-medium mt-1">Manage scholars &rarr;</div>
            </div>

            {/* Total Teachers */}
            <div
              onClick={() => setActiveTab('teachers')}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-900 transition cursor-pointer group"
            >
              <div className="flex justify-between items-center text-slate-500 text-xs font-semibold mb-2">
                <span>Total Faculty</span>
                <Briefcase className="w-4 h-4 text-blue-900 group-hover:scale-110 transition" />
              </div>
              <div className="text-3xl font-black text-slate-900 font-mono">{totalTeachers}</div>
              <div className="text-[11px] text-blue-800 font-medium mt-1">Academic staff &rarr;</div>
            </div>

            {/* Total Classes */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
              <div className="flex justify-between items-center text-slate-500 text-xs font-semibold mb-2">
                <span>Active Classes</span>
                <Layers className="w-4 h-4 text-blue-900" />
              </div>
              <div className="text-3xl font-black text-slate-900 font-mono">{totalClasses}</div>
              <div className="text-[11px] text-slate-500 mt-1">Grade 7 to Grade 10</div>
            </div>

            {/* Average Attendance */}
            <div
              onClick={() => setActiveTab('attendance')}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-900 transition cursor-pointer group"
            >
              <div className="flex justify-between items-center text-slate-500 text-xs font-semibold mb-2">
                <span>Attendance</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition" />
              </div>
              <div className="text-3xl font-black text-emerald-700 font-mono">{averageAttendance}%</div>
              <div className="text-[11px] text-emerald-600 font-medium mt-1">Daily average &rarr;</div>
            </div>

            {/* Fee Payments Collected */}
            <div
              onClick={() => setActiveTab('fees')}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-900 transition cursor-pointer group"
            >
              <div className="flex justify-between items-center text-slate-500 text-xs font-semibold mb-2">
                <span>Fees Collected</span>
                <DollarSign className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
                KES {(totalCollected / 1000).toFixed(0)}k
              </div>
              <div className="text-[11px] text-slate-500 mt-1">Recorded receipts &rarr;</div>
            </div>

            {/* Outstanding Fees */}
            <div
              onClick={() => setActiveTab('fees')}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-900 transition cursor-pointer group"
            >
              <div className="flex justify-between items-center text-slate-500 text-xs font-semibold mb-2">
                <span>Outstanding Fees</span>
                <AlertTriangle className="w-4 h-4 text-amber-600 group-hover:scale-110 transition" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-amber-700 font-mono">
                KES {(totalOutstanding / 1000).toFixed(0)}k
              </div>
              <div className="text-[11px] text-amber-700 font-medium mt-1">Pending fees &rarr;</div>
            </div>
          </div>

          {/* Academic Year Fee Payment Trends Line Chart */}
          <FeeTrendsChart />

          {/* Academic & Financial Status Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Class Distribution & Exam Metrics */}
            <div className="lg:col-span-7 space-y-6">
              {/* Classes & Streams Capacity Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900">
                      Class Streams & Enrollment Capacity
                    </h3>
                    <p className="text-xs text-slate-500">Live roster metrics across all wings</p>
                  </div>
                  <span className="text-xs font-bold text-blue-950 font-mono bg-blue-50 px-2.5 py-1 rounded-lg">
                    {students.length} Total Scholars
                  </span>
                </div>

                <div className="space-y-3">
                  {classes.map(cls => (
                    <div key={cls.id} className="p-3 bg-slate-50 rounded-xl space-y-1.5">
                      <div className="flex justify-between text-xs font-bold text-slate-800">
                        <span>{cls.name} ({cls.roomNumber})</span>
                        <span className="font-mono text-blue-950">
                          {cls.enrolled} / {cls.capacity} scholars ({Math.round((cls.enrolled / cls.capacity) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-blue-900 h-2 rounded-full"
                          style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-[11px] text-slate-500 flex justify-between">
                        <span>Class Teacher: <strong>{cls.classTeacherName}</strong></span>
                        <span className="text-amber-700 font-medium">Available Seats: {cls.capacity - cls.enrolled}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Examination Performance Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-900">
                      Academic Examination Results
                    </h3>
                    <p className="text-xs text-slate-500">Overall academic progress for Term 2 / Term 3</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('exams')}
                    className="text-xs font-bold text-blue-900 hover:underline"
                  >
                    View All Reports &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="text-slate-500 block">Academy Mean Score</span>
                    <span className="text-2xl font-black text-blue-950 font-mono">{meanExamScore}%</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
                    <span className="text-slate-500 block">Leading Grade</span>
                    <span className="text-2xl font-black text-amber-800">Grade A</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                    <span className="text-slate-500 block">Generated Reports</span>
                    <span className="text-2xl font-black text-emerald-800 font-mono">{reports.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Recent Activity & Announcements */}
            <div className="lg:col-span-5 space-y-6">
              {/* Activity Feed */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    Recent Administrative Activity
                  </h3>
                  <span className="text-[11px] text-slate-400 font-semibold">Live System Audit</span>
                </div>

                <div className="space-y-3">
                  {activities.map((act, idx) => {
                    const Icon = act.icon;
                    return (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                        <div className={`p-2 rounded-xl shrink-0 ${act.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-800 truncate">{act.title}</span>
                            <span className="text-[10px] text-slate-400 shrink-0">{act.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 line-clamp-2 leading-tight">
                            {act.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Announcements Snapshot */}
              <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="font-serif font-bold text-base text-amber-400">
                    Active Announcements & Circulars
                  </h3>
                  <span className="text-xs text-slate-400">{announcements.length} Published</span>
                </div>

                <div className="space-y-3">
                  {announcements.slice(0, 3).map(ann => (
                    <div key={ann.id} className="p-3 bg-slate-800 rounded-xl space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="px-2 py-0.5 rounded-full bg-blue-900 text-amber-300 text-[10px] font-bold">
                          {ann.category}
                        </span>
                        <span className="text-[10px] text-slate-400">{ann.date}</span>
                      </div>
                      <h4 className="font-bold text-xs text-white leading-tight">{ann.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2">{ann.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                <span>Current Password:</span>
                <strong className="font-mono text-blue-950 bg-slate-200 px-1.5 py-0.5 rounded">{adminPassword}</strong>
              </div>
              <p className="text-[11px] text-slate-500">
                Update the master administrator password for {SCHOOL_NAME}. This will be required for administrative login.
              </p>
            </div>

            {passwordSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleSavePassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  New Admin Password *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jimmy@Gaithainga2026"
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

      {/* School Logo & Branding Modal */}
      {showLogoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-300 space-y-5 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900">
                    School Logo & Crest
                  </h3>
                  <p className="text-xs text-slate-500">
                    Customize the official logo for DR JOSEPH JIMMY GAITHAINGA ACADEMY SCHOOL
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowLogoModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {logoSuccessMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{logoSuccessMessage}</span>
              </div>
            )}

            {/* Live Preview Area */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Live Logo Preview
              </span>
              <div className="flex flex-col sm:flex-row items-center justify-around gap-4 p-3 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center gap-3">
                  <SchoolLogo size="lg" overrideLogoUrl={logoPreview} showText={false} />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Large (Reports & Docs)</span>
                    <span className="text-[10px] text-slate-400">64x64px circular emblem</span>
                  </div>
                </div>

                <div className="h-8 w-px bg-slate-200 hidden sm:block" />

                <div className="flex items-center gap-2.5">
                  <SchoolLogo size="md" overrideLogoUrl={logoPreview} showText={false} />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Standard (Navbar & Header)</span>
                    <span className="text-[10px] text-slate-400">44x44px standard crest</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Logo Options */}
            <form onSubmit={handleSaveLogo} className="space-y-4 text-xs">
              {/* Option A: File Upload */}
              <div className="space-y-2">
                <label className="block font-semibold text-slate-800">
                  Option 1: Upload Image File (PNG, JPG, SVG, WebP)
                </label>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 rounded-xl font-bold transition flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4 text-blue-800" />
                    <span>Choose Image from Device</span>
                  </button>
                  <span className="text-[11px] text-slate-400">
                    Max size: 2MB (stored locally)
                  </span>
                </div>
              </div>

              {/* Option B: Direct URL */}
              <div className="space-y-1.5 pt-2 border-t">
                <label className="block font-semibold text-slate-800">
                  Option 2: Or Paste Online Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/school-logo.png"
                    value={logoInput}
                    onChange={e => {
                      setLogoInput(e.target.value);
                      setLogoPreview(e.target.value.trim() || null);
                    }}
                    className="flex-1 px-3 py-2 border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-900 font-mono text-xs"
                  />
                  {logoInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setLogoInput('');
                        setLogoPreview(null);
                      }}
                      className="px-2.5 py-1 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Quick instructions & Code info */}
              <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-[11px] text-amber-900 space-y-1 leading-relaxed">
                <p className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  <span>How It Works:</span>
                </p>
                <p>
                  Uploading or setting a URL updates the logo instantly across the entire school website (Navbar, Footer, Admin, Teacher, Student, and Parent portals, Fee Receipts, and Academic Report Cards).
                </p>
                <p className="text-[10px] text-amber-800/80 pt-1 border-t border-amber-200/60">
                  <strong>Permanent Code Option:</strong> You can also replace the default SVG or add a static file in <code className="bg-amber-100 px-1 rounded font-mono">public/logo.png</code> or edit <code className="bg-amber-100 px-1 rounded font-mono">src/components/common/SchoolLogo.tsx</code>.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t">
                <button
                  type="button"
                  onClick={handleResetToDefaultLogo}
                  className="px-3.5 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-bold rounded-xl border border-slate-300 transition flex items-center gap-1.5"
                  title="Revert back to the official SVG Academy Crest"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset to Official Crest</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLogoModal(false)}
                    className="px-4 py-2 border rounded-xl font-semibold hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-amber-300 font-bold rounded-xl shadow-xs transition"
                  >
                    Save & Apply Logo
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Search Result Detail Modal */}
      {selectedSearchResult && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-300 space-y-4 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                {selectedSearchResult.type === 'student' && <GraduationCap className="w-5 h-5 text-blue-950" />}
                {selectedSearchResult.type === 'teacher' && <Briefcase className="w-5 h-5 text-emerald-800" />}
                {selectedSearchResult.type === 'class' && <DoorOpen className="w-5 h-5 text-amber-600" />}
                <h3 className="font-serif font-bold text-base text-slate-900 capitalize">
                  {selectedSearchResult.type === 'student' && 'Student Profile Summary'}
                  {selectedSearchResult.type === 'teacher' && 'Faculty Member Profile'}
                  {selectedSearchResult.type === 'class' && 'Class & Stream Details'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSearchResult(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Student Preview */}
            {selectedSearchResult.type === 'student' && (() => {
              const st = selectedSearchResult.data as Student;
              const balance = st.totalFees - st.paidFees;
              return (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3 p-3 bg-blue-50/70 rounded-2xl border border-blue-200">
                    <div className="w-12 h-12 rounded-xl bg-blue-950 text-amber-300 font-bold text-base flex items-center justify-center font-serif">
                      {st.firstName[0]}{st.lastName[0]}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{st.firstName} {st.lastName}</h4>
                      <p className="font-mono text-blue-950 text-xs">
                        ID: {st.admissionNo} &bull; Stream: <strong className="text-amber-800">{st.grade}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-slate-50 rounded-xl border">
                      <span className="text-slate-500 block text-[10px]">Fee Balance</span>
                      <span className={`font-mono font-bold text-sm ${balance > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                        {balance > 0 ? `KES ${balance.toLocaleString()}` : 'Fully Cleared'}
                      </span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border">
                      <span className="text-slate-500 block text-[10px]">Attendance Rate</span>
                      <span className="font-mono font-bold text-sm text-blue-950">{st.attendanceRate}%</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border space-y-1 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Parent / Guardian:</span>
                      <span className="font-semibold text-slate-900">{st.parentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact Phone:</span>
                      <span className="font-mono text-slate-900">{st.parentPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email:</span>
                      <span className="text-slate-900">{st.parentEmail || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Residential Address:</span>
                      <span className="text-slate-900">{st.address}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSearchResult(null);
                        setActiveTab('students');
                      }}
                      className="px-4 py-2 bg-blue-950 text-white font-bold rounded-xl text-xs hover:bg-blue-900 transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Open in Students Directory</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSearchResult(null)}
                      className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl text-xs hover:bg-slate-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Teacher Preview */}
            {selectedSearchResult.type === 'teacher' && (() => {
              const t = selectedSearchResult.data as Teacher;
              return (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3 p-3 bg-emerald-50/70 rounded-2xl border border-emerald-200">
                    <div className="w-12 h-12 rounded-xl bg-emerald-800 text-white font-bold text-base flex items-center justify-center font-serif">
                      {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                      <p className="font-mono text-emerald-900 text-xs">
                        Staff ID: {t.staffId} &bull; Dept: <strong className="text-blue-950">{t.department}</strong>
                      </p>
                      <span className="text-[11px] text-slate-600 block">{t.title}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border space-y-1 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Qualifications:</span>
                      <span className="font-medium text-slate-900">{t.qualification}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Email:</span>
                      <span className="text-slate-900">{t.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Phone:</span>
                      <span className="font-mono text-slate-900">{t.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 block text-[11px]">Assigned Subjects & Streams:</span>
                    <div className="flex flex-wrap gap-1">
                      {t.subjects.map((s, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {s}
                        </span>
                      ))}
                      {t.classesAssigned.map((c, idx) => (
                        <span key={idx} className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSearchResult(null);
                        setActiveTab('teachers');
                      }}
                      className="px-4 py-2 bg-emerald-800 text-white font-bold rounded-xl text-xs hover:bg-emerald-700 transition flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Open in Teachers Directory</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSearchResult(null)}
                      className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl text-xs hover:bg-slate-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Class Preview */}
            {selectedSearchResult.type === 'class' && (() => {
              const c = selectedSearchResult.data as ClassStream;
              return (
                <div className="space-y-4 text-xs">
                  <div className="flex items-center gap-3 p-3 bg-amber-50/70 rounded-2xl border border-amber-200">
                    <div className="w-12 h-12 rounded-xl bg-amber-500 text-blue-950 font-bold text-base flex items-center justify-center">
                      <DoorOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                      <p className="text-slate-600 text-xs">
                        Room: <strong className="text-blue-950">{c.roomNumber}</strong> &bull; Level: {c.gradeLevel}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 bg-slate-50 rounded-xl border">
                      <span className="text-slate-500 block text-[10px]">Enrollment</span>
                      <span className="font-mono font-bold text-sm text-blue-950">{c.enrolled} / {c.capacity}</span>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-xl border">
                      <span className="text-slate-500 block text-[10px]">Utilization</span>
                      <span className="font-mono font-bold text-sm text-amber-800">
                        {Math.round((c.enrolled / c.capacity) * 100)}%
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border space-y-1 text-slate-700">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Class Teacher:</span>
                      <span className="font-semibold text-slate-900">{c.classTeacherName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Available Vacancies:</span>
                      <span className="font-bold text-emerald-700">{c.capacity - c.enrolled} seats</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedSearchResult(null);
                        setActiveTab('attendance');
                      }}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl text-xs transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Open Attendance Register</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedSearchResult(null)}
                      className="px-4 py-2 bg-slate-200 text-slate-800 font-bold rounded-xl text-xs hover:bg-slate-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
