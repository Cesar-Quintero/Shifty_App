const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const calendarController = require("../controllers/calendar")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get('/calendar', ensureAuth, calendarController.getCalendar)
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/signupFirstTime", authController.getSignupFirstTime);
router.post("/signupPostFirstTime", authController.signupPostFirstTime)
router.get("/rawCalendar", ensureAuth, calendarController.getRawCalendar)

module.exports = router;