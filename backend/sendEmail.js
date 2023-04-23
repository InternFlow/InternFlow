const nodemailer = require("nodemailer");

const Email = (options) => {
  let transpoter = nodemailer.createTransport({
    service: "gmail", //i use outlook
    auth: {
      user: "mohamedali.fradj@esprit.tn", // email
      pass: "193JMT3397", //password
    },
  });
  transpoter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

// send email
const EmailSender = ({ fullName, email, message }) => {
  const options = {
    from: `Internflow`,
    to: "internflowservices@outlook.com",
    subject: "Message From internflow user",
    html: `
       
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
              Form Interflow
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>FullName: <b>${fullName}</b></p>
              <p>Email: <b>${email}</b></p>
              <p>Message: <i>${message}</i></p>
            </div>
          </div>
        </div>
      </div>
        `,
  };

  Email(options);
};

module.exports = EmailSender;
