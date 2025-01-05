const express = require('express');
const mongoose = require('mongoose');
const commentRoutes = require('./routes/commentRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

// Database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Comment Service connected to DB"))
  .catch(err => console.error("DB Connection Error:", err));

// Routes
app.use('/comments', commentRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Comment Service running on port ${process.env.PORT}`);
});