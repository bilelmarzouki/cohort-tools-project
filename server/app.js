try {
  process.loadEnvFile();
} catch (erros) {
  console.log(".env file not found");
}

const express = require("express");
/*const students =require("./students.json")*/
/*const cohorts =require("./cohorts.json")*/
const cors = require("cors");
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
// app.js

// ...

const mongoose = require("mongoose");
const Student = require("./models/Student.model.js"); // ← YOUR IMPORT!
const Cohort = require("./models/Cohort.model.js");


mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// ...

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const port = process.env.PORT || 5005;

//configurations
const morgan = require("morgan");
app.use(morgan("dev"));

// static files
app.use(express.static("public"));
// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  }),
);
/*app.use(cors({
  origin: "*"
}))*/
// ...
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:

// ...
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});

/*app.get("/api/students",(req, res)=>{
res.json(students)
})*/

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    console.log(error);
  }
});


///students API
app.post("/api/students" ,async (req,res) =>{
  try {
    await Student.create(req.body)
    res.send("done")
  } catch (error) {
    console.log(error)
  }
})

app.get("/api/students" , async(req,res)=>{
  try {
    const response = await Student.find().populate("cohort")
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

app.get("/api/students/cohort/:cohortId",async(req,res)=>{
  try {
    const {cohortId} =req.params
    const response = await Student.find().populate("cohort")
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

app.get("/api/students/:studentId" , async(req,res)=>{
  try {
    const {studentId} =req.params
    const response = await Student.findById(studentId).populate("cohort")
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

app.put("/api/students/:studentId" , async(req,res)=>{
  try {
    const {studentId} =req.params
    const response = await Student.findByIdAndUpdate(studentId, req.body, {new:true})
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

app.delete("/api/students/:studentId" , async(req,res)=>{
  try {
    const {studentId} =req.params
    await Student.findByIdAndDelete(studentId)
    res.send("deleted")
  } catch (error) {
    console.log(error)
  }
})





// cohorts

app.post("/api/cohorts" ,async (req,res) =>{
  try {
    await Cohort.create(req.body)
    res.send("done")
  } catch (error) {
    console.log(error)
  }
})

app.get("/api/cohorts" , async(req,res)=>{
  try {
    const response = await Cohort.find()
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})


app.get("/api/cohorts/:cohortId" , async(req,res)=>{
  try {
    const {cohortId} =req.params
    const response = await Cohort.findById(cohortId)
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

app.put("/api/cohorts/:cohortId" , async(req,res)=>{
  try {
    const {cohortId} =req.params
    const response = await Cohort.findByIdAndUpdate(cohortId, req.body, {new:true})
    res.json(response)
  } catch (error) {
    console.log(error)
  }
})

app.delete("/api/cohorts/:cohortId" , async(req,res)=>{
  try {
    const {cohortId} =req.params
    await Cohort.findByIdAndDelete(cohortId)
    res.send("deleted")
  } catch (error) {
    console.log(error)
  }
})

// START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
