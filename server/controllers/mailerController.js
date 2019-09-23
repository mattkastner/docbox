require('dotenv').config()
const nodemailer = require('nodemailer')

const {EMAIL, PASSWORD} = process.env

const sendEmail = (req, res) => {
    const {id} = req.params
    const {email, firstName, lastName} = req.body
    const signUpURL = `localhost:3000/#/sign_up/${id}`

    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASSWORD
        }
    })

    let emailText = `<p>Hello, the link provided below will give you access to a form to fill out your general infomation.</p>
    <p>You will be asked to take pictures of any certifications that are required for your medical practice.</p>
    <br/>
    <p>Click this link <a href="${signUpURL}">Sign Up</a>.</p>`
    // Step 2
    let mailOptions = {
        from: EMAIL,
        to: email,
        subject: 'Update Certification',
        text: emailText
    }

    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            res.status(409).send('Error Occured')
        } else {
            res.status(200).send('Message Sent!')
        }

    })
}

module.exports = {
    sendEmail
}