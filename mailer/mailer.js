const nodeMailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const SMTPConnection = require('nodemailer/lib/smtp-connection');

const mailConfig={
    host: 'smtp.ethereal.email',
    port: 587,
    auth:{
        user: 'alfreda92@ethereal.email',
        pass: 'bdEYQwMEzbX9175nce'
    },
};

module.exports = nodeMailer.createTransport(mailConfig);