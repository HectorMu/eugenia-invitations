const connection = require("../database");
const controller = {};

controller.ListAll = async (req, res) => {
  try {
    const departments = await connection.query("SELECT * from department");

    return res.status(200).json(departments);
  } catch (error) {
    return res.status(400).json({ message: "Something wen't wrong", error });
  }
};
controller.ListOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "ID url param is required to complete the action" });
  }

  try {
    const departments = await connection.query(
      "SELECT * from department where id = ?",
      [id]
    );
    return res.status(200).json(departments[0]);
  } catch (error) {
    return res.status(400).json({ message: "Something wen't wrong", error });
  }
};

controller.Save = async (req, res) => {
  const newDeparment = req.body;
  try {
    const insertResult = await connection.query(
      "insert into department set ?",
      [newDeparment]
    );

    return res.status(200).json(insertResult);
  } catch (error) {
    return res.status(400).json({ message: "Something wen't wrong", error });
  }
};

controller.Update = async (req, res) => {
  const newDeparment = req.body;
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "ID param url is required to complete the action" });
  }
  try {
    const updateResult = await connection.query(
      "update department set ? where id = ?",
      [newDeparment, id]
    );

    return res.status(200).json(updateResult);
  } catch (error) {
    return res.status(400).json({ message: "Something wen't wrong", error });
  }
};

controller.Delete = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "ID url param is required to complete the action" });
  }
  try {
    const deleteResult = await connection.query(
      "delete from  department where id = ?",
      [id]
    );

    return res.status(200).json(deleteResult);
  } catch (error) {
    return res.status(400).json({ message: "Something wen't wrong", error });
  }
};

module.exports = controller;
