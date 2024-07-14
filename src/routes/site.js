const express = require("express");
const router = express.Router();

const sitecontroller = require("../app/controllers/SiteController");
module.exports = router;



router.get('/add-book' , sitecontroller.addbook)
router.get('/lms' , sitecontroller.lms)
router.get('/aboutme' , sitecontroller.me)
router.get('/signup' , sitecontroller.signup)
router.get('/login' , sitecontroller.login)
router.get("/:slug", sitecontroller.etc);
router.get("/", sitecontroller.home);
