const connection = require('../../Modal/model');

//////////////////////////GET////////////////////
const view_assign = async (req, res) => {
    const selectQuery = 'SELECT * FROM role_assign';
    try {
        const result = await connection.query(selectQuery);
        res.send(result.rows);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).send("Database query error");
    }
};

//////////////////////////POST//////////////////////////////

const post_assign = (req, res) => {
    try {
      const { emp_id, role_id } = req.body;
      const sqlQuery = 'INSERT INTO role_assign (emp_id,role_id) VALUES($1,$2)';
      connection.query(sqlQuery, [emp_id, role_id], (error, result) => {
        if (error) {
          console.log("Error", error.sqlMessage);
          res.status(500).json({ error: error.sqlMessage });
        } else {
          res.json({
            message: "Role_assign successfully added",
            data: result.rows[0],
          });
        }
      });
    } catch (error) {
      console.log("Error", error.sqlMessage);
      res.status(500).json({ error: error.sqlMessage });
    }
  };
  ////////////////////////////UPDATE///////////////////////////
  const edit_assign = (req, res) => {
    try {
      const emp_id = req.params.emp_id;
      const role_id = req.body.role_id;
      const sqlQuery = `UPDATE role_assign SET role_id = $1 WHERE emp_id = $2 RETURNING * `;
      connection.query(sqlQuery, [emp_id, role_id], (error, result) => {
        if (error) {
          console.log("Error", error.sqlMessage);
          res.status(500).json({ error: error.sqlMessage });
        } else {
          res.json({
            message: "Role_assign successfully updated",
            data: result.rows[0],
          });
        }
      });
    } catch (error) {
      console.log("Error", error.sqlMessage);
      res.status(500).json({ error: error.sqlMessage });
    }
  }

///////////////////////////////////////////
const view_emp_role_assign = (req, res) => {
  try {
    let sqlQuery = `SELECT employee.emp_id, role_assign.role_id, role.role_name FROM employee INNER JOIN role_assign ON employee.emp_id = role_assign.emp_id INNER JOIN role ON role_assign.role_id = role.role_id`;
    connection.query(sqlQuery, function (error, result) {
      if (error) {
        console.log("Error", error.sqlMessage);
        return res.status(500).json({ error: error.sqlMessage });
      } else {
        return res.json(result);
      }
    });
  } catch (error) {
    console.log("Error", error.message);
    return res.status(500).json({ error: error.message });
  }
};







module.exports = { view_assign, post_assign, edit_assign , view_emp_role_assign}







