# Tour and Travel System

A modern, responsive web application for browsing and booking tours and travel packages. Built with React, Node.js, and modern web technologies.

## 🚀 Features

- **Tour Browsing**: Browse through various tour packages with filtering and sorting options
- **Advanced Filtering**: Filter tours by destination, price range, transport type, and duration
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Search**: Debounced search inputs for better performance
- **Multiple View Modes**: Grid and list view options
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- **Performance Optimized**: Uses React.memo, useCallback, and useMemo for optimal performance

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with latest features
- **React Router DOM 7.7.1** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Axios 1.11.0** - HTTP client for API calls
- **PropTypes 15.8.1** - Runtime type checking for React props
- **Vite 7.0.4** - Fast build tool and dev server

### Backend
- Node.js with Express (server directory)
- RESTful API architecture

## 📁 Project Structure

```
tour-and-travel-app/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── common/     # Common components (Input, Button, etc.)
│   │   │   ├── tours/      # Tour-specific components
│   │   │   └── layout/     # Layout components (Navbar, Footer)
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── api/            # API configuration and calls
│   │   └── utils/          # Utility functions
│   └── package.json
├── server/                 # Backend Node.js application
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tour-and-travel-app
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../server
npm install
```

### Development

1. Start the backend server:
```bash
cd server
npm run dev
```

2. Start the frontend development server:
```bash
cd client
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 🔧 Recent Optimizations & Fixes

### Syntax Errors Fixed
- ✅ Fixed template literal syntax in TourCard component
- ✅ Added proper JSX closing tags in ToursPage
- ✅ Resolved undefined property access issues

### Performance Optimizations
- ✅ Added React.memo to prevent unnecessary re-renders
- ✅ Implemented useCallback for event handlers
- ✅ Added debounced input for search functionality
- ✅ Optimized filter and sort operations

### Code Quality Improvements
- ✅ Added PropTypes validation to all components
- ✅ Created comprehensive error boundary component
- ✅ Improved error handling and user feedback
- ✅ Added loading states and spinners

### New Components Created
- `ErrorBoundary.jsx` - Catches and handles component errors gracefully
- `DebouncedInput.jsx` - Input component with built-in debouncing
- `LoadingSpinner.jsx` - Enhanced loading component with multiple sizes
- `useDebounce.js` - Custom hook for debouncing values

## 📝 Component Documentation

### TourCard
Displays individual tour information in a card format.

**Props:**
- `tour` (object, required): Tour data object containing title, location, price, duration, images, etc.

### TourFilter
Provides filtering options for tours including destination, price range, transport type, and duration.

**Props:**
- `filters` (object, required): Current filter state
- `setFilters` (function, required): Function to update filter state

### ViewToggle
Allows users to switch between grid and list view modes.

**Props:**
- `viewMode` (string, required): Current view mode ('grid' or 'list')
- `setViewMode` (function, required): Function to update view mode

## 🐛 Error Handling

The application includes comprehensive error handling:
- **Error Boundaries**: Catch and display user-friendly error messages
- **API Error Handling**: Graceful handling of network and server errors
- **Form Validation**: Input validation with user feedback
- **Loading States**: Clear loading indicators during data fetching

## 🎨 Styling

The application uses Tailwind CSS for styling with:
- Responsive design patterns
- Consistent color scheme
- Hover and focus states
- Smooth transitions and animations

## 🔄 State Management

The application uses React's built-in state management with:
- `useState` for local component state
- `useEffect` for side effects
- `useCallback` and `useMemo` for performance optimization
- Custom hooks for reusable logic

## 📱 Responsive Design

The application is fully responsive with breakpoints for:
- Mobile devices (< 768px)
- Tablets (768px - 1024px)
- Desktop (> 1024px)

## 🚀 Deployment

For production deployment:

1. Build the frontend:
```bash
cd client
npm run build
```

2. The built files will be in the `client/dist` directory
3. Deploy the server and serve the built frontend files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please create an issue in the repository.