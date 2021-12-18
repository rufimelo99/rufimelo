
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function compute_rest_props(props, keys) {
        const rest = {};
        keys = new Set(keys);
        for (const k in props)
            if (!keys.has(k) && k[0] !== '$')
                rest[k] = props[k];
        return rest;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const subscriber_queue = [];
    /**
     * Creates a `Readable` store that allows reading by subscription.
     * @param value initial value
     * @param {StartStopNotifier}start start and stop notifications for subscriptions
     */
    function readable(value, start) {
        return {
            subscribe: writable(value, start).subscribe
        };
    }
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }
    function derived(stores, fn, initial_value) {
        const single = !Array.isArray(stores);
        const stores_array = single
            ? [stores]
            : stores;
        const auto = fn.length < 2;
        return readable(initial_value, (set) => {
            let inited = false;
            const values = [];
            let pending = 0;
            let cleanup = noop;
            const sync = () => {
                if (pending) {
                    return;
                }
                cleanup();
                const result = fn(single ? values[0] : values, set);
                if (auto) {
                    set(result);
                }
                else {
                    cleanup = is_function(result) ? result : noop;
                }
            };
            const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
                values[i] = value;
                pending &= ~(1 << i);
                if (inited) {
                    sync();
                }
            }, () => {
                pending |= (1 << i);
            }));
            inited = true;
            sync();
            return function stop() {
                run_all(unsubscribers);
                cleanup();
            };
        });
    }

    const LOCATION = {};
    const ROUTER = {};

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/history.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    function getLocation(source) {
      return {
        ...source.location,
        state: source.history.state,
        key: (source.history.state && source.history.state.key) || "initial"
      };
    }

    function createHistory(source, options) {
      const listeners = [];
      let location = getLocation(source);

      return {
        get location() {
          return location;
        },

        listen(listener) {
          listeners.push(listener);

          const popstateListener = () => {
            location = getLocation(source);
            listener({ location, action: "POP" });
          };

          source.addEventListener("popstate", popstateListener);

          return () => {
            source.removeEventListener("popstate", popstateListener);

            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
          };
        },

        navigate(to, { state, replace = false } = {}) {
          state = { ...state, key: Date.now() + "" };
          // try...catch iOS Safari limits to 100 pushState calls
          try {
            if (replace) {
              source.history.replaceState(state, null, to);
            } else {
              source.history.pushState(state, null, to);
            }
          } catch (e) {
            source.location[replace ? "replace" : "assign"](to);
          }

          location = getLocation(source);
          listeners.forEach(listener => listener({ location, action: "PUSH" }));
        }
      };
    }

    // Stores history entries in memory for testing or other platforms like Native
    function createMemorySource(initialPathname = "/") {
      let index = 0;
      const stack = [{ pathname: initialPathname, search: "" }];
      const states = [];

      return {
        get location() {
          return stack[index];
        },
        addEventListener(name, fn) {},
        removeEventListener(name, fn) {},
        history: {
          get entries() {
            return stack;
          },
          get index() {
            return index;
          },
          get state() {
            return states[index];
          },
          pushState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            index++;
            stack.push({ pathname, search });
            states.push(state);
          },
          replaceState(state, _, uri) {
            const [pathname, search = ""] = uri.split("?");
            stack[index] = { pathname, search };
            states[index] = state;
          }
        }
      };
    }

    // Global history uses window.history as the source if available,
    // otherwise a memory history
    const canUseDOM = Boolean(
      typeof window !== "undefined" &&
        window.document &&
        window.document.createElement
    );
    const globalHistory = createHistory(canUseDOM ? window : createMemorySource());
    const { navigate } = globalHistory;

    /**
     * Adapted from https://github.com/reach/router/blob/b60e6dd781d5d3a4bdaaf4de665649c0f6a7e78d/src/lib/utils.js
     *
     * https://github.com/reach/router/blob/master/LICENSE
     * */

    const paramRe = /^:(.+)/;

    const SEGMENT_POINTS = 4;
    const STATIC_POINTS = 3;
    const DYNAMIC_POINTS = 2;
    const SPLAT_PENALTY = 1;
    const ROOT_POINTS = 1;

    /**
     * Check if `string` starts with `search`
     * @param {string} string
     * @param {string} search
     * @return {boolean}
     */
    function startsWith(string, search) {
      return string.substr(0, search.length) === search;
    }

    /**
     * Check if `segment` is a root segment
     * @param {string} segment
     * @return {boolean}
     */
    function isRootSegment(segment) {
      return segment === "";
    }

    /**
     * Check if `segment` is a dynamic segment
     * @param {string} segment
     * @return {boolean}
     */
    function isDynamic(segment) {
      return paramRe.test(segment);
    }

    /**
     * Check if `segment` is a splat
     * @param {string} segment
     * @return {boolean}
     */
    function isSplat(segment) {
      return segment[0] === "*";
    }

    /**
     * Split up the URI into segments delimited by `/`
     * @param {string} uri
     * @return {string[]}
     */
    function segmentize(uri) {
      return (
        uri
          // Strip starting/ending `/`
          .replace(/(^\/+|\/+$)/g, "")
          .split("/")
      );
    }

    /**
     * Strip `str` of potential start and end `/`
     * @param {string} str
     * @return {string}
     */
    function stripSlashes(str) {
      return str.replace(/(^\/+|\/+$)/g, "");
    }

    /**
     * Score a route depending on how its individual segments look
     * @param {object} route
     * @param {number} index
     * @return {object}
     */
    function rankRoute(route, index) {
      const score = route.default
        ? 0
        : segmentize(route.path).reduce((score, segment) => {
            score += SEGMENT_POINTS;

            if (isRootSegment(segment)) {
              score += ROOT_POINTS;
            } else if (isDynamic(segment)) {
              score += DYNAMIC_POINTS;
            } else if (isSplat(segment)) {
              score -= SEGMENT_POINTS + SPLAT_PENALTY;
            } else {
              score += STATIC_POINTS;
            }

            return score;
          }, 0);

      return { route, score, index };
    }

    /**
     * Give a score to all routes and sort them on that
     * @param {object[]} routes
     * @return {object[]}
     */
    function rankRoutes(routes) {
      return (
        routes
          .map(rankRoute)
          // If two routes have the exact same score, we go by index instead
          .sort((a, b) =>
            a.score < b.score ? 1 : a.score > b.score ? -1 : a.index - b.index
          )
      );
    }

    /**
     * Ranks and picks the best route to match. Each segment gets the highest
     * amount of points, then the type of segment gets an additional amount of
     * points where
     *
     *  static > dynamic > splat > root
     *
     * This way we don't have to worry about the order of our routes, let the
     * computers do it.
     *
     * A route looks like this
     *
     *  { path, default, value }
     *
     * And a returned match looks like:
     *
     *  { route, params, uri }
     *
     * @param {object[]} routes
     * @param {string} uri
     * @return {?object}
     */
    function pick(routes, uri) {
      let match;
      let default_;

      const [uriPathname] = uri.split("?");
      const uriSegments = segmentize(uriPathname);
      const isRootUri = uriSegments[0] === "";
      const ranked = rankRoutes(routes);

      for (let i = 0, l = ranked.length; i < l; i++) {
        const route = ranked[i].route;
        let missed = false;

        if (route.default) {
          default_ = {
            route,
            params: {},
            uri
          };
          continue;
        }

        const routeSegments = segmentize(route.path);
        const params = {};
        const max = Math.max(uriSegments.length, routeSegments.length);
        let index = 0;

        for (; index < max; index++) {
          const routeSegment = routeSegments[index];
          const uriSegment = uriSegments[index];

          if (routeSegment !== undefined && isSplat(routeSegment)) {
            // Hit a splat, just grab the rest, and return a match
            // uri:   /files/documents/work
            // route: /files/* or /files/*splatname
            const splatName = routeSegment === "*" ? "*" : routeSegment.slice(1);

            params[splatName] = uriSegments
              .slice(index)
              .map(decodeURIComponent)
              .join("/");
            break;
          }

          if (uriSegment === undefined) {
            // URI is shorter than the route, no match
            // uri:   /users
            // route: /users/:userId
            missed = true;
            break;
          }

          let dynamicMatch = paramRe.exec(routeSegment);

          if (dynamicMatch && !isRootUri) {
            const value = decodeURIComponent(uriSegment);
            params[dynamicMatch[1]] = value;
          } else if (routeSegment !== uriSegment) {
            // Current segments don't match, not dynamic, not splat, so no match
            // uri:   /users/123/settings
            // route: /users/:id/profile
            missed = true;
            break;
          }
        }

        if (!missed) {
          match = {
            route,
            params,
            uri: "/" + uriSegments.slice(0, index).join("/")
          };
          break;
        }
      }

      return match || default_ || null;
    }

    /**
     * Check if the `path` matches the `uri`.
     * @param {string} path
     * @param {string} uri
     * @return {?object}
     */
    function match(route, uri) {
      return pick([route], uri);
    }

    /**
     * Add the query to the pathname if a query is given
     * @param {string} pathname
     * @param {string} [query]
     * @return {string}
     */
    function addQuery(pathname, query) {
      return pathname + (query ? `?${query}` : "");
    }

    /**
     * Resolve URIs as though every path is a directory, no files. Relative URIs
     * in the browser can feel awkward because not only can you be "in a directory",
     * you can be "at a file", too. For example:
     *
     *  browserSpecResolve('foo', '/bar/') => /bar/foo
     *  browserSpecResolve('foo', '/bar') => /foo
     *
     * But on the command line of a file system, it's not as complicated. You can't
     * `cd` from a file, only directories. This way, links have to know less about
     * their current path. To go deeper you can do this:
     *
     *  <Link to="deeper"/>
     *  // instead of
     *  <Link to=`{${props.uri}/deeper}`/>
     *
     * Just like `cd`, if you want to go deeper from the command line, you do this:
     *
     *  cd deeper
     *  # not
     *  cd $(pwd)/deeper
     *
     * By treating every path as a directory, linking to relative paths should
     * require less contextual information and (fingers crossed) be more intuitive.
     * @param {string} to
     * @param {string} base
     * @return {string}
     */
    function resolve(to, base) {
      // /foo/bar, /baz/qux => /foo/bar
      if (startsWith(to, "/")) {
        return to;
      }

      const [toPathname, toQuery] = to.split("?");
      const [basePathname] = base.split("?");
      const toSegments = segmentize(toPathname);
      const baseSegments = segmentize(basePathname);

      // ?a=b, /users?b=c => /users?a=b
      if (toSegments[0] === "") {
        return addQuery(basePathname, toQuery);
      }

      // profile, /users/789 => /users/789/profile
      if (!startsWith(toSegments[0], ".")) {
        const pathname = baseSegments.concat(toSegments).join("/");

        return addQuery((basePathname === "/" ? "" : "/") + pathname, toQuery);
      }

      // ./       , /users/123 => /users/123
      // ../      , /users/123 => /users
      // ../..    , /users/123 => /
      // ../../one, /a/b/c/d   => /a/b/one
      // .././one , /a/b/c/d   => /a/b/c/one
      const allSegments = baseSegments.concat(toSegments);
      const segments = [];

      allSegments.forEach(segment => {
        if (segment === "..") {
          segments.pop();
        } else if (segment !== ".") {
          segments.push(segment);
        }
      });

      return addQuery("/" + segments.join("/"), toQuery);
    }

    /**
     * Combines the `basepath` and the `path` into one path.
     * @param {string} basepath
     * @param {string} path
     */
    function combinePaths(basepath, path) {
      return `${stripSlashes(
    path === "/" ? basepath : `${stripSlashes(basepath)}/${stripSlashes(path)}`
  )}/`;
    }

    /**
     * Decides whether a given `event` should result in a navigation or not.
     * @param {object} event
     */
    function shouldNavigate(event) {
      return (
        !event.defaultPrevented &&
        event.button === 0 &&
        !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
      );
    }

    function hostMatches(anchor) {
      const host = location.host;
      return (
        anchor.host == host ||
        // svelte seems to kill anchor.host value in ie11, so fall back to checking href
        anchor.href.indexOf(`https://${host}`) === 0 ||
        anchor.href.indexOf(`http://${host}`) === 0
      )
    }

    /* node_modules\svelte-routing\src\Router.svelte generated by Svelte v3.44.1 */

    function create_fragment$d(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let $location;
    	let $routes;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Router', slots, ['default']);
    	let { basepath = "/" } = $$props;
    	let { url = null } = $$props;
    	const locationContext = getContext(LOCATION);
    	const routerContext = getContext(ROUTER);
    	const routes = writable([]);
    	validate_store(routes, 'routes');
    	component_subscribe($$self, routes, value => $$invalidate(6, $routes = value));
    	const activeRoute = writable(null);
    	let hasActiveRoute = false; // Used in SSR to synchronously set that a Route is active.

    	// If locationContext is not set, this is the topmost Router in the tree.
    	// If the `url` prop is given we force the location to it.
    	const location = locationContext || writable(url ? { pathname: url } : globalHistory.location);

    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(5, $location = value));

    	// If routerContext is set, the routerBase of the parent Router
    	// will be the base for this Router's descendants.
    	// If routerContext is not set, the path and resolved uri will both
    	// have the value of the basepath prop.
    	const base = routerContext
    	? routerContext.routerBase
    	: writable({ path: basepath, uri: basepath });

    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(7, $base = value));

    	const routerBase = derived([base, activeRoute], ([base, activeRoute]) => {
    		// If there is no activeRoute, the routerBase will be identical to the base.
    		if (activeRoute === null) {
    			return base;
    		}

    		const { path: basepath } = base;
    		const { route, uri } = activeRoute;

    		// Remove the potential /* or /*splatname from
    		// the end of the child Routes relative paths.
    		const path = route.default
    		? basepath
    		: route.path.replace(/\*.*$/, "");

    		return { path, uri };
    	});

    	function registerRoute(route) {
    		const { path: basepath } = $base;
    		let { path } = route;

    		// We store the original path in the _path property so we can reuse
    		// it when the basepath changes. The only thing that matters is that
    		// the route reference is intact, so mutation is fine.
    		route._path = path;

    		route.path = combinePaths(basepath, path);

    		if (typeof window === "undefined") {
    			// In SSR we should set the activeRoute immediately if it is a match.
    			// If there are more Routes being registered after a match is found,
    			// we just skip them.
    			if (hasActiveRoute) {
    				return;
    			}

    			const matchingRoute = match(route, $location.pathname);

    			if (matchingRoute) {
    				activeRoute.set(matchingRoute);
    				hasActiveRoute = true;
    			}
    		} else {
    			routes.update(rs => {
    				rs.push(route);
    				return rs;
    			});
    		}
    	}

    	function unregisterRoute(route) {
    		routes.update(rs => {
    			const index = rs.indexOf(route);
    			rs.splice(index, 1);
    			return rs;
    		});
    	}

    	if (!locationContext) {
    		// The topmost Router in the tree is responsible for updating
    		// the location store and supplying it through context.
    		onMount(() => {
    			const unlisten = globalHistory.listen(history => {
    				location.set(history.location);
    			});

    			return unlisten;
    		});

    		setContext(LOCATION, location);
    	}

    	setContext(ROUTER, {
    		activeRoute,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute
    	});

    	const writable_props = ['basepath', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Router> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		setContext,
    		onMount,
    		writable,
    		derived,
    		LOCATION,
    		ROUTER,
    		globalHistory,
    		pick,
    		match,
    		stripSlashes,
    		combinePaths,
    		basepath,
    		url,
    		locationContext,
    		routerContext,
    		routes,
    		activeRoute,
    		hasActiveRoute,
    		location,
    		base,
    		routerBase,
    		registerRoute,
    		unregisterRoute,
    		$location,
    		$routes,
    		$base
    	});

    	$$self.$inject_state = $$props => {
    		if ('basepath' in $$props) $$invalidate(3, basepath = $$props.basepath);
    		if ('url' in $$props) $$invalidate(4, url = $$props.url);
    		if ('hasActiveRoute' in $$props) hasActiveRoute = $$props.hasActiveRoute;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$base*/ 128) {
    			// This reactive statement will update all the Routes' path when
    			// the basepath changes.
    			{
    				const { path: basepath } = $base;

    				routes.update(rs => {
    					rs.forEach(r => r.path = combinePaths(basepath, r._path));
    					return rs;
    				});
    			}
    		}

    		if ($$self.$$.dirty & /*$routes, $location*/ 96) {
    			// This reactive statement will be run when the Router is created
    			// when there are no Routes and then again the following tick, so it
    			// will not find an active Route in SSR and in the browser it will only
    			// pick an active Route after all Routes have been registered.
    			{
    				const bestMatch = pick($routes, $location.pathname);
    				activeRoute.set(bestMatch);
    			}
    		}
    	};

    	return [
    		routes,
    		location,
    		base,
    		basepath,
    		url,
    		$location,
    		$routes,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Router extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$d, create_fragment$d, safe_not_equal, { basepath: 3, url: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Router",
    			options,
    			id: create_fragment$d.name
    		});
    	}

    	get basepath() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set basepath(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-routing\src\Route.svelte generated by Svelte v3.44.1 */

    const get_default_slot_changes = dirty => ({
    	params: dirty & /*routeParams*/ 4,
    	location: dirty & /*$location*/ 16
    });

    const get_default_slot_context = ctx => ({
    	params: /*routeParams*/ ctx[2],
    	location: /*$location*/ ctx[4]
    });

    // (40:0) {#if $activeRoute !== null && $activeRoute.route === route}
    function create_if_block(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*component*/ ctx[0] !== null) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(40:0) {#if $activeRoute !== null && $activeRoute.route === route}",
    		ctx
    	});

    	return block;
    }

    // (43:2) {:else}
    function create_else_block(ctx) {
    	let current;
    	const default_slot_template = /*#slots*/ ctx[10].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[9], get_default_slot_context);

    	const block = {
    		c: function create() {
    			if (default_slot) default_slot.c();
    		},
    		m: function mount(target, anchor) {
    			if (default_slot) {
    				default_slot.m(target, anchor);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope, routeParams, $location*/ 532)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[9],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[9])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[9], dirty, get_default_slot_changes),
    						get_default_slot_context
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(43:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (41:2) {#if component !== null}
    function create_if_block_1(ctx) {
    	let switch_instance;
    	let switch_instance_anchor;
    	let current;

    	const switch_instance_spread_levels = [
    		{ location: /*$location*/ ctx[4] },
    		/*routeParams*/ ctx[2],
    		/*routeProps*/ ctx[3]
    	];

    	var switch_value = /*component*/ ctx[0];

    	function switch_props(ctx) {
    		let switch_instance_props = {};

    		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
    			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props());
    	}

    	const block = {
    		c: function create() {
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			switch_instance_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (switch_instance) {
    				mount_component(switch_instance, target, anchor);
    			}

    			insert_dev(target, switch_instance_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const switch_instance_changes = (dirty & /*$location, routeParams, routeProps*/ 28)
    			? get_spread_update(switch_instance_spread_levels, [
    					dirty & /*$location*/ 16 && { location: /*$location*/ ctx[4] },
    					dirty & /*routeParams*/ 4 && get_spread_object(/*routeParams*/ ctx[2]),
    					dirty & /*routeProps*/ 8 && get_spread_object(/*routeProps*/ ctx[3])
    				])
    			: {};

    			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props());
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(switch_instance_anchor);
    			if (switch_instance) destroy_component(switch_instance, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(41:2) {#if component !== null}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$c(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = /*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*$activeRoute*/ ctx[1] !== null && /*$activeRoute*/ ctx[1].route === /*route*/ ctx[7]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*$activeRoute*/ 2) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let $activeRoute;
    	let $location;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Route', slots, ['default']);
    	let { path = "" } = $$props;
    	let { component = null } = $$props;
    	const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);
    	validate_store(activeRoute, 'activeRoute');
    	component_subscribe($$self, activeRoute, value => $$invalidate(1, $activeRoute = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(4, $location = value));

    	const route = {
    		path,
    		// If no path prop is given, this Route will act as the default Route
    		// that is rendered if no other Route in the Router is a match.
    		default: path === ""
    	};

    	let routeParams = {};
    	let routeProps = {};
    	registerRoute(route);

    	// There is no need to unregister Routes in SSR since it will all be
    	// thrown away anyway.
    	if (typeof window !== "undefined") {
    		onDestroy(() => {
    			unregisterRoute(route);
    		});
    	}

    	$$self.$$set = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    		if ('path' in $$new_props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$new_props) $$invalidate(0, component = $$new_props.component);
    		if ('$$scope' in $$new_props) $$invalidate(9, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onDestroy,
    		ROUTER,
    		LOCATION,
    		path,
    		component,
    		registerRoute,
    		unregisterRoute,
    		activeRoute,
    		location,
    		route,
    		routeParams,
    		routeProps,
    		$activeRoute,
    		$location
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(13, $$props = assign(assign({}, $$props), $$new_props));
    		if ('path' in $$props) $$invalidate(8, path = $$new_props.path);
    		if ('component' in $$props) $$invalidate(0, component = $$new_props.component);
    		if ('routeParams' in $$props) $$invalidate(2, routeParams = $$new_props.routeParams);
    		if ('routeProps' in $$props) $$invalidate(3, routeProps = $$new_props.routeProps);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$activeRoute*/ 2) {
    			if ($activeRoute && $activeRoute.route === route) {
    				$$invalidate(2, routeParams = $activeRoute.params);
    			}
    		}

    		{
    			const { path, component, ...rest } = $$props;
    			$$invalidate(3, routeProps = rest);
    		}
    	};

    	$$props = exclude_internal_props($$props);

    	return [
    		component,
    		$activeRoute,
    		routeParams,
    		routeProps,
    		$location,
    		activeRoute,
    		location,
    		route,
    		path,
    		$$scope,
    		slots
    	];
    }

    class Route extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$c, create_fragment$c, safe_not_equal, { path: 8, component: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Route",
    			options,
    			id: create_fragment$c.name
    		});
    	}

    	get path() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set path(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get component() {
    		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set component(value) {
    		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-routing\src\Link.svelte generated by Svelte v3.44.1 */
    const file$a = "node_modules\\svelte-routing\\src\\Link.svelte";

    function create_fragment$b(ctx) {
    	let a;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[16].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[15], null);

    	let a_levels = [
    		{ href: /*href*/ ctx[0] },
    		{ "aria-current": /*ariaCurrent*/ ctx[2] },
    		/*props*/ ctx[1],
    		/*$$restProps*/ ctx[6]
    	];

    	let a_data = {};

    	for (let i = 0; i < a_levels.length; i += 1) {
    		a_data = assign(a_data, a_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (default_slot) default_slot.c();
    			set_attributes(a, a_data);
    			add_location(a, file$a, 40, 0, 1249);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);

    			if (default_slot) {
    				default_slot.m(a, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(a, "click", /*onClick*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32768)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[15],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[15])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[15], dirty, null),
    						null
    					);
    				}
    			}

    			set_attributes(a, a_data = get_spread_update(a_levels, [
    				(!current || dirty & /*href*/ 1) && { href: /*href*/ ctx[0] },
    				(!current || dirty & /*ariaCurrent*/ 4) && { "aria-current": /*ariaCurrent*/ ctx[2] },
    				dirty & /*props*/ 2 && /*props*/ ctx[1],
    				dirty & /*$$restProps*/ 64 && /*$$restProps*/ ctx[6]
    			]));
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let ariaCurrent;
    	const omit_props_names = ["to","replace","state","getProps"];
    	let $$restProps = compute_rest_props($$props, omit_props_names);
    	let $location;
    	let $base;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Link', slots, ['default']);
    	let { to = "#" } = $$props;
    	let { replace = false } = $$props;
    	let { state = {} } = $$props;
    	let { getProps = () => ({}) } = $$props;
    	const { base } = getContext(ROUTER);
    	validate_store(base, 'base');
    	component_subscribe($$self, base, value => $$invalidate(14, $base = value));
    	const location = getContext(LOCATION);
    	validate_store(location, 'location');
    	component_subscribe($$self, location, value => $$invalidate(13, $location = value));
    	const dispatch = createEventDispatcher();
    	let href, isPartiallyCurrent, isCurrent, props;

    	function onClick(event) {
    		dispatch("click", event);

    		if (shouldNavigate(event)) {
    			event.preventDefault();

    			// Don't push another entry to the history stack when the user
    			// clicks on a Link to the page they are currently on.
    			const shouldReplace = $location.pathname === href || replace;

    			navigate(href, { state, replace: shouldReplace });
    		}
    	}

    	$$self.$$set = $$new_props => {
    		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    		$$invalidate(6, $$restProps = compute_rest_props($$props, omit_props_names));
    		if ('to' in $$new_props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$new_props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$new_props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$new_props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('$$scope' in $$new_props) $$invalidate(15, $$scope = $$new_props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		createEventDispatcher,
    		ROUTER,
    		LOCATION,
    		navigate,
    		startsWith,
    		resolve,
    		shouldNavigate,
    		to,
    		replace,
    		state,
    		getProps,
    		base,
    		location,
    		dispatch,
    		href,
    		isPartiallyCurrent,
    		isCurrent,
    		props,
    		onClick,
    		ariaCurrent,
    		$location,
    		$base
    	});

    	$$self.$inject_state = $$new_props => {
    		if ('to' in $$props) $$invalidate(7, to = $$new_props.to);
    		if ('replace' in $$props) $$invalidate(8, replace = $$new_props.replace);
    		if ('state' in $$props) $$invalidate(9, state = $$new_props.state);
    		if ('getProps' in $$props) $$invalidate(10, getProps = $$new_props.getProps);
    		if ('href' in $$props) $$invalidate(0, href = $$new_props.href);
    		if ('isPartiallyCurrent' in $$props) $$invalidate(11, isPartiallyCurrent = $$new_props.isPartiallyCurrent);
    		if ('isCurrent' in $$props) $$invalidate(12, isCurrent = $$new_props.isCurrent);
    		if ('props' in $$props) $$invalidate(1, props = $$new_props.props);
    		if ('ariaCurrent' in $$props) $$invalidate(2, ariaCurrent = $$new_props.ariaCurrent);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*to, $base*/ 16512) {
    			$$invalidate(0, href = to === "/" ? $base.uri : resolve(to, $base.uri));
    		}

    		if ($$self.$$.dirty & /*$location, href*/ 8193) {
    			$$invalidate(11, isPartiallyCurrent = startsWith($location.pathname, href));
    		}

    		if ($$self.$$.dirty & /*href, $location*/ 8193) {
    			$$invalidate(12, isCurrent = href === $location.pathname);
    		}

    		if ($$self.$$.dirty & /*isCurrent*/ 4096) {
    			$$invalidate(2, ariaCurrent = isCurrent ? "page" : undefined);
    		}

    		if ($$self.$$.dirty & /*getProps, $location, href, isPartiallyCurrent, isCurrent*/ 15361) {
    			$$invalidate(1, props = getProps({
    				location: $location,
    				href,
    				isPartiallyCurrent,
    				isCurrent
    			}));
    		}
    	};

    	return [
    		href,
    		props,
    		ariaCurrent,
    		base,
    		location,
    		onClick,
    		$$restProps,
    		to,
    		replace,
    		state,
    		getProps,
    		isPartiallyCurrent,
    		isCurrent,
    		$location,
    		$base,
    		$$scope,
    		slots
    	];
    }

    class Link extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$b, create_fragment$b, safe_not_equal, {
    			to: 7,
    			replace: 8,
    			state: 9,
    			getProps: 10
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Link",
    			options,
    			id: create_fragment$b.name
    		});
    	}

    	get to() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set to(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get replace() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set replace(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get getProps() {
    		throw new Error("<Link>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set getProps(value) {
    		throw new Error("<Link>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /**
     * A link action that can be added to <a href=""> tags rather
     * than using the <Link> component.
     *
     * Example:
     * ```html
     * <a href="/post/{postId}" use:link>{post.title}</a>
     * ```
     */
    function link(node) {
      function onClick(event) {
        const anchor = event.currentTarget;

        if (
          anchor.target === "" &&
          hostMatches(anchor) &&
          shouldNavigate(event)
        ) {
          event.preventDefault();
          navigate(anchor.pathname + anchor.search, { replace: anchor.hasAttribute("replace") });
        }
      }

      node.addEventListener("click", onClick);

      return {
        destroy() {
          node.removeEventListener("click", onClick);
        }
      };
    }

    /* src\Tailwindcss.svelte generated by Svelte v3.44.1 */

    function create_fragment$a(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tailwindcss', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tailwindcss> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Tailwindcss extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$a, create_fragment$a, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tailwindcss",
    			options,
    			id: create_fragment$a.name
    		});
    	}
    }

    function cubicInOut(t) {
        return t < 0.5 ? 4.0 * t * t * t : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
    }
    function quadInOut(t) {
        t /= 0.5;
        if (t < 1)
            return 0.5 * t * t;
        t--;
        return -0.5 * (t * (t - 2) - 1);
    }

    function writableSet(value = new Set()) {
      const store = writable(value);

      const wrap = (method) => {
        return (...args) => {
          let output;
          store.update((value) => {
            output = value[method](...args);
            return value;
          });
          return output;
        };
      };
      return {
        ...store,
        add: wrap("add"),
        delete: wrap("delete"),
      };
    }

    const contextKey = {};

    // temporary fork of https://github.com/langbamit/svelte-scrollto
    let supportsPassive = false;
    try {
      let opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true;
        },
      });
      window.addEventListener('test', null, opts);
    } catch (e) {}

    var _ = {
      $(selector) {
        if (typeof selector === "string") {
          return document.querySelector(selector);
        }
        return selector;
      },
      extend(...args) {
        return Object.assign(...args);
      },
      addListeners(element, events, handler, opts = { passive: false }) {
        if (!(events instanceof Array)) {
         events = [events];
       }
       for (let i = 0; i < events.length; i++) {
         element.addEventListener(
           events[i],
           handler,
           supportsPassive ? opts : false
         );
       }
     },
     removeListeners(element, events, handler) {
       if (!(events instanceof Array)) {
         events = [events];
       }
       for (let i = 0; i < events.length; i++) {
         element.removeEventListener(events[i], handler);
       }
     },
      cumulativeOffset(element) {
        let top = 0;
        let left = 0;

        do {
          top += element.offsetTop || 0;
          left += element.offsetLeft || 0;
          element = element.offsetParent;
        } while (element);

        return {
          top: top,
          left: left
        };
      },
      directScroll(element) {
        return element && element !== document && element !== document.body;
      },
      scrollTop(element, value) {
        let inSetter = value !== undefined;
        if (this.directScroll(element)) {
          return inSetter ? (element.scrollTop = value) : element.scrollTop;
        } else {
          return inSetter
            ? (document.documentElement.scrollTop = document.body.scrollTop = value)
            : window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop ||
                0;
        }
      },
      scrollLeft(element, value) {
        let inSetter = value !== undefined;
        if (this.directScroll(element)) {
          return inSetter ? (element.scrollLeft = value) : element.scrollLeft;
        } else {
          return inSetter
            ? (document.documentElement.scrollLeft = document.body.scrollLeft = value)
            : window.pageXOffset ||
                document.documentElement.scrollLeft ||
                document.body.scrollLeft ||
                0;
        }
      }
    };

    // temporary fork of https://github.com/langbamit/svelte-scrollto

    const defaultOptions = {
      container: "body",
      duration: 500,
      delay: 0,
      offset: 0,
      easing: cubicInOut,
      onStart: noop,
      onDone: noop,
      onAborting: noop,
      scrollX: false,
      scrollY: true
    };

    const abortEvents = [
      'mousedown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'keydown',
      'touchmove',
    ];

    const _scrollTo = options => {
      let {
        offset,
        duration,
        delay,
        easing,
        x=0,
        y=0,
        scrollX,
        scrollY,
        onStart,
        onDone,
        container,
        onAborting,
        element
      } = options;

      if (typeof offset === "function") {
        offset = offset();
      }

      var cumulativeOffsetContainer = _.cumulativeOffset(container);
      var cumulativeOffsetTarget = element
        ? _.cumulativeOffset(element)
        : { top: y, left: x };

      var initialX = _.scrollLeft(container);
      var initialY = _.scrollTop(container);

      var targetX =
        cumulativeOffsetTarget.left - cumulativeOffsetContainer.left + offset;
      var targetY =
        cumulativeOffsetTarget.top - cumulativeOffsetContainer.top + offset;

      var diffX = targetX - initialX;
    	var diffY = targetY - initialY;

      let scrolling = true;
      let started = false;
      let start_time = now() + delay;
      let end_time = start_time + duration;

      function scrollToTopLeft(element, top, left) {
        if (scrollX) _.scrollLeft(element, left);
        if (scrollY) _.scrollTop(element, top);
      }

      function start(delayStart) {
        if (!delayStart) {
          started = true;
          onStart(element, {x, y});
        }
        _.addListeners(container, abortEvents, stop, { passive: true });
      }

      function tick(progress) {
        scrollToTopLeft(
          container,
          initialY + diffY * progress,
          initialX + diffX * progress
        );
      }

      function stop() {
        scrolling = false;
        _.removeListeners(container, abortEvents, stop);
      }

      loop(now => {
        if (!started && now >= start_time) {
          start(false);
        }

        if (started && now >= end_time) {
          tick(1);
          stop();
          onDone(element, {x, y});
          return false;
        }

        if (!scrolling) {
          onAborting(element, {x, y});
          return false;
        }
        if (started) {
          const p = now - start_time;
          const t = 0 + 1 * easing(p / duration);
          tick(t);
        }

        return true;
      });

      start(delay);

      tick(0);

      return stop;
    };

    const proceedOptions = options => {
    	let opts = _.extend({}, defaultOptions, options);
      opts.container = _.$(opts.container);
      opts.element = _.$(opts.element);
      return opts;
    };

    const scrollTo = options => {
      return _scrollTo(proceedOptions(options));
    };

    // focus - focusOptions - preventScroll polyfill
    (function() {
      if (
        typeof window === "undefined" ||
        typeof document === "undefined" ||
        typeof HTMLElement === "undefined"
      ) {
        return;
      }

      var supportsPreventScrollOption = false;
      try {
        var focusElem = document.createElement("div");
        focusElem.addEventListener(
          "focus",
          function(event) {
            event.preventDefault();
            event.stopPropagation();
          },
          true
        );
        focusElem.focus(
          Object.defineProperty({}, "preventScroll", {
            get: function() {
              // Edge v18 gives a false positive for supporting inputs
              if (
                navigator &&
                typeof navigator.userAgent !== 'undefined' &&
                navigator.userAgent &&
                navigator.userAgent.match(/Edge\/1[7-8]/)) {
                  return supportsPreventScrollOption = false
              }

              supportsPreventScrollOption = true;
            }
          })
        );
      } catch (e) {}

      if (
        HTMLElement.prototype.nativeFocus === undefined &&
        !supportsPreventScrollOption
      ) {
        HTMLElement.prototype.nativeFocus = HTMLElement.prototype.focus;

        var calcScrollableElements = function(element) {
          var parent = element.parentNode;
          var scrollableElements = [];
          var rootScrollingElement =
            document.scrollingElement || document.documentElement;

          while (parent && parent !== rootScrollingElement) {
            if (
              parent.offsetHeight < parent.scrollHeight ||
              parent.offsetWidth < parent.scrollWidth
            ) {
              scrollableElements.push([
                parent,
                parent.scrollTop,
                parent.scrollLeft
              ]);
            }
            parent = parent.parentNode;
          }
          parent = rootScrollingElement;
          scrollableElements.push([parent, parent.scrollTop, parent.scrollLeft]);

          return scrollableElements;
        };

        var restoreScrollPosition = function(scrollableElements) {
          for (var i = 0; i < scrollableElements.length; i++) {
            scrollableElements[i][0].scrollTop = scrollableElements[i][1];
            scrollableElements[i][0].scrollLeft = scrollableElements[i][2];
          }
          scrollableElements = [];
        };

        var patchedFocus = function(args) {
          if (args && args.preventScroll) {
            var evScrollableElements = calcScrollableElements(this);
            if (typeof setTimeout === 'function') {
              var thisElem = this;
              setTimeout(function () {
                thisElem.nativeFocus();
                restoreScrollPosition(evScrollableElements);
              }, 0);
            } else {
              this.nativeFocus();
              restoreScrollPosition(evScrollableElements);
            }
          }
          else {
            this.nativeFocus();
          }
        };

        HTMLElement.prototype.focus = patchedFocus;
      }
    })();

    /* node_modules\svelte-parallax\src\Parallax.svelte generated by Svelte v3.44.1 */

    const { scrollTo: scrollTo_1, setTimeout: setTimeout_1, window: window_1 } = globals;
    const file$9 = "node_modules\\svelte-parallax\\src\\Parallax.svelte";

    function create_fragment$9(ctx) {
    	let scrolling = false;

    	let clear_scrolling = () => {
    		scrolling = false;
    	};

    	let scrolling_timeout;
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	add_render_callback(/*onwindowscroll*/ ctx[21]);
    	add_render_callback(/*onwindowresize*/ ctx[22]);
    	const default_slot_template = /*#slots*/ ctx[19].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[18], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "parallax-container svelte-z1qp18");
    			attr_dev(div, "style", /*style*/ ctx[0]);
    			add_location(div, file$9, 108, 0, 3301);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			/*div_binding*/ ctx[23](div);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(window_1, "resize", /*resize_handler*/ ctx[20], false, false, false),
    					listen_dev(window_1, "scroll", () => {
    						scrolling = true;
    						clearTimeout(scrolling_timeout);
    						scrolling_timeout = setTimeout_1(clear_scrolling, 100);
    						/*onwindowscroll*/ ctx[21]();
    					}),
    					listen_dev(window_1, "resize", /*onwindowresize*/ ctx[22])
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*$y*/ 8 && !scrolling) {
    				scrolling = true;
    				clearTimeout(scrolling_timeout);
    				scrollTo_1(window_1.pageXOffset, /*$y*/ ctx[3]);
    				scrolling_timeout = setTimeout_1(clear_scrolling, 100);
    			}

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 262144)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[18],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[18])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[18], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*style*/ 1) {
    				attr_dev(div, "style", /*style*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			/*div_binding*/ ctx[23](null);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let $top;
    	let $scrollTop;
    	let $layers;
    	let $y;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Parallax', slots, ['default']);
    	let container;

    	// bind:innerHeight
    	let innerHeight;

    	let { sections = 1 } = $$props;
    	let { config = { stiffness: 0.017, damping: 0.26 } } = $$props;
    	let { threshold = { top: 1, bottom: 1 } } = $$props;
    	let { disabled = false } = $$props;
    	let { style = "" } = $$props;
    	let { onEnter = undefined } = $$props;
    	let { onExit = undefined } = $$props;

    	// bind:scrollY
    	const y = writable(0);

    	validate_store(y, 'y');
    	component_subscribe($$self, y, value => $$invalidate(3, $y = value));

    	// top coord of Parallax container
    	const top = writable(0);

    	validate_store(top, 'top');
    	component_subscribe($$self, top, value => $$invalidate(24, $top = value));

    	// this is only here until legacy onEnter/onExit API is removed
    	const legacyEnter = onEnter ? 0 : 1;

    	const legacyExit = onExit ? 0 : 1;
    	const enter = onEnter === undefined ? threshold.top : legacyEnter;
    	const exit = onExit === undefined ? threshold.bottom : legacyExit;

    	// fake intersection observer
    	const scrollTop = derived([y, top], ([$y, $top], set) => {
    		const dy = $y - $top;
    		const min = 0 - innerHeight + innerHeight * enter;
    		const max = innerHeight * sections - innerHeight * exit;

    		// sorry
    		const step = dy < min ? min : dy > max ? max : dy;

    		set(step);
    	});

    	validate_store(scrollTop, 'scrollTop');
    	component_subscribe($$self, scrollTop, value => $$invalidate(16, $scrollTop = value));

    	// eventually filled with ParallaxLayer objects
    	const layers = writableSet(new Set());

    	validate_store(layers, 'layers');
    	component_subscribe($$self, layers, value => $$invalidate(17, $layers = value));

    	setContext(contextKey, {
    		config,
    		addLayer: layer => {
    			layers.add(layer);
    		},
    		removeLayer: layer => {
    			layers.delete(layer);
    		}
    	});

    	onMount(() => {
    		setDimensions();
    	});

    	function setDimensions() {
    		// set height here for edge case with more than one Parallax on page
    		$$invalidate(2, container.style.height = `${innerHeight * sections}px`, container);

    		set_store_value(top, $top = container.getBoundingClientRect().top + window.pageYOffset, $top);
    	}

    	function scrollTo$1(section, { selector = '', duration = 500, easing = quadInOut } = {}) {
    		const scrollTarget = $top + innerHeight * (section - 1);

    		const focusTarget = () => {
    			document.querySelector(selector).focus({ preventScroll: true });
    		};

    		// don't animate scroll if disabled
    		if (disabled) {
    			window.scrollTo({ top: scrollTarget });
    			selector && focusTarget();
    			return;
    		}

    		scrollTo({
    			y: scrollTarget,
    			duration,
    			easing,
    			onDone: selector
    			? focusTarget
    			: () => {
    					
    				}
    		});
    	}

    	const writable_props = ['sections', 'config', 'threshold', 'disabled', 'style', 'onEnter', 'onExit'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Parallax> was created with unknown prop '${key}'`);
    	});

    	const resize_handler = () => setTimeout(setDimensions, 0);

    	function onwindowscroll() {
    		y.set($y = window_1.pageYOffset);
    	}

    	function onwindowresize() {
    		$$invalidate(1, innerHeight = window_1.innerHeight);
    	}

    	function div_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			container = $$value;
    			$$invalidate(2, container);
    		});
    	}

    	$$self.$$set = $$props => {
    		if ('sections' in $$props) $$invalidate(9, sections = $$props.sections);
    		if ('config' in $$props) $$invalidate(10, config = $$props.config);
    		if ('threshold' in $$props) $$invalidate(11, threshold = $$props.threshold);
    		if ('disabled' in $$props) $$invalidate(12, disabled = $$props.disabled);
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('onEnter' in $$props) $$invalidate(13, onEnter = $$props.onEnter);
    		if ('onExit' in $$props) $$invalidate(14, onExit = $$props.onExit);
    		if ('$$scope' in $$props) $$invalidate(18, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		setContext,
    		onMount,
    		writable,
    		derived,
    		quadInOut,
    		writableSet,
    		contextKey,
    		svelteScrollTo: scrollTo,
    		container,
    		innerHeight,
    		sections,
    		config,
    		threshold,
    		disabled,
    		style,
    		onEnter,
    		onExit,
    		y,
    		top,
    		legacyEnter,
    		legacyExit,
    		enter,
    		exit,
    		scrollTop,
    		layers,
    		setDimensions,
    		scrollTo: scrollTo$1,
    		$top,
    		$scrollTop,
    		$layers,
    		$y
    	});

    	$$self.$inject_state = $$props => {
    		if ('container' in $$props) $$invalidate(2, container = $$props.container);
    		if ('innerHeight' in $$props) $$invalidate(1, innerHeight = $$props.innerHeight);
    		if ('sections' in $$props) $$invalidate(9, sections = $$props.sections);
    		if ('config' in $$props) $$invalidate(10, config = $$props.config);
    		if ('threshold' in $$props) $$invalidate(11, threshold = $$props.threshold);
    		if ('disabled' in $$props) $$invalidate(12, disabled = $$props.disabled);
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('onEnter' in $$props) $$invalidate(13, onEnter = $$props.onEnter);
    		if ('onExit' in $$props) $$invalidate(14, onExit = $$props.onExit);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$layers, innerHeight*/ 131074) {
    			// update ParallaxLayers from parent
    			$layers.forEach(layer => {
    				layer.setHeight(innerHeight);
    			});
    		}

    		if ($$self.$$.dirty & /*$layers, $scrollTop, innerHeight, disabled*/ 200706) {
    			$layers.forEach(layer => {
    				layer.setPosition($scrollTop, innerHeight, disabled);
    			});
    		}
    	};

    	return [
    		style,
    		innerHeight,
    		container,
    		$y,
    		y,
    		top,
    		scrollTop,
    		layers,
    		setDimensions,
    		sections,
    		config,
    		threshold,
    		disabled,
    		onEnter,
    		onExit,
    		scrollTo$1,
    		$scrollTop,
    		$layers,
    		$$scope,
    		slots,
    		resize_handler,
    		onwindowscroll,
    		onwindowresize,
    		div_binding
    	];
    }

    class Parallax extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {
    			sections: 9,
    			config: 10,
    			threshold: 11,
    			disabled: 12,
    			style: 0,
    			onEnter: 13,
    			onExit: 14,
    			scrollTo: 15
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Parallax",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get sections() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set sections(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get config() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set config(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get threshold() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set threshold(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onEnter() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onEnter(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get onExit() {
    		throw new Error("<Parallax>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onExit(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get scrollTo() {
    		return this.$$.ctx[15];
    	}

    	set scrollTo(value) {
    		throw new Error("<Parallax>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function is_date(obj) {
        return Object.prototype.toString.call(obj) === '[object Date]';
    }

    function tick_spring(ctx, last_value, current_value, target_value) {
        if (typeof current_value === 'number' || is_date(current_value)) {
            // @ts-ignore
            const delta = target_value - current_value;
            // @ts-ignore
            const velocity = (current_value - last_value) / (ctx.dt || 1 / 60); // guard div by 0
            const spring = ctx.opts.stiffness * delta;
            const damper = ctx.opts.damping * velocity;
            const acceleration = (spring - damper) * ctx.inv_mass;
            const d = (velocity + acceleration) * ctx.dt;
            if (Math.abs(d) < ctx.opts.precision && Math.abs(delta) < ctx.opts.precision) {
                return target_value; // settled
            }
            else {
                ctx.settled = false; // signal loop to keep ticking
                // @ts-ignore
                return is_date(current_value) ?
                    new Date(current_value.getTime() + d) : current_value + d;
            }
        }
        else if (Array.isArray(current_value)) {
            // @ts-ignore
            return current_value.map((_, i) => tick_spring(ctx, last_value[i], current_value[i], target_value[i]));
        }
        else if (typeof current_value === 'object') {
            const next_value = {};
            for (const k in current_value) {
                // @ts-ignore
                next_value[k] = tick_spring(ctx, last_value[k], current_value[k], target_value[k]);
            }
            // @ts-ignore
            return next_value;
        }
        else {
            throw new Error(`Cannot spring ${typeof current_value} values`);
        }
    }
    function spring(value, opts = {}) {
        const store = writable(value);
        const { stiffness = 0.15, damping = 0.8, precision = 0.01 } = opts;
        let last_time;
        let task;
        let current_token;
        let last_value = value;
        let target_value = value;
        let inv_mass = 1;
        let inv_mass_recovery_rate = 0;
        let cancel_task = false;
        function set(new_value, opts = {}) {
            target_value = new_value;
            const token = current_token = {};
            if (value == null || opts.hard || (spring.stiffness >= 1 && spring.damping >= 1)) {
                cancel_task = true; // cancel any running animation
                last_time = now();
                last_value = new_value;
                store.set(value = target_value);
                return Promise.resolve();
            }
            else if (opts.soft) {
                const rate = opts.soft === true ? .5 : +opts.soft;
                inv_mass_recovery_rate = 1 / (rate * 60);
                inv_mass = 0; // infinite mass, unaffected by spring forces
            }
            if (!task) {
                last_time = now();
                cancel_task = false;
                task = loop(now => {
                    if (cancel_task) {
                        cancel_task = false;
                        task = null;
                        return false;
                    }
                    inv_mass = Math.min(inv_mass + inv_mass_recovery_rate, 1);
                    const ctx = {
                        inv_mass,
                        opts: spring,
                        settled: true,
                        dt: (now - last_time) * 60 / 1000
                    };
                    const next_value = tick_spring(ctx, last_value, value, target_value);
                    last_time = now;
                    last_value = value;
                    store.set(value = next_value);
                    if (ctx.settled) {
                        task = null;
                    }
                    return !ctx.settled;
                });
            }
            return new Promise(fulfil => {
                task.promise.then(() => {
                    if (token === current_token)
                        fulfil();
                });
            });
        }
        const spring = {
            set,
            update: (fn, opts) => set(fn(target_value, value), opts),
            subscribe: store.subscribe,
            stiffness,
            damping,
            precision
        };
        return spring;
    }

    /* node_modules\svelte-parallax\src\ParallaxLayer.svelte generated by Svelte v3.44.1 */
    const file$8 = "node_modules\\svelte-parallax\\src\\ParallaxLayer.svelte";

    function create_fragment$8(ctx) {
    	let div;
    	let div_style_value;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[9].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[8], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", "parallax-layer svelte-tti7b9");
    			attr_dev(div, "style", div_style_value = "" + /*style*/ ctx[0] + " height: " + /*height*/ ctx[1] + "px; -ms-transform: " + /*translate*/ ctx[2] + " -webkit-transform: " + /*translate*/ ctx[2] + " transform: " + /*translate*/ ctx[2] + "");
    			add_location(div, file$8, 57, 0, 1528);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 256)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[8],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[8])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[8], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*style, height, translate*/ 7 && div_style_value !== (div_style_value = "" + /*style*/ ctx[0] + " height: " + /*height*/ ctx[1] + "px; -ms-transform: " + /*translate*/ ctx[2] + " -webkit-transform: " + /*translate*/ ctx[2] + " transform: " + /*translate*/ ctx[2] + "")) {
    				attr_dev(div, "style", div_style_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let translate;
    	let $coord;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ParallaxLayer', slots, ['default']);
    	let { rate = 0.5 } = $$props;
    	let { offset = 0 } = $$props;
    	let { span = 1 } = $$props;
    	let { style = "" } = $$props;

    	// get context from Parallax
    	let { config, addLayer, removeLayer } = getContext(contextKey);

    	// spring store to hold changing scroll coordinate
    	const coord = spring(undefined, config);

    	validate_store(coord, 'coord');
    	component_subscribe($$self, coord, value => $$invalidate(7, $coord = value));

    	// layer height
    	let height;

    	const layer = {
    		setPosition: (scrollTop, innerHeight, disabled) => {
    			// amount to scroll before layer is at target position
    			const targetScroll = Math.floor(offset) * innerHeight;

    			// distance to target position
    			const distance = offset * innerHeight + targetScroll * rate;

    			const current = disabled
    			? offset * innerHeight
    			: -(scrollTop * rate) + distance;

    			coord.set(current, { hard: disabled });
    		},
    		setHeight: innerHeight => {
    			$$invalidate(1, height = span * innerHeight);
    		}
    	};

    	onMount(() => {
    		// register layer with parent
    		addLayer(layer);

    		return () => {
    			// clean up
    			removeLayer(layer);
    		};
    	});

    	const writable_props = ['rate', 'offset', 'span', 'style'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ParallaxLayer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('rate' in $$props) $$invalidate(4, rate = $$props.rate);
    		if ('offset' in $$props) $$invalidate(5, offset = $$props.offset);
    		if ('span' in $$props) $$invalidate(6, span = $$props.span);
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('$$scope' in $$props) $$invalidate(8, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		onMount,
    		spring,
    		contextKey,
    		rate,
    		offset,
    		span,
    		style,
    		config,
    		addLayer,
    		removeLayer,
    		coord,
    		height,
    		layer,
    		translate,
    		$coord
    	});

    	$$self.$inject_state = $$props => {
    		if ('rate' in $$props) $$invalidate(4, rate = $$props.rate);
    		if ('offset' in $$props) $$invalidate(5, offset = $$props.offset);
    		if ('span' in $$props) $$invalidate(6, span = $$props.span);
    		if ('style' in $$props) $$invalidate(0, style = $$props.style);
    		if ('config' in $$props) config = $$props.config;
    		if ('addLayer' in $$props) addLayer = $$props.addLayer;
    		if ('removeLayer' in $$props) removeLayer = $$props.removeLayer;
    		if ('height' in $$props) $$invalidate(1, height = $$props.height);
    		if ('translate' in $$props) $$invalidate(2, translate = $$props.translate);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$coord*/ 128) {
    			// translate layer according to coordinate
    			$$invalidate(2, translate = `translate3d(0, ${$coord}px, 0);`);
    		}
    	};

    	return [style, height, translate, coord, rate, offset, span, $coord, $$scope, slots];
    }

    class ParallaxLayer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, { rate: 4, offset: 5, span: 6, style: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ParallaxLayer",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get rate() {
    		throw new Error("<ParallaxLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set rate(value) {
    		throw new Error("<ParallaxLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get offset() {
    		throw new Error("<ParallaxLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set offset(value) {
    		throw new Error("<ParallaxLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get span() {
    		throw new Error("<ParallaxLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set span(value) {
    		throw new Error("<ParallaxLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<ParallaxLayer>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<ParallaxLayer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Parallax\ParallaxBackground.svelte generated by Svelte v3.44.1 */
    const file$7 = "src\\components\\Parallax\\ParallaxBackground.svelte";

    // (7:1) <ParallaxLayer offset=0  rate=1.7 span=2>
    function create_default_slot_9(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/Parallax/p0.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "header");
    			set_style(img, "width", "100%");
    			add_location(img, file$7, 7, 2, 194);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_9.name,
    		type: "slot",
    		source: "(7:1) <ParallaxLayer offset=0  rate=1.7 span=2>",
    		ctx
    	});

    	return block;
    }

    // (10:1) <ParallaxLayer offset=0  rate=1.55 span=2 >
    function create_default_slot_8(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/Parallax/p1.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "header");
    			set_style(img, "width", "100%");
    			add_location(img, file$7, 10, 2, 345);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_8.name,
    		type: "slot",
    		source: "(10:1) <ParallaxLayer offset=0  rate=1.55 span=2 >",
    		ctx
    	});

    	return block;
    }

    // (13:1) <ParallaxLayer offset=0  rate=1.4 span=2>
    function create_default_slot_7(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/Parallax/p2.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "header");
    			set_style(img, "width", "100%");
    			add_location(img, file$7, 13, 2, 493);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_7.name,
    		type: "slot",
    		source: "(13:1) <ParallaxLayer offset=0  rate=1.4 span=2>",
    		ctx
    	});

    	return block;
    }

    // (16:1) <ParallaxLayer offset=0  rate=1.25 span=2>
    function create_default_slot_6(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/Parallax/p3.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "header");
    			set_style(img, "width", "100%");
    			add_location(img, file$7, 16, 2, 642);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_6.name,
    		type: "slot",
    		source: "(16:1) <ParallaxLayer offset=0  rate=1.25 span=2>",
    		ctx
    	});

    	return block;
    }

    // (19:1) <ParallaxLayer offset=0  rate=1.10 span=2>
    function create_default_slot_5(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/Parallax/p4.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "header");
    			set_style(img, "width", "100%");
    			add_location(img, file$7, 19, 2, 791);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(19:1) <ParallaxLayer offset=0  rate=1.10 span=2>",
    		ctx
    	});

    	return block;
    }

    // (22:1) <ParallaxLayer offset=0  rate=1.0 span=2>
    function create_default_slot_4(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/Parallax/p5.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "header");
    			set_style(img, "width", "100%");
    			add_location(img, file$7, 22, 2, 939);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(22:1) <ParallaxLayer offset=0  rate=1.0 span=2>",
    		ctx
    	});

    	return block;
    }

    // (25:1) <ParallaxLayer offset=0  rate=0.9 span=2>
    function create_default_slot_3(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/Parallax/p6.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "header");
    			set_style(img, "width", "100%");
    			add_location(img, file$7, 25, 2, 1087);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(25:1) <ParallaxLayer offset=0  rate=0.9 span=2>",
    		ctx
    	});

    	return block;
    }

    // (28:1) <ParallaxLayer offset=0  rate=0.8 span=2>
    function create_default_slot_2(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/Parallax/p7.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "header");
    			set_style(img, "width", "100%");
    			add_location(img, file$7, 28, 2, 1235);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(28:1) <ParallaxLayer offset=0  rate=0.8 span=2>",
    		ctx
    	});

    	return block;
    }

    // (33:1) <ParallaxLayer offset=0.65 rate=1.2 >
    function create_default_slot_1(ctx) {
    	let img;
    	let img_src_value;

    	const block = {
    		c: function create() {
    			img = element("img");
    			if (!src_url_equal(img.src, img_src_value = "assets/img/hellothere.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			set_style(img, "width", "100%");
    			add_location(img, file$7, 33, 3, 1387);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, img, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(img);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(33:1) <ParallaxLayer offset=0.65 rate=1.2 >",
    		ctx
    	});

    	return block;
    }

    // (5:0) <Parallax sections=1.15 style="background-color: black;">
    function create_default_slot$1(ctx) {
    	let parallaxlayer0;
    	let t0;
    	let parallaxlayer1;
    	let t1;
    	let parallaxlayer2;
    	let t2;
    	let parallaxlayer3;
    	let t3;
    	let parallaxlayer4;
    	let t4;
    	let parallaxlayer5;
    	let t5;
    	let parallaxlayer6;
    	let t6;
    	let parallaxlayer7;
    	let t7;
    	let parallaxlayer8;
    	let current;

    	parallaxlayer0 = new ParallaxLayer({
    			props: {
    				offset: "0",
    				rate: "1.7",
    				span: "2",
    				$$slots: { default: [create_default_slot_9] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	parallaxlayer1 = new ParallaxLayer({
    			props: {
    				offset: "0",
    				rate: "1.55",
    				span: "2",
    				$$slots: { default: [create_default_slot_8] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	parallaxlayer2 = new ParallaxLayer({
    			props: {
    				offset: "0",
    				rate: "1.4",
    				span: "2",
    				$$slots: { default: [create_default_slot_7] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	parallaxlayer3 = new ParallaxLayer({
    			props: {
    				offset: "0",
    				rate: "1.25",
    				span: "2",
    				$$slots: { default: [create_default_slot_6] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	parallaxlayer4 = new ParallaxLayer({
    			props: {
    				offset: "0",
    				rate: "1.10",
    				span: "2",
    				$$slots: { default: [create_default_slot_5] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	parallaxlayer5 = new ParallaxLayer({
    			props: {
    				offset: "0",
    				rate: "1.0",
    				span: "2",
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	parallaxlayer6 = new ParallaxLayer({
    			props: {
    				offset: "0",
    				rate: "0.9",
    				span: "2",
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	parallaxlayer7 = new ParallaxLayer({
    			props: {
    				offset: "0",
    				rate: "0.8",
    				span: "2",
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	parallaxlayer8 = new ParallaxLayer({
    			props: {
    				offset: "0.65",
    				rate: "1.2",
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parallaxlayer0.$$.fragment);
    			t0 = space();
    			create_component(parallaxlayer1.$$.fragment);
    			t1 = space();
    			create_component(parallaxlayer2.$$.fragment);
    			t2 = space();
    			create_component(parallaxlayer3.$$.fragment);
    			t3 = space();
    			create_component(parallaxlayer4.$$.fragment);
    			t4 = space();
    			create_component(parallaxlayer5.$$.fragment);
    			t5 = space();
    			create_component(parallaxlayer6.$$.fragment);
    			t6 = space();
    			create_component(parallaxlayer7.$$.fragment);
    			t7 = space();
    			create_component(parallaxlayer8.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(parallaxlayer0, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(parallaxlayer1, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(parallaxlayer2, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(parallaxlayer3, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(parallaxlayer4, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(parallaxlayer5, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(parallaxlayer6, target, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(parallaxlayer7, target, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(parallaxlayer8, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const parallaxlayer0_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				parallaxlayer0_changes.$$scope = { dirty, ctx };
    			}

    			parallaxlayer0.$set(parallaxlayer0_changes);
    			const parallaxlayer1_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				parallaxlayer1_changes.$$scope = { dirty, ctx };
    			}

    			parallaxlayer1.$set(parallaxlayer1_changes);
    			const parallaxlayer2_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				parallaxlayer2_changes.$$scope = { dirty, ctx };
    			}

    			parallaxlayer2.$set(parallaxlayer2_changes);
    			const parallaxlayer3_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				parallaxlayer3_changes.$$scope = { dirty, ctx };
    			}

    			parallaxlayer3.$set(parallaxlayer3_changes);
    			const parallaxlayer4_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				parallaxlayer4_changes.$$scope = { dirty, ctx };
    			}

    			parallaxlayer4.$set(parallaxlayer4_changes);
    			const parallaxlayer5_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				parallaxlayer5_changes.$$scope = { dirty, ctx };
    			}

    			parallaxlayer5.$set(parallaxlayer5_changes);
    			const parallaxlayer6_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				parallaxlayer6_changes.$$scope = { dirty, ctx };
    			}

    			parallaxlayer6.$set(parallaxlayer6_changes);
    			const parallaxlayer7_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				parallaxlayer7_changes.$$scope = { dirty, ctx };
    			}

    			parallaxlayer7.$set(parallaxlayer7_changes);
    			const parallaxlayer8_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				parallaxlayer8_changes.$$scope = { dirty, ctx };
    			}

    			parallaxlayer8.$set(parallaxlayer8_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parallaxlayer0.$$.fragment, local);
    			transition_in(parallaxlayer1.$$.fragment, local);
    			transition_in(parallaxlayer2.$$.fragment, local);
    			transition_in(parallaxlayer3.$$.fragment, local);
    			transition_in(parallaxlayer4.$$.fragment, local);
    			transition_in(parallaxlayer5.$$.fragment, local);
    			transition_in(parallaxlayer6.$$.fragment, local);
    			transition_in(parallaxlayer7.$$.fragment, local);
    			transition_in(parallaxlayer8.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parallaxlayer0.$$.fragment, local);
    			transition_out(parallaxlayer1.$$.fragment, local);
    			transition_out(parallaxlayer2.$$.fragment, local);
    			transition_out(parallaxlayer3.$$.fragment, local);
    			transition_out(parallaxlayer4.$$.fragment, local);
    			transition_out(parallaxlayer5.$$.fragment, local);
    			transition_out(parallaxlayer6.$$.fragment, local);
    			transition_out(parallaxlayer7.$$.fragment, local);
    			transition_out(parallaxlayer8.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parallaxlayer0, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(parallaxlayer1, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(parallaxlayer2, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(parallaxlayer3, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(parallaxlayer4, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(parallaxlayer5, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(parallaxlayer6, detaching);
    			if (detaching) detach_dev(t6);
    			destroy_component(parallaxlayer7, detaching);
    			if (detaching) detach_dev(t7);
    			destroy_component(parallaxlayer8, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(5:0) <Parallax sections=1.15 style=\\\"background-color: black;\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let parallax;
    	let current;

    	parallax = new Parallax({
    			props: {
    				sections: "1.15",
    				style: "background-color: black;",
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(parallax.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(parallax, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const parallax_changes = {};

    			if (dirty & /*$$scope*/ 1) {
    				parallax_changes.$$scope = { dirty, ctx };
    			}

    			parallax.$set(parallax_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(parallax.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(parallax.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(parallax, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ParallaxBackground', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ParallaxBackground> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Parallax, ParallaxLayer });
    	return [];
    }

    class ParallaxBackground extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ParallaxBackground",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\components\Navbars\IndexNavbar.svelte generated by Svelte v3.44.1 */
    const file$6 = "src\\components\\Navbars\\IndexNavbar.svelte";

    function create_fragment$6(ctx) {
    	let nav;
    	let div2;
    	let div0;
    	let a0;
    	let t1;
    	let button0;
    	let i0;
    	let t2;
    	let div1;
    	let ul0;
    	let li0;
    	let a1;
    	let i1;
    	let t3;
    	let span0;
    	let t5;
    	let ul1;
    	let li1;
    	let a2;
    	let span1;
    	let t7;
    	let span2;
    	let t9;
    	let li2;
    	let button1;
    	let i2;
    	let t10;
    	let div1_class_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			nav = element("nav");
    			div2 = element("div");
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "Rui Melo";
    			t1 = space();
    			button0 = element("button");
    			i0 = element("i");
    			t2 = space();
    			div1 = element("div");
    			ul0 = element("ul");
    			li0 = element("li");
    			a1 = element("a");
    			i1 = element("i");
    			t3 = space();
    			span0 = element("span");
    			span0.textContent = "Github";
    			t5 = space();
    			ul1 = element("ul");
    			li1 = element("li");
    			a2 = element("a");
    			span1 = element("span");
    			span1.textContent = "??";
    			t7 = space();
    			span2 = element("span");
    			span2.textContent = "Linkedin";
    			t9 = space();
    			li2 = element("li");
    			button1 = element("button");
    			i2 = element("i");
    			t10 = text(" CV Download");
    			attr_dev(a0, "class", "text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase");
    			attr_dev(a0, "href", "https://www.linkedin.com/in/rui--melo/");
    			add_location(a0, file$6, 47, 10, 1898);
    			attr_dev(i0, "class", "fas fa-bars");
    			add_location(i0, file$6, 59, 12, 2446);
    			attr_dev(button0, "class", "cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none");
    			attr_dev(button0, "type", "button");
    			add_location(button0, file$6, 54, 10, 2168);
    			attr_dev(div0, "class", "w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start");
    			add_location(div0, file$6, 44, 8, 1769);
    			attr_dev(i1, "class", "text-blueGray-400 fab fa-github text-lg leading-lg");
    			add_location(i1, file$6, 73, 16, 3031);
    			attr_dev(span0, "class", "lg:hidden inline-block ml-2");
    			add_location(span0, file$6, 74, 16, 3113);
    			attr_dev(a1, "class", "hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold");
    			attr_dev(a1, "href", "https://github.com/rufimelo99");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$6, 68, 14, 2784);
    			attr_dev(li0, "class", "flex items-center");
    			add_location(li0, file$6, 67, 12, 2738);
    			attr_dev(ul0, "class", "flex flex-col lg:flex-row list-none mr-auto");
    			add_location(ul0, file$6, 66, 10, 2668);
    			attr_dev(span1, "class", "lg:hidden inline-block ml-2");
    			add_location(span1, file$6, 86, 16, 3647);
    			attr_dev(span2, "class", "lg:hidden inline-block ml-2");
    			add_location(span2, file$6, 87, 16, 3716);
    			attr_dev(a2, "class", "hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold");
    			attr_dev(a2, "href", "");
    			attr_dev(a2, "target", "_blank");
    			add_location(a2, file$6, 80, 14, 3355);
    			attr_dev(li1, "class", "flex items-center");
    			add_location(li1, file$6, 79, 12, 3309);
    			attr_dev(i2, "class", "fas fa-arrow-alt-circle-down");
    			add_location(i2, file$6, 99, 16, 4243);
    			attr_dev(button1, "class", "bg-red-400 text-white active:bg-red-500 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150");
    			attr_dev(button1, "type", "button");
    			add_location(button1, file$6, 94, 14, 3893);
    			attr_dev(li2, "class", "flex items-center");
    			add_location(li2, file$6, 93, 12, 3847);
    			attr_dev(ul1, "class", "flex flex-col lg:flex-row list-none lg:ml-auto");
    			add_location(ul1, file$6, 78, 10, 3236);
    			attr_dev(div1, "class", div1_class_value = "lg:flex flex-grow items-center " + (/*navbarOpen*/ ctx[0] ? 'block' : 'hidden'));
    			attr_dev(div1, "id", "example-navbar-warning");
    			add_location(div1, file$6, 62, 8, 2520);
    			attr_dev(div2, "class", "container px-4 mx-auto flex flex-wrap items-center justify-between");
    			add_location(div2, file$6, 41, 6, 1662);
    			attr_dev(nav, "class", "top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 navbar-expand-lg bg-gray-200 shadow");
    			add_location(nav, file$6, 39, 4, 1525);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, nav, anchor);
    			append_dev(nav, div2);
    			append_dev(div2, div0);
    			append_dev(div0, a0);
    			append_dev(div0, t1);
    			append_dev(div0, button0);
    			append_dev(button0, i0);
    			append_dev(div2, t2);
    			append_dev(div2, div1);
    			append_dev(div1, ul0);
    			append_dev(ul0, li0);
    			append_dev(li0, a1);
    			append_dev(a1, i1);
    			append_dev(a1, t3);
    			append_dev(a1, span0);
    			append_dev(div1, t5);
    			append_dev(div1, ul1);
    			append_dev(ul1, li1);
    			append_dev(li1, a2);
    			append_dev(a2, span1);
    			append_dev(a2, t7);
    			append_dev(a2, span2);
    			append_dev(ul1, t9);
    			append_dev(ul1, li2);
    			append_dev(li2, button1);
    			append_dev(button1, i2);
    			append_dev(button1, t10);

    			if (!mounted) {
    				dispose = [
    					action_destroyer(link.call(null, a0)),
    					listen_dev(button0, "click", /*setNavbarOpen*/ ctx[1], false, false, false),
    					listen_dev(button1, "click", DownloadFileCV, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*navbarOpen*/ 1 && div1_class_value !== (div1_class_value = "lg:flex flex-grow items-center " + (/*navbarOpen*/ ctx[0] ? 'block' : 'hidden'))) {
    				attr_dev(div1, "class", div1_class_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(nav);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function DownloadFileCV() {
    	var fileName = "RuiMeloCV2021.pdf";

    	//Set the File URL.
    	var url = "assets/Files/" + fileName;

    	//Create XMLHTTP Request.
    	var req = new XMLHttpRequest();

    	req.open("GET", url, true);
    	req.responseType = "blob";

    	req.onload = function () {
    		//Convert the Byte Data to BLOB object.
    		var blob = new Blob([req.response], { type: "application/octetstream" });

    		//Check the Browser type and download the File.
    		var isIE = !!document.documentMode;

    		if (isIE) {
    			window.navigator.msSaveBlob(blob, fileName);
    		} else {
    			var url = window.URL || window.webkitURL;
    			var link = url.createObjectURL(blob);
    			var a = document.createElement("a");
    			a.setAttribute("download", fileName);
    			a.setAttribute("href", link);
    			document.body.appendChild(a);
    			a.click();
    			document.body.removeChild(a);
    		}
    	};

    	req.send();
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('IndexNavbar', slots, []);
    	let navbarOpen = false;

    	function setNavbarOpen() {
    		$$invalidate(0, navbarOpen = !navbarOpen);
    	}
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<IndexNavbar> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		link,
    		navbarOpen,
    		setNavbarOpen,
    		DownloadFileCV
    	});

    	$$self.$inject_state = $$props => {
    		if ('navbarOpen' in $$props) $$invalidate(0, navbarOpen = $$props.navbarOpen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [navbarOpen, setNavbarOpen];
    }

    class IndexNavbar extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "IndexNavbar",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\components\Footers\Footer.svelte generated by Svelte v3.44.1 */

    const file$5 = "src\\components\\Footers\\Footer.svelte";

    function create_fragment$5(ctx) {
    	let footer;
    	let div0;
    	let svg;
    	let polygon;
    	let t0;
    	let div3;
    	let div2;
    	let div1;

    	const block = {
    		c: function create() {
    			footer = element("footer");
    			div0 = element("div");
    			svg = svg_element("svg");
    			polygon = svg_element("polygon");
    			t0 = space();
    			div3 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			div1.textContent = "Feel free to connect! I used a template from Creative Tim and art from FireCode and CodePen.";
    			attr_dev(polygon, "class", "text-blueGray-200 fill-current");
    			attr_dev(polygon, "points", "2560 0 2560 100 0 100");
    			add_location(polygon, file$5, 16, 8, 472);
    			attr_dev(svg, "class", "absolute bottom-0 overflow-hidden");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "preserveAspectRatio", "none");
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 2560 100");
    			attr_dev(svg, "x", "0");
    			attr_dev(svg, "y", "0");
    			add_location(svg, file$5, 7, 6, 233);
    			attr_dev(div0, "class", "bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20");
    			set_style(div0, "transform", "translateZ(0)");
    			add_location(div0, file$5, 3, 4, 61);
    			attr_dev(div1, "class", "text-sm text-blueGray-500 font-semibold pt-2");
    			add_location(div1, file$5, 25, 7, 741);
    			attr_dev(div2, "class", "flex flex-wrap text-center lg:text-left");
    			add_location(div2, file$5, 23, 6, 669);
    			attr_dev(div3, "class", "container mx-auto px-4");
    			add_location(div3, file$5, 22, 4, 625);
    			attr_dev(footer, "class", "relative bg-gray-200 pt-8 pb-6");
    			add_location(footer, file$5, 2, 2, 8);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, footer, anchor);
    			append_dev(footer, div0);
    			append_dev(div0, svg);
    			append_dev(svg, polygon);
    			append_dev(footer, t0);
    			append_dev(footer, div3);
    			append_dev(div3, div2);
    			append_dev(div2, div1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\components\PersonalDescription.svelte generated by Svelte v3.44.1 */

    const file$4 = "src\\components\\PersonalDescription.svelte";

    function create_fragment$4(ctx) {
    	let section;
    	let div5;
    	let div2;
    	let div1;
    	let h2;
    	let t1;
    	let p0;
    	let t3;
    	let p1;
    	let span0;
    	let t5;
    	let span1;
    	let t7;
    	let t8;
    	let p2;
    	let t9;
    	let span2;
    	let t11;
    	let span3;
    	let t13;
    	let span4;
    	let t15;
    	let span5;
    	let t17;
    	let t18;
    	let p3;
    	let t20;
    	let p4;
    	let t21;
    	let span6;
    	let t23;
    	let span7;
    	let t25;
    	let p5;
    	let t27;
    	let p6;
    	let span8;
    	let t29;
    	let div0;
    	let a0;
    	let t31;
    	let a1;
    	let t33;
    	let div4;
    	let img;
    	let img_src_value;
    	let t34;
    	let div3;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div5 = element("div");
    			div2 = element("div");
    			div1 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Hi!!";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "My name is Rui and I'm 22 years-old.";
    			t3 = space();
    			p1 = element("p");
    			span0 = element("span");
    			span0.textContent = "MSc Software Engineering";
    			t5 = text(" student at ");
    			span1 = element("span");
    			span1.textContent = "IST";
    			t7 = text(", Lisbon, Portugal.");
    			t8 = space();
    			p2 = element("p");
    			t9 = text("I'm very passionate about ");
    			span2 = element("span");
    			span2.textContent = "Artificial Intelligence";
    			t11 = text(" and Games Development.  \r\n            It all started in my Bachelor degree at ");
    			span3 = element("span");
    			span3.textContent = "UA";
    			t13 = text(", Aveiro, Portugal, where I was from ");
    			span4 = element("span");
    			span4.textContent = "2017";
    			t15 = text(" until ");
    			span5 = element("span");
    			span5.textContent = "2020";
    			t17 = text(".\r\n            To be more specific, it was when I had to develop the AI for the Bomberman Game. \r\n            In 2020, I decided to pursue a Master degree to learn more about these subjects.");
    			t18 = space();
    			p3 = element("p");
    			p3.textContent = "I feel like I am always eager to learn more and improve each day in everything I do from programming to playing sports.\r\n            I played basketball for 10 years and so, it is one of my passions. Music is another one. \r\n            Whatever I do, if i can, I enjoy having some music in the background. I also took some guitar lessons in my 12th grade.";
    			t20 = space();
    			p4 = element("p");
    			t21 = text("My focus at the moment is to learn more about ");
    			span6 = element("span");
    			span6.textContent = "Data Science";
    			t23 = text(" and ");
    			span7 = element("span");
    			span7.textContent = "Machine Learning";
    			t25 = space();
    			p5 = element("p");
    			p5.textContent = "Feel free to reach out:";
    			t27 = space();
    			p6 = element("p");
    			span8 = element("span");
    			span8.textContent = "rufimelo99@gmail.com";
    			t29 = space();
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "Linkedin";
    			t31 = space();
    			a1 = element("a");
    			a1.textContent = "Github";
    			t33 = space();
    			div4 = element("div");
    			img = element("img");
    			t34 = space();
    			div3 = element("div");
    			attr_dev(h2, "class", "font-semibold text-4xl text-gray-400");
    			add_location(h2, file$4, 4, 10, 273);
    			attr_dev(p0, "class", "mt-4 text-xl leading-relaxed text-gray-400");
    			add_location(p0, file$4, 7, 10, 369);
    			attr_dev(span0, "class", "text-gray-300");
    			add_location(span0, file$4, 11, 12, 565);
    			attr_dev(span1, "class", "text-gray-300");
    			add_location(span1, file$4, 11, 83, 636);
    			attr_dev(p1, "class", "mt-4 text-xl leading-relaxed text-gray-400");
    			add_location(p1, file$4, 10, 8, 497);
    			attr_dev(span2, "class", "text-gray-300");
    			add_location(span2, file$4, 14, 38, 813);
    			attr_dev(span3, "class", "text-gray-300");
    			add_location(span3, file$4, 15, 52, 950);
    			attr_dev(span4, "class", "text-gray-300");
    			add_location(span4, file$4, 15, 126, 1024);
    			attr_dev(span5, "class", "text-gray-300");
    			add_location(span5, file$4, 15, 172, 1070);
    			attr_dev(p2, "class", "mt-4 text-xl leading-relaxed text-gray-400");
    			add_location(p2, file$4, 13, 8, 719);
    			attr_dev(p3, "class", "mt-4 text-xl leading-relaxed text-gray-400");
    			add_location(p3, file$4, 19, 8, 1324);
    			attr_dev(span6, "class", "text-gray-300");
    			add_location(span6, file$4, 26, 58, 1898);
    			attr_dev(span7, "class", "text-gray-300");
    			add_location(span7, file$4, 26, 111, 1951);
    			attr_dev(p4, "class", "mt-4 text-xl leading-relaxed text-gray-400");
    			add_location(p4, file$4, 25, 8, 1784);
    			attr_dev(p5, "class", "mt-4 text-xl leading-relaxed text-gray-400");
    			add_location(p5, file$4, 29, 8, 2042);
    			attr_dev(span8, "class", "text-gray-300");
    			add_location(span8, file$4, 33, 12, 2202);
    			set_style(p6, "text-align", "center");
    			add_location(p6, file$4, 32, 8, 2157);
    			attr_dev(a0, "href", "https://www.linkedin.com/in/rui--melo/");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "class", "get-started text-gray-200 font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blue-700 hover:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150");
    			add_location(a0, file$4, 38, 12, 2320);
    			attr_dev(a1, "href", "https://github.com/rufimelo99");
    			attr_dev(a1, "class", "github-star ml-1 text-gray-200 font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-gray-700 hover:bg-gray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$4, 45, 12, 2715);
    			attr_dev(div0, "class", "mt-12");
    			add_location(div0, file$4, 37, 10, 2287);
    			attr_dev(div1, "class", "pt-32 sm:pt-0");
    			add_location(div1, file$4, 3, 8, 234);
    			attr_dev(div2, "class", "w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4");
    			add_location(div2, file$4, 2, 6, 169);
    			if (!src_url_equal(img.src, img_src_value = "assets/img/me.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "");
    			attr_dev(img, "class", "shadow-lg rounded-lg");
    			add_location(img, file$4, 56, 8, 3205);
    			add_location(div3, file$4, 57, 6, 3278);
    			attr_dev(div4, "class", "md:w-4/12 lg:w-6/12 xl:w-6/12 px-4 ");
    			add_location(div4, file$4, 55, 6, 3146);
    			attr_dev(div5, "class", "container mx-auto items-center flex flex-wrap-reverse");
    			add_location(div5, file$4, 1, 4, 94);
    			attr_dev(section, "class", "header relative pt-16 items-center bg-black flex h-screen max-h-860-px");
    			add_location(section, file$4, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div5);
    			append_dev(div5, div2);
    			append_dev(div2, div1);
    			append_dev(div1, h2);
    			append_dev(div1, t1);
    			append_dev(div1, p0);
    			append_dev(div1, t3);
    			append_dev(div1, p1);
    			append_dev(p1, span0);
    			append_dev(p1, t5);
    			append_dev(p1, span1);
    			append_dev(p1, t7);
    			append_dev(div1, t8);
    			append_dev(div1, p2);
    			append_dev(p2, t9);
    			append_dev(p2, span2);
    			append_dev(p2, t11);
    			append_dev(p2, span3);
    			append_dev(p2, t13);
    			append_dev(p2, span4);
    			append_dev(p2, t15);
    			append_dev(p2, span5);
    			append_dev(p2, t17);
    			append_dev(div1, t18);
    			append_dev(div1, p3);
    			append_dev(div1, t20);
    			append_dev(div1, p4);
    			append_dev(p4, t21);
    			append_dev(p4, span6);
    			append_dev(p4, t23);
    			append_dev(p4, span7);
    			append_dev(div1, t25);
    			append_dev(div1, p5);
    			append_dev(div1, t27);
    			append_dev(div1, p6);
    			append_dev(p6, span8);
    			append_dev(div1, t29);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			append_dev(div0, t31);
    			append_dev(div0, a1);
    			append_dev(div5, t33);
    			append_dev(div5, div4);
    			append_dev(div4, img);
    			append_dev(div4, t34);
    			append_dev(div4, div3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('PersonalDescription', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<PersonalDescription> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class PersonalDescription extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "PersonalDescription",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\components\Languages.svelte generated by Svelte v3.44.1 */

    const file$3 = "src\\components\\Languages.svelte";

    function create_fragment$3(ctx) {
    	let section;
    	let div0;
    	let svg;
    	let polygon;
    	let t0;
    	let div14;
    	let div13;
    	let div11;
    	let div10;
    	let div5;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t1;
    	let p0;
    	let t3;
    	let div2;
    	let img1;
    	let img1_src_value;
    	let t4;
    	let p1;
    	let t6;
    	let div3;
    	let img2;
    	let img2_src_value;
    	let t7;
    	let p2;
    	let t9;
    	let div4;
    	let img3;
    	let img3_src_value;
    	let t10;
    	let p3;
    	let t12;
    	let div9;
    	let div6;
    	let img4;
    	let img4_src_value;
    	let t13;
    	let p4;
    	let t15;
    	let div7;
    	let img5;
    	let img5_src_value;
    	let t16;
    	let p5;
    	let t18;
    	let div8;
    	let img6;
    	let img6_src_value;
    	let t19;
    	let p6;
    	let t21;
    	let div12;
    	let h30;
    	let t23;
    	let p7;
    	let t25;
    	let div16;
    	let div15;
    	let h31;
    	let t27;
    	let p8;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div0 = element("div");
    			svg = svg_element("svg");
    			polygon = svg_element("polygon");
    			t0 = space();
    			div14 = element("div");
    			div13 = element("div");
    			div11 = element("div");
    			div10 = element("div");
    			div5 = element("div");
    			div1 = element("div");
    			img0 = element("img");
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "Python";
    			t3 = space();
    			div2 = element("div");
    			img1 = element("img");
    			t4 = space();
    			p1 = element("p");
    			p1.textContent = "Java";
    			t6 = space();
    			div3 = element("div");
    			img2 = element("img");
    			t7 = space();
    			p2 = element("p");
    			p2.textContent = "C#";
    			t9 = space();
    			div4 = element("div");
    			img3 = element("img");
    			t10 = space();
    			p3 = element("p");
    			p3.textContent = "C";
    			t12 = space();
    			div9 = element("div");
    			div6 = element("div");
    			img4 = element("img");
    			t13 = space();
    			p4 = element("p");
    			p4.textContent = "JavaScript";
    			t15 = space();
    			div7 = element("div");
    			img5 = element("img");
    			t16 = space();
    			p5 = element("p");
    			p5.textContent = "C++";
    			t18 = space();
    			div8 = element("div");
    			img6 = element("img");
    			t19 = space();
    			p6 = element("p");
    			p6.textContent = "TypeScripts";
    			t21 = space();
    			div12 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Programming Languages";
    			t23 = space();
    			p7 = element("p");
    			p7.textContent = "Some programming languages that I have worked with.";
    			t25 = space();
    			div16 = element("div");
    			div15 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Projects";
    			t27 = space();
    			p8 = element("p");
    			p8.textContent = "Some projects that I have worked on during University";
    			attr_dev(polygon, "class", "text-slate-600 fill-current");
    			attr_dev(polygon, "points", "2560 0 2560 100 0 100");
    			add_location(polygon, file$3, 14, 8, 451);
    			attr_dev(svg, "class", "absolute bottom-0 overflow-hidden bg-black");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "preserveAspectRatio", "none");
    			attr_dev(svg, "version", "1.1");
    			attr_dev(svg, "viewBox", "0 0 2560 100");
    			attr_dev(svg, "x", "0");
    			attr_dev(svg, "y", "0");
    			add_location(svg, file$3, 5, 6, 203);
    			attr_dev(div0, "class", "-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20 ");
    			set_style(div0, "transform", "translateZ(0)");
    			add_location(div0, file$3, 1, 4, 66);
    			attr_dev(img0, "alt", "...");
    			attr_dev(img0, "class", "shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white ");
    			if (!src_url_equal(img0.src, img0_src_value = "assets/img/ProgrammingLanguages/python.png")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$3, 31, 18, 1013);
    			attr_dev(p0, "class", "text-lg text-white mt-4 font-semibold");
    			add_location(p0, file$3, 36, 18, 1250);
    			attr_dev(div1, "class", "bg-sky-400 shadow-lg rounded-lg text-center p-8 ");
    			add_location(div1, file$3, 30, 16, 931);
    			attr_dev(img1, "alt", "...");
    			attr_dev(img1, "class", "shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white");
    			if (!src_url_equal(img1.src, img1_src_value = "assets/img/ProgrammingLanguages/java.png")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$3, 41, 18, 1480);
    			attr_dev(p1, "class", "text-lg text-white mt-4 font-semibold");
    			add_location(p1, file$3, 46, 18, 1714);
    			attr_dev(div2, "class", "bg-violet-300 shadow-lg rounded-lg text-center p-8 mt-8");
    			add_location(div2, file$3, 40, 14, 1391);
    			attr_dev(img2, "alt", "...");
    			attr_dev(img2, "class", "shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white");
    			if (!src_url_equal(img2.src, img2_src_value = "assets/img/ProgrammingLanguages/Csharp.svg")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file$3, 53, 18, 1979);
    			attr_dev(p2, "class", "text-lg text-white mt-4 font-semibold");
    			add_location(p2, file$3, 58, 18, 2215);
    			attr_dev(div3, "class", "bg-indigo-300 shadow-lg rounded-lg text-center p-8 mt-8");
    			add_location(div3, file$3, 50, 14, 1853);
    			attr_dev(img3, "alt", "...");
    			attr_dev(img3, "class", "shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white");
    			if (!src_url_equal(img3.src, img3_src_value = "assets/img/ProgrammingLanguages/c.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file$3, 65, 18, 2478);
    			attr_dev(p3, "class", "text-lg text-white mt-4 font-semibold");
    			add_location(p3, file$3, 70, 18, 2709);
    			attr_dev(div4, "class", "bg-blue-300 shadow-lg rounded-lg text-center p-8 mt-8");
    			add_location(div4, file$3, 62, 16, 2354);
    			attr_dev(div5, "class", "my-4 w-full lg:w-6/12 px-4");
    			add_location(div5, file$3, 28, 12, 857);
    			attr_dev(img4, "alt", "...");
    			attr_dev(img4, "class", "shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white");
    			if (!src_url_equal(img4.src, img4_src_value = "assets/img/ProgrammingLanguages/js.png")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file$3, 78, 18, 3027);
    			attr_dev(p4, "class", "text-lg text-white mt-4 font-semibold");
    			add_location(p4, file$3, 83, 18, 3259);
    			attr_dev(div6, "class", "bg-sky-300 shadow-lg rounded-lg text-center p-8");
    			add_location(div6, file$3, 77, 16, 2946);
    			attr_dev(img5, "alt", "...");
    			attr_dev(img5, "class", "shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white");
    			if (!src_url_equal(img5.src, img5_src_value = "assets/img/ProgrammingLanguages/cplus.png")) attr_dev(img5, "src", img5_src_value);
    			add_location(img5, file$3, 90, 18, 3524);
    			attr_dev(p5, "class", "text-lg text-white mt-4 font-semibold");
    			add_location(p5, file$3, 95, 18, 3759);
    			attr_dev(div7, "class", "bg-sky-700 shadow-lg rounded-lg text-center p-8 mt-8");
    			add_location(div7, file$3, 89, 16, 3438);
    			attr_dev(img6, "alt", "...");
    			attr_dev(img6, "class", "shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white");
    			if (!src_url_equal(img6.src, img6_src_value = "assets/img/ProgrammingLanguages/ts.png")) attr_dev(img6, "src", img6_src_value);
    			add_location(img6, file$3, 103, 18, 4039);
    			attr_dev(p6, "class", "text-lg text-white mt-4 font-semibold");
    			add_location(p6, file$3, 108, 18, 4271);
    			attr_dev(div8, "class", "bg-blue-400 shadow-lg rounded-lg text-center p-8 mt-8");
    			add_location(div8, file$3, 100, 16, 3915);
    			attr_dev(div9, "class", "my-4 w-full lg:w-6/12 px-4 lg:mt-16");
    			add_location(div9, file$3, 75, 12, 2863);
    			attr_dev(div10, "class", "justify-center flex flex-wrap relative");
    			add_location(div10, file$3, 27, 10, 791);
    			attr_dev(div11, "class", "w-full md:w-6/12 px-4 mr-auto ml-auto mt-32");
    			add_location(div11, file$3, 26, 8, 722);
    			attr_dev(h30, "class", "text-3xl mb-2 font-semibold leading-normal text-gray-200");
    			add_location(h30, file$3, 118, 10, 4563);
    			attr_dev(p7, "class", "text-lg font-light leading-relaxed mt-4 mb-4 text-gray-200");
    			add_location(p7, file$3, 121, 10, 4696);
    			attr_dev(div12, "class", "w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48");
    			add_location(div12, file$3, 117, 8, 4485);
    			attr_dev(div13, "class", "flex flex-wrap items-center ");
    			add_location(div13, file$3, 25, 6, 670);
    			attr_dev(div14, "class", "container mx-auto overflow-hidden pb-20");
    			add_location(div14, file$3, 22, 4, 605);
    			attr_dev(h31, "class", "text-3xl mb-2 font-semibold leading-normal text-gray-200");
    			add_location(h31, file$3, 133, 8, 5040);
    			attr_dev(p8, "class", "text-lg font-light leading-relaxed mt-4 mb-4 text-gray-200");
    			add_location(p8, file$3, 136, 8, 5154);
    			attr_dev(div15, "class", "w-full md:w-6/12 px-12 md:px-4");
    			add_location(div15, file$3, 132, 6, 4986);
    			attr_dev(div16, "class", "justify-center text-center flex flex-wrap mt-24");
    			add_location(div16, file$3, 131, 4, 4917);
    			attr_dev(section, "class", "mt-48 md:mt-40 pb-40 relative bg-slate-600");
    			add_location(section, file$3, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, svg);
    			append_dev(svg, polygon);
    			append_dev(section, t0);
    			append_dev(section, div14);
    			append_dev(div14, div13);
    			append_dev(div13, div11);
    			append_dev(div11, div10);
    			append_dev(div10, div5);
    			append_dev(div5, div1);
    			append_dev(div1, img0);
    			append_dev(div1, t1);
    			append_dev(div1, p0);
    			append_dev(div5, t3);
    			append_dev(div5, div2);
    			append_dev(div2, img1);
    			append_dev(div2, t4);
    			append_dev(div2, p1);
    			append_dev(div5, t6);
    			append_dev(div5, div3);
    			append_dev(div3, img2);
    			append_dev(div3, t7);
    			append_dev(div3, p2);
    			append_dev(div5, t9);
    			append_dev(div5, div4);
    			append_dev(div4, img3);
    			append_dev(div4, t10);
    			append_dev(div4, p3);
    			append_dev(div10, t12);
    			append_dev(div10, div9);
    			append_dev(div9, div6);
    			append_dev(div6, img4);
    			append_dev(div6, t13);
    			append_dev(div6, p4);
    			append_dev(div9, t15);
    			append_dev(div9, div7);
    			append_dev(div7, img5);
    			append_dev(div7, t16);
    			append_dev(div7, p5);
    			append_dev(div9, t18);
    			append_dev(div9, div8);
    			append_dev(div8, img6);
    			append_dev(div8, t19);
    			append_dev(div8, p6);
    			append_dev(div13, t21);
    			append_dev(div13, div12);
    			append_dev(div12, h30);
    			append_dev(div12, t23);
    			append_dev(div12, p7);
    			append_dev(section, t25);
    			append_dev(section, div16);
    			append_dev(div16, div15);
    			append_dev(div15, h31);
    			append_dev(div15, t27);
    			append_dev(div15, p8);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Languages', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Languages> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Languages extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Languages",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\components\Projects.svelte generated by Svelte v3.44.1 */

    const file$2 = "src\\components\\Projects.svelte";

    function create_fragment$2(ctx) {
    	let section;
    	let div23;
    	let div22;
    	let div21;
    	let div20;
    	let div1;
    	let a0;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let p0;
    	let t2;
    	let p1;
    	let t4;
    	let p2;
    	let t6;
    	let p3;
    	let t8;
    	let div3;
    	let a1;
    	let div2;
    	let img1;
    	let img1_src_value;
    	let t9;
    	let p4;
    	let t11;
    	let p5;
    	let t13;
    	let p6;
    	let t15;
    	let p7;
    	let t17;
    	let div5;
    	let a2;
    	let div4;
    	let img2;
    	let img2_src_value;
    	let t18;
    	let p8;
    	let t20;
    	let p9;
    	let t22;
    	let p10;
    	let t24;
    	let p11;
    	let t26;
    	let div7;
    	let a3;
    	let div6;
    	let img3;
    	let img3_src_value;
    	let t27;
    	let p12;
    	let t29;
    	let p13;
    	let t31;
    	let p14;
    	let t33;
    	let p15;
    	let t35;
    	let div9;
    	let a4;
    	let div8;
    	let img4;
    	let img4_src_value;
    	let t36;
    	let p16;
    	let t38;
    	let p17;
    	let t40;
    	let p18;
    	let t42;
    	let p19;
    	let t44;
    	let div11;
    	let a5;
    	let div10;
    	let img5;
    	let img5_src_value;
    	let t45;
    	let p20;
    	let t47;
    	let p21;
    	let t49;
    	let p22;
    	let t51;
    	let p23;
    	let t53;
    	let div13;
    	let a6;
    	let div12;
    	let img6;
    	let img6_src_value;
    	let t54;
    	let p24;
    	let t56;
    	let p25;
    	let t58;
    	let p26;
    	let t60;
    	let p27;
    	let t62;
    	let div15;
    	let a7;
    	let div14;
    	let img7;
    	let img7_src_value;
    	let t63;
    	let p28;
    	let t65;
    	let p29;
    	let t67;
    	let p30;
    	let t69;
    	let p31;
    	let t71;
    	let div17;
    	let a8;
    	let div16;
    	let img8;
    	let img8_src_value;
    	let t72;
    	let p32;
    	let t74;
    	let p33;
    	let t76;
    	let p34;
    	let t78;
    	let p35;
    	let t80;
    	let div19;
    	let a9;
    	let div18;
    	let img9;
    	let img9_src_value;
    	let t81;
    	let p36;
    	let t83;
    	let p37;
    	let t85;
    	let p38;
    	let t87;
    	let p39;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div23 = element("div");
    			div22 = element("div");
    			div21 = element("div");
    			div20 = element("div");
    			div1 = element("div");
    			a0 = element("a");
    			div0 = element("div");
    			img0 = element("img");
    			t0 = space();
    			p0 = element("p");
    			p0.textContent = "Clipping Mask";
    			t2 = space();
    			p1 = element("p");
    			p1.textContent = "Unity";
    			t4 = space();
    			p2 = element("p");
    			p2.textContent = "2D Puzzle Platformer game for Game Design. 4 team members. \r\n                    Clipping Mask is a 2D Puzzle Platformer in which the player must use a combination of movement skills, alongside the “Clipping Mask” ability in order to progress in each level. \r\n                    This skill allows them to copy properties from their environment and paste them into others, effectively altering the landscape to their advantage.\r\n                    Properties are represented through the usage of colour schemes which taint the interactable object (i.e platforms, obstacles, enemies and so on) in the environment. \r\n                    For example, blue coloured objects allow the player to stand on them, whilst red coloured objects kill the player on collision.";
    			t6 = space();
    			p3 = element("p");
    			p3.textContent = "Oct 2021 – Nov 2021";
    			t8 = space();
    			div3 = element("div");
    			a1 = element("a");
    			div2 = element("div");
    			img1 = element("img");
    			t9 = space();
    			p4 = element("p");
    			p4.textContent = "Ultimatum Game in Complex Networks";
    			t11 = space();
    			p5 = element("p");
    			p5.textContent = "ipynb, NetworkX";
    			t13 = space();
    			p6 = element("p");
    			p6.textContent = "This project consists in studying and simulating Erdős–Rényi and Scale-Free Networks when playing the Ultimatum Game, which is a Socio-Economic Game. \r\n                    It was an individual project that allowed to understand how humans react to unfair situations and their willingness to accept those.";
    			t15 = space();
    			p7 = element("p");
    			p7.textContent = "Oct 2021 – Nov 2021";
    			t17 = space();
    			div5 = element("div");
    			a2 = element("a");
    			div4 = element("div");
    			img2 = element("img");
    			t18 = space();
    			p8 = element("p");
    			p8.textContent = "MNIST study";
    			t20 = space();
    			p9 = element("p");
    			p9.textContent = "ipynb, Python, TensorFlow (Keras)";
    			t22 = space();
    			p10 = element("p");
    			p10.textContent = "Use of different neural network architectures on the test set of the famous MNIST data set. Individual. I was responsible for creating the models and study their performance in order to create a paper";
    			t24 = space();
    			p11 = element("p");
    			p11.textContent = "May 2021 – Jun 2021";
    			t26 = space();
    			div7 = element("div");
    			a3 = element("a");
    			div6 = element("div");
    			img3 = element("img");
    			t27 = space();
    			p12 = element("p");
    			p12.textContent = "Captivity";
    			t29 = space();
    			p13 = element("p");
    			p13.textContent = "Unity, C#";
    			t31 = space();
    			p14 = element("p");
    			p14.textContent = "2D Game, co-op medieval adventure game for Windows PC with a bird’s-eye view perspective. 4 team members. I was responsible for structuring the project and implement modules to be used when constructing levels.";
    			t33 = space();
    			p15 = element("p");
    			p15.textContent = "Feb 2021 – Jun 2021";
    			t35 = space();
    			div9 = element("div");
    			a4 = element("a");
    			div8 = element("div");
    			img4 = element("img");
    			t36 = space();
    			p16 = element("p");
    			p16.textContent = "Self-driving Agents Adapting to a City";
    			t38 = space();
    			p17 = element("p");
    			p17.textContent = "Python, Pygame";
    			t40 = space();
    			p18 = element("p");
    			p18.textContent = "3D Simulation of a small City where uber/taxi drivers would learn where to position themselves better to maximize their profits. 3 team members. I was responsible for structuring the project, implement the overall backend and Q-learning reinforcement learning algorithm.";
    			t42 = space();
    			p19 = element("p");
    			p19.textContent = "Apr 2021 – May 2021";
    			t44 = space();
    			div11 = element("div");
    			a5 = element("a");
    			div10 = element("div");
    			img5 = element("img");
    			t45 = space();
    			p20 = element("p");
    			p20.textContent = "Ultimate Chess";
    			t47 = space();
    			p21 = element("p");
    			p21.textContent = "Unity, C#, ML-agents, TensorFlow";
    			t49 = space();
    			p22 = element("p");
    			p22.textContent = "3D Chess Game with Agents that would learn through reinforcement learning. In- dividual. I was responsible for structuring the project, create the functional game with menu and make use of ML-Agents package to train the agent by making it play against itself and visualize the process using TensorFlow";
    			t51 = space();
    			p23 = element("p");
    			p23.textContent = "Dec 2020 - Jan 2021";
    			t53 = space();
    			div13 = element("div");
    			a6 = element("a");
    			div12 = element("div");
    			img6 = element("img");
    			t54 = space();
    			p24 = element("p");
    			p24.textContent = "ML_SimpleJump";
    			t56 = space();
    			p25 = element("p");
    			p25.textContent = "Unity, C#, ML-agents, TensorFlow";
    			t58 = space();
    			p26 = element("p");
    			p26.textContent = "Small project that aimed to make a cube jump. It was done simply to learn the ML-agents package and develop the Ultimate Chess project";
    			t60 = space();
    			p27 = element("p");
    			p27.textContent = "Dec 2020";
    			t62 = space();
    			div15 = element("div");
    			a7 = element("a");
    			div14 = element("div");
    			img7 = element("img");
    			t63 = space();
    			p28 = element("p");
    			p28.textContent = "Lego Interactive";
    			t65 = space();
    			p29 = element("p");
    			p29.textContent = "OpenGL, C++";
    			t67 = space();
    			p30 = element("p");
    			p30.textContent = "Software able to simulate and interact with legos. 4 team members.";
    			t69 = space();
    			p31 = element("p");
    			p31.textContent = "Jan 2020 – Jun 2020";
    			t71 = space();
    			div17 = element("div");
    			a8 = element("a");
    			div16 = element("div");
    			img8 = element("img");
    			t72 = space();
    			p32 = element("p");
    			p32.textContent = "Compute Flow";
    			t74 = space();
    			p33 = element("p");
    			p33.textContent = "Svelte, TS, npm, electron";
    			t76 = space();
    			p34 = element("p");
    			p34.textContent = "Software able to provide an intuitive and interactive Interface for flow programming. 4 team members. I was responsible for creating the UI using Svelte and Typescript";
    			t78 = space();
    			p35 = element("p");
    			p35.textContent = "Jan 2020 – Jun 2020";
    			t80 = space();
    			div19 = element("div");
    			a9 = element("a");
    			div18 = element("div");
    			img9 = element("img");
    			t81 = space();
    			p36 = element("p");
    			p36.textContent = "Bomberman AI";
    			t83 = space();
    			p37 = element("p");
    			p37.textContent = "Pygame, python";
    			t85 = space();
    			p38 = element("p");
    			p38.textContent = "In this project, I was responsible for applying the A* algorithm and develop the decision-making for the player (bot)";
    			t87 = space();
    			p39 = element("p");
    			p39.textContent = "Nov 2019 – Dec 2019";
    			attr_dev(img0, "alt", "...");
    			attr_dev(img0, "class", "align-middle border-none max-w-full h-auto rounded-lg");
    			if (!src_url_equal(img0.src, img0_src_value = "assets/img/Projects/ClippingMask.JPG")) attr_dev(img0, "src", img0_src_value);
    			add_location(img0, file$2, 12, 18, 571);
    			attr_dev(p0, "class", "px-2 py-2 text-gray-300 font-bold");
    			add_location(p0, file$2, 17, 18, 795);
    			attr_dev(p1, "class", "px-2 py-2 text-gray-300 font-thin");
    			add_location(p1, file$2, 18, 18, 877);
    			attr_dev(p2, "class", "px-2 py-2 text-gray-300 leading-relaxed ");
    			add_location(p2, file$2, 19, 18, 951);
    			attr_dev(p3, "class", "px-2 py-2 text-gray-300 font-extrathin");
    			add_location(p3, file$2, 25, 18, 1810);
    			attr_dev(div0, "class", "hover:-mt-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150");
    			add_location(div0, file$2, 9, 16, 373);
    			attr_dev(a0, "href", "https://fenixds.itch.io/clipping-mask");
    			add_location(a0, file$2, 8, 14, 307);
    			attr_dev(div1, "class", "w-full lg:w-4/12 px-4");
    			add_location(div1, file$2, 6, 12, 254);
    			attr_dev(img1, "alt", "...");
    			attr_dev(img1, "class", "align-middle border-none max-w-full h-auto rounded-lg");
    			if (!src_url_equal(img1.src, img1_src_value = "assets/img/Projects/UltimatumGame.JPG")) attr_dev(img1, "src", img1_src_value);
    			add_location(img1, file$2, 37, 18, 2324);
    			attr_dev(p4, "class", "px-2 py-2 text-gray-300 font-bold");
    			add_location(p4, file$2, 42, 18, 2549);
    			attr_dev(p5, "class", "px-2 py-2 text-gray-300 font-thin");
    			add_location(p5, file$2, 43, 18, 2652);
    			attr_dev(p6, "class", "px-2 py-2 text-gray-300 leading-relaxed ");
    			add_location(p6, file$2, 44, 18, 2736);
    			attr_dev(p7, "class", "px-2 py-2 text-gray-300 font-extrathin");
    			add_location(p7, file$2, 46, 18, 3116);
    			attr_dev(div2, "class", "hover:-mt-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150");
    			add_location(div2, file$2, 34, 16, 2126);
    			attr_dev(a1, "href", "https://github.com/rufimelo99/UltimatumGame");
    			add_location(a1, file$2, 33, 14, 2054);
    			attr_dev(div3, "class", "w-full lg:w-4/12 px-4");
    			add_location(div3, file$2, 31, 12, 2001);
    			attr_dev(img2, "alt", "...");
    			attr_dev(img2, "class", "align-middle border-none max-w-full h-auto rounded-lg");
    			if (!src_url_equal(img2.src, img2_src_value = "assets/img/Projects/MNIST.JPG")) attr_dev(img2, "src", img2_src_value);
    			add_location(img2, file$2, 59, 18, 3634);
    			attr_dev(p8, "class", "px-2 py-2 text-gray-300 font-bold");
    			add_location(p8, file$2, 64, 18, 3851);
    			attr_dev(p9, "class", "px-2 py-2 text-gray-300 font-thin");
    			add_location(p9, file$2, 65, 18, 3931);
    			attr_dev(p10, "class", "px-2 py-2 text-gray-300 leading-relaxed ");
    			add_location(p10, file$2, 66, 18, 4033);
    			attr_dev(p11, "class", "px-2 py-2 text-gray-300 font-extrathin");
    			add_location(p11, file$2, 67, 18, 4309);
    			attr_dev(div4, "class", "hover:-mt-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150");
    			add_location(div4, file$2, 56, 16, 3436);
    			attr_dev(a2, "href", "https://github.com/rufimelo99/UltimateChess");
    			add_location(a2, file$2, 55, 14, 3364);
    			attr_dev(div5, "class", "w-full lg:w-4/12 px-4");
    			add_location(div5, file$2, 53, 12, 3311);
    			attr_dev(img3, "alt", "...");
    			attr_dev(img3, "class", "align-middle border-none max-w-full h-auto rounded-lg");
    			if (!src_url_equal(img3.src, img3_src_value = "assets/img/Projects/Captivity.png")) attr_dev(img3, "src", img3_src_value);
    			add_location(img3, file$2, 80, 18, 4821);
    			attr_dev(p12, "class", "px-2 py-2 text-gray-300 font-bold");
    			add_location(p12, file$2, 85, 18, 5042);
    			attr_dev(p13, "class", "px-2 py-2 text-gray-300 font-thin");
    			add_location(p13, file$2, 86, 18, 5120);
    			attr_dev(p14, "class", "px-2 py-2 text-gray-300 leading-relaxed ");
    			add_location(p14, file$2, 87, 18, 5198);
    			attr_dev(p15, "class", "px-2 py-2 text-gray-300 font-extrathin");
    			add_location(p15, file$2, 88, 18, 5484);
    			attr_dev(div6, "class", "hover:-mt-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150");
    			add_location(div6, file$2, 77, 16, 4623);
    			attr_dev(a3, "href", "https://github.com/rufimelo99/Captivity");
    			add_location(a3, file$2, 76, 14, 4555);
    			attr_dev(div7, "class", "w-full lg:w-4/12 px-4");
    			add_location(div7, file$2, 74, 12, 4502);
    			attr_dev(img4, "alt", "...");
    			attr_dev(img4, "class", "align-middle border-none max-w-full h-auto rounded-lg");
    			if (!src_url_equal(img4.src, img4_src_value = "assets/img/Projects/AASMA.JPG")) attr_dev(img4, "src", img4_src_value);
    			add_location(img4, file$2, 101, 18, 5994);
    			attr_dev(p16, "class", "px-2 py-2 text-gray-300 font-bold");
    			add_location(p16, file$2, 106, 18, 6211);
    			attr_dev(p17, "class", "px-2 py-2 text-gray-300 font-thin");
    			add_location(p17, file$2, 107, 18, 6318);
    			attr_dev(p18, "class", "px-2 py-2 text-gray-300 leading-relaxed ");
    			add_location(p18, file$2, 108, 18, 6401);
    			attr_dev(p19, "class", "px-2 py-2 text-gray-300 font-extrathin");
    			add_location(p19, file$2, 109, 18, 6747);
    			attr_dev(div8, "class", "hover:-mt-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150");
    			add_location(div8, file$2, 98, 16, 5796);
    			attr_dev(a4, "href", "https://github.com/rufimelo99/AASMA");
    			add_location(a4, file$2, 97, 14, 5732);
    			attr_dev(div9, "class", "w-full lg:w-4/12 px-4");
    			add_location(div9, file$2, 95, 12, 5679);
    			attr_dev(img5, "alt", "...");
    			attr_dev(img5, "class", "align-middle border-none max-w-full h-auto rounded-lg");
    			if (!src_url_equal(img5.src, img5_src_value = "assets/img/Projects/UltimateChess.png")) attr_dev(img5, "src", img5_src_value);
    			add_location(img5, file$2, 122, 18, 7265);
    			attr_dev(p20, "class", "px-2 py-2 text-gray-300 font-bold");
    			add_location(p20, file$2, 127, 18, 7490);
    			attr_dev(p21, "class", "px-2 py-2 text-gray-300 font-thin");
    			add_location(p21, file$2, 128, 18, 7573);
    			attr_dev(p22, "class", "px-2 py-2 text-gray-300 leading-relaxed ");
    			add_location(p22, file$2, 129, 18, 7674);
    			attr_dev(p23, "class", "px-2 py-2 text-gray-300 font-extrathin");
    			add_location(p23, file$2, 130, 18, 8051);
    			attr_dev(div10, "class", "hover:-mt-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150");
    			add_location(div10, file$2, 119, 16, 7067);
    			attr_dev(a5, "href", "https://github.com/rufimelo99/UltimateChess");
    			add_location(a5, file$2, 118, 14, 6995);
    			attr_dev(div11, "class", "w-full lg:w-4/12 px-4");
    			add_location(div11, file$2, 116, 12, 6942);
    			attr_dev(img6, "alt", "...");
    			attr_dev(img6, "class", "align-middle border-none max-w-full h-auto rounded-lg");
    			if (!src_url_equal(img6.src, img6_src_value = "assets/img/Projects/simpleJump.png")) attr_dev(img6, "src", img6_src_value);
    			add_location(img6, file$2, 143, 18, 8568);
    			attr_dev(p24, "class", "px-2 py-2 text-gray-300 font-bold");
    			add_location(p24, file$2, 148, 18, 8790);
    			attr_dev(p25, "class", "px-2 py-2 text-gray-300 font-thin");
    			add_location(p25, file$2, 149, 18, 8872);
    			attr_dev(p26, "class", "px-2 py-2 text-gray-300 leading-relaxed ");
    			add_location(p26, file$2, 150, 18, 8973);
    			attr_dev(p27, "class", "px-2 py-2 text-gray-300 font-extrathin");
    			add_location(p27, file$2, 151, 18, 9183);
    			attr_dev(div12, "class", "hover:-mt-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150");
    			add_location(div12, file$2, 140, 16, 8369);
    			attr_dev(a6, "href", "https://github.com/rufimelo99/ML_SimpleJump");
    			add_location(a6, file$2, 139, 14, 8297);
    			attr_dev(div13, "class", "w-full lg:w-4/12 px-4");
    			add_location(div13, file$2, 137, 12, 8244);
    			attr_dev(img7, "alt", "...");
    			attr_dev(img7, "class", "align-middle border-none max-w-full h-auto rounded-lg");
    			if (!src_url_equal(img7.src, img7_src_value = "assets/img/Projects/lego.JPG")) attr_dev(img7, "src", img7_src_value);
    			add_location(img7, file$2, 164, 18, 9693);
    			attr_dev(p28, "class", "px-2 py-2 text-gray-300 font-bold");
    			add_location(p28, file$2, 169, 18, 9909);
    			attr_dev(p29, "class", "px-2 py-2 text-gray-300 font-thin");
    			add_location(p29, file$2, 170, 18, 9994);
    			attr_dev(p30, "class", "px-2 py-2 text-gray-300 leading-relaxed ");
    			add_location(p30, file$2, 171, 18, 10074);
    			attr_dev(p31, "class", "px-2 py-2 text-gray-300 font-extrathin");
    			add_location(p31, file$2, 172, 18, 10216);
    			attr_dev(div14, "class", "hover:-mt-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150");
    			add_location(div14, file$2, 161, 16, 9494);
    			attr_dev(a7, "href", "https://github.com/rufimelo99/LegoInteractive");
    			add_location(a7, file$2, 160, 14, 9420);
    			attr_dev(div15, "class", "w-full lg:w-4/12 px-4");
    			add_location(div15, file$2, 158, 12, 9367);
    			attr_dev(img8, "alt", "...");
    			attr_dev(img8, "class", "align-middle border-none max-w-full h-auto rounded-lg");
    			if (!src_url_equal(img8.src, img8_src_value = "assets/img/Projects/Flow.JPG")) attr_dev(img8, "src", img8_src_value);
    			add_location(img8, file$2, 184, 18, 10734);
    			attr_dev(p32, "class", "px-2 py-2 text-gray-300 font-bold");
    			add_location(p32, file$2, 189, 18, 10950);
    			attr_dev(p33, "class", "px-2 py-2 text-gray-300 font-thin");
    			add_location(p33, file$2, 190, 18, 11031);
    			attr_dev(p34, "class", "px-2 py-2 text-gray-300 leading-relaxed ");
    			add_location(p34, file$2, 191, 18, 11125);
    			attr_dev(p35, "class", "px-2 py-2 text-gray-300 font-extrathin");
    			add_location(p35, file$2, 192, 18, 11368);
    			attr_dev(div16, "class", "hover:-mt-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150");
    			add_location(div16, file$2, 181, 16, 10535);
    			attr_dev(a8, "href", "https://github.com/DanielMoreiraPT/ComputeFlow");
    			add_location(a8, file$2, 180, 14, 10460);
    			attr_dev(div17, "class", "w-full lg:w-4/12 px-4");
    			add_location(div17, file$2, 178, 12, 10407);
    			attr_dev(img9, "alt", "...");
    			attr_dev(img9, "class", "align-middle border-none max-w-full h-auto rounded-lg");
    			if (!src_url_equal(img9.src, img9_src_value = "assets/img/Projects/bombermanAI.JPG")) attr_dev(img9, "src", img9_src_value);
    			add_location(img9, file$2, 205, 18, 11886);
    			attr_dev(p36, "class", "px-2 py-2 text-gray-300 font-bold");
    			add_location(p36, file$2, 210, 18, 12109);
    			attr_dev(p37, "class", "px-2 py-2 text-gray-300 font-thin");
    			add_location(p37, file$2, 211, 18, 12190);
    			attr_dev(p38, "class", "px-2 py-2 text-gray-300 leading-relaxed ");
    			add_location(p38, file$2, 212, 18, 12273);
    			attr_dev(p39, "class", "px-2 py-2 text-gray-300 font-extrathin");
    			add_location(p39, file$2, 213, 18, 12466);
    			attr_dev(div18, "class", "hover:-mt-4 relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150");
    			add_location(div18, file$2, 202, 16, 11687);
    			attr_dev(a9, "href", "https://github.com/rufimelo99/bomberman-ai");
    			add_location(a9, file$2, 201, 14, 11616);
    			attr_dev(div19, "class", "w-full lg:w-4/12 px-4");
    			add_location(div19, file$2, 199, 12, 11563);
    			attr_dev(div20, "class", "flex flex-wrap");
    			add_location(div20, file$2, 4, 10, 198);
    			attr_dev(div21, "class", "w-full lg:w-12/12 px-4 -mt-24");
    			add_location(div21, file$2, 3, 8, 143);
    			attr_dev(div22, "class", "justify-center flex flex-wrap");
    			add_location(div22, file$2, 2, 6, 90);
    			attr_dev(div23, "class", "container mx-auto");
    			add_location(div23, file$2, 1, 4, 51);
    			attr_dev(section, "class", "block relative z-1 bg-black");
    			add_location(section, file$2, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div23);
    			append_dev(div23, div22);
    			append_dev(div22, div21);
    			append_dev(div21, div20);
    			append_dev(div20, div1);
    			append_dev(div1, a0);
    			append_dev(a0, div0);
    			append_dev(div0, img0);
    			append_dev(div0, t0);
    			append_dev(div0, p0);
    			append_dev(div0, t2);
    			append_dev(div0, p1);
    			append_dev(div0, t4);
    			append_dev(div0, p2);
    			append_dev(div0, t6);
    			append_dev(div0, p3);
    			append_dev(div20, t8);
    			append_dev(div20, div3);
    			append_dev(div3, a1);
    			append_dev(a1, div2);
    			append_dev(div2, img1);
    			append_dev(div2, t9);
    			append_dev(div2, p4);
    			append_dev(div2, t11);
    			append_dev(div2, p5);
    			append_dev(div2, t13);
    			append_dev(div2, p6);
    			append_dev(div2, t15);
    			append_dev(div2, p7);
    			append_dev(div20, t17);
    			append_dev(div20, div5);
    			append_dev(div5, a2);
    			append_dev(a2, div4);
    			append_dev(div4, img2);
    			append_dev(div4, t18);
    			append_dev(div4, p8);
    			append_dev(div4, t20);
    			append_dev(div4, p9);
    			append_dev(div4, t22);
    			append_dev(div4, p10);
    			append_dev(div4, t24);
    			append_dev(div4, p11);
    			append_dev(div20, t26);
    			append_dev(div20, div7);
    			append_dev(div7, a3);
    			append_dev(a3, div6);
    			append_dev(div6, img3);
    			append_dev(div6, t27);
    			append_dev(div6, p12);
    			append_dev(div6, t29);
    			append_dev(div6, p13);
    			append_dev(div6, t31);
    			append_dev(div6, p14);
    			append_dev(div6, t33);
    			append_dev(div6, p15);
    			append_dev(div20, t35);
    			append_dev(div20, div9);
    			append_dev(div9, a4);
    			append_dev(a4, div8);
    			append_dev(div8, img4);
    			append_dev(div8, t36);
    			append_dev(div8, p16);
    			append_dev(div8, t38);
    			append_dev(div8, p17);
    			append_dev(div8, t40);
    			append_dev(div8, p18);
    			append_dev(div8, t42);
    			append_dev(div8, p19);
    			append_dev(div20, t44);
    			append_dev(div20, div11);
    			append_dev(div11, a5);
    			append_dev(a5, div10);
    			append_dev(div10, img5);
    			append_dev(div10, t45);
    			append_dev(div10, p20);
    			append_dev(div10, t47);
    			append_dev(div10, p21);
    			append_dev(div10, t49);
    			append_dev(div10, p22);
    			append_dev(div10, t51);
    			append_dev(div10, p23);
    			append_dev(div20, t53);
    			append_dev(div20, div13);
    			append_dev(div13, a6);
    			append_dev(a6, div12);
    			append_dev(div12, img6);
    			append_dev(div12, t54);
    			append_dev(div12, p24);
    			append_dev(div12, t56);
    			append_dev(div12, p25);
    			append_dev(div12, t58);
    			append_dev(div12, p26);
    			append_dev(div12, t60);
    			append_dev(div12, p27);
    			append_dev(div20, t62);
    			append_dev(div20, div15);
    			append_dev(div15, a7);
    			append_dev(a7, div14);
    			append_dev(div14, img7);
    			append_dev(div14, t63);
    			append_dev(div14, p28);
    			append_dev(div14, t65);
    			append_dev(div14, p29);
    			append_dev(div14, t67);
    			append_dev(div14, p30);
    			append_dev(div14, t69);
    			append_dev(div14, p31);
    			append_dev(div20, t71);
    			append_dev(div20, div17);
    			append_dev(div17, a8);
    			append_dev(a8, div16);
    			append_dev(div16, img8);
    			append_dev(div16, t72);
    			append_dev(div16, p32);
    			append_dev(div16, t74);
    			append_dev(div16, p33);
    			append_dev(div16, t76);
    			append_dev(div16, p34);
    			append_dev(div16, t78);
    			append_dev(div16, p35);
    			append_dev(div20, t80);
    			append_dev(div20, div19);
    			append_dev(div19, a9);
    			append_dev(a9, div18);
    			append_dev(div18, img9);
    			append_dev(div18, t81);
    			append_dev(div18, p36);
    			append_dev(div18, t83);
    			append_dev(div18, p37);
    			append_dev(div18, t85);
    			append_dev(div18, p38);
    			append_dev(div18, t87);
    			append_dev(div18, p39);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Projects', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Projects> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Projects extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Projects",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\views\MainPage.svelte generated by Svelte v3.44.1 */
    const file$1 = "src\\views\\MainPage.svelte";

    function create_fragment$1(ctx) {
    	let indexnavbar;
    	let t0;
    	let parallaxbackground;
    	let t1;
    	let section;
    	let personaldescription;
    	let t2;
    	let languages;
    	let t3;
    	let projects;
    	let t4;
    	let footer;
    	let current;
    	indexnavbar = new IndexNavbar({ $$inline: true });
    	parallaxbackground = new ParallaxBackground({ $$inline: true });
    	personaldescription = new PersonalDescription({ $$inline: true });
    	languages = new Languages({ $$inline: true });
    	projects = new Projects({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(indexnavbar.$$.fragment);
    			t0 = space();
    			create_component(parallaxbackground.$$.fragment);
    			t1 = space();
    			section = element("section");
    			create_component(personaldescription.$$.fragment);
    			t2 = space();
    			create_component(languages.$$.fragment);
    			t3 = space();
    			create_component(projects.$$.fragment);
    			t4 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(section, "class", "bg-black");
    			add_location(section, file$1, 20, 0, 792);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(indexnavbar, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(parallaxbackground, target, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, section, anchor);
    			mount_component(personaldescription, section, null);
    			append_dev(section, t2);
    			mount_component(languages, section, null);
    			append_dev(section, t3);
    			mount_component(projects, section, null);
    			insert_dev(target, t4, anchor);
    			mount_component(footer, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(indexnavbar.$$.fragment, local);
    			transition_in(parallaxbackground.$$.fragment, local);
    			transition_in(personaldescription.$$.fragment, local);
    			transition_in(languages.$$.fragment, local);
    			transition_in(projects.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(indexnavbar.$$.fragment, local);
    			transition_out(parallaxbackground.$$.fragment, local);
    			transition_out(personaldescription.$$.fragment, local);
    			transition_out(languages.$$.fragment, local);
    			transition_out(projects.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(indexnavbar, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(parallaxbackground, detaching);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(section);
    			destroy_component(personaldescription);
    			destroy_component(languages);
    			destroy_component(projects);
    			if (detaching) detach_dev(t4);
    			destroy_component(footer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('MainPage', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<MainPage> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		Link,
    		Parallax,
    		ParallaxLayer,
    		ParallaxBackground,
    		IndexNavbar,
    		Footer,
    		PersonalDescription,
    		Languages,
    		Projects
    	});

    	return [];
    }

    class MainPage extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MainPage",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.44.1 */
    const file = "src\\App.svelte";

    // (12:1) <Router url="{url}">
    function create_default_slot(ctx) {
    	let route;
    	let current;

    	route = new Route({
    			props: { path: "/", component: MainPage },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(route.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(route, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(route.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(route.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(route, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(12:1) <Router url=\\\"{url}\\\">",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let tailwindcss;
    	let t;
    	let main;
    	let router;
    	let current;
    	tailwindcss = new Tailwindcss({ $$inline: true });

    	router = new Router({
    			props: {
    				url: /*url*/ ctx[0],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(tailwindcss.$$.fragment);
    			t = space();
    			main = element("main");
    			create_component(router.$$.fragment);
    			add_location(main, file, 10, 0, 241);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(tailwindcss, target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(router, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const router_changes = {};
    			if (dirty & /*url*/ 1) router_changes.url = /*url*/ ctx[0];

    			if (dirty & /*$$scope*/ 4) {
    				router_changes.$$scope = { dirty, ctx };
    			}

    			router.$set(router_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tailwindcss.$$.fragment, local);
    			transition_in(router.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tailwindcss.$$.fragment, local);
    			transition_out(router.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tailwindcss, detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(main);
    			destroy_component(router);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { name } = $$props;
    	let { url = "" } = $$props;
    	const writable_props = ['name', 'url'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	$$self.$capture_state = () => ({
    		Router,
    		Route,
    		Tailwindcss,
    		MainPage,
    		name,
    		url
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('url' in $$props) $$invalidate(0, url = $$props.url);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [url, name];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { name: 1, url: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[1] === undefined && !('name' in props)) {
    			console.warn("<App> was created without expected prop 'name'");
    		}
    	}

    	get name() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get url() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set url(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
