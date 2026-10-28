import {
  Student,
  Teacher,
  ClassStream,
  SubjectItem,
  FeePayment,
  ExamReport,
  Announcement,
  AttendanceRecord
} from '../types';

export const SCHOOL_NAME = "DR JOSEPH JIMMY GAITHAINGA ACADEMY SCHOOL";
export const SCHOOL_PHONE = "+254 143 265 743";
export const SCHOOL_PHONE_CLEAN = "254143265743";
export const SCHOOL_EMAIL = "drjosephjimmy13@gmail.com";
export const SCHOOL_LOCATION = "Kikuyu Road, Education Ridge Campus, Nairobi / Kiambu, Kenya";
export const SCHOOL_MOTTO = "Knowledge, Character, and Excellence in Service";
export const SCHOOL_FOUNDED = "2009";

export const INITIAL_CLASSES: ClassStream[] = [
  { id: 'c1', name: 'Grade 7 East', gradeLevel: 'Grade 7', stream: 'East', classTeacherId: 't1', classTeacherName: 'Mr. David Kariuki', capacity: 40, enrolled: 36, roomNumber: 'Block A - Room 101' },
  { id: 'c2', name: 'Grade 7 West', gradeLevel: 'Grade 7', stream: 'West', classTeacherId: 't2', classTeacherName: 'Ms. Grace Muthoni', capacity: 40, enrolled: 35, roomNumber: 'Block A - Room 102' },
  { id: 'c3', name: 'Grade 8 East', gradeLevel: 'Grade 8', stream: 'East', classTeacherId: 't3', classTeacherName: 'Dr. Samuel Ochieng', capacity: 40, enrolled: 38, roomNumber: 'Block B - Room 201' },
  { id: 'c4', name: 'Grade 8 West', gradeLevel: 'Grade 8', stream: 'West', classTeacherId: 't4', classTeacherName: 'Mrs. Faith Wambui', capacity: 40, enrolled: 37, roomNumber: 'Block B - Room 202' },
  { id: 'c5', name: 'Grade 9 Alpha', gradeLevel: 'Grade 9', stream: 'Alpha', classTeacherId: 't5', classTeacherName: 'Mr. Patrick Kiprono', capacity: 40, enrolled: 34, roomNumber: 'STEM Complex - Room 301' },
  { id: 'c6', name: 'Grade 10 Scholars', gradeLevel: 'Grade 10', stream: 'Scholars', classTeacherId: 't1', classTeacherName: 'Mr. David Kariuki', capacity: 35, enrolled: 32, roomNumber: 'Senior Wing - Room 401' },
];

export const INITIAL_SUBJECTS: SubjectItem[] = [
  { id: 's1', code: 'MTH-101', name: 'Mathematics', department: 'Mathematics', periodsPerWeek: 6 },
  { id: 's2', code: 'ENG-102', name: 'English Language & Literature', department: 'Languages', periodsPerWeek: 5 },
  { id: 's3', code: 'KIS-103', name: 'Kiswahili Fasihi', department: 'Languages', periodsPerWeek: 5 },
  { id: 's4', code: 'SCI-104', name: 'Integrated Science / Physics & Chem', department: 'Sciences', periodsPerWeek: 6 },
  { id: 's5', code: 'BIO-105', name: 'Biology & Health Education', department: 'Sciences', periodsPerWeek: 4 },
  { id: 's6', code: 'SST-106', name: 'Social Studies & History', department: 'Humanities', periodsPerWeek: 4 },
  { id: 's7', code: 'CRE-107', name: 'Christian Religious Education', department: 'Humanities', periodsPerWeek: 3 },
  { id: 's8', code: 'ICT-108', name: 'Computer Science & Coding', department: 'Creative Arts & Tech', periodsPerWeek: 4 },
  { id: 's9', code: 'AGR-109', name: 'Agriculture & Environmental Sci', department: 'Sciences', periodsPerWeek: 3 },
  { id: 's10', code: 'ART-110', name: 'Art, Music & Design', department: 'Creative Arts & Tech', periodsPerWeek: 3 },
];

