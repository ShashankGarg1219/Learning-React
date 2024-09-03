import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AddingProfile = () => {
    const [teacher_id, setTeacher_id] = useState('');
    const [adhar, setAdhar] = useState('');
    const [experience, setExperience] = useState('');
    const [date_of_join, setDate_Of_Join] = useState('');
    const [photo, setPhoto] = useState('');
    const [documents, setDocuments] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            teacher_id,
            adhar,
            experience,
            date_of_join,
            photo,
            documents,
        };

        console.log(data);

        axios.post('http://localhost:5004/postteaprofile', data)
            .then((res) => {
                console.log(res);
                alert('Profile added successfully!');
                navigate('/teacher');
            }).catch((err) => {
                console.log(err);
                alert('Failed to add profile. Please try again.');
            });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "teacher_id") setTeacher_id(value);
        if (name === "adhar") setAdhar(value);
        if (name === "experience") setExperience(value);
        if (name === "date_of_join") setDate_Of_Join(value);
        if (name === "photo") setPhoto(value);
        if (name === "documents") setDocuments(value);
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
                <Form.Label>Teacher ID</Form.Label>
                <Form.Control
                  type="text"
                  name="teacher_id"
                  value={teacher_id}
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
                <Form.Label>Experience</Form.Label>
                <Form.Control
                  type="text"
                  name="experience"
                  value={experience}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" style={formGroupStyle}>
                <Form.Label>Date of Join</Form.Label>
                <Form.Control
                  type="date"
                  name="date_of_join"
                  value={date_of_join}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Upload Photo</Form.Label>
              <Form.Control
                type="text"
                // accept="image/*"
                name="photo"
                onChange={(e) => setPhoto(e.target.value)}
              />
            </Form.Group>
            <div style={rowStyle}>
              <Form.Group className="mb-3">
                <Form.Label>Documents</Form.Label>
                <Form.Control
                  type="text"
                  name="documents"
                  onChange={(e) => setDocuments(e.target.value)}
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
    
    export default AddingProfile;
