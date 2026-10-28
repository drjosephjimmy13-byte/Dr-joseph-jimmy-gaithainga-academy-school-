import React, { useState, useEffect } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { WhatsAppFloatingButton } from './components/common/WhatsAppButton';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { AdmissionsPage } from './components/pages/AdmissionsPage';
import { ClassesSubjectsPage } from './components/pages/ClassesSubjectsPage';
import { AnnouncementsPage } from './components/pages/AnnouncementsPage';
import { ContactPage } from './components/pages/ContactPage';
import { LoginPage } from './components/pages/LoginPage';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { TeacherPortal } from './components/portals/TeacherPortal';
import { StudentPortal } from './components/portals/StudentPortal';
import { ParentPortal } from './components/portals/ParentPortal';

const MainContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const { userSession } = useSchool();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render appropriate page view
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'admissions':
        return <AdmissionsPage />;
      case 'classes':
        return <ClassesSubjectsPage />;
      case 'announcements':
        return <AnnouncementsPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AdminDashboard />
          </div>
        );
      case 'teacher-portal':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <TeacherPortal />
          </div>
        );
      case 'student-portal':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <StudentPortal />
          </div>
        );
      case 'parent-portal':
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ParentPortal />
          </div>
        );
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-amber-500 selection:text-white">
      {/* Top Navigation */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Area */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action WhatsApp Help Widget */}
      <WhatsAppFloatingButton />
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <MainContent />
    </SchoolProvider>
  );
}
