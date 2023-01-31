const router = require("express").Router();
const { Thought, Reaction } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
