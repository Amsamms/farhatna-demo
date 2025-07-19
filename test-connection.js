import { PrismaClient } from '@prisma/client'

// Test connection with Supabase
const DATABASE_URL = "postgresql://postgres.wxbrkcefadvkwkjexpkz:[YOUR-PASSWORD]@aws-0-eu-central-1.pooler.supabase.com:5432/postgres"

console.log('Testing Supabase connection...')
console.log('Project ID: wxbrkcefadvkwkjexpkz')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || DATABASE_URL
    }
  }
})

async function testConnection() {
  try {
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT NOW() as current_time`
    console.log('✅ Database connection successful:', result)
    
    // Test suppliers count
    const supplierCount = await prisma.supplier.count()
    console.log(`✅ Found ${supplierCount} suppliers in database`)
    
    // Test users count  
    const userCount = await prisma.user.count()
    console.log(`✅ Found ${userCount} users in database`)
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()