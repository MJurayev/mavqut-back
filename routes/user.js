let router = require("express").Router()
let controller = require("./../controllers/user")
let multer = require("./../middlewares/multer")

router.route('/')
    .post( multer , controller.create )

router.route('/:id')
    .put( controller.update );

router.route('/login')
    .post( controller.login );

router.route('/info/:id')
    .get( controller.info );

router.route('/getAll')
    .get( controller.getAll );

module.exports = router