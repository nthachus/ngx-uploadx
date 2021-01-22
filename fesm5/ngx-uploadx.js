import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeWhile } from 'rxjs/operators';
import { __read, __extends, __awaiter, __generator, __assign, __values } from 'tslib';
import { InjectionToken, Injectable, NgModule, ContentChild, Directive, HostBinding, HostListener, ElementRef, EventEmitter, Input, Output, Renderer2, Optional, Inject, NgZone, defineInjectable, inject } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
var ErrorType = {
    NotFound: 0,
    Auth: 1,
    Retryable: 2,
    Fatal: 3,
};
ErrorType[ErrorType.NotFound] = 'NotFound';
ErrorType[ErrorType.Auth] = 'Auth';
ErrorType[ErrorType.Retryable] = 'Retryable';
ErrorType[ErrorType.Fatal] = 'Fatal';
/** @type {?} */
var defaultRetryConfig = {
    maxAttempts: 8,
    shouldRestartCodes: [404, 410],
    authErrorCodes: [401],
    shouldRetryCodes: [423, 429],
    minDelay: 500,
    maxDelay: 50000
};
/**
 * Retryable ErrorHandler
 */
var  /**
 * Retryable ErrorHandler
 */
RetryHandler = /** @class */ (function () {
    function RetryHandler(configOptions) {
        if (configOptions === void 0) { configOptions = {}; }
        this.attempts = 0;
        this.cancel = (/**
         * @return {?}
         */
        function () { });
        this.config = Object.assign({}, defaultRetryConfig, configOptions);
    }
    /**
     * @param {?} code
     * @return {?}
     */
    RetryHandler.prototype.kind = /**
     * @param {?} code
     * @return {?}
     */
    function (code) {
        this.attempts++;
        if (this.attempts > this.config.maxAttempts) {
            return ErrorType.Fatal;
        }
        if (this.config.authErrorCodes.indexOf(code) !== -1) {
            return ErrorType.Auth;
        }
        if (this.config.shouldRestartCodes.indexOf(code) !== -1) {
            return ErrorType.NotFound;
        }
        if (code < 400 || code >= 500 || this.config.shouldRetryCodes.indexOf(code) !== -1) {
            return ErrorType.Retryable;
        }
        return ErrorType.Fatal;
    };
    /**
     * @return {?}
     */
    RetryHandler.prototype.wait = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var ms = Math.min(Math.pow(2, (this.attempts - 1)) * this.config.minDelay, this.config.maxDelay) +
            Math.floor(Math.random() * this.config.minDelay);
        /** @type {?} */
        var id;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            _this.cancel = (/**
             * @return {?}
             */
            function () {
                clearTimeout(id);
                resolve();
            });
            id = setTimeout(_this.cancel, ms);
        }));
    };
    /**
     * @return {?}
     */
    RetryHandler.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.attempts = 0;
    };
    return RetryHandler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @return {?}
 */
