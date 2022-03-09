const user = require("../models/StudentSchema");
const form = require("../models/FormSchema");
const proposal = require("../models/ProposalSchema");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const signup = async (req, res) => {
  //getting values from client

  try {
    // console.log(req.body);
    const {
      s_name,
      s_email,
      password,
      s_department,
      s_batch,

      s_rollno,
      s_contact,
    } = req.body;
    //checking that if email already exists
    const verify_e = await user.findOne({s_email});

    //******************IF EMAIL EXISTS SEND DUPLICATE STATUS */

    if (verify_e) {
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(409).send("email exists");
    }

    const add = await new user({
      id: s_rollno,
      s_name,
      s_email,
      password,
      s_batch,
      s_rollno,
      s_contact,
      s_department,
      // s_members: [{ stu1_id: "1", stu2_id: "2", stu3_id: "3" }],
    });

    //saving in database

    const result = await add.save();
    // console.log(result, "the result");
    // console.log(addData.email);
    res.set("Access-Control-Allow-Origin", "*");
    res.send("Sucess signup");
  } catch (error) {
    res.set("Access-Control-Allow-Origin", "*");
    res.status(400).send("error hay");
  }
};

// //for form data
// const formdata = async (req, res) => {
//   //getting values from client

//   try {
//     // console.log(req.body);
//     const {
//       id,
//       s_leader,
//       s_organization,
//       s_internal,
//       s_external,
//       s_proj_title,
//       s_status,
//       stu1_id,
//       stu2_id,
//       stu3_id,
//       s_name1,
//       s_name2,
//       s_name3,
//       group_count,
//     } = req.body;
//     const leaderfinal = await user.find({id: s_leader}, {s_name: 1});
//     const ryu = await user.findOne({id: s_leader});

//     const groupcount = Number(group_count);

//     ryu.formdata = {
//       id: stu1_id,
//       mem_count: groupcount,
//       s_organization,
//       mem1: stu1_id,
//       mem2: stu2_id,
//       mem3: stu3_id,
//       s_internal,
//       s_external,
//       s_proj_title,
//     };
//     const doc1 = await ryu.save();
//     console.log(doc1);

//     if (group_count == 1) {
//       const status_res1 = await user.updateOne(
//         {id: stu1_id},
//         {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu1_id}}
//       );
//     }
//     if (group_count == 2) {
//       if (s_leader == stu1_id.toUpperCase()) {
//         const status_res1 = await user.updateOne(
//           {id: stu1_id},
//           {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu1_id}}
//         );
//         const status_res2 = await user.updateOne(
//           {id: stu2_id},
//           {$set: {isSUBMIT: true, isINVITE: true, groupRequest: stu1_id}}
//         );

//         //okay functionality

//         // console.log("leader is student 1");
//       } else if (s_leader == stu2_id.toUpperCase()) {
//         const status_res1 = await user.updateOne(
//           {id: stu1_id},
//           {$set: {isSUBMIT: true, isINVITE: true, groupRequest: stu2_id}}
//         );
//         const status_res2 = await user.updateOne(
//           {id: stu2_id},
//           {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu2_id}}
//         );
//         // console.log("leader is student 2");
//         // console.log(status_res1);
//       }
//       const count = 2;
//       //***sending mail function */
//       const OutputOF = `<div>
//       <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
//       sendMail(count, stu1_id, stu2_id, stu3_id, s_leader, OutputOF);
//     } else if (group_count == 3) {
//       if (s_leader == stu1_id.toUpperCase()) {
//         const status_res1 = await user.updateOne(
//           {id: stu1_id},
//           {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu1_id}}
//         );
//         const status_res2 = await user.updateOne(
//           {id: stu2_id},
//           {$set: {isSUBMIT: true, isINVITE: true, groupRequest: stu1_id}}
//         );
//         const status_res3 = await user.updateOne(
//           {id: stu3_id},
//           {$set: {isSUBMIT: true, isINVITE: true, groupRequest: stu1_id}}
//         );
//         // console.log("leader is student 1");
//       }
//       // else if (s_leader == stu2_id.toUpperCase()) {
//       //   const status_res1 = await user.updateOne(
//       //     {id: stu1_id},
//       //     {$set: {isSUBMIT: true, groupRequest: stu2_id}}
//       //   );
//       //   const status_res2 = await user.updateOne(
//       //     {id: stu2_id},
//       //     {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu2_id}}
//       //   );
//       //   const status_res3 = await user.updateOne(
//       //     {id: stu3_id},
//       //     {$set: {isSUBMIT: true, groupRequest: stu2_id}}
//       //   );
//       //   // console.log("leader is student 2");
//       // } else if (s_leader == stu3_id.toUpperCase()) {
//       //   const status_res1 = await user.updateOne(
//       //     {id: stu1_id},
//       //     {$set: {isSUBMIT: true, groupRequest: stu3_id}}
//       //   );
//       //   const status_res2 = await user.updateOne(
//       //     {id: stu2_id},
//       //     {$set: {isSUBMIT: true, groupRequest: stu3_id}}
//       //   );
//       //   const status_res3 = await user.updateOne(
//       //     {id: stu3_id},
//       //     {$set: {isSUBMIT: true, isACCEPTED: true, groupRequest: stu3_id}}
//       //   );
//       // }

//       //   //*sendMail
//       const OutputOF = `<div>
//       <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
//       sendMail(group_count, stu1_id, stu2_id, stu3_id, s_leader, OutputOF);
//     }
//     // console.log(mail2, mail1, mail3);
//     res.set("Access-Control-Allow-Origin", "*");
//     res.send("Sucess form");
//   } catch (error) {
//     res.set("Access-Control-Allow-Origin", "*");
//     res.status(400).send("error hay");
//   }
// };
//for login
const login = async (req, res) => {
  try {
    const {email, pass} = req.body;
    //finding the user if exiss
    const person = await user.findOne({s_email: email});
    // console.log(person, "perspn");
    if (!person) {
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(404).send("INVALID CREDENTIALS");
    }
    //****if user exists  matching the password */
    const match = await bcrypt.compare(pass, person.password);
    // console.log(match);
    // *********************************IF MATCH CREATE JWT TOKEN TAHT WILL EXPIRES IN 15 MINUTES***//
    if (match) {
      const token = await person.getToken();

      // console.log(token);
      var inFifteenMinutes = new Date(new Date().getTime() + 45 * 60 * 1000);
      // console.log(inFifteenMinutes, "minutes");
      res.set("Access-Control-Allow-Origin", "*");
      res.cookie("jwt", token, {
        expires: inFifteenMinutes,
      });
      //*******************SENDING THE RESPONSE TO CLIENT IF SUCCCESS */
      console.log(person, "id");
      return res.json({
        personid: person.id,
        name: person.s_name,
        email: person.s_email,
        contact: person.s_contact,
        isSUBMIT: person.isSUBMIT,
        isINVITE: person.isINVITE,
        isACCEPTED: person.isACCEPTED,
        department: person.s_department,
        member3: "hello",
      });
    } else {
      res.set("Access-Control-Allow-Origin", "*");
      res.cookie("jwt", {}, {maxAge: -1});
      return res.status(401).send("INVALID CREDENTIALS");
    }
  } catch (error) {
    res.set("Access-Control-Allow-Origin", "*");
    res.clearCookie("jwt");
    res.status(401).send("INVALID CREDENTIALS");
  }
};
//*****CONTROLLER FOR AUTHENTICATION */
const about = async (req, res) => {
  // console.log(req.id, "the id");
  try {
    const result = await user.findOne({id: req.id}, {s_tokens: 0});
    const {
      s_name,
      id,
      s_email,
      s_contact,
      s_department,
      s_batch,
      isSUBMIT,
      isINVITE,
      isACCEPTED,
    } = result;
    const formdata = await form.findOne({_id: req.formid});
    console.log(formdata.mem2, "yes");
    if (formdata.mem2 == !null && formdata.mem3 && !null) {
      res.set("Access-Control-Allow-Origin", "*");
      res.json({
        personid: id,
        name: s_name,
        email: s_email,
        contact: s_contact,
        department: s_department,
        batch: s_batch,
        isSUBMIT,
        isINVITE,
        isACCEPTED,
        mem2: formdata.mem2,
        mem3: formdata.mem3,
      });
    } else if (formdata.mem2 == null) {
      res.set("Access-Control-Allow-Origin", "*");
      res.json({
        personid: id,
        name: s_name,
        email: s_email,
        contact: s_contact,
        department: s_department,
        batch: s_batch,
        isSUBMIT,
        isINVITE,
        isACCEPTED,
        member: "ahmed 2",
        mem2: formdata.mem3,
      });
    } else if (formdata.mem3 == null) {
      res.set("Access-Control-Allow-Origin", "*");
      res.json({
        personid: id,
        name: s_name,
        email: s_email,
        contact: s_contact,
        department: s_department,
        batch: s_batch,
        isSUBMIT,
        isINVITE,
        isACCEPTED,
        member: "ahmed 3",
        mem2: formdata.mem2,
      });
    }
    res.set("Access-Control-Allow-Origin", "*");
    res.send("300");
  } catch (error) {
    res.set("Access-Control-Allow-Origin", "*");
    res.status(401).send(error, "ajaj");
  }
};
//***CONTROLLER FOR FETCHING SPECIFIC STUDENT NAME */
const userdata = async (req, res) => {
  try {
    // console.log(req.params);
    const result = await user.findOne(
      {id: req.params.id},
      {s_contact: 1, s_email: 1, s_name: 1}
    );
    // console.log(result);
    res.set("Access-Control-Allow-Origin", "*");
    res.json({
      contact: result.s_contact,
      email: result.s_email,
      s_name: result.s_name,
    });
  } catch (error) {
    res.set("Access-Control-Allow-Origin", "*");
    res.status(401).send("NOT EXIST user");
  }
};

