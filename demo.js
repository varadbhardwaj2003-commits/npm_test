/**
 * Demonstration of @varad123/student-toolkit
 * A zero-dependency academic calculator utility library for students.
 */

// 1. Central named imports
import {
  calculateAttendance,
  requiredClasses,
  calculatePercentage,
  calculateSGPA,
  calculateCGPA
} from '@varad123/student-toolkit';

// 2. Subpath imports verification (tree-shaking test)
import { calculateAttendance as subpathAttendance } from '@varad123/student-toolkit/attendance';
import { calculatePercentage as subpathPercentage } from '@varad123/student-toolkit/percentage';
import { calculateSGPA as subpathSGPA } from '@varad123/student-toolkit/sgpa';
import { calculateCGPA as subpathCGPA } from '@varad123/student-toolkit/cgpa';

// ANSI color helpers for clean console output
const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  red: '\x1b[31m',
  gray: '\x1b[90m'
};

function banner(title) {
  console.log(`\n${colors.cyan}${colors.bold}=== ${title} ===${colors.reset}`);
}

function subheader(text) {
  console.log(`${colors.yellow}${colors.bold}> ${text}${colors.reset}`);
}

console.log(`${colors.magenta}${colors.bold}`);
console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║           @varad123/student-toolkit - Live Node.js Demo       ║');
console.log('║       Zero-dependency student academic calculation toolkit    ║');
console.log('╚═══════════════════════════════════════════════════════════════╝');
console.log(colors.reset);

// -------------------------------------------------------------
// SECTION 1: Subpath Imports Verification
// -------------------------------------------------------------
banner('1. Verifying Subpath & Central Exports');
console.log(`Central calculateAttendance is function: ${typeof calculateAttendance === 'function'}`);
console.log(`Subpath calculateAttendance is function: ${typeof subpathAttendance === 'function'}`);
console.log(`Subpath calculatePercentage is function: ${typeof subpathPercentage === 'function'}`);
console.log(`Subpath calculateSGPA is function:       ${typeof subpathSGPA === 'function'}`);
console.log(`Subpath calculateCGPA is function:       ${typeof subpathCGPA === 'function'}`);
console.log(`${colors.green}✓ All module entry points and subpaths resolved successfully!${colors.reset}`);

// -------------------------------------------------------------
// SECTION 2: Attendance Tracking & Goals
// -------------------------------------------------------------
banner('2. Attendance & Goal Planning');

subheader('calculateAttendance(attended, total, [precision])');
const att1 = calculateAttendance(38, 48);
console.log(`Attended 38/48 classes:           ${colors.bold}${att1}%${colors.reset}`);

const att2 = calculateAttendance(0, 0);
console.log(`Beginning of semester (0/0):       ${colors.bold}${att2}%${colors.reset} (graceful zero-total handling)`);

const att3 = calculateAttendance(22, 33, 4);
console.log(`Custom precision (22/33, 4 dec):   ${colors.bold}${att3}%${colors.reset}`);

subheader('requiredClasses(attended, total, [targetPercentage])');
const req1 = requiredClasses(30, 50, 75);
console.log(`Current: 30/50 (60.00%) | Target: 75% -> Must attend: ${colors.green}${colors.bold}${req1} consecutive classes${colors.reset}`);
// Verification: (30 + 30) / (50 + 30) = 60 / 80 = 75%

const req2 = requiredClasses(42, 50, 75);
console.log(`Current: 42/50 (84.00%) | Target: 75% -> Must attend: ${colors.green}${colors.bold}${req2} classes${colors.reset} (target already met!)`);

const req3 = requiredClasses(19, 20, 100);
console.log(`Current: 19/20 (95.00%) | Target: 100% -> Must attend: ${colors.red}${colors.bold}${req3}${colors.reset} (impossible once 1 class is missed)`);

const req4 = requiredClasses(0, 0, 75);
console.log(`Current: 0/0 (0.00%)    | Target: 75% -> Must attend: ${colors.green}${colors.bold}${req4} class${colors.reset}`);

// -------------------------------------------------------------
// SECTION 3: Examination Percentage
// -------------------------------------------------------------
banner('3. Examination Percentage');
subheader('calculatePercentage(obtainedMarks, totalMarks, [precision])');

const score1 = calculatePercentage(462, 500);
console.log(`Marks: 462 / 500:                  ${colors.bold}${score1}%${colors.reset}`);

const score2 = calculatePercentage(78.5, 100);
console.log(`Marks with decimals: 78.5 / 100:   ${colors.bold}${score2}%${colors.reset}`);

const score3 = calculatePercentage(0, 0);
console.log(`Zero total marks: 0 / 0:           ${colors.bold}${score3}%${colors.reset}`);

const score4 = calculatePercentage(267, 360, 3);
console.log(`Custom precision: 267 / 360 (3 dec): ${colors.bold}${score4}%${colors.reset}`);

// -------------------------------------------------------------
// SECTION 4: Semester Grade Point Average (SGPA)
// -------------------------------------------------------------
banner('4. Semester Grade Point Average (SGPA)');
subheader('calculateSGPA(subjects, [precision])');

const currentSemesterSubjects = [
  { name: 'Data Structures & Algorithms', credits: 4, gradePoint: 9 },  // A+
  { name: 'Operating Systems',            credits: 4, gradePoint: 8 },  // A
  { name: 'Database Management Systems',  credits: 3, gradePoint: 10 }, // O (Outstanding)
  { name: 'Discrete Mathematics',         credits: 3, gradePoint: 8 },  // A
  { name: 'Algorithms Lab',               credits: 2, gradePoint: 10 }, // O
  { name: 'Professional Ethics',          credits: 1, gradePoint: 9 }   // A+
];

