// ==========================================
// FAKE DATA FOR SCHOOL EMS
// ==========================================

export const users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'System Administrator', email: 'admin@schoolems.com', phone: '9876543210', avatar: null },
  { id: 2, username: 'principal', password: 'principal123', role: 'principal', name: 'Dr. Rajesh Kumar', email: 'principal@schoolems.com', phone: '9876543211', avatar: null },
  { id: 3, username: 'teacher1', password: 'teacher123', role: 'teacher', staffId: 1, name: 'Priya Sharma', email: 'priya@schoolems.com', phone: '9876543212', avatar: null },
  { id: 4, username: 'teacher2', password: 'teacher123', role: 'teacher', staffId: 2, name: 'Amit Patel', email: 'amit@schoolems.com', phone: '9876543213', avatar: null },
  { id: 5, username: 'parent1', password: 'parent123', role: 'parent', parentId: 1, name: 'Suresh Verma', email: 'suresh@gmail.com', phone: '9876543214', avatar: null },
  { id: 6, username: 'parent2', password: 'parent123', role: 'parent', parentId: 2, name: 'Meena Gupta', email: 'meena@gmail.com', phone: '9876543215', avatar: null },
  { id: 7, username: 'student1', password: 'student123', role: 'student', studentId: 1, name: 'Rahul Verma', email: 'rahul@schoolems.com', phone: '9876543220', avatar: null },
];

export const principals = [
  { id: 1, name: 'Dr. Rajesh Kumar', email: 'principal@schoolems.com', phone: '9876543211', qualification: 'Ph.D. in Education', experience: '20 years', joiningDate: '2015-06-15', address: '45, MG Road, New Delhi', status: 'active' },
];

export const classes = [
  { id: 1, name: 'Class 1', section: 'A', classTeacherId: 1, studentCount: 35 },
  { id: 2, name: 'Class 1', section: 'B', classTeacherId: 2, studentCount: 32 },
  { id: 3, name: 'Class 2', section: 'A', classTeacherId: 3, studentCount: 38 },
  { id: 4, name: 'Class 2', section: 'B', classTeacherId: 4, studentCount: 30 },
  { id: 5, name: 'Class 3', section: 'A', classTeacherId: 5, studentCount: 36 },
  { id: 6, name: 'Class 3', section: 'B', classTeacherId: 6, studentCount: 33 },
  { id: 7, name: 'Class 4', section: 'A', classTeacherId: 7, studentCount: 34 },
  { id: 8, name: 'Class 4', section: 'B', classTeacherId: 8, studentCount: 31 },
  { id: 9, name: 'Class 5', section: 'A', classTeacherId: 1, studentCount: 37 },
  { id: 10, name: 'Class 5', section: 'B', classTeacherId: 2, studentCount: 29 },
  { id: 11, name: 'Class 6', section: 'A', classTeacherId: 3, studentCount: 40 },
  { id: 12, name: 'Class 6', section: 'B', classTeacherId: 4, studentCount: 35 },
  { id: 13, name: 'Class 7', section: 'A', classTeacherId: 5, studentCount: 38 },
  { id: 14, name: 'Class 7', section: 'B', classTeacherId: 6, studentCount: 32 },
  { id: 15, name: 'Class 8', section: 'A', classTeacherId: 7, studentCount: 36 },
  { id: 16, name: 'Class 8', section: 'B', classTeacherId: 8, studentCount: 34 },
  { id: 17, name: 'Class 9', section: 'A', classTeacherId: 1, studentCount: 39 },
  { id: 18, name: 'Class 9', section: 'B', classTeacherId: 2, studentCount: 33 },
  { id: 19, name: 'Class 10', section: 'A', classTeacherId: 3, studentCount: 41 },
  { id: 20, name: 'Class 10', section: 'B', classTeacherId: 4, studentCount: 37 },
];

export const subjects = [
  { id: 1, name: 'Mathematics', code: 'MATH', classIds: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], teacherIds: [1, 5] },
  { id: 2, name: 'English', code: 'ENG', classIds: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], teacherIds: [2, 6] },
  { id: 3, name: 'Science', code: 'SCI', classIds: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], teacherIds: [3, 7] },
  { id: 4, name: 'Social Studies', code: 'SST', classIds: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], teacherIds: [4, 8] },
  { id: 5, name: 'Hindi', code: 'HIN', classIds: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], teacherIds: [1, 3] },
  { id: 6, name: 'Computer Science', code: 'CS', classIds: [9,10,11,12,13,14,15,16,17,18,19,20], teacherIds: [5] },
  { id: 7, name: 'Physical Education', code: 'PE', classIds: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20], teacherIds: [6] },
  { id: 8, name: 'Art & Craft', code: 'ART', classIds: [1,2,3,4,5,6,7,8], teacherIds: [7] },
  { id: 9, name: 'Music', code: 'MUS', classIds: [1,2,3,4,5,6,7,8], teacherIds: [8] },
  { id: 10, name: 'Environmental Studies', code: 'EVS', classIds: [1,2,3,4,5,6,7,8], teacherIds: [2] },
];

