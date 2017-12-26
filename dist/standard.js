/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// internal function that wraps JSON.stringify

var prettyPrint = function prettyPrint(obj) {
    // uses a custom replacer to correctly handle functions
    var stringified = JSON.stringify(obj, function (key, value) {
        return typeof value === 'function' ? value.toString() : value;
    }, 2);

    // stringified value is passed through the String constructor to
    // correct for the "undefined" case. each line is then indented.
    var indented = String(stringified).replace(/\n/g, '\n    ');

    return '\n>>> ' + indented;
};

// all typechecks should only return bools.
module.exports.isDefined = function (value) {
    return value !== undefined;
};

module.exports.isNull = function (value) {
    return value === null;
};

module.exports.isArray = function (value) {
    return Array.isArray(value);
};

module.exports.isFunction = function (value) {
    return typeof value === 'function';
};

module.exports.isString = function (value) {
    return typeof value === 'string';
};

module.exports.isNumber = function (value) {
    return typeof value === 'number';
};

module.exports.isBoolean = function (value) {
    return typeof value === 'boolean';
};

module.exports.isObject = function (value) {
    return !!value && value.constructor === Object;
};

module.exports.isNode = function (value) {
    return !!(value && value.tagName && value.nodeName && value.ownerDocument && value.removeAttribute);
};

module.exports.isRegExp = function (value) {
    return value instanceof RegExp;
};

// there cannot be any assumptions about the environment globals so
// node's process should not be used.
module.exports.isBrowser = function () {
    return typeof window !== 'undefined';
};

module.exports.deepCopy = function (obj) {
    // undefined value would otherwise throw an error at parsing time.
    if (obj === undefined) {
        return undefined;
    }
    return JSON.parse(JSON.stringify(obj));
};

// will throw an error containing the message and the culprits if the
// assertion is falsy. the message is expected to contain information
// about the location of the error followed by a meaningful error message.
// (ex. "router.redirect : url is not a string")
module.exports.assert = function (assertion, message) {
    for (var _len = arguments.length, culprits = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        culprits[_key - 2] = arguments[_key];
    }

    if (!assertion) {
        console.log('\x1b[35mabc\x1b[0m');
        var f = '\x1b[35m';
        var err = '@okwolo.' + message;
        err.replace(/(@okwolo(:?\..+)*) : (.*)/g, function () {});
        throw new Error('@okwolo.' + message + culprits.map(prettyPrint).join(''));
    }
};

// this function will create a queue object which can be used to defer
// the execution of functions.
module.exports.makeQueue = function () {
    var queue = [];

    // runs the first function in the queue if it exists. this specifically
    // does not call done or remove the function from the queue since there
    // is no knowledge about whether or not the function has completed. this
    // means that the queue will wait for a done signal before running any
    // other element.
    var run = function run() {
        var func = queue[0];
        if (func) {
            func();
        }
    };

    // adds a function to the queue and calls run if the queue was empty.
    var add = function add(func) {
        queue.push(func);
        if (queue.length === 1) {
            run();
        }
    };

    // removes the first element from the queue and calls run. note that
    // it is not possible to pre-call done in order to have multiple
    // functions execute immediately.
    var done = function done() {
        // calling shift on an empty array does nothing.
        queue.shift();
        run();
    };

    return { add: add, done: done };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var core = __webpack_require__(2);

module.exports = core({
    modules: [__webpack_require__(3), __webpack_require__(4), __webpack_require__(5), __webpack_require__(6), __webpack_require__(7), __webpack_require__(8),
    // router placed after view to override blob.primary.
    __webpack_require__(9), __webpack_require__(10), __webpack_require__(12)],
    options: {
        kit: 'standard',
        browser: true
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    assert = _require.assert,
    isArray = _require.isArray,
    isBrowser = _require.isBrowser,
    isDefined = _require.isDefined,
    isFunction = _require.isFunction,
    isObject = _require.isObject,
    isString = _require.isString;

// version cannot be taken from package.json because environment is not guaranteed.


var version = '3.0.0';

var makeBus = function makeBus() {
    // stores arrays of handlers for each event key.
    var handlers = {};
    // stores names from named events to enforce uniqueness.
    var names = {};

    // attaches a handler to a specific event key.
    var on = function on(type, handler) {
        assert(isString(type), 'on : handler type is not a string', type);
        assert(isFunction(handler), 'on : handler is not a function', handler);
        if (!isDefined(handlers[type])) {
            handlers[type] = [];
        }
        handlers[type].push(handler);
    };

    var send = function send(type) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
        }

        assert(isString(type), 'send : event type is not a string', type);
        var eventHandlers = handlers[type];
        if (!isArray(eventHandlers)) {
            return;
        }
        for (var i = 0; i < eventHandlers.length; ++i) {
            eventHandlers[i].apply(eventHandlers, args);
        }
    };

    var use = function use(blob) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
        }

        // scopes event type to being a blob.
        if (isString(blob)) {
            send.apply(undefined, ['blob.' + blob].concat(args));
            return;
        }

        assert(isObject(blob), 'use : blob is not an object', blob);

        var name = blob.name;

        if (isDefined(name)) {
            assert(isString(name), 'utils.bus : blob name is not a string', name);
            // early return if the name has been used before.
            if (isDefined(names[name])) {
                return;
            }
            names[name] = true;
        }

        // sending all blob keys.
        var keys = Object.keys(blob);
        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            send('blob.' + key, blob[key]);
        }
    };

    return { on: on, send: send, use: use };
};

