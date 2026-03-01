import Result from '../models/Result.js';
import Test from '../models/Test.js';

export const submitTest = async (req, res) => {
  const { testId, answers } = req.body;
  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Calculate score automatically
    let score = 0;
    if (answers && Array.isArray(answers)) {
      answers.forEach((studentAnswer) => {
        if (!studentAnswer || !studentAnswer.questionId) return;
        
        const question = test.questions.find((q) => q._id && q._id.toString() === studentAnswer.questionId.toString());
        if (question && question.correctAnswer === studentAnswer.selectedAnswer) {
          score += 1;
        }
      });
    }

    const result = new Result({
      studentId: req.user._id,
      testId,
      answers,
      score,
    });

    const savedResult = await result.save();
    res.status(201).json(savedResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStudentResults = async (req, res) => {
  try {
    const results = await Result.find({ studentId: req.user._id }).populate('testId', 'title topic');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTestResultsForTeacher = async (req, res) => {
  const { testId } = req.params;
  try {
    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (test.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view results for this test' });
    }

    const results = await Result.find({ testId }).populate('studentId', 'name email');
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
