const create = async (req, res) => {
    //destruct the doctor_id from the params
    const {doctor_id} = req.params
    //desctruct the cert values
    let {certificationName, certificationDesc, certificationID, certificationExp, certificationImg} = req.body
    //get access to the sql files
    const db = req.app.get('db')
    
    await db.certification.add_certification([+doctor_id, certificationName, certificationDesc, certificationID, certificationExp, certificationImg])
    //an array of cert will be passed back send that to the front-end
    const updatedCerts = await db.certification.get_doctor_certifications([doctor_id])

    return res.status(200).send(updatedCerts)
}

const read = async (req, res) => {
    //get the cert id
    let {id} = req.params
    //get access to the sql files
    const db = req.app.get('db')
    const foundCert = await db.certification.get_certification([id])
    //a cert will be passed back send that to the front-end
    return res.status(200).send(foundCert[0])
}

const readAll = async (req, res) => {
    //get access to the sql files
    const db = req.app.get('db')
    const foundCerts = await db.certification.get_all_certifications()
    //an array of cert will be passed back send that to the front-end
    return res.status(200).send({certifications: foundCerts})
}

const readDoctorCertification = async (req, res) => {
    //get the doc id
    let {doctor_id} = req.params
    console.log(doctor_id)
    //get access to the sql files
    const db = req.app.get('db')
    const foundCerts = await db.certification.get_doctor_certifications([doctor_id])
    //an array of cert will be passed back send that to the front-end
    console.log(foundCerts)
    return res.status(200).send({certifications: foundCerts})
}

const getExpiringCertifications = async (req, res) => {
    //get access to the sql files
    const db = req.app.get('db')
    const date = new Date()
    const expiringCerts = await db.certification.get_expiring_certifications([date])
    
    //an array of cert will be passed back send that to the front-end
    return res.status(200).send(expiringCerts)
}

const getCertifications = async (req, res) => {
    //get access to the sql files
    const db = req.app.get('db')
    const Certs = await db.certification.get_certifications()
    
    //an array of cert will be passed back send that to the front-end
    return res.status(200).send(Certs)
}

const update = async (req, res) => {
    //get the cert's id &  desctruct the cert values
    let {id} = req.params
    let {certificationName, certificationDesc, certificationID, certificationExp, certificationImg} = req.body
    //check to see if the cert exists, if not notify the admin
    const foundCert = await db.certification.get_certification([id])
    if(!foundCert[0]) return res.status(409).send('This certification does not exist')
    //get access to the sql files
    const db = req.app.get('db')
    //update the database based on id
    await db.certification.update_certification([certificationName, certificationDesc, certificationID, certificationExp, certificationImg, id])

    //an array of updated certs will be passed back send that to the front-end
    return res.status(200).send({certifications: updatedCerts})
}

const deleteCertification = async (req, res) => {
    //get the cert id
    let {id} = req.params
    //get access to the sql files
    const db = req.app.get('db')
    //check to see if the cert exists
    const foundCert = await db.certification.get_certification([id])
    if(!foundCert[0]) return res.status(409).send('This certification does not exist')
    //update the database based on id
    const updatedCertifications = await db.certification.delete_certification([id])
    //an array of updated certs related to that doctor will be passed back send that to the front-end
    //get all the certifications by the doc id
    return res.status(200).send({certifications: updatedCertifications})
}

module.exports = {
    create,
    read,
    getCertifications,
    readAll,
    readDoctorCertification,
    getExpiringCertifications,
    update,
    deleteCertification
}