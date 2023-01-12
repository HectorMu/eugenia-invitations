const connection = require("../database");
const controller = {};

controller.ListAll = async (req, res) => {
  const { id: claimerId } = req.claims;
  try {
    const invitation = await connection.query(
      "SELECT * from invitation where fk_user_owner = ?",
      [claimerId]
    );

    return res.status(200).json(invitation);
  } catch (error) {
    return res.status(400).json({ message: "Something wen't wrong", error });
  }
};
controller.ListOne = async (req, res) => {
  const { id: claimerId } = req.claims;
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "ID url param is required to complete the action" });
  }

  try {
    const invitation = await connection.query(
      "SELECT * from invitation where id = ? and fk_user_owner = ?",
      [id, claimerId]
    );
    if (invitation.length > 0) {
      return res.status(200).json(invitation[0]);
    }
    return res.status(200).json({});
  } catch (error) {
    return res.status(400).json({ message: "Something wen't wrong", error });
  }
};

controller.Save = async (req, res) => {
  const { id: claimerId } = req.claims;
  const newInvitation = req.body;
  newInvitation.fk_user_owner = claimerId;

  try {
    const insertResult = await connection.query(
      "insert into invitation set ?",
      [newInvitation]
    );

    return res.status(200).json(insertResult);
  } catch (error) {
    return res.status(400).json({ message: "Something wen't wrong", error });
  }
};

controller.Update = async (req, res) => {
  const { id: claimerId } = req.claims;
  const newInvitation = req.body;
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "ID param url is required to complete the action" });
  }
  try {
    const updateResult = await connection.query(
      "update invitation set ? where id = ? and fk_user_owner = ?",
      [newInvitation, id, claimerId]
    );

    if (updateResult.changedRows === 0) {
      return res.status(400).json({ message: "Resource not exists" });
    }

    return res.status(200).json(updateResult);
  } catch (error) {
    return res.status(400).json({ message: "Something wen't wrong", error });
  }
};

controller.Delete = async (req, res) => {
  const { id: claimerId } = req.claims;
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ message: "ID url param is required to complete the action" });
  }
  try {
    const deleteResult = await connection.query(
      "delete from invitation where id = ? and fk_user_owner =?",
      [id, claimerId]
    );

    if (deleteResult.affectedRows === 0) {
      return res.status(400).json({ message: "Resource not exists" });
    }

    return res.status(200).json(deleteResult);
  } catch (error) {
    return res.status(400).json({ message: "Something wen't wrong", error });
  }
};

module.exports = controller;
