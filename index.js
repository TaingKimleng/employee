const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./dbconnect'); // must come before models

const app = express();
app.use(bodyParser.json());

connectDB(); // 🔥 Call once and only here

const PersonModel = require('./person_schema');
const TaskModel = require('./task_schema');
const SubmitTaskModel = require('./submittask_schema');

/*
In the postman use the following URL
localhost:5004/viewalltask
*/

//View task submission API
app.get('/tasksubmission', (req, res) => {
    console.log("INSIDE EMPLOYEE TASK SUBMISSION API")
    TaskModel.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
});//CLOSE GET


/*
In the postman use the following URL
localhost:5004/updateprofile/4924

{
  "newpassword":"xyz",
  "newmobile":"9874563"
}

*/
//employee daily task API
app.get('/dailytask/:sid', (req, res) => {
  console.log("INSIDE EMPLOYEE TASK API")
  PersonModel.findOneAndUpdate({ "id": parseInt(req.params.sid) },
  {
    $set: {
      "pass": req.body.newpassword,
      "mobile": req.body.newmobile
    }
  }, { new: true })
  .then(getupdateddocument => {
    if (getupdateddocument != null)
      res.status(200).send('DOCUMENT UPDATED ' + getupdateddocument);
    else
      res.status(404).send('INVALID ID ' + req.params.sid);
  }) // CLOSE THEN
  .catch(err => {
    return res.status(500).send({ message: "DB Problem..Error in UPDATE with id " + req.params.empid });
  }) // CLOSE CATCH
} //CLOSE CALLBACK FUNCTION
); //CLOSE PUT METHOD

/*
In the postman use the following URL
localhost:5004/submittask

{
  "taskid":"5131",
  "employeename":"tom",
  "description":"ABCD"
}

*/
//Work schedule API
app.post('/work schedule', (req, res) => {
  console.log("INSIDE EMPLOYEE WORK SCHEDULE API")
  const aobj = new SubmitTaskModel({
          taskid: req.body.taskid,
          employeename: req.body.employeename,
          description: req.body.description,
        });//CLOSE Task Model
          
        //INSERT/SAVE THE RECORD/DOCUMENT
        aobj.save()
            .then(inserteddocument => {
              res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE');
            })//CLOSE THEN
            .catch(err => {
              res.status(500).send({ message: err.message || 'Error in Employee Save ' })
            });//CLOSE CATCH
        }//CLOSE CALLBACK FUNCTION BODY
        );//CLOSE POST METHOD

// START THE EXPRESS SERVER.
app.listen(5004, () =>
    console.log('EXPRESS Server Started at Port No: 5004'));


