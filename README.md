# Online Learning Platform - Client

A modern, full-featured online learning platform built with React, Vite, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![Vite](https://img.shields.io/badge/Vite-6.0.1-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-cyan)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Features

### 🔐 Authentication
- Email/password authentication
- Google OAuth integration
- Protected routes
- Persistent login sessions

### 📚 Course Management
- Browse all courses with category filtering
- View detailed course information
- Enroll in courses
- Create and manage courses (instructors)
- Update course information
- Delete courses with confirmation

### 🎯 Dashboard
- View enrolled courses
- Add new courses with image upload
- Manage your created courses
- Responsive sidebar navigation

### 🎨 UI/UX
- Beautiful, modern design
- Dark/light theme toggle with persistence
- Smooth animations with Framer Motion
- Fully responsive (mobile, tablet, desktop)
- Toast notifications
- Loading states throughout

## 🛠️ Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Framer Motion** - Animation library
- **Firebase** - Authentication
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **ImgBB API** - Image hosting

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- ImgBB API key
- Backend API running

## ⚙️ Installation

1. **Clone the repository**
```bash
git clone https://github.com/mahfuzzayn/online-learning-platform-client.git
cd online-learning-platform-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```bash
# Backend API URL
VITE_API_URL=your_backend_api_url

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id

# ImgBB API Key (for image uploads)
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

4. **Start development server**
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

## 🧪 Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
client/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   ├── contexts/        # React contexts (Auth, Theme)
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   │   └── dashboard/   # Dashboard pages
│   ├── App.jsx          # Root component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── package.json         # Dependencies
├── tailwind.config.js   # Tailwind configuration
└── vite.config.js       # Vite configuration
```

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API base URL | Yes |
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `VITE_IMGBB_API_KEY` | ImgBB API key for image uploads | Yes |

## 🌐 API Endpoints

The application expects the following API endpoints:

### Courses
- `GET /courses` - Get all courses
- `GET /courses/:id` - Get single course
- `POST /courses` - Create course
- `PUT /courses/:id` - Update course
- `DELETE /courses/:id` - Delete course

### Enrollments
- `GET /enrollments?userEmail={email}` - Get user enrollments
- `POST /enrollments` - Create enrollment

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (< 768px)
- 📱 Tablets (768px - 1024px)
- 💻 Desktops (> 1024px)

## 🎨 Theme Support

- Light mode (default)
- Dark mode
- Theme preference saved in localStorage
- Automatic system theme detection

## 🚀 Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard

### Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to Netlify

3. Set environment variables in Netlify dashboard

### Other Platforms

The application can be deployed to any static hosting service that supports SPAs:
- GitHub Pages
- Firebase Hosting
- AWS S3 + CloudFront
- DigitalOcean App Platform

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Mahfuz Zayn**
- GitHub: [@mahfuzzayn](https://github.com/mahfuzzayn)

## 🙏 Acknowledgments

- React team for the amazing library
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for smooth animations
- Firebase for authentication services
- ImgBB for image hosting

## 📞 Support

For support, email mahfuz.dev@example.com or open an issue in the repository.

---

**Built with ❤️ using React and Tailwind CSS**
