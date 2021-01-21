let router = require("express").Router()
let controller = require("./../controllers/user")
let multer = require("./../middlewares/multer")
const CheckAuth = require("./../middlewares/check-auth")

router.route('/')
    .post( multer , controller.create )


router.route('/verify')
    .get(CheckAuth, controller.verify );

router.route('/')
    .put( CheckAuth, controller.update );

router.route('/login')
    .post( controller.login );

router.route('/info')
    .get( CheckAuth, controller.info );

router.route('/getAll')
    .get( controller.getAll );

module.exports = router