const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://farhatna-api.onrender.com'

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

const api = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const token = localStorage.getItem('auth-storage') 
      ? JSON.parse(localStorage.getItem('auth-storage')).state?.token 
      : null

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }))
      throw new ApiError(errorData.error || 'Request failed', response.status)
    }

    return response.json()
  },

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: userData,
    })
  },

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: credentials,
    })
  },

  // Supplier endpoints
  async getSuppliers(category = null) {
    const query = category ? `?category=${category}` : ''
    return this.request(`/suppliers${query}`)
  },

  async getSupplier(id) {
    return this.request(`/suppliers/${id}`)
  },

  // Booking endpoints
  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: bookingData,
    })
  },

  async getMyBookings() {
    return this.request('/bookings/me')
  },

  // Admin endpoints
  async getAdminBookings() {
    return this.request('/admin/bookings')
  },

  async updateBookingStatus(id, status) {
    return this.request(`/admin/bookings/${id}`, {
      method: 'PATCH',
      body: { status },
    })
  },
}

export default api
export { ApiError }