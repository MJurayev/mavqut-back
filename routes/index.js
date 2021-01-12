let router = require("express").Router()

router.get('/',(req,res)=>res.send("API working..."))
router.use('/user', require("./user.js") )
router.use('/remnant', require("./remnant.js") )
router.use('/daily', require("./daily.js") )

module.exports = router
