'use strict';

exports.getThingShadow = function(args, res, next) {
  /**
   * Gets the thing shadow for the specified thing.
   *
   * thingName String thing name
   * returns ResponseStateDocument
   **/
  var examples = {};
  examples['application/json'] = {
  "metadata" : {
    "desired" : {
      "key" : {
        "timestamp" : 123
      }
    },
    "reported" : {
      "key" : ""
    }
  },
  "state" : {
    "desired" : "{}",
    "reported" : "{}",
    "delta" : "{}"
  }
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.updateThingShadow = function(args, res, next) {
  /**
   * Updates the thing shadow for the specified thing.
   *
   * thingName String thing name
   * body RequestStateDocument  (optional)
   * returns ResponseStateDocument
   **/
  var examples = {};
  examples['application/json'] = {
  "metadata" : {
    "desired" : {
      "key" : {
        "timestamp" : 123
      }
    },
    "reported" : {
      "key" : ""
    }
  },
  "state" : {
    "desired" : "{}",
    "reported" : "{}",
    "delta" : "{}"
  }
};
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

