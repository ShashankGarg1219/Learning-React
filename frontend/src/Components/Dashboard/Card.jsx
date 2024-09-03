import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { MdGroups } from "react-icons/md";
import Form from 'react-bootstrap/Form';
import { FaRupeeSign } from "react-icons/fa";

function Card1() {
  return (
    <div>
      <>
        <Container className='m-5'>
          <Row>
            <Col className=' d-flex gap-5' style={{ flexWrap: "wrap" }}>
              <Card style={{ width: '15rem', height: "8rem", boxShadow: "0 0 35px 0 #8DECB4" }}>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col className='col-8' ><p style={{ fontSize: "14px", fontWeight: "700" }}>Total Employee</p></Col>
                      <Col className='col-4'>
                        <MdGroups style={{ height: "3rem", width: "4rem" }} />
                      </Col>
                    </Row>
                    <Row>
                      <Form.Label>
                        4567   </Form.Label>
                      <Form.Range />
                    </Row>
                  </Container>
                </Card.Body>
              </Card>



              <Card style={{ width: '15rem', height: "8rem", boxShadow: "0 0 35px 0 #8DECB4" }}>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col className='col-8' ><p style={{ fontSize: "14px", fontWeight: "700" }}>Total Students</p></Col>
                      <Col className='col-4'>
                        <MdGroups style={{ height: "3rem", width: "4rem" }} />
                      </Col>
                    </Row>
                    <Row>
                      <Form.Label>
                        123    </Form.Label>
                      <Form.Range />
                    </Row>
                  </Container>
                </Card.Body>
              </Card>



              <Card style={{ width: '15rem', height: "8rem", boxShadow: "0 0 35px 0 #8DECB4" }}>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col className='col-8' ><p style={{ fontSize: "14px", fontWeight: "700" }}>Total Teachers</p></Col>
                      <Col className='col-4'>
                        <MdGroups style={{ height: "3rem", width: "4rem" }} />
                      </Col>
                    </Row>
                    <Row>
                      <Form.Label>
                        123    </Form.Label>
                      <Form.Range />
                    </Row>
                  </Container>
                </Card.Body>
              </Card>




              <Card style={{ width: '15rem', height: "8rem", boxShadow: "0 0 35px 0 #8DECB4" }}>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col className='col-8' ><p style={{ fontSize: "14px", fontWeight: "700" }}>Total Amount</p></Col>
                      <Col className='col-4'>
                        <FaRupeeSign style={{ height: "2rem", width: "3rem" }} />
                      </Col>
                    </Row>
                    <Row>
                      <Form.Label>
                        123    </Form.Label>
                      <Form.Range />
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

      </>
    </div>
  )
}

export default Card1
