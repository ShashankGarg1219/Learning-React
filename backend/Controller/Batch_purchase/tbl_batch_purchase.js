const connection = require('../../Modal/model');

/////////////////////Get////////////////////////////

const view_purchase = async (req, res) => {
    const selectQuery = 'SELECT * FROM batch_purchase';
    try {
        const result = await connection.query(selectQuery);
        res.send(result.rows);
    } catch (error) {
        console.log("Error", error.message);
        res.status(500).send("Database query error");
    }
};
/////////////////////////////////////////////////////
const add_purchase = (req, res) => {
    try {
        const { course_id, batch_id, stu_id, fees, payment_mode } = req.body;
        const sqlQuery = 'INSERT INTO batch_purchase (course_id, batch_id, stu_id, fees, payment_mode) VALUES($1,$2,$3,$4,$5)';
        connection.query(sqlQuery, [course_id, batch_id, stu_id, fees, payment_mode], (error, result) => {
            if (error) {
                console.log("Error", error.sqlMessage);
                res.status(500).json({ error: error.sqlMessage });
            } else {
                res.json({
                    message: "batch purchase successfully added",
                    data: result.rows[0],
                });
            }
        });
    } catch (error) {
        console.log("Error", error.sqlMessage);
        res.status(500).json({ error: error.sqlMessage });
    }
};



module.exports = { view_purchase, add_purchase };