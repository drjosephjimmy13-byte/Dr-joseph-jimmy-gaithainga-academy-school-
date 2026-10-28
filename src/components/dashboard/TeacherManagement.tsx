import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Teacher } from '../../types';
import {
  Briefcase,
  PlusCircle,
  Search,
  Edit,
  Trash2,
  Eye,
  X,
  Mail,
  Phone,
  BookOpen,
  Calendar,
  Layers,
  GraduationCap
} from 'lucide-react';

export const TeacherManagement: React.FC = () => {
  const { teachers, classes, subjects, addTeacher, updateTeacher, deleteTeacher } = useSchool();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  
  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);

  // New Teacher Form
  const [formData, setFormData] = useState({
    staffId: 'DJGA/STF/' + String(teachers.length + 1).padStart(3, '0'),
    name: '',
    title: 'Subject Educator',
    gender: 'Male' as 'Male' | 'Female',
    email: '',
    phone: '+254 ',
    qualification: 'B.Ed (Hons)',
    department: 'Sciences' as 'Mathematics' | 'Sciences' | 'Languages' | 'Humanities' | 'Creative Arts & Tech',
    subjects: ['Integrated Science / Physics & Chem'],
    classesAssigned: ['Grade 7 East']
  });

  const departments = ['All', 'Mathematics', 'Sciences', 'Languages', 'Humanities', 'Creative Arts & Tech'];

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.staffId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All' || t.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleCreateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    addTeacher({
      ...formData,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    });

    setShowAddModal(false);
    setFormData({
      staffId: 'DJGA/STF/' + String(teachers.length + 2).padStart(3, '0'),
      name: '',
      title: 'Subject Educator',
      gender: 'Male',
      email: '',
      phone: '+254 ',
      qualification: 'B.Ed (Hons)',
      department: 'Sciences',
      subjects: ['Integrated Science / Physics & Chem'],
      classesAssigned: ['Grade 7 East']
    });
  };

  const handleUpdateTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeacher) return;

    updateTeacher(editingTeacher.id, editingTeacher);
    if (viewingTeacher?.id === editingTeacher.id) {
      setViewingTeacher(editingTeacher);
    }
    setEditingTeacher(null);
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-1">
            Faculty & Academic Staff
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Teacher Management & Allocations
          </h2>
          <p className="text-xs text-slate-500">
            Register teachers, allocate subjects & classes, and supervise instructional timetables.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          <PlusCircle className="w-4 h-4 text-amber-400" />
          <span>Register New Teacher</span>
        </button>
      </div>

      {/* Directory with Filter & Search */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search teacher by name or staff id..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900 w-64"
              />
            </div>

            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="px-3 py-1.5 text-xs border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
            >
              {departments.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-500">
            Total Staff: <strong className="text-blue-950">{filteredTeachers.length}</strong> Educators
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b">
                <th className="p-3">Staff ID</th>
                <th className="p-3">Faculty Name</th>
                <th className="p-3">Department & Role</th>
                <th className="p-3">Assigned Subjects</th>
                <th className="p-3">Classes</th>
                <th className="p-3">Phone</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTeachers.map(t => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-950">{t.staffId}</td>
                  <td className="p-3">
                    <span className="font-semibold text-slate-900 block">{t.name}</span>
                    <span className="text-[11px] text-slate-500">{t.email}</span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold text-[10px] block w-fit mb-0.5">
                      {t.department}
                    </span>
                    <span className="text-slate-600 text-[11px]">{t.title}</span>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {t.subjects.map((s, idx) => (
                        <span key={idx} className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px] text-slate-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {t.classesAssigned.map((c, idx) => (
                        <span key={idx} className="bg-amber-50 text-amber-900 font-medium px-1.5 py-0.5 rounded text-[10px]">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{t.phone}</td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => setViewingTeacher(t)}
                      title="View Teacher Profile & Timetable"
                      className="p-1.5 text-blue-900 hover:bg-blue-100 rounded-md transition"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setEditingTeacher(t)}
                      title="Edit Teacher"
                      className="p-1.5 text-amber-700 hover:bg-amber-100 rounded-md transition"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Remove teacher ${t.name}?`)) {
                          deleteTeacher(t.id);
                        }
                      }}
                      title="Delete Teacher"
                      className="p-1.5 text-red-600 hover:bg-red-100 rounded-md transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-serif font-bold text-base text-slate-900">
                Register New Teacher / Faculty
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTeacher} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Staff ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.staffId}
                    onChange={e => setFormData({ ...formData, staffId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg font-mono focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mr. Timothy Maina"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Mathematics">Mathematics</option>
                    <option value="Sciences">Sciences</option>
                    <option value="Languages">Languages</option>
                    <option value="Humanities">Humanities</option>
                    <option value="Creative Arts & Tech">Creative Arts & Tech</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Master, Physics Lead"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="teacher@gaithainga-academy.ac.ke"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Highest Qualification</label>
                <input
                  type="text"
                  placeholder="e.g. M.Ed Science Education, B.Ed Science"
                  value={formData.qualification}
                  onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-900"
                />
              </div>

              {/* Subject & Class Assignment Checklist */}
              <div className="grid grid-cols-2 gap-4 border-t pt-3">
                <div>
                  <label className="block font-bold text-slate-800 mb-1 text-[11px]">
                    Assign Subjects
                  </label>
                  <div className="max-h-32 overflow-y-auto space-y-1 p-2 bg-slate-50 border rounded-lg">
                    {subjects.map(s => (
                      <label key={s.id} className="flex items-center gap-2 cursor-pointer text-[11px]">
                        <input
                          type="checkbox"
                          checked={formData.subjects.includes(s.name)}
                          onChange={e => {
                            if (e.target.checked) {
                              setFormData({ ...formData, subjects: [...formData.subjects, s.name] });
                            } else {
                              setFormData({ ...formData, subjects: formData.subjects.filter(name => name !== s.name) });
                            }
                          }}
                          className="rounded text-blue-900"
                        />
                        <span>{s.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1 text-[11px]">
                    Assign Classes
                  </label>
                  <div className="max-h-32 overflow-y-auto space-y-1 p-2 bg-slate-50 border rounded-lg">
                    {classes.map(c => (
                      <label key={c.id} className="flex items-center gap-2 cursor-pointer text-[11px]">
                        <input
                          type="checkbox"
                          checked={formData.classesAssigned.includes(c.name)}
                          onChange={e => {
                            if (e.target.checked) {
                              setFormData({ ...formData, classesAssigned: [...formData.classesAssigned, c.name] });
                            } else {
                              setFormData({ ...formData, classesAssigned: formData.classesAssigned.filter(name => name !== c.name) });
                            }
                          }}
                          className="rounded text-blue-900"
                        />
                        <span>{c.name}</span>
                      </label>
                    ))}
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
                  Register Teacher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Teacher Profile & Timetable View Modal */}
      {viewingTeacher && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border border-slate-300 space-y-6 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setViewingTeacher(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Profile Header */}
            <div className="flex items-center gap-4 border-b pb-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-950 flex items-center justify-center text-amber-300 font-serif font-bold text-xl shadow-md">
                {viewingTeacher.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-slate-900">{viewingTeacher.name}</h3>
                <p className="text-xs text-slate-500 font-mono">
                  Staff ID: <strong className="text-blue-950">{viewingTeacher.staffId}</strong> &bull; Dept: <strong className="text-amber-700">{viewingTeacher.department}</strong>
                </p>
                <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-950">
                  {viewingTeacher.title}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border">
                <span className="text-slate-500 block mb-0.5">Qualifications</span>
                <span className="font-semibold text-slate-900">{viewingTeacher.qualification}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border">
                <span className="text-slate-500 block mb-0.5">Email & Phone</span>
                <span className="font-semibold text-slate-900 block">{viewingTeacher.email}</span>
                <span className="font-mono text-slate-700">{viewingTeacher.phone}</span>
              </div>
            </div>

            {/* Assigned Subjects & Classes */}
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-1.5">
                  Assigned Subjects
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {viewingTeacher.subjects.map((s, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-900 rounded-lg text-xs font-semibold border border-blue-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-1.5">
                  Assigned Class Streams
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {viewingTeacher.classesAssigned.map((c, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-50 text-amber-900 rounded-lg text-xs font-semibold border border-amber-200">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Teacher Weekly Timetable Schedule */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                Weekly Teaching Schedule Summary
              </h4>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 font-bold text-slate-700">
                    <tr>
                      <th className="p-2">Day</th>
                      <th className="p-2">Morning Session</th>
                      <th className="p-2">Midday Session</th>
                      <th className="p-2">Afternoon Session</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2 font-bold text-slate-800">Monday</td>
                      <td className="p-2 text-slate-600">8:00 - 9:30 AM ({viewingTeacher.classesAssigned[0] || 'Grade 7 East'})</td>
                      <td className="p-2 text-slate-600">10:45 - 12:15 PM</td>
                      <td className="p-2 text-slate-600">2:00 - 3:30 PM (Lab practical)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-800">Tuesday</td>
                      <td className="p-2 text-slate-600">8:45 - 10:15 AM</td>
                      <td className="p-2 text-slate-600">11:30 - 1:00 PM</td>
                      <td className="p-2 text-slate-600">Remedial Mentorship</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-800">Wednesday</td>
                      <td className="p-2 text-slate-600">8:00 - 9:30 AM</td>
                      <td className="p-2 text-slate-600">Department Meeting</td>
                      <td className="p-2 text-slate-600">2:00 - 3:30 PM</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-800">Thursday</td>
                      <td className="p-2 text-slate-600">9:30 - 11:30 AM</td>
                      <td className="p-2 text-slate-600">12:15 - 1:00 PM</td>
                      <td className="p-2 text-slate-600">Co-Curricular Sports</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-800">Friday</td>
                      <td className="p-2 text-slate-600">8:00 - 10:15 AM</td>
                      <td className="p-2 text-slate-600">10:45 - 12:15 PM</td>
                      <td className="p-2 text-slate-600">Staff Debrief & Planning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setViewingTeacher(null)}
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
