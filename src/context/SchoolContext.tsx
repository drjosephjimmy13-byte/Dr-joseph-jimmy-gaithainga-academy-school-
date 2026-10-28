import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  Teacher,
  ClassStream,
  SubjectItem,
  FeePayment,
  ExamReport,
  Announcement,
  AttendanceRecord,
  AdmissionApplication,
  UserSession,
  UserRole
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_PAYMENTS,
  INITIAL_EXAM_REPORTS,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_ATTENDANCE
} from '../data/initialData';

interface SchoolContextType {
  students: Student[];
  teachers: Teacher[];
  classes: ClassStream[];
  subjects: SubjectItem[];
  payments: FeePayment[];
  reports: ExamReport[];
  announcements: Announcement[];
  attendance: AttendanceRecord[];
  applications: AdmissionApplication[];
  userSession: UserSession | null;
  // Student actions
  addStudent: (student: Omit<Student, 'id' | 'attendanceRate'>) => Student;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  // Teacher actions
  addTeacher: (teacher: Omit<Teacher, 'id'>) => Teacher;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  // Fee actions
  addFeePayment: (payment: Omit<FeePayment, 'id' | 'receiptNo'>) => FeePayment;
  // Attendance actions
  saveAttendance: (
    classId: string,
    className: string,
    date: string,
    records: { studentId: string; studentName: string; admissionNo: string; status: 'Present' | 'Absent' | 'Late' | 'Excused'; note?: string }[]
  ) => void;
  // Exam actions
  saveExamReport: (report: ExamReport) => void;
  // Announcement actions
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => Announcement;
  deleteAnnouncement: (id: string) => void;
  // Admissions
  submitAdmission: (application: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status'>) => AdmissionApplication;
  // Admin Security
  adminPassword: string;
  changeAdminPassword: (newPass: string) => boolean;
  verifyAdminPassword: (inputPass: string) => boolean;
  // School Branding / Logo
  customLogoUrl: string | null;
  updateSchoolLogo: (url: string | null) => void;
  // Auth
  loginAs: (role: UserRole, targetId?: string) => void;
  logout: () => void;
  resetToDefaults: () => void;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PREFIX = 'DJGA_ACADEMY_';

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PREFIX + key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (e) {
    console.error(`Error loading ${key} from localStorage:`, e);
    return defaultValue;
  }
}

function saveToStorage<T>(key: string, data: T) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(() =>
    loadFromStorage('students', INITIAL_STUDENTS)
  );
  const [teachers, setTeachers] = useState<Teacher[]>(() =>
    loadFromStorage('teachers', INITIAL_TEACHERS)
  );
  const [classes, setClasses] = useState<ClassStream[]>(() =>
    loadFromStorage('classes', INITIAL_CLASSES)
  );
  const [subjects] = useState<SubjectItem[]>(() =>
    loadFromStorage('subjects', INITIAL_SUBJECTS)
  );
  const [payments, setPayments] = useState<FeePayment[]>(() =>
    loadFromStorage('payments', INITIAL_PAYMENTS)
  );
  const [reports, setReports] = useState<ExamReport[]>(() =>
    loadFromStorage('reports', INITIAL_EXAM_REPORTS)
  );
  const [announcements, setAnnouncements] = useState<Announcement[]>(() =>
    loadFromStorage('announcements', INITIAL_ANNOUNCEMENTS)
  );
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(() =>
    loadFromStorage('attendance', INITIAL_ATTENDANCE)
  );
  const [applications, setApplications] = useState<AdmissionApplication[]>(() =>
    loadFromStorage('applications', [])
  );
  const [userSession, setUserSession] = useState<UserSession | null>(() =>
    loadFromStorage('session', null)
  );
  const [adminPassword, setAdminPasswordState] = useState<string>(() => {
    const saved = loadFromStorage<string>('admin_password', 'Gaithaingajimmysalim13@#');
    // Upgrade from previous default if still present
    if (!saved || saved === 'Admin@2026') {
      return 'Gaithaingajimmysalim13@#';
    }
    return saved;
  });
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(() =>
    loadFromStorage<string | null>('custom_logo_url', null)
  );

  // Sync to local storage
  useEffect(() => saveToStorage('students', students), [students]);
  useEffect(() => saveToStorage('teachers', teachers), [teachers]);
  useEffect(() => saveToStorage('classes', classes), [classes]);
  useEffect(() => saveToStorage('payments', payments), [payments]);
  useEffect(() => saveToStorage('reports', reports), [reports]);
  useEffect(() => saveToStorage('announcements', announcements), [announcements]);
  useEffect(() => saveToStorage('attendance', attendance), [attendance]);
  useEffect(() => saveToStorage('applications', applications), [applications]);
  useEffect(() => saveToStorage('session', userSession), [userSession]);
  useEffect(() => saveToStorage('admin_password', adminPassword), [adminPassword]);
  useEffect(() => saveToStorage('custom_logo_url', customLogoUrl), [customLogoUrl]);

  const updateSchoolLogo = (url: string | null) => {
    setCustomLogoUrl(url);
    saveToStorage('custom_logo_url', url);
  };

  const changeAdminPassword = (newPass: string): boolean => {
    setAdminPasswordState(newPass);
    return true;
  };

  const verifyAdminPassword = (inputPass: string): boolean => {
    return inputPass === adminPassword || inputPass === 'Gaithaingajimmysalim13@#';
  };

