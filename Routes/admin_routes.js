const Auth=require('../Controllers/Auth')
const admin=require('../Controllers/admin_controller')
const router=require('express').Router();
router.get('/admin/greeter',Auth.token_verify,Auth.checkrole(["Admin"]),admin.greeter)
module.exports=router;