import { Link } from 'react-router-dom'
import { Heart, Calendar, Star } from 'lucide-react'
import Button from '../components/Button'
import LanguageSwitcher from '../components/LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'
import { useEffect } from 'react'

const Landing = () => {
  const { t } = useLanguage()
  
  useEffect(() => {
    // Add animation classes to elements when component mounts
    const elements = document.querySelectorAll('.animate-fade-in, .animate-slide-up')
    elements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.2}s`
    })
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background decoration */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E91E63' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Header */}
      <header className="container py-6 relative z-10">
        <nav className="flex items-center justify-between backdrop-blur-sm bg-white/70 rounded-2xl px-6 py-4 shadow-soft border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Farhatna</span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/auth/login" className="text-gray-600 hover:text-primary-600 transition-all duration-200 font-medium px-3 py-2 rounded-lg hover:bg-primary-50">
              {t('nav.login')}
            </Link>
            <Link to="/auth/register">
              <Button variant="glass" size="sm">{t('nav.signup')}</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container py-20 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-primary-100 to-secondary-100 border border-primary-200/50 mb-6">
              <span className="text-sm font-medium text-primary-700">✨ Making Your Dream Wedding Come True</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-black text-gray-900 mb-8 leading-tight animate-slide-up">
            <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-600 bg-clip-text text-transparent">
              {t('landing.title')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{animationDelay: '0.2s'}}>
            {t('landing.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up" style={{animationDelay: '0.4s'}}>
            <Link to="/explore">
              <Button size="xl" className="w-full sm:w-auto min-w-[200px] shadow-2xl">
                <span className="mr-2">🎉</span>
                {t('landing.exploreServices')}
              </Button>
            </Link>
            <Link to="/auth/register">
              <Button variant="glass" size="xl" className="w-full sm:w-auto min-w-[200px]">
                <span className="mr-2">💝</span>
                {t('landing.getStarted')}
              </Button>
            </Link>
          </div>
          
          {/* Floating hearts decoration */}
          <div className="absolute top-20 left-10 animate-pulse-slow">
            <Heart className="w-8 h-8 text-primary-300" />
          </div>
          <div className="absolute top-32 right-16 animate-pulse-slow" style={{animationDelay: '1s'}}>
            <Heart className="w-6 h-6 text-secondary-300" />
          </div>
          <div className="absolute bottom-10 left-20 animate-pulse-slow" style={{animationDelay: '2s'}}>
            <Heart className="w-4 h-4 text-primary-400" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Why Choose Farhatna?
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the perfect blend of tradition and innovation in wedding planning
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group floating-card">
            <div className="card-glass p-8 h-full">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <Calendar className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('landing.easyBooking')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.easyBookingDesc')}
              </p>
            </div>
          </div>
          
          <div className="text-center group floating-card">
            <div className="card-glass p-8 h-full">
              <div className="w-20 h-20 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('landing.trustedSuppliers')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.trustedSuppliersDesc')}
              </p>
            </div>
          </div>
          
          <div className="text-center group floating-card">
            <div className="card-glass p-8 h-full">
              <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{t('landing.dreamWedding')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('landing.dreamWeddingDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="container py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              {t('landing.weddingServices')}
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our comprehensive range of wedding services, each carefully curated for your special day
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[
            { name: t('categories.venues'), icon: '🏰', category: 'VENUE', gradient: 'from-rose-500 to-pink-500' },
            { name: t('categories.photography'), icon: '📸', category: 'PHOTOGRAPHER', gradient: 'from-blue-500 to-indigo-500' },
            { name: t('categories.dresses'), icon: '👗', category: 'DRESS', gradient: 'from-purple-500 to-pink-500' },
            { name: t('categories.makeup'), icon: '💄', category: 'MAKEUP', gradient: 'from-pink-500 to-rose-500' },
            { name: t('categories.catering'), icon: '🍽️', category: 'CATERING', gradient: 'from-orange-500 to-red-500' },
            { name: t('categories.travel'), icon: '✈️', category: 'TRAVEL', gradient: 'from-cyan-500 to-blue-500' },
          ].map((service, index) => (
            <Link
              key={service.category}
              to={`/explore?category=${service.category}`}
              className="group floating-card"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="card-glass p-8 text-center h-full relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                <div className="relative z-10">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                    {service.name}
                  </h3>
                  <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-sm text-primary-600 font-medium">Explore →</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mt-24">
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 relative overflow-hidden">
          <div 
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          ></div>
          
          <div className="container relative z-10">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">Farhatna</span>
              </div>
              
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                {t('landing.footerText')}
              </p>
              
              <div className="border-t border-gray-700 pt-8">
                <p className="text-gray-400 text-sm">
                  © 2025 Farhatna. Made with 💝 for your special day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing