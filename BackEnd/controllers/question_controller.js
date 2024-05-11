// questions_controller.js
const { Question, Answer } = require('C:\Users\mhaah\Desktop\semester 232\SWE 363\Common HWs\HW1\BackEnd\models\db_schema.js');

const getAllQuestions = async () => {
  return await Question.find({});
};

const createQuestion = async (questionData) => {
  const question = new Question(questionData);
  return await question.save();
};

const getQuestionById = async (questionId) => {
  return await Question.findById(questionId);
};

const addAnswer = async (questionId, answerData) => {
  const answer = new Answer(answerData);
  await answer.save();

  const question = await Question.findById(questionId);
  question.answers.push(answer);
  return await question.save();
};

module.exports = { getAllQuestions, createQuestion, getQuestionById, addAnswer };
