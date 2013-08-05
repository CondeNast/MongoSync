# MongoSync

A drop-in Backbone.Sync replacement for persisting data on the backend.

[More info](http://blog.selfassembled.org/posts/sharing_models.html)

## Installing

`npm install mongosync`

or

`bower install mongosync`

## Using with RequireJS

You'll need to shim this to get it working with RequireJS (like you did jQuery & Backbone already)

```javascript
requirejs.config({
    paths: {
        'jquery': 'path/to/jquery',
        'underscore': 'path/to/underscore',
        'backbone': 'path/to/backbone',
        'mongosync': 'path/to/mongosync'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'mongosync': {
            deps: ['backbone'],
            exports': 'SharedModel'
        },
        'underscore': {
            'exports': '_'
        }
    }
});
```

Then in your code:

```javascript
define(function(require){
    var Model = require('mongosync');

    var MyModel = Model.extend({});

    return MyModel;
});
```

## Using without RequireJS (not recommended)

```html
<!-- script tags for backbone and underscore appear here -->
<script src="bower_components/mongosync/mongosync.js"></script>
```

Then in your code:

```javascript
    var MyModel = SharedModel.extend({});
```

## Development

`npm install`

Uses grunt to handle development tasks. All grunt tasks are available via `npm run` using a locally installed copy of `grunt-cli`.

## Testing

`npm test` to run unit tests

## License
MongoSync is provided under the terms of the [MIT License](/LICENSE)