export type UserRole = 'public' | 'admin' | 'teacher' | 'student' | 'parent';

export interface UserSession {
  role: UserRole;
  id: string;
  name: string;
  email: string;
  avatar?: string;
  associatedId?: string; // studentId or teacherId
}

export interface Student {
  id: string;
  admissionNo: string;
  firstName: string;
  lastName: string;
  gender: 'Male' | 'Female';
  grade: string; // e.g., 'Grade 7 East', 'Grade 8 West'
  dateOfBirth: string;
  enrollmentDate: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  status: 'Active' | 'On Leave' | 'Transferred' | 'Graduated';
  totalFees: number;
  paidFees: number;
  attendanceRate: number; // percentage
  emergencyContact: string;
  bloodGroup?: string;
}

export interface Teacher {
  id: string;
  staffId: string;
  name: string;
  title: string; // e.g. 'Senior Master', 'HOD Science'
  gender: 'Male' | 'Female';
  email: string;
  phone: string;
  qualification: string;
  department: 'Mathematics' | 'Sciences' | 'Languages' | 'Humanities' | 'Creative Arts & Tech';
  subjects: string[];
  classesAssigned: string[];
  joinedDate: string;
  status: 'Active' | 'On Leave';
}

export interface ClassStream {
  id: string;
  name: string; // e.g. "Grade 7 East"
  gradeLevel: string; // "Grade 7"
  stream: string; // "East"
  classTeacherId: string;
  classTeacherName: string;
  capacity: number;
  enrolled: number;
  roomNumber: string;
}

export interface SubjectItem {
  id: string;
  code: string;
  name: string;
  department: string;
  periodsPerWeek: number;
}

export interface AttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  classId: string;
  className: string;
  records: {
    studentId: string;
    studentName: string;
    admissionNo: string;
    status: 'Present' | 'Absent' | 'Late' | 'Excused';
    note?: string;
  }[];
}

export interface FeePayment {
  id: string;
  receiptNo: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  grade: string;
  amount: number;
  date: string;
  paymentMethod: 'M-Pesa' | 'Bank Wire' | 'Cash' | 'Cheque';
  transactionRef: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  academicYear: string;
  paidBy: string;
  notes?: string;
}

export interface SubjectGrade {
  subjectName: string;
  score: number; // 0-100
  grade: string; // A, A-, B+, etc.
  points: number; // 12-1
  remarks: string;
  teacherName: string;
}

export interface ExamReport {
  id: string;
  studentId: string;
  studentName: string;
  admissionNo: string;
  grade: string;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  examType: 'Mid-Term Assessment' | 'End of Term Exam' | 'Mock Examination';
  academicYear: string;
  subjects: SubjectGrade[];
  totalMarks: number;
  meanScore: number;
  overallGrade: string;
  classPosition: number;
  totalStudents: number;
  classTeacherRemarks: string;
  headTeacherRemarks: string;
  issueDate: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Academic' | 'Notice' | 'Events' | 'Fees' | 'Sports';
  targetAudience: 'All' | 'Parents' | 'Teachers' | 'Students';
  date: string;
  content: string;
  author: string;
  isImportant?: boolean;
}

export interface AdmissionApplication {
  id: string;
  studentName: string;
  gender: string;
  dob: string;
  gradeApplying: string;
  previousSchool: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  submittedAt: string;
  status: 'Pending Review' | 'Interview Scheduled' | 'Accepted' | 'Declined';
}
