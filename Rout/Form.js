const user = require("../models/StudentSchema");
const form = require("../models/FormSchema");
const proposal = require("../models/ProposalSchema");
const {sendMail, sendSingleMail} = require("./sendMail");
const formdata = async (req, res) => {
  //getting values from client

  try {
    console.log(req.body, "req");
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
      stu4_id,

      internal_designation,
      external_designation,
      group_count,
    } = req.body;
    const leaderfinal = await user.find({id: s_leader}, {s_name: 1});
    // const ryu = await user.findOne({id: s_leader});
    console.log(leaderfinal);
    //***start of resubmissiion tracing */
    console.log("i am running");
    const CHECKACCEPT = await user.findOne({id: stu1_id}, {_id: 0});
    console.log(`checkaccept`, CHECKACCEPT);
    if (CHECKACCEPT.isACCEPTED == true) {
      if (group_count == 4) {
        console.log("Resubmiting and group count is 4");
        const leader = await user.findOne({id: stu1_id});
        const formid = await leader.formid;
        const formdata = await form.findOne({_id: formid});
        const {mem2, mem3} = formdata;
        console.log(mem2, mem3, "check in a 4 of rsub");
        if (leader.ResponseCount == 3) {
          console.log("hello i am here");
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
                  s_status: "pending",
                },
              }
            );
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
                  s_status: "pending",
                },
              }
            );
          }
          const updateForm1 = await form.updateOne(
            {_id: formid},
            {$set: {mem4: stu4_id, reject: "", reject1: "", mem_count: 4}}
          );
          const status_res1 = await user.updateOne(
            {id: stu4_id},
            {
              $set: {
                isSUBMIT: true,
                isINVITE: true,
                groupRequest: stu1_id,
                formid: formid,
                s_status: "Pending",
              },
            }
          );
          const updateResponseCount = await user.updateOne(
            {id: stu1_id},
            {ResponseCount: 2}
          );
          console.log("till now things doen");
        } else if (leader.ResponseCount == 4) {
          let count = 0;
          if (formdata.reject.length > 0) {
            count = 1;
          }
          if (formdata.reject1.length > 0) {
            count = 2;
          }
          if (count == 1) {
            if (mem2 == "") {
              const updateForm = await form.updateOne(
                {_id: formid},
                {$set: {mem2: stu4_id}}
              );
              const status_res = await user.updateOne(
                {id: stu4_id},
                {
                  $set: {
                    isSUBMIT: true,
                    isINVITE: true,
                    groupRequest: stu1_id,
                    formid: formid,
                    s_status: "Pending",
                  },
                }
              );
            } else if (mem3 == "") {
              const updateForm = await form.updateOne(
                {_id: formid},
                {$set: {mem3: stu4_id}}
              );
              const status_res = await user.updateOne(
                {id: stu4_id},
                {
                  $set: {
                    isSUBMIT: true,
                    isINVITE: true,
                    groupRequest: stu1_id,
                    formid: formid,
                    s_status: "Pending",
                  },
                }
              );
            } else if (mem4 == "") {
              const updateForm = await form.updateOne(
                {_id: formid},
                {$set: {mem4: stu4_id}}
              );
              const status_res = await user.updateOne(
                {id: stu4_id},
                {
                  $set: {
                    isSUBMIT: true,
                    isINVITE: true,
                    groupRequest: stu1_id,
                    formid: formid,
                    s_status: "Pending",
                  },
                }
              );
            }
            const updateForm1 = await form.updateOne(
              {_id: formid},
              {$set: {reject: "", reject1: "", mem_count: 4}}
            );
          } else if (count == 2) {
            if (mem2 == "" && mem3 == "") {
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
                    s_status: "Pending",
                  },
                }
              );
              const updateForm1 = await form.updateOne(
                {_id: formid},
                {$set: {mem3: stu4_id}}
              );
              const status_res1 = await user.updateOne(
                {id: stu4_id},
                {
                  $set: {
                    isSUBMIT: true,
                    isINVITE: true,
                    groupRequest: stu1_id,
                    formid: formid,
                    s_status: "Pending",
                  },
                }
              );
            } else if (mem2 == "" && mem4 == "") {
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
                    s_status: "Pending",
                  },
                }
              );
              const updateForm1 = await form.updateOne(
                {_id: formid},
                {$set: {mem4: stu4_id}}
              );
              const status_res1 = await user.updateOne(
                {id: stu4_id},
                {
                  $set: {
                    isSUBMIT: true,
                    isINVITE: true,
                    groupRequest: stu1_id,
                    formid: formid,
                    s_status: "Pending",
                  },
                }
              );
            } else if (mem3 == "" && mem4 == "") {
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
                    s_status: "Pending",
                  },
                }
              );
              const updateForm1 = await form.updateOne(
                {_id: formid},
                {$set: {mem4: stu4_id}}
              );
              const status_res1 = await user.updateOne(
                {id: stu4_id},
                {
                  $set: {
                    isSUBMIT: true,
                    isINVITE: true,
                    groupRequest: stu1_id,
                    formid: formid,
                    s_status: "Pending",
                  },
                }
              );
            }
            const updateForm1 = await form.updateOne(
              {_id: formid},
              {$set: {reject: "", reject1: "", mem_count: 4}}
            );
          }
        }
      } else if (group_count == 3) {
        console.log("This student is resubmitting the form");
        const leader = await user.findOne({id: stu1_id});
        console.log(leader, "leader");
        const formid = await leader.formid;
        const formdata = await form.findOne({_id: formid});
        if (leader.ResponseCount == 3) {
          console.log("Resubmiting for 3 and group count is 3");
          const updateResponseCount = await user.updateOne(
            {id: stu1_id},
            {ResponseCount: 2}
          );
          console.log(formid);
          // integerate this functionality at the end
          const updateformOf = await form.updateOne(
            {_id: formid},
            {$set: {reject: ""}}
          );
          // const updateformOf1 = await form.updateOne(
          //   {_id: formid},
          //   {$set: {reject1: ""}}
          // );
          const {mem2, mem3} = formdata;

          if (mem2 == "") {
            const updateForm = await form.updateOne(
              {_id: formid},
              {$set: {mem2: stu3_id}}
            );

            //  const updateForm1 = await form.updateOne(
            //    {_id: formid},
            //    {$set: {mem2: stu3_id}}
            // //  );
            const status_res = await user.updateOne(
              {id: stu3_id},
              {
                $set: {
                  isSUBMIT: true,
                  isINVITE: true,
                  groupRequest: stu1_id,
                  formid: formid,
                  s_status: "Pending",
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
                  s_status: "Pending",
                },
              }
            );
            const updateLeader = await user.updateOne(
              {id: stu1_id},
              {$set: {isSUBMIT: true}}
            );
            const OutputOF = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
            // sendMail(group_count, stu1_id, stu2_id, stu3_id, OutputOF);
          }
        } else if (leader.ResponseCount == 4) {
          console.log(
            "Resubmiting for 3 again but previpus;y and group count is 4"
          );
          const updateResponseCount = await user.updateOne(
            {id: stu1_id},
            {ResponseCount: 2}
          );
          console.log(formid, "form id");
          // integerate this functionality at the end
          // const updateformOf = await form.updateOne(
          //   {_id: formid},
          //   {$set: {reject: ""}}
          // );
          // const updateformOf1 = await form.updateOne(
          //   {_id: formid},
          //   {$set: {reject1: ""}}
          // );
          const {mem2, mem3, mem4, reject, reject1} = formdata;

          console.log(
            mem2,
            mem3,
            mem4,
            reject.length,
            reject1.length,
            "meessage"
          );
          let countof = 0;
          if (reject.length > 0) {
            console.log(reject.length, ">>");
            countof = 1;
            console.log(countof, "inside countof");
            // if (user1 == mem2) {
            //   indicatior1 = "mem2";
            // } else if (user1 == mem3) {
            //   indicatior1 = "mem3";
            // } else if (user1 == mem4) {
            //   indicator = "mem4";
            // }
          }
          if (reject1.length > 0) {
            countof = 2;
            //  if (user2 == mem2) {
            //    indicatior2 = "mem2";
            //  } else if (user2 == mem3) {
            //    indicatior2 = "mem3";
            //  } else if (user2 == mem4) {
            //    indicator2 = "mem4";
            //  }
          }
          console.log("the count", countof);
          if (countof == 1) {
            if (mem2 == "" || mem3 == "" || mem4 == "") {
              const updateForm = await form.updateOne(
                {_id: formid},
                {
                  $set: {
                    mem2: stu2_id,
                    mem3: stu3_id,
                    reject: "",
                    reject1: "",
                    mem_count: 3,
                  },
                }
              );
              const updateLeader = await user.updateOne(
                {id: stu1_id},
                {$set: {isSUBMIT: true}}
              );
              console.log("in that resubmission case everyone has accepted");
              //  const updateForm1 = await form.updateOne(
              //    {_id: formid},
              //    {$set: {mem2: stu3_id}}
              // //  );
              // const status_res = await user.updateOne(
              //   {id: stu3_id},
              //   {
              //     $set: {
              //       isSUBMIT: true,
              //       isINVITE: true,
              //       groupRequest: stu1_id,
              //       formid: formid,
              //     },
              //   }
              // );
              const OutputOF = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
              sendMail(group_count, stu1_id, stu2_id, stu3_id, OutputOF);
            }
          } else if (countof == 2) {
            if (mem2 == "") {
              const updateForm = await form.updateOne(
                {_id: formid},
                {$set: {mem2: stu3_id, reject: "", reject1: "", mem_count: 3}}
              );
              const status_res = await user.updateOne(
                {id: stu3_id},
                {
                  $set: {
                    isSUBMIT: true,
                    isINVITE: true,
                    groupRequest: stu1_id,
                    formid: formid,
                    s_status: "Pending",
                  },
                }
              );
            } else if (mem3 == "") {
              const updateForm = await form.updateOne(
                {_id: formid},
                {$set: {mem3: stu3_id, reject: "", reject1: "", mem_count: 3}}
              );
              const status_res = await user.updateOne(
                {id: stu3_id},
                {
                  $set: {
                    isSUBMIT: true,
                    isINVITE: true,
                    groupRequest: stu1_id,
                    formid: formid,
                    s_status: "Pending",
                  },
                }
              );
            }
          }
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
        mem4: stu4_id,
        s_proj_title,
        s_internal,
        s_external,
        internal_designation,
        external_designation,
      });

      const doc1 = await SubmitForm.save();

      console.log(doc1, "the doc");

      if (group_count == 1) {
        const status_res1 = await user.updateOne(
          {id: stu1_id},
          {
            $set: {
              isSUBMIT: true,
              isACCEPTED: true,
              isPROPOSALSUBMIT: true,
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
                // isPROPOSALSUBMIT: true,
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
                // isPROPOSALSUBMIT: true,
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
                // isPROPOSALSUBMIT: true,
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
                // isPROPOSALSUBMIT: true,
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
                // isPROPOSALSUBMIT: true,
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
      } else if (group_count == 4) {
        if (s_leader == stu1_id.toUpperCase()) {
          const status_res1 = await user.updateOne(
            {id: stu1_id},
            {
              $set: {
                isSUBMIT: true,
                isACCEPTED: true,
                // isPROPOSALSUBMIT: true,
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
                // isPROPOSALSUBMIT: true,
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
                // isPROPOSALSUBMIT: true,
                groupRequest: stu1_id,
                formid: doc1._id,
                s_status: "Pending",
              },
            }
          );
          const status_res4 = await user.updateOne(
            {id: stu4_id},
            {
              $set: {
                isSUBMIT: true,
                isINVITE: true,
                // isPROPOSALSUBMIT: true,
                groupRequest: stu1_id,
                formid: doc1._id,
                s_status: "Pending",
              },
            }
          );
          console.log(status_res3, status_res4, "leader is student 1");
        }
        console.log("Stidemt messages");
        const OutputOF = `<div>
      <h1>Hello Group Members!</h1><br/><h4>You have been invited for the fyp project group formation by ${s_leader} Go and Check dashboard</h4></div>`;
        // sendSingleMail(group_count, stu1_id, OutputOF);
        // sendSingleMail(group_count, stu2_id, OutputOF);
        // sendSingleMail(group_count, stu3_id, OutputOF);
        // sendSingleMail(group_count, stu4_id, OutputOF);
        // res.send("mai shi ho");
      }
    }
    console.log("bhar agaia");
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
      res.set("Access-Control-Allow-Origin", "*");
      res.json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        mem_count: formdata.mem_count,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        isPROPOSAL: stu1.isPROPOSAL,
        rejected: [],
        // project_description: formdata.project_description,
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
      res.set("Access-Control-Allow-Origin", "*");
      res.json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        mem_count: formdata.mem_count,
        isPROPOSAL: stu1.isPROPOSAL,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        rejected: [],
        // project_description: formdata.project_description,
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
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        mem_count: formdata.mem_count,
        isPROPOSAL: stu1.isPROPOSAL,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        rejected: [],
        // project_description: formdata.project_description,
      });
    } else if (group_count == 4) {
      console.log("reached here");
      let student = [];
      console.log(stu1_id, stu2_id, stu3_id, stu4_id);
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      console.log(stu1, "1");
      const stu2 = await user.findOne({id: stu2_id}, {_id: 0, s_tokens: 0});
      console.log(stu2, "2");
      const stu3 = await user.findOne({id: stu3_id}, {_id: 0, s_tokens: 0});
      console.log(stu3, "3");
      const stu4 = await user.findOne({id: stu4_id}, {_id: 0, s_tokens: 0});
      console.log(stu4, "4");
      // console.log(stu1, stu2, stu3, stu4, "st>>");
      const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});
      console.log(formdata, "the form data");
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
      student = [
        ...student,
        {
          name: stu4.s_name,
          email: stu4.s_email,
          seatno: stu4.id,
          status: stu4.s_status,
        },
      ];
      console.log(
        {
          student: student,
          project_title: formdata.s_proj_title,
          internal: formdata.s_internal,
          external: formdata.s_external,
          mem_count: formdata.mem_count,
          isPROPOSAL: stu1.isPROPOSAL,
          internal_designation: formdata.internal_designation,
          external_designation: formdata.external_designation,
          rejected: [],
        },
        "han bai kaisa laaaag"
      );
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        mem_count: formdata.mem_count,
        isPROPOSAL: stu1.isPROPOSAL,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        rejected: [],
        // project_description: formdata.project_description,
      });
    }

    // res.send("Sucess form");
  } catch (error) {
    res.set("Access-Control-Allow-Origin", "*");
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
      {_id: 0, mem_count: 1, mem1: 1, mem2: 1, mem3: 1, mem4: 1, mem_count: 1}
    );
    // console.log(formdata);

    const {mem1, mem2, mem3, mem4} = formdata;
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
          const Result = await user.updateOne(
            {id: member1},
            {isPROPOSALSUBMIT: true}
          );
          const updateofstu2 = await user.updateOne(
            {id: member2},
            {isPROPOSALSUBMIT: true}
          );
          const updateofstu3 = await user.updateOne(
            {id: member3},
            {isPROPOSALSUBMIT: true}
          );
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
          console.log("equal hai -------------s");
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
    } else if (formdata.mem_count == 4) {
      if (mem2 == rollNo.toUpperCase()) {
        let member3 = mem3;
        if (mem3 != "" && mem4 != "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
          // sendSingleMail(1, mem3, OutputOF);
          // sendSingleMail(1, mem4, OutputOF);
        } else if (mem3 != "" && mem4 == "") {
          console.log("it is null");
          // const member3 = "ct-18008";
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
          // sendSingleMail(1, mem3, OutputOF);
        } else if (mem4 != "" && mem3 == "") {
          console.log("it is null");
          const member3 = "ct-18008";
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
          // sendSingleMail(1, mem4, OutputOF);
        } else if (mem3 != "" && mem4 == "") {
          console.log("it is null");
          const member3 = "ct-18008";
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
        }
        console.log("dont sendMail to mem2,his status is oending");
        // const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
        // sendMail(3, findLeader, findLeader, member3, OutputOF);
      } else if (mem3 == rollNo.toUpperCase()) {
        let member2 = mem2;
        if (mem2 != "" && mem4 != "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
          // sendSingleMail(1, mem2, OutputOF);
          // sendSingleMail(1, mem4, OutputOF);
        } else if (mem2 != "" && mem4 == "") {
          console.log("it is null");
          // const member3 = "ct-18008";
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
          // sendSingleMail(1, mem2, OutputOF);
        } else if (mem4 != "" && mem2 == "") {
          console.log("it is null");
          const member3 = "ct-18008";
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
          // sendSingleMail(1, mem4, OutputOF);
        } else if (mem2 != "" && mem4 == "") {
          console.log("it is null");
          const member3 = "ct-18008";
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
        }
        // const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invit</h4></div>`;
        // sendMail(3, findLeader, findLeader, member2, OutputOF);
        console.log("dont sendMail to mem3,his status is oending");
      } else if (mem4 == rollNo.toUpperCase()) {
        if (mem2 != "" && mem3 != "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
          // sendSingleMail(1, mem2, OutputOF);
          // sendSingleMail(1, mem3, OutputOF);
        } else if (mem2 != "" && mem3 == "") {
          console.log("it is null");
          // const member3 = "ct-18008";
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
          // sendSingleMail(1, mem2, OutputOF);
        } else if (mem3 != "" && mem2 == "") {
          console.log("it is null");
          const member3 = "ct-18008";
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
          // sendSingleMail(1, mem3, OutputOF);
        } else if (mem2 != "" && mem3 == "") {
          console.log("it is null");
          const member3 = "ct-18008";
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invite</h4></div>`;
          // sendSingleMail(1, findLeader, OutputOF);
        }
        console.log("dont sendMail to mem4,his status is oending");
      }

      const member1 = formdata.mem1;
      const member2 = formdata.mem2;
      const member3 = formdata.mem3;
      const member4 = formdata.mem4;
      console.log(formdata, "formdata in between");
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
      const member4_status = await user.findOne(
        {id: member4},
        {isACCEPTED: 1, _id: 0}
      );
      console.log(
        member1_status,
        member2_status,
        member3_status,
        member4_status
      );
      if (
        member1_status != null &&
        member2_status != null &&
        member3_status != null &&
        member4_status != null
      ) {
        if (
          member1_status.isACCEPTED &&
          member2_status.isACCEPTED &&
          member3_status.isACCEPTED &&
          member4_status
        ) {
          console.log("all 4 members has accepted the invite");
          const Result = await user.updateOne(
            {id: member1},
            {isPROPOSALSUBMIT: true}
          );
          const updateofstu2 = await user.updateOne(
            {id: member2},
            {isPROPOSALSUBMIT: true}
          );
          const updateofstu3 = await user.updateOne(
            {id: member3},
            {isPROPOSALSUBMIT: true}
          );
          const updateofstu4 = await user.updateOne(
            {id: member4},
            {isPROPOSALSUBMIT: true}
          );
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
            console.log(OpenForm, "open it");
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
        const Result = await user.updateOne(
          {id: member1},
          {isPROPOSALSUBMIT: true}
        );
        const updateofstu2 = await user.updateOne(
          {id: member2},
          {isPROPOSALSUBMIT: true}
        );
      } else {
        console.log("not all the members has accepted");
      }
    }
  } else if (val == "false") {
    console.log("student has rejected the proposal");
    const {rollNo} = req.body;
    console.log(rollNo);
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
    console.log(formid, "form id");
    const formdata = await form.findOne(
      {_id: formid},
      {mem_count: 1, _id: 0, mem2: 1, mem3: 1, mem4: 1, reject: 1, reject1: 1}
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
        {$unset: {formid: "", proposalid: ""}}
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
      const updaterejectOf = await form.updateOne(
        {
          _id: formid,
        },
        {$set: {reject: `${rollNo}`}},
        {
          new: true,
        }
      );
      console.log("rejectonee", updaterejectOf, rollNo);
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
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem3, OutputOF);
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
          // sendSingleMail(1, lead, OutputOF);
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
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem2, OutputOF);
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
          // sendSingleMail(1, lead, OutputOF);
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
    } else if (formdata.mem_count == 4) {
      console.log("4 member rejection");
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
      const mem4 = formdata.mem4;
      console.log(mem4);
      findLeader.ResponseCount = findLeader.ResponseCount + 1;
      const doc = await findLeader.save();
      console.log("the doc");
      const findResponseCount = await user.findOne(
        {id: lead},
        {_id: 0, ResponseCount: 1}
      );
      console.log(findResponseCount, "the response count");

      if (formdata.reject.length == 0 || formdata.reject == "") {
        const updaterejectOf = await form.updateOne(
          {
            _id: formid,
          },
          {$set: {reject: `${rollNo}`}},
          {
            new: true,
          }
        );
      } else {
        const updaterejectOf = await form.updateOne(
          {
            _id: formid,
          },
          {$set: {reject1: `${rollNo}`}},
          {
            new: true,
          }
        );
      }

      if (formdata.mem_count == findResponseCount.ResponseCount) {
        const OpenForm = await user.updateOne(
          {id: lead},
          {$set: {isSUBMIT: false, isACCEPTED: false}}
        );
        console.log(OpenForm, "open it");
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

        if (mem3 != "" && mem4 != "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem3, OutputOF);
          // sendSingleMail(1, mem4, OutputOF);
        } else if (mem3 == "" && mem4 == "") {
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
          // sendSingleMail(1, lead, OutputOF);
        } else if (mem3 != "" && mem4 == "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem3, OutputOF);
        } else if (mem4 != "" && mem3 == "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem4, OutputOF);
        }
        // findLeader.isSUBMIT = false;

        // // findLeader.groupRequest = "";
        // const doc = await findLeader.save();
        // const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has accepted the group invit</h4></div>`;
        // sendMail(3, lead, lead, mem3, OutputOF);
        // console.log(doc, "your response");
        console.log("everything updated in mem2 rej");
      } else if (rollNo.toUpperCase() == mem3) {
        const updateMem3 = await form.updateOne(
          {_id: formid},
          {$set: {mem3: ""}}
        );

        if (mem2 != "" && mem4 != "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem2, OutputOF);
          // sendSingleMail(1, mem4, OutputOF);
        } else if (mem2 == "" && mem4 == "") {
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
          // sendSingleMail(1, lead, OutputOF);
        } else if (mem2 != "" && mem4 == "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem2, OutputOF);
        } else if (mem4 != "" && mem2 == "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem4, OutputOF);
        }

        console.log("everything updated in mem2 rej");
      } else if (rollNo.toUpperCase() == mem4) {
        const updateMem4 = await form.updateOne(
          {_id: formid},
          {$set: {mem4: ""}}
        );
        console.log("updateMem4", "agg lagi", updateMem4);
        if (mem2 != "" && mem3 != "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem2, OutputOF);
          // sendSingleMail(1, mem3, OutputOF);
        } else if (mem2 == "" && mem3 == "") {
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
          // sendSingleMail(1, lead, OutputOF);
        } else if (mem2 != "" && mem3 == "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem2, OutputOF);
        } else if (mem3 != "" && mem2 == "") {
          console.log("yes it is nt null");
          const OutputOF = `<div><h4>It is to inform you guys that ${rollNo} has rejected the group invite</h4></div>`;
          // sendSingleMail(1, lead, OutputOF);
          // sendSingleMail(1, mem3, OutputOF);
        }

        console.log("everything updated in mem2 rej");
      }
    }
    res.set("Access-Control-Allow-Origin", "*");
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
    const stu4_id = formdata.mem4;
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
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        project_description: formdata.project_description,
      });
    } else if (formdata.mem_count == 3) {
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      const stu2 = await user.findOne({id: stu2_id}, {_id: 0, s_tokens: 0});
      const stu3 = await user.findOne({id: stu3_id}, {_id: 0, s_tokens: 0});
      const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});

      if (stu2 != null && stu3 != null) {
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
      } else if (stu2 == null && stu3 == null) {
        student = [
          ...student,
          {
            name: stu1.s_name,
            email: stu1.s_email,
            seatno: stu1.id,
            status: stu1.s_status,
          },
        ];
      }
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        project_description: formdata.project_description,
      });
    } else if (formdata.mem_count == 4) {
      const stu1 = await user.findOne({id: stu1_id}, {_id: 0, s_tokens: 0});
      const stu2 = await user.findOne({id: stu2_id}, {_id: 0, s_tokens: 0});
      const stu3 = await user.findOne({id: stu3_id}, {_id: 0, s_tokens: 0});
      const stu4 = await user.findOne({id: stu4_id}, {_id: 0, s_tokens: 0});
      const formdata = await form.findOne({_id: stu1.formid}, {_id: 0});

      if (stu2 != null && stu3 != null && stu4 != null) {
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
        student = [
          ...student,
          {
            name: stu4.s_name,
            email: stu4.s_email,
            seatno: stu4.id,
            status: stu4.s_status,
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
          },
        ];
        student = [
          ...student,
          {
            name: stu4.s_name,
            email: stu4.s_email,
            seatno: stu4.id,
            status: stu4.s_status,
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
      } else if (stu2 == null && stu3 != null && stu4 == null) {
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
      } else if (stu2 == null && stu3 != null && stu4 != null) {
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
        student = [
          ...student,
          {
            name: stu4.s_name,
            email: stu4.s_email,
            seatno: stu4.id,
            status: stu4.s_status,
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
        student = [
          ...student,
          {
            name: stu2.s_name,
            email: stu2.s_email,
            seatno: stu2.id,
            status: stu2.s_status,
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
            name: stu4.s_name,
            email: stu4.s_email,
            seatno: stu4.id,
            status: stu4.s_status,
          },
        ];
      }
      res.set("Access-Control-Allow-Origin", "*");
      res.status(200).json({
        student: student,
        project_title: formdata.s_proj_title,
        internal: formdata.s_internal,
        external: formdata.s_external,
        internal_designation: formdata.internal_designation,
        external_designation: formdata.external_designation,
        project_description: formdata.project_description,
      });
    }
  }

  // res.send("you have hiten the route");
};

const ProposalForm = async (req, res) => {
  console.log(req.body);
  const {
    category,
    characteristics,
    outline,
    objectives,
    scope,
    methodology,
    exp_outcomes,
    exp_budget,
    gant_chart,
    alignment,
    co_supervisor,
    rollNo,
  } = req.body;
  const submitproposal = await new proposal({
    category,
    characteristics,
    outline,
    objectives,
    scope,
    methodology,
    exp_outcomes,
    exp_budget,
    gant_chart,
    alignment,
    co_supervisor,
  });
  const doc1 = await submitproposal.save();
  console.log(doc1, "your form is submitted");
  const leader = await user.findOne({id: rollNo.toUpperCase()});
  const formid = leader.formid;
  const formdata = await form.findOne({_id: formid});

  const updatestu1 = await user.updateOne(
    {id: rollNo},
    {$set: {proposalid: doc1._id, isPROPOSAL: true}}
  );
  if (formdata.mem_count == 2) {
    if (formdata.mem2.length > 0) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem2},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    } else if (formdata.mem3.length > 0) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem3},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    }
  } else if (formdata.mem_count == 3) {
    if (formdata.mem2.length > 0 && formdata.mem3.length > 0) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem2},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
      const updatestu3 = await user.updateOne(
        {id: formdata.mem3},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    } else if (
      (formdata.mem3.length > 0 && formdata.mem2.length == 0) ||
      formdata.mem2.length == ""
    ) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem3},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    } else if (
      (formdata.mem2.length > 0 && formdata.mem3.length == 0) ||
      formdata.mem3.length == ""
    ) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem2},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    }
  } else if (formdata.mem_count == 4) {
    if (
      formdata.mem2.length > 0 &&
      formdata.mem3.length > 0 &&
      formdata.mem4.length > 0
    ) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem2},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
      const updatestu3 = await user.updateOne(
        {id: formdata.mem3},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
      const updatestu4 = await user.updateOne(
        {id: formdata.mem4},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    } else if (
      formdata.mem3.length > 0 &&
      formdata.mem2.length == 0 &&
      formdata.mem4.length == 0
    ) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem3},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    } else if (
      formdata.mem2.length > 0 &&
      formdata.mem3.length == 0 &&
      formdata.mem4.length == 0
    ) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem2},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    } else if (
      formdata.mem2.length == 0 &&
      formdata.mem3.length == 0 &&
      formdata.mem4.length > 0
    ) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem4},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    } else if (
      formdata.mem2.length > 0 &&
      formdata.mem3.length > 0 &&
      formdata.mem4.length == 0
    ) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem2},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
      const updatestu3 = await user.updateOne(
        {id: formdata.mem3},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    } else if (
      formdata.mem2.length > 0 &&
      formdata.mem3.length == 0 &&
      formdata.mem4.length > 0
    ) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem2},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
      const updatestu3 = await user.updateOne(
        {id: formdata.mem4},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    } else if (
      formdata.mem2.length == 0 &&
      formdata.mem3.length > 0 &&
      formdata.mem4.length > 0
    ) {
      const updatestu2 = await user.updateOne(
        {id: formdata.mem4},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
      const updatestu3 = await user.updateOne(
        {id: formdata.mem3},
        {$set: {proposalid: doc1._id, isPROPOSAL: true}}
      );
    }
  }
  res.set("Access-Control-Allow-Origin", "*");
  res.json({
    category,
    characteristics,
    outline,
    objectives,
    scope,
    methodology,
    exp_outcomes,
    exp_budget,
    gant_chart,
    alignment,
    co_supervisor,
  });
  console.log(updatestu1);
};
module.exports = {formdata, updateStatus, ProposalForm};
