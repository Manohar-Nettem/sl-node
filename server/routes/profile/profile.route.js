const router = require("express").Router();
const controller = require("./profile.controller");
const auth = require("./../../middleware/auth");

router
  .route("/user/:id?*")
  .get(controller.getUser)
  .post(controller.createUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

router.route("/login").post(controller.loginUser);

router.route("/course").post(auth, controller.saveCourse);

router.route("/get/course").post(auth, controller.getCourses);

module.exports = router;
