const connection = require('../../Modal/model');

///////////////////////////GET////////////////////////////

const view_batch = async (req, res) => {
    const selectQuery = 'SELECT * FROM batch';
    try {
        const result = await connection.query(selectQuery);
        res.send(result.rows);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).send("Database query error");
    }
};

///////////////////////POST/////////////////////////////////
const add_batch = (req, res) => {
  try {
      const { batch_id, teacher_id, course_id, batch_name, start_date, end_date, mode } = req.body;
      const sqlQuery = 'INSERT INTO batch (batch_id, teacher_id, course_id, batch_name, start_date, end_date, mode) VALUES($1,$2,$3,$4,$5,$6,$7)';
      connection.query(sqlQuery, [batch_id, teacher_id, course_id, batch_name, start_date, end_date, mode], (error, result) => {
          if (error) {
              console.log("Error", error.sqlMessage);
              res.status(500).json({ error: error.sqlMessage });
          } else {
              res.json({
                  message: "batch successfully added",
                  data: result.rows[0],
              });
          }
      });
  } catch (error) {
      console.log("Error", error.sqlMessage);
      res.status(500).json({ error: error.sqlMessage });
  }
};


/////////////////////update/////////////////
const edit_batch = (req, res) => {
    try {
      const batch_id = req.params.batch_id;
      const data = {
        teacher_id: req.body.teacher_id,
        course_id: req.body.course_id,
        batch_name: req.body.batch_name,
        start_date: req.start_date,
        end_date: req.body.end_date,
        mode: req.body.mode
      };
  
      const sqlQuery = `
        UPDATE batch 
        SET 
          teacher_id = $1, 
          course_id = $2, 
          batch_name = $3, 
          start_date = $4, 
          end_date = $5, 
          mode = $6 
        WHERE 
          batch_id = $7
        RETURNING *;
      `;
      
      const values = [
        data.teacher_id, 
        data.course_id, 
        data.batch_name, 
        data.start_date, 
        data.end_date, 
        data.mode, 
        batch_id
      ];
  
      connection.query(sqlQuery, values, (error, result) => {
        if (error) {
          console.log("Error", error.sqlMessage);
          res.status(500).json({ error: error.sqlMessage });
        } else {
          res.json({
            message: "Batch successfully updated",
            data: result.rows[0],
          });
        }
      });
    } catch (error) {
      console.log("Error", error.message);
      res.status(500).json({ error: error.message });
    }
  };
  

  




module.exports = { view_batch, add_batch, edit_batch };