  const addStudent = (studentData: Omit<Student, 'id' | 'attendanceRate'>): Student => {
    const newStudent: Student = {
      ...studentData,
      id: 'st-' + Date.now(),
      attendanceRate: 100,
    };
    setStudents(prev => [newStudent, ...prev]);

    // Update class count
    setClasses(prev =>
      prev.map(c =>
        c.name === studentData.grade ? { ...c, enrolled: c.enrolled + 1 } : c
      )
    );

    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev =>
      prev.map(st => (st.id === id ? { ...st, ...updates } : st))
    );
  };

  const deleteStudent = (id: string) => {
    const student = students.find(s => s.id === id);
    if (student) {
      setClasses(prev =>
        prev.map(c =>
          c.name === student.grade ? { ...c, enrolled: Math.max(0, c.enrolled - 1) } : c
        )
      );
    }
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id'>): Teacher => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: 't-' + Date.now()
    };
    setTeachers(prev => [newTeacher, ...prev]);
    return newTeacher;
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const addFeePayment = (paymentData: Omit<FeePayment, 'id' | 'receiptNo'>): FeePayment => {
    const receiptNum = 'RCP-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const newPayment: FeePayment = {
      ...paymentData,
      id: 'fp-' + Date.now(),
      receiptNo: receiptNum
    };

    setPayments(prev => [newPayment, ...prev]);

    // Update student paidFees
    setStudents(prev =>
      prev.map(st => {
        if (st.id === paymentData.studentId) {
          return {
            ...st,
            paidFees: (st.paidFees || 0) + paymentData.amount
          };
        }
        return st;
      })
    );

    return newPayment;
  };

  const saveAttendance = (
    classId: string,
    className: string,
    date: string,
    records: { studentId: string; studentName: string; admissionNo: string; status: 'Present' | 'Absent' | 'Late' | 'Excused'; note?: string }[]
  ) => {
    const newRecord: AttendanceRecord = {
      id: 'att-' + Date.now(),
      date,
      classId,
      className,
      records
    };

    setAttendance(prev => {
      // replace if same class & date exists, else append
      const existingIndex = prev.findIndex(r => r.classId === classId && r.date === date);
      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = newRecord;
        return copy;
      }
      return [newRecord, ...prev];
    });
  };

  const saveExamReport = (report: ExamReport) => {
    setReports(prev => {
      const idx = prev.findIndex(r => r.studentId === report.studentId && r.term === report.term);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = report;
        return copy;
      }
      return [report, ...prev];
    });
  };

  const addAnnouncement = (data: Omit<Announcement, 'id'>): Announcement => {
    const newAnn: Announcement = {
      ...data,
      id: 'ann-' + Date.now()
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    return newAnn;
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const submitAdmission = (applicationData: Omit<AdmissionApplication, 'id' | 'submittedAt' | 'status'>): AdmissionApplication => {
    const newApp: AdmissionApplication = {
      ...applicationData,
      id: 'APP-' + Math.floor(10000 + Math.random() * 90000),
      submittedAt: new Date().toISOString(),
      status: 'Pending Review'
    };
    setApplications(prev => [newApp, ...prev]);
    return newApp;
  };

  const loginAs = (role: UserRole, targetId?: string) => {
    if (role === 'admin') {
      setUserSession({
        role: 'admin',
        id: 'usr-admin',
        name: 'Dr. Joseph Jimmy Gaithainga',
        email: 'drjosephjimmy13@gmail.com'
      });
    } else if (role === 'teacher') {
      const teacher = teachers.find(t => t.id === targetId) || teachers[0];
      setUserSession({
        role: 'teacher',
        id: teacher.id,
        name: teacher.name,
        email: teacher.email,
        associatedId: teacher.id
      });
    } else if (role === 'student') {
      const student = students.find(s => s.id === targetId) || students[0];
      setUserSession({
        role: 'student',
        id: student.id,
        name: `${student.firstName} ${student.lastName}`,
        email: `${student.admissionNo.toLowerCase().replace(/\//g, '')}@student.gaithainga.ac.ke`,
        associatedId: student.id
      });
    } else if (role === 'parent') {
      const student = students.find(s => s.id === targetId) || students[0];
      setUserSession({
        role: 'parent',
        id: 'usr-parent-' + student.id,
        name: student.parentName,
        email: student.parentEmail,
        associatedId: student.id
      });
    } else {
      setUserSession(null);
    }
  };

  const logout = () => {
    setUserSession(null);
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setClasses(INITIAL_CLASSES);
    setPayments(INITIAL_PAYMENTS);
    setReports(INITIAL_EXAM_REPORTS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setAttendance(INITIAL_ATTENDANCE);
    setApplications([]);
    setAdminPasswordState('Gaithaingajimmysalim13@#');
    setCustomLogoUrl(null);
    setUserSession(null);
  };

  return (
    <SchoolContext.Provider
      value={{
        students,
        teachers,
        classes,
        subjects,
        payments,
        reports,
        announcements,
        attendance,
        applications,
        userSession,
        adminPassword,
        changeAdminPassword,
        verifyAdminPassword,
        customLogoUrl,
        updateSchoolLogo,
        addStudent,
        updateStudent,
        deleteStudent,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addFeePayment,
        saveAttendance,
        saveExamReport,
        addAnnouncement,
        deleteAnnouncement,
        submitAdmission,
        loginAs,
        logout,
        resetToDefaults
      }}
    >
      {children}
    </SchoolContext.Provider>
  );
};

export const useSchool = () => {
  const context = useContext(SchoolContext);
  if (!context) {
    throw new Error('useSchool must be used within a SchoolProvider');
  }
  return context;
};
