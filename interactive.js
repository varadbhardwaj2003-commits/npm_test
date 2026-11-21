import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import {
  calculateAttendance,
  requiredClasses,
  calculatePercentage,
  calculateSGPA,
  calculateCGPA
} from '@varad123/student-toolkit';

const rl = readline.createInterface({ input, output });

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

async function promptMenu() {
  console.log(`\n${colors.cyan}${colors.bold}=== Student Toolkit Interactive Terminal ===${colors.reset}`);
  console.log('1. Calculate Attendance Percentage');
  console.log('2. Plan Required Classes to Reach Target');
  console.log('3. Calculate Exam Percentage');
  console.log('4. Calculate Semester GPA (SGPA)');
  console.log('5. Calculate Cumulative GPA (CGPA)');
  console.log('6. Exit');

  const choice = (await rl.question('\nSelect an option [1-6]: ')).trim();

  try {
    switch (choice) {
      case '1': {
        const attended = Number(await rl.question('Enter attended classes: '));
        const total = Number(await rl.question('Enter total classes: '));
        const res = calculateAttendance(attended, total);
        console.log(`${colors.green}${colors.bold}✓ Attendance: ${res}%${colors.reset}`);
        break;
      }
      case '2': {
        const attended = Number(await rl.question('Enter attended classes: '));
        const total = Number(await rl.question('Enter total classes: '));
        const target = Number(await rl.question('Enter target percentage (default 75): ') || 75);
        const needed = requiredClasses(attended, total, target);
        if (needed === Infinity) {
          console.log(`${colors.red}${colors.bold}✗ Impossible to reach ${target}% because classes have already been missed.${colors.reset}`);
        } else if (needed === 0) {
          console.log(`${colors.green}${colors.bold}✓ You have already achieved or exceeded ${target}%!${colors.reset}`);
        } else {
          console.log(`${colors.green}${colors.bold}✓ You must attend the next ${needed} consecutive classes.${colors.reset}`);
        }
        break;
      }
      case '3': {
        const marks = Number(await rl.question('Enter obtained marks: '));
        const totalMarks = Number(await rl.question('Enter total maximum marks: '));
        const res = calculatePercentage(marks, totalMarks);
        console.log(`${colors.green}${colors.bold}✓ Score: ${res}%${colors.reset}`);
        break;
      }
      case '4': {
        const count = Number(await rl.question('How many subjects this semester? '));
        const subjects = [];
        for (let i = 0; i < count; i++) {
          console.log(`\n--- Subject ${i + 1} ---`);
          const credits = Number(await rl.question('  Credits (e.g. 3 or 4): '));
          const gradePoint = Number(await rl.question('  Grade Point (0-10): '));
          subjects.push({ credits, gradePoint });
        }
        const sgpa = calculateSGPA(subjects);
        console.log(`\n${colors.green}${colors.bold}✓ Calculated SGPA: ${sgpa} / 10.00${colors.reset}`);
        break;
      }
      case '5': {
        const raw = await rl.question('Enter semester SGPAs separated by commas (e.g. 8.5, 9.0, 8.2): ');
        const s = raw.split(',').map(x => Number(x.trim())).filter(x => !isNaN(x));
        const cgpa = calculateCGPA(s);
        console.log(`\n${colors.green}${colors.bold}✓ Unweighted CGPA: ${cgpa} / 10.00${colors.reset}`);
        break;
      }
      case '6':
        console.log('Goodbye!');
        rl.close();
        return;
      default:
        console.log(`${colors.red}Invalid option.${colors.reset}`);
    }
  } catch (err) {
    console.log(`${colors.red}Error: ${err.message}${colors.reset}`);
  }

  await promptMenu();
}

promptMenu();
