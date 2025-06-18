const express = require('express');
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./person_schema.js');
const dailytaskModel = require('./dailytask_schema.js');
const SubmitAssignmentModel = require('./submittask_schema.js');

/*
In the postman use the following URL
localhost:5004/viewschedule
*/

//VIEW WORK SCHEDULE API
app.get('/viewschedule', (req, res) => {
    console.log("INSIDE VIEW WORK SCHEDULE API")
    PersonModel.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
});//CLOSE GET


/*
In the postman use the following URL
localhost:5004/dailytask

{
  "newpassword":"xyz",
  "newmobile":"9874563"
}

*/
//DAILY TASK API
app.put('/dailytask/:sid', (req, res) => {
  console.log("INSIDE DAILY TASK ASSIGNMENT API")
  dailytaskModel.findOneAndUpdate({ "id": parseInt(req.params.sid) },
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
  "assignmentid":"5131",
  "studentname":"tom",
  "description":"ABCD"
}

*/
//SUBMIT TASK API
app.post('/submittask', (req, res) => {
  console.log("INSIDE TASK SUBMISSION API")
  const aobj = new SubmitAssignmentModel({
          assignmentid: req.body.assignmentid,
          studentname: req.body.studentname,
          description: req.body.description,
        });//CLOSE TASKModel
          
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


