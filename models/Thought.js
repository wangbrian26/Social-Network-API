const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction.js");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: String,
      required: true,
      default: Date.now,
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

thoughtSchema.virtual("responsesCount").get(function () {
  return this.responses.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
