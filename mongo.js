const mongoose = require("mongoose");
mongoose
  .connect("mongodb+srv://pharma.g46ctxn.mongodb.net/")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Connection failed");
  });
const Schema = mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },

  metamaskId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Pharma = mongoose.model("Pharma", Schema);

module.exports = Pharma;
