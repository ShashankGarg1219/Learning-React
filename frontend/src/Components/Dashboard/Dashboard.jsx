import React from 'react'
import Card1 from './Card'
import Graph from './Graph'
import {Container,Row,Col} from 'react-bootstrap'
function Dashboard() {
  return (
    <div>
        <Container className='mt-5'>
          <Row>
            <Col>
            <Card1/>  
            <Graph/>
            </Col>
          </Row>
        </Container>
     
    </div>
  )
}

export default Dashboard
