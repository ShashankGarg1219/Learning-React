const connection = require('../../Modal/model');

///////////////////////////GET////////////////////////////

const view_profile = async (req, res) => {
    const selectQuery = 'SELECT * FROM employee_profile';
    try {
        const result = await connection.query(selectQuery);
        res.send(result.rows);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).send("Database query error");
    }
};
/////////////////////////////////////////////////////////////////
// Get a profile by emp_id
// router.get async (req, res) => {
//   const { emp_id } = req.params;
//   try {
//     const result = await pool.query('SELECT * FROM employee_profile WHERE emp_id = $1', [emp_id]);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });






////////////////////////////POST//////////////////////////////

const add_profile = (req, res) => {
    try {
        const { emp_id, adhar, alternate_mobile, photo, city, state, work_experience, documents } = req.body;
        const sqlQuery = 'INSERT INTO employee_profile (emp_id, adhar, alternate_mobile, photo, city, state, work_experience, documents) VALUES($1,$2,$3,$4,$5,$6,$7,$8)';
        connection.query(sqlQuery, [emp_id, adhar, alternate_mobile, photo, city, state, work_experience, documents], (error, result) => {
            if (error) {
                console.log("Error", error);
                res.status(500).json({ error: error.sqlMessage });
            } else {
                res.json({
                    message: "Employee_profile successfully added",
                    data: result.rows[0],
                });
            }
        });
    } catch (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
    }
};

///////////////////////UPDATE//////////////////////

const edit_profile = (req, res) => {
  try {
    const emp_id = req.params.emp_id;
    const { adhar, alternate_mobile, photo, city, state, work_experience, documents } = req.body;

    const sqlQuery = `
      UPDATE employee_profile
      SET 
        adhar = $1, 
        alternate_mobile = $2, 
        photo = $3, 
        city = $4, 
        state = $5, 
        work_experience = $6, 
        documents = $7
      WHERE 
        emp_id = $8 
      RETURNING *;
    `;

    const values = [
      adhar, 
      alternate_mobile, 
      photo, 
      city, 
      state, 
      work_experience, 
      documents, 
      emp_id
    ];

    connection.query(sqlQuery, values, (error, result) => {
      if (error) {
        console.log("Error", error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.json({
          message: "Employee_profile successfully updated",
          data: result.rows[0],
        });
      }
    });
  } catch (error) {
    console.log("Error", error.message);
    res.status(500).json({ error: error.message });
  }
};

  

  //////////////////////////////////////////////








module.exports = { view_profile, add_profile, edit_profile };