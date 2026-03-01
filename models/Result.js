import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Test',
    },
    answers: [
      {
        questionId: {
          type: String, // Changed to String to prevent Mongoose cast/validation errors if passed as standard string
          required: true,
        },
        selectedAnswer: {
          type: String,
          required: true,
        },
      },
    ],
    score: {
      type: Number,
      required: true,
      default: 0,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model('Result', resultSchema);

export default Result;
