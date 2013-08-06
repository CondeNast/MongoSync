/* global describe, it, afterEach, beforeEach, xdescribe, xit */

/*
 * MongoSync
 * https://github.com/condenast/mongosync
 *
 * Copyright (c) 2013 Condé Nast. All rights reserved.
 */
'use strict';

var db_server = 'localhost';
var db_collection = require('randomstring').generate(7);
var fixture = require('./fixture');

var q = require('q');
var SharedModel = require('../mongosync')(db_server, db_collection);
var mongojs = require('mongojs');
var expect = require('chai').expect();

var collection = mongojs(db_server).collection(db_collection);

describe('mongosync', function(){
    var existing_id;
    var existing_model;

    beforeEach(function(done){
        existing_model = new SharedModel();
        existing_model.set(fixture);
        q(existing_model.save()).then(function(data){
            existing_model.set(data);
            existing_id = data._id.toString(16);
            done();
        });
    });

    it('Should save the document to the datastore', function(done){
        var test_model = new SharedModel();
        test_model.set(fixture);

        q(test_model.save()).then(function(data){
            if(data._id){
                done();
            } else {
                done(new Error('Not saved'));
            }
        }, function(err){
            done(err);
        });
    });

    it('Should perform an in-place update when changing data', function(done){
        var new_title = 'this is a test';
        existing_model.set('title', new_title);

        q(existing_model.save()).then(function(data){
            if(data._id.toString(16) === existing_id && data.title === new_title){
                done();
            } else {
                var err = new Error('Expected '+data._id+' to be '+existing_id+' and '+data.title+' to be '+new_title);
                done(err);
            }
        }, function(err){
            done(err);
        });
    });

    it('Should delete an object in the database', function(done){
        q(existing_model.destroy()).then(function(data){
            done();
        }, function(err){
            done(err);
        });
    });

    it('Should get an existing object', function(done){
        var m = new SharedModel();
        m.set('_id', existing_id);
        q(m.fetch()).then(function(data){
            if(data._id.toString(16) === existing_id){
                done();
            } else {
                var err = new Error('Expected '+data._id+' to be '+existing_id);
                done(err);
            }
        }, function(err){
            done(err);
        });
    });

   afterEach(function(){
        collection.remove();
   });
});