module.exports = function (_ref) {
    var _ref$modules = _ref.modules,
        modules = _ref$modules === undefined ? [] : _ref$modules,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? {} : _ref$options;

    assert(false, 'test : test');
    assert(isArray(modules), 'core : passed modules must be an array');
    assert(isObject(options), 'core : passed options must be an object');

    // if it is needed to define the window but not yet add a target, the first
    // argument can be set to undefined.
    var okwolo = function okwolo(target, global) {
        // if the kit requires the browser api, there must be a window object in
        // scope or a window object must be injected as argument.
        if (options.browser) {
            if (!isDefined(global)) {
                assert(isBrowser(), 'app : must be run in a browser environment');
                global = window;
            }
        }

        // primary function will be called when app is called, it is stored
        // outside of the app function so that it can be replaced after the
        // creation of the app object without breaking all references to app.
        var primary = function primary() {};

        // the api will be added to the app function, it is returned when a
        // new app is created.
        var app = function app() {
            return primary.apply(undefined, arguments);
        };

        Object.assign(app, makeBus());

        app.on('blob.api', function (api) {
            assert(isObject(api), 'on.blob.api : additional api is not an object', api);
            Object.assign(app, api);
        });

        app.on('blob.primary', function (_primary) {
            assert(isFunction(_primary), 'on.blob.primary : primary is not a function', _primary);
            primary = _primary;
        });

        // each module is instantiated.
        modules.forEach(function (_module) {
            _module({
                on: app.on,
                send: app.send
            }, global);
        });

        // target is used if it is defined, but this step can be deferred
        // if it is not convenient to pass the target on app creation.
        if (isDefined(target)) {
            app.use('target', target);
        }

        return app;
    };

    // okwolo attempts to define itself globally and includes information about
    // the version number and kit name. note that different kits can coexist,
    // but not two kits with the same name and different versions.
    if (isBrowser()) {
        okwolo.kit = options.kit;
        okwolo.version = version;
        if (!isDefined(window.okwolo)) {
            window.okwolo = okwolo;
        }
        window.okwolo[options.kit] = okwolo;
    }

    return okwolo;
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @fires   state        [state]
// @fires   blob.api     [core]
// @fires   blob.handler [state]
// @listens state
// @listens blob.handler

var _require = __webpack_require__(0),
    assert = _require.assert,
    deepCopy = _require.deepCopy,
    isFunction = _require.isFunction;

module.exports = function (_ref) {
    var on = _ref.on,
        send = _ref.send;

    // reference to initial state is kept to be able to track whether it
    // has changed using strict equality.
    var initial = {};
    var state = initial;

    var handler = void 0;

    // current state is monitored and stored.
    on('state', function (newState) {
        state = newState;
    });

    on('blob.handler', function (handlerGen) {
        assert(isFunction(handlerGen), 'on.blob.handler : handler generator is not a function', handlerGen);
        // handler generator is given direct access to the state.
        var _handler = handlerGen(function () {
            return state;
        });
        assert(isFunction(_handler), 'on.blob.handler : handler from generator is not a function', _handler);
        handler = _handler;
    });

    send('blob.handler', function () {
        return function (newState) {
            send('state', newState);
        };
    });

    var setState = function setState(replacement) {
        var newState = isFunction(replacement) ? replacement(deepCopy(state)) : replacement;
        handler(newState);
    };

    var getState = function getState() {
        assert(state !== initial, 'state.getState : cannot get state before it has been set');
        return deepCopy(state);
    };

    // expose module's features to the app.
    send('blob.api', {
        setState: setState,
        getState: getState
    });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @fires   state        [state]
// @fires   act          [state]
// @fires   blob.action  [state.handler]
// @fires   blob.api     [core]
// @fires   blob.handler [state]
// @listens act
// @listens blob.action
// @listens blob.middleware
// @listens blob.watcher

var _require = __webpack_require__(0),
    assert = _require.assert,
    deepCopy = _require.deepCopy,
    isArray = _require.isArray,
    isDefined = _require.isDefined,
    isFunction = _require.isFunction,
    isString = _require.isString,
    makeQueue = _require.makeQueue;

module.exports = function (_ref) {
    var on = _ref.on,
        send = _ref.send;

    // this module defines an action which overrides the whole state while
    // giving visibility to the middleware and watchers.
    var overrideActionType = 'SET_STATE';

    var stateHasBeenOverwritten = false;

    // actions is a map where actions are stored in an array at their type key.
    var actions = {};
    var middleware = [];
    var watchers = [];

    // this queue is used to ensure that an action, the middleware and the
    // watchers all get called before a second action can be done. this is
    // relevant in the case where an action is called from within a watcher.
    // it does not however support waiting for any async code.
    var queue = makeQueue();

    // the real value is set after this module's handshake with the state
    // module when the state handler is registered.
    var readState = function readState() {
        return undefined;
    };

    var execute = function execute(state, type, params) {
        // this value will represent the state after executing the action(s).
        // it must be copied since all the middleware functions can still
        // potentially have access to it.
        var newState = deepCopy(state);
        assert(isDefined(actions[type]), 'state.handler : action type \'' + type + '\' was not found');

        // action types with multiple actions are executed in the order they are added.
        actions[type].forEach(function (currentAction) {
            var targetAddress = currentAction.target;

            // if the target is a function, it is executed with the current state.
            if (isFunction(targetAddress)) {
                targetAddress = targetAddress(deepCopy(state), params);
                // since the typechecks cannot be ran when the action is added,
                // they need to be done during the action.
                assert(isArray(targetAddress), 'state.handler : dynamic target of action ' + type + ' is not an array', targetAddress);
                targetAddress.forEach(function (address) {
                    assert(isString(address), 'state.handler : dynamic target of action ' + type + ' is not an array of strings', targetAddress);
                });
            }

            // the target is the object being passed to the action handler.
            // it must be copied since any previous actions can still access it.
            var target = deepCopy(newState);

            // an empty array means the entire state object is the target.
            if (targetAddress.length === 0) {
                newState = currentAction.handler(target, params);
                assert(isDefined(newState), 'state.handler : result of action ' + type + ' on target @state is undefined');
            }

            // reference will be the variable which keeps track of the current
            // layer at which the address is. it is initially equal to the new
            // state since that is the value that needs to be modified.
            var reference = newState;
            targetAddress.forEach(function (key, i) {
                assert(isDefined(target[key]), 'state.handler : target of action ' + type + ' does not exist: @state.' + targetAddress.slice(0, i + 1).join('.'));
                if (i < targetAddress.length - 1) {
                    // both the reference to the "actual" state and the target
                    // dummy copy are traversed at the same time.
                    target = target[key];
                    reference = reference[key];
                    return;
                }

                // when the end of the address array is reached, the target
                // has been found and can be used by the handler.
                var newValue = currentAction.handler(target[key], params);
                assert(isDefined(newValue), 'state.handler : result of action ' + type + ' on target @state.' + targetAddress.join('.') + ' is undefined');
                reference[key] = newValue;
            });
        });

        // other modules can listen for the state event to be updated when
        // it changes (ex. the rendering process).
        send('state', deepCopy(newState));

        watchers.forEach(function (watcher) {
            watcher(deepCopy(newState), type, params);
        });

        // this will signal the queue that the next action can be started.
        queue.done();
    };

    var apply = function apply(state, type, params) {
        // base function executes the action after all middleware has been used.
        var funcs = [function () {
            var _state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : state;

            var _type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : type;

            var _params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : params;

            execute(_state, _type, _params);
        }];

        // this code will create an array where all elements are funtions which
        // call the closest function with a lower index. the returned values for
        // the state, action type and params are also passed down to the next
        // function in the chain.
        middleware.reverse().forEach(function (currentMiddleware, index) {
            funcs[index + 1] = function () {
                var _state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : state;

                var _type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : type;

                var _params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : params;

                // arguments are updated with the output of previous middleware.
                state = _state;
                type = _type;
                params = _params;
                currentMiddleware(funcs[index], deepCopy(_state), _type, _params);
            };
        });

        // the funcs array is initialized with an extra element which makes it
        // one longer than middleware. therefore, using the length of middleware
        // is looking for the last element in the array of functions.
        funcs[middleware.length](state, type, params);
    };

    // actions can be added in batches by using an array.
    on('blob.action', function (action) {
        [].concat(action).forEach(function () {
            var item = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var type = item.type,
                handler = item.handler,
                target = item.target;

            assert(isString(type), 'on.blob.action : action\'s type is not a string', item, type);
            assert(isFunction(handler), 'on.blob.action : handler for action ' + type + ' is not a function', item, handler);
            if (isArray(target)) {
                target.forEach(function (address) {
                    assert(isString(address), 'on.blob.action : target of action ' + type + ' is not an array of strings', item, target);
                });
            } else {
                assert(isFunction(target), 'on.blob.action : target of action ' + type + ' is not valid', target);
            }
            if (actions[type] === undefined) {
                actions[type] = [item];
                return;
            }
            actions[type].push(item);
        });
    });

    // middleware can be added in batches by using an array.
    on('blob.middleware', function (_middleware) {
        [].concat(_middleware).forEach(function (item) {
            assert(isFunction(item), 'on.blob.middleware : middleware is not a function', item);
            middleware.push(item);
        });
    });

    // watchers can be added in batches by using an array.
    on('blob.watcher', function (watcher) {
        [].concat(watcher).forEach(function (item) {
            assert(isFunction(item), 'on.blob.watcher : watcher is not a function', item);
            watchers.push(item);
        });
    });

    on('action', function () {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            type = _ref2.type,
            _ref2$params = _ref2.params,
            params = _ref2$params === undefined ? {} : _ref2$params;

        // the only action that does not need the state to have already
        // been changed is SET_STATE.
        assert(stateHasBeenOverwritten || type === overrideActionType, 'state.act : cannot act on state before it has been overrwritten');
        stateHasBeenOverwritten = true;
        assert(isString(type), 'state.act : action type is not a string', type);
        // the queue will make all actions wait to be ran sequentially.
        queue.add(function () {
            apply(readState(), type, params);
        });
    });

    // expose module's features to the app.
    send('blob.api', {
        act: function act(type, params) {
            return send('act', { type: type, params: params });
        }
    });

    // action is used to override state in order to give visibility to
    // watchers and middleware.
    send('blob.action', {
        type: overrideActionType,
        target: [],
        handler: function handler(state, params) {
            return params;
        }
    });

    send('handler', function (reader) {
        readState = reader;
        return function (newState) {
            send('action', { type: overrideActionType, params: newState });
        };
    });
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @fires act          [state.handler]
// @fires blob.api     [core]
// @fires blob.action  [state.handler]
// @fires blob.watcher [state.handler]

module.exports = function (_ref) {
    var on = _ref.on,
        send = _ref.send;

    var resetActionType = '__RESET__';
    // reference to the initial value is kept in order to be able to check if the
    // state has been changes using triple-equals comparison.
    var initial = {};

    var past = [];
    var current = initial;
    var future = [];

    // used to enforce the maximum number of past states that can be returned to.
    var historyLength = 20;

    // action types which begin with * will not be registered in the history. this
    // can be useful for trivial interactions which should not be replayed.
    var ignorePrefix = '*';

    send('blob.action', {
        type: 'UNDO',
        target: [],
        handler: function handler() {
            // can only undo if there is at least one previous state which
            // isin't the initial one.
            if (past.length > 0 && past[past.length - 1] !== initial) {
                future.push(current);
                return past.pop();
            } else {
                return current;
            }
        }
    });

    send('blob.action', {
        type: 'REDO',
        target: [],
        handler: function handler() {
            if (future.length > 0) {
                past.push(current);
                return future.pop();
            } else {
                return current;
            }
        }
    });

    // reset action can be used to wipe history when, for example, an application
    // changes to a different page with a different state structure.
    send('blob.action', {
        type: resetActionType,
        target: [],
        handler: function handler() {
            past = [];
            future = [];
            return current;
        }
    });

    // this watcher will monitor state changes and update what is stored within
    // this function.
    send('blob.watcher', function (state, type) {
        if (type === resetActionType || type[0] === ignorePrefix) {
            return;
        }
        if (type !== 'UNDO' && type !== 'REDO') {
            // adding an action to the stack invalidates anything in the "future".
            future = [];
            past.push(current);
            // state history must be kept within the desired maximum length.
            if (past.length > historyLength + 1) {
                past.shift();
            }
        }

        // objects stored into current will be moved to the past/future stacks.
        // it is assumed that the value given to this watcher is a copy of the
        // current state who's reference is not exposed enywhere else.
        current = state;
    });

    // expose undo/redo using helper functions and plug into the state module
    // to monitor the app's state.
    send('blob.api', {
        undo: function undo() {
            return send('action', { type: 'UNDO' });
        },
        redo: function redo() {
            return send('action', { type: 'REDO' });
        }
    });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @fires   emit #update  [view]
// @fires   use  #api     [core]
// @fires   use  #primary [core]
// @listens emit #state
// @listens emit #update
// @listens use  #build
// @listens use  #builder
// @listens use  #draw
// @listens use  #target
// @listens use  #update

var _require = __webpack_require__(0),
    assert = _require.assert,
    isDefined = _require.isDefined,
    isFunction = _require.isFunction;

module.exports = function (_ref) {
    var emit = _ref.emit,
        use = _ref.use;

    var target = void 0;
    var builder = void 0;
    var build = void 0;
    var draw = void 0;
    var update = void 0;

    // stores an object returned by the draw and update functions. Since it is
    // also passed as an argument to update, it is convenient to store some
    // information about the current application's view in this variable.
    var view = void 0;

    // a copy of the state must be kept so that the view can be re-computed as
    // soon as any part of the rendering pipeline is modified.
    var state = void 0;

    // generates an object representing the view from the output of the builder.
    // note that it requires both the builder and the build functions to be
    // defined in order to complete successfully. they must be checked before
    // calling this function.
    var create = function create(state) {
        var temp = builder(state);
        temp = build(temp);
        return temp;
    };

    use.on('target', function (_target) {
        target = _target;
        emit({ update: true });
    });

    use.on('builder', function (_builder) {
        assert(isFunction(_builder), 'view.use.builder : builder is not a function', _builder);
        builder = _builder;
        emit({ update: false });
    });

    use.on('draw', function (_draw) {
        assert(isFunction(_draw), 'view.use.draw : new draw is not a function', _draw);
        draw = _draw;
        emit({ update: true });
    });

    use.on('update', function (_update) {
        assert(isFunction(_update), 'view.use.update : new target updater is not a function', _update);
        update = _update;
        emit({ update: false });
    });

    use.on('build', function (_build) {
        assert(isFunction(_build), 'view.use.build : new build is not a function', _build);
        build = _build;
        emit({ update: false });
    });

    emit.on('state', function (_state) {
        assert(isDefined(_state), 'view.emit.state : new state is not defined', _state);
        state = _state;
        emit({ update: false });
    });

    // tracks whether the app has been drawn. this information is used to
    // determing if the update or draw function should be called.
    var hasDrawn = false;

    // tracks whether there are enough pieces of the rendering pipeline to
    // succesfully create and render.
    var canDraw = false;

    // logs an error if the view has not been drawn after the delay since
    // the first time it was called. the update event calls this function
    // each time it cannot draw.
    var delay = 3000;
    var waitTimer = null;
    var waiting = function waiting() {
        if (waitTimer) {
            return;
        }
        waitTimer = setTimeout(function () {
            // formatting all blocking variables into an error message.
            var vals = { build: build, builder: builder, state: state, target: target };
            Object.keys(vals).forEach(function (key) {
                vals[key] = vals[key] ? 'ok' : 'waiting';
            });
            // assertion error in the timeout will not interrupt execution.
            assert(canDraw, 'view : still waiting to draw after ' + Math.round(delay / 1000) + 's', vals);
        }, delay);
    };

    // if the view has already been drawn, it is assumed that it can be updated
    // instead of redrawing again. the force argument can override this assumption
    // and require a redraw.
    emit.on('update', function (force) {
        // canDraw is saved to avoid doing the four checks on every update/draw.
        // it is assumed that once all four variables are set the first time, they
        // will never again be invalid. this should be enforced by the bus listeners.
        if (!canDraw) {
            if (isDefined(target) && isDefined(builder) && isDefined(state) && isDefined(build)) {
                canDraw = true;
            } else {
                return waiting();
            }
        }
        if (!force && hasDrawn) {
            view = update(target, create(state), view);
            return;
        }
        view = draw(target, create(state));
        hasDrawn = true;
    });

    // the only functionality from the dom module that is directly exposed
    // is the update event.
    use({ api: {
            update: function update() {
                return emit({ update: false });
            }
        } });

    // primary functionality will be to replace buider. this is overwritten
    // by router modules to more easily associate routes to builders.
    use({ primary: function primary(init) {
            return use({ builder: init() });
        } });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @fires use #build [view]

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = __webpack_require__(0),
    assert = _require.assert,
    isDefined = _require.isDefined,
    isNull = _require.isNull,
    isArray = _require.isArray,
    isString = _require.isString,
    isNumber = _require.isNumber,
    isBoolean = _require.isBoolean,
    isObject = _require.isObject,
    isFunction = _require.isFunction;

// simulates the behavior of the classnames npm package. strings are concatenated,
// arrays are spread and objects keys are included if their value is truthy.


var classnames = function classnames() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return args.map(function (arg) {
        if (isString(arg)) {
            return arg;
        } else if (isArray(arg)) {
            return classnames.apply(undefined, _toConsumableArray(arg));
        } else if (isObject(arg)) {
            return classnames(Object.keys(arg).map(function (key) {
                return arg[key] && key;
            }));
        }
    }).filter(Boolean).join(' ');
};

// will build a vdom structure from the output of the app's builder funtions. this
// output must be valid element syntax, or an expception will be thrown.
var build = function build(element) {
    var ancestry = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'root';

    // boolean values will produce no visible output to make it easier to use inline
    // logical expressions without worrying about unexpected strings on the page.
    if (isBoolean(element)) {
        element = null;
    }
    // null elements will produce no visible output. undefined is intentionally not
    // handled since it is often produced as a result of an unexpected builder output
    // and it should be made clear that something went wrong.
    if (isNull(element)) {
        return { text: '' };
    }
    // in order to simplify type checking, numbers are stringified.
    if (isNumber(element)) {
        element = String(element);
    }
    // strings will produce textNodes when rendered to the browser.
    if (isString(element)) {
        return { text: element };
    }

    // the only remaining element types are formatted as arrays.
    assert(isArray(element), 'view.build : vdom object is not a recognized type', ancestry, element);

    // early recursive return when the element is seen to be have the component syntax.
    if (isFunction(element[0])) {
        // leaving the props and children items undefined should not throw an error.
        var _element = element,
            _element2 = _slicedToArray(_element, 3),
            component = _element2[0],
            _element2$ = _element2[1],
            props = _element2$ === undefined ? {} : _element2$,
            _element2$2 = _element2[2],
            _children = _element2$2 === undefined ? [] : _element2$2;

        assert(isObject(props), 'view.build : component\'s props is not an object', ancestry, element, props);
        assert(isArray(_children), 'view.build : component\'s children is not an array', ancestry, element, _children);
        // the component function is called with an object containing the props
        // and an extra key with the children of this element.
        return build(component(Object.assign({}, props, { children: _children }), ancestry));
    }

    var _element3 = element,
        _element4 = _slicedToArray(_element3, 3),
        tagType = _element4[0],
        _element4$ = _element4[1],
        attributes = _element4$ === undefined ? {} : _element4$,
        _element4$2 = _element4[2],
        childList = _element4$2 === undefined ? [] : _element4$2;

    assert(isString(tagType), 'view.build : tag property is not a string', ancestry, element, tagType);
    assert(isObject(attributes), 'view.build : attributes is not an object', ancestry, element, attributes);
    assert(isArray(childList), 'view.build : children of vdom object is not an array', ancestry, element, childList);

    // regular expression to capture values from the shorthand element tag syntax.
    // it allows each section to be seperated by any amount of spaces, but enforces
    // the order of the capture groups (tagName #id .className | style)
    var match = /^ *(\w+) *(?:#([-\w\d]+))? *((?:\.[-\w\d]+)*)? *(?:\|\s*([^\s]{1}[^]*?))? *$/.exec(tagType);
    assert(isArray(match), 'view.build : tag property cannot be parsed', ancestry, tagType);
    // first element is not needed since it is the entire matched string. default
    // values are not used to avoid adding blank attributes to the nodes.

    var _match = _slicedToArray(match, 5),
        tagName = _match[1],
        id = _match[2],
        className = _match[3],
        style = _match[4];

    // priority is given to the id defined in the attributes.


    if (isDefined(id) && !isDefined(attributes.id)) {
        attributes.id = id.trim();
    }

    // class names from both the tag and the attributes are used.
    if (isDefined(attributes.className) || isDefined(className)) {
        attributes.className = classnames(attributes.className, className).replace(/\./g, ' ').replace(/  +/g, ' ').trim();
    }

    if (isDefined(style)) {
        if (!isDefined(attributes.style)) {
            attributes.style = style;
        } else {
            // extra semicolon is added if not present to prevent conflicts.
            style = (style + ';').replace(/;;$/g, ';');
            // styles defined in the attributes are given priority by being
            // placed after the ones from the tag.
            attributes.style = style + attributes.style;
        }
    }

    // ancestry is recorded to give more context to error messages
    ancestry += ' -> ' + tagType;

    // childList is converted to a children object with each child having its
    // own key. the child order is also recorded.
    var children = {};
    var childOrder = [];
    for (var i = 0; i < childList.length; ++i) {
        var childElement = childList[i];
        var key = i;
        var child = build(childElement, ancestry);
        // a key attribute will override the default array index key.
        if (child.attributes && 'key' in child.attributes) {
            key = child.attributes.key;
            assert(isNumber(key) || isString(key), 'view.build : invalid element key type', ancestry, key);
            assert(String(key).match(/^[\w\d-_]+$/g), 'view.build : invalid character in element key', ancestry, key);
        }
        // keys are normalized to strings to properly compare them.
        key = String(key);
        assert(!children[key], 'view.build : duplicate child key', ancestry, key);
        childOrder.push(key);
        children[key] = child;
    }

    return {
        tagName: tagName,
        attributes: attributes,
        children: children,
        childOrder: childOrder
    };
};

module.exports = function (_ref) {
    var use = _ref.use;

    use({ build: build });
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @fires use #draw   [view]
// @fires use #update [view]

var _require = __webpack_require__(0),
    assert = _require.assert,
    isDefined = _require.isDefined,
    isNode = _require.isNode,
    isFunction = _require.isFunction;

// finds the longest commmon of equal items between two input arrays.
// this function can make some optimizations by assuming that both
// arrays are of equal length, that all keys are unique and that all
// keys are found in both arrays.


var longestChain = function longestChain(original, successor) {
    var count = successor.length;
    var half = count / 2;
    // current longest chain reference is saved to compare against new
    // contenders. the chain's index in the second argument is also kept.
    var longest = 0;
    var chainStart = 0;
    for (var i = 0; i < count; ++i) {
        var startInc = original.indexOf(successor[i]);
        var maxInc = Math.min(count - startInc, count - i);
        // start looking after the current index since it is already
        // known to be equal.
        var currentLength = 1;
        // loop through all following values until either array is fully
        // read or the chain of identical values is broken.
        for (var inc = 1; inc < maxInc; ++inc) {
            if (successor[i + inc] !== original[startInc + inc]) {
                break;
            }
            currentLength += 1;
        }
        if (currentLength > longest) {
            longest = currentLength;
            chainStart = i;
        }
        // quick exit if a chain is found that is longer or equal to half
        // the length of the input arrays since it means there can be no
        // longer chains.
        if (longest >= half) {
            break;
        }
    }
    return {
        start: chainStart,
        end: chainStart + longest - 1
    };
};

// shallow diff of two objects which returns an array of keys where the value is
// different. differences include keys who's values have been deleted or added.
// since there is no reliable way to compare function equality, they are always
// considered to be different.
var diff = function diff(original, successor) {
    var keys = Object.keys(Object.assign({}, original, successor));
    var modifiedKeys = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var valueOriginal = original[key];
        var valueSuccessor = successor[key];
        if (isFunction(valueOriginal) || isFunction(valueSuccessor)) {
            modifiedKeys.push(key);
        }
        if (valueOriginal !== valueSuccessor) {
            modifiedKeys.push(key);
        }
    }
    return modifiedKeys;
};

module.exports = function (_ref, global) {
    var use = _ref.use;

    // recursively travels vdom to create rendered elements. after being rendered,
    // all vdom objects have a "DOM" key which references the created node. this
    // can be used in the update process to manipulate the real dom nodes.
    var render = function render(velem) {
        // the text key will only be present for text elements.
        if (isDefined(velem.text)) {
            velem.DOM = global.document.createTextNode(velem.text);
            return velem;
        }
        var element = global.document.createElement(velem.tagName);
        // attributes are added onto the node.
        Object.assign(element, velem.attributes);
        // all children are rendered and immediately appended into the parent node.
        for (var i = 0; i < velem.childOrder.length; ++i) {
            var key = velem.childOrder[i];

            var _render = render(velem.children[key]),
                DOM = _render.DOM;

            element.appendChild(DOM);
        }
        velem.DOM = element;
        return velem;
    };

    // initial draw to target will wipe the contents of the container node.
    var draw = function draw(target, vdom) {
        // the target's type is not enforced by the module and it needs to be
        // done at this point. this is done to decouple the dom module from
        // the browser (but cannot be avoided in this blob).
        assert(isNode(target), 'view.dom.draw : target is not a DOM node', target);
        render(vdom);
        global.requestAnimationFrame(function () {
            target.innerHTML = '';
            target.appendChild(vdom.DOM);
        });
        return vdom;
    };

    // updates the existing vdom object and its html nodes to be consistent with
    // the new vdom object.
    var update = function update(target, newVDOM, VDOM) {
        // responsibility of checking the target's type is deferred to the blobs.
        assert(isNode(target), 'view.dom.update : target is not a DOM node', target);

        // recursive function to update an element according to new state. the
        // parent and the element's parent index must be passed in order to make
        // modifications to the vdom object in place.
        var _update = function _update(original, successor, parent, parentKey) {
            // lack of original element implies the successor is a new element.
            if (!isDefined(original)) {
                parent.children[parentKey] = render(successor);
                parent.DOM.appendChild(parent.children[parentKey].DOM);
                return;
            }

            // lack of successor element implies the original is being removed.
            if (!isDefined(successor)) {
                parent.DOM.removeChild(original.DOM);
                delete parent.children[parentKey];
                return;
            }

            // if the element's tagName has changed, the whole element must be
            // replaced. this will also capture the case where an html node is
            // being transformed into a text node since the text node's vdom
            // object will not contain a tagName.
            if (original.tagName !== successor.tagName) {
                var oldDOM = original.DOM;
                var _newVDOM = render(successor);
                parent.DOM.replaceChild(_newVDOM.DOM, oldDOM);
                // this technique is used to modify the vdom object in place.
                // both the text element and the tag element props are reset
                // since the types are not recorded.
                Object.assign(original, {
                    DOM: undefined,
                    text: undefined,
                    tagName: undefined,
                    attributes: undefined,
                    children: undefined,
                    childOrder: undefined
                }, _newVDOM);
                return;
            }

            // nodeType of three indicates that the HTML node is a textNode.
            // at this point in the function it has been estblished that the
            // original and successor nodes are of the same type.
            if (original.DOM.nodeType === 3) {
                if (original.text !== successor.text) {
                    original.DOM.nodeValue = successor.text;
                    original.text = successor.text;
                }
                return;
            }

            var attributesDiff = diff(original.attributes, successor.attributes);
            for (var i = 0; i < attributesDiff.length; ++i) {
                var key = attributesDiff[i];
                original.attributes[key] = successor.attributes[key];
                original.DOM[key] = successor.attributes[key];
            }

            // list representing the actual order of children in the dom. it is
            // used later to rearrange nodes to match the desired child order.
            var childOrder = original.childOrder.slice();

            original.childOrder = successor.childOrder;

            // accumulate all child keys from both the original node and the
            // successor node. each child is then recursively updated.
            var childKeys = Object.keys(Object.assign({}, original.children, successor.children));
            for (var _i = 0; _i < childKeys.length; ++_i) {
                var _key = childKeys[_i];
                // new elements are moved to the end of the list.
                if (!original.children[_key]) {
                    childOrder.push(_key);
                    // deleted elements are removed from the list.
                } else if (!successor.children[_key]) {
                    childOrder.splice(childOrder.indexOf(_key), 1);
                }
                _update(original.children[_key], successor.children[_key], original, _key);
            }

            if (!childOrder.length) {
                return;
            }

            // the remainder of this function handles the reordering of the
            // node's children. current order in the dom is diffed agains the
            // correct order. as an optimization, only the longest common chain
            // of keys is kept in place and the nodes that are supposed to be
            // before and after are moved into position. this solution was
            // chosen because it is a relatively cheap computation, can be
            // implemented concisely and is compatible with the restriction that
            // dom nodes can only be moved one at a time.

            var _longestChain = longestChain(childOrder, successor.childOrder),
                start = _longestChain.start,
                end = _longestChain.end;

            // elements before the "correct" chain are prepended to the parent.
            // another important consideration is that dom nodes can only exist
            // in one position in the dom. this means that moving a node
            // implicitly removes it from its original position.


            var startKeys = successor.childOrder.slice(0, start);
            for (var _i2 = startKeys.length - 1; _i2 >= 0; --_i2) {
                var _key2 = startKeys[_i2];
                original.DOM.insertBefore(original.children[_key2].DOM, original.DOM.firstChild);
            }

            // elements after the "correct" chain are appended to the parent.
            var endKeys = successor.childOrder.slice(end + 1, Infinity);
            for (var _i3 = 0; _i3 < endKeys.length; ++_i3) {
                var _key3 = endKeys[_i3];
                original.DOM.appendChild(original.children[_key3].DOM);
            }
        };

        global.requestAnimationFrame(function () {
            try {
                _update(VDOM, newVDOM, { DOM: target, children: { root: VDOM } }, 'root');
            } catch (e) {
                console.error('view.dom.update : ' + e);
            }
        });

        // TODO vdom object is modified after being returned.
        return VDOM;
    };

    use({
        draw: draw,
        update: update
    });
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @fires   redirect     [router]
// @fires   show         [router]
// @fires   blob.api     [core]
// @fires   blob.primary [core]
// @listens redirect
// @listens show
// @listens blob.base
// @listens blob.fetch
// @listens blob.register
// @listens blob.route

var _require = __webpack_require__(0),
    assert = _require.assert,
    isFunction = _require.isFunction,
    isObject = _require.isObject,
    isString = _require.isString,
    makeQueue = _require.makeQueue;

module.exports = function (_ref, global) {
    var on = _ref.on,
        send = _ref.send;

    // will check is the code is being ran from the filesystem or is hosted.
    // this information is used to correctly displaying routes in the former case.
    var isHosted = global.document.origin !== null && global.document.origin !== 'null';

    var baseUrl = '';

    // keeps track of all the registered routes. the format/type of this variable
    // is not enforced by this module and it is left to the regisiter and fetch
    // to validate the values.
    var store = void 0;

    var register = void 0;
    var fetch = void 0;

    // if the router has not yet found a match, every new path might be the
    // the current location and needs to be called. however, after this initial
    // match, any new routes do not need to be verified against the current url.
    var hasMatched = false;

    var queue = makeQueue();

    var safeFetch = function safeFetch() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        assert(isFunction(fetch), 'router : fetch is not a function', fetch);
        fetch.apply(undefined, [store].concat(args));
    };

    var removeBaseUrl = function removeBaseUrl(path) {
        // escapes characters that may cause unintended behavior when converted
        // from a string to a regular expression.
        var escapedBaseUrl = baseUrl.replace(/([^\w])/g, '\\$1');
        return path.replace(new RegExp('\^' + escapedBaseUrl), '') || '';
    };

    var currentPath = global.location.pathname;
    if (!isHosted) {
        currentPath = '';
    }

    // handle back/forward events
    global.onpopstate = function () {
        currentPath = removeBaseUrl(global.location.pathname);
        safeFetch(currentPath);
    };

    on('blob.route', function () {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            path = _ref2.path,
            handler = _ref2.handler;

        assert(isString(path), 'on.blob.route : path is not a string', path);
        assert(isFunction(handler), 'on.blob.route : handler is not a function', path, handler);
        assert(isFunction(register), 'on.blob.route : register is not a function', register);
        store = register(store, path, handler);
        if (!hasMatched) {
            hasMatched = !!safeFetch(currentPath);
        }
    });

    on('blob.base', function (base) {
        assert(isString(base), 'on.blob.base : base url is not a string', base);
        baseUrl = base;
        currentPath = removeBaseUrl(currentPath);
        safeFetch(currentPath);
    });

    on('blob.register', function (_register) {
        assert(isFunction(_register), 'on.blob.register : register is not a function', register);
        register = _register;
    });

    on('blob.fetch', function (_fetch) {
        assert(isFunction(_fetch), 'on.blob.fetch : fetch is not a function', fetch);
        fetch = _fetch;
    });

    // fetch wrapper that makes the browser aware of the url change
    on('redirect', function (path) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        assert(isString(path), 'on.redirect : path is not a string', path);
        assert(isObject(params), 'on.redirect : params is not an object', params);
        // queue used so that route handlers that call route handlers behave
        // as expected. (sequentially)
        queue.add(function () {
            currentPath = path;
            if (isHosted) {
                // edge doesn't care that the file is local and will allow pushState.
                // it also includes "/C:" in the location.pathname, but adds it to
                // the path given to pushState. which means it needs to be removed here.
                global.history.pushState({}, '', (baseUrl + currentPath).replace(/^\/C\:/, ''));
            } else {
                console.log('@okwolo : path changed to\n>>> ' + currentPath);
            }
            safeFetch(currentPath, params);
            queue.done();
        });
    });

    // show acts like a redirect, but will not change the browser's url.
    on('show', function (path) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        assert(isString(path), 'on.show : path is not a string', path);
        assert(isObject(params), 'on.show : params is not an object', params);
        // queue used so that route handlers that call route handlers behave
        // as expected. (sequentially)
        queue.add(function () {
            safeFetch(path, params);
            queue.done();
        });
    });

    // expose module's features to the app.
    send('blob.api', {
        redirect: function redirect(path, params) {
            return send('redirect', path, params);
        },
        show: function show(path, params) {
            return send('show', path, params);
        }
    });

    // first argument can be a path string to register a route handler
    // or a function to directly use a builder.
    send('blob.primary', function (path, builder) {
        if (isFunction(path)) {
            send('blob.builder', path());
            return;
        }
        send('blob.route', {
            path: path,
            handler: function handler(params) {
                send('blob.builder', builder(params));
            }
        });
    });
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @fires blob.register [router]

// this is the same library that is used in by express to match routes.

var pathToRegexp = __webpack_require__(11);

module.exports = function (_ref) {
    var send = _ref.send;

    // the type of store is not enforced by the okwolo-router module. this means
    // that it needs to be created when the first path is registered.
    var register = function register() {
        var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var path = arguments[1];
        var handler = arguments[2];

        var keys = [];
        var pattern = pathToRegexp(path, keys, { strict: true });
        store.push({
            pattern: pattern,
            keys: keys,
            handler: handler
        });
        return store;
    };

    send('blob.register', register);
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * Default configs.
 */
var DEFAULT_DELIMITER = '/'
var DEFAULT_DELIMITERS = './'

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
  '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER
  var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS
  var pathEscaped = false
  var res

  while ((res = PATH_REGEXP.exec(str)) !== null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      pathEscaped = true
      continue
    }

    var prev = ''
    var next = str[index]
    var name = res[2]
    var capture = res[3]
    var group = res[4]
    var modifier = res[5]

    if (!pathEscaped && path.length) {
      var k = path.length - 1

      if (delimiters.indexOf(path[k]) > -1) {
        prev = path[k]
        path = path.slice(0, k)
      }
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
      pathEscaped = false
    }

    var partial = prev !== '' && next !== undefined && next !== prev
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = prev || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prev,
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
    })
  }

  // Push any remaining characters.
  if (path || index < str.length) {
    tokens.push(path + str.substr(index))
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (data, options) {
    var path = ''
    var encode = (options && options.encode) || encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token
        continue
      }

      var value = data ? data[token.name] : undefined
      var segment

      if (Array.isArray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but got array')
        }

        if (value.length === 0) {
          if (token.optional) continue

          throw new TypeError('Expected "' + token.name + '" to not be empty')
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        segment = encode(String(value))

        if (!matches[i].test(segment)) {
          throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"')
        }

        path += token.prefix + segment
        continue
      }

      if (token.optional) {
        // Prepend partial segment prefixes.
        if (token.partial) path += token.prefix

        continue
      }

      throw new TypeError('Expected "' + token.name + '" to be ' + (token.repeat ? 'an array' : 'a string'))
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$/()])/g, '\\$1')
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {Array=}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  if (!keys) return path

  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        pattern: null
      })
    }
  }

  return path
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  return new RegExp('(?:' + parts.join('|') + ')', flags(options))
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}  tokens
 * @param  {Array=}  keys
 * @param  {Object=} options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER)
  var delimiters = options.delimiters || DEFAULT_DELIMITERS
  var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|')
  var route = ''
  var isEndDelimited = false

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
      isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.repeat
        ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
        : token.pattern

      if (keys) keys.push(token)

      if (token.optional) {
        if (token.partial) {
          route += prefix + '(' + capture + ')?'
        } else {
          route += '(?:' + prefix + '(' + capture + '))?'
        }
      } else {
        route += prefix + '(' + capture + ')'
      }
    }
  }

  if (end) {
    if (!strict) route += '(?:' + delimiter + ')?'

    route += endsWith === '$' ? '$' : '(?=' + endsWith + ')'
  } else {
    if (!strict) route += '(?:' + delimiter + '(?=' + endsWith + '))?'
    if (!isEndDelimited) route += '(?=' + delimiter + '|' + endsWith + ')'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {Array=}                keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys)
  }

  if (Array.isArray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), keys, options)
  }

  return stringToRegexp(/** @type {string} */ (path), keys, options)
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// @fires blob.fetch [router]

module.exports = function (_ref) {
    var send = _ref.send;

    // the store's initial value is undefined so it needs to be defaulted
    // to an empty array. this function should be the one doing the action
    // defined in the route since it doesn't return it.
    var fetch = function fetch() {
        var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var path = arguments[1];
        var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var found = false;
        store.find(function (registeredPath) {
            var test = registeredPath.pattern.exec(path);
            if (test === null) {
                return;
            }
            // a non null value on the result of executing the query on the path
            // is considered a successful hit.
            found = true;
            // the first element of the result array is the entire matched string.
            // this value is not useful and the following capture group results
            // are more relevant.
            test.shift();
            // the order of the keys and their values in the matched result is the
            // same and their index is now shared. note that there is no protection
            // against param values being overwritten or tags to share the same key.
            registeredPath.keys.forEach(function (key, i) {
                params[key.name] = test[i];
            });
            registeredPath.handler(params);
            return found;
        });
        return found;
    };

    send('blob.fetch', fetch);
};

/***/ })
/******/ ]);