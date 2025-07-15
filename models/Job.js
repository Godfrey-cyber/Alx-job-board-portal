import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  company: {
    type: String,
    // required: [true, 'Company name is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
    default: 'Full-time',
  },
  minSalary: {
    type: Number,
    default: 0,
  },
  maxSalary: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
    required: [true, 'Job description is required'],
  },
  requirements: {
    type: [String],
    default: [],
  },
  benefits: {
    type: [String],
    default: [],
  },
  categories: {
    type: [String],
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
  remote: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
  },
  applicationDeadline: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Active', 'Closed'],
    default: 'Active',
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Job must have a creator'],
  },
  isSyncedToElastic: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

const Job = mongoose.model('Job', jobSchema);
export default Job;
