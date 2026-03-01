import express from 'express';
import { submitTest, getStudentResults, getTestResultsForTeacher } from '../controllers/resultController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/submit', protect, authorizeRole('student'), submitTest);
router.get('/student', protect, authorizeRole('student'), getStudentResults);
router.get('/test/:testId', protect, authorizeRole('teacher'), getTestResultsForTeacher);

export default router;