export const students = [
  { id: 1, admissionNo: 'STU2024001', name: 'Rahul Verma', dob: '2012-05-15', gender: 'Male', classId: 17, rollNo: 1, address: '12, Sector 5, Noida', phone: '9876543220', parentId: 1, email: 'rahul@schoolems.com', admissionDate: '2020-04-01', status: 'active', photo: null },
  { id: 2, admissionNo: 'STU2024002', name: 'Ananya Gupta', dob: '2012-08-22', gender: 'Female', classId: 17, rollNo: 2, address: '34, Model Town, Delhi', phone: '9876543221', parentId: 2, email: 'ananya@schoolems.com', admissionDate: '2020-04-01', status: 'active', photo: null },
  { id: 3, admissionNo: 'STU2024003', name: 'Vikram Singh', dob: '2012-01-10', gender: 'Male', classId: 17, rollNo: 3, address: '56, Civil Lines, Delhi', phone: '9876543222', parentId: 3, email: 'vikram@schoolems.com', admissionDate: '2020-04-02', status: 'active', photo: null },
  { id: 4, admissionNo: 'STU2024004', name: 'Sneha Reddy', dob: '2012-11-30', gender: 'Female', classId: 18, rollNo: 1, address: '78, Jubilee Hills, Hyderabad', phone: '9876543223', parentId: 4, email: 'sneha@schoolems.com', admissionDate: '2020-04-02', status: 'active', photo: null },
  { id: 5, admissionNo: 'STU2024005', name: 'Arjun Nair', dob: '2013-03-18', gender: 'Male', classId: 15, rollNo: 1, address: '90, MG Road, Kochi', phone: '9876543224', parentId: 5, email: 'arjun@schoolems.com', admissionDate: '2021-04-01', status: 'active', photo: null },
  { id: 6, admissionNo: 'STU2024006', name: 'Kavya Menon', dob: '2013-07-25', gender: 'Female', classId: 15, rollNo: 2, address: '11, Park Street, Kolkata', phone: '9876543225', parentId: 6, email: 'kavya@schoolems.com', admissionDate: '2021-04-01', status: 'active', photo: null },
  { id: 7, admissionNo: 'STU2024007', name: 'Rohan Joshi', dob: '2014-02-14', gender: 'Male', classId: 13, rollNo: 1, address: '22, FC Road, Pune', phone: '9876543226', parentId: 7, email: 'rohan@schoolems.com', admissionDate: '2021-04-02', status: 'active', photo: null },
  { id: 8, admissionNo: 'STU2024008', name: 'Divya Prakash', dob: '2014-09-05', gender: 'Female', classId: 13, rollNo: 2, address: '33, Anna Nagar, Chennai', phone: '9876543227', parentId: 8, email: 'divya@schoolems.com', admissionDate: '2022-04-01', status: 'active', photo: null },
  { id: 9, admissionNo: 'STU2024009', name: 'Aditya Kapoor', dob: '2015-06-20', gender: 'Male', classId: 11, rollNo: 1, address: '44, Banjara Hills, Hyderabad', phone: '9876543228', parentId: 9, email: 'aditya@schoolems.com', admissionDate: '2022-04-01', status: 'active', photo: null },
  { id: 10, admissionNo: 'STU2024010', name: 'Priyanka Das', dob: '2015-12-08', gender: 'Female', classId: 11, rollNo: 2, address: '55, Salt Lake, Kolkata', phone: '9876543229', parentId: 10, email: 'priyanka@schoolems.com', admissionDate: '2022-04-02', status: 'active', photo: null },
  { id: 11, admissionNo: 'STU2024011', name: 'Karan Malhotra', dob: '2016-04-12', gender: 'Male', classId: 9, rollNo: 1, address: '66, Connaught Place, Delhi', phone: '9876543230', parentId: 1, email: 'karan@schoolems.com', admissionDate: '2023-04-01', status: 'active', photo: null },
  { id: 12, admissionNo: 'STU2024012', name: 'Meera Iyer', dob: '2016-08-28', gender: 'Female', classId: 9, rollNo: 2, address: '77, Koramangala, Bangalore', phone: '9876543231', parentId: 2, email: 'meera@schoolems.com', admissionDate: '2023-04-01', status: 'active', photo: null },
  { id: 13, admissionNo: 'STU2024013', name: 'Siddharth Roy', dob: '2017-01-15', gender: 'Male', classId: 7, rollNo: 1, address: '88, Andheri, Mumbai', phone: '9876543232', parentId: 3, email: 'siddharth@schoolems.com', admissionDate: '2023-04-02', status: 'active', photo: null },
  { id: 14, admissionNo: 'STU2024014', name: 'Ishita Bhatt', dob: '2017-05-22', gender: 'Female', classId: 7, rollNo: 2, address: '99, Vastrapur, Ahmedabad', phone: '9876543233', parentId: 4, email: 'ishita@schoolems.com', admissionDate: '2024-04-01', status: 'active', photo: null },
  { id: 15, admissionNo: 'STU2024015', name: 'Nikhil Saxena', dob: '2018-03-08', gender: 'Male', classId: 5, rollNo: 1, address: '10, Hazratganj, Lucknow', phone: '9876543234', parentId: 5, email: 'nikhil@schoolems.com', admissionDate: '2024-04-01', status: 'active', photo: null },
  { id: 16, admissionNo: 'STU2024016', name: 'Shruti Pandey', dob: '2018-07-30', gender: 'Female', classId: 5, rollNo: 2, address: '21, Arera Colony, Bhopal', phone: '9876543235', parentId: 6, email: 'shruti@schoolems.com', admissionDate: '2024-04-02', status: 'active', photo: null },
  { id: 17, admissionNo: 'STU2024017', name: 'Tanmay Rao', dob: '2019-02-18', gender: 'Male', classId: 3, rollNo: 1, address: '32, Banjara Hills, Hyderabad', phone: '9876543236', parentId: 7, email: 'tanmay@schoolems.com', admissionDate: '2025-04-01', status: 'active', photo: null },
  { id: 18, admissionNo: 'STU2024018', name: 'Nisha Kulkarni', dob: '2019-06-14', gender: 'Female', classId: 3, rollNo: 2, address: '43, Deccan, Pune', phone: '9876543237', parentId: 8, email: 'nisha@schoolems.com', admissionDate: '2025-04-01', status: 'active', photo: null },
  { id: 19, admissionNo: 'STU2024019', name: 'Aryan Chauhan', dob: '2020-04-25', gender: 'Male', classId: 1, rollNo: 1, address: '54, Sector 15, Gurgaon', phone: '9876543238', parentId: 9, email: 'aryan@schoolems.com', admissionDate: '2026-04-01', status: 'active', photo: null },
  { id: 20, admissionNo: 'STU2024020', name: 'Pooja Tiwari', dob: '2020-10-10', gender: 'Female', classId: 1, rollNo: 2, address: '65, Gomti Nagar, Lucknow', phone: '9876543239', parentId: 10, email: 'pooja@schoolems.com', admissionDate: '2026-04-01', status: 'active', photo: null },
];