export const INITIAL_TEACHERS: Teacher[] = [
  {
    id: 't1',
    staffId: 'DJGA/STF/001',
    name: 'Mr. David Kariuki',
    title: 'Senior Master & Mathematics Lead',
    gender: 'Male',
    email: 'd.kariuki@gaithainga-academy.ac.ke',
    phone: '+254 712 345 678',
    qualification: 'M.Ed Curriculum & Instruction, B.Ed Science (Math/Physics)',
    department: 'Mathematics',
    subjects: ['Mathematics', 'Computer Science & Coding'],
    classesAssigned: ['Grade 7 East', 'Grade 10 Scholars'],
    joinedDate: '2016-01-12',
    status: 'Active'
  },
  {
    id: 't2',
    staffId: 'DJGA/STF/002',
    name: 'Ms. Grace Muthoni',
    title: 'Head of Languages Department',
    gender: 'Female',
    email: 'g.muthoni@gaithainga-academy.ac.ke',
    phone: '+254 723 456 789',
    qualification: 'B.Ed Arts (English & Literature)',
    department: 'Languages',
    subjects: ['English Language & Literature'],
    classesAssigned: ['Grade 7 West', 'Grade 8 East'],
    joinedDate: '2018-05-10',
    status: 'Active'
  },
  {
    id: 't3',
    staffId: 'DJGA/STF/003',
    name: 'Dr. Samuel Ochieng',
    title: 'Dean of Sciences & STEM Coordinator',
    gender: 'Male',
    email: 's.ochieng@gaithainga-academy.ac.ke',
    phone: '+254 734 567 890',
    qualification: 'Ph.D Biological Sciences, PGDE',
    department: 'Sciences',
    subjects: ['Integrated Science / Physics & Chem', 'Biology & Health Education'],
    classesAssigned: ['Grade 8 East', 'Grade 9 Alpha'],
    joinedDate: '2017-09-01',
    status: 'Active'
  },
  {
    id: 't4',
    staffId: 'DJGA/STF/004',
    name: 'Mrs. Faith Wambui',
    title: 'Head of Humanities & Career Guidance',
    gender: 'Female',
    email: 'f.wambui@gaithainga-academy.ac.ke',
    phone: '+254 745 678 901',
    qualification: 'B.Ed Arts (Geography, History & CRE)',
    department: 'Humanities',
    subjects: ['Social Studies & History', 'Christian Religious Education'],
    classesAssigned: ['Grade 8 West', 'Grade 7 East'],
    joinedDate: '2019-02-15',
    status: 'Active'
  },
  {
    id: 't5',
    staffId: 'DJGA/STF/005',
    name: 'Mr. Patrick Kiprono',
    title: 'ICT Director & Robotics Instructor',
    gender: 'Male',
    email: 'p.kiprono@gaithainga-academy.ac.ke',
    phone: '+254 756 789 012',
    qualification: 'B.Sc Computer Science, Certified AI & Python Educator',
    department: 'Creative Arts & Tech',
    subjects: ['Computer Science & Coding'],
    classesAssigned: ['Grade 9 Alpha', 'Grade 8 West', 'Grade 7 East'],
    joinedDate: '2021-03-20',
    status: 'Active'
  },
  {
    id: 't6',
    staffId: 'DJGA/STF/006',
    name: 'Madame Amina Hassan',
    title: 'Kiswahili Patron & Drama Coach',
    gender: 'Female',
    email: 'a.hassan@gaithainga-academy.ac.ke',
    phone: '+254 767 890 123',
    qualification: 'B.Ed Arts (Kiswahili & History)',
    department: 'Languages',
    subjects: ['Kiswahili Fasihi'],
    classesAssigned: ['Grade 7 West', 'Grade 9 Alpha'],
    joinedDate: '2020-08-01',
    status: 'Active'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'st1',
    admissionNo: 'DJGA/2024/001',
    firstName: 'Brian',
    lastName: 'Kipchumba',
    gender: 'Male',
    grade: 'Grade 8 East',
    dateOfBirth: '2012-05-14',
    enrollmentDate: '2024-01-08',
    parentName: 'Stephen Kipchumba',
    parentPhone: '+254 711 223 344',
    parentEmail: 's.kipchumba@gmail.com',
    address: 'Ridgeways Estate, House 42, Nairobi',
    status: 'Active',
    totalFees: 65000,
    paidFees: 65000,
    attendanceRate: 98,
    emergencyContact: '+254 711 223 344 (Father)',
    bloodGroup: 'O+'
  },
  {
    id: 'st2',
    admissionNo: 'DJGA/2024/002',
    firstName: 'Joy',
    lastName: 'Wanjiku',
    gender: 'Female',
    grade: 'Grade 8 East',
    dateOfBirth: '2012-08-22',
    enrollmentDate: '2024-01-08',
    parentName: 'Mercy Njeri',
    parentPhone: '+254 722 334 455',
    parentEmail: 'm.njeri@gmail.com',
    address: 'Runda Meadows, Court 7, Nairobi',
    status: 'Active',
    totalFees: 65000,
    paidFees: 45000,
    attendanceRate: 95,
    emergencyContact: '+254 722 334 455 (Mother)',
    bloodGroup: 'A+'
  },
  {
    id: 'st3',
    admissionNo: 'DJGA/2024/003',
    firstName: 'Emmanuel',
    lastName: 'Mwangi',
    gender: 'Male',
    grade: 'Grade 7 East',
    dateOfBirth: '2013-02-18',
    enrollmentDate: '2024-01-09',
    parentName: 'Peter Mwangi',
    parentPhone: '+254 733 445 566',
    parentEmail: 'p.mwangi@gmail.com',
    address: 'Garden Estate, Plot 19, Nairobi',
    status: 'Active',
    totalFees: 65000,
    paidFees: 30000,
    attendanceRate: 92,
    emergencyContact: '+254 733 445 566 (Father)',
    bloodGroup: 'B+'
  },
  {
    id: 'st4',
    admissionNo: 'DJGA/2024/004',
    firstName: 'Precious',
    lastName: 'Achieng',
    gender: 'Female',
    grade: 'Grade 7 East',
    dateOfBirth: '2013-11-05',
    enrollmentDate: '2024-01-09',
    parentName: 'Lillian Otieno',
    parentPhone: '+254 744 556 677',
    parentEmail: 'l.otieno@gmail.com',
    address: 'Parklands Avenue, 4th Park, Nairobi',
    status: 'Active',
    totalFees: 65000,
    paidFees: 65000,
    attendanceRate: 100,
    emergencyContact: '+254 744 556 677 (Mother)',
    bloodGroup: 'O-'
  },
  {
    id: 'st5',
    admissionNo: 'DJGA/2024/005',
    firstName: 'Kelvin',
    lastName: 'Mutua',
    gender: 'Male',
    grade: 'Grade 9 Alpha',
    dateOfBirth: '2011-07-30',
    enrollmentDate: '2023-01-10',
    parentName: 'Charles Mutua',
    parentPhone: '+254 755 667 788',
    parentEmail: 'c.mutua@gmail.com',
    address: 'Kikuyu Town, Green View Villa, Kiambu',
    status: 'Active',
    totalFees: 70000,
    paidFees: 50000,
    attendanceRate: 94,
    emergencyContact: '+254 755 667 788 (Father)',
    bloodGroup: 'AB+'
  },
  {
    id: 'st6',
    admissionNo: 'DJGA/2024/006',
    firstName: 'Stephanie',
    lastName: 'Cherono',
    gender: 'Female',
    grade: 'Grade 9 Alpha',
    dateOfBirth: '2011-09-12',
    enrollmentDate: '2023-01-10',
    parentName: 'Rachel Cherono',
    parentPhone: '+254 766 778 899',
    parentEmail: 'r.cherono@gmail.com',
    address: 'Loresho Greens, Gate 3, Nairobi',
    status: 'Active',
    totalFees: 70000,
    paidFees: 70000,
    attendanceRate: 99,
    emergencyContact: '+254 766 778 899 (Mother)',
    bloodGroup: 'A-'
  },
  {
    id: 'st7',
    admissionNo: 'DJGA/2024/007',
    firstName: 'Ryan',
    lastName: 'Baraza',
    gender: 'Male',
    grade: 'Grade 10 Scholars',
    dateOfBirth: '2010-04-19',
    enrollmentDate: '2022-01-11',
    parentName: 'George Baraza',
    parentPhone: '+254 777 889 900',
    parentEmail: 'g.baraza@gmail.com',
    address: 'Kilimani, Wood Avenue, Nairobi',
    status: 'Active',
    totalFees: 75000,
    paidFees: 25000,
    attendanceRate: 88,
    emergencyContact: '+254 777 889 900 (Father)',
    bloodGroup: 'O+'
  },
  {
    id: 'st8',
    admissionNo: 'DJGA/2024/008',
    firstName: 'Faith',
    lastName: 'Nyambura',
    gender: 'Female',
    grade: 'Grade 7 West',
    dateOfBirth: '2013-06-15',
    enrollmentDate: '2024-01-10',
    parentName: 'Hannah Nyambura',
    parentPhone: '+254 788 990 011',
    parentEmail: 'h.nyambura@gmail.com',
    address: 'Westlands, School Lane, Nairobi',
    status: 'Active',
    totalFees: 65000,
    paidFees: 65000,
    attendanceRate: 97,
    emergencyContact: '+254 788 990 011 (Mother)',
    bloodGroup: 'B-'
  }
];

