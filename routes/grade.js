const express = require('express');
const router = express.Router();
const gr = require('../services/grade');

router

.post('/get',gr.get)
.post('/create',gr.createValidate(),gr.create)
.put('/update',gr.updateValidate(),gr.update)
// .put('/changepassword',user.passwordValidate(),user.changePassword)
// .post('/forgotpassword',user.forgotPassword)

module.exports = router;