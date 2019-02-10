const nodemailer = require('nodemailer');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }   
});


exports.send = async (options) => {
    const mailOptions = {
        from: `instituto taular <noreply@taular.com>`,
        to: options.alumno.email,
        html: 'Hemos programado una cita para ti',
        text: 'Por favor se puntual'
    };
    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
}



// Probar funcionamiento
/* 

transport.sendMail({
    from: 'Leo <leonardo@gmail.com>',
    to: 'leonardomibara@gmail.com',
    subject: 'nothing',
    html: 'hey <strong> Leo </strong>',
    text: 'hey'
}); */