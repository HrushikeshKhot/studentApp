const express = require('express');
const router = express.Router();
const cls = require('../services/classroomstudent');

router

.post('/get',cls.get)
.post('/create',cls.createValidate(),cls.create)
.put('/update',cls.updateValidate(),cls.update)
// .put('/changepassword',user.passwordValidate(),user.changePassword)
// .post('/forgotpassword',user.forgotPassword)

module.exports = router;