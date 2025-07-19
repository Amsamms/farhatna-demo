import { createContext, useContext, useState, useEffect } from 'react'
import { en } from '../locales/en'
import { ar } from '../locales/ar'

const LanguageContext = createContext()

const translations = {
  en,
  ar
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  const [isRTL, setIsRTL] = useState(language === 'ar')

  useEffect(() => {
    localStorage.setItem('language', language)
    setIsRTL(language === 'ar')
    
    // Set document direction and language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = language
    
    // Update body class for RTL styling
    if (language === 'ar') {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
  }, [language])

  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const value = {
    language,
    isRTL,
    switchLanguage,
    t
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext