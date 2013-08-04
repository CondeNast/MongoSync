// backbone.sync adaptor that uses mongojs to store models
// returns a q.defer().promise
'use strict';

var mongojs = require('mongojs');
var q = require('q');

/**
 * Drop in replacement for node.js allowing Backbone models to be saved to
 * a MongoDB datastore.
 *
 * @param  {Object} config
 *         @param {String} db_server location to the server instance
 *         @param {String} db_collection Name of the collection
 * @return {Object}        `q.promise` "then-able"
 */
module.exports = function(config){

  if(config && (!config.db_server || !config.db_collection)){
    throw new Error('You must pass in a config object with db_server and db_collection defined');
  }

  return function (method, model, options) {
    var d = q.defer();
    var db = mongojs(config.db_server);
    var collection = db.collection(config.db_collection);

    var db_callback = function (err, response) {
      if (err) {
        d.reject(err);
      }
      if (response === 1) {
        d.resolve(model.toJSON());
      } else {
        d.resolve(response[0]);
      }
    };

    switch (method) {
      case 'create':
        collection.insert(model.toJSON(), {safe: true}, db_callback);
        break;
      case 'update':
      case 'patch':
        collection.save(model.toJSON(), db_callback);
        break;
      case 'delete':
        collection.remove(model.toJSON(), db_callback);
        break;
      case 'read':
        var _id = model.get('_id');
        var query_params = {};
        if (_id) {
          query_params._id = mongojs.ObjectId(_id);
        } else {
          d.reject(new Error('You must provide an _id to lookup'));
        }
        collection.find(query_params, db_callback);
        break;
      default:
        d.reject(new Error('Unimplemented'));
      break;
    }

    return d.promise;
  };
}


