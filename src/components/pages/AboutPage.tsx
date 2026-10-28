import React from 'react';
import { SchoolLogo } from '../common/SchoolLogo';
import {
  SCHOOL_NAME,
  SCHOOL_PHONE,
  SCHOOL_PHONE_CLEAN,
  SCHOOL_EMAIL,
  SCHOOL_LOCATION,
  SCHOOL_MOTTO,
  CORE_VALUES
} from '../../data/initialData';
import {
  GraduationCap,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
  Target,
  HeartHandshake,
  CheckCircle2,
  MessageCircle,
  Mail,
  Building,
  Flame
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Legacy of Scholastic & Character Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
            About {SCHOOL_NAME}
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto italic font-serif">
            "{SCHOOL_MOTTO}"
          </p>
        </div>
      </section>

      {/* Heritage & Founder's Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-200/80 text-center space-y-4 w-full max-w-md">
              <div className="w-28 h-28 mx-auto rounded-full bg-blue-950 p-2 shadow-lg ring-4 ring-amber-400 flex items-center justify-center">
                <SchoolLogo size="lg" showText={false} />
              </div>

              <div>
                <h3 className="font-serif font-bold text-xl text-slate-900">Dr. Joseph Jimmy Gaithainga</h3>
                <p className="text-xs font-semibold text-amber-700 uppercase tracking-widest mt-0.5">Founding Director</p>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  A distinguished educationist and visionary advocate for experiential learning, technological advancement, and disciplined mentorship across Kenya and East Africa.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-blue-50 p-2.5 rounded-xl text-blue-950 font-medium">
                  <div className="font-bold text-base text-blue-900">2009</div>
                  <span>Year Established</span>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-xl text-amber-900 font-medium">
                  <div className="font-bold text-base text-amber-800">100%</div>
                  <span>Transition Rate</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            <div className="inline-block text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-3 py-1 rounded-full">
              Our Inception & Evolution
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              A Legacy Built on Integrity, Passion and Boundless Potential
            </h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              <p>
                {SCHOOL_NAME} was founded with a single uncompromising conviction: that every learner, when nurtured in an environment of high scholastic expectations, empathetic teacher mentorship, and unswerving moral grounding, is capable of extraordinary achievement.
              </p>
              <p>
                What began as a pioneering cohort of eager young minds has blossomed into one of the country's most respected educational academies. Our campus integrates the Kenyan Competency-Based Curriculum (CBC) with contemporary global STEM pedagogies, modern computer labs, expansive sporting facilities, and an enriched arts program.
              </p>
              <p>
                Today, {SCHOOL_NAME} continues to lead in academic rankings, regional science & robotics fairs, athletics championships, and drama festivals, while maintaining the warm, close-knit family ethos upon which it was established.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="text-xs font-bold tracking-wider uppercase text-amber-600">
              The Pillars of Our Ethos
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Our Core Academy Values
            </h2>
            <p className="text-sm text-slate-600">
              These fundamental virtues inform every classroom discussion, athletic competition, disciplinary action, and social interaction at {SCHOOL_NAME}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/80 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-900 text-amber-400 flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <h4 className="text-base font-bold text-slate-900">{val.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Leadership & Governance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold tracking-wider uppercase text-blue-900">
            Governance & Guidance
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            School Administrative Council
          </h2>
          <p className="text-sm text-slate-600">
            Guided by seasoned educators and administrative leaders who oversee academic standards, institutional welfare, and child safeguarding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Dr. Joseph Jimmy Gaithainga',
              role: 'Executive Director & Founder',
              bio: 'Ph.D in Education Administration, visionary educational reformer and trustee.'
            },
            {
              name: 'Mr. David Kariuki',
              role: 'Senior Master & Head of Academics',
              bio: 'Master of Education with 15+ years experience directing curriculum excellence and national examination preparedness.'
            },
            {
              name: 'Ms. Grace Muthoni',
              role: 'Dean of Students & Co-Curricular',
              bio: 'Specialist in student pastoral care, debate, language arts, and social-emotional development.'
            },
            {
              name: 'Dr. Samuel Ochieng',
              role: 'Director of STEM & Innovations',
              bio: 'Oversees biological science labs, robotics curriculum, and regional STEM Olympiad coaching.'
            },
            {
              name: 'Mrs. Faith Wambui',
              role: 'Head of Counseling & Careers',
              bio: 'Provides academic guidance, psychological counseling, and secondary-to-university pathway mapping.'
            },
            {
              name: 'Mr. Patrick Kiprono',
              role: 'ICT & Digital Infrastructure Lead',
              bio: 'Heads digital learning infrastructure, student programming initiatives, and school management systems.'
            }
          ].map((leader, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-950 flex items-center justify-center font-bold text-sm mb-3">
                {leader.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <h4 className="font-bold text-slate-900 text-base">{leader.name}</h4>
              <p className="text-xs font-semibold text-amber-700">{leader.role}</p>
              <p className="text-xs text-slate-500 pt-1 leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-amber-400">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              Schedule a Campus Tour at {SCHOOL_NAME}
            </h3>
            <p className="text-xs sm:text-sm text-blue-200">
              We welcome prospective parents and learners to visit our classrooms, laboratories, and grounds.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=Hello%20DR%20JOSEPH%20JIMMY%20GAITHAINGA%20ACADEMY%20SCHOOL%2C%20I%20would%20like%20to%20book%20a%20school%20visit.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book via WhatsApp: {SCHOOL_PHONE}</span>
            </a>

            <a
              href={`mailto:${SCHOOL_EMAIL}`}
              className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-blue-950 font-bold text-xs rounded-xl shadow-md transition"
            >
              <Mail className="w-4 h-4" />
              <span>Email: {SCHOOL_EMAIL}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
