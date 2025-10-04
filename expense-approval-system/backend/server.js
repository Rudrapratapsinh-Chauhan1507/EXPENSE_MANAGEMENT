const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/expense-management', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(bodyParser.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/expenses', require('./routes/expenses'));
app.use('/api/approvals', require('./routes/approvals'));
app.use('/api/approval-rules', require('./routes/rules'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
