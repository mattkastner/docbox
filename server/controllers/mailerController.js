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

    let emailText = `Hello ${firstName}, here is the link to sign in: ${signUpURL}`
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