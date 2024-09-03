const connection = require('../../Modal/model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

///////////////////////////GET////////////////////////////

const view_emp = async (req, res) => {
  const selectQuery = 'SELECT * FROM employee';
  try {
    const result = await connection.query(selectQuery);
    res.send(result.rows);
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).send("Database query error");
  }
};

//////////////////////////POST//////////////


const register_emp = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);
    const { emp_id, emp_name, email, mobile, address, date_of_join, gender, status } = req.body;

    const sqlQuery = 'INSERT INTO employee (emp_id, emp_name, email, password, mobile, address, date_of_join, gender, status) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    connection.query(sqlQuery, [emp_id, emp_name, email, hashedPassword, mobile, address, date_of_join, gender, status], (error, result) => {
      if (error) {
        console.error("Error executing query", error);
        res.status(500).json({ error: "An error occurred while adding the employee." });
      } else {
        res.json({
          message: "Employee successfully added",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    console.error("Error in hashing password or handling request", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};


///////////////////////UPDATE//////////////////////

const edit_emp =async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password.toString(), 10);
    const emp_id = req.params.emp_id;
    const data = {
      emp_name: req.body.emp_name,
      email: req.body.email,
      password: hashedPassword,
      mobile: req.body.mobile,
      address: req.body.address,
      date_of_join: req.body.date_of_join,
      gender: req.body.gender,
      status: req.body.status,
    };

    const sqlQuery = `
        UPDATE employee 
        SET 
          emp_name = $1, 
          email = $2, 
          password = $3, 
          mobile = $4, 
          address = $5, 
          date_of_join = $6, 
          gender = $7, 
          status = $8 
        WHERE 
          emp_id = $9 
        RETURNING *;
      `;

    const values = [
      data.emp_name,
      data.email,
      data.password,
      data.mobile,
      data.address,
      data.date_of_join,
      data.gender,
      data.status,
      emp_id
    ];

    connection.query(sqlQuery, values, (error, result) => {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
      } else {
        res.json({
          message: "Employee successfully updated",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ error: error.message });
  }
};




//////////////////////////DELETE/////////////////////////////////

const delete_emp = (req, res) => {
  try {
    const emp_id = req.params.emp_id;
    const sqlQuery = `DELETE FROM employee where emp_id =$1 `;
    connection.query(sqlQuery, [emp_id], (error, result) => {
      if (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
      } else {
        res.json({
          message: "Employee Deleted successfuly ",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    console.log("Error", error.sqlMessage);
    res.status(500).json({ error: error.sqlMessage });
  }
};

///////////////////////////////////////////////GET EMP PROFILE/////////////////


const view_emp_emp_profile = (req, res) => {
  try {
    const emp_id = req.params.emp_id
    let sqlQuery = "select * from employee e join employee_profile p on e.emp_id = p.emp_id where e.emp_id = $1";
    connection.query(sqlQuery, [emp_id], function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        return res.status(500).json({ error: error.sqlMessage });
      } else {
        return res.json(result);
      }
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: error.message });
  }
};


///////////////////////////////////////

const employeeLogin = (req, res) => {
  try {
    const psqlQuery = `SELECT e.emp_id, e.emp_name, e.email, e.password,e.mobile, e.address,e.date_of_join,e.gender,e.status, string_agg(r.role_name, ', ') AS roles
FROM employee e
LEFT JOIN role_assign ra ON e.emp_id = ra.emp_id
LEFT JOIN role r ON ra.role_id = r.role_id
WHERE e.email = $1
GROUP BY e.emp_id;
`;

    // console.log("Executing query:", psqlQuery);
    connection.query(psqlQuery, [req.body.email], (error, result) => {
      if (error) {
        // console.error("Query Error:", error);
        return res.json({ loginStatus: false, Error: "Query Error" });
      }

      if (result.rows.length > 0) {
        const user = result.rows[0];
        // console.log("User found:", user);

        bcrypt.compare(req.body.password, user.password, (error, isMatch) => {
          if (error) {
            // console.error("Password Compare Error:", error);
            return res.json({ loginStatus: false, Error: "Password Compare Error" });
          } else if (isMatch) {
            const email = user.email;
            const role = user. roles;
            const token = jwt.sign({  roles: role, email: email }, 'jwt_secret_key', { expiresIn: '1d' });
            res.cookie('shashank', token);
            console.log("Login successful, token generated:", token);
            return res.json({ loginStatus: true });
          } else {
            console.log("Invalid password for email:", req.body.email);
            return res.json({ loginStatus: false, Error: "Invalid password" });
          }
        });
      } else {
        console.log("Email not found:", req.body.email);
        return res.json({ loginStatus: false, emp_id: result[0].emp_id, Error: "Email does not exist" });
      }
    });
  } catch (err) {
    console.error("Login error", err);
    return res.json({ loginStatus: false, Error: "Login error in server" });
  }
}

/////////////////////////////////////////////////////

const verifyToken = (req, res, next) => {
  const token = req.cookies.shashank;
  console.log(token)
  if (!token) {
    return res.json({ Error: "You are not authanticated" });
  } else {
    try {
      jwt.verify(token, 'jwt_secret_key', (err, decoded) => {
        if (err) {
          return res.json({ Error: "token is not okey" });
        } else {
          req.emp_id = decoded.emp_id;
          req.emp_name = decoded.emp_name;
          req.email = decoded.email;
          req.roles = decoded.roles;
          next();
        }
      })
    }
    catch (err) {
      console.error("You are not authanticated", err);
      return res.json({ loginStatus: false, Error: "You are not authanticated" });
    }
  }
}

const verifyUser = (req, res) => {
  return res.json({ Status: 'Success', emp_id: req.emp_id, email: req.email, emp_name: req.emp_name, roles: req.roles})
}






module.exports = { view_emp, register_emp, edit_emp, delete_emp, view_emp_emp_profile, employeeLogin, verifyToken, verifyUser };