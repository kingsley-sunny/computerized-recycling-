const express = require("express");
const Pickup = require("../models/pickup");
const User = require("../models/user");
const { Utils } = require("../utils/utils");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const user = req.session.user;
    const totalUsers = await User.count();
    const totalAdminUsers = await User.count({ where: { type: "admin" } });

    const totalPickups = await Pickup.count();
    const totalSuccessfulPickups = await Pickup.count({ where: { status: "success" } });
    const totalFailedPickups = await Pickup.count({ where: { status: "failed" } });
    const totalPendingPickups = await Pickup.count({ where: { status: "pending" } });
    const pickups = await Pickup.findAll({
      order: [["date", "desc"]],
      limit: 5,
      include: User,
    });
    console.log("🚀 ~~ router.get ~~ pickups:", pickups);

    res.render("./admin/admin", {
      totalUsers,
      user: user,
      title: "Overview",
      layout: "./layout/adminLayout",
      totalPickups,
      totalFailedPickups,
      totalSuccessfulPickups,
      totalPendingPickups,
      totalAdminUsers,
      pickups,
    }); // Fake stat
  } catch (error) {
    console.log(error);
    // res.redirect("/login");
  }
});

router.get("/pickups", async (req, res) => {
  try {
    const user = req.session.user;
    const totalPickups = await Pickup.count();
    const totalSuccessfulPickups = await Pickup.count({ where: { status: "success" } });
    const totalFailedPickups = await Pickup.count({ where: { status: "failed" } });
    const totalPendingPickups = await Pickup.count({ where: { status: "pending" } });

    const pickups = await Pickup.findAll({
      order: [["date", "desc"]],
      include: User,
    });
    console.log("🚀 ~~ router.get ~~ pickups:", pickups);

    return res.render("./admin/pickups", {
      user: user,
      title: "Pickups",
      layout: "./layout/adminLayout",
      totalPickups,
      totalFailedPickups,
      totalSuccessfulPickups,
      totalPendingPickups,
      pickups,
    }); // Fake stat
  } catch (error) {
    console.log(error);
    // res.redirect("/login");
  }
});

router.post("/pickups/update-status/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const pickup = await Pickup.findByPk(id);

    if (!pickup) {
      throw new Error("Pickup Not Found");
    }

    // if(Utils.hasDateExpired(pickup.dataValues?.date)){
    //   throw new Error("Pickup Has already been Expired")
    // }

    pickup.status = req.body.status;

    await pickup.save();

    res.redirect("/admin/pickups");
  } catch (error) {
    res.render("error", {
      message: error.message,
      redirectUrl: "/login",
      title: "Error",
      user: null,
    });
  }
});

module.exports = router;
