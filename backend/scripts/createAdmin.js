import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
  address: String,
  state: String,
  city: String,
  country: String,
  pincode: String,
  role: String,
  profile_image: String
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

const createAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');
    
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    if (existingAdmin) {
      console.log('\nAdmin user already exists!');
      console.log('Email: admin@example.com');
      console.log('\nIf you forgot the password, delete this user and run the script again.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await User.create({
      name: 'Deepakkumar',
      email: 'admin@gmail.com',
      phone: '1234567890',
      password: hashedPassword,
      address: '123 Admin Street',
      state: 'Tamil Nadu',
      city: 'Erode',
      country: 'India',
      pincode: '638314',
      role: 'admin'
    });

    console.log('\n✓ Admin user created successfully!\n');
    console.log('Login Credentials:');
    console.log('==================');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('\nYou can now login at: http://localhost:5173/login\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
