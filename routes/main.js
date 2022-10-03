const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const calendarController = require("../controllers/calendar")
const taxPayrollController = require("../controllers/taxPayroll")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get('/calendar', ensureAuth, calendarController.getCalendar)
router.get("/rawCalendar", ensureAuth, calendarController.getRawCalendar)
router.get("/taxPayroll", ensureAuth, taxPayrollController.getTaxPayroll)
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/signupFirstTime", authController.getSignupFirstTime);
router.post("/signupPostFirstTime", authController.signupPostFirstTime)

module.exports = router;