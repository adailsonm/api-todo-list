const Project = require('../models/Project');

exports.findAll = async (name) => {
  return await Project.find({}).populate([{ path: "users", select: 'name'}, { path: 'tasks', select: ['description', 'finished_at', 'status']}]).select('-__v');
}

exports.findById= async (id) => {
  return await Project.findOne({ _id: id}).select('-__v');
}

exports.persist = async (name) => {
  return await Project.create({
    name: name,
  });
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
  if(projectExist.users !== null) {
    let userIsAlreadyAssociated = projectExist.users.includes(user._id);
    if(!userIsAlreadyAssociated) {
      await Project.findByIdAndUpdate({ _id: id}, {
        "$push": { "users": user._id},
      }, { new: true, upsert: true})
    }
    
    throw new Error('User is already associated');
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
  if(projectExist.tasks !== null) {
    let userIsAlreadyAssociated = projectExist.tasks.includes(task._id);
    if(!userIsAlreadyAssociated) {
      await Project.findByIdAndUpdate({ _id: id}, {
        "$push": { "tasks": task._id},
      }, { new: true, upsert: true})
    }
    
    throw new Error('User is already associated');
  } else {
    await Project.findByIdAndUpdate({ _id: id}, {
      "$push": { "tasks": task._id},
    }, { new: true, upsert: true})
  }
}
