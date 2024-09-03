const express = require('express');
const cors = require('cors')

const app = express()
app.use(express.json());

app.use(cors({
    origin:['http://localhost:3000'],
    methods:['POST','GET','DELETE','PUT'],
    credentials:true
}))


const cookieParser = require('cookie-parser');
app.use(cookieParser());


const RoleRouter = require('./Routes/Role_Route/tbl_role_route')
app.use('/',RoleRouter)


const EmpRouter = require('./Routes/Emp_Route/tbl_emp_route')
app.use('/',EmpRouter)

const EmpProfileRouter = require('./Routes/Emp_profile_Route/tbl_emp_profile')
app.use('/', EmpProfileRouter)

const StudentRouter = require('./Routes/Student/tbl_student')
app.use('/', StudentRouter)

const StuProfileRouter = require('./Routes/Student_Profile/tbl_stu_profile')
app.use('/', StuProfileRouter)

const CourseRouter = require('./Routes/Course_Route/tbl_course_route')
app.use('/', CourseRouter)

const RoleAssignRouter = require('./Routes/Role_Assign/tbl_role_assign')
app.use('/', RoleAssignRouter)

const TeacherRouter = require('./Routes/Teacher/tbl_teacher')
app.use('/', TeacherRouter)

const TeacherProRouter = require('./Routes/Teacher_profile/tbl_profile')
app.use('/', TeacherProRouter)

const BatchRouter = require('./Routes/Batch/tbl_batch')
app.use('/', BatchRouter)

const PurchaseRouter = require('./Routes/Batch_purchase/tbl_batch_purchase')
app.use('/', PurchaseRouter)


app.listen(5004, ()=>{
    console.log(`Server is running on `)
})