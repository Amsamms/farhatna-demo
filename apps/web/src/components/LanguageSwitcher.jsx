import { useState } from 'react'
import { Globe, ChevronDown } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇪🇬' }
  ]

  const currentLanguage = languages.find(lang => lang.code === language)

  const handleLanguageChange = (langCode) => {
    switchLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2.5 bg-white/70 backdrop-blur-md border border-white/20 text-gray-700 hover:text-primary-600 hover:bg-white/90 transition-all duration-200 rounded-xl shadow-soft hover:shadow-card transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-200"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="text-sm font-semibold">{currentLanguage?.nativeName}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 bg-white/90 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl z-20 min-w-[160px] overflow-hidden animate-scale-in">
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-5 py-3 text-left text-sm transition-all duration-200 hover:bg-primary-50 ${
                  language === lang.code 
                    ? 'bg-gradient-to-r from-primary-50 to-secondary-50 text-primary-700 font-semibold border-l-4 border-primary-500' 
                    : 'text-gray-700 hover:text-primary-600'
                }`}
                style={{animationDelay: `${index * 0.05}s`}}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.nativeName}</span>
                  </div>
                  {language === lang.code && (
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default LanguageSwitcher