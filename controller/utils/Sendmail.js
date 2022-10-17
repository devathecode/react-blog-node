const nodemailer = require('nodemailer');

const SendMail = (email, host, uniqueString) => {
    console.log('email', email)
    console.log('uniqueString', uniqueString);
    let transport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'devanshuv1501@gmail.com',
            pass: 'ubicegkkklksouei'
        }
    });

    let mailOptions = {
        from: 'devanshuv150@gmail.com',
        to: email,
        subject: 'Email Confirmation',
        html : `Press <a href=http://${host}/verify/${uniqueString}> here </a> to verify your email. Thanks`
    };

    transport.sendMail(mailOptions, (error, response) =>{
        if(error){
            console.log('error', error);
        }
        else{
            console.log('Message sent');
        }
    })
}

module.exports = SendMail;
