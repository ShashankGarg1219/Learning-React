import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Input } from "@mui/material";
import { Link } from "react-router-dom";
// import { AiFillEdit } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from 'react-icons/fa';
import { CgProfile } from "react-icons/cg";
import { AiOutlineEye } from "react-icons/ai";
import './employee.css';

function Employee() {
  const [filteredData, setFilteredData] = useState([]);
  const [item, setItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view_role, setView_role] = useState([]);
  const [emp_role, setEmp_role] = useState([]);

  const ViewEmp = () => {
    axios.get("http://localhost:5004/getemp")
      .then((res) => {
        setItem(res.data);
        setFilteredData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  };

  useEffect(() => {
    ViewEmp();
    get_role ()
    get_emp_role_assign()
  }, []);

  //////////////////Role Assign//////////////////////
  // View Role////////////////////////////
  const get_role = () => {
    axios.get("http://localhost:5004/getdata")
    .then ((res) =>{
      console.log(res.data)
      setView_role(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }
  /////////////////////Get Role Assign///////////////////////////
  const get_emp_role_assign = () => {
    axios.get ("http://localhost:5004/view_emp_role_assign")
    .then ((res) =>{
      console.log(res.data.rows)
      setEmp_role(res.data.rows)
    })
    .catch((error) =>{
      console.log(error)
    })
  }
 /////////////////////////post role/////////////////////////

 const handleRoleChange = (emp_id, role_id) =>{
  console.log(emp_id,role_id);
  const updaterole = {emp_id:emp_id, role_id:role_id}

  axios.post("http://localhost:5004/addassign", updaterole)
  .then ((res)=>{
    console.log(res.data)
    get_emp_role_assign()

  })
  .catch((error)=>{
    console.log(error)
  })
 }

 //////////////////////////////////////////////////////////////

  const columns = [
    { name: "Emp_Id", selector: (row) => row.emp_id },
    { name: "Emp_Name", selector: (row) => row.emp_name },
    { name: "Email", selector: (row) => row.email },
    // { name: "Password", selector: (row) => row.password },
    // { name: "Mobile", selector: (row) => row.mobile },
    // { name: "Address", selector: (row) => row.address },
    // { name: "Date_Of_Join", selector: (row) => row.date_of_join },
    { name: "Gender", selector: (row) => row.gender },
    //{ name: "Status", selector: (row) => row.status },
    { name: "Role", cell: (row) => {
      const roleNames = [];
      emp_role.forEach((item) =>{
        if ( row.emp_id=== item.emp_id) {
          roleNames.push(item.role_name)
        }

      });
      return (
        <>
        {
          roleNames.map((role, index)=>(
            <span key={index}>
              {role}
              {index !== roleNames.length - 1&& ","}
            </span>
          ))}
         </>
      );
    },
  },
    
    {
      name: 'Action',
      cell: row => (
        <div>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => handleEdit(row)}
          >
            <AiFillEdit style={{ fontSize: "20px", cursor: "pointer" }} />
          </Button>
        
        </div>
      ),
    },
    {
      name: "Profile",
      cell: row => (
        <div>
           <Link to={`/viewprofile/${row.emp_id}`}>
            <Button variant="outline-primary" size="sm">
              <CgProfile style={{ fontSize: "20px", cursor: "pointer" }} />
            </Button>
            </Link>

            <Link to='/editprofile'>
            <Button variant="outline-primary" size="sm" className="ml-2">
              <AiFillEdit style={{ fontSize: "20px", cursor: "pointer" }} />
            </Button>
         </Link>
        </div>
      ),
    },
    {
      name: "Role_assign",
      cell: row => (
        <Form.Control 
          as="select"
          value={row.emp_id}
          onChange={(e) => handleRoleChange(row.emp_id, e.target.value)}
          className="custom-select"
        >
          <option value="">Select Role</option>
          {view_role.map((role) => (
            <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
          ))}
        </Form.Control>
      )
    }
    
  ];

  // const handleDelete = (userData) => {
  //  if (window.confirm("Are you sure you want to delete this employee?")) {
  //     axios.delete(`http://localhost:5004/deleteemp/${userData.emp_id}`)
  //      .then((res) => {
  //       console.log(res)
  //         alert("Employee deleted successfully");
  //         ViewEmp();
  //       })
  //      .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // };

  const customStyles = {
    rows: {
      style: {
        color: "black",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "15px",
        color: "black",
        backgroundColor: "#8DECB4",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
      },
    },
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const newData = filteredData.filter((row) =>
      row.emp_name.toLowerCase().includes(value)
    );
    setItem(newData);
  };

  const handleEdit = (row) => {
    setSelectedEmployee(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  const handleEditEmployee = () => {
    // Implement axios request to update employee details
    axios.put(`http://localhost:5004/updateemp/${selectedEmployee.emp_id}`, selectedEmployee)
      .then(() => {
        setShowModal(false);
        setSelectedEmployee(null);
        ViewEmp(); // Refresh employee list
      })
      .catch((error) => {
        console.error("Error updating employee:", error);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <h3>Employee List</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex">
                <Link to='/addemployee'>
                  <Button variant="primary" size="sm" style={{ backgroundColor: "#8DECB4", marginRight: "10px", height: '40px' }}>
                    <span style={{ fontSize: "14px", color: "black" }}>Add Employee</span>
                  </Button>
                </Link>
                <Link to='/addprofile'>
                  <Button variant="primary" size="sm" style={{ backgroundColor: "#8DECB4", marginRight: "10px", height: '40px' }}>
                    <span style={{ fontSize: "14px", color: "black" }}>Add Profile</span>
                  </Button>
                </Link>
              </div>
              <div className="d-flex">
                <Input
                  type="text"
                  placeholder="Search by Emp_name"
                  className="form-control transition duration-300 ease-in-out border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  onChange={handleSearch}
                />
              </div>
            </div>

            <DataTable
              columns={columns}
              data={item}
              customStyles={customStyles}
              pagination
              paginationPerPage={10}
              fixedHeader
              highlightOnHover
              responsive
            />

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Employee ID</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Employee ID"
                          name="emp_id"
                          value={selectedEmployee ? selectedEmployee.emp_id : ''}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Employee Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Employee Name"
                          name="emp_name"
                          value={selectedEmployee ? selectedEmployee.emp_name : ''}
                          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, emp_name: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Email"
                          name="email"
                          value={selectedEmployee ? selectedEmployee.email : ''}
                          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, email: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          value={selectedEmployee ? selectedEmployee.password : ''}
                          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, password: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Mobile"
                          name="mobile"
                          value={selectedEmployee ? selectedEmployee.mobile : ''}
                          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, mobile: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          name="address"
                          value={selectedEmployee ? selectedEmployee.address : ''}
                          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, address: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date of Joining</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Date of Joining"
                          name="date_of_join"
                          value={selectedEmployee ? selectedEmployee.date_of_join : ''}
                          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, date_of_join: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Gender"
                          name="gender"
                          value={selectedEmployee ? selectedEmployee.gender : ''}
                          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, gender: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Status"
                          name="status"
                          value={selectedEmployee ? selectedEmployee.status : ''}
                          onChange={(e) => setSelectedEmployee({ ...selectedEmployee, status: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleEditEmployee}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Employee;
