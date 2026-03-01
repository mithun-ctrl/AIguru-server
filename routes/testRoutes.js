import express from 'express';
import { createTest, getAllTests, getTestById, deleteTest } from '../controllers/testController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRole('teacher'), createTest)
  .get(protect, getAllTests);

router.route('/:id')
  .get(protect, getTestById)
  .delete(protect, authorizeRole('teacher'), deleteTest);

export default router;
