import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './editrole.css';

function EditRole() {
  const [role, setRole] = useState({
    role_id: "",
    role_name: "",
  });

  const navigate = useNavigate();


  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5004/updatedata/${role.role_id}`, role)
      .then(res => {
        console.log(res);
        navigate('/role');
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className='d-flex flex-column align-items-center pt-4' style={{ marginTop: '35px' }}>
        <h3>Edit Role</h3>
        <div className="d-flex justify-content-center w-100">
          <form className="form-container" onSubmit={handleUpdate}>
            <div className="mb-3">
              <label htmlFor="inputRoleId" className="form-label">Role ID</label>
              <input
                type="text"
                className="form-control"
                id="inputRoleId"
                value={role.role_id}
                autoComplete='off'
                name='role_id'
                onChange={(e) => setRole({ ...role, [e.target.name]: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputRoleName" className="form-label">Role Name</label>
              <input
                type="text"
                className="form-control"
                id="inputRoleName"
                value={role.role_name}
                name='role_name'
                autoComplete='off'
                onChange={(e) => setRole({ ...role, [e.target.name]: e.target.value })}
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/role')}>Close</button>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditRole;
