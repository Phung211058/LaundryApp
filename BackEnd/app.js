const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/UserRoute');
const multer = require('multer');
const upload = multer(); // Để lưu trữ trong bộ nhớ tạm thời


const app = express();
app.use(upload.none()); // Sử dụng nếu không lưu trữ file
// Sử dụng middleware
app.use(bodyParser.json()); // Để xử lý JSON từ frontend
app.use(bodyParser.urlencoded({ extended: true })); // Để xử lý URL-encoded dữ liệu
app.use(upload.none()); // Sử dụng multer để xử lý multipart/form-data nhưng không lưu trữ file

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://phungnmgbh211058:phung2k3@laundry.3zlka.mongodb.net/LaundryApp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api', userRoutes);
app.get('/api', (req, res) => {
  res.send('Hello, World!');
});

app.listen(process.env.PORT || 3001);
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;
