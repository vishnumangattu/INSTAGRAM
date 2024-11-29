import { Router } from "express";
import * as rh from "./requestHandler.js"
import Auth from "./middleware/auth.js";


const router = Router()

router.route('/getuser').get(Auth,rh.getUser)
router.route('/getuserdata').get(Auth,rh.getUserData)
router.route('/edituserdata').post(Auth,rh.editUserData)
router.route('/deleteuser/:_id').delete(rh.deleteData)

router.route('/addpost').post(Auth,rh.addPost)
router.route('/getpost').get(Auth,rh.getPost)
router.route('/getpostdetails/:id').get(rh.getPostDetails)
router.route('/getallposts').get(rh.getAllPosts)



router.route('/signup').post(rh.signUp)
router.route("/signin").post(rh.signIn)
router.route("/checkemail").post(rh.checkEmail)



export default router;