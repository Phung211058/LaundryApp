const express = require('express');
const multer = require('multer');
const router = express.Router();
const { registerUser, loginUser, createUser, updateUser, getUser, deleteUser } = require('../controllers/UserController');

const upload = multer();

router.post('/login', loginUser);
router.post('/register', upload.none(), registerUser);


module.exports = router;
