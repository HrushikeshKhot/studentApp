const express = require('express');
const router = express.Router();
const exr = require('../services/examresult');

router

.post('/get',exr.get)
.post('/create',exr.createValidate(),exr.create)
.put('/update',exr.updateValidate(),exr.update)

// .put('/changepassword',user.passwordValidate(),user.changePassword)
// .post('/forgotpassword',user.forgotPassword)

module.exports = router;