export const INITIAL_PAYMENTS: FeePayment[] = [
  {
    id: 'fp1',
    receiptNo: 'RCP-2026-0891',
    studentId: 'st1',
    studentName: 'Brian Kipchumba',
    admissionNo: 'DJGA/2024/001',
    grade: 'Grade 8 East',
    amount: 65000,
    date: '2026-09-02',
    paymentMethod: 'M-Pesa',
    transactionRef: 'QHX8992KLM',
    term: 'Term 3',
    academicYear: '2026',
    paidBy: 'Stephen Kipchumba (Father)',
    notes: 'Full Term 3 tuition & lunch fee cleared'
  },
  {
    id: 'fp2',
    receiptNo: 'RCP-2026-0892',
    studentId: 'st2',
    studentName: 'Joy Wanjiku',
    admissionNo: 'DJGA/2024/002',
    grade: 'Grade 8 East',
    amount: 45000,
    date: '2026-09-05',
    paymentMethod: 'Bank Wire',
    transactionRef: 'EQT-90218844',
    term: 'Term 3',
    academicYear: '2026',
    paidBy: 'Mercy Njeri (Mother)',
    notes: 'Partial payment. Balance KES 20,000 due by mid-term'
  },
  {
    id: 'fp3',
    receiptNo: 'RCP-2026-0893',
    studentId: 'st4',
    studentName: 'Precious Achieng',
    admissionNo: 'DJGA/2024/004',
    grade: 'Grade 7 East',
    amount: 65000,
    date: '2026-09-03',
    paymentMethod: 'M-Pesa',
    transactionRef: 'QJA1104PPO',
    term: 'Term 3',
    academicYear: '2026',
    paidBy: 'Lillian Otieno (Mother)',
    notes: 'Term 3 fees fully settled'
  },
  {
    id: 'fp4',
    receiptNo: 'RCP-2026-0894',
    studentId: 'st5',
    studentName: 'Kelvin Mutua',
    admissionNo: 'DJGA/2024/005',
    grade: 'Grade 9 Alpha',
    amount: 50000,
    date: '2026-09-10',
    paymentMethod: 'Cash',
    transactionRef: 'CSH-REC-4410',
    term: 'Term 3',
    academicYear: '2026',
    paidBy: 'Charles Mutua (Father)',
    notes: 'Installment 1. Balance KES 20,000'
  },
  {
    id: 'fp5',
    receiptNo: 'RCP-2026-0895',
    studentId: 'st6',
    studentName: 'Stephanie Cherono',
    admissionNo: 'DJGA/2024/006',
    grade: 'Grade 9 Alpha',
    amount: 70000,
    date: '2026-09-01',
    paymentMethod: 'Bank Wire',
    transactionRef: 'KCB-00843219',
    term: 'Term 3',
    academicYear: '2026',
    paidBy: 'Rachel Cherono (Mother)',
    notes: 'Full tuition, boarding & activity fee'
  },
  {
    id: 'fp6',
    receiptNo: 'RCP-2026-0896',
    studentId: 'st7',
    studentName: 'Ryan Baraza',
    admissionNo: 'DJGA/2024/007',
    grade: 'Grade 10 Scholars',
    amount: 25000,
    date: '2026-09-15',
    paymentMethod: 'M-Pesa',
    transactionRef: 'QMN99824XX',
    term: 'Term 3',
    academicYear: '2026',
    paidBy: 'George Baraza (Father)',
    notes: 'First installment. Urgent reminder issued for KES 50,000 balance'
  }
];

