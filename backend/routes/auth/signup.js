const singUpController = require("../../controller/auth/singUpController")

const router=require("express").Router()


router.post('/signup',singUpController)

module.exports=router