export const staff = [
  { id: 1, employeeId: 'EMP001', name: 'Priya Sharma', email: 'priya@schoolems.com', phone: '9876543212', address: '23, Lajpat Nagar, Delhi', designation: 'Senior Teacher', qualification: 'M.Sc. Mathematics, B.Ed', assignedSubjects: [1, 5], assignedClasses: [1, 9, 17], joiningDate: '2018-07-01', status: 'active', photo: null },
  { id: 2, employeeId: 'EMP002', name: 'Amit Patel', email: 'amit@schoolems.com', phone: '9876543213', address: '45, Navrangpura, Ahmedabad', designation: 'Senior Teacher', qualification: 'M.A. English, B.Ed', assignedSubjects: [2, 10], assignedClasses: [2, 10, 18], joiningDate: '2017-06-15', status: 'active', photo: null },
  { id: 3, employeeId: 'EMP003', name: 'Sunita Devi', email: 'sunita@schoolems.com', phone: '9876543216', address: '67, Rajouri Garden, Delhi', designation: 'Teacher', qualification: 'M.Sc. Physics, B.Ed', assignedSubjects: [3, 5], assignedClasses: [3, 11, 19], joiningDate: '2019-04-01', status: 'active', photo: null },
  { id: 4, employeeId: 'EMP004', name: 'Rajiv Mehta', email: 'rajiv@schoolems.com', phone: '9876543217', address: '89, Koregaon Park, Pune', designation: 'Teacher', qualification: 'M.A. History, B.Ed', assignedSubjects: [4], assignedClasses: [4, 12, 20], joiningDate: '2019-08-01', status: 'active', photo: null },
  { id: 5, employeeId: 'EMP005', name: 'Neha Agarwal', email: 'neha@schoolems.com', phone: '9876543218', address: '12, Indiranagar, Bangalore', designation: 'Teacher', qualification: 'M.Sc. Mathematics, B.Ed', assignedSubjects: [1, 6], assignedClasses: [5, 13], joiningDate: '2020-06-15', status: 'active', photo: null },
  { id: 6, employeeId: 'EMP006', name: 'Sanjay Mishra', email: 'sanjay@schoolems.com', phone: '9876543219', address: '34, Alkapuri, Vadodara', designation: 'Teacher', qualification: 'M.A. English, M.Phil', assignedSubjects: [2, 7], assignedClasses: [6, 14], joiningDate: '2020-07-01', status: 'active', photo: null },
  { id: 7, employeeId: 'EMP007', name: 'Kavitha Rajan', email: 'kavitha@schoolems.com', phone: '9876543240', address: '56, T Nagar, Chennai', designation: 'Teacher', qualification: 'M.Sc. Chemistry, B.Ed', assignedSubjects: [3, 8], assignedClasses: [7, 15], joiningDate: '2021-04-01', status: 'active', photo: null },
  { id: 8, employeeId: 'EMP008', name: 'Mohammed Irfan', email: 'irfan@schoolems.com', phone: '9876543241', address: '78, Bandra, Mumbai', designation: 'Teacher', qualification: 'M.A. Geography, B.Ed', assignedSubjects: [4, 9], assignedClasses: [8, 16], joiningDate: '2021-06-15', status: 'active', photo: null },
];

export const parents = [
  { id: 1, name: 'Suresh Verma', email: 'suresh@gmail.com', phone: '9876543214', address: '12, Sector 5, Noida', occupation: 'Software Engineer', childrenIds: [1, 11], status: 'active' },
  { id: 2, name: 'Meena Gupta', email: 'meena@gmail.com', phone: '9876543215', address: '34, Model Town, Delhi', occupation: 'Doctor', childrenIds: [2, 12], status: 'active' },
  { id: 3, name: 'Rajesh Singh', email: 'rajesh.s@gmail.com', phone: '9876543250', address: '56, Civil Lines, Delhi', occupation: 'Businessman', childrenIds: [3, 13], status: 'active' },
  { id: 4, name: 'Lakshmi Reddy', email: 'lakshmi@gmail.com', phone: '9876543251', address: '78, Jubilee Hills, Hyderabad', occupation: 'Teacher', childrenIds: [4, 14], status: 'active' },
  { id: 5, name: 'Gopal Nair', email: 'gopal@gmail.com', phone: '9876543252', address: '90, MG Road, Kochi', occupation: 'Advocate', childrenIds: [5, 15], status: 'active' },
  { id: 6, name: 'Padma Menon', email: 'padma@gmail.com', phone: '9876543253', address: '11, Park Street, Kolkata', occupation: 'Bank Manager', childrenIds: [6, 16], status: 'active' },
  { id: 7, name: 'Deepak Joshi', email: 'deepak@gmail.com', phone: '9876543254', address: '22, FC Road, Pune', occupation: 'Professor', childrenIds: [7, 17], status: 'active' },
  { id: 8, name: 'Asha Prakash', email: 'asha@gmail.com', phone: '9876543255', address: '33, Anna Nagar, Chennai', occupation: 'Chartered Accountant', childrenIds: [8, 18], status: 'active' },
  { id: 9, name: 'Vinod Kapoor', email: 'vinod@gmail.com', phone: '9876543256', address: '44, Banjara Hills, Hyderabad', occupation: 'Government Officer', childrenIds: [9, 19], status: 'active' },
  { id: 10, name: 'Sunita Das', email: 'sunita.d@gmail.com', phone: '9876543257', address: '55, Salt Lake, Kolkata', occupation: 'Architect', childrenIds: [10, 20], status: 'active' },
];

