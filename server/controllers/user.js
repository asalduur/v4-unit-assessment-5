const bcrypt= require('bcryptjs')

module.exports = {
    register: async (req, res) => {
        const {username, password} = req.body
        const dp = `https://robohash.org/${username}.png`
        const db = req.app.get('db')
        const check = await db.user.find_user_by_username(username)
        const found = check[0] 
        if(found){
            return res.status(409).send('username is taken')
        }
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(password, salt)
        const registered = await db.user.create_user(username, hash, dp)
        const user = registered[0] 
        req.session.user = {
            user_id: user.user_id,
            username: user.username,
            dp: user.dp
        }
        res.status(201).send(req.session.user)

    },
    login: async (req, res) => {
        const {username, password} = req.body 
        const db = req.app.get('db')
        const found = await db.user.find_user_by_username(username)
        const user = found[0] 
        if(!user) {
            return res.status(403).send('username not in system. register new username')
        }
        const isAuthenticated = bcrypt.compareSync(password, user.password)
        if(!isAuthenticated){
            return res.status(403).send('login failed. incorrect username and/or password')
        }
        req.session.user = {
            user_id: user.user_id,
            username: user.username,
            dp: user.dp
        }
        return res.status(201).send(req.session.user)
    },
    getUser: (req, res) => {
        if (!req.session.user) {
            res.status(404).send('please enter information to login')
        }
        res.status(200).send(req.session.user)
    },
    logout: (req, res) => {
        req.session.destroy()
        return res.sendStatus(200)
    }
}