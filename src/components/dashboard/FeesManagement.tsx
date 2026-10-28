import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { FeePayment, Student } from '../../types';
import { SchoolLogo } from '../common/SchoolLogo';
import { FeeTrendsChart } from './FeeTrendsChart';
import {
  SCHOOL_NAME,
  SCHOOL_PHONE,
  SCHOOL_PHONE_CLEAN,
  SCHOOL_EMAIL,
  SCHOOL_LOCATION
} from '../../data/initialData';
import {
  CreditCard,
  PlusCircle,
  Search,
  Printer,
  MessageCircle,
  FileText,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  X,
  Share2,
  Calendar
} from 'lucide-react';

export const FeesManagement: React.FC = () => {
  const { students, payments, addFeePayment } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Cleared' | 'Pending'>('All');
  
  // Payment modal state
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [payAmount, setPayAmount] = useState<number>(20000);
  const [payMethod, setPayMethod] = useState<'M-Pesa' | 'Bank Wire' | 'Cash' | 'Cheque'>('M-Pesa');
  const [payRef, setPayRef] = useState('QPX' + Math.floor(100000 + Math.random() * 900000));
  const [payTerm, setPayTerm] = useState<'Term 1' | 'Term 2' | 'Term 3'>('Term 3');
  const [payerName, setPayerName] = useState('');

  // Receipt Modal State
  const [activeReceipt, setActiveReceipt] = useState<FeePayment | null>(null);

  // Financial aggregates
  const totalBilled = students.reduce((sum, s) => sum + s.totalFees, 0);
  const totalCollected = students.reduce((sum, s) => sum + s.paidFees, 0);
  const totalOutstanding = Math.max(0, totalBilled - totalCollected);
  const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;

  const filteredStudents = students.filter(st => {
    const balance = st.totalFees - st.paidFees;
    const matchesSearch =
      st.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.grade.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'Cleared') return matchesSearch && balance <= 0;
    if (statusFilter === 'Pending') return matchesSearch && balance > 0;
    return matchesSearch;
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;

    const newPayment = addFeePayment({
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      admissionNo: student.admissionNo,
      grade: student.grade,
      amount: Number(payAmount),
      date: new Date().toISOString().split('T')[0],
      paymentMethod: payMethod,
      transactionRef: payRef,
      term: payTerm,
      academicYear: '2026',
      paidBy: payerName || student.parentName
    });

    setShowPayModal(false);
    setActiveReceipt(newPayment);
  };

  const openWhatsAppReminder = (student: Student) => {
    const balance = student.totalFees - student.paidFees;
    const phoneClean = student.parentPhone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Dear ${student.parentName},\nThis is a friendly reminder from ${SCHOOL_NAME}.\n` +
      `Scholar: ${student.firstName} ${student.lastName} (${student.admissionNo}, ${student.grade}).\n` +
      `Current Outstanding Fee Balance: KES ${balance.toLocaleString()}.\n` +
      `Kindly settle via M-Pesa Paybill: 400200, Account: ${student.admissionNo}.\n` +
      `For inquiries, reply here or call ${SCHOOL_PHONE}.\nThank you!`
    );
    window.open(`https://wa.me/${phoneClean}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Total Invoiced</span>
            <DollarSign className="w-4 h-4 text-blue-900" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            KES {totalBilled.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500">All registered scholars</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Total Collected</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            KES {totalCollected.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">{collectionRate}% collection rate</div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex justify-between items-center text-slate-500 text-xs font-semibold">
            <span>Outstanding Fees</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-700 font-mono">
            KES {totalOutstanding.toLocaleString()}
          </div>
          <div className="text-[11px] text-amber-700 font-medium">Pending collection</div>
        </div>

        <div className="bg-blue-950 text-white p-6 rounded-2xl shadow-sm space-y-3 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-xs text-blue-200 font-semibold">Quick Action</span>
            <CreditCard className="w-4 h-4 text-amber-400" />
          </div>
          <button
            onClick={() => {
              setPayRef('QPX' + Math.floor(100000 + Math.random() * 900000));
              setShowPayModal(true);
            }}
            className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record Fee Payment</span>
          </button>
        </div>
      </div>

      {/* Monthly Fee Payment Revenue Trends Line Chart */}
      <FeeTrendsChart />

      {/* Student Fee Balances Section */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-900">
              Student Fee Statements & Balances
            </h3>
            <p className="text-xs text-slate-500">
              Track student balances, generate payment reminders via WhatsApp, and view receipts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search student or adm no..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex gap-1">
              {(['All', 'Pending', 'Cleared'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setStatusFilter(tab)}
                  className={`px-3 py-1 text-xs rounded-lg font-semibold transition ${
                    statusFilter === tab
                      ? 'bg-blue-950 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table of Students & Fee status */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3">Adm No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Class / Grade</th>
                <th className="p-3">Total Invoiced</th>
                <th className="p-3">Amount Paid</th>
                <th className="p-3">Outstanding Balance</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(st => {
                const balance = st.totalFees - st.paidFees;
                const isCleared = balance <= 0;
                return (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-blue-950">{st.admissionNo}</td>
                    <td className="p-3 font-semibold text-slate-900">
                      {st.firstName} {st.lastName}
                    </td>
                    <td className="p-3 text-slate-600">{st.grade}</td>
                    <td className="p-3 font-mono">KES {st.totalFees.toLocaleString()}</td>
                    <td className="p-3 font-mono font-semibold text-emerald-700">
                      KES {st.paidFees.toLocaleString()}
                    </td>
                    <td className="p-3 font-mono font-bold">
                      {balance > 0 ? (
                        <span className="text-red-700">KES {balance.toLocaleString()}</span>
                      ) : (
                        <span className="text-emerald-700">Cleared (0)</span>
                      )}
                    </td>
                    <td className="p-3">
                      {isCleared ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                          Cleared
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                          Balance Due
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setSelectedStudentId(st.id);
                          setPayAmount(Math.max(1000, balance > 0 ? balance : 10000));
                          setPayerName(st.parentName);
                          setPayRef('QPX' + Math.floor(100000 + Math.random() * 900000));
                          setShowPayModal(true);
                        }}
                        className="px-2.5 py-1 bg-blue-900 hover:bg-blue-800 text-white rounded-md text-[11px] font-semibold"
                      >
                        Pay Fee
                      </button>

                      {balance > 0 && (
                        <button
                          onClick={() => openWhatsAppReminder(st)}
                          title="Send WhatsApp Balance Reminder to Parent"
                          className="px-2 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-md text-[11px] font-semibold inline-flex items-center gap-1"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-700" />
                          <span>Remind</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Transactions History */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="text-lg font-serif font-bold text-slate-900">
            Recent Fee Payment Transactions & Receipts
          </h3>
          <span className="text-xs text-slate-500">
            Total {payments.length} Recorded Receipts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold">
                <th className="p-3">Receipt No</th>
                <th className="p-3">Date</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Adm No</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Reference</th>
                <th className="p-3">Amount Paid</th>
                <th className="p-3 text-right">View / Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-950">{p.receiptNo}</td>
                  <td className="p-3 text-slate-500">{p.date}</td>
                  <td className="p-3 font-semibold text-slate-800">{p.studentName}</td>
                  <td className="p-3 font-mono">{p.admissionNo}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-semibold text-[10px]">
                      {p.paymentMethod}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{p.transactionRef}</td>
                  <td className="p-3 font-mono font-bold text-emerald-700">
                    KES {p.amount.toLocaleString()}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setActiveReceipt(p)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md font-semibold inline-flex items-center gap-1 text-[11px]"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Receipt</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-950" />
                <h3 className="font-serif font-bold text-base text-slate-900">Record Fee Payment</h3>
              </div>
              <button onClick={() => setShowPayModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Student *</label>
                <select
                  value={selectedStudentId}
                  onChange={e => {
                    setSelectedStudentId(e.target.value);
                    const st = students.find(s => s.id === e.target.value);
                    if (st) setPayerName(st.parentName);
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                >
                  {students.map(st => (
                    <option key={st.id} value={st.id}>
                      {st.admissionNo} - {st.firstName} {st.lastName} ({st.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount Paid (KES) *</label>
                  <input
                    type="number"
                    min="100"
                    step="500"
                    required
                    value={payAmount}
                    onChange={e => setPayAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Channel</label>
                  <select
                    value={payMethod}
                    onChange={e => setPayMethod(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="M-Pesa">M-Pesa</option>
                    <option value="Bank Wire">Bank Wire / Deposit</option>
                    <option value="Cash">Cash at Bursar</option>
                    <option value="Cheque">Banker's Cheque</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Transaction Ref / Slip No</label>
                  <input
                    type="text"
                    required
                    value={payRef}
                    onChange={e => setPayRef(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg font-mono focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Term</label>
                  <select
                    value={payTerm}
                    onChange={e => setPayTerm(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Term 3">Term 3</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deposited / Paid By</label>
                <input
                  type="text"
                  placeholder="e.g. Stephen Kipchumba (Father)"
                  value={payerName}
                  onChange={e => setPayerName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="px-4 py-2 border rounded-lg font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-lg shadow-sm"
                >
                  Confirm & Generate Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable Official School Receipt Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-slate-300 space-y-6 printable-card relative">
            {/* Top Close for screen */}
            <div className="no-print absolute top-4 right-4">
              <button
                onClick={() => setActiveReceipt(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Receipt Header with School Branding */}
            <div className="border-b-2 border-slate-900 pb-4 text-center space-y-2">
              <div className="flex justify-center mb-1">
                <SchoolLogo size="lg" showText={false} />
              </div>
              <h2 className="text-lg sm:text-xl font-serif font-black uppercase tracking-tight text-blue-950">
                {SCHOOL_NAME}
              </h2>
              <p className="text-[11px] text-slate-600">{SCHOOL_LOCATION}</p>
              <p className="text-[11px] text-slate-600">
                WhatsApp: {SCHOOL_PHONE} &bull; Email: {SCHOOL_EMAIL}
              </p>
              <div className="inline-block mt-2 px-4 py-0.5 bg-amber-500 text-blue-950 font-black text-xs uppercase tracking-widest rounded-md">
                Official School Fee Receipt
              </div>
            </div>

            {/* Receipt Metadata */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Receipt Serial No:</span>
                <span className="font-mono font-bold text-sm text-slate-900">{activeReceipt.receiptNo}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Payment Date:</span>
                <span className="font-semibold text-slate-900">{activeReceipt.date}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Student Name:</span>
                <span className="font-bold text-slate-900">{activeReceipt.studentName}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Admission Number:</span>
                <span className="font-mono font-bold text-blue-950">{activeReceipt.admissionNo}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Grade / Class:</span>
                <span className="font-medium text-slate-800">{activeReceipt.grade}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block">Term / Academic Year:</span>
                <span className="font-medium text-slate-800">{activeReceipt.term} - {activeReceipt.academicYear}</span>
              </div>
            </div>

            {/* Payment Details Table */}
            <div className="border border-slate-300 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                  <tr>
                    <th className="p-2.5">Description</th>
                    <th className="p-2.5">Method</th>
                    <th className="p-2.5">Reference No</th>
                    <th className="p-2.5 text-right">Amount Paid</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2.5 font-medium">School Tuition & Maintenance</td>
                    <td className="p-2.5">{activeReceipt.paymentMethod}</td>
                    <td className="p-2.5 font-mono text-slate-600">{activeReceipt.transactionRef}</td>
                    <td className="p-2.5 font-mono font-bold text-right text-sm">
                      KES {activeReceipt.amount.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Payer & Official Stamp Section */}
            <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-xs">
              <div>
                <span className="text-slate-500 block">Paid By:</span>
                <span className="font-bold text-slate-900">{activeReceipt.paidBy}</span>
              </div>

              {/* Official Stamp Box */}
              <div className="border-2 border-dashed border-blue-900/40 p-3 rounded-xl text-center w-40 text-[10px] text-blue-950 font-serif">
                <div className="font-bold uppercase tracking-wider">{SCHOOL_NAME}</div>
                <div className="text-emerald-700 font-bold mt-1">ACCOUNTS VERIFIED</div>
                <div className="text-[9px] text-slate-500 mt-1">Cashier: Bursar Desk</div>
              </div>
            </div>

            {/* Print and Share CTAs */}
            <div className="no-print pt-2 flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Official Receipt</span>
              </button>
              <button
                onClick={() => setActiveReceipt(null)}
                className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl"
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
