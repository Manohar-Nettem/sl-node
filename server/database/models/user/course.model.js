const mongoose = require("mongoose");

const CouseSchema = new mongoose.Schema({
  email: {
    require: true,
    type: String,
  },

  courses: {
    type: Array,
    require: false,
  },
});

const CourseModel = mongoose.model("Course", CouseSchema);

module.exports = CourseModel;
