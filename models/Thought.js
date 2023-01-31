const { Schema, model } = require("mongoose");

const thoughtSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 300,
    },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", userSchema);

module.exports = User;
