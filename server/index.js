// Loading environmental variables
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth');

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// ============= ROUTES =============
app.use('/api/auth', authRoutes);
// ============= ROUTES =============

app.use((req, res, next) => {
  // 404 error
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
})

// Use error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
})
