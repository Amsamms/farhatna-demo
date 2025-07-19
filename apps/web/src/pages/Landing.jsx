import { Link } from 'react-router-dom'
import { Heart, Calendar, Star } from 'lucide-react'
import Button from '../components/Button'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'

const Landing = () => {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-secondary/10">
      {/* Header */}
      <header className="container py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">Farhatna</span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/auth/login" className="text-gray-600 hover:text-primary transition-colors">
              {t('nav.login')}
            </Link>
            <Link to="/auth/register">
              <Button variant="outline" size="sm">{t('nav.signup')}</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {t('landing.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {t('landing.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/explore">
              <Button size="lg" className="w-full sm:w-auto">
                {t('landing.exploreServices')}
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                {t('landing.getStarted')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('landing.easyBooking')}</h3>
            <p className="text-gray-600">
              {t('landing.easyBookingDesc')}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('landing.trustedSuppliers')}</h3>
            <p className="text-gray-600">
              {t('landing.trustedSuppliersDesc')}
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{t('landing.dreamWedding')}</h3>
            <p className="text-gray-600">
              {t('landing.dreamWeddingDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="container py-20">
        <h2 className="text-3xl font-bold text-center mb-12">{t('landing.weddingServices')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: t('categories.venues'), icon: '🏰', category: 'VENUE' },
            { name: t('categories.photography'), icon: '📸', category: 'PHOTOGRAPHER' },
            { name: t('categories.dresses'), icon: '👗', category: 'DRESS' },
            { name: t('categories.makeup'), icon: '💄', category: 'MAKEUP' },
            { name: t('categories.catering'), icon: '🍽️', category: 'CATERING' },
            { name: t('categories.travel'), icon: '✈️', category: 'TRAVEL' },
          ].map((service) => (
            <Link
              key={service.category}
              to={`/explore?category=${service.category}`}
              className="card p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-4xl mb-3">{service.icon}</div>
              <h3 className="font-semibold text-gray-900">{service.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">Farhatna</span>
          </div>
          <p className="text-center text-gray-400">
            {t('landing.footerText')}
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Landing