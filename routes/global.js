var express=require('express');
var app=express();
var router=express.Router();
// const stud = require('../services/user');
// const glb=require('../services/global');

router
// .all('*',glb.checkAuthentication)
// .post('/user/login',user.login)
// .use('/api',glb.checkToken)

.use('/api/student',require('./student'))
.use('/api/teacher',require('./teacher'))
.use('/api/parent',require('./parent'))
.use('/api/attendance',require('./attendance'))
.use('/api/course',require('./course'))
.use('/api/grade',require('./grade'))
.use('/api/classroom',require('./classroom'))
.use('/api/classroomstudent',require('./classroomstudent'))
.use('/api/examtype',require('./examtype'))
.use('/api/exam',require('./exam'))
.use('/api/examresult',require('./examresult'))

module.exports=router;