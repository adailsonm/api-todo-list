const Project = require('../models/Project');

exports.findAllWithUser = async (userId) => {
  console.log(userId);
  let projects = await Project.find({
    users: {$in: [userId]},
    }).populate([
      { path: "users", select: 'name'},
      { path: 'tasks', select: [
        'description', 'finished_at', 'status'
      ]}
    ])
    .select('-__v');
  let isAssociateUserWithProject = projects.some(project => project.users.length > 0)
  if(!isAssociateUserWithProject) {
    throw new Error('Not found projects associate by user')
  } else {
    return projects;
  }

}

exports.findById = async (id, userId) => {
  let project =  await Project.findOne({ _id: id}).populate([
    { path: "users", select: 'name', match: {_id: userId }},
    { path: 'tasks', select: [
      'description', 'finished_at', 'status'
    ]}
  ]).select('-__v');
  let isAssociateUserWithProject = project.users.some(user => user !== null);
  if(!isAssociateUserWithProject) {
    throw new Error('Not found projects associate by user')
  }
  return project;
}

exports.persist = async (name, userId) => {
  let project = new Project();
  project.name = name;
  project.users.push(
    userId
  )
  await project.save();
}

exports.remove = async (id) => {
  return await Project.deleteOne({
    _id: id,
  });
}


exports.associateUser = async (id, user) => {
  let projectExist = await Project.findOne({ 
    _id: id
  });

  if(projectExist === null) {
    throw new Error("informed project not found")
  }

  if(projectExist.users.length > 0) {
    let userIsAlreadyAssociated = projectExist.users.includes(user._id);
    if(!userIsAlreadyAssociated) {
      await Project.findByIdAndUpdate({ _id: id}, {
        "$push": { "users": user._id},
      }, { new: true, upsert: true})
    } else {
      throw new Error('User is already associated');
    }
  } else {
    await Project.findByIdAndUpdate({ _id: id}, {
      "$push": { "users": user._id},
    }, { new: true, upsert: true})
  }
}

exports.associateTask = async(id, task) => {
  let projectExist = await Project.findOne({ 
    _id: id
  });
  
  if(projectExist === null) {
    throw new Error("informed project not found")
  }
  if(projectExist.tasks !== null) {
    let userIsAlreadyAssociated = projectExist.tasks.includes(task._id);
    if(!userIsAlreadyAssociated) {
      await Project.findByIdAndUpdate({ _id: id}, {
        "$push": { "tasks": task._id},
      }, { new: true, upsert: true})
    } else {
      throw new Error('User is already associated');
    }
  } else {
    await Project.findByIdAndUpdate({ _id: id}, {
      "$push": { "tasks": task._id},
    }, { new: true, upsert: true})
  }
}
