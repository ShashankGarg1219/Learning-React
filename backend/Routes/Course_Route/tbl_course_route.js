const express = require('express');
const CourseRouter = express.Router();

const {view_course} = require('../../Controller/Course/tbl_course');
const {register_course} = require('../../Controller/Course/tbl_course');
const {edit_course} = require('../../Controller/Course/tbl_course');



CourseRouter.get('/getcourse', view_course )
CourseRouter.post('/postcourse', register_course)
CourseRouter.put('/updatecourse/:course_id', edit_course)



module.exports = CourseRouter; 