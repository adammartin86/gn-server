function adminUser() {
    return (req, res, next) => {
        if(req.user.permission !== admin) {
            res.status(401).send("ADMINS ONLY")
        }

        next()
    }
}

module.exports = adminUser