export const attendance = [
  { id: 1, studentId: 1, date: '2026-11-10', status: 'present', classId: 17 },
  { id: 2, studentId: 2, date: '2026-11-10', status: 'present', classId: 17 },
  { id: 3, studentId: 3, date: '2026-11-10', status: 'absent', classId: 17 },
  { id: 4, studentId: 4, date: '2026-11-10', status: 'present', classId: 18 },
  { id: 5, studentId: 5, date: '2026-11-10', status: 'present', classId: 15 },
  { id: 6, studentId: 6, date: '2026-11-10', status: 'leave', classId: 15 },
  { id: 7, studentId: 1, date: '2026-11-11', status: 'present', classId: 17 },
  { id: 8, studentId: 2, date: '2026-11-11', status: 'absent', classId: 17 },
  { id: 9, studentId: 3, date: '2026-11-11', status: 'present', classId: 17 },
  { id: 10, studentId: 4, date: '2026-11-11', status: 'present', classId: 18 },
  { id: 11, studentId: 5, date: '2026-11-11', status: 'present', classId: 15 },
  { id: 12, studentId: 6, date: '2026-11-11', status: 'present', classId: 15 },
  { id: 13, studentId: 7, date: '2026-11-10', status: 'present', classId: 13 },
  { id: 14, studentId: 8, date: '2026-11-10', status: 'present', classId: 13 },
  { id: 15, studentId: 9, date: '2026-11-10', status: 'absent', classId: 11 },
  { id: 16, studentId: 10, date: '2026-11-10', status: 'present', classId: 11 },
  { id: 17, studentId: 11, date: '2026-11-10', status: 'present', classId: 9 },
  { id: 18, studentId: 12, date: '2026-11-10', status: 'present', classId: 9 },
  { id: 19, studentId: 13, date: '2026-11-10', status: 'leave', classId: 7 },
  { id: 20, studentId: 14, date: '2026-11-10', status: 'present', classId: 7 },
  { id: 21, studentId: 1, date: '2026-11-12', status: 'present', classId: 17 },
  { id: 22, studentId: 2, date: '2026-11-12', status: 'present', classId: 17 },
  { id: 23, studentId: 3, date: '2026-11-12', status: 'present', classId: 17 },
  { id: 24, studentId: 4, date: '2026-11-12', status: 'absent', classId: 18 },
  { id: 25, studentId: 5, date: '2026-11-12', status: 'present', classId: 15 },
];

export const staffAttendance = [
  { id: 1, staffId: 1, date: '2026-11-10', status: 'present' },
  { id: 2, staffId: 2, date: '2026-11-10', status: 'present' },
  { id: 3, staffId: 3, date: '2026-11-10', status: 'absent' },
  { id: 4, staffId: 4, date: '2026-11-10', status: 'present' },
  { id: 5, staffId: 5, date: '2026-11-10', status: 'present' },
  { id: 6, staffId: 6, date: '2026-11-10', status: 'leave' },
  { id: 7, staffId: 7, date: '2026-11-10', status: 'present' },
  { id: 8, staffId: 8, date: '2026-11-10', status: 'present' },
  { id: 9, staffId: 1, date: '2026-11-11', status: 'present' },
  { id: 10, staffId: 2, date: '2026-11-11', status: 'present' },
  { id: 11, staffId: 3, date: '2026-11-11', status: 'present' },
  { id: 12, staffId: 4, date: '2026-11-11', status: 'leave' },
  { id: 13, staffId: 5, date: '2026-11-11', status: 'present' },
  { id: 14, staffId: 6, date: '2026-11-11', status: 'present' },
  { id: 15, staffId: 7, date: '2026-11-11', status: 'absent' },
  { id: 16, staffId: 8, date: '2026-11-11', status: 'present' },
];

export const examinations = [
  { id: 1, name: 'Mid-Term Examination', type: 'mid-term', startDate: '2026-09-15', endDate: '2026-09-25', status: 'completed' },
  { id: 2, name: 'Unit Test 1', type: 'unit-test', startDate: '2026-07-20', endDate: '2026-07-22', status: 'completed' },
  { id: 3, name: 'Unit Test 2', type: 'unit-test', startDate: '2026-10-15', endDate: '2026-10-17', status: 'completed' },
  { id: 4, name: 'Final Examination', type: 'final', startDate: '2027-02-15', endDate: '2027-03-05', status: 'upcoming' },
];

export const examResults = [
  { id: 1, examId: 1, studentId: 1, subjectId: 1, marksObtained: 85, totalMarks: 100, grade: 'A' },
  { id: 2, examId: 1, studentId: 1, subjectId: 2, marksObtained: 78, totalMarks: 100, grade: 'B+' },
  { id: 3, examId: 1, studentId: 1, subjectId: 3, marksObtained: 92, totalMarks: 100, grade: 'A+' },
  { id: 4, examId: 1, studentId: 1, subjectId: 4, marksObtained: 70, totalMarks: 100, grade: 'B' },
  { id: 5, examId: 1, studentId: 1, subjectId: 5, marksObtained: 88, totalMarks: 100, grade: 'A' },
  { id: 6, examId: 1, studentId: 1, subjectId: 6, marksObtained: 95, totalMarks: 100, grade: 'A+' },
  { id: 7, examId: 1, studentId: 2, subjectId: 1, marksObtained: 72, totalMarks: 100, grade: 'B' },
  { id: 8, examId: 1, studentId: 2, subjectId: 2, marksObtained: 90, totalMarks: 100, grade: 'A+' },
  { id: 9, examId: 1, studentId: 2, subjectId: 3, marksObtained: 68, totalMarks: 100, grade: 'B' },
  { id: 10, examId: 1, studentId: 2, subjectId: 4, marksObtained: 82, totalMarks: 100, grade: 'A' },
  { id: 11, examId: 1, studentId: 2, subjectId: 5, marksObtained: 76, totalMarks: 100, grade: 'B+' },
  { id: 12, examId: 1, studentId: 2, subjectId: 6, marksObtained: 88, totalMarks: 100, grade: 'A' },
  { id: 13, examId: 1, studentId: 3, subjectId: 1, marksObtained: 65, totalMarks: 100, grade: 'B' },
  { id: 14, examId: 1, studentId: 3, subjectId: 2, marksObtained: 58, totalMarks: 100, grade: 'C+' },
  { id: 15, examId: 1, studentId: 3, subjectId: 3, marksObtained: 75, totalMarks: 100, grade: 'B+' },
  { id: 16, examId: 1, studentId: 4, subjectId: 1, marksObtained: 91, totalMarks: 100, grade: 'A+' },
  { id: 17, examId: 1, studentId: 4, subjectId: 2, marksObtained: 85, totalMarks: 100, grade: 'A' },
  { id: 18, examId: 1, studentId: 5, subjectId: 1, marksObtained: 79, totalMarks: 100, grade: 'B+' },
  { id: 19, examId: 1, studentId: 5, subjectId: 2, marksObtained: 83, totalMarks: 100, grade: 'A' },
  { id: 20, examId: 1, studentId: 5, subjectId: 3, marksObtained: 77, totalMarks: 100, grade: 'B+' },
  { id: 21, examId: 2, studentId: 1, subjectId: 1, marksObtained: 18, totalMarks: 25, grade: 'A' },
  { id: 22, examId: 2, studentId: 1, subjectId: 2, marksObtained: 20, totalMarks: 25, grade: 'A' },
  { id: 23, examId: 2, studentId: 2, subjectId: 1, marksObtained: 15, totalMarks: 25, grade: 'B' },
  { id: 24, examId: 2, studentId: 2, subjectId: 2, marksObtained: 22, totalMarks: 25, grade: 'A+' },
  { id: 25, examId: 3, studentId: 1, subjectId: 1, marksObtained: 22, totalMarks: 25, grade: 'A+' },
  { id: 26, examId: 3, studentId: 1, subjectId: 2, marksObtained: 19, totalMarks: 25, grade: 'A' },
];

