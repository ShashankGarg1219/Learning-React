import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const AddTeacher = () => {
    const [teacher_id, setTeacher_id] = useState('');
    const [teacher_name, setTeacher_name] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [qualification, setQualification] = useState('');
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');
    const [mobile_no, setMobile_no] = useState('');

    const navigate = useNavigate();  // Initialize useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {  // Define the data object
            teacher_id,
            teacher_name,
            email,
            password,
            qualification,
            status,
            gender,
            mobile_no,

        };

        console.log(data);

        axios
            .post('http://localhost:5004/postteacher', data)
            .then((res) => {
                navigate('/teacher');
            })
            .catch((err) => console.log(err));
    };

    const formContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // full height of the viewport
        padding: '0 20px',
    };

    const formStyle = {
        border: '1px solid #ccc',
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        height: '90vh',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
        color: '#fff',
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#0056b3',
        borderColor: '#0056b3',
    };
    const rowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '15px',
    };

    const formGroupStyle = {
        marginBottom: '15px',
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
        <div style={formContainerStyle}>
            <Form onSubmit={handleSubmit} style={formStyle}>
                <div style={rowStyle}>
                    <Form.Group className="mb-3" style={formGroupStyle}>
                        <Form.Label>Teacher_id</Form.Label>
                        <Form.Control
                            type="text"
                            value={teacher_id}
                            onChange={(e) => setTeacher_id(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" style={formGroupStyle}>
                        <Form.Label>Teacher_name</Form.Label>
                        <Form.Control
                            type="text"
                            value={teacher_name}
                            onChange={(e) => setTeacher_name(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <div style={rowStyle}>
                    <Form.Group className="mb-3" style={formGroupStyle}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" style={formGroupStyle}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                </div>


                <div style={rowStyle}>
                <Form.Group className="mb-3" style={formGroupStyle}>
                        <Form.Label>Qualification</Form.Label>
                        <Form.Control
                            type="Text"
                            value={qualification}
                            onChange={(e) => setQualification(e.target.value)}
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
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                            as="select"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            style={selectStyle}

                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" style={formGroupStyle}>
                        <Form.Label>Mobile_no</Form.Label>
                        <Form.Control
                            type="text"
                            value={mobile_no}
                            onChange={(e) => setMobile_no(e.target.value)}
                        />
                    </Form.Group>
                </div>
                <Button
                    variant="primary"
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Add Teacher
                </Button>
            </Form>
        </div>
    );
};

export default AddTeacher;
