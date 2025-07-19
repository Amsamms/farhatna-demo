import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const fastify = Fastify({ 
  logger: true 
})

const prisma = new PrismaClient()

await fastify.register(cors, {
  origin: [
    'http://localhost:5173', 
    'http://localhost:3000',
    process.env.FRONTEND_URL || 'https://your-app.railway.app'
  ],
  credentials: true
})

await fastify.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-secret-key-here-change-in-production'
})

fastify.decorate('authenticate', async function (request, reply) {
  try {
    await request.jwtVerify()
  } catch (err) {
    reply.send(err)
  }
})

// Auth routes
fastify.post('/auth/register', async (request, reply) => {
  const { name, email, password, role = 'CUSTOMER' } = request.body
  
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if (existingUser) {
      return reply.status(400).send({ error: 'User already exists' })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role
      }
    })
    
    const token = fastify.jwt.sign({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    })
    
    reply.send({ 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }, 
      token 
    })
  } catch (error) {
    reply.status(500).send({ error: 'Registration failed' })
  }
})

fastify.post('/auth/login', async (request, reply) => {
  const { email, password } = request.body
  
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    
    if (!user) {
      return reply.status(401).send({ error: 'Invalid credentials' })
    }
    
    const validPassword = await bcrypt.compare(password, user.password)
    
    if (!validPassword) {
      return reply.status(401).send({ error: 'Invalid credentials' })
    }
    
    const token = fastify.jwt.sign({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    })
    
    reply.send({ 
      user: { id: user.id, name: user.name, email: user.email, role: user.role }, 
      token 
    })
  } catch (error) {
    reply.status(500).send({ error: 'Login failed' })
  }
})

// Supplier routes
fastify.get('/suppliers', async (request, reply) => {
  const { category } = request.query
  
  try {
    const suppliers = await prisma.supplier.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: 'desc' }
    })
    
    reply.send(suppliers)
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch suppliers' })
  }
})

fastify.get('/suppliers/:id', async (request, reply) => {
  const { id } = request.params
  
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: parseInt(id) }
    })
    
    if (!supplier) {
      return reply.status(404).send({ error: 'Supplier not found' })
    }
    
    reply.send(supplier)
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch supplier' })
  }
})

// Booking routes
fastify.post('/bookings', {
  preHandler: [fastify.authenticate]
}, async (request, reply) => {
  const { supplierId, eventDate } = request.body
  const userId = request.user.id
  
  try {
    const booking = await prisma.booking.create({
      data: {
        userId,
        supplierId,
        eventDate: new Date(eventDate)
      },
      include: {
        supplier: true,
        user: {
          select: { id: true, name: true, email: true }
        }
      }
    })
    
    reply.send(booking)
  } catch (error) {
    reply.status(500).send({ error: 'Failed to create booking' })
  }
})

fastify.get('/bookings/me', {
  preHandler: [fastify.authenticate]
}, async (request, reply) => {
  const userId = request.user.id
  
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        supplier: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    reply.send(bookings)
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch bookings' })
  }
})

// Admin routes
fastify.get('/admin/bookings', {
  preHandler: [fastify.authenticate]
}, async (request, reply) => {
  if (request.user.role !== 'ADMIN') {
    return reply.status(403).send({ error: 'Admin access required' })
  }
  
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        supplier: true
      },
      orderBy: { createdAt: 'desc' }
    })
    
    reply.send(bookings)
  } catch (error) {
    reply.status(500).send({ error: 'Failed to fetch bookings' })
  }
})

fastify.patch('/admin/bookings/:id', {
  preHandler: [fastify.authenticate]
}, async (request, reply) => {
  if (request.user.role !== 'ADMIN') {
    return reply.status(403).send({ error: 'Admin access required' })
  }
  
  const { id } = request.params
  const { status } = request.body
  
  try {
    const booking = await prisma.booking.update({
      where: { id: parseInt(id) },
      data: { status },
      include: {
        user: {
          select: { id: true, name: true, email: true }
        },
        supplier: true
      }
    })
    
    reply.send(booking)
  } catch (error) {
    reply.status(500).send({ error: 'Failed to update booking' })
  }
})

// Health check
fastify.get('/health', async (request, reply) => {
  reply.send({ status: 'OK', timestamp: new Date().toISOString() })
})

// Start server
const start = async () => {
  try {
    const port = process.env.PORT || 5000
    await fastify.listen({ port: port, host: '0.0.0.0' })
    console.log(`Server running on port ${port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()