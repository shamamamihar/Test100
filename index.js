require("dotenv").config();
const express = require("express");
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const db = require("./database/db");
const app = express();
require("./database/db");


app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({extended: true}));


app.get("/", (req, res) =>{
   res.send("Welcome to Elzian Agro DB server")
});

app.get("/api/get", (req, res) =>{
   const sqlGet = "SELECT * FROM employee_db";
   db.query(sqlGet, (error, result) =>{
      res.send(result);
   });
});

app.post("/api/post", (req,res) =>{
   const {emp_name, emp_contact, emp_email} = req.body;
   const sqlInsert = "INSERT INTO employee_db (emp_name, emp_contact, emp_email) VALUES (?, ?, ?)";
   db.query(sqlInsert, [emp_name, emp_contact, emp_email], (error, result) =>{
      if(error){
         console.log(error);
      }
   });
});

app.delete("/api/remove/:id", (req,res) =>{
   const {id} = req.params;
   const sqlRemove = "DELETE FROM employee_db WHERE id = ?";
   db.query(sqlRemove, id, (error, result) =>{
      if(error){
         console.log(error);
      }
   });
});

app.get("/api/get/:id", (req, res) =>{
   const {id} = req.params;
   const sqlGet = "SELECT * FROM employee_db WHERE id = ?";
   db.query(sqlGet, id, (error, result) =>{
      if(error){
         console.log(error);
      }
      res.send(result);
   });
});


app.put("/api/update/:id", (req, res) =>{
   const {id} = req.params;
   const {emp_name, emp_contact, emp_email} = req.body;
   const sqlUpdate = "UPDATE employee_db SET emp_name = ?, emp_contact = ?, emp_email = ? WHERE id = ?";
   db.query(sqlUpdate, [emp_name, emp_contact, emp_email, id], (error, result) =>{
      if(error){
         console.log(error);
      }
      res.send(result);
   });
});

app.listen(5000, () =>{
   console.log("Elzian Agro server is running 5000 port");
})
