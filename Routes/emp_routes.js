const Auth=require('../Controllers/Auth')
const emp=require('../Controllers/emp_controller')
const router=require('express').Router();
router.get('/emp/greeter',Auth.token_verify,Auth.checkrole(["Employee"]),emp.greeter)
module.exports=router;