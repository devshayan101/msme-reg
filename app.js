const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv/config');
const fs = require('fs-extra')
const multer = require('multer')

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//File-Upload to server
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

//Init Upload
const upload = multer({
  storage: storage
}).fields([{ name: 'aadhaarFile01', maxCount: 1 }, { name: 'aadhaarFile02', maxCount: 1 },
{ name: 'panFile', maxCount: 1 }]);


//ROUTES
app.get('/', (req, res) => {
  res.render('index', { formHead: 'Udyog Aadhaar Registration', time: '1-2 Days', price: '1500', payLink: 'https://imjo.in/wdGxZJ' });
});

app.get('/update', (req, res) => {
  res.render('index', { formHead: 'Update, Print & Trace Acknowledgement', time: '1-2 Days', price: '1500', payLink: 'https://imjo.in/wdGxZJ' });
});

app.get('/databank', (req, res) => {
  res.render('index', { formHead: 'Databank Registration', time: '1-2 Days', price: '1500', payLink: 'https://imjo.in/wdGxZJ' });
});

app.get('/instant', (req, res) => {
  res.render('index', { formHead: 'Instant MSME Registration', time: '1-2 Days', price: '2100', payLink: 'https://imjo.in/MxnV88' });
});

app.get('/gst', (req, res) => {
  res.render('index', { formHead: 'GST Registration', time: '10-15 Days', price: '1499', payLink: 'https://imjo.in/eVYjhp' })
})

app.get('/warranty', (req, res) => {
  res.render('warranty')
})

app.get('/terms', (req, res) => {
  res.render('terms')
})

app.get('/disclaimer', (req, res) => {
  res.render('disclaimer')
})

app.post('/submit', upload, (req, res, err) => {
  const adminOutput = `
    <p>You have a new Registration</p>
    <h3>Details</h3>
    <ul>
      <li>Form Type: ${req.body.formtype}</li>  
      <li>Aadhaar Card Name: ${req.body.aadhaarCardName}</li>
      <li>Aadhaar Card No: ${req.body.aadhaarCardNo}</li>
      <li>Pan Number: ${req.body.panNumber}</li>
      <li>E-mail: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Category: ${req.body.category}</li>
      <li>Gender: ${req.body.gender}</li>
      <li>FirmName: ${req.body.firmName}</li>
      <li>BuisnessType: ${req.body.buisnessType}</li>
      <li>BuisnessAddress: ${req.body.buisnessAddress}</li>
      <li>DateOfStart: ${req.body.dateOfStart}</li>
      <li>Nature: ${req.body.nature}</li>
      <li>Employees: ${req.body.employees}</li>
      <li>Investment: ${req.body.investment}</li>
      <li>Account No: ${req.body.accountNo}</li>
      <li>Ifsc: ${req.body.ifsc}</li>
    </ul>
  
  `;
  const userOutput = `
    <p>Your form have been submitted successfully.</p>
    <p>Following are the details submitted by you.</p> 
    <h3>Details</h3>
     <ul>
      <li>Form Type: ${req.body.formtype}</li>  
      <li>Aadhaar Card Name: ${req.body.aadhaarCardName}</li>
      <li>Aadhaar Card No: ${req.body.aadhaarCardNo}</li>
      <li>Pan Number: ${req.body.panNumber}</li>
      <li>E-mail: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
      <li>Category: ${req.body.category}</li>
      <li>Gender: ${req.body.gender}</li>
      <li>FirmName: ${req.body.firmName}</li>
      <li>BuisnessType: ${req.body.buisnessType}</li>
      <li>BuisnessAddress: ${req.body.buisnessAddress}</li>
      <li>DateOfStart: ${req.body.dateOfStart}</li>
      <li>Nature: ${req.body.nature}</li>
      <li>Employees: ${req.body.employees}</li>
      <li>Investment: ${req.body.investment}</li>
      <li>Account No: ${req.body.accountNo}</li>
      <li>Ifsc: ${req.body.ifsc}</li>
    </ul>
  `;

  var imgName01 = req.files['aadhaarFile01'][0].filename;
  var imgNameString01 = imgName01.toString();
  var imgPath01 = req.files['aadhaarFile01'][0].path;
  var imgPathString01 = imgPath01.toString();

  var imgName02 = req.files['aadhaarFile02'][0].filename;
  var imgNameString02 = imgName02.toString();
  var imgPath02 = req.files['aadhaarFile02'][0].path;
  var imgPathString02 = imgPath02.toString();

  var imgName03 = req.files['panFile'][0].filename;
  var imgNameString03 = imgName03.toString();
  var imgPath03 = req.files['panFile'][0].path;
  var imgPathString03 = imgPath03.toString();


  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //let testAccount = await nodemailer.createTestAccount(); 

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER, // generated ethereal user
        pass: process.env.PASS // generated ethereal password
      }

    });

    // send mail with defined transport object
    //This is Admin Mailing.
    let infoAdmin = await transporter.sendMail({
      from: '"MSME Registration" <foo@example.com>', // sender address
      to: 'eudyogindiaonline@gmail.com', // list of receivers
      subject: 'ADMIN -MSME Registration', // Subject line
      //text: 'Hello world?', // plain text body
      html: adminOutput, // html body
      attachments: [
        {
          filename: imgNameString01,
          path: imgPathString01
        },
        {
          filename: imgNameString02,
          path: imgPathString02
        },
        {
          filename: imgNameString03,
          path: imgPathString03
        }
      ]
    });

    //This is customer mailing.
    let infoCust = await transporter.sendMail({
      from: '"MSME Registration" <foo@example.com>', // sender address
      to: `${req.body.email}`, // list of receivers
      subject: 'Registration', // Subject line
      //text: 'Hello world?', // plain text body
      html: userOutput, // html body

    });
    if (req.body.formtype === "GST") {
      if (req.body.buisnessType === "private-limited") {
        res.redirect('https://imjo.in/e8DEfr')
      }
      else {
        res.redirect('https://imjo.in/eVYjhp')
      }
    }
    else if (req.body.formtype === "Instant") {
      res.redirect('https://imjo.in/MxnV88')
    }
    else {
      res.redirect('https://imjo.in/wdGxZJ')
    }

    // res.render('index', { formHead: 'Udyog Aadhaar Registration', msg: 'Your form has been successfully submited!' })
  }

  main().catch(console.error);
});


app.listen(process.env.PORT, () => console.log(`Server started on Port ${process.env.PORT}`));