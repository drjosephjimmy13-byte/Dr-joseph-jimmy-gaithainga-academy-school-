import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Student } from '../../types';
import {
  Users,
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Eye,
  X,
  CheckCircle2,
  Award,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  MapPin,
  GraduationCap
} from 'lucide-react';

export const StudentManagement: React.FC = () => {
  const { students, classes, reports, payments, addStudent, updateStudent, deleteStudent } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [gradeFilter, setGradeFilter] = useState('All');
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingProfile, setViewingProfile] = useState<Student | null>(null);

  // New Student Form State
  const [formData, setFormData] = useState({
    admissionNo: 'DJGA/2024/' + String(students.length + 1).padStart(3, '0'),
    firstName: '',
    lastName: '',
    gender: 'Male' as 'Male' | 'Female',
    grade: classes[0]?.name || 'Grade 7 East',
    dateOfBirth: '2012-06-15',
    parentName: '',
    parentPhone: '+254 ',
    parentEmail: '',
    address: 'Nairobi, Kenya',
    totalFees: 65000,
    paidFees: 0,
    emergencyContact: '',
    bloodGroup: 'O+'
  });

  const filteredStudents = students.filter(st => {
    const matchesSearch =
      st.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.admissionNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      st.parentPhone.includes(searchTerm);
    const matchesGrade = gradeFilter === 'All' || st.grade === gradeFilter;
    return matchesSearch && matchesGrade;
  });

  const handleCreateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName) return;

    addStudent({
      ...formData,
      status: 'Active',
      enrollmentDate: new Date().toISOString().split('T')[0],
      emergencyContact: formData.emergencyContact || `${formData.parentPhone} (${formData.parentName})`
    });

    setShowAddModal(false);
    setFormData({
      admissionNo: 'DJGA/2024/' + String(students.length + 2).padStart(3, '0'),
      firstName: '',
      lastName: '',
      gender: 'Male',
      grade: classes[0]?.name || 'Grade 7 East',
      dateOfBirth: '2012-06-15',
      parentName: '',
      parentPhone: '+254 ',
      parentEmail: '',
      address: 'Nairobi, Kenya',
      totalFees: 65000,
      paidFees: 0,
      emergencyContact: '',
      bloodGroup: 'O+'
    });
  };

  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStudent) return;

    updateStudent(editingStudent.id, editingStudent);
    if (viewingProfile?.id === editingStudent.id) {
      setViewingProfile(editingStudent);
    }
    setEditingStudent(null);
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-1">
            Student Affairs & Registry
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Student Information & Profiles
          </h2>
          <p className="text-xs text-slate-500">
            Register new scholars, manage profiles, assign classes, and inspect records.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          <PlusCircle className="w-4 h-4 text-amber-400" />
          <span>Register New Student</span>
        </button>
      </div>

      {/* Directory Table with Search & Filter */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, adm no, or phone..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 w-64"
              />
            </div>

            <select
              value={gradeFilter}
              onChange={e => setGradeFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
            >
              <option value="All">All Streams & Classes</option>
              {classes.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-500">
            Showing <strong className="text-blue-950">{filteredStudents.length}</strong> scholars
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b">
                <th className="p-3">Adm No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Class / Stream</th>
                <th className="p-3">Parent / Guardian</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Fee Balance</th>
                <th className="p-3">Attendance</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map(st => {
                const balance = st.totalFees - st.paidFees;
                return (
                  <tr key={st.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-blue-950">{st.admissionNo}</td>
                    <td className="p-3 font-semibold text-slate-900">
                      {st.firstName} {st.lastName}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-900 font-semibold text-[11px]">
                        {st.grade}
                      </span>
                    </td>
                    <td className="p-3 text-slate-700">{st.parentName}</td>
                    <td className="p-3 font-mono text-slate-500">{st.parentPhone}</td>
                    <td className="p-3 font-mono font-bold">
                      {balance > 0 ? (
                        <span className="text-red-700">KES {balance.toLocaleString()}</span>
                      ) : (
                        <span className="text-emerald-700">Cleared</span>
                      )}
                    </td>
                    <td className="p-3 font-mono font-bold text-blue-900">{st.attendanceRate}%</td>
                    <td className="p-3 text-right space-x-1">
                      <button
                        onClick={() => setViewingProfile(st)}
                        title="View Full Profile"
                        className="p-1.5 text-blue-900 hover:bg-blue-100 rounded-md transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditingStudent(st)}
                        title="Edit Information"
                        className="p-1.5 text-amber-700 hover:bg-amber-100 rounded-md transition"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Remove scholar ${st.firstName} ${st.lastName}?`)) {
                            deleteStudent(st.id);
                          }
                        }}
                        title="Delete Student"
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register New Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Register New Student to Academy
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Admission Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.admissionNo}
                    onChange={e => setFormData({ ...formData, admissionNo: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg font-mono focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class / Stream *</label>
                  <select
                    value={formData.grade}
                    onChange={e => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victor"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kamau"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={e => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div className="border-t pt-3 space-y-3">
                <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                  Parent / Guardian Details
                </h4>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Parent Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alice Kamau"
                      value={formData.parentName}
                      onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Parent Phone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+254 712 345 678"
                      value={formData.parentPhone}
                      onChange={e => setFormData({ ...formData, parentPhone: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Parent Email</label>
                    <input
                      type="email"
                      placeholder="alice@gmail.com"
                      value={formData.parentEmail}
                      onChange={e => setFormData({ ...formData, parentEmail: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Term Fee Invoiced (KES)</label>
                    <input
                      type="number"
                      value={formData.totalFees}
                      onChange={e => setFormData({ ...formData, totalFees: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg font-mono focus:ring-2 focus:ring-blue-900"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 text-white font-bold rounded-lg hover:bg-blue-900 shadow-sm"
                >
                  Register Scholar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Edit Information: {editingStudent.firstName} {editingStudent.lastName}
              </h3>
              <button onClick={() => setEditingStudent(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class / Stream</label>
                  <select
                    value={editingStudent.grade}
                    onChange={e => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  >
                    {classes.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingStudent.status}
                    onChange={e => setEditingStudent({ ...editingStudent, status: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Transferred">Transferred</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Parent Name</label>
                  <input
                    type="text"
                    value={editingStudent.parentName}
                    onChange={e => setEditingStudent({ ...editingStudent, parentName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Parent Phone</label>
                  <input
                    type="tel"
                    value={editingStudent.parentPhone}
                    onChange={e => setEditingStudent({ ...editingStudent, parentPhone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Fees Invoiced</label>
                  <input
                    type="number"
                    value={editingStudent.totalFees}
                    onChange={e => setEditingStudent({ ...editingStudent, totalFees: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg font-mono focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={editingStudent.address}
                    onChange={e => setEditingStudent({ ...editingStudent, address: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 border rounded-lg font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 text-white font-bold rounded-lg hover:bg-blue-900 shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Comprehensive Student Profile Drawer / Modal */}
      {viewingProfile && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-300 space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setViewingProfile(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-950 to-indigo-900 flex items-center justify-center text-amber-300 font-serif font-bold text-xl shadow-md">
                {viewingProfile.firstName[0]}{viewingProfile.lastName[0]}
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">
                  {viewingProfile.firstName} {viewingProfile.lastName}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  Admission No: <strong className="text-blue-950">{viewingProfile.admissionNo}</strong> &bull; Class: <strong className="text-amber-700">{viewingProfile.grade}</strong>
                </p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  Status: {viewingProfile.status}
                </span>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Attendance Rate</span>
                <span className="text-lg font-black text-blue-950 font-mono">{viewingProfile.attendanceRate}%</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Fee Balance</span>
                <span className="text-lg font-black text-amber-700 font-mono">
                  KES {(viewingProfile.totalFees - viewingProfile.paidFees).toLocaleString()}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-500 block">Blood Group</span>
                <span className="text-lg font-black text-slate-900">{viewingProfile.bloodGroup || 'O+'}</span>
              </div>
            </div>

            {/* Academic Results Tab for Student */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Academic Performance Records
              </h4>
              {reports.filter(r => r.studentId === viewingProfile.id).length > 0 ? (
                <div className="space-y-2">
                  {reports.filter(r => r.studentId === viewingProfile.id).map(r => (
                    <div key={r.id} className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-blue-950 block">{r.term} - {r.examType} ({r.academicYear})</span>
                        <span className="text-slate-600">Mean Score: {r.meanScore}% &bull; Overall Grade: {r.overallGrade} &bull; Class Rank: #{r.classPosition}</span>
                      </div>
                      <span className="px-3 py-1 bg-blue-900 text-amber-300 rounded-lg font-bold">
                        Grade {r.overallGrade}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No term exam results recorded yet for this scholar.</p>
              )}
            </div>

            {/* Parent Contact Details */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Parent & Emergency Coordinates
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <div>Parent / Guardian: <strong className="text-slate-900">{viewingProfile.parentName}</strong></div>
                <div>Phone: <strong className="text-slate-900">{viewingProfile.parentPhone}</strong></div>
                <div>Email: <strong className="text-slate-900">{viewingProfile.parentEmail}</strong></div>
                <div>Address: <strong className="text-slate-900">{viewingProfile.address}</strong></div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingProfile(null)}
                className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
