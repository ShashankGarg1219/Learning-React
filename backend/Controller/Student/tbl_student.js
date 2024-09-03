const connection = require('../../Modal/model');

////////////////////////////GET///////////////////////////
const view_student = async (req, res) => {
    const selectQuery = 'SELECT * FROM student';
    try {
        const result = await connection.query(selectQuery);
        res.send(result.rows);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).send("Database query error");
    }
};

///////////////////////POST/////////////////////////////////

const add_student = (req, res) => {
    try {
        const { stu_id, stu_name, email, password, date_of_join, mobile_no, gender, status } = req.body;
        const sqlQuery = 'INSERT INTO student (stu_id, stu_name, email, password, date_of_join, mobile_no, gender, status) VALUES($1,$2,$3,$4,$5,$6,$7,$8)';
        connection.query(sqlQuery, [stu_id, stu_name, email, password, date_of_join, mobile_no, gender, status], (error, result) => {
            if (error) {
                console.log("Error", error.sqlMessage);
                res.status(500).json({ error: error.sqlMessage });
            } else {
                res.json({
                    message: "student successfully added",
                    data: result.rows[0],
                });
            }
        });
    } catch (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
    }
};
//////////////////////////////UPDATE////////////////////////////////

const edit_student = (req, res) => {
   
    try {
       
        const stu_id = req.params.stu_id;
        const data = {
            stu_name: req.body.stu_name,
            email: req.body.email,
            password: req.body.password,
            date_of_join: req.body.date_of_join,
            mobile_no: req.body.mobile_no,
            gender: req.body.gender,
            status: req.body.status,
        };
   
        const sqlQuery = `UPDATE student 
        SET 
        stu_name = $1, 
        email = $2, 
        password = $3, 
        date_of_join = $4,
        mobile_no = $5, 
        gender = $6,
        status = $7
      WHERE 
        stu_id = $8
      RETURNING *;
    `;

    const values = [
        data.stu_name, 
        data.email, 
        data.password, 
        data.date_of_join, 
        data.mobile_no, 
        data.gender, 
        data.status, 
        stu_id
      ];
  
      connection.query(sqlQuery, values, (error, result) => {
        if (error) {
          console.log("Error", error);
          res.status(500).json({ error: error.sqlMessage });
        } else {
          res.json({
            message: "Student successfully updated",
            data: result.rows[0],
          });
        }
      });
    } catch (error) {
      console.log("Error", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  /////////////////////////////////get student profile

  const view_stu_stu_profile = (req, res) => {
    try {
      const stu_id = req.params.stu_id
      let sqlQuery = "select * from student e join student_profile p on e.stu_id = p.stu_id where e.stu_id = $1";
      connection.query(sqlQuery, [stu_id],function (error, result) {
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



module.exports = {view_student, add_student, edit_student, view_stu_stu_profile}