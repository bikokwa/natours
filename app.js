const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(morgan('dev'));

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

// Route handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
}

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  });
}

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);  

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found'
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
}

const updateTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found'
    });
  }

  const updatedTour = Object.assign(tour, req.body);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    });
  });
}

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tourIndex = tours.findIndex(el => el.id === id);  

  if (tourIndex === -1) {
    return res.status(404).json({
      status: 'fail',
      message: 'Tour not found'
    });
  }

  tours.splice(tourIndex, 1);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
}

const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
}

const createUser = (req, res) => {
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

const getUser = (req, res) => {
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

const updateUser = (req, res) => {
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

const deleteUser = (req, res) => {
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

// Routes
//Tours
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

// Users
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id').get(getUser).patch(updateUser).delete(deleteUser);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});