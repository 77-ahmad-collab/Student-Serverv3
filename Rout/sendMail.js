const user = require("../models/StudentSchema");
const nodemailer = require("nodemailer");
const sendMail = async (count, stu1_id, stu2_id, stu3_id, OutputOF) => {
  console.log(count, stu2_id, stu3_id);
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
  ///*****START FOR NODE MAIL  */
  // create reusable transporter object using the default SMTP transport

  // console.log(mail1, mail2, "heh");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "neduniversity100100@gmail.com",
      pass: process.env.PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  //   console.log(`${mail3.s_email}`);
  const tem = "mzlapq639@gmail.com";
  // send mail with defined transport object
  const list = [
    `${mail2.s_email}`,
    `${
      count == 3 && mail3 != ""
        ? `${mail3.s_email || tem}`
        : "mzlapq639@gmail.com"
    }`,
  ];
  const mailOptions = {
    from: "neduniversity100100@gmail.com",
    to: list,
    subject: "FYP PROJECT INVITIATION",
    text: "check mail!",
    html: OutputOF,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  //***END OD NODE MAIL */
  // res.send("mail sended");
};
const sendSingleMail = async (count, stu1_id, OutputOF) => {
  const mail1 = await user.findOne(
    {id: stu1_id},
    {s_email: 1, s_name: 1, _id: 0}
  );
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "neduniversity100100@gmail.com",
      pass: process.env.PASSWORD,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: "neduniversity100100@gmail.com",
    to: mail1.s_email,
    subject: "FYP PROJECT INVITIATION",
    text: "check mail!",
    html: OutputOF,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {sendMail, sendSingleMail};
