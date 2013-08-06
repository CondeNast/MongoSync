# MongoSync

A drop-in Backbone.Sync replacement for persisting data on the backend.

[More info](http://blog.selfassembled.org/posts/sharing_models.html)

## Installing

`npm install mongosync`

or

`bower install mongosync`

## Interface

MongoSync returns a function which then returns a context-aware Backbone model. It's wrapped in a function so that the sync method can be given the correct db location and collection to use.

## Using with RequireJS

It will detect if you're in an AMD situation and provide the appropriate `define` for RequireJS. You will also need [amdefine](https://github.com/jrburke/amdefine) in your project.

Example:

```javascript

if(typeof define !== 'function'){
    define = require('amdefine')(module);
}

define(function(require){
    var SharedModel = require('mongosync')('localhost', 'test');

    var MyModel = SharedModel.extend({});

    return MyModel;
});
```

## Using in CommonJS (including Browserify)

```javascript

var SharedModel = require('mongosync')('localhost', 'test');

var MyModel = SharedModel.extend({});

module.exports = MyModel;
```

## Browser Global (not recommended)

```html
<!-- script tags for backbone and underscore appear here -->
<script src="bower_components/mongosync/mongosync.js"></script>
```

Then in your code:

```javascript
var MyModel = SharedModel().extend({});
```

## Development

`npm install`

Uses grunt to handle development tasks. All grunt tasks are available via `npm run` using a locally installed copy of `grunt-cli`.

## Testing

`npm test` to run unit tests

## License
MongoSync is provided under the terms of the [MIT License](/LICENSE)