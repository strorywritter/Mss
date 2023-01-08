import Departments from "../../models/addDepartmentModel.js";

export const getDepartments = async (req, res) => {
  try {
    const department = await Departments.find();

    res.status(200).send(department);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const addDepartment = async (req, res) => {
  const { department } = req.body;
  try {
    const dept = await Departments.create({ department });

    res.status(200).send(dept);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { department } = req.body;
  try {
    const dept = await Departments.findByIdAndUpdate(id, { department });

    res.status(200).send(dept);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const dept = await Departments.findByIdAndDelete(id);

    res.status(200).send(dept);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
