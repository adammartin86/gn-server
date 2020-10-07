function adminUser(admin) {
    return (req, res, next) => {
        if(req.body.user.permission !== "admin") {
            res.status(401).send("ADMINS ONLY")
        }

        next()
    }
}

module.exports = adminUser