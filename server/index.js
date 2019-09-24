require('dotenv').config()

const cors = require('cors')
const massive = require('massive')
const express = require('express')
const session = require('express-session')

const mailerCtrl = require('./controllers/mailerController')
const authCtrl = require('./controllers/authController')
const empCtrl = require('./controllers/employeeController')
const hospCtrl = require('./controllers/hospitalController')
const docCtrl = require('./controllers/doctorController')
const certCtrl = require('./controllers/certificationController')
// const middleWare = require('./controllers/middleWareController')
const app = express()

const path = require('path')

// app.get('*', (req, res)=>{
//     res.sendFile(path.join(__dirname, '../build/index.html'));
// });


const {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env

app.use( express.static( `${__dirname}/../build` ) )

app.use(cors())
// app.use(middleWare.verifyAdmin())
app.use(express.json())
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 6000000
    }
}))


massive(CONNECTION_STRING).then(dbInstance => {
    app.set('db', dbInstance)
    console.log('DATABASE')
})

//Nodemailer
app.post('/mail/:id', mailerCtrl.sendEmail)

//Auth endpoints
app.get('/auth/verify', authCtrl.verify)
app.post('/auth/login', authCtrl.login)
app.delete('/auth/logout', authCtrl.logout)

//Employee endpoints
app.post('/api/employee', empCtrl.create)
app.get('/api/employee/view', empCtrl.readAll)
app.get('/api/employee/:id', empCtrl.read)
app.put('/api/employee/:id', empCtrl.update)
app.delete('/api/employee/:id', empCtrl.deleteEmployee)

//Hospital endpoints
app.post('/api/hospital', hospCtrl.create)
app.get('/api/hospital/view', hospCtrl.readAll)
app.get('/api/hospital/:id', hospCtrl.read)
app.put('/api/hospital/:id', hospCtrl.update)
app.delete('/api/hospital/:id', hospCtrl.deleteHospital)

//Doctor endpoints
app.post('/api/doctor/:hospital_id', docCtrl.create)
app.get('/api/doctor/view', docCtrl.readAll)
app.get('/api/doctor/hospital/:hospital_id', docCtrl.getDoctorByHospital)
app.put('/api/doctor/general/:id', docCtrl.updateGeneral)
app.put('/api/doctor/education/:id', docCtrl.updateEducation)
app.delete('/api/doctor/:id', docCtrl.deleteDoctor)
app.get('/api/get/doctor/:id', docCtrl.read)

//Certifications endpoints
app.post('/api/certification/:doctor_id', certCtrl.create)
app.get('/api/certification/view' , certCtrl.getCertifications)
app.get('/api/certification/:id', certCtrl.read)
app.get('/api/all/doctor/certification' , certCtrl.getExpiringCertifications)
app.get('/api/doctor/certification/:doctor_id',certCtrl.readDoctorCertification)
app.put('/api/certification/:id', certCtrl.update)
app.delete('/api/certification/:id', certCtrl.deleteCertification)

app.listen(SERVER_PORT, () => {
    console.log('SERVER')
})