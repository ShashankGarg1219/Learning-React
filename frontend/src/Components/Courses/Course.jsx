import { Input } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { AiFillEdit } from "react-icons/ai";
import Switch from "react-switch";

function Courses() {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [SelectedCourses, setSelectedCourses] = useState(null);
  const [item, setItem] = useState([]);

  const columns = [
    {
      name: 'Course_ID',
      selector: row => row.course_id,
    },
    {
      name: 'Course_Name',
      selector: row => row.course_name,
    },
    {
      name: 'Syllabus',
      selector: row => row.syllabus,
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
      name: 'Description',
      selector: row => row.description,
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
    axios.get("http://localhost:5004/getcourse")
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
      row.course_id.toLowerCase().includes(value)
    );
    setItem(newData);
  }

  const handleEdit = (row) => {
    setSelectedCourses(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCourses(null);
  };

  const handleEditCourse = () => {
    axios.put(`http://localhost:5004/updatecourse/${SelectedCourses.course_id}`, SelectedCourses)
      .then(() => {
        setShowModal(false);
        setSelectedCourses(null);
        getData();
      })
      .catch((error) => {
        console.error("Error updating course:", error);
      });
  };

  const handleStatusChange = (course) => {
    const updatedStatus = course.status === "active" ? "inactive" : "active";
    axios.put(`http://localhost:5004/updatecourse/${course.course_id}`, { ...course, status: updatedStatus })
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <h3>Courses</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <Link to='/editcourse'>
                <Button
                  color="#50DEC2"
                  style={{
                    background: "#8DECB4",
                    color: "black",
                    border: "2px solid #50DEC2",
                  }}
                  onClick={handleShow}
                >
                  Add +
                </Button>
              </Link>
              <div className="d-flex">
                <Input
                  type="text"
                  placeholder="Search by course_id"
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
                <Modal.Title>Edit Course</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Course ID</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Course ID"
                          name="course_id"
                          value={SelectedCourses ? SelectedCourses.course_id : ''}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Course Name"
                          name="course_name"
                          value={SelectedCourses ? SelectedCourses.course_name : ''}
                          onChange={(e) => setSelectedCourses({ ...SelectedCourses, course_name: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Syllabus</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Syllabus"
                          name="syllabus"
                          value={SelectedCourses ? SelectedCourses.syllabus : ''}
                          onChange={(e) => setSelectedCourses({ ...SelectedCourses, syllabus: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Status"
                          name="status"
                          value={SelectedCourses ? SelectedCourses.status : ''}
                          onChange={(e) => setSelectedCourses({ ...SelectedCourses, status: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Description"
                          name="description"
                          value={SelectedCourses ? SelectedCourses.description : ''}
                          onChange={(e) => setSelectedCourses({ ...SelectedCourses, description: e.target.value })}
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
                <Button variant="primary" onClick={handleEditCourse}>
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

export default Courses;
