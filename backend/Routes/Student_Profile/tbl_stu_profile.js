const express = require('express');
const StuProfileRouter = express.Router();

const {view_profile} = require('../../Controller/Student_Profile/tbl_stu_profile')
const {add_profile} = require('../../Controller/Student_Profile/tbl_stu_profile')
const {edit_stuprofile} = require('../../Controller/Student_Profile/tbl_stu_profile')



StuProfileRouter.get('/getprofile', view_profile)
StuProfileRouter.post('/postprofile', add_profile)
StuProfileRouter.put('/editprofile/:stu_id', edit_stuprofile)

 

module.exports = StuProfileRouter; 