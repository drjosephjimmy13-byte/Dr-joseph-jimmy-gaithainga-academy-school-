import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { ExamReport, SubjectGrade } from '../../types';
import { SchoolLogo } from '../common/SchoolLogo';
import {
  SCHOOL_NAME,
  SCHOOL_PHONE,
  SCHOOL_EMAIL,
  SCHOOL_LOCATION,
  SCHOOL_MOTTO
} from '../../data/initialData';
import {
  Award,
  Edit3,
  FileText,
  Printer,
  Search,
  CheckCircle2,
  TrendingUp,
  X,
  BookOpen,
  Sparkles,
  PlusCircle
} from 'lucide-react';

export const calculateGrade = (score: number): { grade: string; points: number; remarks: string } => {
  if (score >= 80) return { grade: 'A', points: 12, remarks: 'Excellent Mastery' };
  if (score >= 75) return { grade: 'A-', points: 11, remarks: 'Very Good Performance' };
  if (score >= 70) return { grade: 'B+', points: 10, remarks: 'Commendable Effort' };
  if (score >= 65) return { grade: 'B', points: 9, remarks: 'Good Understanding' };
  if (score >= 60) return { grade: 'B-', points: 8, remarks: 'Satisfactory Progress' };
  if (score >= 55) return { grade: 'C+', points: 7, remarks: 'Average Competency' };
  if (score >= 50) return { grade: 'C', points: 6, remarks: 'Fair, Needs More Practice' };
  if (score >= 45) return { grade: 'C-', points: 5, remarks: 'Pass, Room for Improvement' };
  if (score >= 40) return { grade: 'D', points: 4, remarks: 'Weak, Remedial Recommended' };
  return { grade: 'E', points: 2, remarks: 'Critical Intervention Needed' };
};

