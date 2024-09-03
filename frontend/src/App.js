import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Sidebar from './Components/Sidebar';
import Employee from './Components/Employee/Employee';
import Course from './Components/Courses/Course';
import Student from './Components/Student/Student';
import Role from './Components/Role/Role';
import Teacher from './Components/Teacher/Teacher';
import AddEmployee from './Components/Employee/AddEmployee';
import Batch from './Components/Batch/Batch';
import Batch_Purchase from './Components/Batch_Purchase/Batch_Purchase'
import EditRole from './Components/Role/EditRole';
import EditCourse from './Components/Courses/EditCourse';
import AddBatch from './Components/Batch/AddBatch';
import AddPurchase from './Components/Batch_Purchase/AddPurchase';
import AddProfile from './Components/Employee/AddProfile';
import AddStudent from './Components/Student/AddStudent';
import AddTeacher from './Components/Teacher/AddTeacher';
import EditProfile from './Components/Employee/EditProfile';
import ViewProfile from './Components/Employee/ViewProfile';
import AddsProfile from './Components/Student/AddsProfile';
import EditsProfile from './Components/Student/EditsProfile';
import ViewsProfile from './Components/Student/ViewsProfile';
import ViewingProfile from './Components/Teacher/ViewingProfile';
import AddingProfile from './Components/Teacher/AddingProfile';
import EditingProfile from './Components/Teacher/EditingProfile';


function App() {
  return (
    <div>
      <BrowserRouter>
        {/* <Sidebar/> */}
        <Routes>
          {/* <Route path="/login" element={<L}></Route> */}
          <Route path="/" element={<Sidebar/>} >
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/employee" element={<Employee/>}></Route>
          <Route path="/Course" element={<Course/>}></Route>
          <Route path="/student" element={<Student/>}></Route>
          <Route path="/role" element={<Role/>}></Route>
          <Route path="/teacher" element={<Teacher/>}></Route>
          <Route path="/addemployee" element={<AddEmployee/>}></Route>
          <Route path="/editcourse" element={<EditCourse/>}></Route>
          <Route path="/batch" element={<Batch/>}></Route>
          <Route path="/batch_purchase" element={<Batch_Purchase/>}></Route>
          <Route path="/editrole/:role_name" element={<EditRole/>}></Route>
          <Route path="addbatch" element={<AddBatch/>}></Route>
          <Route path="addpurchase" element={<AddPurchase/>}></Route>
          <Route path="addprofile" element={<AddProfile/>}></Route>
          <Route path="addstudent" element={<AddStudent/>}></Route>
          <Route path="addteacher" element={<AddTeacher/>}></Route>
          <Route path="editprofile" element={<EditProfile/>}></Route>
          <Route path="viewprofile/:emp_id" element={<ViewProfile/>}></Route>
          <Route path="/addsprofile" element={<AddsProfile/>}></Route>
          <Route path="/viewsprofile/:stu_id" element={<ViewsProfile/>}></Route>
          <Route path="/editsprofile/:stu_id" element={<EditsProfile/>}></Route>
          <Route path="/addingprofile" element={<AddingProfile/>}></Route>
          <Route path="/editingprofile/:teacher_id" element={<EditingProfile/>}></Route>
          <Route path="/viewingprofile/:teacher_id" element={<ViewingProfile/>}></Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;