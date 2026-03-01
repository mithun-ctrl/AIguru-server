import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  correctAnswer: {
    type: String,
    required: true,
  },
});

const testSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

const Test = mongoose.model('Test', testSchema);

export default Test;
