import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { SCHOOL_NAME, SCHOOL_PHONE, SCHOOL_PHONE_CLEAN } from '../../data/initialData';
import {
  Bell,
  Calendar,
  Tag,
  Search,
  MessageCircle,
  PlusCircle,
  Sparkles,
  AlertCircle,
  X
} from 'lucide-react';

export const AnnouncementsPage: React.FC = () => {
  const { announcements, userSession, addAnnouncement } = useSchool();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New announcement form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<'Academic' | 'Notice' | 'Events' | 'Fees' | 'Sports'>('Notice');
  const [newAudience, setNewAudience] = useState<'All' | 'Parents' | 'Teachers' | 'Students'>('All');
  const [newContent, setNewContent] = useState('');
  const [isImportant, setIsImportant] = useState(false);

  const categories = ['All', 'Academic', 'Notice', 'Events', 'Fees', 'Sports'];

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesCategory = selectedCategory === 'All' || ann.category === selectedCategory;
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          ann.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;

    addAnnouncement({
      title: newTitle,
      category: newCategory,
      targetAudience: newAudience,
      content: newContent,
      author: userSession?.name || 'School Principal Office',
      date: new Date().toISOString().split('T')[0],
      isImportant
    });

    setNewTitle('');
    setNewContent('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
            <Bell className="w-4 h-4 text-amber-400" />
            <span>Official Communications Hub</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-white">
            School Announcements
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto">
            Stay up to date with official circulars, event calendars, term dates, and notices from {SCHOOL_NAME}.
          </p>
        </div>
      </section>

      {/* Announcements Feed & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? 'bg-blue-950 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search circulars..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
              />
            </div>

            {userSession?.role === 'admin' ? (
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-950 text-white rounded-lg text-xs font-bold hover:bg-blue-900 transition"
              >
                <PlusCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>Post Announcement</span>
              </button>
            ) : null}
          </div>
        </div>

        {/* Feed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredAnnouncements.map(ann => (
            <div
              key={ann.id}
              className={`p-6 rounded-2xl border transition relative overflow-hidden ${
                ann.isImportant
                  ? 'bg-amber-50/50 border-amber-300 shadow-sm'
                  : 'bg-white border-slate-200/80 shadow-xs'
              }`}
            >
              {ann.isImportant && (
                <div className="absolute top-0 right-0 bg-amber-500 text-blue-950 text-[10px] font-extrabold uppercase px-3 py-0.5 rounded-bl-lg">
                  Priority Notice
                </div>
              )}

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2.5 py-0.5 bg-blue-900 text-amber-300 rounded-full text-[11px] font-bold">
                  {ann.category}
                </span>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-semibold">
                  Audience: {ann.targetAudience}
                </span>
                <span className="text-slate-400 text-xs flex items-center gap-1 ml-auto">
                  <Calendar className="w-3 h-3" />
                  {ann.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">
                {ann.title}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line mb-4">
                {ann.content}
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">
                  Author: <strong className="text-blue-950">{ann.author}</strong>
                </span>

                <a
                  href={`https://wa.me/${SCHOOL_PHONE_CLEAN}?text=Hello%20DR%20JOSEPH%20JIMMY%20GAITHAINGA%20ACADEMY%20SCHOOL%2C%20I%20have%20a%20question%20regarding%20the%20announcement%3A%20${encodeURIComponent(ann.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold"
                >
                  <MessageCircle className="w-3 h-3" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>
            </div>
          ))}

          {filteredAnnouncements.length === 0 && (
            <div className="col-span-2 p-12 bg-white rounded-2xl border text-center text-slate-400">
              No announcements found matching your filter.
            </div>
          )}
        </div>
      </section>

      {/* Modal for creating announcement (Admin) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-900 text-base">Post School Announcement</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. End of Term Closing Ceremony & Reports"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Notice">Notice</option>
                    <option value="Events">Events</option>
                    <option value="Fees">Fees</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={newAudience}
                    onChange={e => setNewAudience(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                  >
                    <option value="All">All Audiences</option>
                    <option value="Parents">Parents Only</option>
                    <option value="Teachers">Teachers Only</option>
                    <option value="Students">Students Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Content *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type the full announcement message here..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="urgentFlag"
                  checked={isImportant}
                  onChange={e => setIsImportant(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <label htmlFor="urgentFlag" className="font-semibold text-slate-700">
                  Mark as High Priority / Urgent Notice
                </label>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded-lg font-semibold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-950 text-white rounded-lg font-bold hover:bg-blue-900"
                >
                  Publish Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