export const INITIAL_EXAM_REPORTS: ExamReport[] = [
  {
    id: 'rep-001',
    studentId: 'st1',
    studentName: 'Brian Kipchumba',
    admissionNo: 'DJGA/2024/001',
    grade: 'Grade 8 East',
    term: 'Term 2',
    examType: 'End of Term Exam',
    academicYear: '2026',
    subjects: [
      { subjectName: 'Mathematics', score: 92, grade: 'A', points: 12, remarks: 'Superb analytical speed and problem-solving skills.', teacherName: 'Mr. David Kariuki' },
      { subjectName: 'English Language & Literature', score: 86, grade: 'A', points: 12, remarks: 'Impressive vocabulary and compelling essay formulation.', teacherName: 'Ms. Grace Muthoni' },
      { subjectName: 'Kiswahili Fasihi', score: 88, grade: 'A', points: 12, remarks: 'Umahiri mzuri sana wa insha na sarufi.', teacherName: 'Madame Amina Hassan' },
      { subjectName: 'Integrated Science', score: 94, grade: 'A', points: 12, remarks: 'Outstanding experimental precision in laboratory practicals.', teacherName: 'Dr. Samuel Ochieng' },
      { subjectName: 'Social Studies & History', score: 85, grade: 'A', points: 12, remarks: 'Comprehensive grasp of civic institutions and historical timelines.', teacherName: 'Mrs. Faith Wambui' },
      { subjectName: 'Computer Science & Coding', score: 96, grade: 'A', points: 12, remarks: 'Brilliant Python logic and algorithmic thinking.', teacherName: 'Mr. Patrick Kiprono' },
      { subjectName: 'Christian Religious Education', score: 89, grade: 'A', points: 12, remarks: 'Exemplary moral engagement and philosophical grasp.', teacherName: 'Mrs. Faith Wambui' }
    ],
    totalMarks: 630,
    meanScore: 90.0,
    overallGrade: 'A',
    classPosition: 1,
    totalStudents: 38,
    classTeacherRemarks: 'Brian is an extraordinarily focused learner with exemplary leadership qualities as Class Prefect.',
    headTeacherRemarks: 'Outstanding academic record! Keep up the sterling momentum, Brian.',
    issueDate: '2026-08-05'
  },
  {
    id: 'rep-002',
    studentId: 'st2',
    studentName: 'Joy Wanjiku',
    admissionNo: 'DJGA/2024/002',
    grade: 'Grade 8 East',
    term: 'Term 2',
    examType: 'End of Term Exam',
    academicYear: '2026',
    subjects: [
      { subjectName: 'Mathematics', score: 84, grade: 'A', points: 12, remarks: 'Commendable mastery of geometric concepts and algebra.', teacherName: 'Mr. David Kariuki' },
      { subjectName: 'English Language & Literature', score: 91, grade: 'A', points: 12, remarks: 'Talented writer with vivid creative expressions.', teacherName: 'Ms. Grace Muthoni' },
      { subjectName: 'Kiswahili Fasihi', score: 83, grade: 'A', points: 12, remarks: 'Matokeo bora. Dumisha usomaji wa mara kwa mara.', teacherName: 'Madame Amina Hassan' },
      { subjectName: 'Integrated Science', score: 88, grade: 'A', points: 12, remarks: 'Thorough comprehension of biological systems.', teacherName: 'Dr. Samuel Ochieng' },
      { subjectName: 'Social Studies & History', score: 90, grade: 'A', points: 12, remarks: 'Active participant in discussions and mock parliamentary debates.', teacherName: 'Mrs. Faith Wambui' },
      { subjectName: 'Computer Science & Coding', score: 85, grade: 'A', points: 12, remarks: 'Skilled in digital presentation and web styling basics.', teacherName: 'Mr. Patrick Kiprono' },
      { subjectName: 'Christian Religious Education', score: 87, grade: 'A', points: 12, remarks: 'Strong ethical clarity and classroom discipline.', teacherName: 'Mrs. Faith Wambui' }
    ],
    totalMarks: 608,
    meanScore: 86.8,
    overallGrade: 'A',
    classPosition: 2,
    totalStudents: 38,
    classTeacherRemarks: 'Joy is a courteous, disciplined scholar who leads by positive example in group projects.',
    headTeacherRemarks: 'An admirable performance. Very well done!',
    issueDate: '2026-08-05'
  },
  {
    id: 'rep-003',
    studentId: 'st4',
    studentName: 'Precious Achieng',
    admissionNo: 'DJGA/2024/004',
    grade: 'Grade 7 East',
    term: 'Term 2',
    examType: 'End of Term Exam',
    academicYear: '2026',
    subjects: [
      { subjectName: 'Mathematics', score: 89, grade: 'A', points: 12, remarks: 'Excellent computational accuracy and consistency.', teacherName: 'Mr. David Kariuki' },
      { subjectName: 'English Language & Literature', score: 94, grade: 'A', points: 12, remarks: 'First-rate oratory skills and insightful literary analysis.', teacherName: 'Ms. Grace Muthoni' },
      { subjectName: 'Kiswahili Fasihi', score: 88, grade: 'A', points: 12, remarks: 'Kazi nadhifu na lugha sanifu.', teacherName: 'Madame Amina Hassan' },
      { subjectName: 'Integrated Science', score: 90, grade: 'A', points: 12, remarks: 'Curious scientific mind; asks deep questions.', teacherName: 'Dr. Samuel Ochieng' },
      { subjectName: 'Social Studies & History', score: 87, grade: 'A', points: 12, remarks: 'Solid understanding of regional geography and climate.', teacherName: 'Mrs. Faith Wambui' },
      { subjectName: 'Computer Science & Coding', score: 92, grade: 'A', points: 12, remarks: 'Rapid coder with great curiosity for robotics.', teacherName: 'Mr. Patrick Kiprono' },
      { subjectName: 'Christian Religious Education', score: 91, grade: 'A', points: 12, remarks: 'Thoughtful reflections and high integrity.', teacherName: 'Mrs. Faith Wambui' }
    ],
    totalMarks: 631,
    meanScore: 90.1,
    overallGrade: 'A',
    classPosition: 1,
    totalStudents: 36,
    classTeacherRemarks: 'Precious is an intellectual powerhouse with exceptional humility and peer mentorship habits.',
    headTeacherRemarks: 'Exceptional results. A beacon of academic prowess in Grade 7.',
    issueDate: '2026-08-05'
  }
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Admissions Open for Academic Year 2027: Early Registration Discount',
    category: 'Academic',
    targetAudience: 'All',
    date: '2026-10-20',
    content: 'DR JOSEPH JIMMY GAITHAINGA ACADEMY SCHOOL invites applications from ambitious learners for Grade 1 through Grade 10. Visit our Admissions portal or contact our Admissions Desk via WhatsApp (+254 143 265 743) or email (drjosephjimmy13@gmail.com). Interviews are conducted every Wednesday and Saturday.',
    author: 'Principal Office',
    isImportant: true
  },
  {
    id: 'ann-2',
    title: 'Annual STEM, Robotics & Innovation Expo 2026',
    category: 'Events',
    targetAudience: 'All',
    date: '2026-10-18',
    content: 'We take pride in fostering young engineers and scientists! The Annual STEM & Robotics Expo will take place at the Main Multipurpose Auditorium. Parents and guardians are warmly welcomed to witness live coding, automated robotics, and agricultural innovation demos.',
    author: 'Dean of Sciences & STEM Lead'
  },
  {
    id: 'ann-3',
    title: 'Term 3 Fee Clearance Notice & Payment Deadline',
    category: 'Fees',
    targetAudience: 'Parents',
    date: '2026-10-15',
    content: 'Dear Parents & Guardians, please ensure all outstanding Term 3 tuition and transport balances are cleared promptly. Official receipts are issued automatically upon confirmation. Inquiries can be forwarded directly via WhatsApp: +254 143 265 743.',
    author: 'Finance & Accounts Department',
    isImportant: true
  },
  {
    id: 'ann-4',
    title: 'Inter-School Athletics Championship & Cultural Gala',
    category: 'Sports',
    targetAudience: 'Students',
    date: '2026-10-12',
    content: 'Congratulations to our junior football and track teams for qualifying for the Regional Interschool Games! Training schedules will run on Tuesdays and Thursdays from 3:45 PM.',
    author: 'Director of Sports & Co-Curricular'
  }
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-01',
    date: '2026-10-27',
    classId: 'c1',
    className: 'Grade 7 East',
    records: [
      { studentId: 'st3', studentName: 'Emmanuel Mwangi', admissionNo: 'DJGA/2024/003', status: 'Present' },
      { studentId: 'st4', studentName: 'Precious Achieng', admissionNo: 'DJGA/2024/004', status: 'Present' },
      { studentId: 'st8', studentName: 'Faith Nyambura', admissionNo: 'DJGA/2024/008', status: 'Present' }
    ]
  },
  {
    id: 'att-02',
    date: '2026-10-27',
    classId: 'c3',
    className: 'Grade 8 East',
    records: [
      { studentId: 'st1', studentName: 'Brian Kipchumba', admissionNo: 'DJGA/2024/001', status: 'Present' },
      { studentId: 'st2', studentName: 'Joy Wanjiku', admissionNo: 'DJGA/2024/002', status: 'Present' }
    ]
  }
];

