const express = require('express');
const TeacherRouter = express.Router();

const {view_teacher, add_teacher, edit_teacher, view_teacher_teacher_profile} = require('../../Controller/Teacher/tbl_teacher')



TeacherRouter.get('/getteacher', view_teacher)
TeacherRouter.post('/postteacher', add_teacher)
TeacherRouter.put('/updateteacher/:teacher_id', edit_teacher)
TeacherRouter.get('/viewteacherprofile/:teacher_id', view_teacher_teacher_profile)

 

module.exports = TeacherRouter; 