import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../common/SchoolLogo';
import { AttendanceManagement } from '../dashboard/AttendanceManagement';
import { ExamsResults } from '../dashboard/ExamsResults';
import { SCHOOL_NAME } from '../../data/initialData';
import {
  Briefcase,
  Users,
  CheckCircle2,
  Award,
  Calendar,
  BookOpen,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';

export const TeacherPortal: React.FC = () => {
  const { userSession, teachers, classes, students } = useSchool();
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'marks'>('overview');

  const currentTeacher = teachers.find(t => t.id === userSession?.associatedId) || teachers[0];

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-500/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 font-serif font-bold text-xl shadow-md ring-2 ring-amber-400">
              {currentTeacher?.name?.split(' ').map(n => n[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[11px] font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Teacher & Faculty Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
                {currentTeacher?.name}
              </h1>
              <p className="text-xs text-blue-200 mt-1">
                {currentTeacher?.title} &bull; {currentTeacher?.department} Department &bull; {SCHOOL_NAME}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('attendance')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition"
            >
              Take Roll Call
            </button>
            <button
              onClick={() => setActiveTab('marks')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold text-xs rounded-xl shadow-xs transition"
            >
              Enter Exam Marks
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'overview'
              ? 'bg-blue-950 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Briefcase className="w-4 h-4 text-amber-400" />
          <span>My Teaching Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('attendance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'attendance'
              ? 'bg-blue-950 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Daily Class Attendance</span>
        </button>

        <button
          onClick={() => setActiveTab('marks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
            activeTab === 'marks'
              ? 'bg-blue-950 text-white shadow-md'
              : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>Examinations & Grading</span>
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold block">Assigned Subjects</span>
              <div className="space-y-1">
                {currentTeacher.subjects.map((s, idx) => (
                  <div key={idx} className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-900" />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold block">Allocated Classes</span>
              <div className="space-y-1">
                {currentTeacher.classesAssigned.map((c, idx) => (
                  <div key={idx} className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 font-semibold block">Staff Coordinates</span>
              <div className="text-xs text-slate-700 space-y-1">
                <div>Email: <strong className="text-slate-900">{currentTeacher.email}</strong></div>
                <div>Phone: <strong className="text-slate-900">{currentTeacher.phone}</strong></div>
                <div>Staff ID: <strong className="text-blue-950 font-mono">{currentTeacher.staffId}</strong></div>
              </div>
            </div>
          </div>

          {/* Quick Roster for teacher's primary stream */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Primary Class Roster ({currentTeacher.classesAssigned[0] || 'Grade 7 East'})
              </h3>
              <button
                onClick={() => setActiveTab('attendance')}
                className="text-xs font-bold text-blue-900 hover:underline"
              >
                Mark Attendance &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {students
                .filter(s => currentTeacher.classesAssigned.includes(s.grade))
                .slice(0, 6)
                .map(st => (
                  <div key={st.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{st.firstName} {st.lastName}</span>
                      <span className="font-mono text-[11px] text-slate-500">{st.admissionNo} &bull; {st.grade}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {st.attendanceRate}% Att.
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'attendance' && <AttendanceManagement />}
      {activeTab === 'marks' && <ExamsResults />}
    </div>
  );
};
