import { Input } from "@mui/material";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { Container, Row, Col, Button } from 'react-bootstrap';
//import { AiFillEdit } from "react-icons/ai";



function Batch_Purchase() {
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
     const [show, setShow] = useState(false);
 const [filteredData, setFilteredData] = useState([]);
 const [item, setItem] = useState([]);



  const columns = [
    {
      name: 'Course_ID',
      selector: row => row.course_id,
    },
    {
      name: 'Batch_ID',
      selector: row => row.batch_id,
    },
    {
      name: 'Stu_Id',
      selector: row => row.stu_id,
    },
    {
      name: 'Fees',
      selector: row => row.fees,
    },
    
    {
      name: 'Payment_Mode',
      selector: row => row.payment_mode,
    },
   
    

    // {
    //   name: 'Action',
    //   cell: row => (
    //     <div>
    //       {/* Edit button */}
    //       <Link to={`/edituser/${row.uid}`} style={{ textDecoration: "none", marginRight: '10px' }}>
    //         <AiFillEdit
    //           className='edituser'
    //           style={{ fontSize: "20px", cursor: "pointer"}} 
    //         />
    //       </Link>
          
    //     </div>
    //   ),
    // },
    
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '72px', fontWeight: 'bold', color: 'black'
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold', color: 'black',
        fontSize: "18px",
        paddingLeft: '8px',
        paddingRight: '8px',
        backgroundColor: "#8DECB4"
      },
    },
    cells: {
      style: {
        paddingLeft: '8px',
        paddingRight: '8px',
        fontSize: "15px",
      },
    },
  };

  const getData = () => {
    axios.get("http://localhost:5004/getpurchase")
    .then((res) => {
      console.log(res.data)
      setItem(res.data)
      setFilteredData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (event) =>{
    const value = event.target.value.toLowerCase();
    const newData = filteredData.filter((row)=>
    row.course_id.toLowerCase().includes(value)
    );
    setItem(newData);
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <div className="d-flex justify-content-center">
              <h3>Batch_Purchase</h3>
            </div>
            <div className="d-flex justify-content-between mb-2">
            <div className="d-flex">
            <Link to='/addpurchase'>
                  <Button variant="primary" size="sm" style={{ backgroundColor: "#8DECB4", marginRight: "10px", height:'40px' }}>
                    <span style={{ fontSize: "14px", color: "black" }}>Add ++</span>
                  </Button>
                </Link>
                </div>
              <div className="d-flex">
                <Input
                  type="text"
                  placeholder="Search by course_id"
                  className="form-control transition duration-300 ease-in-out border-gray-300 hover:border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <DataTable
              columns={columns}
              data={item}
              customStyles={customStyles}
              pagination
              highlightOnHover
            />
            </Col>
          </Row>
        </Container>
    </>
  );
}


export default Batch_Purchase;


