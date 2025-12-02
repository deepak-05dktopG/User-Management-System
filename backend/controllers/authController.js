import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../config/jwt.js';

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, address, state, city, country, pincode } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.email === email ? 'Email already registered' : 'Phone already registered' 
      });
    }

    // Handle profile image
    const profile_image = req.file ? `/uploads/${req.file.filename}` : null;

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      address,
      state,
      city,
      country,
      pincode,
      profile_image
    });

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profile_image: user.profile_image
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Find user by email or phone
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { phone: identifier }
      ]
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Save refresh token
    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profile_image: user.profile_image
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    // Find user and verify stored refresh token
    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(user._id);

    res.json({
      accessToken: newAccessToken
    });
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired refresh token' });
  }
};

export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
