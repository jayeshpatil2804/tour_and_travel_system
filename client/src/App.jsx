import React from 'react';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <AppRoutes />
      </main>
    </div>
  );
}

export default App;