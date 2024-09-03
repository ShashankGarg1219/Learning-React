const express = require('express');
const RoleAssignRouter = express.Router();

const {view_assign, view_emp_role_assign} = require('../../Controller/Role_Assign/tbl_role_assign')
const {post_assign} = require('../../Controller/Role_Assign/tbl_role_assign')
const {edit_assign} = require('../../Controller/Role_Assign/tbl_role_assign')


RoleAssignRouter.get('/getassign', view_assign)
RoleAssignRouter.post('/addassign', post_assign)
RoleAssignRouter.put('/updateassign/:emp_id', edit_assign)
RoleAssignRouter.get('/view_emp_role_assign', view_emp_role_assign)

 

module.exports = RoleAssignRouter; 