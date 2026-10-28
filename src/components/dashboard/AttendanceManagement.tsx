import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  Save,
  Users,
  BarChart2,
  TrendingUp,
  Filter
} from 'lucide-react';

export const AttendanceManagement: React.FC = () => {
  const { classes, students, attendance, saveAttendance } = useSchool();
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'c1');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  const currentClass = classes.find(c => c.id === selectedClassId) || classes[0];
  const classStudents = students.filter(s => s.grade === currentClass.name);

  // Existing attendance for selected class & date or default to 'Present'
  const existingRecord = attendance.find(
    a => a.classId === selectedClassId && a.date === selectedDate
  );

  const [register, setRegister] = useState<Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'>>(() => {
    const initial: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'> = {};
    classStudents.forEach(st => {
      const recorded = existingRecord?.records.find(r => r.studentId === st.id);
      initial[st.id] = recorded ? recorded.status : 'Present';
    });
    return initial;
  });

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent' | 'Late' | 'Excused') => {
    setRegister(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAllPresent = () => {
    const allPresent: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'> = {};
    classStudents.forEach(st => {
      allPresent[st.id] = 'Present';
    });
    setRegister(allPresent);
  };

  const handleSaveAttendance = () => {
    const records = classStudents.map(st => ({
      studentId: st.id,
      studentName: `${st.firstName} ${st.lastName}`,
      admissionNo: st.admissionNo,
      status: register[st.id] || 'Present'
    }));

    saveAttendance(currentClass.id, currentClass.name, selectedDate, records);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Stats calculation
  const total = classStudents.length;
  const presentCount = classStudents.filter(st => (register[st.id] || 'Present') === 'Present').length;
  const absentCount = classStudents.filter(st => register[st.id] === 'Absent').length;
  const lateCount = classStudents.filter(st => register[st.id] === 'Late').length;
  const excusedCount = classStudents.filter(st => register[st.id] === 'Excused').length;
  const presentRate = total > 0 ? Math.round((presentCount / total) * 100) : 100;

  return (
    <div className="space-y-8">
      {/* Attendance Header & Date selection */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold mb-1">
            Daily Roll Call & Register
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Class Attendance Management
          </h2>
          <p className="text-xs text-slate-500">
            Track daily presence, late arrivals, excused leaves, and historical monthly trends.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Select Class</label>
            <select
              value={selectedClassId}
              onChange={e => {
                setSelectedClassId(e.target.value);
                // Reset register for that class
                const cl = classes.find(c => c.id === e.target.value);
                const studs = students.filter(s => s.grade === cl?.name);
                const init: Record<string, 'Present' | 'Absent' | 'Late' | 'Excused'> = {};
                studs.forEach(s => { init[s.id] = 'Present'; });
                setRegister(init);
              }}
              className="px-3 py-1.5 text-xs font-bold border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">Register Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
            />
          </div>
        </div>
      </div>

      {/* Daily Metrics for Selected Class */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <span className="text-[11px] text-slate-500 font-medium block">Total Roster</span>
          <span className="text-2xl font-black text-slate-900 font-mono">{total}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <span className="text-[11px] text-emerald-600 font-medium block">Present</span>
          <span className="text-2xl font-black text-emerald-700 font-mono">{presentCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <span className="text-[11px] text-red-600 font-medium block">Absent</span>
          <span className="text-2xl font-black text-red-700 font-mono">{absentCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <span className="text-[11px] text-amber-600 font-medium block">Late</span>
          <span className="text-2xl font-black text-amber-700 font-mono">{lateCount}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs text-center col-span-2 sm:col-span-1">
          <span className="text-[11px] text-blue-600 font-medium block">Daily Rate</span>
          <span className="text-2xl font-black text-blue-950 font-mono">{presentRate}%</span>
        </div>
      </div>

      {/* Main Register Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-slate-900">
              Register for {currentClass.name} &bull; {selectedDate}
            </h3>
            <p className="text-xs text-slate-500">
              Class Teacher: {currentClass.classTeacherName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllPresent}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
            >
              Mark All Present
            </button>
            <button
              onClick={handleSaveAttendance}
              className="px-5 py-1.5 bg-blue-950 hover:bg-blue-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md transition"
            >
              <Save className="w-3.5 h-3.5 text-amber-400" />
              <span>Save Register</span>
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Attendance register successfully recorded and synced for {currentClass.name}!</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b">
                <th className="p-3">Adm No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Parent Contact</th>
                <th className="p-3 text-center">Status Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.map(st => {
                const currentStatus = register[st.id] || 'Present';
                return (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-blue-950">{st.admissionNo}</td>
                    <td className="p-3 font-semibold text-slate-900">
                      {st.firstName} {st.lastName}
                    </td>
                    <td className="p-3 text-slate-500">{st.parentPhone}</td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-1.5">
                        {(['Present', 'Absent', 'Late', 'Excused'] as const).map(status => {
                          const isCurrent = currentStatus === status;
                          return (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(st.id, status)}
                              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                                isCurrent
                                  ? status === 'Present'
                                    ? 'bg-emerald-600 text-white shadow-xs'
                                    : status === 'Absent'
                                    ? 'bg-red-600 text-white shadow-xs'
                                    : status === 'Late'
                                    ? 'bg-amber-500 text-blue-950 shadow-xs'
                                    : 'bg-blue-600 text-white shadow-xs'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {classStudents.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-400">
                    No students currently assigned to this stream.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
