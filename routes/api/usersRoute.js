const router = require("express").Router();
const { User, Thought } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "No user with this ID was found." });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "No user with this ID was found." });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "No user with this ID was found." });
      return;
    }
    const thoughts = await Thought.delete({ username: req.body.username });
    res.status(200).json({ message: "User and thoughts deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $push: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user with this ID was found." });
      return;
    }
    res.status(200).json({ message: "Friend added!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: "No user with this ID was found." });
      return;
    }
    res.status(200).json({ message: "Friend deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
