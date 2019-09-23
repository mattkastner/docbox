const create = async (req, res) => {
    //destruct the hospital from the params
    console.log('here')
    const {hospital_id} = req.params
    //desctruct the doctor values
    let {
        firstName,
        lastName, 
        email} = req.body
    //get access to the sql files
    const db = req.app.get('db')
    const id = await db.doctor.add_doctor([hospital_id, 
        firstName,
        lastName,
        email])

    return res.status(200).send(id)
}

const read = async (req, res) => {
    let {id} = req.params
    console.log(id)
    //get access to the sql files
    const db = req.app.get('db')
    const foundDoctor = await db.doctor.get_doctor([id])
    console.log(foundDoctor)
    //a doctor will be passed back send that to the front-end
    return res.status(200).send(foundDoctor[0])
}

const readAll = async (req, res) => {
    //get access to the sql files
    console.log("docReadAl")
    const db = req.app.get('db')
    const foundDoctors = await db.doctor.get_all_doctors()
    //an array of doctor will be passed back send that to the front-end
    return res.status(200).send(foundDoctors)
}

const getDoctorByHospital = async (req, res) => {
    //get the params
    const {hospital_id} = req.params
    //get access to the sql files
    const db = req.app.get('db')
    const foundDoctors = await db.doctor.get_doctors_by_hospital([hospital_id])
    //an array of doctor will be passed back send that to the front-end
    return res.status(200).send(foundDoctors)
}


const updateGeneral = async (req, res) => {
    //get the doctor's id &  desctruct the doctors values
    let {id} = req.params
    let {
        firstName,
        lastName,
        addressLine, 
        city, 
        state, 
        zip, 
        country, 
        email,
        phone
    } = req.body
    //get access to the sql files
    const db = req.app.get('db')
    //check to see if the doctor exists, if not notify the admin
    const foundDoctor = await db.doctor.get_doctor([id])
    if(!foundDoctor[0]) return res.status(409).send('This doctor does not exist')
    //update the database based on id
    await db.doctor.update_doctor_info([     
        firstName,
        lastName,
        addressLine, 
        city, 
        state, 
        zip, 
        country, 
        email,
        phone,
        id])

    const updatedDoctors = await db.doctor.get_all_doctors()
    //an array of updated doctors related to that hospital will be passed back send that to the front-end
    return res.status(200).send({doctors: updatedDoctors})
}

const updateEducation = async (req, res) => {
    //get the doctor's id &  desctruct the doctors values
    let {id} = req.params
    //get access to the sql files
    const db = req.app.get('db')
    //check to see if the doctor exists, if not notify the admin
    const foundDoctor = await db.doctor.get_doctor([id])
    if(!foundDoctor[0]) return res.status(409).send('This doctor does not exist')

    let {
        undergraduateCollege, 
        undergraduateDegree, 
        graduateCollege, 
        graduateDegree, 
        residencyClinic, 
        boardExam, 
        boardExamID
    } = req.body
    //update the database based on id
    await db.doctor.update_doctor_edu([
        undergraduateCollege, 
        undergraduateDegree, 
        graduateCollege, 
        graduateDegree, 
        residencyClinic, 
        boardExam, 
        boardExamID,
        id
    ])

    const updatedDoctors = await db.doctor.get_all_doctors()
    //an array of updated doctors related to that hospital will be passed back send that to the front-end
    return res.status(200).send({doctors: updatedDoctors})
}

const deleteDoctor = async (req, res) => {
    //get the doctor id
    let {id} = req.params
    console.log(id)
    //get access to the sql files
    const db = req.app.get('db')
    //check to see if the doctor exists
    const foundDoctor = await db.doctor.get_doctor([id])
    console.log(foundDoctor)
    if(!foundDoctor[0]) return res.status(409).send('This doctor does not exist')
    //delete the doctor the database based on id
    await db.doctor.delete_doctor([id])
    //get all the doctors
    const updatedDoctors = await db.doctor.get_all_doctors()
    //an array of updated doctors related to that hospital will be passed back send that to the front-end
    return res.status(200).send({doctors: updatedDoctors})
}

module.exports = {
    create,
    read,
    readAll,
    getDoctorByHospital,
    updateGeneral,
    updateEducation,
    deleteDoctor
}