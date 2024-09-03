const express = require('express');
const EmpProfileRouter = express.Router();

const {view_profile} = require('../../Controller/Employee_profile/tbl_emp_profile');
const {add_profile} = require('../../Controller/Employee_profile/tbl_emp_profile')
const {edit_profile} = require('../../Controller/Employee_profile/tbl_emp_profile')




EmpProfileRouter.get('/getempprofile', view_profile )
EmpProfileRouter.post('/postempprofile', add_profile)
EmpProfileRouter.put('/updateempprofile/:emp_id', edit_profile)



module.exports = EmpProfileRouter; 