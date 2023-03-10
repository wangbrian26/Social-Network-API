const router = require("express").Router();
const { Thought, User } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.status(200).json(thoughts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id);
    if (!thought) {
      res.status(404).json({ message: "No thought with this id." });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/:id/reactions", async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      {
        $push: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          },
        },
      },
      { new: true }
    );
    if (!thought) {
      res.status(404).json({ message: "No thought with this id." });
      return;
    }
    res.status(200).json(thought);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id/reactions/:reactionID", async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.reactionID } } },
      { new: true }
    );
    res.status(200).json({ message: "Reaction deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newThought = await Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    });
    const userThought = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: newThought } },
      { new: true }
    );
    res.status(200).json({ message: "Thought added." });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const thoughtUpdate = await Thought.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!thoughtUpdate) {
      res.status(404).json({ message: "No thought with this id." });
      return;
    }
    res.status(200).json(thoughtUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.id);
    if (!thought) {
      res.status(404).json({ message: "No thought with this id." });
      return;
    }
    const userThought = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $pull: { thoughts: req.params.id } },
      { new: true }
    );
    res.status(200).json({ message: "Thought deleted." });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
