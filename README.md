#  Horology

Horology is a full-stack luxury watch showroom. It provides a premium, digital experience for viewing and inquiring about exclusive timepieces.

---

## Features

- **Premium Interface:** A dark-themed aesthetic with smooth animations.
- **Interactive 3D Showroom:** View interactive 3D models of luxury watches right in your browser using **Three.js**.
- **Collection Vault:** Browse the catalog with dynamic filtering and sorting.
- **Secure Login:** Google OAuth integration for quick user sign-ups.
- **Inquiry System:** Direct contact system that securely sends real emails to the platform owner.

---

## Technology Stack

**Frontend:**
- **Next.js 15 & React 19** - Core framework
- **Tailwind CSS v4** - Styling
- **Framer Motion** - Animations and page transitions
- **Three.js & React Three Fiber** - 3D watch rendering
- **Vercel** - Frontend hosting & Email API routing

**Backend:**
- **Node.js & Express.js** - Server framework
- **MongoDB** - Database for storing watch collections and users
- **Google Auth Library** - OAuth authentication
- **Nodemailer** - Email delivery system
- **Render** - Backend hosting

---

## Getting Started Locally

### 1. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend/` folder:
```env
PORT=5005
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
GOOGLE_CLIENT_ID=your_google_oauth_client_id
```
Start the server:
```bash
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
```
Create a `.env.local` file in the `frontend/` folder:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5005
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id

# Email Config
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
INQUIRY_MAIL=your_receiving_email_address
```
Start the website:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.
