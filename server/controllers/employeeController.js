const create = async (req, res) => {
    //descructer the values off the body
    let {firstName, lastName, email, profile_img, title} = req.body
    //get access to the sql files
    const db = req.app.get('db')
    const updatedEmployees = await db.employee.add_employee([firstName, lastName, email, profile_img, title])
    //return an array of the updated employees
    return res.status(200).send(updatedEmployees)
}

const read = async (req, res) => {
    //get the employee id
    let {id} = req.params
    //get access to the sql files
    const db = req.app.get('db')
    const foundEmployee = await db.employee.get_employee_by_id([id])
    return res.status(200).send(foundEmployee[0])
}

const readAll = async (req, res) => {
    //get access to the sql files
    const db = req.app.get('db')
    const foundEmployees = await db.employee.get_all_employees()
    //an array of employees will be passed back send that to the front-end
    return res.status(200).send({employees: foundEmployees})
}

const update = async (req, res) => {
    //get the employee id &  desctruct the employee values
    let {id} = req.params
    const {firstName, lastName, email, profile_img, title}  = req.body
    const db = req.app.get('db')
    //check to see if the employee exists
    const foundEmployee = await db.employee.get_employee([id])
    if(!foundEmployee[0]) return res.status(409).send('This employee does not exist')
    //update the database based on id
    const updatedEmployees = await db.employee.update_employee([firstName, lastName, email, profile_img, title, id])
    //an array of updated employees will be passed back send that to the front-end
    return res.status(200).send({employees: updatedEmployees})
}

const deleteEmployee = async (req, res) => {
    //get the employee id
    let {id} = req.params
    //get access to the sql files
    const db = req.app.get('db')
    //check to see if the employee exists
    const foundEmployee = await db.employee.get_employee([id])
    if(!foundEmployee[0]) return res.status(409).send('This employee does not exist')
    //update the database based on id
    const updatedEmployees = await db.employee.delete_employee([id])
    //an array of updated employees will be passed back send that to the front-end
    return res.status(200).send({employees: updatedEmployees})
}

module.exports = {
    create,
    read,
    readAll,
    update,
    deleteEmployee
}