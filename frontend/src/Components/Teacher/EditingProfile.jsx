// EditProfile.js
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditingProfile() {
  const { teacher_id } = useParams();
  console.log(teacher_id)
  const [profileData, setProfileData] = useState({
    teacher_id: '',
    adhar: '',
    experience: '',
    date_of_join: '', 
    photo: '',
    documents: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5004/getteaprofile/${teacher_id}`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, [teacher_id]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5004/putteaprofile/${teacher_id}`, profileData)
      .then((res) => {
        console.log(res);
        alert("Profile updated successfully!");
        navigate(`/teacher`);
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
              <Form.Label>teacher ID</Form.Label>
              <Form.Control type="text" name="teacher_id" value={teacher_id} onChange={handleChange} disabled />
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
              <Form.Label>Experience</Form.Label>
              <Form.Control type="text" name="experience" value={profileData.experience} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control type="text" name="date_of_join" value={profileData.date_of_join} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
             <Form.Group>
              <Form.Label>Photo</Form.Label>
              <Form.Control type="text" name="photo" value={profileData.photo} onChange={handleChange} required />
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

export default EditingProfile;
