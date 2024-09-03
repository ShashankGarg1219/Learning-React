const connection = require('../../Modal/model');
const bcrypt = require('bcrypt');


////////////////////////////GET///////////////////////////
const view_teacher = async (req, res) => {
    const selectQuery = 'SELECT * FROM teacher';
    try {
        const result = await connection.query(selectQuery);
        res.send(result.rows);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).send("Database query error");
    }
};

///////////////////////POST/////////////////////////////////


const add_teacher = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const { teacher_id, teacher_name, email, qualification, status, gender, mobile_no } = req.body;
        
        const sqlQuery = 'INSERT INTO teacher (teacher_id, teacher_name, email, password, qualification, status, gender, mobile_no) VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
        
        const values = [teacher_id, teacher_name, email, hashedPassword, qualification, status, gender, mobile_no];
        
        connection.query(sqlQuery, values, (error, result) => {
            if (error) {
                console.log("Database Error:", error.message);
                return res.status(500).json({ error: error.message });
            }
            res.status(201).json({
                message: "Teacher successfully added",
                data: result.rows[0],
            });
        });
    } catch (error) {
        console.log("Server Error:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { add_teacher };


////////////////////////////update///////////////////////

const edit_teacher = async(req, res) => {
   
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const teacher_id = req.params.teacher_id;
        const data = {
            teacher_name: req.body.teacher_name,
            email: req.body.email,
            password: hashedPassword,
            qualification: req.body.qualification,
            status: req.body.status,
            gender: req.body.gender,
            mobile_no: req.body.mobile_no
        };
   
        const sqlQuery = `UPDATE teacher 
        SET 
        teacher_name = $1, 
        email = $2, 
        password = $3, 
        qualification = $4,
        status = $5, 
        gender = $6,
        mobile_no = $7
      WHERE 
        teacher_id = $8
      RETURNING *;
    `;

    const values = [
        data.teacher_name, 
        data.email, 
        data.password, 
        data.qualification, 
        data.status, 
        data.gender, 
        data.mobile_no, 
        teacher_id
      ];
  
      connection.query(sqlQuery, values, (error, result) => {
        if (error) {
          console.log("Error", error);
          res.status(500).json({ error: error.sqlMessage });
        } else {
          res.json({
            message: "Teacher successfully updated",
            data: result.rows[0],
          });
        }
      });
    } catch (error) {
      console.log("Error", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  ////////////////////////////////////////////////////////////////////////////////
  const view_teacher_teacher_profile = (req, res) => {
    try {
      const teacher_id = req.params.teacher_id
      let sqlQuery = "select * from teacher e join teacher_profile p on e.teacher_id = p.teacher_id where e.teacher_id = $1";
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





module.exports = {view_teacher, add_teacher, view_teacher_teacher_profile, edit_teacher}