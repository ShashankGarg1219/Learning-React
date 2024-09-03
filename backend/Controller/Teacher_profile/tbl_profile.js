const connection = require('../../Modal/model');

////////////////////////////GET///////////////////////////
const show_profile = async (req, res) => {
    const selectQuery = 'SELECT * FROM teacher_profile';
    try {
        const result = await connection.query(selectQuery);
        res.send(result.rows);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).send("Database query error");
    }
};

///////////////////////POST/////////////////////////////////

const attach_profile = (req, res) => {
    try {
      const { teacher_id, adhar, experience, date_of_join, photo, documents } = req.body;
      const sqlQuery = `
        INSERT INTO teacher_profile (teacher_id, adhar, experience, date_of_join, photo, documents) 
        VALUES($1,$2,$3,$4,$5,$6) 
        RETURNING *;
      `;
  
      connection.query(sqlQuery, [teacher_id, adhar, experience, date_of_join, photo, documents], (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else {
          res.json({
            message: "Teacher successfully added",
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

  const edit_teaprofile = (req, res) => {
    try {
      const teacher_id = req.params.teacher_id;
      const {adhar,experience, date_of_join, photo, documents } = req.body;
  
      const sqlQuery = `
        UPDATE teacher_profile
        SET 
          adhar = $1, 
          experience = $2, 
          date_of_join = $3,  
          photo = $4,
          documents = $5
        WHERE 
          teacher_id = $6
        RETURNING *;
      `;
  
      const values = [
        adhar, 
        experience, 
        date_of_join, 
        photo, 
        documents, 
        teacher_id
      ];
  
      connection.query(sqlQuery, values, (error, result) => {
        if (error) {
          console.log("Error", error.message);
          res.status(500).json({ error: error.message });
        } else if (result.rows.length === 0) {
          res.status(404).json({ message: "teacher profile not found" });
        } else {
          res.json({
            message: "Teacher profile successfully updated",
            data: result.rows[0],
          });
        }
      });
    } catch (error) {
      console.log("Error", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

  


module.exports = {show_profile, attach_profile, edit_teaprofile}


