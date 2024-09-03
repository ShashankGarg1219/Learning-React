import { Input } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import Switch from "react-switch";



function Teacher() {
 const [filteredData, setFilteredData] = useState([]);
 const [item, setItem] = useState([]);
 const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);



  const columns = [
    {
      name: 'Teacher_id',
      selector: row => row.teacher_id,
    },
    {
      name: 'Teacher_name',
      selector: row => row.teacher_name,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    // {
    //   name: 'Password',
    //   selector: row => row.password,
    // },
    {
      name: 'Qualification',
      selector: row => row.qualification,
    },
    {
      name: "Status",
      cell: row => (
        <Switch
          checked={row.status === "active"}
          onChange={() => handleStatusChange(row)}
        />
      ),
    },

    // {
    //   name: 'Mobile_no',
    //   selector: row => row.mobile_no,
    // },
    {
      name: 'Gender',
      selector: row => row.gender,
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
           <Link to={`/viewingprofile/${row.teacher_id}`}>
            <Button variant="outline-primary" size="sm">
              <CgProfile style={{ fontSize: "20px", cursor: "pointer" }} />
            </Button>
            </Link>

            <Link to={`/editingprofile/${row.teacher_id}`}>
            <Button variant="outline-primary" size="sm" className="ml-2">
              <AiFillEdit style={{ fontSize: "20px", cursor: "pointer" }} />
            </Button>
         </Link>
        </div>
      ),
    },
    
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', fontWeight: 'bold', color: 'black'
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold', color: 'black',
        fontSize: "18px",
        paddingLeft: '8px',
        paddingRight: '8px',
        backgroundColor: "#8DECB4"
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        fontSize: "15px",
      },
    },
  };

  const getData = () => {
    axios.get("http://localhost:5004/getteacher")
    .then((res) => {
      console.log(res.data)
      setItem(res.data)
      setFilteredData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (event) =>{
    const value = event.target.value.toLowerCase();
    const newData = filteredData.filter((row)=>
    row.teacher_name.toLowerCase().includes(value)
    );
    setItem(newData);
  }

  const handleEdit = (row) => {
    setSelectedTeacher(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTeacher(null);
  };

  const handleStatusChange = (course) => {
    const updatedStatus = course.status === "active" ? "inactive" : "active";
    axios.put(`http://localhost:5004/updatecourse/${course.course_id}`, { ...course, status: updatedStatus })
      .then(() => {
        getData(); // Refresh course list
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleEditTeacher = () => {
    // Implement axios request to update employee details
    axios.put(`http://localhost:5004/updateteacher/${selectedTeacher.teacher_id}`, selectedTeacher)
      .then(() => {
        setShowModal(false);
        setSelectedTeacher(null);
        getData(); // Refresh teacher list
      })
      .catch((error) => {
        console.error("Error updating teacher:", error);
      });
  };


  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <h3>Teacher</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
              {/* <Button
                color="#50DEC2"
                style={{
                  background: "#8DECB4",
                  color: "black",
                  border: "2px solid #50DEC2",
                }}
                 onClick={handleShow}
              >
                Add +
              </Button> */}
              <Link to='/addteacher'>
                  <Button variant="primary" size="sm" style={{ backgroundColor: "#8DECB4", marginRight: "10px", height: '40px' }}>
                    <span style={{ fontSize: "14px", color: "black" }}>Add Teacher</span>
                  </Button>
                </Link>
                <Link to='/addingprofile'>
                  <Button variant="primary" size="sm" style={{ backgroundColor: "#8DECB4", marginRight: "1050px", height: '40px' }}>
                    <span style={{ fontSize: "14px", color: "black" }}>Add Profile</span>
                  </Button>
                </Link>
                </div>
                <div className="d-flex">
                <Input
                  type="text"
                  placeholder="Search by Teacher_name"
                  className="form-control transition duration-300 ease-in-out border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  onChange={handleSearch}
                />
              </div>
            <DataTable
              columns={columns}
              data={item}
              customStyles={customStyles}
              pagination
              highlightOnHover
            />
             <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Teacher</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Teacher ID</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Teacher ID"
                          name="teacher_id"
                          value={selectedTeacher ? selectedTeacher.teacher_id : ''}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Teacher Name</Form.Label>
                        <Form.Control
                          type="teacher_name"
                          placeholder="Teacher Name"
                          name="teacher_name"
                          value={selectedTeacher ? selectedTeacher.teacher_name : ''}
                          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, teacher_name: e.target.value })}
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
                          value={selectedTeacher ? selectedTeacher.email : ''}
                          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, email: e.target.value })}
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
                          value={selectedTeacher ? selectedTeacher.password : ''}
                          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, password: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Qualification</Form.Label>
                        <Form.Control
                          type="qualification"
                          placeholder="Qualification"
                          name="qualification"
                          value={selectedTeacher ? selectedTeacher.qualification : ''}
                          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, qualification: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          type="status"
                          placeholder="Status"
                          name="status"
                          value={selectedTeacher ? selectedTeacher.status : ''}
                          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, status: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          type="gender"
                          placeholder="Gender"
                          name="gender"
                          value={selectedTeacher ? selectedTeacher.gender : ''}
                          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, gender: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Mobile_no</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Mobile_no"
                          name="mobile_no"
                          value={selectedTeacher ? selectedTeacher.mobile : ''}
                          onChange={(e) => setSelectedTeacher({ ...selectedTeacher, mobile_no: e.target.value })}
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
                <Button variant="primary" onClick={handleEditTeacher}>
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

export default Teacher;