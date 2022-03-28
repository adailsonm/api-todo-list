const projectService = require('../service/ProjectService');
const userService = require('../service/UserService');


exports.index = async (request, response) => {
  try {
    const projects = await projectService.findAllWithUser(request.user._id);
    return response.status(200).json({
      status: 200,
      items: projects,
    })
  } catch(error) {
    console.log(error);
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }
  
}
exports.create = async (request, response) => {
  const { name } = request.body;

  try {
    await projectService.persist(name, request.user._id);
  } catch(error) {
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }
  
  return response.status(201).json({
    status: 201,
    message: "Project created sucessfully",
  });
}

exports.destroy = async (request, response) => {
  const { id } = request.params;

  try {
    await projectService.remove(id);
  } catch(error) {
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }
  
  return response.status(201).json({
    status: 200,
    message: "Project deleted sucessfully",
  });
}

exports.associateUser = async (request, response) => {
  const { user } = request.body;
  const { id } = request.params;
  try {
    await projectService.associateUser(id, user);
  } catch(error) {
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }
  
  return response.status(201).json({
    status: 200,
    message: "Project associated with user sucessfully",
  });
}

exports.associateTask = async (request, response) => {
  const { task } = request.body;
  const { id } = request.params;
  try {
    await projectService.associateTask(id, task);
  } catch(error) {
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }
  
  return response.status(201).json({
    status: 200,
    message: "Project associated with task sucessfully",
  });
}

exports.findById = async(request, response) => {
  const { id } = request.params;
  try {
    let result = await projectService.findById(id, request.user._id);
    return response.status(200).json({
      status: 200,
      item: result
    })
  } catch(error) {
    return response.status(400).json({
      status: 400,
      message: error.message
    })
  }

}