//***** CONTROLLER FOR FETCHING ALL STUDENT NAME */

const usernames = async (req, res) => {
  const result = await user.find(
    {isSUBMIT: false},
    {id: 1, _id: 0, isSUBMIT: 1}
  );
  // console.log(result);
  res.set("Access-Control-Allow-Origin", "*");
  res.send(result);
};
///***** CONTROLLER FOR FETCHING STUDENT DATA ON THE BASIS OF NAME */
const student_data = async (req, res) => {
  // console.log(req.params);
  if (!req.params) {
    // console.log("no params");
  }
  const result = await user.find(
    {s_name: req.params.name},
    {s_contact: 1, s_email: 1, id: 1}
  );
  res.set("Access-Control-Allow-Origin", "*");
  // console.log(result);
  res.json({
    contact: result[0].s_contact,
    email: result[0].s_email,
    id: result[0].id,
  });
};

const test = async (req, res) => {
  const ryu = await user.findOne({id: "CT-19000"});

  // ryu.formdata.mem_count = 2;
  const doc = await ryu.save();
  // console.log(doc, "the doc");
  res.set("Access-Control-Allow-Origin", "*");
  res.json({
    name: "asalm",
  });
};

const sendMail = async (
  count,
  stu1_id,
  stu2_id,
  stu3_id,
  s_leader,
  OutputOF
) => {
  const mail1 = await user.findOne(
    {id: stu1_id},
    {s_email: 1, s_name: 1, _id: 0}
  );
  // console.log(mail1.s_email, "mail1");
  const mail2 = await user.findOne(
    {id: stu2_id},
    {s_email: 1, s_name: 1, _id: 0}
  );
  const mail3 = await user.findOne(
    {id: stu3_id},
    {s_email: 1, s_name: 1, _id: 0}
  );
  if (count == 2) {
    ///*****START FOR NODE MAIL  */
    // create reusable transporter object using the default SMTP transport
    // console.log(mail1, mail2, "heh");
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   host: "smtp.gmail.com",
    //   auth: {
    //     user: "ahmaq098@gmail.com",
    //     pass: process.env.PASSWORD,
    //   },
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    //   },
    // });
    // // send mail with defined transport object
    // const list = [
    //   `${mail2.s_email}`,
    //   `${count == 3 ? `${mail3.s_email}` : ""}`,
    // ];
    // const mailOptions = {
    //   from: "ahmaq098@gmail.com",
    //   to: list,
    //   subject: "FYP PROJECT INVITIATION",
    //   text: "check mail!",
    //   html: OutputOF,
    // };
    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    //***END OD NODE MAIL */
    // res.send("mail sended");
  } else if (count == 3) {
    ///*****START FOR NODE MAIL if group members are 3 */
    // create reusable transporter object using the default SMTP transport
    // console.log(mail1, mail2, "heh");
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   host: "smtp.gmail.com",
    //   auth: {
    //     user: "ahmaq098@gmail.com",
    //     pass: process.env.PASSWORD,
    //   },
    //   tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    //   },
    // });
    // const OutputOf = `<div>
    //   <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
    // // send mail with defined transport object
    // const list = [`${mail2.s_email}`, `${mail3.s_email}`];
    // const mailOptions = {
    //   from: "ahmaq098@gmail.com",
    //   to: list,
    //   subject: "FYP PROJECT INVITIATION",
    //   text: "check mail!",
    //   html: OutputOf,
    // };
    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Email sent: " + info.response);
    //   }
    // });
    //***END OD NODE MAIL */
  }
};

