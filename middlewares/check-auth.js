let User = require("./../models/user")

module.exports = async function(req, res, next) {
    try {
        let authorization = req.headers['authorization'];
        let token = authorization.split(' ')[1];

        let reqUser = User.decodeToken(token)
        if (reqUser) {

            let user = await User.findOne({ phone: reqUser.phone , password: reqUser.password });

            if (user) {
                req.user_id = user._id;
                next()
            } else {
                    res.status(404).json()
            }

        } else {
            res.status(403).json()
        }
    } catch (error) {
        res.status(403).json({error})
    }
}