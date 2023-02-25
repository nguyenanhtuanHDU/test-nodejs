const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const listUsers = await User.find();
  res.render("home.ejs", {users: listUsers});
};

module.exports = { getAllUsers };
