const Task = require("../models/Task");

exports.findById = async (id) => {
  return await Task.findById({
    _id: id,
  });
}

exports.persist = async (description) => {
  return await Task.create({
    description,
  });
}

exports.store = async (id, description, finished_at, status) => {
  return await Task.updateOne({
    _id: id,
  }, { description, finished_at:  new Date(finished_at), status});
}

exports.destroy = async (id) => {
  return await Task.deleteOne({
    _id: id,
  });
}
