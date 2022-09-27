const express = require("express");
const router = express.Router();
const calendarController = require("../controllers/calendar")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, calendarController.getCalendar);

router.post("/createShift", calendarController.createShift);

router.put("/updateAvail/:id", calendarController.updateAvail);

router.delete("/deleteShift/:id", calendarController.deleteShift);

module.exports = router;