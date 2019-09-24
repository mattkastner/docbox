const create = async (req, res) => {
    //desctruct the hospital values
    let {name, address, city, state, zip, country, email} = req.body
    //get access to the sql files
    const db = req.app.get('db')
    const updatedHospitals = await db.hospital.add_hospital([name, address, city, state, zip, country, email])
    //an array of hospitals will be passed back send that to the front-end
    return res.status(200).send(updatedHospitals)
}

const read = async (req, res) => {
    console.log('here read one?')
    //get the hospital id
    let {id} = req.params
    //get access to the sql files
    const db = req.app.get('db')
    const foundHospital = await db.hospital.get_hospital([id])
    //a hospital will be passed back send that to the front-end
    return res.status(200).send(foundHospital[0])
}

const readAll = async (req, res) => {
    //get access to the sql files
    console.log('here read all')
    const db = req.app.get('db')
    const foundHospitals = await db.hospital.get_all_hospitals()
    //an array of hospitals will be passed back send that to the front-end
    return res.status(200).send(foundHospitals)
}

const update = async (req, res) => {
    //get the hospital's id &  desctruct the hospital values
    let {id} = req.params
    let {name, address_line, city, state, zip, country} = req.body
    //check to see if the hospital exists, if not notify the admin
    const foundHospital = await db.hospital.get_hospital([id])
    if(!foundHospital[0]) return res.status(409).send('This hospital does not exist')
    //get access to the sql files
    const db = req.app.get('db')
    //update the database based on id
    const updatedHospitals = await db.hospital.update_hospital([name, address_line, address_line2, city, state, zip, country, id])
    //an array of updated hospitals will be passed back send that to the front-end
    return res.status(200).send({hospitals: updatedHospitals})
}

const deleteHospital = async (req, res) => {
    //get the hospital id
    let {id} = req.params
    //get access to the sql files
    const db = req.app.get('db')
    //check to see if the hospital exists
    const foundHospital = await db.hospital.get_hospital([id])
    if(!foundHospital[0]) return res.status(409).send('This hospital does not exist')
    //update the database based on id
    const updatedHospitals = await db.hospital.delete_hospital([id])
    //an array of updated hospital will be passed back send that to the front-end
    return res.status(200).send({hospitals: updatedHospitals})
}

module.exports = {
    create,
    read,
    readAll,
    update,
    deleteHospital
}