//***CONTROLLER FOR THE ACCEPT OR REJECT THE GROUP INVITE */
const updateStatus = async (req, res) => {
  console.log(req.query);
  const {val} = req.query;

  //****************FIRST CHECKING THAT STUDENT HAS ACCEPTED OR REJECTED THE INVITATION */
  //****if STUDENT HAS ACCEPTED THE INVITE THENN */
  if (val == "true") {
    console.log("student has accpeted the proposal");
    //**FIND THE ID OF THE STUDENT WHO HAS ACCEPTED THE INVITATION */
    const {rollNo} = req.body;
    //***FIND PARTICULAR STUDENT DATA IN ORDER TO UPDATE */
    const findStudent = await user.findOne({id: rollNo});
    //***UPDATING THE STDUENT DATA AS PER ITS REQUEST */
    const updateStudent = await user.updateOne(
      {id: rollNo},
      {isACCEPTED: "true", isINVITE: "false"}
    );
    console.log(findStudent.groupRequest);

    //**  FINDING FOR THE GROUP LEADER IN ORDER TO GET FORM DATA AND ADD IT TO THE RECORD OF STUDENT WHO HAS ACCEPTED THE INVITE */
    const findLeader = await user.findOne({id: findStudent.groupRequest});
    console.log(findLeader.formdata);

    ///****************SAVING TEH FORM DATA OF PARTICULAR INVITATION ACCEPTED  STUDENT */
    findStudent.formdata = findLeader.formdata;
    //**SAVING THE DATA IN DATABASE */
    const doc1 = await findStudent.save();
    console.log(doc1);
    //********************************LETS CHECK THAT EVERYONE HAS ACCEPTED OR NOT */
    console.log(findLeader.formdata.mem_count, "it is your group count");

    //**NOW LETS CHECK FOR GROUP COUNT TO CHECK THAT IF ALL MEMBERS HAS ACCEPTED THEN SEND PEOPOSAL TO INTERNAL ADVISOR */
    if (findLeader.formdata.mem_count == 3) {
      console.log("group members are 3");
      const member1 = findLeader.formdata.mem1;
      const member2 = findLeader.formdata.mem2;
      const member3 = findLeader.formdata.mem3;
      const member1_status = findLeader;
      const member2_status = await user.findOne(
        {id: member2},
        {isACCEPTED: 1, _id: 0}
      );
      const member3_status = await user.findOne(
        {id: member3},
        {isACCEPTED: 1, _id: 0}
      );
      console.log(
        member1_status.isACCEPTED,
        member2_status.isACCEPTED,
        member3_status.isACCEPTED
      );
      //********************************CHECKING EACH GROUP MEMBERS STATUS TO GO AHEAD */
      if (
        member1_status.isACCEPTED &&
        member2_status.isACCEPTED &&
        member3_status.isACCEPTED
      ) {
        console.log("all 3 members has accepted the invite");
      } else {
        console.log("not all the members has accepted");
      }
      // const mem3 =  await user.findOne({id:})

      //***if the group count is 2 */
    } else if (findLeader.formdata.mem_count == 2) {
      console.log("group members are 2");
      const member2 = findLeader.formdata.mem2;
      const member1_status = findLeader;
      const member2_status = await user.findOne(
        {id: member2},
        {isACCEPTED: 1, _id: 0}
      );
      //********************************CHECKING EACH GROUP MEMBERS STATUS TO GO AHEAD */
      if (member1_status.isACCEPTED && member2_status.isACCEPTED) {
        console.log("all 2 members has accepted the invite");
      } else {
        console.log("not all the members has accepted");
      }
    }
  } else if (val == "false") {
    console.log("student has rejected the proposal");
    const {rollNo} = req.body;
    console.log(req.body, "req.body");
    const findStudent = await user.findOne({id: rollNo.toUpperCase()});
    // const findLeader = await user.findOne({id: findStudent.groupRequest});
    const findLeader = await user.findOne({id: findStudent.groupRequest});
    console.log(findLeader, "the leader");
    if (findLeader.formdata.mem_count == 2) {
      console.log(findLeader.formdata.mem_count, "  member rejection");

      //**INITIALLY UPDATE THE PARTICULAR STUDENT RECORD ON REJECTING THE INVITE */
      findStudent.formdata = {};
      findStudent.groupRequest = "";
      findStudent.isINVITE = false;
      findStudent.isSUBMIT = false;
      const doc1 = await findStudent.save();
      ///DONE UPDATING OF PARTICULAR STUDENT RECORD
      //********************************NOW TO UPDATE GROUP LEADER REMOVING MEBER FROM THE GROUP LEADER */
      // findLeader.formdata.mem_count = 2;
      const mem2 = findLeader.formdata.mem2;
      console.log(mem2);
      if (rollNo.toUpperCase() == mem2) {
        console.log("student 2 roll no");
        findLeader.formdata.mem2 = "";
        findLeader.isSUBMIT = false;
        findLeader.isACCEPTED = false;
        findLeader.groupRequest = "";
        const doc = await findLeader.save();
        console.log(doc, "your response");
        console.log("everything updated");
      }
    } else if (findLeader.formdata.mem_count == 3) {
      console.log("3 member rejection");
      //**INITIALLY UPDATE THE PARTICULAR STUDENT RECORD ON REJECTING THE INVITE */
      findStudent.formdata = {};
      findStudent.groupRequest = "";
      findStudent.isINVITE = false;
      findStudent.isSUBMIT = false;
      const doc1 = await findStudent.save();
      ///DONE UPDATING OF PARTICULAR STUDENT RECORD
      //********************************NOW TO UPDATE GROUP LEADER REMOVING MEBER FROM THE GROUP LEADER */
      // findLeader.formdata.mem_count = 2;
      const mem2 = findLeader.formdata.mem2;
      const mem3 = findLeader.formdata.mem3;
      if (rollNo == mem2) {
        console.log("student 2 roll no");
        findLeader.formdata.mem2 = "";
        findLeader.isSUBMIT = false;
        findLeader.isACCEPTED = false;
        const doc = await findLeader.save();
        console.log(doc, "your response");
        console.log("everything updated in mem 2");
      } else if (rollNo == mem3) {
        console.log("student 3 roll no");
        findLeader.formdata.mem3 = "";
        findLeader.isSUBMIT = false;
        findLeader.isACCEPTED = false;
        const doc = await findLeader.save();
        console.log(doc, "your response");
        console.log("everything updated in mem 3");
      }
    }
  }
  res.set("Access-Control-Allow-Origin", "*");
  res.send("you have hiten the route");
};

const testmai = async (req, res, next) => {
  // const transporter = nodemailer.createTransport({
  //   service: "gmail",
  //   host: "smtp.gmail.com",
  //   auth: {
  //     user: "ahmaq098@gmail.com",
  //     pass: process.env.PASSWORD,
  //   },
  //   tls: {
  //     // do not fail on invalid certs
  //     rejectUnauthorized: false,
  //   },
  // });
  // const transporter = nodemailer.createTransport({
  //   service: "hotmail",
  //   auth: {
  //     user: "ahmaddddd56@outlook.com",
  //     pass: "1712ahmad",
  //   },
  //   tls: {
  //     // do not fail on invalid certs
  //     rejectUnauthorized: false,
  //   },
  // });
  // const OutputOf = `<div>
  //     <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by Go and Check dashboard</h4></div>`;
  // // send mail with defined transport object
  // const list = [`ahmed4100353@cloud.neduet.edu.pk`, `mzlapq639@gmail.com`];
  // const mailOptions = {
  //   from: "ahmaq098@gmail.com",
  //   to: list,
  //   subject: "FYP PROJECT INVITIATION",
  //   text: "check mail!",
  //   html: OutputOf,
  // };
  // transporter.sendMail(mailOptions, function (error, info) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log("Email sent: " + info.response);
  //   }
  // });
  // res.set("Access-Control-Allow-Origin", "*");
  // res.send("mail");
};

