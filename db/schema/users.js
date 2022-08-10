const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"], //custom message validation
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    min: 5,
  },
}); //initialisasi object baru ,yes

module.exports = mongoose.model("user", userSchema);
