// routers/questions.js
const express = require('express');
const router = express.Router();
const { getAllQuestions, createQuestion, getQuestionById, addAnswer } = require('C:\Users\mhaah\Desktop\semester 232\SWE 363\Common HWs\HW1\BackEnd\controllers\question_controller.js');

router.get('/', async (req, res) => {
  const questions = await getAllQuestions();
  res.json(questions);
});

router.post('/', async (req, res) => {
  const question = await createQuestion(req.body);
  res.json(question);
});

router.get('/:id', async (req, res) => {
  const question = await getQuestionById(req.params.id);
  res.render('question.njk', { question });
});

router.post('/:id', async (req, res) => {
  await addAnswer(req.params.id, req.body);
  res.redirect(`/questions/${req.params.id}`);
});

module.exports = router;
