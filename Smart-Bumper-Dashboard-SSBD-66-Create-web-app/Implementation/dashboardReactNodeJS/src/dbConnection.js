// Require mysql (if error: do 'npm instal mysql')
var mysql = require('mysql2');

// Set up connection
var con = mysql.createConnection({
    host: "localhost",
    port: 8089,
    user: "root",
    password: "password"
  });

  // Test connection
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });