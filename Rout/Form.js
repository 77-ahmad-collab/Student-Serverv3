const user = require("../models/StudentSchema");
const form = require("../models/FormSchema");
const {sendMail, sendSingleMail} = require("./sendMail");
const formdata = async (req, res) => {
  //getting values from client

  try {
    console.log(req.body);
    const {
      s_leader,
      s_organization,
      s_internal,
      s_external,
      s_proj_title,
      s_status,
      stu1_id,
      stu2_id,
      stu3_id,
      s_name1,
      s_name2,
      s_name3,
      group_count,
    } = req.body;
    // const leaderfinal = await user.find({id: s_leader}, {s_name: 1});
    // const ryu = await user.findOne({id: s_leader});

    //***start of resubmissiion tracing */

    const CHECKACCEPT = await user.findOne({id: stu1_id}, {_id: 0});
    if (CHECKACCEPT.isACCEPTED == true) {
      if (group_count == 3) {
        console.log("Resubmiting and group count is 3");
        console.log("This student is resubmitting the form");
        const updateResponseCount = await user.updateOne(
          {id: stu1_id},
          {ResponseCount: 2}
        );
        const leader = await user.findOne({id: stu1_id});
        const formid = await leader.formid;
        console.log(formid);
        const formdata = await form.findOne({_id: formid});
        const {mem2, mem3} = formdata;
        if (mem2 == "") {
          const updateForm = await form.updateOne(
            {_id: formid},
            {$set: {mem2: stu3_id}}
          );

          const status_res = await user.updateOne(
            {id: stu3_id},
            {
              $set: {
                isSUBMIT: true,
                isINVITE: true,
                groupRequest: stu1_id,
                formid: formid,
              },
            }
          );
          const updateLeader = await user.updateOne(
            {id: stu1_id},
            {$set: {isSUBMIT: true}}
          );
          const OutputOF = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
          sendMail(group_count, stu1_id, stu2_id, stu3_id, OutputOF);
        } else if (mem3 == "") {
          const updateForm = await form.updateOne(
            {_id: formid},
            {$set: {mem3: stu3_id}}
          );

          const status_res = await user.updateOne(
            {id: stu3_id},
            {
              $set: {
                isSUBMIT: true,
                isINVITE: true,
                groupRequest: stu1_id,
                formid: formid,
              },
            }
          );
          const updateLeader = await user.updateOne(
            {id: stu1_id},
            {$set: {isSUBMIT: true}}
          );
          const OutputOF = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
          sendMail(group_count, stu1_id, stu2_id, stu3_id, OutputOF);
        }
      } else if (group_count == 2) {
        const updateLeader = await user.updateOne(
          {id: stu1_id},
          {$set: {isSUBMIT: true}}
        );
        const leader = await user.findOne({id: stu1_id});
        const formid = await leader.formid;
        const formdata = await form.findOne({_id: formid});
        const mem2 = await formdata.mem2;
        const mem3 = await formdata.mem3;

        if (mem2 == "") {
          const updateformdata = await form.updateOne(
            {_id: formid},
            {$set: {mem2: mem3, mem3: ""}}
          );
        }
        const updateForm = await form.updateOne(
          {_id: formid},
          {$set: {mem_count: 2}}
        );
      }
    } else {
      console.log("first time");
      const updateResponseCount = await user.updateOne(
        {id: stu1_id},
        {ResponseCount: 1}
      );

      const groupcount = Number(group_count);
      // console.log(s_proj_title);
      // console.log(groupcount);

      const SubmitForm = await new form({
        mem_count: groupcount,
        s_organization,
        mem1: stu1_id,
        mem2: stu2_id,
        mem3: stu3_id,
        s_proj_title,
        s_internal,
        s_external,
      });

      const doc1 = await SubmitForm.save();

      // console.log(doc1);

      if (group_count == 1) {
        const status_res1 = await user.updateOne(
          {id: stu1_id},
          {
            $set: {
              isSUBMIT: true,
              isACCEPTED: true,
              groupRequest: stu1_id,
              formid: doc1._id,
              s_status: "Accepted",
            },
          }
        );
      }
      if (group_count == 2) {
        if (s_leader == stu1_id.toUpperCase()) {
          const status_res1 = await user.updateOne(
            {id: stu1_id},
            {
              $set: {
                isSUBMIT: true,
                isACCEPTED: true,
                groupRequest: stu1_id,
                formid: doc1._id,
                s_status: "Accepted",
              },
            }
          );
          const status_res2 = await user.updateOne(
            {id: stu2_id},
            {
              $set: {
                isSUBMIT: true,
                isINVITE: true,
                groupRequest: stu1_id,
                formid: doc1._id,
                s_status: "Pending",
              },
            }
          );

          //okay functionality

          // console.log("leader is student 1");
        }

        const count = 2;
        //***sending mail function */
        const OutputOF = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
        sendMail(count, stu1_id, stu2_id, stu3_id, OutputOF);
      } else if (group_count == 3) {
        if (s_leader == stu1_id.toUpperCase()) {
          const status_res1 = await user.updateOne(
            {id: stu1_id},
            {
              $set: {
                isSUBMIT: true,
                isACCEPTED: true,
                groupRequest: stu1_id,
                ResponseCount: 1,
                formid: doc1._id,
                s_status: "Accepted",
              },
            }
          );
          const status_res2 = await user.updateOne(
            {id: stu2_id},
            {
              $set: {
                isSUBMIT: true,
                isINVITE: true,
                groupRequest: stu1_id,
                formid: doc1._id,
                s_status: "Pending",
              },
            }
          );
          const status_res3 = await user.updateOne(
            {id: stu3_id},
            {
              $set: {
                isSUBMIT: true,
                isINVITE: true,
                groupRequest: stu1_id,
                formid: doc1._id,
                s_status: "Pending",
              },
            }
          );
          // console.log("leader is student 1");
        }

        const OutputOF = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
        sendMail(group_count, stu1_id, stu2_id, stu3_id, OutputOF);
      }
    }

    // ***Response data */
    // const form_id = CHECKACCEPT.formid;
    if (group_count == 1) {
      let student = [];
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});
      student = [
        ...student,
        {
          name: stu1.s_name,
          email: stu1.s_email,
          seatno: stu1.id,
          status: stu1.s_status,
        },
      ];
      res.json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        project_description: formdata.project_description,
      });
    } else if (group_count == 2) {
      let student = [];
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      const stu2 = await user.findOne({id: stu2_id}, {_id: 0, s_tokens: 0});
      const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});
      student = [
        ...student,
        {
          name: stu1.s_name,
          email: stu1.s_email,
          seatno: stu1.id,
          status: stu1.s_status,
        },
      ];
      student = [
        ...student,
        {
          name: stu2.s_name,
          email: stu2.s_email,
          seatno: stu2.id,
          status: stu2.s_status,
        },
      ];
      res.json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        project_description: formdata.project_description,
      });
    } else if (group_count == 3) {
      let student = [];
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      const stu2 = await user.findOne({id: stu2_id}, {_id: 0, s_tokens: 0});
      const stu3 = await user.findOne({id: stu3_id}, {_id: 0, s_tokens: 0});
      const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});
      student = [
        ...student,
        {
          name: stu1.s_name,
          email: stu1.s_email,
          seatno: stu1.id,
          status: stu1.s_status,
        },
      ];
      student = [
        ...student,
        {
          name: stu2.s_name,
          email: stu2.s_email,
          seatno: stu2.id,
          status: stu2.s_status,
        },
      ];
      student = [
        ...student,
        {
          name: stu3.s_name,
          email: stu3.s_email,
          seatno: stu3.id,
          status: stu3.s_status,
        },
      ];
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        project_description: formdata.project_description,
      });
    }

    // res.send("Sucess form");
  } catch (error) {
    res.status(400).send("error hay");
  }
};

//***CONTROLLER FOR THE ACCEPT OR REJECT THE GROUP INVITE */
const updateStatus = async (req, res) => {
  //   console.log(req.query);
  const {val} = req.query;

  //****************FIRST CHECKING THAT STUDENT HAS ACCEPTED OR REJECTED THE INVITATION */
  //****if STUDENT HAS ACCEPTED THE INVITE THENN */

  if (val == "true") {
    console.log("student has accpeted the proposal");
    //**FIND THE ID OF THE STUDENT WHO HAS ACCEPTED THE INVITATION */
    const {rollNo} = req.body;

    //***FIND PARTICULAR STUDENT DATA IN ORDER TO UPDATE */
    const findStudent = await user.findOne({id: rollNo.toUpperCase()});
    //***UPDATING THE STDUENT DATA AS PER ITS REQUEST */
    const updateStudent = await user.updateOne(
      {id: rollNo.toUpperCase()},
      {isACCEPTED: "true", isINVITE: "false", s_status: "Accepted"}
    );

    const formid = findStudent.formid;
    const findLeader = findStudent.groupRequest;
    console.log(formid);
    const Result = await user.findOne(
      {id: findLeader},
      {_id: 0, ResponseCount: 1}
    );
    const responsecount = Result.ResponseCount;
    const formdata = await form.findOne(
      {_id: formid},
      {_id: 0, mem_count: 1, mem1: 1, mem2: 1, mem3: 1, mem_count: 1}
    );
    // console.log(formdata);

    const {mem2, mem3} = formdata;
    // console.log(findLeader, mem2, mem3);
    //**NOW LETS CHECK FOR GROUP COUNT TO CHECK THAT IF ALL MEMBERS HAS ACCEPTED THEN SEND PEOPOSAL TO INTERNAL ADVISOR */
    if (formdata.mem_count == 3) {
      // console.log("group members are 3");

      if (mem2 == rollNo.toUpperCase()) {
        let member3 = mem3;
        if (mem3 != "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          sendSingleMail(1, findLeader, OutputOF);
          sendSingleMail(1, mem3, OutputOF);
        } else {
          console.log("it is null");
          const member3 = "ct-18008";
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          sendSingleMail(1, findLeader, OutputOF);
        }
        console.log("dont sendMail to mem2,his status is oending");
        // const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
        // sendMail(3, findLeader, findLeader, member3, OutputOF);
      } else if (mem3 == rollNo.toUpperCase()) {
        let member2 = mem2;
        if (mem2 != "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          sendSingleMail(1, findLeader, OutputOF);
          sendSingleMail(1, mem2, OutputOF);
        } else {
          console.log("it is null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          sendSingleMail(1, findLeader, OutputOF);
          member2 = "ct-18008";
        }

        // const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invit</h4></div>`;
        // sendMail(3, findLeader, findLeader, member2, OutputOF);
        console.log("dont sendMail to mem3,his status is oending");
      }

      const member1 = formdata.mem1;
      const member2 = formdata.mem2;
      const member3 = formdata.mem3;
      const member1_status = await user.findOne(
        {id: member1},
        {isACCEPTED: 1, _id: 0}
      );
      const member2_status = await user.findOne(
        {id: member2},
        {isACCEPTED: 1, _id: 0}
      );
      const member3_status = await user.findOne(
        {id: member3},
        {isACCEPTED: 1, _id: 0}
      );
      console.log(member1_status, member2_status, member3_status);
      //********************************CHECKING EACH GROUP MEMBERS STATUS TO GO AHEAD */
      if (
        member1_status != null &&
        member2_status != null &&
        member3_status != null
      ) {
        if (
          member1_status.isACCEPTED &&
          member2_status.isACCEPTED &&
          member3_status.isACCEPTED
        ) {
          console.log("all 3 members has accepted the invite");
        } else {
          console.log("not all the members has accepted");
          const updateResponseCount = await user.updateOne(
            {id: findLeader},
            {ResponseCount: Result.ResponseCount + 1}
          );

          const fetchcount = await user.findOne(
            {id: findLeader},
            {_id: 0, ResponseCount: 1}
          );
          if (fetchcount.ResponseCount == formdata.mem_count) {
            console.log("equal");
            const OpenForm = await user.updateOne(
              {id: findLeader},
              {$set: {isSUBMIT: false}}
            );
            const setCount = await user.updateOne(
              {_id: formid},
              {$set: {ResponseCount: 0}}
            );
          }
        }
      } else {
        console.log("not all the members has accepted");
        const updateResponseCount = await user.updateOne(
          {id: findLeader},
          {ResponseCount: Result.ResponseCount + 1}
        );

        const fetchcount = await user.findOne(
          {id: findLeader},
          {_id: 0, ResponseCount: 1}
        );
        if (fetchcount.ResponseCount == formdata.mem_count) {
          console.log("equal");
          const OpenForm = await user.updateOne(
            {id: findLeader},
            {$set: {isSUBMIT: false}}
          );
          // const setCount = await user.updateOne(
          //   {_id: formid},
          //   {$set: {ResponseCount: 0}}
          // );
        }
      }
      // const mem3 =  await user.findOne({id:})
      console.log(member1, "i am memmber 1", member2, member3);

      //***if the group count is 2 */
    } else if (formdata.mem_count == 2) {
      console.log("group members are 2");
      const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invit</h4></div>`;
      sendMail(2, findLeader, findLeader, mem2, OutputOF);
      const member1 = formdata.mem1;
      const member2 = formdata.mem2;
      const member1_status = await user.findOne(
        {id: member1},
        {isACCEPTED: 1, _id: 0}
      );
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
    const upadateStudentRecord = await user.updateOne(
      {id: rollNo.toUpperCase()},
      {$set: {s_status: ""}}
    );
    // console.log(req.body, "req.body");
    const findStudent = await user.findOne({id: rollNo.toUpperCase()});
    const lead = findStudent.groupRequest;
    const findLeader = await user.findOne({id: findStudent.groupRequest});
    // const findLeader = await user.findOne({id: findStudent.groupRequest});
    // const findLeader = findStudent.groupRequest;

    const formid = findStudent.formid;
    const formdata = await form.findOne(
      {_id: formid},
      {mem_count: 1, _id: 0, mem2: 1, mem3: 1}
    );

    if (formdata.mem_count == 2) {
      const memberTwo = formdata.mem2;
      console.log(formdata.mem_count, "2 member rejection");
      const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invit</h4></div>`;
      sendMail(
        2,
        findStudent.groupRequest,
        findStudent.groupRequest,
        memberTwo,
        OutputOF
      );
      //**INITIALLY UPDATE THE PARTICULAR STUDENT RECORD ON REJECTING THE INVITE */
      const updateformid = await user.updateOne(
        {id: rollNo.toUpperCase()},
        {$unset: {formid: ""}}
      );
      findStudent.groupRequest = "";
      findStudent.isINVITE = false;
      findStudent.isSUBMIT = false;
      const doc1 = await findStudent.save();
      ///DONE UPDATING OF PARTICULAR STUDENT RECORD
      //********************************NOW TO UPDATE GROUP LEADER REMOVING MEBER FROM THE GROUP LEADER */
      // findLeader.formdata.mem_count = 2;
      const mem2 = formdata.mem2;

      console.log(mem2);
      if (rollNo.toUpperCase() == mem2) {
        console.log("student 2 roll no in count of 2");

        const updateMem2 = await form.updateOne(
          {_id: formid},
          {$set: {mem2: ""}}
        );

        findLeader.isSUBMIT = false;
        findLeader.isACCEPTED = false;
        findLeader.groupRequest = "";
        const doc = await findLeader.save();
        // console.log(doc, "your response");
        const upadateLeader = await user.updateOne(
          {id: lead},
          {$unset: {formid: ""}}
        );
        console.log("everything updated");
        console.log(findLeader, mem2);
      }
    } else if (formdata.mem_count == 3) {
      console.log("3 member rejection");
      const lead = findStudent.groupRequest;
      //   //**INITIALLY UPDATE THE PARTICULAR STUDENT RECORD ON REJECTING THE INVITE */
      const updateformid = await user.updateOne(
        {id: rollNo.toUpperCase()},
        {$unset: {formid: ""}}
      );
      findStudent.groupRequest = "";
      findStudent.isINVITE = false;
      findStudent.isSUBMIT = false;
      const doc1 = await findStudent.save();
      ///DONE UPDATING OF PARTICULAR STUDENT RECORD
      //********************************NOW TO UPDATE GROUP LEADER REMOVING MEBER FROM THE GROUP LEADER */
      // findLeader.formdata.mem_count = 2;
      const mem2 = formdata.mem2;
      const mem3 = formdata.mem3;

      findLeader.ResponseCount = findLeader.ResponseCount + 1;
      const doc = await findLeader.save();

      const findResponseCount = await user.findOne(
        {id: lead},
        {_id: 0, ResponseCount: 1}
      );
      if (formdata.mem_count == findResponseCount.ResponseCount) {
        const OpenForm = await user.updateOne(
          {id: lead},
          {$set: {isSUBMIT: false}}
        );
        // const setCount = await user.updateOne(
        //   {_id: formid},
        //   {$set: {ResponseCount: 0}}
        // );
      }

      if (rollNo.toUpperCase() == mem2) {
        const updateMem2 = await form.updateOne(
          {_id: formid},
          {$set: {mem2: ""}}
        );

        if (mem3 != "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          sendSingleMail(1, lead, OutputOF);
          sendSingleMail(1, mem3, OutputOF);
        } else {
          console.log("it is null");
          // const member3 = "ct-18008";
          const RemoveFormid = await user.updateOne(
            {id: lead},
            {$unset: {formid: ""}}
          );
          const updateStatus = await user.updateOne(
            {id: lead},
            {$set: {isACCEPTED: false}}
          );
          const deleteFormField = await form.deleteOne({_id: formid});
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has reected the group invite</h4></div>`;
          sendSingleMail(1, lead, OutputOF);
        }
        // findLeader.isSUBMIT = false;

        // // findLeader.groupRequest = "";
        // const doc = await findLeader.save();
        // const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invit</h4></div>`;
        // sendMail(3, lead, lead, mem3, OutputOF);
        // console.log(doc, "your response");
        console.log("everything updated in mem2 rej");
      } else if (rollNo.toUpperCase() == mem3) {
        console.log("student 3 roll no");

        const updateMem3 = await form.updateOne(
          {_id: formid},
          {$set: {mem3: ""}}
        );

        if (mem2 != "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          sendSingleMail(1, lead, OutputOF);
          sendSingleMail(1, mem2, OutputOF);
        } else {
          console.log("it is null");
          const RemoveFormid = await user.updateOne(
            {id: lead},
            {$unset: {formid: ""}}
          );
          const updateStatus = await user.updateOne(
            {id: lead},
            {$set: {isACCEPTED: false}}
          );
          const deleteFormField = await form.deleteOne({_id: formid});

          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          sendSingleMail(1, lead, OutputOF);
          //  member2 = "ct-18008";
        }

        // findLeader.isSUBMIT = false;
        //   findLeader.ResponseCount = findLeader.ResponseCount + 1;
        // findLeader.isACCEPTED = false;
        // findLeader.groupRequest = "";
        // const doc = await findLeader.save();
        // const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invit</h4></div>`;
        // sendMail(3, lead, lead, mem2, OutputOF);
        // console.log(doc, "your response");
        console.log("everything updated in mem3 ");
      }
    }
    res.json({message: "yes you have rejected"});
  }

  if (val == "true") {
    const {rollNo} = req.body;
    const data = await user.findOne({id: rollNo.toUpperCase()}, {_id: 0});
    const formid = await data.formid;

    const formdata = await form.findOne({_id: formid}, {_id: 0});
    const stu1_id = formdata.mem1;
    const stu2_id = formdata.mem2;
    const stu3_id = formdata.mem3;
    let student = [];
    if (formdata.mem_count == 2) {
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
        },
      ];
      student = [
        ...student,
        {
          name: stu2.s_name,
          email: stu2.s_email,
          seatno: stu2.id,
          status: stu2.s_status,
        },
      ];
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        project_description: formdata.project_description,
      });
    } else if (formdata.mem_count == 3) {
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      const stu2 = await user.findOne({id: stu2_id}, {_id: 0, s_tokens: 0});
      const stu3 = await user.findOne({id: stu3_id}, {_id: 0, s_tokens: 0});
      const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});

      if (stu2 == !null && stu3 == !null) {
        console.log("both are not null");
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
          },
        ];
        student = [
          ...student,
          {
            name: stu2.s_name,
            email: stu2.s_email,
            seatno: stu2.id,
            status: stu2.s_status,
          },
        ];
        student = [
          ...student,
          {
            name: stu3.s_name,
            email: stu3.s_email,
            seatno: stu3.id,
            status: stu3.s_status,
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
          },
        ];
        student = [
          ...student,
          {
            name: stu3.s_name,
            email: stu3.s_email,
            seatno: stu3.id,
            status: stu3.s_status,
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
          },
        ];
        student = [
          ...student,
          {
            name: stu2.s_name,
            email: stu2.s_email,
            seatno: stu2.id,
            status: stu2.s_status,
          },
        ];
      }

      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        project_description: formdata.project_description,
      });
    }
  }

  // res.send("you have hiten the route");
};

module.exports = {formdata, updateStatus};
