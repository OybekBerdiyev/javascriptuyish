const Io = require("../utils/Io");
const path = require("path");

const User = require("../models/User");
const {get} = require("../utils/get");

const Users = new Io(process.cwd() + "/database/users.json");
const Channels = new Io(process.cwd() + "/database/channels.json");

const createUser = async (req, res) => {
  const {fullName, phoneNumber, bio, username} = req.body;
  const photo = req.files?.photo;

  const users = await get(Users);
  const channels = await get(Channels);

  let findUser = users.find(
    (user) => user.username === username || user.phoneNumber === phoneNumber
  );
  const findChannel = channels.find((channel) => channel.username === username);

  if (findUser || findChannel)
    return res.status(400).json({message: "Already exists"});
  let imageName 
  if (photo?.name) {
    const mimetype = path.extname(photo.name);
    imageName = photo.md5 + "_" + Date.now() + mimetype;
    photo.mv(`${process.cwd()}/uploads/${imageName}`);
  }

  const id = (users[users.length - 1]?.id || 0) + 1;

  const newUser = new User(id, fullName, phoneNumber, bio, username, imageName || null);

  const result = users.length ? [...users, newUser] : [newUser];

  await Users.write(result);

  res.status(201).json({message: "CREATED"});
};

const getAllUsers = async (req, res) => {
  const users = await get(Users);
  const channels = await get(Channels);

  const find = users.map((user) => {
    user.channels = channels.filter((ch) => ch.owner == user.id);

    return user;
  });

  res.json({users: find});
};

const getOneUser = async (req, res) => {
  const {id} = req.params;
  const users = await get(Users);
  const channels = await get(Channels);

  const user = users.find((user) => user.id == id);

  user.channels = channels.filter((ch) => ch.owner == user.id);

  res.json({user});
};

module.exports = {
  createUser,
  getAllUsers,
  getOneUser,
};
