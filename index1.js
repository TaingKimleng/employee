const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// DB and Models
const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');
const TaskModel = require('./task_schema.js');
const SubmitTaskModel = require('./submittask_schema.js');
dbconnect();
// ------------------------------
// View All Task Submissions
// ------------------------------
/*
In Postman:
GET http://localhost:5004/tasksubmission
*/
app.get('/tasksubmission', (req, res) => {
  console.log("INSIDE EMPLOYEE TASK SUBMISSION API");
  TaskModel.find()
    .then(tasks => res.status(200).json(tasks))
    .catch(err => res.status(500).send({ message: err.message || 'Error fetching tasks' }));
});

// ------------------------------
// Update Employee Profile
// ------------------------------
/*
In Postman:
PUT http://localhost:5004/dailytask/4924
Body:
{
  "newpassword": "xyz",
  "newmobile": "9874563"
}
*/
app.put('/dailytask/:sid', (req, res) => {
  console.log("INSIDE EMPLOYEE TASK API");
  PersonModel.findOneAndUpdate(
    { "id": parseInt(req.params.sid) },
    {
      $set: {
        "pass": req.body.newpassword,
        "mobile": req.body.newmobile
      }
    },
    { new: true }
  )
    .then(updatedDoc => {
      if (updatedDoc)
        res.status(200).json(updatedDoc);
      else
        res.status(404).send('INVALID ID ' + req.params.sid);
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating profile: " + err.message });
    });
});

// ------------------------------
// Submit Task API
// ------------------------------
/*
In Postman:
POST http://localhost:5004/workschedule
Body:
{
  "taskid":"5131",
  "employeename":"tom",
  "description":"ABCD"
}
*/
app.post('/workschedule', (req, res) => {
  console.log("INSIDE EMPLOYEE WORK SCHEDULE API");
  const newTask = new SubmitTaskModel({
    taskid: req.body.taskid,
    employeename: req.body.employeename,
    description: req.body.description,
  });

  newTask.save()
    .then(insertedDoc => res.status(201).json(insertedDoc))
    .catch(err => res.status(500).send({ message: err.message || 'Error saving task submission' }));
});

// ------------------------------
// Start Server
// ------------------------------
app.listen(5004, () => {
  console.log('EXPRESS Server Started at Port No: 5004');
});
