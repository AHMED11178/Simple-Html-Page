const express = require('express');
const nunjucks = require('nunjucks');
const cors = require('cors');
const bodyParser = require('body-parser');
const questionsRouter = require('C:\Users\mhaah\Desktop\semester 232\SWE 363\Common HWs\HW1\BackEnd\routes\questions.js');
const answersRouter = require('C:\Users\mhaah\Desktop\semester 232\SWE 363\Common HWs\HW1\BackEnd\routes\answer_router.js');

// Create an Express app
const app = express();

// Use CORS middleware
app.use(cors());

// Set up Nunjucks
nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// Serve static files from the "public" directory
app.use(express.static('public'));

// Parse JSON and URL-encoded forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Render the index template for GET /
app.get('/', (req, res) => {
  res.render('index.njk');
});

// Use the answers router for any request to '/answer'
app.use('/answer', answersRouter);

// Use the questions router for requests to '/questions'
app.use('/questions', questionsRouter);

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
