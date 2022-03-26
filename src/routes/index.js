const express = require("express");
const userController = require("../controllers/UserController");
const projectController = require("../controllers/ProjectController");
const taskController = require("../controllers/TaskController");

const router = new express.Router();

router.get("/healthcheck", (req, res) => {
  res.json({
    message: "API v1.0.0"
  })
})

router.post("/users", userController.create)
router.post("/users/login", userController.login)
router.get("/users/search", userController.search)

router.get("/projects", projectController.index)
router.post("/projects", projectController.create);
router.delete("/projects/:id", projectController.destroy);
router.put("/projects/:id/associate/user", projectController.associateUser)

router.post("/tasks", taskController.create);
router.put("/tasks/:id", taskController.store)

module.exports = router;
