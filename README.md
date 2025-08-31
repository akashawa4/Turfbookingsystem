# 🏟️ Galli2Ground

**From Streets to Stadium** - A complete turf booking platform for sports enthusiasts.

## 🚀 About

Galli2Ground is a modern, responsive web application that connects sports enthusiasts with premium sports facilities. Whether you're looking for cricket grounds, football fields, tennis courts, or any other sports venue, Galli2Ground makes it easy to discover, book, and enjoy your favorite sports.

## ✨ Features

- **🏟️ Premium Turf Listings**: Discover verified sports facilities with detailed information
- **🔍 Advanced Search**: Find turfs by location, sport, price, and availability
- **📱 Mobile Optimized**: Responsive design that works perfectly on all devices
- **🔐 User Authentication**: Secure login with Google OAuth and demo accounts
- **💳 Smart Booking**: Pay ₹100 online, remaining amount at the turf
- **🗺️ Location Integration**: View turfs on Google Maps with directions
- **👥 Role-Based Access**: Admin, Turf Manager, and User dashboards
- **📊 Real-time Management**: Turf managers can handle bookings, facilities, and images

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd galli2ground

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 👥 Demo Accounts

### Admin
- **Email**: admin@galli2ground.com
- **Password**: admin123
- **Access**: Create turfs, manage turf managers, oversee system

### Turf Manager
- **Email**: manager@galli2ground.com  
- **Password**: manager123
- **Access**: Manage assigned turf, handle bookings, update facilities

### Regular User
- **Email**: user@galli2ground.com
- **Password**: user123
- **Access**: Browse turfs, make bookings, view history

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── admin/          # Admin dashboard components
│   ├── booking/        # Booking flow components
│   ├── landing/        # Landing page components
│   ├── layout/         # Layout components (Navbar, etc.)
│   ├── pages/          # Page components
│   ├── search/         # Search and filter components
│   └── turf/           # Turf-specific components
├── contexts/            # React Context providers
├── data/               # Static data and mock APIs
└── types/              # TypeScript type definitions
```

## 🎨 Design Features

- **Modern UI/UX**: Glassmorphism effects and smooth animations
- **Responsive Design**: Mobile-first approach with touch optimization
- **Custom Animations**: Smooth transitions and hover effects
- **Gradient Design**: Beautiful color schemes throughout the interface
- **Accessibility**: Proper contrast and keyboard navigation support

## 🔧 Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory:

```env
VITE_APP_NAME=Galli2Ground
VITE_APP_DESCRIPTION=From Streets to Stadium
```

## 📱 Mobile Optimization

- **Touch-Friendly**: Optimized for mobile devices
- **Responsive Layout**: Adapts to all screen sizes
- **Performance**: Optimized images and lazy loading
- **Smooth Scrolling**: Enhanced mobile scrolling experience

## 🚀 Deployment

The application can be deployed to any static hosting service:

```bash
# Build the project
npm run build

# Deploy the dist/ folder to your hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🏆 Support

For support and questions, please contact the development team.

---

**Galli2Ground** - Where every street leads to a stadium! 🏟️⚽🏏🎾