export const CORE_VALUES = [
  {
    title: "Academic Rigor & Innovation",
    desc: "Uncompromising pursuit of scholarly depth, scientific inquiry, critical problem-solving, and contemporary digital literacy.",
    icon: "GraduationCap"
  },
  {
    title: "Integrity & Moral Discipline",
    desc: "Cultivating unyielding ethical standards, honesty, accountability, and compassionate service to the wider society.",
    icon: "ShieldCheck"
  },
  {
    title: "Holistic Character Nurturing",
    desc: "Harmonizing intellectual, spiritual, emotional, artistic, and athletic growth to shape well-rounded global leaders.",
    icon: "HeartHandshake"
  },
  {
    title: "Visionary Leadership",
    desc: "Empowering every learner with confidence, eloquence, initiative, and responsibility to inspire positive generational change.",
    icon: "Award"
  }
];

export const ACADEMIC_PROGRAMS = [
  {
    level: "Early Years & Kindergarten",
    age: "Ages 3 - 6 Years",
    tagline: "Inspiring Wonder, Foundational Numeracy & Play-Based Inquiries",
    features: ["Montessori-aligned tactile learning", "Phonics & early literacy immersion", "Social-emotional nurturing", "Physical dexterity & creative arts"],
    color: "from-blue-600 to-indigo-700"
  },
  {
    level: "Primary & Junior Secondary (CBC)",
    age: "Grades 1 - 9",
    tagline: "Competence-Driven Curriculum with STEM & Language Mastery",
    features: ["State-of-the-art Science & Physics Labs", "Python, Scratch & Robotics instruction", "French & Foreign Language options", "Competitive Chess, Music & Drama"],
    color: "from-emerald-600 to-teal-800"
  },
  {
    level: "Senior Academy & Pre-University",
    age: "Grades 10 - 12",
    tagline: "Career Pathways, Research Focus & Global University Prep",
    features: ["Advanced STEM & Humanities tracks", "Career mentorship & university counseling", "Community service & leadership capstone", "Model United Nations & debate society"],
    color: "from-amber-600 to-amber-900"
  }
];

export const TESTIMONIALS = [
  {
    quote: "DR JOSEPH JIMMY GAITHAINGA ACADEMY SCHOOL transformed my son's approach to science and mathematics. The teachers are genuinely invested in every child's academic and emotional welfare.",
    author: "Stephen Kipchumba",
    role: "Parent, Grade 8 East Scholar",
    rating: 5
  },
  {
    quote: "The seamless integration of robotics, coding, and strong moral discipline sets this academy leagues ahead of other institutions in the country. Outstanding leadership!",
    author: "Eng. Rachel Cherono",
    role: "Parent & PTA Committee Member",
    rating: 5
  },
  {
    quote: "As a student here, every day pushes you to discover your greatest potential. Our teachers guide us with patience, knowledge, and immense belief in what we can achieve.",
    author: "Precious Achieng",
    role: "Head Girl & Junior Science Club Leader",
    rating: 5
  }
];
