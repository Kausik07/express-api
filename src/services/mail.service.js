const nodemailer = require("nodemailer");
const { MAIL_USER, MAIL_PASS } = require("../configs");

async function sendMail(to, subject, text) {
    let testAccount = await nodemailer.createTestAccount()

    let mailClient = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let mailOptions = {
        from: testAccount.user,
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