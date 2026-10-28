import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../common/SchoolLogo';
import { ExamReport } from '../../types';
import {
  SCHOOL_NAME,
  SCHOOL_PHONE,
  SCHOOL_EMAIL,
  SCHOOL_LOCATION
} from '../../data/initialData';
import {
  GraduationCap,
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  Printer,
  Sparkles,
  DollarSign,
  AlertCircle
} from 'lucide-react';

export const StudentPortal: React.FC = () => {
  const { userSession, students, reports, announcements } = useSchool();

  const currentStudent = students.find(s => s.id === userSession?.associatedId) || students[0];
  const studentReports = reports.filter(r => r.studentId === currentStudent.id);
  const latestReport = studentReports[0];

  const [activeReportModal, setActiveReportModal] = useState<ExamReport | null>(null);

  const feeBalance = currentStudent.totalFees - currentStudent.paidFees;

  // Student schedule
  const todayClasses = [
    { time: '08:00 - 09:30 AM', subject: 'Mathematics', room: 'Room 101', teacher: 'Mr. David Kariuki' },
    { time: '09:30 - 10:15 AM', subject: 'English Language', room: 'Room 101', teacher: 'Ms. Grace Muthoni' },
    { time: '10:45 - 12:15 PM', subject: 'Integrated Science Lab', room: 'Science Lab 2', teacher: 'Dr. Samuel Ochieng' },
    { time: '02:00 - 02:45 PM', subject: 'Computer Coding (Python)', room: 'STEM Lab', teacher: 'Mr. Patrick Kiprono' },
    { time: '02:45 - 03:30 PM', subject: 'Sports & Football Practice', room: 'Main Field', teacher: 'Sports Director' }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-500/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 font-serif font-bold text-xl shadow-md ring-2 ring-amber-400">
              {currentStudent.firstName[0]}{currentStudent.lastName[0]}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-400/20 text-blue-200 text-[11px] font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Student Scholar Portal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
                {currentStudent.firstName} {currentStudent.lastName}
              </h1>
              <p className="text-xs text-blue-200 mt-1">
                Admission No: <strong className="text-amber-300 font-mono">{currentStudent.admissionNo}</strong> &bull; Class: <strong className="text-white">{currentStudent.grade}</strong> &bull; {SCHOOL_NAME}
              </p>
            </div>
          </div>

          {latestReport && (
            <button
              onClick={() => setActiveReportModal(latestReport)}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
            >
              <Award className="w-4 h-4 text-blue-950" />
              <span>View My Report Card</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Class Position</span>
          <div className="text-2xl font-black text-blue-950 font-mono">
            {latestReport ? `#${latestReport.classPosition}` : 'N/A'}
          </div>
          <span className="text-[11px] text-slate-500">of {latestReport?.totalStudents || 36} scholars</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Mean Score</span>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            {latestReport ? `${latestReport.meanScore}%` : '88%'}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Grade {latestReport?.overallGrade || 'A'}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Attendance Score</span>
          <div className="text-2xl font-black text-blue-950 font-mono">{currentStudent.attendanceRate}%</div>
          <span className="text-[11px] text-emerald-600 font-medium">Excellent record</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Fee Clearance</span>
          <div className="text-2xl font-black font-mono">
            {feeBalance <= 0 ? (
              <span className="text-emerald-700">100% Cleared</span>
            ) : (
              <span className="text-amber-700">KES {feeBalance.toLocaleString()}</span>
            )}
          </div>
          <span className="text-[11px] text-slate-500">Term 3 Billing</span>
        </div>
      </div>

      {/* Two Column Grid: Today's Timetable + Exam Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Today's Timetable */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Today's Learning Schedule
              </h3>
              <p className="text-xs text-slate-500">Stream: {currentStudent.grade}</p>
            </div>
            <span className="text-xs text-blue-900 font-bold bg-blue-50 px-2.5 py-1 rounded-lg">
              Term 3 Active
            </span>
          </div>

          <div className="space-y-3">
            {todayClasses.map((item, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{item.subject}</span>
                    <span className="px-2 py-0.2 bg-blue-100 text-blue-950 rounded text-[10px] font-semibold">{item.room}</span>
                  </div>
                  <span className="text-slate-500 text-[11px] block">Instructor: {item.teacher}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono font-bold text-blue-950 bg-white px-2.5 py-1 rounded-lg border">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Performance Snapshot */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="font-serif font-bold text-lg text-slate-900">
              Recent Subject Scores
            </h3>
            {latestReport && (
              <span className="text-xs font-bold text-amber-700 font-mono">
                Overall: {latestReport.overallGrade}
              </span>
            )}
          </div>

          {latestReport ? (
            <div className="space-y-2 text-xs">
              {latestReport.subjects.slice(0, 6).map((sub, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="font-semibold text-slate-800">{sub.subjectName}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{sub.score}%</span>
                    <span className="w-7 text-center font-bold px-1 py-0.5 bg-blue-900 text-amber-300 rounded text-[10px]">
                      {sub.grade}
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <button
                  onClick={() => setActiveReportModal(latestReport)}
                  className="w-full py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition text-center"
                >
                  View Full Official Report Card &rarr;
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No exams recorded yet for this scholar.</p>
          )}
        </div>
      </div>

      {/* Report Card Modal for Student */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-300 space-y-4 printable-card max-h-[90vh] overflow-y-auto">
            <div className="border-b-2 border-blue-950 pb-3 text-center space-y-1">
              <SchoolLogo size="md" showText={false} />
              <h3 className="text-lg font-serif font-black uppercase text-blue-950">{SCHOOL_NAME}</h3>
              <p className="text-[11px] text-slate-600">Official Student Progress Report</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs p-3 bg-slate-50 rounded-xl border">
              <div>Student: <strong>{activeReportModal.studentName}</strong></div>
              <div>Admission No: <strong>{activeReportModal.admissionNo}</strong></div>
              <div>Class: <strong>{activeReportModal.grade}</strong></div>
              <div>Position: <strong>#{activeReportModal.classPosition} of {activeReportModal.totalStudents}</strong></div>
            </div>

            <table className="w-full text-xs text-left border">
              <thead className="bg-blue-950 text-white font-bold">
                <tr>
                  <th className="p-2">Subject</th>
                  <th className="p-2 text-center">Score</th>
                  <th className="p-2 text-center">Grade</th>
                  <th className="p-2">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {activeReportModal.subjects.map((s, i) => (
                  <tr key={i}>
                    <td className="p-2 font-semibold">{s.subjectName}</td>
                    <td className="p-2 text-center font-mono font-bold">{s.score}</td>
                    <td className="p-2 text-center font-bold text-blue-950">{s.grade}</td>
                    <td className="p-2 text-[11px] italic text-slate-600">{s.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pt-2 flex justify-end gap-2 no-print">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-950 text-white rounded-xl text-xs font-bold"
              >
                Print Report
              </button>
              <button
                onClick={() => setActiveReportModal(null)}
                className="px-4 py-2 bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
