const express = require('express');
const router = express.Router();
const ex = require('../services/exam');

router

.post('/get',ex.get)
.post('/create',ex.createValidate(),ex.create)
.put('/update',ex.updateValidate(),ex.update)
// .put('/changepassword',user.passwordValidate(),user.changePassword)
// .post('/forgotpassword',user.forgotPassword)

module.exports = router;