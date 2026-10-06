const fs = require('fs');

const users = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/users.json`));

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
}

exports.createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);
  fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), err => {
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser
      }
    });
  });
}

exports.getUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find(el => el.id === id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
}

exports.updateUser = (req, res) => {
  const id = req.params.id * 1;
  const user = users.find(el => el.id === id);

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found'
    });
  }

  const updatedUser = Object.assign(user, req.body);
  fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), err => {
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  });
}

exports.deleteUser = (req, res) => {
  const id = req.params.id * 1;
  const userIndex = users.findIndex(el => el.id === id);

  if (userIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'User not found'
    });
  }

  users.splice(userIndex, 1);
  fs.writeFile(`${__dirname}/dev-data/data/users.json`, JSON.stringify(users), err => {
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
}