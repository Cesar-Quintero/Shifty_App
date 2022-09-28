const Shift = require("../models/Availability");

module.exports = {
  getCalendar: async (req, res) => {
    try {
      const shift = await Shift.find({ user: req.user.id });
      if (shift[0] !== undefined) {
        res.render("calendar.ejs", { shift: shift, user: req.user });
      } else {
        res.redirect("/rawCalendar");
      }
    } catch (err) {
      console.log(err);
    }
  },
  getRawCalendar: async (req, res) => {
    try {
      const shift = await Shift.find({ user: req.user.id });
      res.render("rawCalendar.ejs", { shift: shift, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  updateAvail: async (req, res) => {
    try {
      await Shift.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            cbSun: req.body.cbSun,
            cbMon: req.body.cbMon,
            cbTues: req.body.cbTues,
            cbWed: req.body.cbWed,
            cbThur: req.body.cbThur,
            cbFri: req.body.cbFri,
            cbSat: req.body.cbSat,
            mornShift: req.body.mornShift,
            midShift: req.body.midShift,
            nightShift: req.body.nightShift,
          },
        }
      );
      console.log("updated availbility!");
      res.redirect("/calendar");
    } catch (err) {
      console.log(err);
    }
  },
  createShift: async (req, res) => {
    try {

      await Shift.create({
        cbSun: req.body.cbSun,
        cbMon: req.body.cbMon,
        cbTues: req.body.cbTues,
        cbWed: req.body.cbWed,
        cbThur: req.body.cbThur,
        cbFri: req.body.cbFri,
        cbSat: req.body.cbSat,
        mornShift: req.body.mornShift,
        midShift: req.body.midShift,
        nightShift: req.body.nightShift,
        user: req.user.id,
      });
      console.log("Shift has been added!");
      res.redirect("/calendar");
    } catch (err) {
      console.log(err);
    }
  },
  deleteShift: async (req, res) => {
    try {
      console.log(req.params.id)
      await Shift.remove({ _id: req.params.id });
      console.log("Deleted Shift");
      res.redirect("/rawCalendar");
    } catch (err) {
      console.log(err)
      res.redirect("/rawCalendar");
    }
  },
};