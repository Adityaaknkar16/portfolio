import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: true,
  },
  stack: {
    type: [String],
    required: true,
  },
  highlights: {
    type: [String],
    required: true,
  },
});

export default mongoose.model('Project', projectSchema);
