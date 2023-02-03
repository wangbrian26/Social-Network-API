const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction.js");
const dateFormater = require("../utils/dateFormater.js");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      get: (timestamp) => dateFormater(timestamp),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual("reactionsCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