function createXhr() {
    return new XMLHttpRequest();
}
var UploadxAjax = /** @class */ (function () {
    function UploadxAjax(buildXhr) {
        var _this = this;
        this.buildXhr = buildXhr;
        this.request = (/**
         * @template T
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = _a.method, method = _b === void 0 ? 'GET' : _b, _c = _a.data, data = _c === void 0 ? null : _c, _d = _a.headers, headers = _d === void 0 ? {} : _d, url = _a.url, responseType = _a.responseType, canceler = _a.canceler, onUploadProgress = _a.onUploadProgress, _e = _a.withCredentials, withCredentials = _e === void 0 ? false : _e, _f = _a.validateStatus, validateStatus = _f === void 0 ? (/**
             * @param {?} status
             * @return {?}
             */
            function (status) { return status < 400 && status >= 200; }) : _f;
            /** @type {?} */
            var xhr = _this.buildXhr();
            canceler && (canceler.onCancel = (/**
             * @return {?}
             */
            function () { return xhr && xhr.readyState !== xhr.DONE && xhr.abort(); }));
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            function (resolve, reject) {
                xhr.open(method, url, true);
                withCredentials && (xhr.withCredentials = true);
                responseType && (xhr.responseType = responseType);
                responseType === 'json' && !headers.Accept && (headers.Accept = 'application/json');
                Object.keys(headers).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                function (key) { return xhr.setRequestHeader(key, String(headers[key])); }));
                xhr.upload.onprogress = onUploadProgress || null;
                xhr.onerror = xhr.ontimeout = xhr.onabort = (/**
                 * @param {?} evt
                 * @return {?}
                 */
                function (evt) {
                    return reject({ error: evt.type, url: url, method: method });
                });
                xhr.onload = (/**
                 * @return {?}
                 */
                function () {
                    /** @type {?} */
                    var response = {
                        data: _this.getResponseBody(xhr, responseType === 'json'),
                        status: xhr.status,
                        headers: _this.getResponseHeaders(xhr)
                    };
                    return validateStatus(response.status) ? resolve(response) : reject(response);
                });
                xhr.send(data);
            }));
        });
    }
    /**
     * @param {?} xhr
     * @return {?}
     */
    UploadxAjax.prototype.getResponseHeaders = /**
     * @param {?} xhr
     * @return {?}
     */
    function (xhr) {
        /** @type {?} */
        var rows = xhr.getAllResponseHeaders().split(/[\r\n]+/);
        return rows.reduce((/**
         * @param {?} headers
         * @param {?} current
         * @return {?}
         */
        function (headers, current) {
            var _a = __read(current.split(': '), 2), name = _a[0], value = _a[1];
            name && (headers[name.toLowerCase()] = value);
            return headers;
        }), {});
    };
    /**
     * @template T
     * @param {?} xhr
     * @param {?=} json
     * @return {?}
     */
    UploadxAjax.prototype.getResponseBody = /**
     * @template T
     * @param {?} xhr
     * @param {?=} json
     * @return {?}
     */
    function (xhr, json) {
        /** @type {?} */
        var body = 'response' in ((/** @type {?} */ (xhr))) ? xhr.response : xhr.responseText;
        if (body && json && typeof body === 'string') {
            try {
                body = JSON.parse(body);
            }
            catch (_a) { }
        }
        return body;
    };
    return UploadxAjax;
}());
/** @type {?} */
var UPLOADX_AJAX = new InjectionToken('uploadx.ajax', {
    factory: (/**
     * @return {?}
     */
    function () { return new UploadxAjax(createXhr); }),
    providedIn: 'root'
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Canceler = /** @class */ (function () {
    function Canceler() {
        this.onCancel = (/**
         * @return {?}
         */
        function () { });
    }
    /**
     * @return {?}
     */
    Canceler.prototype.cancel = /**
     * @return {?}
     */
    function () {
        this.onCancel();
        this.onCancel = (/**
         * @return {?}
         */
        function () { });
    };
    return Canceler;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var Store = /** @class */ (function () {
    function Store() {
        this.prefix = 'UPLOADX-V3.0-';
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    Store.prototype.set = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        localStorage.setItem(this.prefix + key, value);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Store.prototype.get = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return localStorage.getItem(this.prefix + key);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    Store.prototype.delete = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        localStorage.removeItem(this.prefix + key);
    };
    return Store;
}());
/** @type {?} */
var store = typeof window !== 'undefined' && 'localStorage' in window
    ? new Store()
    : new Map();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable: no-bitwise
/**
 * @param {?} base
 * @param {?} re
 * @return {?}
 */
function safeMatch(base, re) {
    return (base.match(re) || [])[0] || '';
}
/**
 * @param {?} url
 * @param {?} base
 * @return {?}
 */
function resolveUrl(url, base) {
    if (url.indexOf('https://') * url.indexOf('http://') === 0) {
        return url;
    }
    if (url.indexOf('//') === 0) {
        return safeMatch(base, /^(https?:)/) + url;
    }
    if (url.indexOf('/') === 0) {
        return safeMatch(base, /^(?:https?:)?(?:\/\/)?([^\/\?]+)/) + url;
    }
    return safeMatch(base, /^(?:https?:)?(?:\/\/)?([^\/\?]+)?(.*\/)/) + url;
}
/**
 * @template T, V
 * @param {?} value
 * @param {?} ref
 * @return {?}
 */
function unfunc(value, ref) {
    return value instanceof Function ? value(ref) : value;
}
/** @type {?} */
var pick = (/**
 * @template T, K
 * @param {?} obj
 * @param {?} whitelist
 * @return {?}
 */
function (obj, whitelist) {
    /** @type {?} */
    var result = (/** @type {?} */ ({}));
    whitelist.forEach((/**
     * @param {?} key
     * @return {?}
     */
    function (key) { return (result[key] = obj[key]); }));
    return result;
});
/**
 * @param {?=} x
 * @return {?}
 */
function isNumber(x) {
    return x === Number(x);
}
/**
 * 32-bit FNV-1a hash function
 * @param {?} str
 * @return {?}
 */
function createHash(str) {
    /** @type {?} */
    var hash = 2166136261;
    /** @type {?} */
    var len = str.length;
    for (var i = 0; i < len; i++) {
        hash ^= str.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0;
}
/** @type {?} */
var b64 = {
    encode: (/**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (/**
         * @param {?} match
         * @param {?} p1
         * @return {?}
         */
        function (match, p1) {
            return String.fromCharCode(Number.parseInt(p1, 16));
        })));
    }),
    decode: (/**
     * @param {?} str
     * @return {?}
     */
    function (str) {
        return decodeURIComponent(atob(str)
            .split('')
            .map((/**
         * @param {?} c
         * @return {?}
         */
        function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }))
            .join(''));
    }),
    serialize: (/**
     * @param {?} obj
     * @return {?}
     */
    function (obj) {
        return Object.keys(obj)
            .map((/**
         * @param {?} key
         * @return {?}
         */
        function (key) { return key + " " + b64.encode(String(obj[key])); }))
            .toString();
    }),
    parse: (/**
     * @param {?} encoded
     * @return {?}
     */
    function (encoded) {
        var e_1, _a;
        /** @type {?} */
        var kvPairs = encoded.split(',').map((/**
         * @param {?} kv
         * @return {?}
         */
        function (kv) { return kv.split(' '); }));
        /** @type {?} */
        var decoded = Object.create(null);
        try {
            for (var kvPairs_1 = __values(kvPairs), kvPairs_1_1 = kvPairs_1.next(); !kvPairs_1_1.done; kvPairs_1_1 = kvPairs_1.next()) {
                var _b = __read(kvPairs_1_1.value, 2), key = _b[0], value = _b[1];
                decoded[key] = b64.decode(value);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (kvPairs_1_1 && !kvPairs_1_1.done && (_a = kvPairs_1.return)) _a.call(kvPairs_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return decoded;
    })
};
/**
 * Adaptive chunk size
 */
var DynamicChunk = /** @class */ (function () {
    function DynamicChunk() {
    }
    /**
     * @param {?} throughput
     * @return {?}
     */
    DynamicChunk.scale = /**
     * @param {?} throughput
     * @return {?}
     */
    function (throughput) {
        /** @type {?} */
        var elapsedTime = DynamicChunk.size / throughput;
        if (elapsedTime < DynamicChunk.minChunkTime) {
            DynamicChunk.size = Math.min(DynamicChunk.maxSize, DynamicChunk.size * 2);
        }
        if (elapsedTime > DynamicChunk.maxChunkTime) {
            DynamicChunk.size = Math.max(DynamicChunk.minSize, DynamicChunk.size / 2);
        }
        return DynamicChunk.size;
    };
    /**
     * Maximum chunk size in bytes
     */
    DynamicChunk.maxSize = Number.MAX_SAFE_INTEGER;
    /**
     * Minimum chunk size in bytes
     */
    DynamicChunk.minSize = 1024 * 256;
    /**
     * Initial chunk size in bytes
     */
    DynamicChunk.size = 4096 * 256;
    DynamicChunk.minChunkTime = 2;
    DynamicChunk.maxChunkTime = 8;
    return DynamicChunk;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var actionToStatusMap = {
    pause: 'paused',
    upload: 'queue',
    cancel: 'cancelled'
};
/**
 * Uploader Base Class
 * @abstract
 */
var  /**
 * Uploader Base Class
 * @abstract
 */
Uploader = /** @class */ (function () {
    function Uploader(file, options, stateChange, ajax) {
        var _this = this;
        this.file = file;
        this.options = options;
        this.stateChange = stateChange;
        this.ajax = ajax;
        this.response = null;
        this.responseStatus = 0;
        this.responseHeaders = {};
        /**
         * Custom headers
         */
        this.headers = {};
        /**
         * Upload endpoint
         */
        this.endpoint = '/upload';
        /**
         * Byte offset within the whole file
         */
        this.offset = 0;
        this.canceler = new Canceler();
        this._url = '';
        /**
         * Set auth token cache
         */
        this.updateToken = (/**
         * @return {?}
         */
        function () { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, unfunc(this.token || '', this.responseStatus)];
                    case 1:
                        _a._token = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        this.cleanup = (/**
         * @return {?}
         */
        function () { return store.delete(_this.uploadId); });
        this.retry = new RetryHandler(options.retryConfig);
        this.name = file.name;
        this.size = file.size;
        this.metadata = {
            name: file.name,
            mimeType: file.type || 'application/octet-stream',
            size: file.size,
            lastModified: file.lastModified || ((/** @type {?} */ (file))).lastModifiedDate.getTime()
        };
        this.chunkSize = options.chunkSize || this.size;
        this._prerequest = options.prerequest || ((/**
         * @param {?} req
         * @return {?}
         */
        function (req) { return req; }));
        this._authorize = options.authorize || ((/**
         * @param {?} req
         * @return {?}
         */
        function (req) { return req; }));
        this.configure(options);
    }
    Object.defineProperty(Uploader.prototype, "url", {
        get: /**
         * @return {?}
         */
        function () {
            return this._url || store.get(this.uploadId) || '';
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._url !== value && store.set(this.uploadId, value);
            this._url = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Uploader.prototype, "status", {
        get: /**
         * @return {?}
         */
        function () {
            return this._status;
        },
        set: /**
         * @param {?} s
         * @return {?}
         */
        function (s) {
            if (this._status === 'cancelled' || (this._status === 'complete' && s !== 'cancelled')) {
                return;
            }
            if (s !== this._status) {
                this.status === 'retry' && this.retry.cancel();
                this._status = s;
                s === 'paused' && this.abort();
                ['cancelled', 'complete', 'error'].indexOf(s) !== -1 && this.cleanup();
                s === 'cancelled' ? this.cancel() : this.stateChange(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Configure uploader
     */
    /**
     * Configure uploader
     * @param {?} __0
     * @return {?}
     */
    Uploader.prototype.configure = /**
     * Configure uploader
     * @param {?} __0
     * @return {?}
     */
    function (_a) {
        var metadata = _a.metadata, headers = _a.headers, token = _a.token, endpoint = _a.endpoint, action = _a.action;
        endpoint && (this.endpoint = endpoint);
        token && (this.token = token);
        metadata && Object.assign(this.metadata, unfunc(metadata, this.file));
        headers && Object.assign(this.headers, unfunc(headers, this.file));
        action && (this.status = actionToStatusMap[action]);
    };
    /**
     * Starts uploading
     */
    /**
     * Starts uploading
     * @return {?}
     */
    Uploader.prototype.upload = /**
     * Starts uploading
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, e_1, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        this._status = 'uploading';
                        this.startTime = new Date().getTime();
                        return [4 /*yield*/, this.updateToken()];
                    case 1:
                        _f.sent();
                        _f.label = 2;
                    case 2:
                        if (!(this.status === 'uploading' || this.status === 'retry')) return [3 /*break*/, 19];
                        this.status = 'uploading';
                        _f.label = 3;
                    case 3:
                        _f.trys.push([3, 10, , 18]);
                        _a = this;
                        _b = this.url;
                        if (_b) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getFileUrl()];
                    case 4:
                        _b = (_f.sent());
                        _f.label = 5;
                    case 5:
                        _a.url = _b;
                        _c = this;
                        if (!isNumber(this.offset)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.sendFileContent()];
                    case 6:
                        _d = _f.sent();
                        return [3 /*break*/, 9];
                    case 7: return [4 /*yield*/, this.getOffset()];
                    case 8:
                        _d = _f.sent();
                        _f.label = 9;
                    case 9:
                        _c.offset = _d;
                        this.retry.reset();
                        if (this.offset === this.size) {
                            this.remaining = 0;
                            this.progress = 100;
                            this.status = 'complete';
                        }
                        return [3 /*break*/, 18];
                    case 10:
                        e_1 = _f.sent();
                        e_1 instanceof Error && console.error(e_1);
                        if (this.status !== 'uploading') {
                            return [2 /*return*/];
                        }
                        _e = this.retry.kind(this.responseStatus);
                        switch (_e) {
                            case ErrorType.Fatal: return [3 /*break*/, 11];
                            case ErrorType.NotFound: return [3 /*break*/, 12];
                            case ErrorType.Auth: return [3 /*break*/, 13];
                        }
                        return [3 /*break*/, 15];
                    case 11:
                        this.status = 'error';
                        return [2 /*return*/];
                    case 12:
                        this.url = '';
                        return [3 /*break*/, 17];
                    case 13: return [4 /*yield*/, this.updateToken()];
                    case 14:
                        _f.sent();
                        return [3 /*break*/, 17];
                    case 15:
                        this.responseStatus >= 400 && (this.offset = undefined);
                        this.status = 'retry';
                        return [4 /*yield*/, this.retry.wait()];
                    case 16:
                        _f.sent();
                        _f.label = 17;
                    case 17: return [3 /*break*/, 18];
                    case 18: return [3 /*break*/, 2];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Performs http requests
     */
    /**
     * Performs http requests
     * @param {?} requestOptions
     * @return {?}
     */
    Uploader.prototype.request = /**
     * Performs http requests
     * @param {?} requestOptions
     * @return {?}
     */
    function (requestOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var req, _a, _b, body, headers, method, _c, url, ajaxRequestConfig, response;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.responseStatus = 0;
                        this.response = null;
                        this.responseHeaders = {};
                        req = {
                            body: requestOptions.body || null,
                            canceler: this.canceler,
                            headers: __assign({}, this.headers, requestOptions.headers),
                            method: requestOptions.method || 'GET',
                            url: requestOptions.url || this.url
                        };
                        return [4 /*yield*/, this._authorize(req, this._token)];
                    case 1:
                        req = _d.sent();
                        return [4 /*yield*/, this._prerequest(req)];
                    case 2:
                        _a = (_d.sent()) || req, _b = _a.body, body = _b === void 0 ? null : _b, headers = _a.headers, method = _a.method, _c = _a.url, url = _c === void 0 ? req.url : _c;
                        ajaxRequestConfig = {
                            method: method,
                            headers: __assign({}, req.headers, headers),
                            url: url,
                            data: body,
                            responseType: this.responseType,
                            withCredentials: !!this.options.withCredentials,
                            canceler: this.canceler,
                            validateStatus: (/**
                             * @return {?}
                             */
                            function () { return true; })
                        };
                        if (body && typeof body !== 'string') {
                            ajaxRequestConfig.onUploadProgress = this.onProgress();
                        }
                        return [4 /*yield*/, this.ajax.request(ajaxRequestConfig)];
                    case 3:
                        response = _d.sent();
                        this.response = response.data;
                        this.responseHeaders = response.headers;
                        this.responseStatus = response.status;
                        if (response.status >= 400) {
                            return [2 /*return*/, Promise.reject()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @protected
     * @return {?}
     */
    Uploader.prototype.abort = /**
     * @protected
     * @return {?}
     */
    function () {
        this.offset = undefined;
        this.canceler.cancel();
    };
    /**
     * @protected
     * @return {?}
     */
    Uploader.prototype.cancel = /**
     * @protected
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.abort();
                        if (!this.url) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.request({ method: 'DELETE' }).catch((/**
                             * @return {?}
                             */
                            function () { }))];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.stateChange(this);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the value from the response
     */
    /**
     * Gets the value from the response
     * @protected
     * @param {?} key
     * @return {?}
     */
    Uploader.prototype.getValueFromResponse = /**
     * Gets the value from the response
     * @protected
     * @param {?} key
     * @return {?}
     */
    function (key) {
        return this.responseHeaders[key.toLowerCase()] || null;
    };
    /**
     * @protected
     * @return {?}
     */
    Uploader.prototype.getChunk = /**
     * @protected
     * @return {?}
     */
    function () {
        this.chunkSize = isNumber(this.options.chunkSize) ? this.chunkSize : DynamicChunk.size;
        /** @type {?} */
        var start = this.offset || 0;
        /** @type {?} */
        var end = Math.min(start + this.chunkSize, this.size);
        /** @type {?} */
        var body = this.file.slice(this.offset, end);
        return { start: start, end: end, body: body };
    };
    /**
     * @private
     * @return {?}
     */
    Uploader.prototype.onProgress = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var throttle;
        return (/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var loaded = _a.loaded;
            /** @type {?} */
            var now = new Date().getTime();
            /** @type {?} */
            var uploaded = ((/** @type {?} */ (_this.offset))) + loaded;
            /** @type {?} */
            var elapsedTime = (now - _this.startTime) / 1000;
            _this.speed = Math.round(uploaded / elapsedTime);
            DynamicChunk.scale(_this.speed);
            if (!throttle) {
                throttle = setTimeout((/**
                 * @return {?}
                 */
                function () { return (throttle = undefined); }), 500);
                _this.progress = +((uploaded / _this.size) * 100).toFixed(2);
                _this.remaining = Math.ceil((_this.size - uploaded) / _this.speed);
                _this.stateChange(_this);
            }
        });
    };
    return Uploader;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Implements tus resumable upload protocol
 *
 * {\@link https://github.com/tus/tus-resumable-upload-protocol/blob/master/protocol.md|Github}
 */
var  /**
 * Implements tus resumable upload protocol
 *
 * {\@link https://github.com/tus/tus-resumable-upload-protocol/blob/master/protocol.md|Github}
 */
Tus = /** @class */ (function (_super) {
    __extends(Tus, _super);
    function Tus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.headers = { 'Tus-Resumable': '1.0.0' };
        return _this;
    }
    /**
     * @return {?}
     */
    Tus.prototype.getFileUrl = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var encodedMetaData, headers, location;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encodedMetaData = b64.serialize(this.metadata);
                        headers = {
                            'Upload-Length': "" + this.size,
                            'Upload-Metadata': "" + encodedMetaData
                        };
                        return [4 /*yield*/, this.request({ method: 'POST', url: this.endpoint, headers: headers })];
                    case 1:
                        _a.sent();
                        location = this.getValueFromResponse('location');
                        if (!location) {
                            throw new Error('Invalid or missing Location header');
                        }
                        this.offset = this.responseStatus === 201 ? 0 : undefined;
                        return [2 /*return*/, resolveUrl(location, this.endpoint)];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    Tus.prototype.sendFileContent = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = this.getChunk().body;
                        headers = {
                            'Content-Type': 'application/offset+octet-stream',
                            'Upload-Offset': "" + this.offset
                        };
                        return [4 /*yield*/, this.request({ method: 'PATCH', body: body, headers: headers })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getOffsetFromResponse()];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    Tus.prototype.getOffset = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({ method: 'HEAD' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getOffsetFromResponse()];
                }
            });
        });
    };
    /**
     * @protected
     * @return {?}
     */
    Tus.prototype.getOffsetFromResponse = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var offsetStr = this.getValueFromResponse('Upload-Offset');
        return offsetStr ? parseInt(offsetStr, 10) : undefined;
    };
    return Tus;
}(Uploader));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Implements XHR/CORS Resumable Upload
 *
 * {\@link https://github.com/kukhariev/node-uploadx/blob/master/proto.md|Github}
 * @see {\@link https://developers.google.com/drive/api/v3/manage-uploads#resumable|Google Drive API documentation}
 */
var  /**
 * Implements XHR/CORS Resumable Upload
 *
 * {\@link https://github.com/kukhariev/node-uploadx/blob/master/proto.md|Github}
 * @see {\@link https://developers.google.com/drive/api/v3/manage-uploads#resumable|Google Drive API documentation}
 */
UploaderX = /** @class */ (function (_super) {
    __extends(UploaderX, _super);
    function UploaderX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.responseType = (/** @type {?} */ ('json'));
        return _this;
    }
    /**
     * @return {?}
     */
    UploaderX.prototype.getFileUrl = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers, location;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            'Content-Type': 'application/json; charset=utf-8',
                            'X-Upload-Content-Length': this.size.toString(),
                            'X-Upload-Content-Type': this.file.type || 'application/octet-stream'
                        };
                        return [4 /*yield*/, this.request({
                                method: 'POST',
                                body: JSON.stringify(this.metadata),
                                url: this.endpoint,
                                headers: headers
                            })];
                    case 1:
                        _a.sent();
                        location = this.getValueFromResponse('location');
                        if (!location) {
                            throw new Error('Invalid or missing Location header');
                        }
                        this.offset = this.responseStatus === 201 ? 0 : undefined;
                        return [2 /*return*/, resolveUrl(location, this.endpoint)];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    UploaderX.prototype.sendFileContent = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, end, body, headers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getChunk(), end = _a.end, body = _a.body;
                        headers = {
                            'Content-Type': 'application/octet-stream',
                            'Content-Range': "bytes " + this.offset + "-" + (end - 1) + "/" + this.size
                        };
                        return [4 /*yield*/, this.request({ method: 'PUT', body: body, headers: headers })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, this.getOffsetFromResponse()];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    UploaderX.prototype.getOffset = /**
     * @return {?}
     */
    function () {
        return __awaiter(this, void 0, void 0, function () {
            var headers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            'Content-Type': 'application/octet-stream',
                            'Content-Range': "bytes */" + this.size
                        };
                        return [4 /*yield*/, this.request({ method: 'PUT', headers: headers })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getOffsetFromResponse()];
                }
            });
        });
    };
    /**
     * @protected
     * @return {?}
     */
    UploaderX.prototype.getOffsetFromResponse = /**
     * @protected
     * @return {?}
     */
    function () {
        if (this.responseStatus > 201) {
            /** @type {?} */
            var range = this.getValueFromResponse('Range');
            return range ? getRangeEnd(range) + 1 : undefined;
        }
        return this.size;
    };
    return UploaderX;
}(Uploader));
/**
 * @param {?=} range
 * @return {?}
 */
function getRangeEnd(range) {
    if (range === void 0) { range = ''; }
    /** @type {?} */
    var end = parseInt(range.split(/-/)[1], 10);
    return end >= 0 ? end : -1;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ɵ0 = /**
 * @param {?} req
 * @param {?} token
 * @return {?}
 */
function (req, token) {
    token && (req.headers.Authorization = "Bearer " + token);
    return req;
};
/** @type {?} */
var defaultOptions = {
    endpoint: '/upload',
    autoUpload: true,
    concurrency: 2,
    uploaderClass: UploaderX,
    authorize: (ɵ0)
};
/** @type {?} */
var UPLOADX_FACTORY_OPTIONS = new InjectionToken('uploadx.factory.options', { providedIn: 'root', factory: (/**
     * @return {?}
     */
    function () { return defaultOptions; }) });
/** @type {?} */
var UPLOADX_OPTIONS = new InjectionToken('uploadx.options');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var IdService = /** @class */ (function () {
    function IdService() {
    }
    /**
     * @param {?} uploader
     * @return {?}
     */
    IdService.prototype.generateId = /**
     * @param {?} uploader
     * @return {?}
     */
    function (uploader) {
        /** @type {?} */
        var print = JSON.stringify(__assign({}, uploader.metadata, { type: uploader.constructor.name, endpoint: uploader.endpoint }));
        return createHash(print).toString(16);
    };
    IdService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ IdService.ngInjectableDef = defineInjectable({ factory: function IdService_Factory() { return new IdService(); }, token: IdService, providedIn: "root" });
    return IdService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var stateKeys = [
    'file',
    'name',
    'progress',
    'remaining',
    'response',
    'responseHeaders',
    'responseStatus',
    'size',
    'speed',
    'status',
    'uploadId',
    'url'
];
/** @type {?} */
var DUE_TIME = 5;
var UploadxService = /** @class */ (function () {
    function UploadxService(options, defaults, ajax, ngZone, idService) {
        var _this = this;
        this.ajax = ajax;
        this.ngZone = ngZone;
        this.idService = idService;
        /**
         * Upload Queue
         */
        this.queue = [];
        this.eventsStream = new Subject();
        this.subs = [];
        this.stateChange = (/**
         * @param {?} evt
         * @return {?}
         */
        function (evt) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.eventsStream.next(pick(evt, stateKeys)); }));
            if (evt.status !== 'uploading' && evt.status !== 'added') {
                _this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () { return setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.processQueue(); })); }));
            }
        });
        this.options = Object.assign({}, defaults, options);
        if (typeof window !== 'undefined') {
            this.subs.push(fromEvent(window, 'online').subscribe((/**
             * @return {?}
             */
            function () { return _this.control({ action: 'upload' }); })), fromEvent(window, 'offline').subscribe((/**
             * @return {?}
             */
            function () { return _this.control({ action: 'pause' }); })));
        }
    }
    Object.defineProperty(UploadxService.prototype, "events", {
        /** Upload status events */
        get: /**
         * Upload status events
         * @return {?}
         */
        function () {
            return this.eventsStream.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes service
     * @param options global module options
     * @returns Observable that emits a new value on progress or status changes
     */
    /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits a new value on progress or status changes
     */
    UploadxService.prototype.init = /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits a new value on progress or status changes
     */
    function (options) {
        if (options === void 0) { options = {}; }
        Object.assign(this.options, options);
        return this.events;
    };
    /**
     * Initializes service
     * @param options global module options
     * @returns Observable that emits the current array of uploaders
     */
    /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits the current array of uploaders
     */
    UploadxService.prototype.connect = /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits the current array of uploaders
     */
    function (options) {
        var _this = this;
        return this.init(options).pipe(startWith(null), map((/**
         * @return {?}
         */
        function () { return _this.queue; })), debounceTime(DUE_TIME));
    };
    /**
     * Terminates all uploads and clears the queue
     */
    /**
     * Terminates all uploads and clears the queue
     * @return {?}
     */
    UploadxService.prototype.disconnect = /**
     * Terminates all uploads and clears the queue
     * @return {?}
     */
    function () {
        this.queue.forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        function (uploader) { return (uploader.status = 'paused'); }));
        this.queue = [];
    };
    /**
     * @return {?}
     */
    UploadxService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.disconnect();
        this.subs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * Creates uploaders for files and adds them to the upload queue
     */
    /**
     * Creates uploaders for files and adds them to the upload queue
     * @param {?} files
     * @param {?=} options
     * @return {?}
     */
    UploadxService.prototype.handleFiles = /**
     * Creates uploaders for files and adds them to the upload queue
     * @param {?} files
     * @param {?=} options
     * @return {?}
     */
    function (files, options) {
        var _this = this;
        if (options === void 0) { options = (/** @type {?} */ ({})); }
        /** @type {?} */
        var instanceOptions = __assign({}, this.options, options);
        this.options.concurrency = instanceOptions.concurrency;
        ('name' in files ? [files] : Array.from(files)).forEach((/**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            return _this.addUploaderInstance(file, instanceOptions);
        }));
    };
    /**
     * Upload control
     * @example
     * // pause all
     * this.uploadService.control({ action: 'pause' });
     * // pause upload with uploadId
     * this.uploadService.control({ action: 'pause', uploadId});
     * // set token
     * this.uploadService.control({ token: `TOKEN` });
     */
    /**
     * Upload control
     * \@example
     * // pause all
     * this.uploadService.control({ action: 'pause' });
     * // pause upload with uploadId
     * this.uploadService.control({ action: 'pause', uploadId});
     * // set token
     * this.uploadService.control({ token: `TOKEN` });
     * @param {?} evt
     * @return {?}
     */
    UploadxService.prototype.control = /**
     * Upload control
     * \@example
     * // pause all
     * this.uploadService.control({ action: 'pause' });
     * // pause upload with uploadId
     * this.uploadService.control({ action: 'pause', uploadId});
     * // set token
     * this.uploadService.control({ token: `TOKEN` });
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        /** @type {?} */
        var target = evt.uploadId
            ? this.queue.filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var uploadId = _a.uploadId;
                return uploadId === evt.uploadId;
            }))
            : this.queue;
        target.forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        function (uploader) { return uploader.configure(evt); }));
    };
    /**
     * Returns number of active uploads
     */
    /**
     * Returns number of active uploads
     * @return {?}
     */
    UploadxService.prototype.runningProcess = /**
     * Returns number of active uploads
     * @return {?}
     */
    function () {
        return this.queue.filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var status = _a.status;
            return status === 'uploading' || status === 'retry';
        })).length;
    };
    /**
     * Performs http requests
     */
    /**
     * Performs http requests
     * @template T
     * @param {?} config
     * @return {?}
     */
    UploadxService.prototype.request = /**
     * Performs http requests
     * @template T
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                config.data = config.body ? config.body : config.data;
                return [2 /*return*/, this.ajax.request(config)];
            });
        });
    };
    /**
     * @private
     * @param {?} file
     * @param {?} options
     * @return {?}
     */
    UploadxService.prototype.addUploaderInstance = /**
     * @private
     * @param {?} file
     * @param {?} options
     * @return {?}
     */
    function (file, options) {
        return __awaiter(this, void 0, void 0, function () {
            var uploader;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploader = new options.uploaderClass(file, options, this.stateChange, this.ajax);
                        return [4 /*yield*/, this.idService.generateId(uploader)];
                    case 1:
                        ((/** @type {?} */ (uploader.uploadId))) = _a.sent();
                        this.queue.push(uploader);
                        uploader.status = options.autoUpload && onLine() ? 'queue' : 'added';
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @return {?}
     */
    UploadxService.prototype.processQueue = /**
     * @private
     * @return {?}
     */
    function () {
        this.queue = this.queue.filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var status = _a.status;
            return status !== 'cancelled';
        }));
        this.queue
            .filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var status = _a.status;
            return status === 'queue';
        }))
            .slice(0, Math.max(this.options.concurrency - this.runningProcess(), 0))
            .forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        function (uploader) { return uploader.upload(); }));
    };
    UploadxService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    UploadxService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [UPLOADX_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [UPLOADX_FACTORY_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [UPLOADX_AJAX,] }] },
        { type: NgZone },
        { type: IdService }
    ]; };
    /** @nocollapse */ UploadxService.ngInjectableDef = defineInjectable({ factory: function UploadxService_Factory() { return new UploadxService(inject(UPLOADX_OPTIONS, 8), inject(UPLOADX_FACTORY_OPTIONS), inject(UPLOADX_AJAX), inject(NgZone), inject(IdService)); }, token: UploadxService, providedIn: "root" });
    return UploadxService;
}());
/**
 * @return {?}
 */
