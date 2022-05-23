const validator = async (req, res, next) => {
    const valid = req.user.isAdmin
    return next(valid ? null : { message: "No permissions", status: "403" });
}

module.exports = validator;