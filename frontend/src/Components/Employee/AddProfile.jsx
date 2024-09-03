import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddProfile = () => {
    const [emp_id, setEmp_id] = useState('');
    const [adhar, setAdhar] = useState('');
    const [alternate_mobile, setAlternate_Mobile] = useState('');
    const [photo, setPhoto] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [work_experience, setWork_Experience] = useState('');
    const [documents, setDocuments] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            emp_id,
            adhar,
            alternate_mobile,
            photo,
            city,
            state,
            work_experience,
            documents,
        };

        console.log(data);

        axios.post('http://localhost:5004/postempprofile', data)
            .then((res) => {
                console.log(res)
                navigate('/employee');
            }).catch((err) => console.log(err));
    };

    const handleStateChange = (event) => {
        const { value } = event.target;
        setState(value);
        setCity(''); // Clear city when state changes
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "photo") {
            setPhoto(value);
        } else {
            if (name === "emp_id") setEmp_id(value);
            if (name === "adhar") setAdhar(value);
            if (name === "alternate_mobile") setAlternate_Mobile(value);
            if (name === "city") setCity(value);
            if (name === "work_experience") setWork_Experience(value);
            if (name === "documents") setDocuments(value);
        }
    };

    const formContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
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
        height: '80vh',
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
                        <Form.Label>Emp_id</Form.Label>
                        <Form.Control
                            type="text"
                            name="emp_id"
                            value={emp_id}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" style={formGroupStyle}>
                        <Form.Label>Adhar</Form.Label>
                        <Form.Control
                            type="text"
                            name="adhar"
                            value={adhar}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </div>
                <div style={rowStyle}>
                    <Form.Group className="mb-3" style={formGroupStyle}>
                        <Form.Label>Alternate Mobile</Form.Label>
                        <Form.Control
                            type="text"
                            name="alternate_mobile"
                            value={alternate_mobile}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Upload Photo</Form.Label>
                        <Form.Control
                            type="text"
                            // accept="image/*"
                            value={photo}
                            name="photo"
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </div>
                <div style={rowStyle}>
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            as="select"
                            name="city"
                            value={city}
                            onChange={handleInputChange}
                            style={selectStyle}
                        >
                            <option value="">Select City</option>
                            {state === 'Madhya Pradesh' && (
                                <>
                                    <option value="Bhopal">Bhopal</option>
                                    <option value="Indore">Indore</option>
                                </>
                            )}
                        </Form.Control>
                    </Form.Group>
                </div>
                <div style={rowStyle}>
                    <Form.Group className="mb-3">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            as="select"
                            name="state"
                            value={state}
                            onChange={handleStateChange}
                            style={selectStyle}
                        >
                            <option value="">Select State</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Work Experience</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Experience"
                            name="work_experience"
                            value={work_experience}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </div>
                <div style={rowStyle}>
                    <Form.Group className="mb-3">
                        <Form.Label>Documents</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Documents"
                            name="documents"
                            value={documents}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                </div>
                <Button
                    variant="primary"
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                >
                    Add Profile
                </Button>
            </Form>
        </div>
    );
};

export default AddProfile;
