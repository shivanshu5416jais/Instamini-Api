const express=require("express")
const {signup,signin,signout ,forgotPassword, resetPassword,  socialLogin}=require('../controllers/auth')
const {userById}=require('../controllers/user')

const {userSignupValidator, passwordResetValidator}=require('../validator')

const router=express.Router()

//router.get('/',getPosts)
router.post('/signup',userSignupValidator,signup);
router.post("/social-login", socialLogin); 
router.post("/signin",signin);
router.get("/signout",signout);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", passwordResetValidator, resetPassword);

// any routes containg userId , our app will first execute userById()
router.param("userId",userById);


module.exports=router;

