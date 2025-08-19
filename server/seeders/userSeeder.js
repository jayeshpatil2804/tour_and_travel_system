import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import connectDB from '../config/db.js';

// Load environment variables
dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@travelnest.com',
    password: 'admin123',
    role: 'admin',
    status: 'active'
  },
  {
    name: 'Demo User',
    email: 'user@travelnest.com',
    password: 'user123',
    role: 'user',
    status: 'active'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'user',
    status: 'active'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    status: 'active'
  },
  {
    name: 'Jayesh Patil',
    email: 'jayeshpatil0244@gmail.com',
    password: 'password123',
    role: 'user',
    status: 'active'
  }
];

const seedUsers = async () => {
  try {
    console.log('🌱 Starting user seeding...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing users (optional - comment out if you want to keep existing users)
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');
    
    // Create users
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Successfully created ${createdUsers.length} users:`);
    
    createdUsers.forEach(user => {
      console.log(`   - ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    console.log('\n🎉 User seeding completed successfully!');
    console.log('\n📋 Demo Credentials:');
    console.log('   Admin: admin@travelnest.com / admin123');
    console.log('   User:  user@travelnest.com / user123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

const destroyUsers = async () => {
  try {
    console.log('🗑️  Starting user cleanup...');
    
    // Connect to database
    await connectDB();
    
    // Clear all users
    await User.deleteMany({});
    console.log('✅ All users removed successfully!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error destroying users:', error);
    process.exit(1);
  }
};

// Check command line arguments
if (process.argv[2] === '--destroy') {
  destroyUsers();
} else {
  seedUsers();
}
