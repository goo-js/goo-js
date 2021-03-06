'use strict';

const s = require('../../src/modules/state');
const sh = require('../../src/modules/state.handler');

const testAction = (handler, target) => {
    return {action: {
        type: 'TEST',
        target: target || [],
        handler: handler || ((s) => s),
    }};
};

describe('state.handler', () => {
    describe('events', () => {
        describe('action', () => {
            it('should require both action type', () => {
                const app = o(s, sh);
                app.setState({});
                expect(() => app.send('action', {}))
                    .toThrow(/type/);
            });

            it('should return undefined', () => {
                const app = o(s, sh);
                app.setState({});
                app.use(testAction());
                expect(app.send('action', {type: 'TEST'}))
                    .toBe(undefined);
            });

            it('should pass params to the action handler', () => {
                const test = jest.fn();
                const app = o(s, sh);
                app.setState('a');
                app.use(testAction((state, params) => {
                    test(state + params);
                    return state;
                }));
                app.send('action', {type: 'TEST', params: 'b'});
                expect(test)
                    .toHaveBeenCalledWith('ab');
            });

            it('should use a queue to prevent blobs from being added while actions are being performed', () => {
                const test = jest.fn();
                const app = o(s, sh);
                app.setState({});
                app.send('blob.middleware', () => {});
                app.use(testAction(test));
                app.send('action', {type: 'TEST'});
                expect(test)
                    .toHaveBeenCalledTimes(0);
            });

            describe('apply', () => {
                it('should support async middleware and preserve their order', (done) => {
                    const app = o(s, sh);
                    app.setState({});
                    let callOrder = [];
                    let numTests = 2 + Math.floor(Math.random()*8);
                    for (let i = 0; i < numTests; ++i) {
                        app.send('blob.middleware', (next, state, type, params) => {
                            callOrder.push(i);
                            setTimeout(next, Math.random()*numTests*2);
                        });
                    }
                    app.use(testAction((s) => {
                        for (let i = 0; i < numTests; ++i) {
                            expect(callOrder[i])
                                .toBe(i);
                        }
                        done();
                        return s;
                    }));
                    app.send('action', {type: 'TEST'});
                });

                it('should allow middleware to override all params', () => {
                    const test = jest.fn();
                    const app = o(s, sh);
                    app.setState(0);
                    app.send('blob.middleware', (next, state, type, params) => {
                        next(++state, 'TEST', ++params);
                    });
                    app.use(testAction((state, params) => {
                        test(state, params);
                        return state;
                    }));
                    app.send('action', {type: 'NOT_TEST', params: 1});
                    expect(test)
                        .toHaveBeenCalledWith(1, 2);
                });

                it('should pass a copy of state to middleware', () => {
                    const app = o(s, sh);
                    let originalState = {};
                    app.setState(originalState);
                    app.send('blob.middleware', (next, state) => {
                        expect(state)
                            .not.toBe(originalState);
                    });
                    app.use(testAction());
                    app.send('action', {type: 'TEST'});
                });

                describe('action', () => {
                    it('should reject unknown actions', () => {
                        const app = o(s, sh);
                        app.setState({});
                        expect(() => app.send('action', {type: 'TEST'}))
                            .toThrow(/action[^]*not[^]found/);
                    });

                    it('should pass a copy of state to the action handlers', () => {
                        const app = o(s, sh);
                        let originalState = {};
                        app.setState(originalState);
                        app.use(testAction((state) => {
                            expect(state)
                                .not.toBe(originalState);
                            return state;
                        }));
                        app.send('action', {type: 'TEST'});
                    });

                    it('should provide the right target to the action handlers', () => {
                        const app = o(s, sh);
                        app.setState({a: {b: {c: 'success!'}}});
                        app.use(testAction((target) => {
                            expect(target)
                                .toBe('success!');
                            return target;
                        }, ['a', 'b', 'c']));
                        app.send('action', {type: 'TEST'});
                    });

                    it('should support dynamic action targets', () => {
                        const app = o(s, sh);
                        app.setState({a: {b: {c: 'success!'}}});
                        app.send('blob.action', {
                            type: 'TEST',
                            target: (state, params) => {
                                expect(state)
                                    .toEqual({a: {b: {c: 'success!'}}});
                                expect(params)
                                    .toEqual({test: true});
                                return ['a', 'b', 'c'];
                            },
                            handler: (target) => {
                                expect(target)
                                    .toBe('success!');
                                return target;
                            },
                        });
                        app.send('action', {type: 'TEST', params: {test: true}});
                    });

                    it('should fail when dynamic targets are invalid', () => {
                        const app = o(s, sh);
                        app.setState({});
                        app.send('blob.action', {
                            type: 'TEST',
                            target: () => [{}],
                            handler: () => {},
                        });
                        expect(() => app.send('action', {type: 'TEST'}))
                            .toThrow(/dynamic[^]*string/);
                    });

                    it('should reject unreachable targets', () => {
                        const app = o(s, sh);
                        app.setState({a: {}});
                        app.use(testAction(null, ['a', 'b']));
                        expect(() => app.send('action', {type: 'TEST'}))
                            .toThrow(/target/);
                    });

                    it('should display the path to the unreachable target at the end of the error', () => {
                        const app = o(s, sh);
                        app.setState({a: {}});
                        app.use(testAction(null, ['a', 'b', 'c']));
                        expect(() => app.send('action', {type: 'TEST'}))
                            .toThrow(/a\.b$/);
                    });

                    it('should call watchers after emitting the action', () => {
                        const app = o(s, sh);
                        const test1 = jest.fn();
                        const test2 = jest.fn();
                        const test3 = jest.fn();
                        app.setState({});
                        app.use(testAction((state) => {
                            test1();
                            return state;
                        }));
                        app.send('blob.watcher', () => {
                            expect(test1)
                                .toHaveBeenCalled();
                            test2();
                        });
                        app.send('blob.watcher', () => {
                            expect(test1)
                                .toHaveBeenCalled();
                            test3();
                        });
                        app.send('action', {type: 'TEST'});
                        expect(test2)
                            .toHaveBeenCalled();
                        expect(test3)
                            .toHaveBeenCalled();
                    });

                    it('should pass the state, action type and params to the watchers', () => {
                        const test = jest.fn();
                        const app = o(s, sh);
                        app.setState(1);
                        app.use(testAction());
                        app.send('blob.watcher', test);
                        app.send('action', {type: 'TEST', params: 2});
                        expect(test)
                            .toHaveBeenCalledWith(1, 'TEST', 2);
                    });

                    it('should pass the final arguments, after being manipulated by middleware', () => {
                        const test = jest.fn();
                        const app = o(s, sh);
                        app.setState(1);
                        app.use(testAction());
                        app.send('blob.middleware', (next) => {
                            next('a', 'TEST', 'b');
                        });
                        app.send('blob.watcher', test);
                        app.send('action', {type: '2', params: 3});
                        expect(test)
                            .toHaveBeenCalledWith('a', 'TEST', 'b');
                    });

                    it('should emit the action on the state', () => {
                        const test = jest.fn();
                        const app = o(s, sh);
                        app.setState({});
                        app.use(testAction(() => 0));
                        app.send('blob.watcher', test);
                        app.send('action', {type: 'TEST', params: 1});
                        expect(test)
                            .toHaveBeenCalledWith(0, 'TEST', 1);
                    });

                    it('should replace the action\'s target state, not the whole state', () => {
                        const test = jest.fn();
                        const app = o(s, sh);
                        app.setState({subdirectory: 1});
                        app.use(testAction(() => 0, ['subdirectory']));
                        app.send('blob.watcher', test);
                        app.send('action', {type: 'TEST', params: 1});
                        expect(test)
                            .toHaveBeenCalledWith({subdirectory: 0}, 'TEST', 1);
                    });
                });
            });
        });
    });

    describe('blobs', () => {
        describe('action', () => {
            it('should register and use well formed actions', () => {
                const test = jest.fn();
                const app = o(s, sh);
                app.setState({});
                app.use(testAction((s) => {
                    test();
                    return s;
                }));
                app.send('action', {type: 'TEST'});
                expect(test)
                    .toHaveBeenCalled();
            });

            it('should reject malformed action types', () => {
                const app = o(s, sh);
                app.setState({});
                expect(() => {
                    app.send('blob.action', {
                        type: true,
                        target: [],
                        handler: () => {},
                    });
                })
                    .toThrow(/okwolo[^]*type/);
            });

            it('should reject malformed action targets', () => {
                const app = o(s, sh);
                app.setState({});
                expect(() => {
                    app.send('blob.action', {
                        type: 'TEST',
                        target: 'TEST',
                        handler: () => {},
                    });
                })
                    .toThrow(/okwolo[^]*target/);
            });

            it('should reject malformed action handlers', () => {
                const app = o(s, sh);
                app.setState({});
                expect(() => {
                    app.send('blob.action', {
                        type: 'TEST',
                        target: [],
                        handler: true,
                    });
                })
                    .toThrow(/okwolo[^]*handler/);
            });

            it('should expect action handlers to return a defined value', () => {
                const app = o(s, sh);
                app.setState({});
                app.use(testAction((s) => {}));
                expect(() => app.send('action', {type: 'TEST'}))
                    .toThrow(/result[^]*undefined/);
            });

            it('should be able to register multiple handlers for each type', () => {
                const app = o(s, sh);
                const test1 = jest.fn();
                const test2 = jest.fn();
                const test3 = jest.fn();
                app.setState({});
                app.use(testAction((s) => {
                    test1();
                    return s;
                }));
                app.use(testAction((s) => {
                    test2();
                    return s;
                }));
                const {action} = testAction((s) => {
                    test3();
                    return s;
                });
                app.send('blob.action', [action, action]);
                app.send('blob.action', action, action);
                app.send('action', {type: 'TEST'});
                expect(test1)
                    .toHaveBeenCalled();
                expect(test2)
                    .toHaveBeenCalled();
                expect(test3)
                    .toHaveBeenCalledTimes(4);
            });
        });

        describe('middleware', () => {
            it('should register and use well formed middleware', () => {
                const test = jest.fn();
                const app = o(s, sh);
                app.setState({});
                app.send('blob.middleware', (next, state, type, params) => {
                    test();
                    next();
                });
                app.use(testAction());
                app.send('action', {type: 'TEST'});
                expect(test)
                    .toHaveBeenCalled();
            });

            it('should reject malformed middleware', () => {
                const app = o(s, sh);
                app.setState({});
                expect(() => app.send('blob.middleware', true))
                    .toThrow(/middleware/);
            });

            it('should be able to add and use multiple middleware', () => {
                const app = o(s, sh);
                const test1 = jest.fn();
                const test2 = jest.fn();
                const test3 = jest.fn();
                app.setState({});
                app.send('blob.middleware', (next, state, type, params) => {
                    test1();
                    next();
                });
                app.send('blob.middleware', (next, state, type, params) => {
                    test2();
                    next();
                });
                const middleware = (next) => {
                    test3();
                    next();
                };
                app.send('blob.middleware', [middleware, middleware]);
                app.send('blob.middleware', middleware, middleware);
                app.use(testAction());
                app.send('action', {type: 'TEST'});
                expect(test1)
                    .toHaveBeenCalled();
                expect(test2)
                    .toHaveBeenCalled();
                expect(test3)
                    .toHaveBeenCalledTimes(4);
            });
        });

        describe('watcher', () => {
            it('should register and use well formed watcher', () => {
                const test = jest.fn();
                const app = o(s, sh);
                app.setState({});
                app.send('blob.watcher', test);
                app.use(testAction());
                app.send('action', {type: 'TEST'});
                expect(test)
                    .toHaveBeenCalled();
            });

            it('should reject malformed watchers', () => {
                const app = o(s, sh);
                app.setState({});
                expect(() => app.send('blob.watcher', true))
                    .toThrow(/watcher/);
            });

            it('should be able to add and use multiple watchers', () => {
                const test = jest.fn();
                const app = o(s, sh);
                app.setState({});
                app.send('blob.watcher', test);
                app.send('blob.watcher', test);
                app.send('blob.watcher', [test, test]);
                app.send('blob.watcher', test, test);
                app.use(testAction());
                app.send('action', {type: 'TEST'});
                expect(test)
                    .toHaveBeenCalledTimes(6);
            });
        });
    });
});
