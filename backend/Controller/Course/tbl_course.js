const connection = require('../../Modal/model');

///////////////////////////GET////////////////////////////

const view_course = async (req, res) => {
    const selectQuery = 'SELECT * FROM courses';
    try {
        const result = await connection.query(selectQuery);
        res.send(result.rows);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).send("Database query error");
    }
};

//////////////////POST/////////////////////

const register_course = (req, res) => {
    try {
        const { course_id , course_name, syllabus , status, description } = req.body;
        const sqlQuery = 'INSERT INTO courses (course_id , course_name, syllabus , status, description) VALUES($1,$2,$3,$4,$5)';
        connection.query(sqlQuery, [course_id , course_name, syllabus , status, description], (error, result) => {
            if (error) {
                console.log("Error", error.sqlMessage);
                res.status(500).json({ error: error.sqlMessage });
            } else {
                res.json({
                    message: "Courses successfully added",
                    data: result.rows[0],
                });
            }
        });
    } catch (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
    }
};

///////////////////////////////PUT///////////////////////////

const edit_course = (req, res) => {
    try {
      const course_id = req.params.course_id;
      const { course_name, syllabus, status, description } = req.body;
  
      const sqlQuery = `
        UPDATE courses
        SET 
          course_name = $1, 
          syllabus = $2, 
          status = $3, 
          description = $4
        WHERE 
          course_id = $5
        RETURNING *;
      `;
  
      const values = [
        course_name, 
        syllabus, 
        status, 
        description,  
        course_id
      ];
  
      connection.query(sqlQuery, values, (error, result) => {
        if (error) {
          console.error("Database Error:", error.message);
          res.status(500).json({ error: error.message });
        } else if (result.rows.length === 0) {
          res.status(404).json({ message: "Course not found" });
        } else {
          res.json({
            message: "Course successfully updated",
            data: result.rows[0],
          });
        }
      });
    } catch (error) {
      console.error("Server Error:", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  

  




module.exports = { view_course, register_course, edit_course};
