import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  SCHOOL_NAME,
  SCHOOL_PHONE,
  SCHOOL_PHONE_CLEAN,
  SCHOOL_EMAIL
} from '../../data/initialData';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  FileText,
  MessageCircle,
  Mail,
  Send,
  HelpCircle,
  Download,
  AlertCircle,
  CreditCard
} from 'lucide-react';

export const AdmissionsPage: React.FC = () => {
  const { submitAdmission } = useSchool();

  const [formData, setFormData] = useState({
    studentName: '',
    gender: 'Male',
    dob: '',
    gradeApplying: 'Grade 7 East (Junior Secondary)',
    previousSchool: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    address: '',
    specialNeeds: ''
  });

  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.parentName || !formData.parentPhone) {
      setErrorMsg('Please fill in all required fields (Student Name, Parent Name, Parent Phone).');
      return;
    }

    const app = submitAdmission({
      studentName: formData.studentName,
      gender: formData.gender,
      dob: formData.dob || '2013-01-01',
      gradeApplying: formData.gradeApplying,
      previousSchool: formData.previousSchool || 'Not specified',
      parentName: formData.parentName,
      parentPhone: formData.parentPhone,
      parentEmail: formData.parentEmail || 'Not specified',
      address: formData.address || 'Not specified'
    });

    setSubmittedRef(app.id);
    setErrorMsg(null);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Academic Year 2026 / 2027 Enrollment Open</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
            Admissions at {SCHOOL_NAME}
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">
            Empower your child with a world-class education rooted in academic rigor, innovative STEM education, and exemplary moral discipline.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <a
              href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=Hello%20DR%20JOSEPH%20JIMMY%20GAITHAINGA%20ACADEMY%20SCHOOL%2C%20I%20have%20an%20admissions%20inquiry.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition shadow-md"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Admissions: {SCHOOL_PHONE}</span>
            </a>

            <a
              href={`mailto:${SCHOOL_EMAIL}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-blue-950 text-xs font-bold rounded-xl transition shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>Email: {SCHOOL_EMAIL}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Step-by-Step Admissions Procedure */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold tracking-wider uppercase text-blue-900">
            Clear & Transparent Process
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            How to Enroll Your Child in 4 Steps
          </h2>
          <p className="text-sm text-slate-600">
            We ensure an organized, supportive enrollment journey for both new parents and transferring students.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Online Application',
              desc: 'Fill out our fast online admission form below or collect a physical application pack from the registrar desk.'
            },
            {
              step: '02',
              title: 'Assessment & Interview',
              desc: 'The student attends an engaging diagnostic assessment to understand their strengths and learning profile.'
            },
            {
              step: '03',
              title: 'Admission Offer & Letter',
              desc: 'Upon successful assessment, an official letter of admission with full fee schedule is issued within 48 hours.'
            },
            {
              step: '04',
              title: 'Orientation & Induction',
              desc: 'Complete fee clearance, uniform fitting, meet class teachers, and begin your educational adventure.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative overflow-hidden group">
              <span className="absolute -top-3 -right-2 text-6xl font-black text-slate-100 group-hover:text-amber-100 transition">
                {item.step}
              </span>
              <div className="relative z-10 space-y-3">
                <span className="w-8 h-8 rounded-lg bg-blue-900 text-amber-300 font-bold flex items-center justify-center text-xs">
                  {item.step}
                </span>
                <h4 className="font-bold text-base text-slate-900">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Online Application Form & Fee Structure Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Online Admission Application Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg space-y-6">
            <div>
              <div className="inline-block px-2.5 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded-full mb-2">
                Online Portal
              </div>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Online Admission Application Form
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Official registration form for prospective students of {SCHOOL_NAME}.
              </p>
            </div>

            {submittedRef ? (
              <div className="p-6 bg-emerald-50 border-2 border-emerald-400 rounded-2xl text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xl font-bold text-emerald-950 font-serif">
                    Application Successfully Submitted!
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Your application reference number is:
                  </p>
                  <div className="text-2xl font-black tracking-wider text-emerald-900 font-mono py-1">
                    {submittedRef}
                  </div>
                  <p className="text-xs text-slate-600 max-w-md mx-auto pt-2">
                    Our admissions committee has received your details for <strong>{formData.studentName}</strong>. You will be contacted at <strong>{formData.parentPhone}</strong> within 24 hours.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=Hello%20${encodeURIComponent(SCHOOL_NAME)}%2C%20I%20have%20submitted%20an%20admission%20application%20with%20Reference%3A%20${submittedRef}%20for%20learner%20${encodeURIComponent(formData.studentName)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Follow Up on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSubmittedRef(null);
                      setFormData({
                        studentName: '',
                        gender: 'Male',
                        dob: '',
                        gradeApplying: 'Grade 7 East (Junior Secondary)',
                        previousSchool: '',
                        parentName: '',
                        parentPhone: '',
                        parentEmail: '',
                        address: '',
                        specialNeeds: ''
                      });
                    }}
                    className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs rounded-xl transition"
                  >
                    Submit Another Application
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1">
                    1. Student Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name of Student *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Samuel Kimani Mwangi"
                        value={formData.studentName}
                        onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Gender *
                      </label>
                      <select
                        value={formData.gender}
                        onChange={e => setFormData({ ...formData, gender: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={e => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Grade / Class Applying For *
                      </label>
                      <select
                        value={formData.gradeApplying}
                        onChange={e => setFormData({ ...formData, gradeApplying: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      >
                        <option value="Playgroup / Kindergarten">Playgroup / Kindergarten (Ages 3-5)</option>
                        <option value="Grade 1 - 3 (Lower Primary)">Grade 1 - 3 (Lower Primary)</option>
                        <option value="Grade 4 - 6 (Upper Primary)">Grade 4 - 6 (Upper Primary)</option>
                        <option value="Grade 7 East (Junior Secondary)">Grade 7 East (Junior Secondary)</option>
                        <option value="Grade 8 East (Junior Secondary)">Grade 8 East (Junior Secondary)</option>
                        <option value="Grade 9 Alpha (Junior Secondary)">Grade 9 Alpha (Junior Secondary)</option>
                        <option value="Grade 10 Scholars (Senior Academy)">Grade 10 Scholars (Senior Academy)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Previous School Attended (if transferring)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. St. Christopher Junior Academy"
                        value={formData.previousSchool}
                        onChange={e => setFormData({ ...formData, previousSchool: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1">
                    2. Parent / Guardian Contact Details
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Parent / Guardian Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Eng. Martin Mwangi"
                        value={formData.parentName}
                        onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone Number (WhatsApp Active) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +254 712 345 678"
                        value={formData.parentPhone}
                        onChange={e => setFormData({ ...formData, parentPhone: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. parent@example.com"
                        value={formData.parentEmail}
                        onChange={e => setFormData({ ...formData, parentEmail: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Residential Address / Town
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Nairobi / Kiambu"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Submit Official Application Now</span>
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    By submitting, your data is sent securely to the admissions department of {SCHOOL_NAME}.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right: Transparent Termly Fee Schedules & Bank Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-blue-950">
                <CreditCard className="w-5 h-5 text-amber-500" />
                <h4 className="font-serif font-bold text-lg">Term Fee Structure 2026/2027</h4>
              </div>

              <div className="space-y-3 divide-y divide-slate-100 text-xs">
                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Early Childhood & Kindergarten</span>
                    <span className="text-slate-500">Day Scholar (incl. hot nutritious lunch)</span>
                  </div>
                  <div className="font-mono font-bold text-blue-950 text-sm">KES 45,000 / term</div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Lower Primary (Grades 1 - 3)</span>
                    <span className="text-slate-500">Tuition, ICT labs & Co-curricular</span>
                  </div>
                  <div className="font-mono font-bold text-blue-950 text-sm">KES 55,000 / term</div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Upper Primary (Grades 4 - 6)</span>
                    <span className="text-slate-500">Tuition, Science practicals, French</span>
                  </div>
                  <div className="font-mono font-bold text-blue-950 text-sm">KES 60,000 / term</div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Junior Secondary (Grades 7 - 9)</span>
                    <span className="text-slate-500">STEM, Robotics, Lab Consumables</span>
                  </div>
                  <div className="font-mono font-bold text-blue-950 text-sm">KES 65,000 / term</div>
                </div>

                <div className="pt-2 flex justify-between items-center">
                  <div>
                    <span className="font-bold text-slate-800 block">Senior Academy (Grade 10)</span>
                    <span className="text-slate-500">Pre-University pathway, Science kit</span>
                  </div>
                  <div className="font-mono font-bold text-blue-950 text-sm">KES 75,000 / term</div>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <div className="font-bold">What is included in Tuition?</div>
                <div>Textbook reference materials, science laboratory apparatus, daily computer & robotics lab access, and sports training.</div>
              </div>
            </div>

            {/* Approved Payment Methods Box */}
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 shadow-md space-y-4">
              <h4 className="font-bold text-sm text-amber-400 uppercase tracking-wider">
                Official School Payment Channels
              </h4>
              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <span className="text-emerald-400 font-bold block mb-1">M-Pesa Paybill</span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Business No:</span>
                    <span className="font-mono font-bold text-white">400200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account No:</span>
                    <span className="font-mono font-bold text-amber-300">STUDENT ADMISSION NO</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-800 rounded-xl border border-slate-700">
                  <span className="text-blue-300 font-bold block mb-1">Equity Bank A/C</span>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Name:</span>
                    <span className="font-bold text-white">{SCHOOL_NAME}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Number:</span>
                    <span className="font-mono font-bold text-amber-300">0180293847291</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-400">
                  Direct questions to Accounts WhatsApp: <strong className="text-emerald-400">{SCHOOL_PHONE}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
