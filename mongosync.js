/*
 * MongoSync
 * https://github.com/condenast/mongosync
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */

(function(){
  'use strict';

  var root = this;
  var SharedModel;
  var server;
  var collection;

  if(typeof exports !== 'undefined'){
    module.exports = function(s, c){
      server = s;
      collection = c;
      Backbone.Sync = sync;
      return SharedModel;
    };
  } else {
    root.SharedModel = SharedModel;
  }

  var Backbone = root.Backbone;
  if(!Backbone && (typeof require !== 'undefined')){
    Backbone = require('backbone');
  }

  function sync(method, model, options) {
    var mongojs = require('mongojs');
    var q = require('q');
    var d = q.defer();
    var db = mongojs(server);
    var collection = db.collection(collection);

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
  }

  SharedModel = Backbone.Model.extend({});

}).call(this);