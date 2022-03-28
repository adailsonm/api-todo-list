const taskService = require('../service/TaskService');
const projectService = require('../service/ProjectService');

exports.createAndAssociateProject = async (request, response) => {
  const { description } = request.body;
  try {
    const { projectId } = request.params;
    
    let result = await taskService.persist(description);
    await projectService.associateTask(projectId, result._id);
  } catch(error) {
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }
  
  return response.status(201).json({
    status: 201,
    message: "Task created and associate with project sucessfully",
  });
}

exports.store = async (request, response) => {
  const { id } = request.params;
  const { description, finished_at, status } = request.body
  try {
    await taskService.store(id, description, finished_at, status);
  } catch(error) {
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }
  
  return response.status(200).json({
    status: 201,
    message: "Task updated sucessfully",
  });
}

exports.destroy = async (request, response) => {
  const { id } = request.params;
  try {
    await taskService.destroy(id);
  } catch(error) {
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }
  
  return response.status(200).json({
    status: 201,
    message: "Task updated sucessfully",
  });
}