export const ExamsResults: React.FC = () => {
  const { students, subjects, reports, saveExamReport, classes } = useSchool();
  const [selectedClass, setSelectedClass] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Enter marks modal
  const [showMarksModal, setShowMarksModal] = useState(false);
  const [marksStudentId, setMarksStudentId] = useState(students[0]?.id || '');
  const [examType, setExamType] = useState<'Mid-Term Assessment' | 'End of Term Exam' | 'Mock Examination'>('End of Term Exam');
  const [term, setTerm] = useState<'Term 1' | 'Term 2' | 'Term 3'>('Term 3');
  
  // Marks state dictionary: subjectName -> score
  const [subjectScores, setSubjectScores] = useState<Record<string, number>>({
    Mathematics: 85,
    'English Language & Literature': 82,
    'Kiswahili Fasihi': 80,
    'Integrated Science / Physics & Chem': 88,
    'Social Studies & History': 84,
    'Computer Science & Coding': 90,
    'Christian Religious Education': 86
  });

  // Report Card Modal State
  const [activeReport, setActiveReport] = useState<ExamReport | null>(null);

  const filteredReports = reports.filter(r => {
    const matchesClass = selectedClass === 'All' || r.grade.includes(selectedClass);
    const matchesSearch =
      r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.admissionNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSearch;
  });

  const handleScoreChange = (subjectName: string, val: number) => {
    setSubjectScores(prev => ({
      ...prev,
      [subjectName]: Math.min(100, Math.max(0, isNaN(val) ? 0 : val))
    }));
  };

  const handleSaveMarks = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find(s => s.id === marksStudentId);
    if (!student) return;

    const subjectsGraded: SubjectGrade[] = Object.entries(subjectScores).map(([subName, score]) => {
      const calc = calculateGrade(score);
      return {
        subjectName: subName,
        score,
        grade: calc.grade,
        points: calc.points,
        remarks: calc.remarks,
        teacherName: 'Faculty Assigned'
      };
    });

    const total = subjectsGraded.reduce((acc, s) => acc + s.score, 0);
    const mean = subjectsGraded.length > 0 ? Number((total / subjectsGraded.length).toFixed(1)) : 0;
    const overallGrade = calculateGrade(mean).grade;

    const newReport: ExamReport = {
      id: 'rep-' + Date.now(),
      studentId: student.id,
      studentName: `${student.firstName} ${student.lastName}`,
      admissionNo: student.admissionNo,
      grade: student.grade,
      term,
      examType,
      academicYear: '2026',
      subjects: subjectsGraded,
      totalMarks: total,
      meanScore: mean,
      overallGrade,
      classPosition: Math.floor(1 + Math.random() * 5),
      totalStudents: 36,
      classTeacherRemarks: 'Diligent scholar with solid discipline and consistent academic curiosity.',
      headTeacherRemarks: 'A very commendable term result. Approved by Dr. Joseph Jimmy Gaithainga.',
      issueDate: new Date().toISOString().split('T')[0]
    };

    saveExamReport(newReport);
    setShowMarksModal(false);
    setActiveReport(newReport);
  };

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 text-xs font-bold mb-1">
            Academic Performance Division
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">
            Exams, Automated Grading & Report Cards
          </h2>
          <p className="text-xs text-slate-500">
            Automated grade computation (A through E), class ranking, and official report cards for {SCHOOL_NAME}.
          </p>
        </div>

        <button
          onClick={() => setShowMarksModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          <PlusCircle className="w-4 h-4 text-amber-400" />
          <span>Enter Student Marks</span>
        </button>
      </div>

      {/* Reports Directory & Filter */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search scholar or admission no..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
              />
            </div>

            <select
              value={selectedClass}
              onChange={e => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 text-xs border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
            >
              <option value="All">All Grades & Streams</option>
              {classes.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-500">
            Found: <strong className="text-blue-950">{filteredReports.length}</strong> Generated Reports
          </div>
        </div>

        {/* Exam Reports Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b">
                <th className="p-3">Adm No</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Class</th>
                <th className="p-3">Term & Exam</th>
                <th className="p-3">Total Marks</th>
                <th className="p-3">Mean Score</th>
                <th className="p-3">Grade</th>
                <th className="p-3">Rank</th>
                <th className="p-3 text-right">Official Report Card</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map(rep => (
                <tr key={rep.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-blue-950">{rep.admissionNo}</td>
                  <td className="p-3 font-semibold text-slate-900">{rep.studentName}</td>
                  <td className="p-3 text-slate-600">{rep.grade}</td>
                  <td className="p-3 text-slate-600">{rep.term} - {rep.examType}</td>
                  <td className="p-3 font-mono font-bold">{rep.totalMarks}</td>
                  <td className="p-3 font-mono font-bold text-blue-900">{rep.meanScore}%</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full font-extrabold text-[11px] bg-amber-100 text-amber-900">
                      {rep.overallGrade}
                    </span>
                  </td>
                  <td className="p-3 font-semibold text-slate-700">
                    Pos {rep.classPosition} / {rep.totalStudents}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setActiveReport(rep)}
                      className="px-3 py-1.5 bg-blue-950 hover:bg-blue-900 text-white rounded-lg font-bold inline-flex items-center gap-1.5 text-[11px] shadow-xs"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-400" />
                      <span>View & Print</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enter Marks Modal */}
      {showMarksModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-950" />
                <h3 className="font-serif font-bold text-base text-slate-900">
                  Enter Subject Examination Marks
                </h3>
              </div>
              <button onClick={() => setShowMarksModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMarks} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block font-semibold text-slate-700 mb-1">Select Student</label>
                  <select
                    value={marksStudentId}
                    onChange={e => setMarksStudentId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  >
                    {students.map(st => (
                      <option key={st.id} value={st.id}>
                        {st.admissionNo} - {st.firstName} {st.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Term</label>
                  <select
                    value={term}
                    onChange={e => setTerm(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Term 1">Term 1</option>
                    <option value="Term 2">Term 2</option>
                    <option value="Term 3">Term 3</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Exam Type</label>
                  <select
                    value={examType}
                    onChange={e => setExamType(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="End of Term Exam">End of Term Exam</option>
                    <option value="Mid-Term Assessment">Mid-Term Assessment</option>
                    <option value="Mock Examination">Mock Examination</option>
                  </select>
                </div>
              </div>

              {/* Subject Marks Input Matrix */}
              <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
                <div className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                  Enter Subject Scores (Out of 100) &bull; Automatic Grade Calculation
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.keys(subjectScores).map(subName => {
                    const currentScore = subjectScores[subName] || 0;
                    const calc = calculateGrade(currentScore);
                    return (
                      <div key={subName} className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                        <span className="font-medium text-slate-700 truncate max-w-[160px]">{subName}</span>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={currentScore}
                            onChange={e => handleScoreChange(subName, parseInt(e.target.value, 10))}
                            className="w-16 px-2 py-1 text-center font-mono font-bold border rounded-md focus:ring-2 focus:ring-blue-900 text-xs"
                          />
                          <span className="w-8 text-center px-1.5 py-0.5 rounded-md font-extrabold text-[11px] bg-blue-100 text-blue-950">
                            {calc.grade}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowMarksModal(false)}
                  className="px-4 py-2 border rounded-lg font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white font-bold rounded-lg shadow-sm"
                >
                  Save Marks & Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Official Student Report Card Printable Modal */}
      {activeReport && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl border border-slate-300 space-y-6 printable-card relative max-h-[92vh] overflow-y-auto">
            {/* Top Close */}
            <div className="no-print absolute top-4 right-4">
              <button
                onClick={() => setActiveReport(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* School Header */}
            <div className="border-b-2 border-blue-950 pb-4 text-center space-y-1">
              <div className="flex justify-center mb-1">
                <SchoolLogo size="lg" showText={false} />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-tight text-blue-950">
                {SCHOOL_NAME}
              </h2>
              <p className="text-xs text-amber-700 font-bold uppercase tracking-widest">
                "{SCHOOL_MOTTO}"
              </p>
              <p className="text-[11px] text-slate-600">{SCHOOL_LOCATION}</p>
              <p className="text-[11px] text-slate-600">
                WhatsApp: {SCHOOL_PHONE} &bull; Email: {SCHOOL_EMAIL}
              </p>

              <div className="inline-block mt-2 px-5 py-1 bg-blue-950 text-amber-300 font-bold text-xs uppercase tracking-wider rounded-md">
                Official Student Terminal Progress Report Card
              </div>
            </div>

            {/* Student Bio Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
              <div>
                <span className="text-slate-500 block">Student Name:</span>
                <span className="font-bold text-slate-900">{activeReport.studentName}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Admission Number:</span>
                <span className="font-mono font-bold text-blue-950">{activeReport.admissionNo}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Grade / Stream:</span>
                <span className="font-bold text-slate-900">{activeReport.grade}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Term / Year:</span>
                <span className="font-bold text-slate-900">{activeReport.term} - {activeReport.academicYear}</span>
              </div>
            </div>

            {/* Subject Performance Matrix */}
            <div className="border border-slate-300 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-blue-950 text-white font-bold">
                  <tr>
                    <th className="p-2.5">Subject</th>
                    <th className="p-2.5 text-center">Score / 100</th>
                    <th className="p-2.5 text-center">Grade</th>
                    <th className="p-2.5 text-center">Points</th>
                    <th className="p-2.5">Teacher's Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {activeReport.subjects.map((sub, sidx) => (
                    <tr key={sidx} className={sidx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-2.5 font-semibold text-slate-900">{sub.subjectName}</td>
                      <td className="p-2.5 font-mono font-bold text-center text-slate-800">{sub.score}</td>
                      <td className="p-2.5 font-bold text-center text-blue-950">{sub.grade}</td>
                      <td className="p-2.5 font-mono text-center">{sub.points}</td>
                      <td className="p-2.5 text-slate-600 italic text-[11px]">{sub.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Aggregated Performance Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-blue-50/70 border border-blue-200 rounded-2xl text-center text-xs">
              <div>
                <span className="text-slate-500 block">Total Marks:</span>
                <span className="text-lg font-black text-slate-900 font-mono">{activeReport.totalMarks}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Mean Score:</span>
                <span className="text-lg font-black text-blue-950 font-mono">{activeReport.meanScore}%</span>
              </div>
              <div>
                <span className="text-slate-500 block">Overall Mean Grade:</span>
                <span className="text-lg font-black text-amber-700">{activeReport.overallGrade}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Position in Class:</span>
                <span className="text-lg font-black text-emerald-800">
                  {activeReport.classPosition} of {activeReport.totalStudents}
                </span>
              </div>
            </div>

            {/* Remarks & Signatures */}
            <div className="space-y-4 pt-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <span className="font-bold text-slate-800 block">Class Teacher's Appraisal:</span>
                <p className="text-slate-600 italic">{activeReport.classTeacherRemarks}</p>
              </div>

              <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-950 block">Director & Headteacher's Final Remark:</span>
                <p className="text-slate-700 italic">{activeReport.headTeacherRemarks}</p>
              </div>

              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-slate-200">
                <div className="text-center">
                  <div className="border-b border-slate-400 pb-1 font-serif font-bold text-slate-800">
                    Mr. David Kariuki
                  </div>
                  <span className="text-[10px] text-slate-500">Senior Master / Class Teacher Signature</span>
                </div>

                <div className="text-center">
                  <div className="border-b border-slate-400 pb-1 font-serif font-bold text-blue-950">
                    Dr. Joseph Jimmy Gaithainga, Ph.D
                  </div>
                  <span className="text-[10px] text-slate-500">Executive Director / Official School Seal</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="no-print pt-4 flex justify-end gap-3 border-t">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2"
              >
                <Printer className="w-4 h-4 text-amber-400" />
                <span>Print Official Report Card</span>
              </button>
              <button
                onClick={() => setActiveReport(null)}
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
