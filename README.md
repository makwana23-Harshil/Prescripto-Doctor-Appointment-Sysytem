# Prescripto-Doctor-Appointment-Sysytem

A full-stack Doctor Appointment Booking System built with the MERN Stack. The application enables patients to book appointments, doctors to manage their schedules, and administrators to oversee the platform through dedicated dashboards. It features role-based authentication, responsive design, and a scalable architecture.

## Live Demo

**User panel**
https://prescripto-doctor-appointment-sysyt-xi.vercel.app

**Doctor Panel**
https://prescripto-doctor-appointment-sysyt-lovat.vercel.app/

**Admin Panel**
https://prescripto-doctor-appointment-sysyt-lovat.vercel.app/

# Features
--User
Signup & login
Browse doctors based on their specializations
Book & cancel appointments
Profile management
Appointment history
Online payment

--Doctor
Secure Login
Appointments management
Update their availability
Earnings
Profile update

--Admin
Overview of Dashboard
Doctors Management
All appointments view
Platform management

# Tech Stack
**Frontend**
- React.js
- Tailwind CSS
- React Router
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Authentication**
- JWT
- Bcrypt

**Other**
- Cloudinary
- Stripe
  
**Payment**
- Razorpay
  
# Project Structure
```text
Prescripto-Doctor-Appointment-System/
│── admin/
│── backend/
│── frontend/
└── README.md
```

# Installation

--Clone the repository:
```bash
git clone https://github.com/makwana23-Harshil/Prescripto-Doctor-Appointment-Sysytem.git
cd Prescripto-Doctor-Appointment-Sysytem
```
--Install dependencies:
```bash
cd backend && npm install
cd ../frontend && npm install
cd ../admin && npm install
```

## Environment Variables
--Create a `.env` file inside the `backend` folder.
```env
MONGODB_URI=
JWT_SECRET=
ADMIN_EMAIL=
ADMIN_PASSWORD=
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET_KEY=
STRIPE_SECRET_KEY=
```
--Create a `.env` file inside the `Frontend` folder.
```env
VITE_RAZORPAY_KEY_ID =''
```
# Running the Project

Start the backend:

```bash
cd backend
npm run server
```

Start the frontend:

```bash
cd frontend
npm run dev
```

Start the admin panel:

```bash
cd admin
npm run dev
```

# Future Improvements

- Video consultations
- Email notifications
- Appointment reminders
- Doctor ratings and reviews
- AI-based doctor recommendations

# Author
**Harshil Makwana**
GitHub: https://github.com/makwana23-Harshil

# License
This project is developed for educational and learning purposes.
