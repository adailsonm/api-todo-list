const express = require("express");
const { verifyUserByJWT } = require("../middleware");

const userController = require("../controllers/UserController");
const projectController = require("../controllers/ProjectController");
const taskController = require("../controllers/TaskController");

const router = new express.Router();

router.get("/healthcheck", (req, res) => {
  res.json({
    message: "API v1.0.0"
  })
})

router.post("/users",verifyUserByJWT, userController.create)
router.post("/users/login", userController.login)
router.get("/users/search",verifyUserByJWT, userController.search)

router.get("/projects", verifyUserByJWT, projectController.index)
router.post("/projects", verifyUserByJWT, projectController.create);
router.delete("/projects/:id", verifyUserByJWT, projectController.destroy);
router.put("/projects/:id/associate/user",verifyUserByJWT, projectController.associateUser)
router.put("/projects/:id/associate/task", verifyUserByJWT, projectController.associateTask)

router.post("/tasks", verifyUserByJWT, taskController.create);
router.put("/tasks/:id", verifyUserByJWT, taskController.store)

module.exports = router;
