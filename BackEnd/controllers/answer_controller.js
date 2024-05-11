// answers_controller.js
const { Answer, Question } = require('C:\Users\mhaah\Desktop\semester 232\SWE 363\Common HWs\HW1\BackEnd\models\db_schema.js');

const updateAnswer = async (answerId, method, questionId) => {
  const answer = await Answer.findById(answerId);
  const question = await Question.findById(questionId);

  if (method === 'upvote') {
    answer.votes += 1;
  } else if (method === 'downvote') {
    answer.votes -= 1;
  } else if (method === 'accept') {
    answer.accepted = true;
    question.answered = true;
    await question.save();
  }

  return await answer.save();
};

module.exports = { updateAnswer };