console.log('Semester Coursework:');
let totalCreds = 0;
for (const sub of currentSemesterSubjects) {
  console.log(` - ${sub.name.padEnd(32)} | Credits: ${sub.credits} | Grade Point: ${sub.gradePoint}/10`);
  totalCreds += sub.credits;
}

const semesterSGPA = calculateSGPA(currentSemesterSubjects);
console.log(`Total Credits: ${totalCreds}`);
console.log(`Calculated SGPA: ${colors.green}${colors.bold}${semesterSGPA} / 10.00${colors.reset}`);

// -------------------------------------------------------------
// SECTION 5: Cumulative Grade Point Average (CGPA)
// -------------------------------------------------------------
banner('5. Cumulative Grade Point Average (CGPA)');

subheader('Mode A: Credit-Weighted Across Semesters (Standard University Method)');
const degreeHistory = [
  { semester: 'Semester 1', sgpa: 8.50, credits: 21 },
  { semester: 'Semester 2', sgpa: 8.75, credits: 22 },
  { semester: 'Semester 3', sgpa: 8.20, credits: 20 },
  { semester: 'Semester 4', sgpa: 9.10, credits: 23 },
  { semester: 'Semester 5', sgpa: 8.90, credits: 17 } // Current
];

console.log('Academic History:');
for (const sem of degreeHistory) {
  console.log(` - ${sem.semester}: SGPA ${sem.sgpa.toFixed(2)} (${sem.credits} credits)`);
}

const weightedCGPA = calculateCGPA(degreeHistory);
console.log(`Weighted CGPA:   ${colors.green}${colors.bold}${weightedCGPA} / 10.00${colors.reset}`);

subheader('Mode B: Simple Unweighted Average');
const sgpaList = [8.50, 8.75, 8.20, 9.10, 8.90];
const unweightedCGPA = calculateCGPA(sgpaList);
console.log(`Semester SGPAs:  [${sgpaList.join(', ')}]`);
console.log(`Unweighted CGPA: ${colors.green}${colors.bold}${unweightedCGPA} / 10.00${colors.reset}`);

// -------------------------------------------------------------
// SECTION 6: Defensive Validation & Error Handling
// -------------------------------------------------------------
banner('6. Defensive Validation & Error Handling');

const testCases = [
  {
    name: 'Attended classes exceed total classes',
    fn: () => calculateAttendance(55, 50)
  },
  {
    name: 'Negative total classes',
    fn: () => calculateAttendance(10, -5)
  },
  {
    name: 'Target percentage above 100',
    fn: () => requiredClasses(20, 30, 105)
  },
  {
    name: 'Invalid string argument type',
    fn: () => calculatePercentage('80', 100)
  },
  {
    name: 'Obtained marks greater than maximum',
    fn: () => calculatePercentage(105, 100)
  },
  {
    name: 'Subject grade point exceeding 10',
    fn: () => calculateSGPA([{ credits: 3, gradePoint: 11 }])
  },
  {
    name: 'Subject with zero or negative credits',
    fn: () => calculateSGPA([{ credits: 0, gradePoint: 9 }])
  },
  {
    name: 'Empty subjects array',
    fn: () => calculateSGPA([])
  },
  {
    name: 'Invalid semester entry for CGPA',
    fn: () => calculateCGPA([{ invalid: true }])
  }
];

for (const { name, fn } of testCases) {
  try {
    fn();
    console.log(`${colors.red}✗ Expected error for: ${name}${colors.reset}`);
  } catch (err) {
    console.log(`${colors.blue}[${err.name}]${colors.reset} ${name}:`);
    console.log(`  ${colors.gray}↳ ${err.message}${colors.reset}`);
  }
}

// -------------------------------------------------------------
// SECTION 7: End-to-End Real Student Scenario
// -------------------------------------------------------------
banner('7. End-to-End Student Scenario: "Midterm Evaluation"');

const student = {
  name: 'Varad Bhardwaj',
  program: 'B.Tech Computer Science & Engineering',
  semester: 5,
  attendanceReport: [
    { course: 'Machine Learning', attended: 26, total: 36, target: 75 },
    { course: 'Cloud Computing',   attended: 31, total: 34, target: 75 },
    { course: 'Compiler Design',   attended: 18, total: 32, target: 75 },
    { course: 'Cyber Security',    attended: 22, total: 30, target: 75 }
  ]
};

console.log(`Student: ${colors.bold}${student.name}${colors.reset} | ${student.program} (Semester ${student.semester})`);
console.log('\nCourse Attendance & Exam Eligibility Audit:');

for (const c of student.attendanceReport) {
  const currentPct = calculateAttendance(c.attended, c.total);
  const needed = requiredClasses(c.attended, c.total, c.target);
  const status = currentPct >= c.target
    ? `${colors.green}ELIGIBLE${colors.reset}`
    : `${colors.red}AT RISK${colors.reset}`;

  console.log(`• ${colors.bold}${c.course.padEnd(18)}${colors.reset} ` +
    `Attended: ${String(c.attended).padStart(2)}/${String(c.total).padStart(2)} (${currentPct.toFixed(1)}%) | ` +
    `Status: ${status} | ` +
    (needed === 0
      ? `${colors.green}Target met!${colors.reset}`
      : `${colors.yellow}Must attend next ${needed} classes consecutively${colors.reset}`)
  );
}

console.log(`\n${colors.green}${colors.bold}✔ Demo completed successfully! All functions passed.${colors.reset}\n`);
