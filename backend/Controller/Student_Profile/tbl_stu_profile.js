const connection = require('../../Modal/model');

////////////////////////GET////////////////////////////////
const view_profile = async (req, res) => {
    const selectQuery = 'SELECT * FROM student_profile';
    try {
        const result = await connection.query(selectQuery);
        res.send(result.rows);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).send("Database query error");
    }
};
///////////////////////POST/////////////////////////////////

const add_profile = (req, res) => {
    try {
      const { stu_id, adhar,student_class, state, city, fee_status, photo, documents } = req.body;
      const sqlQuery = `
        INSERT INTO student_profile (stu_id, adhar, student_class, state, city, fee_status, photo, documents) 
        VALUES($1,$2,$3,$4,$5,$6,$7,$8) 
        RETURNING *;
      `;
  
      connection.query(sqlQuery, [stu_id, adhar, student_class, state, city, fee_status, photo, documents], (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else {
          res.json({
            message: "Student successfully added",
            data: result.rows[0],
          });
        }
      });
    } catch (error) {
      console.log("Error", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  ///////////////////////////put///////////////////////////

  const edit_stuprofile = (req, res) => {
    try {
      const stu_id = req.params.stu_id;
      const { adhar, student_class, state, city, fee_status, photo, documents } = req.body;
  
      const sqlQuery = `
        UPDATE student_profile
        SET 
          adhar = $1, 
          student_class = $2, 
          state = $3, 
          city = $4,
          fee_status = $5, 
          photo = $6,
          documents = $7
        WHERE 
          stu_id = $8
        RETURNING *;
      `;
  
      const values = [
        adhar, 
        student_class, 
        state, 
        city, 
        fee_status, 
        photo, 
        documents, 
        stu_id
      ];
  
      connection.query(sqlQuery, values, (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else if (result.rows.length === 0) {
          res.status(404).json({ message: "Student profile not found" });
        } else {
          res.json({
            message: "Student profile successfully updated",
            data: result.rows[0],
          });
        }
      });
    } catch (error) {
      console.log("Error", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

  


module.exports = {view_profile, add_profile, edit_stuprofile}