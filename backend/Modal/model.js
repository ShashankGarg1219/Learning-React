let pg = require('pg')
let connection = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"ed_tech1",
    port:5432,
    password:"12345"
})

connection.connect(function(error,result){
    if(error){
            console.log("Error",error.sqlMessage)
    }
    else{
            console.log("connected to database")
    }
})


module.exports = connection;