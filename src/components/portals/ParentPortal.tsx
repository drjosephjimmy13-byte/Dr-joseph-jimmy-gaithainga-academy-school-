import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SchoolLogo } from '../common/SchoolLogo';
import { ExamReport, FeePayment } from '../../types';
import {
  SCHOOL_NAME,
  SCHOOL_PHONE,
  SCHOOL_PHONE_CLEAN,
  SCHOOL_EMAIL,
  SCHOOL_LOCATION
} from '../../data/initialData';
import {
  Users,
  CheckCircle2,
  DollarSign,
  Award,
  CreditCard,
  MessageCircle,
  Mail,
  Printer,
  Sparkles,
  AlertTriangle,
  Clock,
  BookOpen
} from 'lucide-react';

export const ParentPortal: React.FC = () => {
  const { userSession, students, reports, payments } = useSchool();

  // Find the child associated with this parent
  const child = students.find(s => s.id === userSession?.associatedId) || students[0];
  const childReports = reports.filter(r => r.studentId === child.id);
  const childPayments = payments.filter(p => p.studentId === child.id);
  const latestReport = childReports[0];

  const feeBalance = child.totalFees - child.paidFees;
  const [activeReportModal, setActiveReportModal] = useState<ExamReport | null>(null);

  const whatsappInquiryUrl = `https://wa.me/${SCHOOL_PHONE_CLEAN}?text=${encodeURIComponent(
    `Hello ${SCHOOL_NAME} Accounts & Administration,\nI am ${child.parentName}, parent to ${child.firstName} ${child.lastName} (${child.admissionNo}, ${child.grade}).\nI would like to inquire about fee payment and academic progress.`
  )}`;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-500/40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-amber-300 font-serif font-bold text-xl shadow-md ring-2 ring-amber-400">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Parent & Guardian Gateway</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tight text-white">
                {child.parentName}
              </h1>
              <p className="text-xs text-blue-200 mt-1">
                Guardian to: <strong className="text-white">{child.firstName} {child.lastName}</strong> &bull; {child.grade} &bull; {SCHOOL_NAME}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp School Desk</span>
            </a>

            {latestReport && (
              <button
                onClick={() => setActiveReportModal(latestReport)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold text-xs rounded-xl shadow-md flex items-center gap-2 transition"
              >
                <Award className="w-4 h-4 text-blue-950" />
                <span>Child Report Card</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Child Metrics Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Academic Position</span>
          <div className="text-2xl font-black text-blue-950 font-mono">
            {latestReport ? `#${latestReport.classPosition}` : 'Top Tier'}
          </div>
          <span className="text-[11px] text-slate-500">In class of {latestReport?.totalStudents || 38}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Mean Score & Grade</span>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            {latestReport ? `${latestReport.meanScore}%` : '86%'}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Grade {latestReport?.overallGrade || 'A'}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Class Attendance</span>
          <div className="text-2xl font-black text-blue-950 font-mono">{child.attendanceRate}%</div>
          <span className="text-[11px] text-emerald-600 font-medium">Regular attendance</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-xs text-slate-500 font-semibold block">Outstanding Fee</span>
          <div className="text-2xl font-black font-mono">
            {feeBalance <= 0 ? (
              <span className="text-emerald-700">Cleared</span>
            ) : (
              <span className="text-red-700">KES {feeBalance.toLocaleString()}</span>
            )}
          </div>
          <span className="text-[11px] text-slate-500">Total Billed: KES {child.totalFees.toLocaleString()}</span>
        </div>
      </div>

      {/* Two Column Grid: Fee Statement + Academic Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Fee Statement & Payment Portal */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-950" />
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Fee Statement & Receipts
              </h3>
            </div>
            {feeBalance <= 0 ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Fully Paid
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                Balance Due
              </span>
            )}
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600">Total Term 3 Fees:</span>
              <span className="font-bold text-slate-900 font-mono">KES {child.totalFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Total Amount Cleared:</span>
              <span className="font-bold text-emerald-700 font-mono">KES {child.paidFees.toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pt-2 font-bold text-sm">
              <span className="text-slate-800">Remaining Balance:</span>
              <span className={`font-mono ${feeBalance > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                KES {Math.max(0, feeBalance).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Payment Receipts History */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Verified Payment Receipts
            </h4>
            {childPayments.length > 0 ? (
              <div className="space-y-2">
                {childPayments.map(p => (
                  <div key={p.id} className="p-3 bg-blue-50/50 rounded-xl border border-blue-200 text-xs flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-blue-950 block">{p.receiptNo}</span>
                      <span className="text-[11px] text-slate-500">{p.date} &bull; {p.paymentMethod} ({p.transactionRef})</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-700 text-sm">
                      KES {p.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No payments logged yet.</p>
            )}
          </div>

          {/* Quick Pay Instructions */}
          <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2 text-xs">
            <span className="font-bold text-amber-400 block">How to Pay Fees via M-Pesa:</span>
            <p className="text-slate-300">
              Go to Lipa na M-Pesa &gt; <strong>Paybill: 400200</strong> &gt; Account: <strong>{child.admissionNo}</strong>.
            </p>
            <p className="text-slate-400 text-[11px]">
              Receipt is automatically generated and sent to {child.parentPhone}.
            </p>
          </div>
        </div>

        {/* Academic Progress & Teacher Comments */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif font-bold text-lg text-slate-900">
                Academic Results & Appraisals
              </h3>
            </div>
            {latestReport && (
              <button
                onClick={() => setActiveReportModal(latestReport)}
                className="text-xs font-bold text-blue-900 hover:underline"
              >
                Print Report Card &rarr;
              </button>
            )}
          </div>

          {latestReport ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-blue-950 block text-sm">{latestReport.examType}</span>
                  <span className="text-slate-600">{latestReport.term} &bull; Position #{latestReport.classPosition} of {latestReport.totalStudents}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-amber-700 block font-mono">{latestReport.meanScore}%</span>
                  <span className="text-xs font-bold text-blue-950">Grade {latestReport.overallGrade}</span>
                </div>
              </div>

              {/* Class Teacher Remark */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
                <span className="font-bold text-slate-800 block">Class Teacher's Remark:</span>
                <p className="text-slate-600 italic">"{latestReport.classTeacherRemarks}"</p>
              </div>

              {/* Principal Remark */}
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200 space-y-1 text-xs">
                <span className="font-bold text-amber-950 block">Headteacher's Comment:</span>
                <p className="text-slate-700 italic">"{latestReport.headTeacherRemarks}"</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveReportModal(latestReport)}
                  className="w-full py-3 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>View Official School Report Card</span>
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-400 italic">No terminal report cards published yet.</p>
          )}
        </div>
      </div>

      {/* Printable Report Modal */}
      {activeReportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-300 space-y-4 printable-card max-h-[90vh] overflow-y-auto">
            <div className="border-b-2 border-blue-950 pb-3 text-center space-y-1">
              <SchoolLogo size="md" showText={false} />
              <h3 className="text-lg font-serif font-black uppercase text-blue-950">{SCHOOL_NAME}</h3>
              <p className="text-[11px] text-slate-600">{SCHOOL_LOCATION}</p>
              <div className="inline-block px-3 py-0.5 bg-blue-950 text-amber-300 text-xs font-bold rounded">
                Official Report Card - {activeReportModal.term}
              </div>
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
                  <th className="p-2">Teacher Remarks</th>
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
                Print Report Card
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
