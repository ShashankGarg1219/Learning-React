const express = require('express');
const EmpRouter = express.Router();

const {view_emp_emp_profile, employeeLogin, verifyToken, verifyUser} = require('../../Controller/Employee/tbl_emp');
const {view_emp} = require('../../Controller/Employee/tbl_emp');
const {register_emp} = require('../../Controller/Employee/tbl_emp');
const {edit_emp} = require('../../Controller/Employee/tbl_emp');
const { delete_emp } = require('../../Controller/Employee/tbl_emp');




EmpRouter.get('/getemp', view_emp )
EmpRouter.post('/postemp', register_emp)
EmpRouter.put('/updateemp/:emp_id', edit_emp)
EmpRouter.delete('/deleteemp/:emp_id', delete_emp)
EmpRouter.get('/viewempprofile/:emp_id', view_emp_emp_profile)
EmpRouter.post('/emplogin',employeeLogin )
EmpRouter.get('/verifytoken',verifyToken, verifyUser)

module.exports = EmpRouter; 