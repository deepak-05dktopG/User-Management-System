import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.js';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware.js';
import { validateUpdate } from '../middleware/validation.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorizeAdmin);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', upload.single('profile_image'), validateUpdate, updateUser);
router.delete('/:id', deleteUser);

export default router;
