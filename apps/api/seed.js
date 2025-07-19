import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')
  
  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@farhatna.com' },
    update: {},
    create: {
      email: 'admin@farhatna.com',
      name: 'Admin User',
      password: adminPassword,
      role: 'ADMIN'
    }
  })
  
  // Create customer user
  const customerPassword = await bcrypt.hash('customer123', 10)
  const customer = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'Sarah Ahmed',
      password: customerPassword,
      role: 'CUSTOMER'
    }
  })
  
  // Create suppliers
  const suppliers = [
    {
      companyName: 'Royal Palace Hotel',
      category: 'VENUE',
      location: 'Cairo, Egypt',
      description: 'Luxurious wedding venue with stunning ballrooms and gardens. Perfect for grand celebrations.',
      priceFrom: 50000,
      priceTo: 150000,
      thumbnail: 'https://images.unsplash.com/photo-1519167758481-83f29d8ae8e1?w=400'
    },
    {
      companyName: 'Golden Memories Photography',
      category: 'PHOTOGRAPHER',
      location: 'Alexandria, Egypt',
      description: 'Professional wedding photography capturing your most precious moments with artistic flair.',
      priceFrom: 8000,
      priceTo: 25000,
      thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400'
    },
    {
      companyName: 'Elegance Bridal Boutique',
      category: 'DRESS',
      location: 'Cairo, Egypt',
      description: 'Designer wedding dresses and formal wear. Custom tailoring available.',
      priceFrom: 15000,
      priceTo: 80000,
      thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0812ba3da6e?w=400'
    },
    {
      companyName: 'Glamour Beauty Studio',
      category: 'MAKEUP',
      location: 'Giza, Egypt',
      description: 'Professional bridal makeup and hairstyling services. Trial sessions available.',
      priceFrom: 3000,
      priceTo: 12000,
      thumbnail: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400'
    },
    {
      companyName: 'Delicious Catering Co.',
      category: 'CATERING',
      location: 'Cairo, Egypt',
      description: 'Exquisite catering services with traditional and international cuisine options.',
      priceFrom: 20000,
      priceTo: 100000,
      thumbnail: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400'
    },
    {
      companyName: 'Paradise Travel Agency',
      category: 'TRAVEL',
      location: 'Hurghada, Egypt',
      description: 'Honeymoon packages and destination wedding planning. Exotic locations worldwide.',
      priceFrom: 30000,
      priceTo: 200000,
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'
    },
    {
      companyName: 'Nile View Gardens',
      category: 'VENUE',
      location: 'Luxor, Egypt',
      description: 'Outdoor wedding venue with breathtaking Nile views. Garden ceremonies and receptions.',
      priceFrom: 30000,
      priceTo: 80000,
      thumbnail: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400'
    },
    {
      companyName: 'Studio Light Photography',
      category: 'PHOTOGRAPHER',
      location: 'Cairo, Egypt',
      description: 'Modern wedding photography with creative lighting and contemporary style.',
      priceFrom: 12000,
      priceTo: 35000,
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400'
    },
    {
      companyName: 'Royal Feast Catering',
      category: 'CATERING',
      location: 'Alexandria, Egypt',
      description: 'Premium catering services specializing in Mediterranean and Middle Eastern cuisine.',
      priceFrom: 25000,
      priceTo: 120000,
      thumbnail: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400'
    },
    {
      companyName: 'Red Sea Destinations',
      category: 'TRAVEL',
      location: 'Sharm El Sheikh, Egypt',
      description: 'Luxury honeymoon and destination wedding packages in beautiful Red Sea resorts.',
      priceFrom: 40000,
      priceTo: 250000,
      thumbnail: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400'
    }
  ]
  
  for (const supplier of suppliers) {
    await prisma.supplier.create({
      data: supplier
    })
  }
  
  console.log('✅ Database seeded successfully!')
  console.log(`👤 Admin: admin@farhatna.com / admin123`)
  console.log(`👤 Customer: customer@example.com / customer123`)
  console.log(`🏢 Created ${suppliers.length} suppliers`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })