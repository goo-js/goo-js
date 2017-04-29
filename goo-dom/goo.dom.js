const {assert, isDefined, isNull, isArray, isString, isNode, isObject, isFunction, blobHandler} = require('../goo-utils/goo.utils');

const dom = (_window = window, _target, _builder, _state) => {
    // build vdom from state
    const build = (state) => {
        const parse = (element) => {
            if (isNull(element)) {
                return {text: ''};
            }
            if (isString(element)) {
                return {text: element};
            }
            assert(isArray(element), 'vdom object is not an array or string', element);
            assert(isString(element[0]), 'tag property is not a string', element[0]);
            // capture groups: tagName, id, className, style
            const match = /^ *(\w+) *(?:#([-\w\d]+))? *((?:\.[-\w\d]+)*)? *(?:\|\s*([^\s]{1}[^]*?))? *$/.exec(element[0]);
            assert(isArray(match), 'tag property cannot be parsed', element[0]);
            if (!isObject(element[1])) {
                element[1] = {};
            }
            if (isDefined(match[2]) && !isDefined(element[1].id)) {
                element[1].id = match[2].trim();
            }
            if (isDefined(match[3])) {
                if (!isDefined(element[1].className)) {
                    element[1].className = '';
                }
                element[1].className += match[3].replace(/\./g, ' ');
                element[1].className = element[1].className.trim();
            }
            if (isDefined(match[4])) {
                if (!isDefined(element[1].style)) {
                    element[1].style = '';
                }
                element[1].style += ';' + match[4];
                element[1].style = element[1].style.replace(/^;/g, '');
            }
            if (isDefined(element[2])) {
                assert(isArray(element[2]), 'children of vdom object is not an array', element[2]);
            } else {
                element[2] = [];
            }
            return {
                tagName: match[1],
                attributes: element[1],
                children: element[2].map((c) => parse(c)),
            };
        };
        return parse(builder(state));
    };

    // recursively creates DOM elements from vdom object
    const render = (velem) => {
        if (isDefined(velem.text)) {
            velem.DOM = _window.document.createTextNode(velem.text);
            return velem;
        }
        const element = _window.document.createElement(velem.tagName);
        Object.keys(velem.attributes).forEach((attribute) => {
            element[attribute] = velem.attributes[attribute];
        });
        Object.keys(velem.children).forEach((key) => {
            velem.children[key] = render(velem.children[key]);
            element.appendChild(velem.children[key].DOM);
        });
        velem.DOM = element;
        return velem;
    };

    /* shallow diff of two objects which returns an array of the
        modified keys (functions always considered different)*/
    const diff = (original, successor) => {
        return Object.keys(Object.assign({}, original, successor)).filter((key) => {
            const valueOriginal = original[key];
            const valueSuccessor = successor[key];
            return !((valueOriginal !== Object(valueOriginal)) &&
                    (valueSuccessor !== Object(valueSuccessor)) &&
                    (valueOriginal === valueSuccessor));
        });
    };

    // update vdom and real DOM to new state
    const update = (newState) => {
        _window.requestAnimationFrame(() => _update(vdom, build(newState), {DOM: target, children: [vdom]}, 0));
        // recursive function to update an element according to new state
        const _update = (original, successor, originalParent, parentIndex) => {
            if (!isDefined(original) && !isDefined(successor)) {
                return;
            }
            // add
            if (!isDefined(original)) {
                originalParent.children[parentIndex] = render(successor);
                originalParent.DOM.appendChild(originalParent.children[parentIndex].DOM);
                return;
            }
            // remove
            if (!isDefined(successor)) {
                originalParent.DOM.removeChild(original.DOM);
                setTimeout(() => delete originalParent.children[parentIndex], 0);
                return;
            }
            // replace
            if (original.tagName !== successor.tagName) {
                const oldDOM = original.DOM;
                const newVDOM = render(successor);
                originalParent.DOM.replaceChild(newVDOM.DOM, oldDOM);
                if (isDefined(newVDOM.text)) {
                    originalParent.children[parentIndex].DOM = newVDOM.DOM;
                    originalParent.children[parentIndex].text = newVDOM.text;
                    delete originalParent.children[parentIndex].tagName;
                    delete originalParent.children[parentIndex].attributes;
                    delete originalParent.children[parentIndex].children;
                } else {
                    originalParent.children[parentIndex].DOM = newVDOM.DOM;
                    delete originalParent.children[parentIndex].text;
                    originalParent.children[parentIndex].tagName = newVDOM.tagName;
                    originalParent.children[parentIndex].attributes = newVDOM.attributes;
                    originalParent.children[parentIndex].children = newVDOM.children;
                }
                return;
            }
            // edit
            if (original.DOM.nodeType === 3) {
                if (original.text !== successor.text) {
                    original.DOM.nodeValue = successor.text;
                    original.text = successor.text;
                }
            } else {
                const attributesDiff = diff(original.attributes, successor.attributes);
                if (attributesDiff.length !== 0) {
                    attributesDiff.forEach((key) => {
                        original.attributes[key] = successor.attributes[key];
                        original.DOM[key] = successor.attributes[key];
                    });
                }
            }
            const keys = (Object.keys(original.children || {}).concat(Object.keys(successor.children || {})));
            const visited = {};
            keys.forEach((key) => {
                if (visited[key] === undefined) {
                    visited[key] = true;
                    _update(original.children[key], successor.children[key], original, key);
                }
            });
        };
    };

    let vdom = render({text: ''});
    let target = undefined;
    let builder = undefined;
    let state = undefined;

    let hasDrawn = false;
    const drawToTarget = () => {
        hasDrawn = true;
        _window.requestAnimationFrame(() => {
            target.innerHTML = '';
            target.appendChild(vdom.DOM);
        });
    };

    const requiredVariablesAreDefined = () => {
        return isDefined(target) && isDefined(builder) && isDefined(state);
    };

    const replaceTarget = (newTarget) => {
        assert(isNode(newTarget), 'target is not a DOM node', newTarget);
        target = newTarget;
        if (requiredVariablesAreDefined()) {
            drawToTarget();
        }
    };

    const replaceBuilder = (newBuilder) => {
        assert(isFunction(newBuilder), 'builder is not a function', newBuilder);
        builder = newBuilder;
        if (requiredVariablesAreDefined()) {
            if (!hasDrawn) {
                drawToTarget();
            }
            update(state);
        }
    };

    const updateState = (newState) => {
        assert(isDefined(newState), 'new state is not defined', newState);
        state = newState;
        if (requiredVariablesAreDefined()) {
            if (!hasDrawn) {
                drawToTarget();
            }
            update(state);
        }
    };

    if (isDefined(_target)) {
        replaceTarget(_target);
    }
    if (isDefined(_builder)) {
        replaceBuilder(_builder);
    }
    if (isDefined(_state)) {
        updateState(_state);
    }

    const use = (blob) => {
        // making sure only one value is given to each handler
        const newBlob = {};
        Object.keys(blob).map((b) => newBlob[b] = [blob[b]]);
        return blobHandler({
            target: replaceTarget,
            builder: replaceBuilder,
            state: updateState,
        }, newBlob);
    };

    return {use};
};

module.exports = dom;