import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SCHOOL_NAME } from '../../data/initialData';
import {
  BookOpen,
  Calendar,
  Users,
  DoorOpen,
  Clock,
  Layers,
  GraduationCap,
  Sparkles,
  Search
} from 'lucide-react';

export const ClassesSubjectsPage: React.FC = () => {
  const { classes, subjects, teachers } = useSchool();
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || 'c1');
  const [subjectSearch, setSubjectSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const selectedClass = classes.find(c => c.id === selectedClassId) || classes[0];

  const departments = ['All', 'Mathematics', 'Sciences', 'Languages', 'Humanities', 'Creative Arts & Tech'];

  const filteredSubjects = subjects.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(subjectSearch.toLowerCase()) ||
                          s.code.toLowerCase().includes(subjectSearch.toLowerCase());
    const matchesDept = selectedDept === 'All' || s.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  // Mock weekly schedule for the selected class
  const timeSlots = [
    { time: '08:00 - 08:45 AM', mon: 'Mathematics', tue: 'English Language', wed: 'Integrated Science', thu: 'Kiswahili Fasihi', fri: 'Computer Science' },
    { time: '08:45 - 09:30 AM', mon: 'Mathematics', tue: 'English Language', wed: 'Integrated Science', thu: 'Social Studies', fri: 'Computer Science' },
    { time: '09:30 - 10:15 AM', mon: 'Kiswahili Fasihi', tue: 'Social Studies', wed: 'Mathematics', thu: 'CRE', fri: 'Physical Education' },
    { time: '10:15 - 10:45 AM', mon: 'MORNING TEA BREAK', tue: 'MORNING TEA BREAK', wed: 'MORNING TEA BREAK', thu: 'MORNING TEA BREAK', fri: 'MORNING TEA BREAK', isBreak: true },
    { time: '10:45 - 11:30 AM', mon: 'Integrated Science', tue: 'Mathematics', wed: 'English Language', thu: 'Agriculture', fri: 'Mathematics' },
    { time: '11:30 - 12:15 PM', mon: 'Social Studies', tue: 'Biology & Health', wed: 'Christian Rel. Ed', thu: 'Integrated Science', fri: 'English Language' },
    { time: '12:15 - 01:00 PM', mon: 'Computer Science', tue: 'Creative Arts', wed: 'Kiswahili Fasihi', thu: 'Biology & Health', fri: 'Pastoral Program' },
    { time: '01:00 - 02:00 PM', mon: 'HOT LUNCH & RECESS', tue: 'HOT LUNCH & RECESS', wed: 'HOT LUNCH & RECESS', thu: 'HOT LUNCH & RECESS', fri: 'HOT LUNCH & RECESS', isBreak: true },
    { time: '02:00 - 02:45 PM', mon: 'Agriculture', tue: 'Kiswahili Fasihi', wed: 'Computer Lab Work', thu: 'Mathematics', fri: 'Clubs & Societies' },
    { time: '02:45 - 03:30 PM', mon: 'Library Study', tue: 'Integrated Science', wed: 'Art & Music', thu: 'Guidance & Counseling', fri: 'Sports & Games' }
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>Structured CBC & International Syllabus</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
            Classes, Streams & Subjects
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">
            Comprehensive curriculum, dedicated learning streams, and weekly timetables at {SCHOOL_NAME}.
          </p>
        </div>
      </section>

      {/* Classes Overview Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Active Learning Streams
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Classes & Stream Allocation
            </h2>
          </div>
          <div className="text-xs text-slate-500">
            Total Enrolled Capacity: <strong className="text-blue-950">{classes.reduce((acc, c) => acc + c.enrolled, 0)} scholars</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.map(cls => (
            <div
              key={cls.id}
              onClick={() => setSelectedClassId(cls.id)}
              className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                selectedClassId === cls.id
                  ? 'bg-blue-50/80 border-blue-900 shadow-md ring-2 ring-blue-900/20'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className="px-2.5 py-1 bg-blue-900 text-amber-300 rounded-lg text-xs font-bold">
                  {cls.gradeLevel}
                </span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <DoorOpen className="w-3.5 h-3.5" />
                  {cls.roomNumber}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1">{cls.name}</h3>

              <div className="space-y-1.5 text-xs text-slate-600 my-3">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                  <span>Class Teacher: <strong>{cls.classTeacherName}</strong></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                  <span>Scholars: <strong>{cls.enrolled}</strong> / {cls.capacity} capacity</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mt-3">
                <div
                  className="bg-blue-900 h-2 rounded-full"
                  style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                ></div>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 flex justify-between items-center text-[11px]">
                <span className="text-slate-500">Utilization: {Math.round((cls.enrolled / cls.capacity) * 100)}%</span>
                <span className="font-bold text-blue-900">
                  {selectedClassId === cls.id ? 'Viewing Timetable' : 'Click to View Timetable'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Class Timetable Viewer */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold mb-1">
                Weekly Class Register & Schedule
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Official Timetable: {selectedClass?.name}
              </h3>
              <p className="text-xs text-slate-500">
                Assigned Class Teacher: {selectedClass?.classTeacherName} &bull; Room: {selectedClass?.roomNumber}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-600">Select Stream:</span>
              <select
                value={selectedClassId}
                onChange={e => setSelectedClassId(e.target.value)}
                className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg bg-slate-50 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-blue-950 text-white font-bold">
                  <th className="p-3 border border-blue-900">Time Slot</th>
                  <th className="p-3 border border-blue-900">Monday</th>
                  <th className="p-3 border border-blue-900">Tuesday</th>
                  <th className="p-3 border border-blue-900">Wednesday</th>
                  <th className="p-3 border border-blue-900">Thursday</th>
                  <th className="p-3 border border-blue-900">Friday</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {timeSlots.map((slot, index) => {
                  if (slot.isBreak) {
                    return (
                      <tr key={index} className="bg-amber-100/70 text-amber-950 font-bold text-center">
                        <td className="p-2.5 font-mono border border-amber-200">{slot.time}</td>
                        <td colSpan={5} className="p-2.5 tracking-wider border border-amber-200">
                          {slot.mon}
                        </td>
                      </tr>
                    );
                  }
                  return (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-medium text-slate-600 border border-slate-200 whitespace-nowrap bg-slate-50">
                        {slot.time}
                      </td>
                      <td className="p-3 font-semibold text-slate-800 border border-slate-200">{slot.mon}</td>
                      <td className="p-3 font-semibold text-slate-800 border border-slate-200">{slot.tue}</td>
                      <td className="p-3 font-semibold text-slate-800 border border-slate-200">{slot.wed}</td>
                      <td className="p-3 font-semibold text-slate-800 border border-slate-200">{slot.thu}</td>
                      <td className="p-3 font-semibold text-slate-800 border border-slate-200">{slot.fri}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Curriculum Subjects Catalog */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Academic Curriculum
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Offered Subjects & Syllabus Units
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search subject or code..."
                value={subjectSearch}
                onChange={e => setSubjectSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {departments.map(dept => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-2.5 py-1 text-xs rounded-lg transition font-medium ${
                    selectedDept === dept
                      ? 'bg-blue-900 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSubjects.map(sub => (
            <div key={sub.id} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-900 rounded-md">
                  {sub.code}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  {sub.periodsPerWeek} Periods / Week
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900">{sub.name}</h4>
              <div className="flex items-center gap-1.5 text-xs text-amber-700 font-medium">
                <span>Department: {sub.department}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
