const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/s202045860', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define schemas
const questionSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  createdAt: Date,
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
  answered: Boolean,
  author: {
    id: Number,
    username: String
  }
});

const answerSchema = new mongoose.Schema({
  text: String,
  addedAt: { type: Date, default: Date.now },
  answeredBy: String,
  votes: { type: Number, default: 0 },
  accepted: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  // Define user schema fields here
});

// Create models
const Question = mongoose.model('Question', questionSchema);
const Answer = mongoose.model('Answer', answerSchema);
const User = mongoose.model('User', userSchema);

// Export models
module.exports = { Question, Answer, User };
