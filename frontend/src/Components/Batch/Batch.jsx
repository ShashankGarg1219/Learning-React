import { Input } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { AiFillEdit } from "react-icons/ai";
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';




function Batch() {
  const [filteredData, setFilteredData] = useState([]);
  const [item, setItem] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);



  const columns = [
    {
      name: 'Batch_ID',
      selector: row => row.batch_id,
    },
    {
      name: 'Teacher_ID',
      selector: row => row.teacher_id,
    },
    {
      name: 'Course_Id',
      selector: row => row.course_id,
    },
    {
      name: 'Batch_Name',
      selector: row => row.batch_name,
    },
    {
      name: 'Start_Date',
      selector: row => row.start_date,
    },
    {
      name: 'End_Date',
      selector: row => row.end_date,
    },
    {
      name: 'Mode',
      selector: row => row.mode,
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


    // {
    //   name: 'Action',
    //   cell: row => (
    //     <div>
    //       {/* Edit button */}
    //       <Link to={`/edituser/${row.uid}`} style={{ textDecoration: "none", marginRight: '10px' }}>
    //         <AiFillEdit
    //           className='edituser'
    //           style={{ fontSize: "20px", cursor: "pointer"}} 
    //         />
    //       </Link>

    //     </div>
    //   ),
    // },

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
    axios.get("http://localhost:5004/getbatch")
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
      row.batch_id.toLowerCase().includes(value)
    );
    setItem(newData);
  }

  const handleEdit = (row) => {
    setSelectedBatch(row);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBatch(null);
  };

  const handleEditStudent = () => {
    if (!selectedBatch) return;
    axios.put(`http://localhost:5004/updatebatch/${selectedBatch.batch_id}`, selectedBatch)
      .then(() => {
        setShowModal(false);
        setSelectedBatch(null);
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
              <h3>Batch</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <div className="d-flex">
                <Link to='/addbatch'>
                  <Button variant="primary" size="sm" style={{ backgroundColor: "#8DECB4", marginRight: "10px", height: '40px' }}>
                    <span style={{ fontSize: "14px", color: "black" }}>Add ++</span>
                  </Button>
                </Link>
              </div>
              <div className="d-flex">
                <Input
                  type="text"
                  placeholder="Search by Batch_id"
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
                        <Form.Label>Batch Id</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Batch ID"
                          name="batch_id"
                          value={selectedBatch ? selectedBatch.batch_id_id : ''}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Teacher Id</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Teacher ID"
                          name="teacher_id"
                          value={selectedBatch ? selectedBatch.teacher_id_id_id : ''}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Course Id</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Course ID"
                          name="course_id"
                          value={selectedBatch ? selectedBatch.course_id_id : ''}
                          disabled
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Batch Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Batch Name"
                          name="batch_name"
                          value={selectedBatch ? selectedBatch.batch_name : ''}
                          onChange={(e) => setSelectedBatch({ ...selectedBatch, batch_name: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>

                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Start Date</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="Start Date"
                          name="start_date"
                          value={selectedBatch ? selectedBatch.start_date : ''}
                          onChange={(e) => setSelectedBatch({ ...selectedBatch, start_date: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>End Date</Form.Label>
                        <Form.Control
                          type="date"
                          placeholder="End Date"
                          name="end_date"
                          value={selectedBatch ? selectedBatch.end_date : ''}
                          onChange={(e) => setSelectedBatch({ ...selectedBatch, end_date: e.target.value })}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Payment Mode</Form.Label>
                        <Form.Select
                          name="mode"
                          value={selectedBatch ? selectedBatch.mode: ''}
                          onChange={(e) => setSelectedBatch({ ...selectedBatch, mode: e.target.value })}
                        >
                          <option value="">Select Payment </option>
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                          
                        </Form.Select>
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
export default Batch;


