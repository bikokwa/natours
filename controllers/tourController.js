const Tour = require('./../models/tourModel');

let tours = [];

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!'
    });
  }
};

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
