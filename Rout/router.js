const express = require("express");
const router = express.Router();
const form = require("../models/FormSchema");
const jwt = require("jsonwebtoken");
// const user = require("../models/user");

const student = require("../models/StudentSchema");
require("dotenv").config();
const {
  userdata,
  usernames,
  getformdata,
  getProposalData,
  // student_data,
} = require("./Datacontroller");
const {login, signup, about} = require("./AuthController");
const {formdata, updateStatus, ProposalForm} = require("./Form");
// **********  START OF Middleware for authentication

const authy = async (req, res, next) => {
  try {
    const verifyuser = await jwt.verify(req.cookies.jwt, process.env.SECRET);
    const mainuser = await student.findOne({
      _id: verifyuser._id,
      // "tokens.token": req.cookies.jwt,
    });
    // console.log(verifyuser, mainuser, "your user");
    if (!mainuser) {
      res.set("Access-Control-Allow-Origin", "*");
      res.status(400).send("invalid");
    }
    // console.log(mainuser.formid);
    // console.log(mainuser.formid);
    // const formdata = await form.findOne({_id: formid});
    // console.log(formdata.mem1, formdata.mem2, formdata.mem3);
    req.mainuser = mainuser;
    req.name = mainuser.s_name;
    req.id = mainuser.id;
    if (mainuser.formid) {
      console.log("form id is present");
      req.formid = mainuser.formid;
    } else {
      console.log(" form id is not presnt present");
    }

    next();
  } catch (error) {
    res.set("Access-Control-Allow-Origin", "*");
    res.status(400).send(error);
  }
};

// *********** END OF MIDDLEWARE ********
router.get("/", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send("Hurray you got th response");
});
// ****************Route for adding student data to databse
router.post("/student/signup", signup);
// ************************route for login
router.post("/student/login", login);

// *********************Route for adding form data to databse************
router.post("/student/form", formdata);

//***route for getting form data */

router.get("/student/getformdata/:rollNo", getformdata); //`${}

//****************USED FOR AUTHENTICATION*/
router.get("/student/about", authy, about);

// ***********THIS ROUTE IS TO FETCH SPECIFIC STUDENT DATA****************
router.get("/student/:id", userdata);
//****************  ROUTE FOR FETCHING ALL STUDENT LIST */
router.get("/student/all/rollNo", usernames);

// // ********** ROUTE FOR FETCHING ON THE BASIS OF NAME
// router.get("/studentof/:name", student_data);

//****ROUTE FOR THE ACCEPT OR REJECT GROUP INVITE */
router.post("/student/status", updateStatus);
router.post("/student/proposalForm", ProposalForm);
router.get("/student/getProposalData/:rollNo", getProposalData);
// //dont delete
// router.get("/student/test/ahmed", test);

// router.get("/student/mail/test", testmai);
module.exports = router;
