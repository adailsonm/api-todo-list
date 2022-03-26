const taskService = require('../service/TaskService');

exports.create = async (request, response) => {
  const { description } = request.body;

  try {
    await taskService.persist(description);
  } catch(error) {
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }
  
  return response.status(201).json({
    status: 201,
    message: "Task created sucessfully",
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
    message: "Task created sucessfully",
  });
}
