const cron = require("node-cron");
const sender = require("../config/emailConfig");
const emailService = require("../services/email-service");

const setupJobs = () => {
  cron.schedule("*/5 * * * *", async () => {
    const response = await emailService.fetchPendingEmail();
    response.forEach((email) => {
      sender.sendMail(
        {
          to: email.recepientEmail,
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            await emailService.updateTicket(email.id, {
              status: "SUCCESS",
            });
            console.log("Succssfully reminder email sent");
          }
        }
      );
    });
  });
};

module.exports = setupJobs;
