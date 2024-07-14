const express = require("express");
const router = express.Router();

const authcontroller = require("../app/controllers/AuthController");
module.exports = router;

router.post('/update-user', authcontroller.updateuser)
router.post('/add-user', authcontroller.addbook)
router.post('/add-book', authcontroller.addbook)
router.post('/signup' , authcontroller.signup )
router.post('/login' , authcontroller.login)
