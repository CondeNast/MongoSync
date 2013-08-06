/*
 * MongoSync
 * https://github.com/condenast/mongosync
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */

(function(){
  'use strict';

  var global = this;
  var SharedModel;
  var server;
  var collection;

  var Backbone = global.Backbone;
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

  SharedModel = function(db, coll){
    // this part can only run on the backend, `process.browser` is from browserify
    if(!process.browser && typeof exports !== 'undefined'){
      server = s;
      collection = c;
      Backbone.Sync = sync;
    }
    return Backbone.Model.extend({});
  }

  if(typeof exports !== 'undefined'){
    module.exports =  SharedModel;
  } else if (typeof define === 'function' && define.amd ){
    define(function(){
      return SharedModel
    });
  } else {
    root.SharedModel = SharedModel;
  }

}).call(this);