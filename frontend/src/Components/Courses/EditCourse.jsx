import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './editcourse.css';

const EditCourse = () => {
    const [course_id, setCourse_id] = useState('');
    const [course_name, setCourse_name] = useState('');
    const [syllabus, setSyllabus] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            course_id,
            course_name,
            syllabus,
            status,
            description,
            
        };

        console.log(data);

        axios
            .post('http://localhost:5004/postcourse', data)
            .then((res) => {
                navigate('/courses');
            })
            .catch((err) => console.log(err));
    };

    const formContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        
        
    };

    const formStyle = {
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        color: '#fff',
        width: '48%',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
        borderColor: '#0056b3',
    };
   

    const formGroupStyle = {
        marginBottom: '15px',
    };

    const rowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '15px',
    };

    const closeButtonStyle = {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
    };

    const selectStyle = {
        appearance: 'none',
        background: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgOCA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xIDJsMy0zIDMgMyIgIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L3N2Zz4=) no-repeat right 10px center',
        backgroundColor: '#fff',
        border: '1px solid #ced4da',
        padding: '0.375rem 1.75rem 0.375rem 0.75rem',
        borderRadius: '0.25rem',
        width: '100%',
        height: 'calc(1.5em + 0.75rem + 2px)',
    };


    return (
        <>
            <div className="contain">
                <Button variant="primary" onClick={handleShow}>
                    Open Form
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Course</Modal.Title>
                    <button style={closeButtonStyle} onClick={handleClose}>
                        &times;
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div style={formContainerStyle}>
                        <Form onSubmit={handleSubmit} style={formStyle}>
                            <div style={rowStyle}>
                                <Form.Group className="mb-3" style={formGroupStyle}>
                                    <Form.Label>Course ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={course_id}
                                        onChange={(e) => setCourse_id(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" style={formGroupStyle}>
                                    <Form.Label>Course_name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={course_name}
                                        onChange={(e) => setCourse_name(e.target.value)}
                                    />
                                </Form.Group>
                            </div>

                            <div style={rowStyle}>
                                <Form.Group className="mb-3" style={formGroupStyle}>
                                    <Form.Label>Syllabus</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={syllabus}
                                        onChange={(e) => setSyllabus(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" style={formGroupStyle}>
                                    <Form.Label>Status</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    />
                                </Form.Group>
                            </div>

                            <div style={rowStyle}>
                            <Form.Group className="mb-3" style={formGroupStyle}>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </Form.Group> 

                                
                            </div>


                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    style={buttonStyle}
                                    onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="secondary"
                                    style={buttonStyle}
                                    onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                                    onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default EditCourse;
