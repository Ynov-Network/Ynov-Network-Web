# Ynov-Network Web Application

A modern social networking platform built for university students, enabling them to connect, share posts, chat, and participate in campus events and groups.

## 🚀 Features

- **User Authentication** - Secure sign up and sign in functionality
- **Social Feed** - Share posts, interact with content, and stay updated
- **Real-time Chat** - Connect with classmates and friends
- **User Profiles** - Customize and manage your profile
- **Events Management** - Discover and participate in campus events
- **Groups** - Join and create study groups or interest-based communities
- **Notifications** - Stay informed about activities and interactions
- **Explore** - Discover new people and content
- **Saved Posts** - Bookmark and organize important content
- **Settings** - Customize your experience and privacy preferences

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 with custom animations
- **UI Components**: Radix UI primitives
- **Routing**: React Router 7
- **State Management**: TanStack Query (React Query)
- **Authentication**: Better Auth
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Theme**: Next Themes for dark/light mode
- **Notifications**: Sonner for toast notifications

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Ynov-Network-Web
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Configure your environment variables
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

## 🔧 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Project Structure

```text
src/
├── components/          # Reusable UI components
├── pages/              # Application pages
│   ├── auth/           # Authentication pages
│   ├── main/           # Main application pages
│   └── index/          # Landing page
├── services/           # API services and data fetching
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
└── assets/             # Static assets
```

## 🎨 UI Components

This project uses a modern component library built on top of Radix UI primitives:

- **Shadcn/ui inspired components** for consistent design
- **Responsive design** that works on all devices
- **Dark/Light theme support** with smooth transitions
- **Accessible components** following WAI-ARIA guidelines

## 🌐 Backend Integration

This web application works in conjunction with:

- **Ynov-Network-API** - Node.js/Express backend server
- **Ynov-Network-Mobile** - Flutter mobile application

## 🔐 Authentication

- Secure authentication system using Better Auth
- JWT token management
- Protected routes and role-based access
- Social login integration support

## 📱 Responsive Design

- Mobile-first responsive design
- Optimized for tablets and desktop
- Touch-friendly interface elements
- Progressive Web App (PWA) ready

## 🧪 Development

### Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting with React-specific rules
- **Consistent code formatting** and best practices

### Performance

- **Vite** for fast development and building
- **Code splitting** and lazy loading
- **Optimized bundle size** for production
- **React Query** for efficient data fetching and caching

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the Ynov-Network ecosystem developed for educational purposes.

## 🏫 About

Ynov-Network is a comprehensive social networking platform designed specifically for university students to enhance their academic and social experience on campus.
