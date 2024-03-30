import nodemailer from "nodemailer";
import { displayTime } from "../utils/displayTime.mjs";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const mailContent = (
  reporter,
  pic,
  { foundDate, dueDate, desc },
  { scope, process }
) => `
 <html>
  <head>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;        
        color: black;
      }

      #body {
        display: grid;
        padding: 1rem;
      }

      p {
        margin: 5px 0;
      }

      a,
      span {
        justify-self: center;
        margin: 5px auto;
      }

      .bold {
        font-weight: 600;
      }

      .tag {
        text-decoration: none;
        display: inline-block;
        width: fit-content;
        padding: 0.4rem 0.6rem;
        background: #000;
        color: white;
        border-radius: 3px;
      }

      a {
        color : white !important;
      }

      span {
        font-size: 14px;
        font-style: italic;
      }

      td {
        padding: 0.5rem 0.3rem;
      }

      .odd {
        background: #000;
      }

      .odd td {
        color: white !important;
      }

      table {
        width: 60%;
        margin: 10px 0;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.575);
      }
    </style>
  </head>
  <body>
    <div id="body">
      <p class="bold">Dear ${pic.fullName},</p>
      <p class="tag">Notification</p>
      <p>You have been assigned a new task.</p>
      <table style="border-collapse: collapse">
        <tr class="odd">
          <td style="width: 15%">Topic</td>
          <td>${process}, ${scope}</td>
        </tr>
        <tr>
          <td>Auditor</td>
          <td>${reporter}</td>
        </tr>
        <tr class="odd">
          <td>P.I.C</td>
          <td>${pic.fullName}</td>
        </tr>
        <tr>
          <td>Found date</td>
          <td>${displayTime(foundDate)}</td>
        </tr>

        <tr class="odd">
          <td>Due date</td>
          <td>${displayTime(dueDate)}</td>
        </tr>

        <tr>
          <td>Description</td>
          <td>
            ${desc}
          </td>
        </tr>
      </table>
      <p>For detailed images and more information click the link below</p>
      <a class="tag" href="http://localhost:3000/opl">Move to OPL</a>
      <span>Please do not reply this automatically email</span>
    </div>
  </body>
</html>

`;

export async function sendMail(reporter, pic, { ...finding }, { ...topic }) {
  // send mail with defined transport object

  await transporter.sendMail({
    from: `Framas | QOFRA" <${process.env.EMAIL}>`, // sender address
    to: "caphechuchu@gmail.com", // list of receivers
    subject: "NEW LPA ISSUE",
    html: mailContent(reporter, pic, finding, topic), // html body
  });
}
