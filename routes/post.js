const express=require("express")
const {getPosts,
     createPost,
     updatePost,
     postsByUser,
     postById,
     isPoster,
     deletePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment
}=require('../controllers/post')
const {createPostValidator}=require('../validator')
const {requireSignin}=require('../controllers/auth')
const {userById}=require('../controllers/user')


const router=express.Router()


router.get('/posts',getPosts)
// like unlike
router.put('/post/like',requireSignin,like)
router.put('/post/unlike',requireSignin,unlike)
//comments
router.put('/post/comment',requireSignin,comment)
router.put('/post/uncomment',requireSignin,uncomment)
router.post('/post/new/:userId',requireSignin,createPost,createPostValidator)
router.get('/posts/by/:userId',requireSignin,postsByUser)
router.put('/post/:postId',requireSignin,isPoster,updatePost )
router.get('/post/:postId',singlePost)
router.delete('/post/:postId',requireSignin,isPoster, deletePost )
router.get("/post/photo/:postId", photo);


// any routes containg userId , our app will first execute userById()
router.param("userId",userById);
// any routes containg postId , our app will first execute postById()

router.param("postId",postById);


module.exports=router;

