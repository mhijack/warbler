const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// ============= ROUTES =============

app.use(function(req, res, next) {
  
})

console.log('haha')
console.log(app);