export const assignments = [
  { id: 1, title: 'Algebra Practice Set', subjectId: 1, classId: 17, teacherId: 1, description: 'Complete exercises 5.1 to 5.5 from textbook', dueDate: '2026-11-20', status: 'active', createdDate: '2026-11-10' },
  { id: 2, title: 'Essay on Climate Change', subjectId: 2, classId: 17, teacherId: 2, description: 'Write a 500-word essay on the effects of climate change', dueDate: '2026-11-18', status: 'active', createdDate: '2026-11-08' },
  { id: 3, title: 'Science Lab Report', subjectId: 3, classId: 17, teacherId: 3, description: 'Prepare lab report for the light refraction experiment', dueDate: '2026-11-22', status: 'active', createdDate: '2026-11-11' },
  { id: 4, title: 'History Chapter Summary', subjectId: 4, classId: 17, teacherId: 4, description: 'Summarize Chapter 8: The French Revolution', dueDate: '2026-11-19', status: 'active', createdDate: '2026-11-09' },
  { id: 5, title: 'Hindi Poem Recitation', subjectId: 5, classId: 17, teacherId: 1, description: 'Prepare poem "Madhushala" for recitation', dueDate: '2026-11-25', status: 'active', createdDate: '2026-11-12' },
  { id: 6, title: 'Programming Exercise', subjectId: 6, classId: 17, teacherId: 5, description: 'Write a Python program to solve quadratic equations', dueDate: '2026-11-21', status: 'active', createdDate: '2026-11-10' },
  { id: 7, title: 'Geometry Worksheet', subjectId: 1, classId: 15, teacherId: 1, description: 'Solve all problems on triangles congruence', dueDate: '2026-11-20', status: 'active', createdDate: '2026-11-10' },
  { id: 8, title: 'English Grammar Exercise', subjectId: 2, classId: 15, teacherId: 2, description: 'Complete tenses practice worksheet', dueDate: '2026-11-17', status: 'completed', createdDate: '2026-11-05' },
  { id: 9, title: 'Science Project', subjectId: 3, classId: 13, teacherId: 3, description: 'Build a working model of solar system', dueDate: '2026-11-30', status: 'active', createdDate: '2026-11-01' },
  { id: 10, title: 'Math Tables Practice', subjectId: 1, classId: 1, teacherId: 1, description: 'Practice multiplication tables 1-12', dueDate: '2026-11-15', status: 'active', createdDate: '2026-11-10' },
];

