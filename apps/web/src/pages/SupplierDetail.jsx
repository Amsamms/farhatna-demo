import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Heart, MapPin, Calendar, ArrowLeft, Star } from 'lucide-react'
import Button from '../components/Button'
import useAuthStore from '../store/authStore'
import api from '../utils/api'

const SupplierDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()
  
  const [supplier, setSupplier] = useState(null)
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)
  const [eventDate, setEventDate] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchSupplier()
  }, [id])

  const fetchSupplier = async () => {
    try {
      setLoading(true)
      const data = await api.getSupplier(id)
      setSupplier(data)
    } catch (error) {
      console.error('Error fetching supplier:', error)
      setError('Failed to load supplier details')
    } finally {
      setLoading(false)
    }
  }

  const handleBooking = async (e) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      navigate('/auth/login')
      return
    }

    if (user?.role === 'ADMIN') {
      setError('Admin accounts cannot make bookings')
      return
    }

    try {
      setBooking(true)
      setError('')
      
      await api.createBooking({
        supplierId: parseInt(id),
        eventDate: eventDate
      })
      
      setSuccess('Booking created successfully! Check your dashboard to view it.')
      setEventDate('')
    } catch (error) {
      setError(error.message || 'Failed to create booking')
    } finally {
      setBooking(false)
    }
  }

  const formatPrice = (priceFrom, priceTo) => {
    if (priceFrom === priceTo) {
      return `${priceFrom.toLocaleString()} EGP`
    }
    return `${priceFrom.toLocaleString()} - ${priceTo.toLocaleString()} EGP`
  }

  const getTodayDate = () => {
    const today = new Date()
    today.setDate(today.getDate() + 1) // Minimum booking is tomorrow
    return today.toISOString().split('T')[0]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm">
          <div className="container py-4">
            <nav className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <Heart className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold text-gray-900">Farhatna</span>
              </Link>
            </nav>
          </div>
        </header>
        
        <div className="container py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error && !supplier) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Supplier not found</h1>
          <Link to="/explore">
            <Button>Back to Explore</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold text-gray-900">Farhatna</span>
            </Link>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              ) : (
                <Link to="/auth/login">
                  <Button variant="outline" size="sm">Login</Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        {/* Back Button */}
        <Link 
          to="/explore" 
          className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Explore
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Supplier Image */}
          <div className="space-y-4">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={supplier.thumbnail}
                alt={supplier.companyName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://images.pexels.com/photos/265818/pexels-photo-265818.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop`
                }}
              />
            </div>
          </div>

          {/* Supplier Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{supplier.companyName}</h1>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {supplier.category.toLowerCase()}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                {supplier.location}
              </div>

              <p className="text-gray-700 leading-relaxed">
                {supplier.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Pricing</h3>
              <div className="text-2xl font-bold text-primary">
                {formatPrice(supplier.priceFrom, supplier.priceTo)}
              </div>
              <p className="text-gray-600 text-sm mt-1">Starting price</p>
            </div>

            {/* Booking Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Book This Service</h3>
              
              {success && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
              )}
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Event Date
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    min={getTodayDate()}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <Button
                  type="submit"
                  loading={booking}
                  className="w-full"
                  disabled={!eventDate}
                >
                  {isAuthenticated ? 'Book Now' : 'Login to Book'}
                </Button>
              </form>

              {!isAuthenticated && (
                <p className="text-sm text-gray-600 mt-2 text-center">
                  <Link to="/auth/login" className="text-primary hover:underline">
                    Login
                  </Link>
                  {' or '}
                  <Link to="/auth/register" className="text-primary hover:underline">
                    create an account
                  </Link>
                  {' to book this service'}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupplierDetail