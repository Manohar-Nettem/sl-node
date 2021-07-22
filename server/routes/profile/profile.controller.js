const User = require("./../../database/models/user/user.model");
const CourseModel = require("./../../database/models/user/course.model");

const controller = {
  createUser: async (req, resp) => {
    const user = await new User(req.body.userInfo);
    resp.status(200).send(user.save());
  },
  getUser: async (req, resp) => {
    const users = await User.find();
    resp.status(200).send(users);
  },
  updateUser: (req, resp) => {
    resp.status(200).send({ message: "user updated" });
  },
  deleteUser: (req, resp) => {
    resp.status(200).send({ message: "user deleted" });
  },
  loginUser: async (req, res) => {
    try {
      console.log("login user");
      console.log(req.body.email);
      console.log(req.body.password);

      const user = await User.findByCridentials(
        req.body.email,
        req.body.password
      );
      console.log(user);

      user.token = await user.generateToken();
      await res.send(user);
    } catch (error) {
      console.log("Error");
      console.log(error);
      res.send({ error: error.message });
    }
  },
  getCourses: async (req, res) => {
    try {
      console.log("get courses");

      console.log(req.body.email);
      const courses = await CourseModel.find({ email: req.body.email });
      console.log("get couses resp::");
      console.log(courses);

      res.send(courses);
    } catch (error) {
      console.log("Error");
      console.log(error);
      res.send({ error: error.message });
    }
  },
  saveCourse: async (req, res) => {
    try {
      console.log(req.body.course);
      const course = new CourseModel(req.body.course);
      console.log("course save resp");
      console.log(course);

      res.send(course.save());
    } catch (error) {
      console.log("Error");
      console.log(error);
      res.send({ error: error.message });
    }
  },
};
module.exports = controller;