export const timetable = [
  // Class 9A (classId: 17) - Monday
  { id: 1, classId: 17, day: 'Monday', period: 1, startTime: '08:00', endTime: '08:45', subjectId: 1, teacherId: 1 },
  { id: 2, classId: 17, day: 'Monday', period: 2, startTime: '08:45', endTime: '09:30', subjectId: 2, teacherId: 2 },
  { id: 3, classId: 17, day: 'Monday', period: 3, startTime: '09:30', endTime: '10:15', subjectId: 3, teacherId: 3 },
  { id: 4, classId: 17, day: 'Monday', period: 4, startTime: '10:30', endTime: '11:15', subjectId: 5, teacherId: 1 },
  { id: 5, classId: 17, day: 'Monday', period: 5, startTime: '11:15', endTime: '12:00', subjectId: 4, teacherId: 4 },
  { id: 6, classId: 17, day: 'Monday', period: 6, startTime: '12:45', endTime: '13:30', subjectId: 6, teacherId: 5 },
  { id: 7, classId: 17, day: 'Monday', period: 7, startTime: '13:30', endTime: '14:15', subjectId: 7, teacherId: 6 },
  // Tuesday
  { id: 8, classId: 17, day: 'Tuesday', period: 1, startTime: '08:00', endTime: '08:45', subjectId: 2, teacherId: 2 },
  { id: 9, classId: 17, day: 'Tuesday', period: 2, startTime: '08:45', endTime: '09:30', subjectId: 1, teacherId: 1 },
  { id: 10, classId: 17, day: 'Tuesday', period: 3, startTime: '09:30', endTime: '10:15', subjectId: 6, teacherId: 5 },
  { id: 11, classId: 17, day: 'Tuesday', period: 4, startTime: '10:30', endTime: '11:15', subjectId: 3, teacherId: 3 },
  { id: 12, classId: 17, day: 'Tuesday', period: 5, startTime: '11:15', endTime: '12:00', subjectId: 5, teacherId: 1 },
  { id: 13, classId: 17, day: 'Tuesday', period: 6, startTime: '12:45', endTime: '13:30', subjectId: 4, teacherId: 4 },
  { id: 14, classId: 17, day: 'Tuesday', period: 7, startTime: '13:30', endTime: '14:15', subjectId: 7, teacherId: 6 },
  // Wednesday
  { id: 15, classId: 17, day: 'Wednesday', period: 1, startTime: '08:00', endTime: '08:45', subjectId: 3, teacherId: 3 },
  { id: 16, classId: 17, day: 'Wednesday', period: 2, startTime: '08:45', endTime: '09:30', subjectId: 1, teacherId: 1 },
  { id: 17, classId: 17, day: 'Wednesday', period: 3, startTime: '09:30', endTime: '10:15', subjectId: 2, teacherId: 2 },
  { id: 18, classId: 17, day: 'Wednesday', period: 4, startTime: '10:30', endTime: '11:15', subjectId: 6, teacherId: 5 },
  { id: 19, classId: 17, day: 'Wednesday', period: 5, startTime: '11:15', endTime: '12:00', subjectId: 4, teacherId: 4 },
  { id: 20, classId: 17, day: 'Wednesday', period: 6, startTime: '12:45', endTime: '13:30', subjectId: 5, teacherId: 1 },
  { id: 21, classId: 17, day: 'Wednesday', period: 7, startTime: '13:30', endTime: '14:15', subjectId: 7, teacherId: 6 },
  // Thursday
  { id: 22, classId: 17, day: 'Thursday', period: 1, startTime: '08:00', endTime: '08:45', subjectId: 1, teacherId: 1 },
  { id: 23, classId: 17, day: 'Thursday', period: 2, startTime: '08:45', endTime: '09:30', subjectId: 3, teacherId: 3 },
  { id: 24, classId: 17, day: 'Thursday', period: 3, startTime: '09:30', endTime: '10:15', subjectId: 5, teacherId: 1 },
  { id: 25, classId: 17, day: 'Thursday', period: 4, startTime: '10:30', endTime: '11:15', subjectId: 2, teacherId: 2 },
  { id: 26, classId: 17, day: 'Thursday', period: 5, startTime: '11:15', endTime: '12:00', subjectId: 6, teacherId: 5 },
  { id: 27, classId: 17, day: 'Thursday', period: 6, startTime: '12:45', endTime: '13:30', subjectId: 4, teacherId: 4 },
  { id: 28, classId: 17, day: 'Thursday', period: 7, startTime: '13:30', endTime: '14:15', subjectId: 7, teacherId: 6 },
  // Friday
  { id: 29, classId: 17, day: 'Friday', period: 1, startTime: '08:00', endTime: '08:45', subjectId: 2, teacherId: 2 },
  { id: 30, classId: 17, day: 'Friday', period: 2, startTime: '08:45', endTime: '09:30', subjectId: 3, teacherId: 3 },
  { id: 31, classId: 17, day: 'Friday', period: 3, startTime: '09:30', endTime: '10:15', subjectId: 1, teacherId: 1 },
  { id: 32, classId: 17, day: 'Friday', period: 4, startTime: '10:30', endTime: '11:15', subjectId: 5, teacherId: 1 },
  { id: 33, classId: 17, day: 'Friday', period: 5, startTime: '11:15', endTime: '12:00', subjectId: 6, teacherId: 5 },
  { id: 34, classId: 17, day: 'Friday', period: 6, startTime: '12:45', endTime: '13:30', subjectId: 4, teacherId: 4 },
  { id: 35, classId: 17, day: 'Friday', period: 7, startTime: '13:30', endTime: '14:15', subjectId: 7, teacherId: 6 },
  // Saturday
  { id: 36, classId: 17, day: 'Saturday', period: 1, startTime: '08:00', endTime: '08:45', subjectId: 1, teacherId: 1 },
  { id: 37, classId: 17, day: 'Saturday', period: 2, startTime: '08:45', endTime: '09:30', subjectId: 2, teacherId: 2 },
  { id: 38, classId: 17, day: 'Saturday', period: 3, startTime: '09:30', endTime: '10:15', subjectId: 3, teacherId: 3 },
  { id: 39, classId: 17, day: 'Saturday', period: 4, startTime: '10:30', endTime: '11:15', subjectId: 6, teacherId: 5 },
];

export const vehicles = [
  { id: 1, vehicleNo: 'DL-01-AB-1234', type: 'Bus', capacity: 40, driverName: 'Ram Kumar', driverPhone: '9876543260', driverLicense: 'DL-1234567890', routeId: 1, status: 'active' },
  { id: 2, vehicleNo: 'DL-01-CD-5678', type: 'Bus', capacity: 45, driverName: 'Shyam Lal', driverPhone: '9876543261', driverLicense: 'DL-2345678901', routeId: 2, status: 'active' },
  { id: 3, vehicleNo: 'DL-01-EF-9012', type: 'Mini Bus', capacity: 25, driverName: 'Anil Sharma', driverPhone: '9876543262', driverLicense: 'DL-3456789012', routeId: 3, status: 'active' },
  { id: 4, vehicleNo: 'DL-01-GH-3456', type: 'Van', capacity: 15, driverName: 'Mohan Das', driverPhone: '9876543263', driverLicense: 'DL-4567890123', routeId: 4, status: 'maintenance' },
];

export const routes = [
  { id: 1, name: 'Route A - Noida Sector', stops: ['Sector 5', 'Sector 15', 'Sector 22', 'Sector 30', 'School'], distance: '18 km', studentIds: [1, 11, 19], vehicleId: 1 },
  { id: 2, name: 'Route B - Delhi Central', stops: ['Connaught Place', 'Lajpat Nagar', 'Model Town', 'Civil Lines', 'School'], distance: '22 km', studentIds: [2, 3, 12, 13], vehicleId: 2 },
  { id: 3, name: 'Route C - South Delhi', stops: ['Rajouri Garden', 'Dwarka', 'Janakpuri', 'Punjabi Bagh', 'School'], distance: '15 km', studentIds: [9, 10, 20], vehicleId: 3 },
  { id: 4, name: 'Route D - Gurgaon', stops: ['Sector 15 Gurgaon', 'DLF Phase 1', 'Sohna Road', 'School'], distance: '25 km', studentIds: [4, 5, 14, 15], vehicleId: 4 },
];

