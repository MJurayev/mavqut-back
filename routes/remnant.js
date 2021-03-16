let router = require("express").Router()
let controller = require("./../controllers/remnant")
const CheckAuth = require("./../middlewares/check-auth")

router.route('/')
    .post( CheckAuth ,controller.create );

router.route('/info')
    .get( CheckAuth, controller.getInfo )    

router.route('/getAll')
    .get( controller.getAll );

module.exports = router