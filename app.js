const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');

const app = express();


// View Engine Setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static Folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/', (req, res) => {
	res.render('index');
});

app.post('/send', (req, res) => {
	const output = `
		<p>You have a new contact request</p>
		<h3>Contact details</h3>
		<ul>
			<li>Name: ${req.body.name}</li>
			<li>Name: ${req.body.company}</li>
			<li>Name: ${req.body.email}</li>
			<li>Name: ${req.body.phone}</li>
		</ul>
		<h3>Message</h3>
		<p>${req.body.message}</p>
	`;

	// create reusable transporter object using the default SMTP transport
	// info@iceroll-lausanne.com
	// ete2018iceroll
    let transporter = nodemailer.createTransport({
    	host: 'mail.infomaniak.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'info@iceroll-lausanne.ch', // generated ethereal user
            pass: 'ete2018iceroll' // generated ethereal password
        },
        tls: {
        	rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" <info@iceroll-lausanne.ch>', // sender address
        to: 'rigaldo.jeremy@gmail.com', // list of receivers
        subject: 'Node Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('index', {msg: 'Email has been sent'});
    });
});


app.listen(3000, () => console.log('Server started...'));