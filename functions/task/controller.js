import taskModel from "../../models/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const department = await taskModel.find();

    res.status(200).send(department);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addTasks = async (req, res) => {
  const { department, supervisor, assignTo, taskName, description, currentStatus, spendTime } =
    req.body;
  const data = {
    Department: department,
    Supervisor: supervisor,
    "Assign To": assignTo,
    "Task Name": taskName,
    Description: description,
    "Current Status": currentStatus,
    "Spend Time": +spendTime,
  };

  console.log(data);
  console.log(req.body);
  try {
    const dept = await taskModel.create(data);

    res.status(200).send(dept);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

export const updateTasks = async (req, res) => {
  const { id } = req.params;
  const { department, supervisor, assignTo, taskName, description, currentStatus, spendTime } =
    req.body;
  const data = {
    Department: department,
    Supervisor: supervisor,
    "Assign To": assignTo,
    "Task Name": taskName,
    Description: description,
    "Current Status": currentStatus,
    "Spend Time": +spendTime,
  };
  try {
    const dept = await taskModel.findByIdAndUpdate(id, data);

    res.status(200).send(dept);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteTasks = async (req, res) => {
  const { id } = req.params;
  try {
    const dept = await taskModel.findByIdAndDelete(id);

    res.status(200).send(dept);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
