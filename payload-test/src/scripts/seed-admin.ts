import { getPayload } from 'payload'
import config from '../payload.config'

const seedAdmin = async () => {
  const payload = await getPayload({ config })

  try {
    const existingAdmin = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@elurc-market.com',
        },
      },
    })

    if (existingAdmin.docs.length > 0) {
      console.log('✅ Admin user already exists')
      process.exit(0)
    }

    await payload.create({
      collection: 'users',
      data: {
        email: 'admin@elurc-market.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
      },
    })

    console.log('✅ Admin user created successfully')
    console.log('Email: admin@elurc-market.com')
    console.log('Password: admin123')
    console.log('⚠️  Please change the password after first login')
    
    process.exit(0)
  } catch (error) {
    console.error('❌ Error creating admin user:', error)
    process.exit(1)
  }
}

seedAdmin()
