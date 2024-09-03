import { Input } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import Switch from "react-switch";

function Student() {
  const [filteredData, setFilteredData] = useState([]);
  const [item, setItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const columns = [
    {
      name: 'Stu_id',
      selector: row => row.stu_id,
    },
    {
      name: 'Stu_name',
      selector: row => row.stu_name,
    },
    {
      name: 'Email',
      selector: row => row.email,
    },
    {
      name: 'Gender',
      selector: row => row.gender,
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
           <Link to={`/viewsprofile/${row.stu_id}`}>
            <Button variant="outline-primary" size="sm">
              <CgProfile style={{ fontSize: "20px", cursor: "pointer" }} />
            </Button>
            </Link>

            <Link to={`/editsprofile/${row.stu_id}`}>
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
    axios.get("http://localhost:5004/getstudent")
      .then((res) => {
        console.log(res.data)
        setItem(res.data)
        setFilteredData(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    const newData = filteredData.filter((row) =>
      row.stu_name.toLowerCase().includes(value)
    );
    setItem(newData);
  };

  const handleEdit = (row) => {
    setSelectedStudent(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
  };

  const handleStatusChange = (student) => {
    const updatedStatus = student.status === "active" ? "inactive" : "active";
    axios.put(`http://localhost:5004/updatestudent/${student.stu_id}`, { ...student, status: updatedStatus })
      .then(() => {
        getData(); // Refresh student list
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleEditStudent = () => {
    if (!selectedStudent) return;
    axios.put(`http://localhost:5004/updatestudent/${selectedStudent.stu_id}`, selectedStudent)
      .then(() => {
        setShowModal(false);
        setSelectedStudent(null);
        getData(); // Refresh student list
      })
      .catch((error) => {
        console.error("Error updating student:", error);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <h3>Student</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
            
                <Link to='/addstudent'>
                  <Button variant="primary" size="sm" style={{ backgroundColor: "#8DECB4", marginRight: "10px", height: '40px' }}>
                    <span style={{ fontSize: "14px", color: "black" }}>Add Student</span>
                  </Button>
                </Link>
                <Link to='/addsprofile'>
                  <Button variant="primary" size="sm" style={{ backgroundColor: "#8DECB4", marginRight: "1050px", height: '40px' }}>
                    <span style={{ fontSize: "14px", color: "black" }}>Add Profile</span>
                  </Button>
                </Link>
                </div>
    
              <div className="d-flex">
                <Input
                  type="text"
                  placeholder="Search by Stu_name"
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
                <Modal.Title>Edit Student</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Student ID"
                          name="stu_id"
                          value={selectedStudent ? selectedStudent.stu_id_id : ''}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control
                          type="stu_name"
                          placeholder="Student Name"
                          name="stu_name"
                          value={selectedStudent ? selectedStudent.stu_name : ''}
                          onChange={(e) => setSelectedStudent({ ...selectedStudent, stu_name: e.target.value })}
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
                          value={selectedStudent ? selectedStudent.email : ''}
                          onChange={(e) => setSelectedStudent({ ...selectedStudent, email: e.target.value })}
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
                          value={selectedStudent ? selectedStudent.password : ''}
                          onChange={(e) => setSelectedStudent({ ...selectedStudent, password: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Date_Of_Join</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Joining Date"
                          name="date_of_join"
                          value={selectedStudent ? selectedStudent.date_of_join : ''}
                          onChange={(e) => setSelectedStudent({ ...selectedStudent, date_of_join: e.target.value })}
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
                          value={selectedStudent ? selectedStudent.mobile_no : ''}
                          onChange={(e) => setSelectedStudent({ ...selectedStudent, mobile_no: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                    <Form.Group className="mb-3">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          type="gender"
                          placeholder="Gender"
                          name="gender"
                          value={selectedStudent ? selectedStudent.gender : ''}
                          onChange={(e) => setSelectedStudent({ ...selectedStudent, gender: e.target.value })}
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
                          value={selectedStudent ? selectedStudent.status : ''}
                          onChange={(e) => setSelectedStudent({ ...selectedStudent, status: e.target.value })}
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
                <Button variant="primary" onClick={handleEditStudent}>
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


export default Student;


