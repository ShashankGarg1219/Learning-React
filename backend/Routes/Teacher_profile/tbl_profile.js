const express = require('express');
const TeacherProRouter = express.Router();

const {show_profile} = require('../../Controller/Teacher_profile/tbl_profile')
const {attach_profile} = require('../../Controller/Teacher_profile/tbl_profile')
const {edit_teaprofile} = require('../../Controller/Teacher_profile/tbl_profile') 

TeacherProRouter.get('/getteaprofile', show_profile)
TeacherProRouter.post('/postteaprofile', attach_profile)
TeacherProRouter.put('/putteaprofile/:teacher_id', edit_teaprofile)


 

module.exports = TeacherProRouter; 