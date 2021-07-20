const express = require('express');
const router = express.Router();
const co = require('../services/course');

router

.post('/get',co.get)
.post('/create',co.createValidate(),co.create)
.put('/update',co.updateValidate(),co.update)
// .put('/changepassword',user.passwordValidate(),user.changePassword)
// .post('/forgotpassword',user.forgotPassword)

module.exports = router;