const nodemailer = require("nodemailer");
let { MAIL_USER, MAIL_PASS, MAIL_PORT, MAIL_HOST, MAIL_SECURE, PORT } = require("../configs");
let mailClient = nodemailer.createTransport({
    host: MAIL_HOST,
    port: MAIL_PORT,
    secure: MAIL_SECURE,
    auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
    },
});

async function sendMail(to, subject, text) {
    let mailOptions = {
        from: MAIL_USER,
        to, 
        subject,
        text: text,
        html: "<b>"+text+"</b>",
    };
       
    let info = await mailClient.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
    sendMail,
}