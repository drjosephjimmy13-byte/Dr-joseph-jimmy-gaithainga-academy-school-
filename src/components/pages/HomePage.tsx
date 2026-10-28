import React from 'react';
import { SchoolLogo } from '../common/SchoolLogo';
import { useSchool } from '../../context/SchoolContext';
import {
  SCHOOL_NAME,
  SCHOOL_PHONE,
  SCHOOL_PHONE_CLEAN,
  SCHOOL_EMAIL,
  SCHOOL_MOTTO,
  CORE_VALUES,
  ACADEMIC_PROGRAMS,
  TESTIMONIALS
} from '../../data/initialData';
import {
  MessageCircle,
  Mail,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Users,
  Award,
  BookOpen,
  Compass,
  Trophy,
  Microscope,
  Cpu,
  Clock,
  Phone
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { announcements } = useSchool();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500 shadow-xl">
        {/* Subtle decorative geometric background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Core CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold backdrop-blur-xs">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span>Nurturing Excellence, Character & Innovation</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-serif font-black tracking-tight leading-tight text-white drop-shadow-sm">
                  {SCHOOL_NAME}
                </h1>
                <p className="text-base sm:text-xl text-amber-300 font-serif italic tracking-wide">
                  "{SCHOOL_MOTTO}"
                </p>
              </div>

              <p className="text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed">
                Welcome to a premier academic institution committed to cultivating intellectual rigor, disciplined character, STEM innovation, and moral leadership in every student.
              </p>

              {/* Required Prominent Action Buttons: WhatsApp & Email & Admissions */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=Hello%20DR%20JOSEPH%20JIMMY%20GAITHAINGA%20ACADEMY%20SCHOOL%2C%20I%20would%20like%20to%20inquire%20about%20admissions%20for%20my%20child.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg hover:shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href={`mailto:${SCHOOL_EMAIL}?subject=Admissions%20Inquiry%20-%20DR%20JOSEPH%20JIMMY%20GAITHAINGA%20ACADEMY%20SCHOOL`}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold text-sm shadow-lg hover:shadow-amber-500/30 transition transform hover:-translate-y-0.5"
                >
                  <Mail className="w-5 h-5 text-blue-950" />
                  <span>Send Email</span>
                </a>

                <button
                  onClick={() => onNavigate('admissions')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-sm backdrop-blur-xs transition"
                >
                  <span>Admissions Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Direct Quick Badges */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-blue-800/60 text-xs text-blue-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Junior & Senior CBC Tracks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Modern STEM & Robotics Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Boarding & Day Facilities</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Academy Feature Card */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 text-white relative">
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="flex items-center gap-3">
                    <SchoolLogo size="md" textColor="text-white" subtextColor="text-amber-300" />
                  </div>
                  <span className="px-2.5 py-1 bg-amber-400/20 text-amber-300 text-xs font-semibold rounded-full border border-amber-400/30">
                    2026/2027 Admissions
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="text-xs uppercase font-bold tracking-wider text-amber-300">
                    Admissions Open for All Classes
                  </div>
                  <h3 className="text-xl font-bold font-serif leading-tight">
                    Secure Your Child's Bright Future at {SCHOOL_NAME}
                  </h3>
                  <p className="text-xs text-blue-100 leading-relaxed">
                    Our rigorous curriculum combines academic distinction, high moral standards, ICT literacy, and competitive extracurriculars.
                  </p>
                </div>

                <div className="bg-blue-950/70 p-4 rounded-2xl border border-blue-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Admissions Office WhatsApp:</span>
                    <strong className="text-emerald-400">{SCHOOL_PHONE}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Official Email:</span>
                    <strong className="text-amber-300">{SCHOOL_EMAIL}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Interview Days:</span>
                    <span className="text-white font-medium">Wednesdays & Saturdays</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    onClick={() => onNavigate('admissions')}
                    className="w-full py-2.5 px-3 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold rounded-xl text-xs text-center transition"
                  >
                    Online Application
                  </button>
                  <button
                    onClick={() => onNavigate('login')}
                    className="w-full py-2.5 px-3 bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl text-xs text-center transition"
                  >
                    Portal Access &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Academy Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          <div className="pt-4 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-950">98.8%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">National Exam Pass Rate</div>
            <div className="text-[11px] text-amber-600 font-medium mt-0.5">Consistent Top Tier Ranking</div>
          </div>
          <div className="pt-4 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-950">42+</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Certified Educators</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Specialized Master Teachers</div>
          </div>
          <div className="pt-4 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-950">1:18</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Teacher-to-Student Ratio</div>
            <div className="text-[11px] text-blue-600 font-medium mt-0.5">Personalized Mentorship</div>
          </div>
          <div className="pt-4 lg:pt-0">
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-950">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">STEM & Digital Literacy</div>
            <div className="text-[11px] text-purple-600 font-medium mt-0.5">Coding, Robotics & Science</div>
          </div>
        </div>
      </section>

      {/* Welcome Message From The Principal */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Principal Visual Badge */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative">
                <div className="w-44 h-44 rounded-2xl bg-gradient-to-br from-blue-950 to-indigo-900 flex items-center justify-center p-3 shadow-xl ring-4 ring-amber-400">
                  <div className="w-full h-full rounded-xl bg-blue-900 flex flex-col items-center justify-center text-amber-300 p-4 text-center">
                    <GraduationCap className="w-12 h-12 text-amber-400 mb-2" />
                    <span className="font-serif font-bold text-xs uppercase tracking-wider text-white">Office of the Director</span>
                    <span className="text-[10px] text-amber-200 mt-1">Academic Leadership</span>
                  </div>
                </div>
                <div className="absolute -bottom-3 bg-amber-500 text-blue-950 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  Principal & Founder
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-serif font-bold text-lg text-slate-900">Dr. Joseph Jimmy Gaithainga</h3>
                <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider">Ph.D, M.Ed, OGW</p>
                <p className="text-xs text-slate-500 mt-1">Founder & Executive Director</p>
              </div>
            </div>

            {/* Welcome Letter Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-block text-xs font-bold tracking-wider uppercase text-blue-900 bg-blue-100 px-3 py-1 rounded-full">
                Welcome Message
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                Welcome to {SCHOOL_NAME}
              </h2>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  "It is with profound joy and privilege that I welcome you to {SCHOOL_NAME}. Since our founding, our enduring mission has been to provide an educational haven where intellectual passion meets unyielding moral discipline."
                </p>
                <p>
                  "We believe that every child is endowed with boundless talents waiting to be sparked. Through our dedicated faculty, state-of-the-art STEM and robotics facilities, comprehensive language mastery, and deep-rooted character education, we prepare our scholars not merely for academic triumph, but to be principled leaders who leave a positive mark on our world."
                </p>
                <p>
                  "Whether you are a prospective parent seeking a caring, ambitious school community, a current student reaching for new heights, or a valued partner, we invite you to experience the difference at {SCHOOL_NAME}."
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-700 underline underline-offset-4"
                >
                  <span>Read More About Our Heritage & Philosophy</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-slate-300">|</span>
                <a
                  href={`https://wa.me/${SCHOOL_PHONE_CLEAN}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Speak With Our Director on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Core Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold tracking-wider uppercase text-amber-600">
            Our Foundation
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            Mission, Vision & Guiding Principles
          </h2>
          <p className="text-sm text-slate-600">
            Everything we do at {SCHOOL_NAME} is anchored in our commitment to holistic excellence and purposeful service.
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-2xl p-8 shadow-lg space-y-4 border-t-4 border-amber-400">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Our Mission</h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              To provide high-quality, inclusive, and transformative education that equips learners with rigorous academic knowledge, critical thinking, technological agility, and moral character to thrive and serve with distinction in an evolving global society.
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-8 shadow-lg space-y-4 border-t-4 border-emerald-400">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-white">Our Vision</h3>
            <p className="text-sm text-slate-200 leading-relaxed">
              To be the benchmark academy of scholastic excellence, moral fortitude, and scientific innovation in East Africa, producing visionary leaders, ethical thinkers, and community champions.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          {CORE_VALUES.map((val, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:shadow-md hover:border-amber-400/60 transition group"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 group-hover:bg-amber-500 group-hover:text-blue-950 flex items-center justify-center mb-4 transition font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-2 group-hover:text-blue-950">
                {val.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Academic Programs & Stages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="text-xs font-bold tracking-wider uppercase text-blue-900">
              Curricular Pathways
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Academic Wings & Pathways
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              From early foundational curiosity to advanced junior and senior secondary specialization, we provide structured progression.
            </p>
          </div>

          <button
            onClick={() => onNavigate('classes')}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
          >
            <span>Explore Classes & Timetables</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ACADEMIC_PROGRAMS.map((prog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden flex flex-col hover:shadow-lg transition"
            >
              <div className={`p-6 bg-gradient-to-r ${prog.color} text-white space-y-2`}>
                <span className="text-[11px] font-bold uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full inline-block">
                  {prog.age}
                </span>
                <h3 className="text-lg font-serif font-bold text-white">{prog.level}</h3>
                <p className="text-xs text-white/90 italic">{prog.tagline}</p>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <ul className="space-y-2 text-xs text-slate-700">
                  {prog.features.map((feat, fidx) => (
                    <li key={fidx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onNavigate('admissions')}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-blue-950 hover:text-white text-slate-800 font-bold text-xs rounded-xl transition text-center"
                >
                  Apply For This Level &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities & Campus Life */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
              World-Class Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Campus Facilities at {SCHOOL_NAME}
            </h2>
            <p className="text-sm text-slate-400">
              Modern learning facilities designed to stimulate inquisitive young minds and nourish athletic and artistic potential.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Microscope,
                title: "Ultra-Modern Science Labs",
                desc: "Equipped chemistry, physics, and biological laboratories for rigorous hands-on experiments and discovery."
              },
              {
                icon: Cpu,
                title: "Robotics & Coding Hub",
                desc: "High-speed broadband network, 50+ modern workstations, 3D printing equipment, and microcontroller kits."
              },
              {
                icon: BookOpen,
                title: "Comprehensive Digital Library",
                desc: "Quiet study zones, over 10,000 physical volumes, research periodicals, and international digital archives."
              },
              {
                icon: Trophy,
                title: "Sports & Athletics Arena",
                desc: "Regulation football pitch, basketball court, swimming academy, and indoor athletics training pavilion."
              }
            ].map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <div key={idx} className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-950 text-amber-400 flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">{fac.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{fac.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Announcements & Urgent Circulars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-bold tracking-wider uppercase text-amber-600">
              Stay Informed
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Recent Announcements & Notices
            </h2>
          </div>
          <button
            onClick={() => onNavigate('announcements')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700"
          >
            <span>View All Announcements</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.slice(0, 4).map(ann => (
            <div
              key={ann.id}
              className={`p-6 rounded-2xl border transition ${
                ann.isImportant
                  ? 'bg-amber-50/40 border-amber-300 shadow-xs'
                  : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-900 text-amber-300">
                  {ann.category}
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{ann.date}</span>
                </div>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                {ann.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                {ann.content}
              </p>
              <div className="text-[11px] text-slate-500 font-medium">
                Issued by: <span className="text-blue-950 font-semibold">{ann.author}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials from Parents & Students */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="text-xs font-bold tracking-wider uppercase text-blue-900">
            Voices of Our Community
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            What Parents & Scholars Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="text-lg">&starf;</span>
                  ))}
                </div>
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="border-t border-slate-100 pt-3">
                <div className="text-sm font-bold text-blue-950">{t.author}</div>
                <div className="text-[11px] text-slate-500">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border-4 border-amber-400/50 text-center space-y-6">
          <div className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 text-xs font-bold rounded-full">
            Enrollment Inquiries 2026/2027
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold max-w-3xl mx-auto">
            Give Your Child the Gift of Excellence at {SCHOOL_NAME}
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Take the first step toward an inspiring academic adventure. Contact our admissions director directly on WhatsApp or drop us an email.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=Hello%20DR%20JOSEPH%20JIMMY%20GAITHAINGA%20ACADEMY%20SCHOOL%2C%20I%20am%20ready%20to%20apply%20for%20admissions.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp: {SCHOOL_PHONE}</span>
            </a>

            <a
              href={`mailto:${SCHOOL_EMAIL}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold text-sm rounded-xl shadow-lg transition"
            >
              <Mail className="w-5 h-5 text-blue-950" />
              <span>Email: {SCHOOL_EMAIL}</span>
            </a>

            <button
              onClick={() => onNavigate('admissions')}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-xl border border-white/30 transition"
            >
              <span>Fill Online Admission Form</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
