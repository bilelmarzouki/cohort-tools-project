try {
    process.loadEnvFile()
} catch (erros) {
    console.log(".env file not found")
}

const express = require("express");
const students =require("./students.json")
const cohorts =require("./cohorts.json")
const cors= require('cors')
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...


// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();
const port = process.env.PORT ||5005

//configurations
const morgan = require("morgan");
app.use(morgan("dev"));

// static files
app.use(express.static("public"));
// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
  })
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

app.get("/api/students",(req, res)=>{
  res.json(students)
})

app.get("/api/cohorts",(req, res)=>{
  res.json(cohorts)
})

// START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});