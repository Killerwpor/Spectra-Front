///REQUIRES
const mongoose = require('mongoose');

///MODELS
const Metric = require('../models/metric-model');
const Metrics = require('../models/metrics-model');



//// API

/// Capture: Takes the request, mainly a metric name and a set of pair (Key, value).
exports.capture = (req, res, next) => {
  // Get request and parse it into something that we can use.
  let request_object = JSON.parse(req.body.data);

  // We will use this to store the pairs (Key, Value)
  let metric_array = [];

  // We loop around the request object and get the metrics
  request_object.values.forEach(function(metric){
    // Create a new metric
    let newMetric = new Metric({
       key: metric.key,
       value: metric.value
     });

    // Lets save the metric
    newMetric.save()

    // Add metric to array.
    metric_array.push(newMetric);
  });

  let newMetrics = new Metrics({
     metric     : request_object.metric,
     employeeId : request_object.employeeId,
     inspectorId: request_object.inspectorId,
     projectId  : request_object.projectId,
     date       : request_object.date,
     values     : metric_array
  });

  // We save the metric
  newMetrics.save().then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Metric Created',
      result
    });
  }).catch(err => {
    res.status(500).json({
      message: "Error Saved",
      err
    });
  });
}

///

exports.getMetric = (req, res, next) => {

  let request_object = JSON.parse(req.body.data);

  Metrics.find({ metric: request_object.metric , projectid: request_object.projectId })
  .populate('values')
  .then(result => {
    console.log(result);
    res.status(200).json({
      result
    });
  })
  .catch(err => {
    res.status(500).json({
      err
    })
  })

  /*Metrics.find({'metric': request_object.metric})
  .populate('values')
  .exec( function(err, values){
    if(err) console.log(err);
    else { console.log(values);
      res.status(200).json({values})
    }
  });*/
}

exports.getMetricById = (req, res, next) => {
  let request_object = JSON.parse(req.body.data);

  Metrics.find({ _id: request_object.id})
  .populate('values')
  .then(result => {
    console.log(result);
    res.status(200).json({
      result
    });
  })
  .catch(err => {
    res.status(500).json({
      err
    })
  })
}

///
exports.cleanAll = (req, res, next) => {
    Metrics.deleteMany({}, (err, data) => {
	if (err){
	    res.send(err)
	} else {
	    res.send(data)
	}
    });
}
