const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getUser = (req, res) => {
  const tourId = req.params.tourId * 1;
  const tour = tours.find((el) => el.id === tourId);
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.updateUser = (req, res) => {
  const tourId = req.params.tourId * 1;
  const tour = tours.find((el) => el.id === tourId);
  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

exports.deleteUser = (req, res) => {
  const tourId = req.params.tourId * 1;
  const tour = tours.filter((el) => el.id === tourId);

  if (!tour)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
