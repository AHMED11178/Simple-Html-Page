// routers/answers.js
const express = require('express');
const router = express.Router();
const { updateAnswer } = require('C:\Users\mhaah\Desktop\semester 232\SWE 363\Common HWs\HW1\BackEnd\controllers\answer_controller.js');

router.get('/:answerId', async (req, res) => {
  const { method, questionId } = req.query;
  await updateAnswer(req.params.answerId, method, questionId);
  res.redirect(`/questions/${questionId}`);
});

module.exports = router;
