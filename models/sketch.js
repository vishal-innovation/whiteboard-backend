const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSketchSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  sketchUrl: {
    type: String,
    required: true,
  },
});

const Sketch = new mongoose.model("Sketch", userSketchSchema);

module.exports = Sketch;
