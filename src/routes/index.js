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

router.post("/users", userController.create)
router.post("/users/login", userController.login)
router.get("/users/search",verifyUserByJWT, userController.search)
router.post('/users/refresh', userController.refreshToken)
router.get("/projects", verifyUserByJWT, projectController.index);
router.get("/projects/:id", verifyUserByJWT, projectController.findById);
router.post("/projects", verifyUserByJWT, projectController.create);
router.delete("/projects/:id", verifyUserByJWT, projectController.destroy);
router.put("/projects/:id/associate/user",verifyUserByJWT, projectController.associateUser);
router.put("/projects/:id/associate/task", verifyUserByJWT, projectController.associateTask);

router.post("/projects/:projectId/associate/task", verifyUserByJWT, taskController.createAndAssociateProject);
router.put("/tasks/:id", verifyUserByJWT, taskController.store)

module.exports = router;
