const express = require('express');
const multer = require('multer');
const router = express.Router();
const { registerUser, loginUser, createUser, updateUser, getUserByAccountId, updateUserByAccountId} = require('../controllers/UserController');

const upload = multer();

router.post('/login', loginUser);
router.post('/register', upload.none(), registerUser);
router.get('/user/:accountId', getUserByAccountId);
router.put('/user/:accountId', updateUserByAccountId);


module.exports = router;
