const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

// Route handlers
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours
    // }
  });
}

exports.createTour = (req, res) => {
  
}

exports.getTour = (req, res) => {
  
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour
    // }
  });
}

exports.updateTour = (req, res) => {
  
}

exports.deleteTour = (req, res) => {
  

  
}