export const books = [
  { id: 1, bookId: 'LIB001', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', category: 'Computer Science', isbn: '978-0262033848', totalQuantity: 5, availableQuantity: 3, status: 'available' },
  { id: 2, bookId: 'LIB002', title: 'A Brief History of Time', author: 'Stephen Hawking', category: 'Science', isbn: '978-0553380163', totalQuantity: 4, availableQuantity: 2, status: 'available' },
  { id: 3, bookId: 'LIB003', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', isbn: '978-0061120084', totalQuantity: 6, availableQuantity: 4, status: 'available' },
  { id: 4, bookId: 'LIB004', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', isbn: '978-0743273565', totalQuantity: 4, availableQuantity: 1, status: 'available' },
  { id: 5, bookId: 'LIB005', title: 'Mathematics for Class 9', author: 'R.D. Sharma', category: 'Textbook', isbn: '978-9383182527', totalQuantity: 20, availableQuantity: 15, status: 'available' },
  { id: 6, bookId: 'LIB006', title: 'Science for Class 9', author: 'Lakhmir Singh', category: 'Textbook', isbn: '978-9352530342', totalQuantity: 20, availableQuantity: 18, status: 'available' },
  { id: 7, bookId: 'LIB007', title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', category: 'Fiction', isbn: '978-0747532699', totalQuantity: 8, availableQuantity: 5, status: 'available' },
  { id: 8, bookId: 'LIB008', title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Biography', isbn: '978-8173711466', totalQuantity: 5, availableQuantity: 3, status: 'available' },
  { id: 9, bookId: 'LIB009', title: 'The Discovery of India', author: 'Jawaharlal Nehru', category: 'History', isbn: '978-0143031031', totalQuantity: 3, availableQuantity: 2, status: 'available' },
  { id: 10, bookId: 'LIB010', title: 'Fundamentals of Physics', author: 'Halliday & Resnick', category: 'Physics', isbn: '978-1118230718', totalQuantity: 6, availableQuantity: 4, status: 'available' },
];

export const bookIssues = [
  { id: 1, bookId: 1, studentId: 1, issueDate: '2026-11-01', returnDate: null, dueDate: '2026-11-15', status: 'issued' },
  { id: 2, bookId: 2, studentId: 2, issueDate: '2026-11-03', returnDate: null, dueDate: '2026-11-17', status: 'issued' },
  { id: 3, bookId: 3, studentId: 3, issueDate: '2026-10-20', returnDate: '2026-11-05', dueDate: '2026-11-03', status: 'returned' },
  { id: 4, bookId: 4, studentId: 5, issueDate: '2026-10-25', returnDate: null, dueDate: '2026-11-08', status: 'overdue' },
  { id: 5, bookId: 7, studentId: 7, issueDate: '2026-11-05', returnDate: null, dueDate: '2026-11-19', status: 'issued' },
  { id: 6, bookId: 5, studentId: 1, issueDate: '2026-10-15', returnDate: '2026-10-28', dueDate: '2026-10-29', status: 'returned' },
  { id: 7, bookId: 8, studentId: 9, issueDate: '2026-11-08', returnDate: null, dueDate: '2026-11-22', status: 'issued' },
  { id: 8, bookId: 4, studentId: 4, issueDate: '2026-10-10', returnDate: null, dueDate: '2026-10-24', status: 'overdue' },
  { id: 9, bookId: 10, studentId: 6, issueDate: '2026-11-10', returnDate: null, dueDate: '2026-11-24', status: 'issued' },
  { id: 10, bookId: 1, studentId: 10, issueDate: '2026-11-02', returnDate: null, dueDate: '2026-11-16', status: 'issued' },
];

export const inventory = [
  { id: 1, name: 'Whiteboard Markers', category: 'Stationery', quantity: 200, purchaseDate: '2026-08-01', supplier: 'Stationery World', price: 25, availableStock: 145, status: 'in-stock' },
  { id: 2, name: 'A4 Paper Reams', category: 'Stationery', quantity: 100, purchaseDate: '2026-08-15', supplier: 'Paper Plus', price: 350, availableStock: 62, status: 'in-stock' },
  { id: 3, name: 'Chairs (Student)', category: 'Furniture', quantity: 500, purchaseDate: '2026-04-01', supplier: 'Furniture Hub', price: 1200, availableStock: 485, status: 'in-stock' },
  { id: 4, name: 'Desks (Student)', category: 'Furniture', quantity: 250, purchaseDate: '2026-04-01', supplier: 'Furniture Hub', price: 2500, availableStock: 240, status: 'in-stock' },
  { id: 5, name: 'Projectors', category: 'Electronics', quantity: 15, purchaseDate: '2026-06-01', supplier: 'TechMart', price: 35000, availableStock: 14, status: 'in-stock' },
  { id: 6, name: 'Lab Equipment Set', category: 'Lab', quantity: 10, purchaseDate: '2026-05-15', supplier: 'Lab Instruments Co.', price: 15000, availableStock: 9, status: 'in-stock' },
  { id: 7, name: 'Sports Equipment Kit', category: 'Sports', quantity: 8, purchaseDate: '2026-07-01', supplier: 'Sports Zone', price: 8000, availableStock: 2, status: 'low-stock' },
  { id: 8, name: 'First Aid Kits', category: 'Medical', quantity: 20, purchaseDate: '2026-06-15', supplier: 'MediSupply', price: 2000, availableStock: 18, status: 'in-stock' },
  { id: 9, name: 'Printer Cartridges', category: 'Electronics', quantity: 30, purchaseDate: '2026-09-01', supplier: 'TechMart', price: 1500, availableStock: 3, status: 'low-stock' },
  { id: 10, name: 'Cleaning Supplies', category: 'Maintenance', quantity: 50, purchaseDate: '2026-10-01', supplier: 'CleanPro', price: 500, availableStock: 35, status: 'in-stock' },
  { id: 11, name: 'Whiteboards', category: 'Furniture', quantity: 30, purchaseDate: '2026-04-15', supplier: 'Stationery World', price: 3500, availableStock: 28, status: 'in-stock' },
  { id: 12, name: 'Computer Systems', category: 'Electronics', quantity: 40, purchaseDate: '2026-05-01', supplier: 'TechMart', price: 45000, availableStock: 38, status: 'in-stock' },
];

export const announcements = [
  { id: 1, title: 'Annual Sports Day', message: 'Annual Sports Day will be held on December 5, 2026. All students are requested to participate actively. Parents are cordially invited.', author: 'Dr. Rajesh Kumar', role: 'principal', targetRoles: ['student', 'teacher', 'parent'], date: '2026-11-10', priority: 'high' },
  { id: 2, title: 'Parent-Teacher Meeting', message: 'PTM scheduled for November 20, 2026 from 10 AM to 2 PM. All parents are requested to attend.', author: 'Dr. Rajesh Kumar', role: 'principal', targetRoles: ['parent', 'teacher'], date: '2026-11-08', priority: 'high' },
  { id: 3, title: 'Winter Vacation Notice', message: 'School will remain closed from December 25, 2026 to January 5, 2027 for winter vacation.', author: 'Dr. Rajesh Kumar', role: 'principal', targetRoles: ['student', 'teacher', 'parent'], date: '2026-11-12', priority: 'medium' },
  { id: 4, title: 'Science Exhibition', message: 'Science exhibition will be organized on November 28, 2026. Students of classes 6-10 should prepare their projects.', author: 'Priya Sharma', role: 'teacher', targetRoles: ['student'], date: '2026-11-09', priority: 'medium' },
  { id: 5, title: 'Library Book Return', message: 'All overdue library books must be returned by November 15, 2026. Late fees will be applicable after the due date.', author: 'System Administrator', role: 'admin', targetRoles: ['student', 'teacher'], date: '2026-11-07', priority: 'low' },
  { id: 6, title: 'Homework Submission Reminder', message: 'All pending homework for Mathematics and English must be submitted by November 18, 2026.', author: 'Priya Sharma', role: 'teacher', targetRoles: ['student', 'parent'], date: '2026-11-11', priority: 'medium' },
  { id: 7, title: 'Fee Payment Reminder', message: 'Last date for fee payment for the current quarter is November 30, 2026. Please clear your dues to avoid late fees.', author: 'System Administrator', role: 'admin', targetRoles: ['parent'], date: '2026-11-06', priority: 'high' },
  { id: 8, title: 'Exam Schedule Released', message: 'Final examination schedule has been released. Please check the timetable section for details.', author: 'Dr. Rajesh Kumar', role: 'principal', targetRoles: ['student', 'teacher', 'parent'], date: '2026-11-13', priority: 'high' },
];

// Helper function to get class display name
export const getClassDisplayName = (classId) => {
  const cls = classes.find(c => c.id === classId);
  return cls ? `${cls.name} - ${cls.section}` : 'N/A';
};

// Helper function to get subject name
export const getSubjectName = (subjectId) => {
  const sub = subjects.find(s => s.id === subjectId);
  return sub ? sub.name : 'N/A';
};

// Helper function to get teacher name
export const getTeacherName = (teacherId) => {
  const teacher = staff.find(s => s.id === teacherId);
  return teacher ? teacher.name : 'N/A';
};

// Helper function to get student name
export const getStudentName = (studentId) => {
  const student = students.find(s => s.id === studentId);
  return student ? student.name : 'N/A';
};

// Helper function to get parent name
export const getParentName = (parentId) => {
  const parent = parents.find(p => p.id === parentId);
  return parent ? parent.name : 'N/A';
};

// Dashboard stats
export const dashboardStats = {
  totalStudents: students.length,
  totalTeachers: staff.length,
  totalParents: parents.length,
  totalClasses: classes.length,
  totalSubjects: subjects.length,
  totalStaff: staff.length + 3, // including non-teaching staff
  totalBooks: books.length,
  totalVehicles: vehicles.length,
  totalInventory: inventory.length,
  totalAnnouncements: announcements.length,
  maleStudents: students.filter(s => s.gender === 'Male').length,
  femaleStudents: students.filter(s => s.gender === 'Female').length,
  activeStudents: students.filter(s => s.status === 'active').length,
  presentToday: attendance.filter(a => a.date === '2026-11-12' && a.status === 'present').length,
  absentToday: attendance.filter(a => a.date === '2026-11-12' && (a.status === 'absent' || a.status === 'leave')).length,
};

// Monthly attendance data for charts
export const monthlyAttendanceData = [
  { month: 'Apr', present: 92, absent: 8 },
  { month: 'May', present: 88, absent: 12 },
  { month: 'Jun', present: 90, absent: 10 },
  { month: 'Jul', present: 85, absent: 15 },
  { month: 'Aug', present: 91, absent: 9 },
  { month: 'Sep', present: 87, absent: 13 },
  { month: 'Oct', present: 93, absent: 7 },
  { month: 'Nov', present: 89, absent: 11 },
];

// Class-wise student count for charts
export const classWiseStudentData = [
  { class: 'Class 1', students: 67 },
  { class: 'Class 2', students: 68 },
  { class: 'Class 3', students: 69 },
  { class: 'Class 4', students: 65 },
  { class: 'Class 5', students: 66 },
  { class: 'Class 6', students: 75 },
  { class: 'Class 7', students: 70 },
  { class: 'Class 8', students: 70 },
  { class: 'Class 9', students: 72 },
  { class: 'Class 10', students: 78 },
];

// Subject-wise performance for charts
export const subjectPerformanceData = [
  { subject: 'Math', avgScore: 78 },
  { subject: 'English', avgScore: 82 },
  { subject: 'Science', avgScore: 75 },
  { subject: 'SST', avgScore: 80 },
  { subject: 'Hindi', avgScore: 84 },
  { subject: 'CS', avgScore: 88 },
];
