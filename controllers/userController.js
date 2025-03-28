const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.getUser = (req, res) => {
  const tourId = req.params.tourId * 1;
  const tour = tours.find(el => el.id === tourId);
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.updateUser = (req, res) => {
  const tourId = req.params.tourId * 1;
  const tour = tours.find(el => el.id === tourId);
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
};

exports.deleteUser = (req, res) => {
  const tourId = req.params.tourId * 1;
  const tour = tours.filter(el => el.id === tourId);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });

  res.status(204).json({
    status: 'success',
    data: null
  });
};
