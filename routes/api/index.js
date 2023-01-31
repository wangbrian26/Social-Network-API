const router = require("express").Router();
const thoughtsRoute = require("./thoughtsRoute.js");
const usersRoute = require("./usersRoute.js");

router.use("/thoughts", thoughtsRoute);
router.use("/users", usersRoute);

module.exports = router;
