import React, { useState } from 'react';
import { SCHOOL_PHONE, SCHOOL_PHONE_CLEAN, SCHOOL_NAME } from '../../data/initialData';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMsg = encodeURIComponent(`Hello ${SCHOOL_NAME}, I would like to inquire about school admissions, fees, and visits.`);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end no-print">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">School Help Desk</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span>
                  Online | Typically replies within minutes
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-slate-50 space-y-3">
            <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-xs border border-slate-200/60 text-xs text-slate-700 leading-relaxed">
              <p className="font-semibold text-blue-950 mb-1">{SCHOOL_NAME}</p>
              Welcome! We are ready to assist you with admissions inquiries, fee payments, student progress, or scheduling a campus tour.
            </div>

            <div className="text-[11px] text-slate-500 font-medium">
              Direct WhatsApp: <strong className="text-slate-800">{SCHOOL_PHONE}</strong>
            </div>

            <a
              href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=${defaultMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md hover:shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Start WhatsApp Chat Now</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-emerald-600/40 transition-all transform hover:scale-105 group"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white/20" />
        <span className="font-bold text-sm hidden sm:inline tracking-wide">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
};