const getformdata = async (req, res) => {
  const {rollNo} = req.params;
  console.log(rollNo, "rollno");
  const data = await user.findOne({id: rollNo.toUpperCase()}, {_id: 0});
  console.log(data, "data");
  const formid = await data.formid;
  if (formid == null || formid.length == 0) {
    res.set("Access-Control-Allow-Origin", "*");
    res.status(200).json({
      student: [],
      project_title: "",
      internal: "",
      external: "",
      project_description: "",
    });
  } else {
    const formdata = await form.findOne({_id: formid}, {_id: 0});
    console.log(formdata.reject, ">>fordata");
    const stu1_id = formdata.mem1;
    const stu2_id = formdata.mem2;
    const stu3_id = formdata.mem3;
    const stu4_id = formdata.mem4;
    let student = [];
    if (formdata.mem_count == 1) {
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});
      student = [
        ...student,
        {
          name: stu1.s_name,
          email: stu1.s_email,
          seatno: stu1.id,
          status: stu1.s_status,
          contact: stu1.s_contact,
        },
      ];
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        proposal_status: formdata.proposal_status,
        internalAdvisor_status: formdata.internalAdvisor_status,
        project_description: formdata.project_description,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        mem_count: formdata.mem_count,
        rejected: [],
      });
    } else if (formdata.mem_count == 2) {
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      const stu2 = await user.findOne({id: stu2_id}, {_id: 0, s_tokens: 0});
      //  const stu3 = await user.findOne({id: stu3_id}, {_id: 0, s_tokens: 0});
      const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});
      student = [
        ...student,
        {
          name: stu1.s_name,
          email: stu1.s_email,
          seatno: stu1.id,
          status: stu1.s_status,
          contact: stu1.s_contact,
        },
      ];
      student = [
        ...student,
        {
          name: stu2.s_name,
          email: stu2.s_email,
          seatno: stu2.id,
          status: stu2.s_status,
          contact: stu2.s_contact,
        },
      ];
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        proposal_status: formdata.proposal_status,
        internalAdvisor_status: formdata.internalAdvisor_status,
        project_description: formdata.project_description,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        mem_count: formdata.mem_count,
        rejected: [],
      });
    } else if (formdata.mem_count == 3) {
      console.log("memcount is 3");
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      const stu2 = await user.findOne({id: stu2_id}, {_id: 0, s_tokens: 0});
      const stu3 = await user.findOne({id: stu3_id}, {_id: 0, s_tokens: 0});
      const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});
      // console.log(stu1, stu2, stu3);

      let reject = [];
      console.log(formdata.reject.length, "reject");
      if (formdata.reject.length > 0) {
        // reject = formdata.reject
        console.log(" i not run if id is not");
        const studentreject = await user.findOne(
          {id: formdata.reject},
          {_id: 0, s_tokens: 0}
        );
        reject = [
          {
            name: studentreject.s_name,
            email: studentreject.s_email,
            seatno: studentreject.id,
            status: studentreject.s_status,
          },
        ];
      }
      if (stu2 != null && stu3 != null) {
        console.log("both are not null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
            contact: stu1.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu2.s_name,
            email: stu2.s_email,
            seatno: stu2.id,
            status: stu2.s_status,
            contact: stu2.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu3.s_name,
            email: stu3.s_email,
            seatno: stu3.id,
            status: stu3.s_status,
            contact: stu3.s_contact,
          },
        ];
      } else if (stu2 == null) {
        console.log("stu2 is null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
            contact: stu1.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu3.s_name,
            email: stu3.s_email,
            seatno: stu3.id,
            status: stu3.s_status,
            contact: stu3.s_contact,
          },
        ];
      } else if (stu3 == null) {
        console.log("stu3 is null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
            contact: stu1.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu2.s_name,
            email: stu2.s_email,
            seatno: stu2.id,
            status: stu2.s_status,
            contact: stu2.s_contact,
          },
        ];
      }
      console.log(formdata, "formdata");
      console.log(formdata.internal_designation, "internal");
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        project_description: formdata.project_description,
        proposal_status: formdata.proposal_status,
        internalAdvisor_status: formdata.internalAdvisor_status,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        mem_count: formdata.mem_count,
        rejected: reject,
      });
    } else if (formdata.mem_count == 4) {
      let reject = [];
      console.log("enyteerd");
      console.log(formdata, "reject");
      if (formdata.reject.length > 0) {
        // reject = formdata.reject
        console.log(" i not run if id is not");
        const studentreject = await user.findOne(
          {id: formdata.reject},
          {_id: 0, s_tokens: 0}
        );
        // ad
        reject = [
          ...reject,
          {
            name: studentreject.s_name,
            email: studentreject.s_email,
            seatno: studentreject.id,
            status: studentreject.s_status,
          },
        ];
      }
      if (formdata.reject1.length > 0) {
        // reject = formdata.reject
        console.log(" i not run if id is not");
        const studentreject1 = await user.findOne(
          {id: formdata.reject},
          {_id: 0, s_tokens: 0}
        );
        reject = [
          ...reject,
          {
            name: studentreject1.s_name,
            email: studentreject1.s_email,
            seatno: studentreject1.id,
            status: studentreject1.s_status,
          },
        ];
      }
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      const stu2 = await user.findOne({id: stu2_id}, {_id: 0, s_tokens: 0});
      const stu3 = await user.findOne({id: stu3_id}, {_id: 0, s_tokens: 0});
      const stu4 = await user.findOne({id: stu4_id}, {_id: 0, s_tokens: 0});
      // const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});

      if (stu2 != null && stu3 != null && stu4 != null) {
        console.log("both are not null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
            contact: stu1.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu2.s_name,
            email: stu2.s_email,
            seatno: stu2.id,
            status: stu2.s_status,
            contact: stu2.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu3.s_name,
            email: stu3.s_email,
            seatno: stu3.id,
            status: stu3.s_status,
            contact: stu3.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu4.s_name,
            email: stu4.s_email,
            seatno: stu4.id,
            status: stu4.s_status,
            contact: stu4.s_contact,
          },
        ];
      } else if (stu2 == null && stu3 == null && stu4 != null) {
        console.log("stu2 is null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
            contact: stu1.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu4.s_name,
            email: stu4.s_email,
            seatno: stu4.id,
            status: stu4.s_status,
            contact: stu4.s_contact,
          },
        ];
      } else if (stu2 != null && stu3 == null && stu4 == null) {
        console.log("stu2 is null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
            contact: stu1.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu2.s_name,
            email: stu2.s_email,
            seatno: stu2.id,
            status: stu2.s_status,
            contact: stu2.s_contact,
          },
        ];
      } else if (stu2 == null && stu3 != null && stu4 == null) {
        console.log("stu2 is null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
            contact: stu1.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu3.s_name,
            email: stu3.s_email,
            seatno: stu3.id,
            status: stu3.s_status,
            contact: stu3.s_contact,
          },
        ];
      } else if (stu2 == null && stu3 != null && stu4 != null) {
        console.log("stu2 is null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
            contact: stu1.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu3.s_name,
            email: stu3.s_email,
            seatno: stu3.id,
            status: stu3.s_status,
            contact: stu3.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu4.s_name,
            email: stu4.s_email,
            seatno: stu4.id,
            status: stu4.s_status,
            contact: stu4.s_contact,
          },
        ];
      } else if (stu2 != null && stu3 != null && stu4 == null) {
        console.log("stu2 is null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
            contact: stu1.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu3.s_name,
            email: stu3.s_email,
            seatno: stu3.id,
            status: stu3.s_status,
            contact: stu3.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu2.s_name,
            email: stu2.s_email,
            seatno: stu2.id,
            status: stu2.s_status,
            contact: stu2.s_contact,
          },
        ];
      } else if (stu2 != null && stu3 == null && stu4 != null) {
        console.log("stu2 is null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
            contact: stu1.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu2.s_name,
            email: stu2.s_email,
            seatno: stu2.id,
            status: stu2.s_status,
            contact: stu2.s_contact,
          },
        ];
        student = [
          ...student,
          {
            name: stu4.s_name,
            email: stu4.s_email,
            seatno: stu4.id,
            status: stu4.s_status,
            contact: stu4.s_contact,
          },
        ];
      }
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        proposal_status: formdata.proposal_status,
        internalAdvisor_status: formdata.internalAdvisor_status,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        project_description: formdata.project_description,
        rejected: reject,
      });
    }
  }

  // res.send("formdat");
};

const getProposalData = async (req, res) => {
  console.log(req.params.rollNo);
  const student = await user.findOne({id: req.params.rollNo});
  console.log(student);
  if (
    student.proposalid ||
    student.proposalid != null ||
    student.proposalid.length > 0
  ) {
    const myproposaldata = await proposal.findOne(
      {_id: student.proposalid},
      {_id: 0}
    );
    const formdata = await form.findOne({_id: student.formid});

    const proposaldata = {
      ...myproposaldata._doc,
      studentName: student.s_name,
      studentEmail: student.s_email,
      studentRollNo: student.id,
      title: formdata.s_proj_title,
      s_internal: formdata.s_internal,
      s_external: formdata.s_external,
      internal_designation: formdata.internal_designation,
      external_designation: formdata.external_designation,
    };
    console.log(proposaldata);
    res.set("Access-Control-Allow-Origin", "*");
    res.json(proposaldata);
  } else {
    res.set("Access-Control-Allow-Origin", "*");
    res.json({
      message:
        "no proposal form submit please call only when form submission condition is true",
    });
  }
  //
};
module.exports = {
  signup,
  login,
  about,

  userdata,
  usernames,
  student_data,
  test,
  updateStatus,
  testmai,
  getformdata,
  getProposalData,
};
