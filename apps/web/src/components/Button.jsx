import classNames from 'classnames'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-offset-2 active:scale-95 disabled:transform-none'
  
  const variants = {
    primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-primary-200 border border-primary-500/20',
    secondary: 'bg-gradient-to-r from-secondary-600 to-secondary-500 text-white hover:from-secondary-700 hover:to-secondary-600 shadow-lg hover:shadow-xl transform hover:scale-105 focus:ring-secondary-200 border border-secondary-500/20',
    outline: 'border-2 border-primary-500 text-primary-600 hover:bg-gradient-to-r hover:from-primary-500 hover:to-primary-600 hover:text-white hover:border-primary-600 transform hover:scale-105 focus:ring-primary-200 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg',
    ghost: 'text-primary-600 hover:bg-primary-50 hover:text-primary-700 focus:ring-primary-200 backdrop-blur-sm transform hover:scale-105',
    glass: 'bg-white/70 backdrop-blur-md border border-white/20 text-gray-700 hover:bg-white/90 shadow-soft hover:shadow-card transform hover:scale-105 focus:ring-primary-200',
  }
  
  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
    xl: 'px-10 py-4 text-xl',
  }
  
  const classes = classNames(
    baseClasses,
    variants[variant],
    sizes[size],
    {
      'opacity-50 cursor-not-allowed hover:scale-100': disabled || loading,
    },
    className
  )
  
  return (
    <button
      className={classes}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  )
}

export default Button