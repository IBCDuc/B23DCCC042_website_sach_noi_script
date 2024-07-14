const express = require("express");
const router = express.Router();

const usercontroller = require("../app/controllers/UserController");
module.exports = router;



router.get('/update/:id' , usercontroller.updateuser)
router.get('/delete/:id' , usercontroller.deleteuser)
router.get('/add-user' , usercontroller.adduser)

router.get('/' , usercontroller.user)