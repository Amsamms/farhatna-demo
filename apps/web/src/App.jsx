import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './contexts/LanguageContext'
import Landing from './pages/Landing'
import Explore from './pages/Explore'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import SupplierDetail from './pages/SupplierDetail'

function App() {
  return (
    <LanguageProvider>
      <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/auth/login" element={<Auth />} />
        <Route path="/auth/register" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/supplier/:id" element={<SupplierDetail />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600">Page not found</p>
          </div>
        </div>} />
      </Routes>
    </Router>
    </LanguageProvider>
  )
}

export default App