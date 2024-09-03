import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import DataTable from "react-data-table-component";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from 'react-icons/fa';
//import { Link } from 'react-router-dom';

function Role() {
  const [show, setShow] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [item, setItem] = useState([]);
  const [inputdata, setInputData] = useState({
    role_id: "",
    role_name: "",
  });
  const [selectedRole, setSelectedRole] = useState(null);

  const handleClose = () => {
    setShow(false);
    setSelectedRole(null);
  };

  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5004/postdata", inputdata)
      .then((res) => {
        setInputData({
          role_id: "",
          role_name: "",
        });
        alert("Role successfully Added");
        ViewRole();
        handleClose();
      });
  };

  const ViewRole = () => {
    axios.get("http://localhost:5004/getdata")
      .then((res) => {
        setItem(res.data);
        setFilteredData(res.data);
      });
  };

  useEffect(() => {
    ViewRole();
  }, []);

  const handleEditClick = (role) => {
    setSelectedRole(role);
    setInputData(role);
    setShow(true);
  };

  const handleEditSave = () => {
    axios.put(`http://localhost:5004/updatedata/${selectedRole.role_id}`, inputdata)
      .then(() => {
        alert("Role updated successfully");
        ViewRole();
        handleClose();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    {
      name: "Role Id",
      selector: (row) => row.role_id,
    },
    {
      name: "Role Name",
      selector: (row) => row.role_name,
    },
    {
      name: 'Action',
      cell: row => (
        <div>
          <Button variant="outline-primary" size="sm" onClick={() => handleEditClick(row)}>
            <AiFillEdit style={{ fontSize: "20px", cursor: "pointer" }} />
          </Button>
          <Button variant="outline-primary" size="sm" onClick={() => handleDelete(row.role_id)}>
            <FaTrash style={{ fontSize: "20px", cursor: "pointer" }} />
          </Button>
        </div>
      ),
    }
  ];

  const handleDelete = (role_id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      axios.delete(`http://localhost:5004/deletedata/${role_id}`)
        .then(() => {
          alert("Role deleted successfully");
          ViewRole();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

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
      row.role_name.toLowerCase().includes(value)
    );
    setItem(newData);
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <h3>Role List</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <Button
                color="#50DEC2"
                style={{
                  background: "#8DECB4",
                  color: "black",
                  border: "2px solid #50DEC2",
                }}
                onClick={handleShow}
              >
                Add Role
              </Button>
              <div className="d-flex">
                <Input
                  type="text"
                  placeholder="Search by Role_name"
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
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose} style={{ marginTop: "8vh" }}className="custom-modal-bg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedRole ? "Edit Role" : "Add Role"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Role Id</Form.Label>
            <Form.Control
              type="text"
              name="role_id"
              placeholder="Enter Role Id"
              autoComplete="off"
              value={inputdata.role_id}
              onChange={(e) =>
                setInputData({ ...inputdata, role_id: e.target.value })
              }
              disabled={selectedRole !== null}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Role Name</Form.Label>
            <Form.Control
              type="text"
              name="role_name"
              placeholder="Enter Role Name"
              autoComplete="off"
              value={inputdata.role_name}
              onChange={(e) =>
                setInputData({ ...inputdata, role_name: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={selectedRole ? handleEditSave : handleSubmit}>
            {selectedRole ? "Save Changes" : "Add Role"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Role;
