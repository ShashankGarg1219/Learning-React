// EditProfile.js
import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EditsProfile() {
  const { stu_id } = useParams();
  console.log(stu_id)
  const [profileData, setProfileData] = useState({
    stu_id: '',
    adhar: '',
    student_class: '',
    state: '', 
    city: '',
    fee_status: '',
    photo: '',
    documents: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5004/getprofile/${stu_id}`)
      .then((response) => {
        setProfileData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching profile:', error);
      });
  }, [stu_id]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5004/editprofile/${stu_id}`, profileData)
      .then((res) => {
        console.log(res);
        alert("Profile updated successfully!");
        navigate(`/student`);
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
              <Form.Label>Student ID</Form.Label>
              <Form.Control type="text" name="stu_id" value={stu_id} onChange={handleChange} disabled />
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
              <Form.Label>student_class</Form.Label>
              <Form.Control type="text" name="student_class" value={profileData.student_class} onChange={handleChange} required />
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
              <Form.Label>City</Form.Label>
              <Form.Control type="text" name="city" value={profileData.city} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Fee Status</Form.Label>
              <Form.Control type="text" name="fee_status" value={profileData.fee_status} onChange={handleChange} required />
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

export default EditsProfile;
