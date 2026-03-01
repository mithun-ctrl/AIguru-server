import Test from '../models/Test.js';

export const createTest = async (req, res) => {
  const { title, topic, questions } = req.body;
  try {
    const test = new Test({
      title,
      topic,
      questions,
      createdBy: req.user._id,
    });
    const createdTest = await test.save();
    res.status(201).json(createdTest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find({}).populate('createdBy', 'name email');
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('createdBy', 'name email');
    if (test) {
      res.json(test);
    } else {
      res.status(404).json({ message: 'Test not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (test) {
      // Allow only the creator to delete the test
      if (test.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this test' });
      }
      await Test.deleteOne({ _id: test._id });
      res.json({ message: 'Test removed' });
    } else {
      res.status(404).json({ message: 'Test not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
