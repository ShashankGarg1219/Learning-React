// EditProfile.js
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const { emp_id } = useParams();
  const [profileData, setProfileData] = useState({
    emp_id: '',
    adhar: '',
    alternate_mobile: '',
    photo: '', 
    city: '',
    state: '',
    work_experience: '',
    documents: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5004/getempprofile/${emp_id}`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, [emp_id]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5004/updateempprofile/${emp_id}`, profileData)
      .then((res) => {
        console.log(res);
        alert("Profile updated successfully!");
        navigate(`/employee`);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  return (
    <Container>
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Employee ID</Form.Label>
              <Form.Control type="text" name="emp_id" value={profileData.emp_id} onChange={handleChange} disabled />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Adhar</Form.Label>
              <Form.Control type="text" name="adhar" value={profileData.adhar} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>alternate_mobile</Form.Label>
              <Form.Control type="text" name="alternate_mobile" value={profileData.alternate_mobile} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Photo</Form.Label>
              <Form.Control type="text" name="photo" value={profileData.photo} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" value={profileData.city} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control type="text" name="state" value={profileData.state} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Work_experience</Form.Label>
              <Form.Control type="text" name="work_experience" value={profileData.work_experience} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Documents</Form.Label>
              <Form.Control type="text" name="documents" value={profileData.documents} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        {/* Add more profile fields as needed */}
        <Button type="submit">Update Profile</Button>
      </Form>
    </Container>
  );
}

export default EditProfile;
