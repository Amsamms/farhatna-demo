import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Heart, MapPin, Star } from 'lucide-react'
import Button from '../components/Button'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'
import api from '../utils/api'

const Explore = () => {
  const { t } = useLanguage()
  
  const categories = [
    { value: '', label: t('categories.allCategories') },
    { value: 'VENUE', label: t('categories.venues') },
    { value: 'PHOTOGRAPHER', label: t('categories.photography') },
    { value: 'DRESS', label: t('categories.dresses') },
    { value: 'MAKEUP', label: t('categories.makeup') },
    { value: 'CATERING', label: t('categories.catering') },
    { value: 'TRAVEL', label: t('categories.travel') },
  ]
  const [searchParams, setSearchParams] = useSearchParams()
  const [suppliers, setSuppliers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')

  useEffect(() => {
    fetchSuppliers()
  }, [selectedCategory])

  const fetchSuppliers = async () => {
    try {
      setLoading(true)
      const data = await api.getSuppliers(selectedCategory || null)
      setSuppliers(data)
    } catch (error) {
      console.error('Error fetching suppliers:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    if (category) {
      setSearchParams({ category })
    } else {
      setSearchParams({})
    }
  }

  const formatPrice = (priceFrom, priceTo) => {
    if (priceFrom === priceTo) {
      return `${priceFrom.toLocaleString()} EGP`
    }
    return `${priceFrom.toLocaleString()} - ${priceTo.toLocaleString()} EGP`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 shadow-soft border-b border-white/20 sticky top-0 z-50">
        <div className="container py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-200">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Farhatna</span>
            </Link>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:bg-primary-50">
                {t('nav.dashboard')}
              </Link>
              <Link to="/auth/login">
                <Button variant="glass" size="sm">{t('nav.login')}</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        {/* Filters */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {t('explore.title')}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our curated collection of wedding service providers
            </p>
          </div>
          
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-soft border border-white/20">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by Category</h3>
            <div className="flex flex-wrap gap-3">
              {categories.map((category, index) => (
                <button
                  key={category.value}
                  onClick={() => handleCategoryChange(category.value)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                    selectedCategory === category.value
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50 backdrop-blur-sm'
                  }`}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Suppliers Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card-glass loading-shimmer">
                <div className="h-64 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-t-2xl"></div>
                <div className="p-6">
                  <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mb-6"></div>
                  <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {suppliers.map((supplier, index) => (
              <div 
                key={supplier.id} 
                className="group floating-card"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="card-glass overflow-hidden h-full">
                  <div className="h-64 bg-gray-200 overflow-hidden relative">
                    <img
                      src={supplier.thumbnail}
                      alt={supplier.companyName}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://images.pexels.com/photos/265818/pexels-photo-265818.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop`
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors duration-200">
                        {supplier.companyName}
                      </h3>
                      <span className="text-xs bg-gradient-to-r from-primary-100 to-secondary-100 text-primary-700 px-3 py-1.5 rounded-full font-semibold border border-primary-200/50">
                        {supplier.category.toLowerCase()}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-2 text-primary-500" />
                      <span className="font-medium">{supplier.location}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
                      {supplier.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto">
                      <div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{t('explore.startingFrom')}</div>
                        <div className="font-bold text-lg bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                          {formatPrice(supplier.priceFrom, supplier.priceTo)}
                        </div>
                      </div>
                      <Link to={`/supplier/${supplier.id}`}>
                        <Button size="sm" className="shadow-lg hover:shadow-xl">
                          <span className="mr-1">✨</span>
                          {t('explore.viewDetails')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && suppliers.length === 0 && (
          <div className="text-center py-20">
            <div className="card-glass p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('explore.noSuppliers')}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{t('explore.noSuppliersDesc')}</p>
              <Button onClick={() => handleCategoryChange('')} variant="outline">
                View All Categories
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore