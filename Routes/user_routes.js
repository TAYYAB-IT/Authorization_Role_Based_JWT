const Auth=require('../Controllers/Auth')
const user=require('../Controllers/user_controller');
const router=require('express').Router();
router.post('/signup',user.signup);
router.post('/signin',user.signin);
router.get('/user/greeter',Auth.token_verify,Auth.checkrole(["User","Admin","Employee"]),user.greeter)
module.exports=router;