'use strict';

var state = {
  desired: {},
  reported: {},
  delta: {}
};

var metadata = {
  desired: {},
  reported: {}
};

exports.getThingShadow = function(args, res, next) {
  /**
   * Gets the thing shadow for the specified thing.
   *
   * thingName String thing name
   * returns ResponseStateDocument
   **/
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({state: state, metadata: metadata}, null, 2));
}

exports.updateThingShadow = function(args, res, next) {
  //console.log(JSON.stringify(args, null, 2));
  /**
   * Updates the thing shadow for the specified thing.
   *
   * thingName String thing name
   * body RequestStateDocument  (optional)
   * returns ResponseStateDocument
   **/
  var timestamp = Math.round(Date.now() / 1000);
  Object.keys(args.body.value.state.desired || {}).forEach(function (key) {
    state.desired[key] = args.body.value.state.desired[key];
    metadata.desired[key] = {timestamp: timestamp};
  });
  Object.keys(args.body.value.state.reported || {}).forEach(function (key) {
    state.reported[key] = args.body.value.state.reported[key];
    metadata.reported[key] = {timestamp: timestamp};
  });

  Object.keys(state.reported).forEach(function (key) {
    if (state.reported[key] != state.desired[key]) {
      state.delta[key] = state.desired[key];
    } else {
      delete state.delta[key];
    }
  });

  res.setHeader('Content-Type', 'application/json');
  // AWS IoT thing shadow API returns only requested state document
  //res.end(JSON.stringify(args.body.value, null, 2));
  res.end(JSON.stringify({state: state, metadata: metadata}, null, 2));
}

