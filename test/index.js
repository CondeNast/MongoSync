'use strict';


if(typeof define !== 'function'){
    define= require('amdefine')(module);
}

define(function(require){


var mongosync = require('../mongosync');
var SharedModel = mongosync('localhost', 'test');

SharedModel.extend({

});

return SharedModel;

})