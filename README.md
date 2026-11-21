# @varad123/student-toolkit - Live Demo & REST API

> A production-grade demonstration project showcasing [`@varad123/student-toolkit`](https://www.npmjs.com/package/@varad123/student-toolkit) in a live Node.js web server and REST API.

[![npm version](https://img.shields.io/npm/v/@varad123/student-toolkit?color=crimson)](https://www.npmjs.com/package/@varad123/student-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)

---

## 🌐 Live Deployed Application

- **Live URL**: [Replace with your live deployed URL on Render / Vercel]
- **NPM Package**: [https://www.npmjs.com/package/@varad123/student-toolkit](https://www.npmjs.com/package/@varad123/student-toolkit)

---

## 🚀 Features Demonstrated

This project installs `@varad123/student-toolkit` directly from npm and provides an interactive web dashboard and REST API endpoints:

1. **Attendance Calculator & Goal Planner (`calculateAttendance`, `requiredClasses`)**:
   - Calculates real-time attendance percentage with custom rounding.
   - Computes consecutive upcoming lectures required to achieve target percentages (e.g. 75% or 85%).
   - Safely handles zero-class semester scenarios and mathematically impossible targets.
2. **Examination Percentage (`calculatePercentage`)**:
   - Calculates score percentages with decimal precision and boundary validation.
3. **Semester GPA (`calculateSGPA`)**:
   - Computes credit-weighted Semester Grade Point Average following university 10-point scales.
4. **Cumulative GPA (`calculateCGPA`)**:
   - Evaluates multi-semester averages across weighted or unweighted semesters.

---

## 🛠️ Local Development & Setup

### Prerequisites
- Node.js >= 18.0.0
- npm

### Installation
```bash
# Clone the repository
git clone https://github.com/varadbhardwaj2003-commits/<your-repo-name>.git
cd <your-repo-name>

# Install dependencies (installs @varad123/student-toolkit and express)
npm install
```

### Run the Web Server
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run the Command-Line Script
```bash
npm run cli
```

---

## 📡 REST API Documentation

### 1. Attendance & Goal Planner
- **Endpoint**: `POST /api/attendance`
- **Request Body**:
  ```json
  {
    "attended": 30,
    "total": 50,
    "target": 75
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "attended": 30,
      "total": 50,
      "target": 75,
      "currentAttendance": 60,
      "neededClasses": 30,
      "status": "At Risk"
    }
  }
  ```

### 2. Examination Percentage
- **Endpoint**: `POST /api/percentage`
- **Request Body**:
  ```json
  {
    "marks": 462,
    "total": 500
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "marks": 462,
      "total": 500,
      "percentage": 92.4
    }
  }
  ```

### 3. Semester SGPA
- **Endpoint**: `POST /api/sgpa`
- **Request Body**:
  ```json
  {
    "subjects": [
      { "credits": 4, "gradePoint": 9 },
      { "credits": 3, "gradePoint": 8 },
      { "credits": 2, "gradePoint": 10 }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "totalSubjects": 3,
      "totalCredits": 9,
      "sgpa": 8.89
    }
  }
  ```

### 4. Cumulative CGPA
- **Endpoint**: `POST /api/cgpa`
- **Request Body**:
  ```json
  {
    "semesters": [
      { "sgpa": 8.5, "credits": 20 },
      { "sgpa": 9.0, "credits": 22 },
      { "sgpa": 8.0, "credits": 18 }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "totalSemesters": 3,
      "cgpa": 8.53
    }
  }
  ```

---

## 📦 Deployment Instructions (Render.com)

1. Push this project to a **Public** GitHub repository.
2. Sign in to [Render](https://render.com/) with GitHub.
3. Click **New +** > **Web Service**.
4. Select this repository.
5. Configure:
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`
6. Click **Deploy Web Service** to obtain your live URL.
