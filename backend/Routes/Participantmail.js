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
const EmailSender = ({ event, email }) => {
  const options = {
    from: `Internflow`,
    to: email,
    subject: "invitation to an Event",
    html: `
       
          <div style="width: 100%; gap: 10px; padding: 30px 0; display: grid">
            <p style="font-weight: 800; font-size: 1.2rem; padding: 0 30px">
              Form Interflow
            </p>
            <div style="font-size: .8rem; margin: 0 30px">
              <p>Event details</p>
              <p>Title : <b>${event.title}</b></p>
              <p>Created By : <b>${event.creator}</b></p>
              <p>Description : <b>${event.description}</b></p>
              <p>Category : <b>${event.category}</b></p>
              <p>type : <b>${event.location}</b></p>
              <p>Start Date : <b>${event.startDate}</b></p>
              <p>More Info : <b>${event.moreInfo}</b></p>
             
            </div>
          </div>
        </div>
      </div>
        `,
  };

  Email(options);
};

module.exports = EmailSender;