function onLine() {
    return typeof window !== 'undefined' ? window.navigator.onLine : true;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UploadxDirective = /** @class */ (function () {
    function UploadxDirective(elementRef, renderer, uploadService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.uploadService = uploadService;
        this.options = {};
        this.state = new EventEmitter();
    }
    Object.defineProperty(UploadxDirective.prototype, "uploadx", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.options = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadxDirective.prototype, "control", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.uploadService.control(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    UploadxDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a = this.options, multiple = _a.multiple, allowedTypes = _a.allowedTypes;
        multiple !== false && this.renderer.setAttribute(this.elementRef.nativeElement, 'multiple', '');
        allowedTypes &&
            this.renderer.setAttribute(this.elementRef.nativeElement, 'accept', allowedTypes);
        this.uploadService.events
            .pipe(takeWhile((/**
         * @param {?} _
         * @return {?}
         */
        function (_) { return _this.state.observers.length > 0; })))
            .subscribe(this.state);
    };
    /**
     * @param {?} files
     * @return {?}
     */
    UploadxDirective.prototype.fileListener = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        if (files && files.item(0)) {
            this.uploadService.handleFiles(files, this.options);
        }
    };
    UploadxDirective.decorators = [
        { type: Directive, args: [{ selector: '[uploadx]' },] }
    ];
    /** @nocollapse */
    UploadxDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: UploadxService }
    ]; };
    UploadxDirective.propDecorators = {
        uploadx: [{ type: Input }],
        options: [{ type: Input }],
        control: [{ type: Input }],
        state: [{ type: Output }],
        fileListener: [{ type: HostListener, args: ['change', ['$event.target.files'],] }]
    };
    return UploadxDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UploadxDropDirective = /** @class */ (function () {
    function UploadxDropDirective(uploadService) {
        this.uploadService = uploadService;
        this.active = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    UploadxDropDirective.prototype.dropHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.item(0)) {
            event.stopPropagation();
            event.preventDefault();
            this.active = false;
            this.fileInput
                ? this.fileInput.fileListener(event.dataTransfer.files)
                : this.uploadService.handleFiles(event.dataTransfer.files);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UploadxDropDirective.prototype.onDragOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.dataTransfer && event.dataTransfer.files) {
            event.dataTransfer.dropEffect = 'copy';
            event.stopPropagation();
            event.preventDefault();
            this.active = true;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UploadxDropDirective.prototype.onDragLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.active = false;
    };
    UploadxDropDirective.decorators = [
        { type: Directive, args: [{ selector: '[uploadxDrop]' },] }
    ];
    /** @nocollapse */
    UploadxDropDirective.ctorParameters = function () { return [
        { type: UploadxService }
    ]; };
    UploadxDropDirective.propDecorators = {
        active: [{ type: HostBinding, args: ['class.uploadx-drop-active',] }],
        fileInput: [{ type: ContentChild, args: [UploadxDirective,] }],
        dropHandler: [{ type: HostListener, args: ['drop', ['$event'],] }],
        onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }]
    };
    return UploadxDropDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UploadxModule = /** @class */ (function () {
    function UploadxModule() {
    }
    /**
     * @param {?} options
     * @return {?}
     */
    UploadxModule.withConfig = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return {
            ngModule: UploadxModule,
            providers: [{ provide: UPLOADX_OPTIONS, useValue: options }]
        };
    };
    UploadxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [UploadxDirective, UploadxDropDirective],
                    exports: [UploadxDirective, UploadxDropDirective]
                },] }
    ];
    return UploadxModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ErrorType, RetryHandler, UploadxAjax, UPLOADX_AJAX, Tus, Uploader, getRangeEnd, UploaderX, UploadxModule, UploadxService, resolveUrl, unfunc, isNumber, createHash, pick, b64, DynamicChunk, UploadxDropDirective, UploadxDirective, UPLOADX_FACTORY_OPTIONS, UPLOADX_OPTIONS, Canceler, IdService };

//# sourceMappingURL=ngx-uploadx.js.map