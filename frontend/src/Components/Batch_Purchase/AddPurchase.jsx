import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './addpurchase.css';

const AddPurchase = () => {
    const [course_id, setCourse_id] = useState('');
    const [batch_id, setBatch_id] = useState('');
    const [stu_id, setStu_id] = useState('');
    const [fees, setFees] = useState('');
    // const [payment, setPayment] = useState('');
    const [payment_mode, setPayment_Mode] = useState('');

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            course_id,
            batch_id,
            stu_id,
            fees,
            payment_mode
        };

        console.log(data);

        axios
            .post('http://localhost:5004/postbatch', data)
            .then((res) => {
                navigate('/users');
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

    return (
        <>
            <div className="contain">
                <Button variant="primary" onClick={handleShow}>
                    Open Form
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add Batch_Purchase</Modal.Title>
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
                                    <Form.Label>Batch ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={batch_id}
                                        onChange={(e) => setBatch_id(e.target.value)}
                                    />
                                </Form.Group>
                            </div>

                            <div style={rowStyle}>
                                <Form.Group className="mb-3" style={formGroupStyle}>
                                    <Form.Label>Stu ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={stu_id}
                                        onChange={(e) => setStu_id(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" style={formGroupStyle}>
                                    <Form.Label>Fees</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={fees}
                                        onChange={(e) => setFees(e.target.value)}
                                    />
                                </Form.Group>
                            </div>

                            <div style={rowStyle}>
                                {/* <Form.Group className="mb-3" style={formGroupStyle}>
                                    <Form.Label>Payment</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={payment}
                                        onChange={(e) => setPayment(e.target.value)}
                                    >
                                        <option value="">Select Payment_Mode</option>
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                        <option value="Debit Card">Debit Card</option>
                                    </Form.Control>
                                </Form.Group> */}

                                <Form.Group className="mb-3" style={formGroupStyle}>
                                    <Form.Label>Payment Mode</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={payment_mode}
                                        onChange={(e) => setPayment_Mode(e.target.value)}
                                    >
                                        <option value="">Select Payment_Mode</option>
                                        <option value="Online">Online</option>
                                        <option value="Offline">Offline</option>
                                        <option value="Debit Card">Debit Card</option>
                                    </Form.Control>
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

export default AddPurchase;
