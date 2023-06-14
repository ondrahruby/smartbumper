import express from "express"
import mysql2 from "mysql2"
import cors from 'cors'

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

const db = mysql2.createConnection({
    host:"localhost",
    user:"dashborad",
    //port: 3306,
    password:"123",
    database:"smartbumper"
})

app.use(express.json())
app.use(cors({origin: true, credentials: true}));

app.get("/:universalURL", (req, res) => {
    res.send("404 URL NOT FOUND");
 });
// app.get("/",(req,res)=>{
//     res.json("*knocking sound effect*")
// })
app.get("/dock", (req,res)=>{
    const query = "select * from dock"
    db.query(query,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.put("/dock",(req,res)=>{

})

app.post("/dock",(req,res)=>{
    const query = "insert into dock(bumper_id, dock_id, activeFlag, occupied, truck_driver_id) values (?)"
    const values = [req.body.bumper_id, req.body.dock_id, 
        req.body.activeFlag, req.body.occupied, req.body.truck_driver_id];

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json("Dock creation successful")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend")
})