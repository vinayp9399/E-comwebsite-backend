const jwt = require('jsonwebtoken')

const authVerify = (req, res, next) => {
    const token = req.headers['token']

    if (!token) {
        return res.json({ message: "token not available" })
    }

    try {
        const tokenCheck = jwt.verify(token, process.env.jwtsecretkey)
        req.user = tokenCheck
        next()
    } catch (err) {
        return res.json({ message: "token invalid or expired" })
    }
}

module.exports = authVerify
