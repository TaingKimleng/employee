const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');
const TaskModel = require('./task_schema.js');
const SubmitTaskModel = require('./submittask_schema.js');

// VIEW ALL TASKS (for employee)
app.get('/viewalltask', (req, res) => {
  console.log("INSIDE EMPLOYEE - VIEW ALL TASKS API");
  TaskModel.find()
    .then(tasks => {
      res.status(200).send(tasks);
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error fetching tasks' });
    });
});

// VIEW WORK SCHEDULE for specific employee
app.get('/workschedule/:sid', (req, res) => {
  console.log("INSIDE EMPLOYEE - VIEW WORK SCHEDULE API");

  SubmitTaskModel.find({ taskid: req.params.sid })
    .then(tasks => {
      if (tasks.length > 0) {
        res.status(200).send(tasks);
      } else {
        res.status(404).send({ message: 'No schedule found for task ID: ' + req.params.sid });
      }
    })
    .catch(err => {
      res.status(500).send({ message: 'Error fetching schedule: ' + err.message });
    });
});

// SUBMIT TASK
app.post('/submittask', (req, res) => {
  console.log("INSIDE EMPLOYEE - SUBMIT TASK API");

  const task = new SubmitTaskModel({
    taskid: req.body.taskid,
    employeename: req.body.employeename,
    description: req.body.description
  });

  task.save()
    .then(() => {
      res.status(201).send({ message: 'Task submitted successfully' });
    })
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error submitting task' });
    });
});

// START EMPLOYEE SERVER
app.listen(5004, () => {
  console.log('Employee Server started on port 5004');
});
