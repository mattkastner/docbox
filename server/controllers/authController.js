const bcrypt = require('bcryptjs')

const register = async (req, res) => {
    const {firstName, lastName, email, password, adminType} = req.body
    const db = req.app.get('db')
    const foundUser = await db.find_user([username])
    //does found user exist?
    if(foundUser[0]) return res.status(409).send('Sorry, username is already taken') 
    //create a salt and hash for the password
    const passwordSalt = bcrypt.genSaltSync(15)
    const passwordHash = bcrypt.hashSync(password, passwordSalt)
    //register the user
    const newUser = await db.register_employee([firstName, lastName, email, passwordHash, adminType])
    //delete new user password
    delete newUser[0].password
    //store user info on the session
    req.session.user = newUser[0]
     //create user obj
     const allPosts = await db.get_all_posts()
     res.status(200).send({allPosts, user:foundUser[0]})
}

const login = async (req, res) => {
    const {email, password} = req.body
    const db = req.app.get('db')
    const foundUser = await db.employee.get_employee([email])
    //see if username exists
    if(!foundUser[0]) return res.status(409).send('Email does not exist')
    //see if user is auth
   // const authPass = bcrypt.compareSync(password, foundUser[0].password)
    const authPass = password === foundUser[0].password

    if(authPass) {
        //remove the password
        delete foundUser[0].password
        //store user onto the session
        req.session.user = foundUser[0]
        res.status(200).send(foundUser[0].title)
        
    } else {
        console.log('failed login')
        return res.status(401).send('Incorrect password')
    }
}

const verify = (req, res) => {
    if(req.session.user) return res.status(200).send(req.session.user.title)
    return 'unauthorized_user'
}

const logout = (req, res) => {
    //destory the session
    req.session.destroy()
    res.status(200).send('user has been logged out')
}

module.exports = {
    login,
    logout,
    verify,
    register
}