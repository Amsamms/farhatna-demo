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
              <LanguageSwitcher />
              <Link to="/dashboard" className="text-gray-600 hover:text-primary transition-colors">
                {t('nav.dashboard')}
              </Link>
              <Link to="/auth/login">
                <Button variant="outline" size="sm">{t('nav.login')}</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container py-8">
        {/* Filters */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('explore.title')}</h1>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => handleCategoryChange(category.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category.value
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Suppliers Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="card hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={supplier.thumbnail}
                    alt={supplier.companyName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1519167758481-83f29d8ae8e1?w=400&h=300&fit=crop`
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      {supplier.companyName}
                    </h3>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {supplier.category.toLowerCase()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {supplier.location}
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {supplier.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500">{t('explore.startingFrom')}</div>
                      <div className="font-semibold text-primary">
                        {formatPrice(supplier.priceFrom, supplier.priceTo)}
                      </div>
                    </div>
                    <Link to={`/supplier/${supplier.id}`}>
                      <Button size="sm">{t('explore.viewDetails')}</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && suppliers.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('explore.noSuppliers')}</h3>
            <p className="text-gray-600">{t('explore.noSuppliersDesc')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Explore