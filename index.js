const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'build', 'index.html'));
});

const dataFilePath = "./test.json";

function readDataFile() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    //console.log(data);
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data file:", error);
    return [];
  }
}

function writeDataFile(data) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to data file:", error);
  }
}

let port = 5000;

app.get("/", (req, res) => {
 // console.log("Pradeep fro data reading");
  const records = readDataFile();
  //console.log(records);
  res.json({ records });
});

app.post("/addemployee", (req, res) => {
  let records = readDataFile();
  const { firstname, lastname, age, dob, salary, department } = req.body.data;
  const newRecord = { firstname, lastname, age, dob, salary, department };
  if (firstname === undefined || lastname === undefined || age === undefined || dob === undefined || salary === undefined || department === undefined) {
    return res.json({records});
  } 
  records.push(newRecord);
  writeDataFile(records);
  res.json({ records });
});

app.get("/getemployeebyage/:age", (req, res) => {
  const age = req.params.age;
  let records = readDataFile();
  const filteredRecords = records.filter((record) => record.age == age);
  res.json({ records: filteredRecords });
});

app.get("/getemployeebyname/:name", (req, res) => {
  const name = req.params.name;
  let records = readDataFile();
  const filteredRecords = records.filter((record) =>
    record.firstname.toLowerCase().includes(name.toLowerCase()) || 
    record.lastname.toLowerCase().includes(name.toLowerCase())
  );
  res.json({ records: filteredRecords });
});

app.put("/updateemployee/:index", (req, res) => {
  const index = req.params.index;
  const { firstname, lastname, age, dob, salary, department } = req.body;

  let records = readDataFile();
  records[index] = { firstname, lastname, age, dob, salary, department };
  writeDataFile(records);

  res.json({ records });
});

app.delete("/deleteemployee/:index", (req, res) => {
  const index = req.params.index;

  let records = readDataFile();
  records.splice(index, 1);
  writeDataFile(records);

  res.json({ records });
});

/*app.get("/avg/", (req, res) => {
  const Data = readDataFile();
  console.log(Data);
  const totalSalary = Data.reduce((sum,currentemp) => {
    return sum + currentemp.salary;
  })
  const avgSalary = totalSalary / Data.length();
  return res.status(200).json(avgSalary);
})*/
app.listen(port, (err) => {
  if (err) console.log(err);
  else {
    console.log("Server Listening at port: 5000");
  }
});
