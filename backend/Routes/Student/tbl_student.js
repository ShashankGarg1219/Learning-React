const express = require('express');
const StudentRouter = express.Router();

const {view_student} = require('../../Controller/Student/tbl_student')
const {add_student} = require('../../Controller/Student/tbl_student')
const {edit_student} = require('../../Controller/Student/tbl_student')
const {view_stu_stu_profile} = require('../../Controller/Student/tbl_student')

StudentRouter.get('/getstudent', view_student)
StudentRouter.post('/poststudent', add_student)
StudentRouter.put('/updatestudent/:stu_id', edit_student)
StudentRouter.get('/viewstuprofile/:stu_id', view_stu_stu_profile)
 

module.exports = StudentRouter; 