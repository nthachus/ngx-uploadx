import { __awaiter } from 'tslib';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, startWith, takeWhile } from 'rxjs/operators';
import { InjectionToken, Injectable, NgModule, ContentChild, Directive, HostBinding, HostListener, ElementRef, EventEmitter, Input, Output, Renderer2, Optional, Inject, NgZone, defineInjectable, inject } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const ErrorType = {
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
const defaultRetryConfig = {
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
class RetryHandler {
    /**
     * @param {?=} configOptions
     */
    constructor(configOptions = {}) {
        this.attempts = 0;
        this.cancel = (/**
         * @return {?}
         */
        () => { });
        this.config = Object.assign({}, defaultRetryConfig, configOptions);
    }
    /**
     * @param {?} code
     * @return {?}
     */
    kind(code) {
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
    }
    /**
     * @return {?}
     */
    wait() {
        /** @type {?} */
        const ms = Math.min(Math.pow(2, (this.attempts - 1)) * this.config.minDelay, this.config.maxDelay) +
            Math.floor(Math.random() * this.config.minDelay);
        /** @type {?} */
        let id;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.cancel = (/**
             * @return {?}
             */
            () => {
                clearTimeout(id);
                resolve();
            });
            id = setTimeout(this.cancel, ms);
        }));
    }
    /**
     * @return {?}
     */
    reset() {
        this.attempts = 0;
    }
}

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
class UploadxAjax {
    /**
     * @param {?} buildXhr
     */
    constructor(buildXhr) {
        this.buildXhr = buildXhr;
        this.request = (/**
         * @template T
         * @param {?} __0
         * @return {?}
         */
        ({ method = 'GET', data = null, headers = {}, url, responseType, canceler, onUploadProgress, withCredentials = false, validateStatus = (/**
         * @param {?} status
         * @return {?}
         */
        status => status < 400 && status >= 200) }) => {
            /** @type {?} */
            const xhr = this.buildXhr();
            canceler && (canceler.onCancel = (/**
             * @return {?}
             */
            () => xhr && xhr.readyState !== xhr.DONE && xhr.abort()));
            return new Promise((/**
             * @param {?} resolve
             * @param {?} reject
             * @return {?}
             */
            (resolve, reject) => {
                xhr.open(method, url, true);
                withCredentials && (xhr.withCredentials = true);
                responseType && (xhr.responseType = responseType);
                responseType === 'json' && !headers.Accept && (headers.Accept = 'application/json');
                Object.keys(headers).forEach((/**
                 * @param {?} key
                 * @return {?}
                 */
                key => xhr.setRequestHeader(key, String(headers[key]))));
                xhr.upload.onprogress = onUploadProgress || null;
                xhr.onerror = xhr.ontimeout = xhr.onabort = (/**
                 * @param {?} evt
                 * @return {?}
                 */
                evt => {
                    return reject({ error: evt.type, url, method });
                });
                xhr.onload = (/**
                 * @return {?}
                 */
                () => {
                    /** @type {?} */
                    const response = {
                        data: this.getResponseBody(xhr, responseType === 'json'),
                        status: xhr.status,
                        headers: this.getResponseHeaders(xhr)
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
    getResponseHeaders(xhr) {
        /** @type {?} */
        const rows = xhr.getAllResponseHeaders().split(/[\r\n]+/);
        return rows.reduce((/**
         * @param {?} headers
         * @param {?} current
         * @return {?}
         */
        (headers, current) => {
            const [name, value] = current.split(': ');
            name && (headers[name.toLowerCase()] = value);
            return headers;
        }), {});
    }
    /**
     * @template T
     * @param {?} xhr
     * @param {?=} json
     * @return {?}
     */
    getResponseBody(xhr, json) {
        /** @type {?} */
        let body = 'response' in ((/** @type {?} */ (xhr))) ? xhr.response : xhr.responseText;
        if (body && json && typeof body === 'string') {
            try {
                body = JSON.parse(body);
            }
            catch (_a) { }
        }
        return body;
    }
}
/** @type {?} */
const UPLOADX_AJAX = new InjectionToken('uploadx.ajax', {
    factory: (/**
     * @return {?}
     */
    () => new UploadxAjax(createXhr)),
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
class Canceler {
    constructor() {
        this.onCancel = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    cancel() {
        this.onCancel();
        this.onCancel = (/**
         * @return {?}
         */
        () => { });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class Store {
    constructor() {
        this.prefix = 'UPLOADX-V3.0-';
    }
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    set(key, value) {
        localStorage.setItem(this.prefix + key, value);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    get(key) {
        return localStorage.getItem(this.prefix + key);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    delete(key) {
        localStorage.removeItem(this.prefix + key);
    }
}
/** @type {?} */
const store = typeof window !== 'undefined' && 'localStorage' in window
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
const pick = (/**
 * @template T, K
 * @param {?} obj
 * @param {?} whitelist
 * @return {?}
 */
(obj, whitelist) => {
    /** @type {?} */
    const result = (/** @type {?} */ ({}));
    whitelist.forEach((/**
     * @param {?} key
     * @return {?}
     */
    key => (result[key] = obj[key])));
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
    let hash = 2166136261;
    /** @type {?} */
    const len = str.length;
    for (let i = 0; i < len; i++) {
        hash ^= str.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return hash >>> 0;
}
/** @type {?} */
const b64 = {
    encode: (/**
     * @param {?} str
     * @return {?}
     */
    (str) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (/**
     * @param {?} match
     * @param {?} p1
     * @return {?}
     */
    (match, p1) => String.fromCharCode(Number.parseInt(p1, 16)))))),
    decode: (/**
     * @param {?} str
     * @return {?}
     */
    (str) => decodeURIComponent(atob(str)
        .split('')
        .map((/**
     * @param {?} c
     * @return {?}
     */
    c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)))
        .join(''))),
    serialize: (/**
     * @param {?} obj
     * @return {?}
     */
    (obj) => Object.keys(obj)
        .map((/**
     * @param {?} key
     * @return {?}
     */
    key => `${key} ${b64.encode(String(obj[key]))}`))
        .toString()),
    parse: (/**
     * @param {?} encoded
     * @return {?}
     */
    (encoded) => {
        /** @type {?} */
        const kvPairs = encoded.split(',').map((/**
         * @param {?} kv
         * @return {?}
         */
        kv => kv.split(' ')));
        /** @type {?} */
        const decoded = Object.create(null);
        for (const [key, value] of kvPairs) {
            decoded[key] = b64.decode(value);
        }
        return decoded;
    })
};
/**
 * Adaptive chunk size
 */
class DynamicChunk {
    /**
     * @param {?} throughput
     * @return {?}
     */
    static scale(throughput) {
        /** @type {?} */
        const elapsedTime = DynamicChunk.size / throughput;
        if (elapsedTime < DynamicChunk.minChunkTime) {
            DynamicChunk.size = Math.min(DynamicChunk.maxSize, DynamicChunk.size * 2);
        }
        if (elapsedTime > DynamicChunk.maxChunkTime) {
            DynamicChunk.size = Math.max(DynamicChunk.minSize, DynamicChunk.size / 2);
        }
        return DynamicChunk.size;
    }
}
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const actionToStatusMap = {
    pause: 'paused',
    upload: 'queue',
    cancel: 'cancelled'
};
/**
 * Uploader Base Class
 * @abstract
 */
class Uploader {
    /**
     * @param {?} file
     * @param {?} options
     * @param {?} stateChange
     * @param {?} ajax
     */
    constructor(file, options, stateChange, ajax) {
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
        () => __awaiter(this, void 0, void 0, function* () {
            this._token = yield unfunc(this.token || '', this.responseStatus);
        }));
        this.cleanup = (/**
         * @return {?}
         */
        () => store.delete(this.uploadId));
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
        req => req));
        this._authorize = options.authorize || ((/**
         * @param {?} req
         * @return {?}
         */
        req => req));
        this.configure(options);
    }
    /**
     * @return {?}
     */
    get url() {
        return this._url || store.get(this.uploadId) || '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set url(value) {
        this._url !== value && store.set(this.uploadId, value);
        this._url = value;
    }
    /**
     * @return {?}
     */
    get status() {
        return this._status;
    }
    /**
     * @param {?} s
     * @return {?}
     */
    set status(s) {
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
    }
    /**
     * Configure uploader
     * @param {?} __0
     * @return {?}
     */
    configure({ metadata, headers, token, endpoint, action }) {
        endpoint && (this.endpoint = endpoint);
        token && (this.token = token);
        metadata && Object.assign(this.metadata, unfunc(metadata, this.file));
        headers && Object.assign(this.headers, unfunc(headers, this.file));
        action && (this.status = actionToStatusMap[action]);
    }
    /**
     * Starts uploading
     * @return {?}
     */
    upload() {
        return __awaiter(this, void 0, void 0, function* () {
            this._status = 'uploading';
            this.startTime = new Date().getTime();
            yield this.updateToken();
            while (this.status === 'uploading' || this.status === 'retry') {
                this.status = 'uploading';
                try {
                    this.url = this.url || (yield this.getFileUrl());
                    this.offset = isNumber(this.offset) ? yield this.sendFileContent() : yield this.getOffset();
                    this.retry.reset();
                    if (this.offset === this.size) {
                        this.remaining = 0;
                        this.progress = 100;
                        this.status = 'complete';
                    }
                }
                catch (e) {
                    e instanceof Error && console.error(e);
                    if (this.status !== 'uploading') {
                        return;
                    }
                    switch (this.retry.kind(this.responseStatus)) {
                        case ErrorType.Fatal:
                            this.status = 'error';
                            return;
                        case ErrorType.NotFound:
                            this.url = '';
                            break;
                        case ErrorType.Auth:
                            yield this.updateToken();
                            break;
                        default:
                            this.responseStatus >= 400 && (this.offset = undefined);
                            this.status = 'retry';
                            yield this.retry.wait();
                    }
                }
            }
        });
    }
    /**
     * Performs http requests
     * @param {?} requestOptions
     * @return {?}
     */
    request(requestOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            this.responseStatus = 0;
            this.response = null;
            this.responseHeaders = {};
            /** @type {?} */
            let req = {
                body: requestOptions.body || null,
                canceler: this.canceler,
                headers: Object.assign({}, this.headers, requestOptions.headers),
                method: requestOptions.method || 'GET',
                url: requestOptions.url || this.url
            };
            req = yield this._authorize(req, this._token);
            const { body = null, headers, method, url = req.url } = (yield this._prerequest(req)) || req;
            /** @type {?} */
            const ajaxRequestConfig = {
                method,
                headers: Object.assign({}, req.headers, headers),
                url,
                data: body,
                responseType: this.responseType,
                withCredentials: !!this.options.withCredentials,
                canceler: this.canceler,
                validateStatus: (/**
                 * @return {?}
                 */
                () => true)
            };
            if (body && typeof body !== 'string') {
                ajaxRequestConfig.onUploadProgress = this.onProgress();
            }
            /** @type {?} */
            const response = yield this.ajax.request(ajaxRequestConfig);
            this.response = response.data;
            this.responseHeaders = response.headers;
            this.responseStatus = response.status;
            if (response.status >= 400) {
                return Promise.reject();
            }
        });
    }
    /**
     * @protected
     * @return {?}
     */
    abort() {
        this.offset = undefined;
        this.canceler.cancel();
    }
    /**
     * @protected
     * @return {?}
     */
    cancel() {
        return __awaiter(this, void 0, void 0, function* () {
            this.abort();
            if (this.url) {
                yield this.request({ method: 'DELETE' }).catch((/**
                 * @return {?}
                 */
                () => { }));
            }
            this.stateChange(this);
        });
    }
    /**
     * Gets the value from the response
     * @protected
     * @param {?} key
     * @return {?}
     */
    getValueFromResponse(key) {
        return this.responseHeaders[key.toLowerCase()] || null;
    }
    /**
     * @protected
     * @return {?}
     */
    getChunk() {
        this.chunkSize = isNumber(this.options.chunkSize) ? this.chunkSize : DynamicChunk.size;
        /** @type {?} */
        const start = this.offset || 0;
        /** @type {?} */
        const end = Math.min(start + this.chunkSize, this.size);
        /** @type {?} */
        const body = this.file.slice(this.offset, end);
        return { start, end, body };
    }
    /**
     * @private
     * @return {?}
     */
    onProgress() {
        /** @type {?} */
        let throttle;
        return (/**
         * @param {?} __0
         * @return {?}
         */
        ({ loaded }) => {
            /** @type {?} */
            const now = new Date().getTime();
            /** @type {?} */
            const uploaded = ((/** @type {?} */ (this.offset))) + loaded;
            /** @type {?} */
            const elapsedTime = (now - this.startTime) / 1000;
            this.speed = Math.round(uploaded / elapsedTime);
            DynamicChunk.scale(this.speed);
            if (!throttle) {
                throttle = setTimeout((/**
                 * @return {?}
                 */
                () => (throttle = undefined)), 500);
                this.progress = +((uploaded / this.size) * 100).toFixed(2);
                this.remaining = Math.ceil((this.size - uploaded) / this.speed);
                this.stateChange(this);
            }
        });
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Implements tus resumable upload protocol
 *
 * {\@link https://github.com/tus/tus-resumable-upload-protocol/blob/master/protocol.md|Github}
 */
class Tus extends Uploader {
    constructor() {
        super(...arguments);
        this.headers = { 'Tus-Resumable': '1.0.0' };
    }
    /**
     * @return {?}
     */
    getFileUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const encodedMetaData = b64.serialize(this.metadata);
            /** @type {?} */
            const headers = {
                'Upload-Length': `${this.size}`,
                'Upload-Metadata': `${encodedMetaData}`
            };
            yield this.request({ method: 'POST', url: this.endpoint, headers });
            /** @type {?} */
            const location = this.getValueFromResponse('location');
            if (!location) {
                throw new Error('Invalid or missing Location header');
            }
            this.offset = this.responseStatus === 201 ? 0 : undefined;
            return resolveUrl(location, this.endpoint);
        });
    }
    /**
     * @return {?}
     */
    sendFileContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = this.getChunk();
            /** @type {?} */
            const headers = {
                'Content-Type': 'application/offset+octet-stream',
                'Upload-Offset': `${this.offset}`
            };
            yield this.request({ method: 'PATCH', body, headers });
            return this.getOffsetFromResponse();
        });
    }
    /**
     * @return {?}
     */
    getOffset() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.request({ method: 'HEAD' });
            return this.getOffsetFromResponse();
        });
    }
    /**
     * @protected
     * @return {?}
     */
    getOffsetFromResponse() {
        /** @type {?} */
        const offsetStr = this.getValueFromResponse('Upload-Offset');
        return offsetStr ? parseInt(offsetStr, 10) : undefined;
    }
}

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
class UploaderX extends Uploader {
    constructor() {
        super(...arguments);
        this.responseType = (/** @type {?} */ ('json'));
    }
    /**
     * @return {?}
     */
    getFileUrl() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const headers = {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Upload-Content-Length': this.size.toString(),
                'X-Upload-Content-Type': this.file.type || 'application/octet-stream'
            };
            yield this.request({
                method: 'POST',
                body: JSON.stringify(this.metadata),
                url: this.endpoint,
                headers
            });
            /** @type {?} */
            const location = this.getValueFromResponse('location');
            if (!location) {
                throw new Error('Invalid or missing Location header');
            }
            this.offset = this.responseStatus === 201 ? 0 : undefined;
            return resolveUrl(location, this.endpoint);
        });
    }
    /**
     * @return {?}
     */
    sendFileContent() {
        return __awaiter(this, void 0, void 0, function* () {
            const { end, body } = this.getChunk();
            /** @type {?} */
            const headers = {
                'Content-Type': 'application/octet-stream',
                'Content-Range': `bytes ${this.offset}-${end - 1}/${this.size}`
            };
            yield this.request({ method: 'PUT', body, headers });
            return this.getOffsetFromResponse();
        });
    }
    /**
     * @return {?}
     */
    getOffset() {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const headers = {
                'Content-Type': 'application/octet-stream',
                'Content-Range': `bytes */${this.size}`
            };
            yield this.request({ method: 'PUT', headers });
            return this.getOffsetFromResponse();
        });
    }
    /**
     * @protected
     * @return {?}
     */
    getOffsetFromResponse() {
        if (this.responseStatus > 201) {
            /** @type {?} */
            const range = this.getValueFromResponse('Range');
            return range ? getRangeEnd(range) + 1 : undefined;
        }
        return this.size;
    }
}
/**
 * @param {?=} range
 * @return {?}
 */
function getRangeEnd(range = '') {
    /** @type {?} */
    const end = parseInt(range.split(/-/)[1], 10);
    return end >= 0 ? end : -1;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
const ɵ0 = /**
 * @param {?} req
 * @param {?} token
 * @return {?}
 */
(req, token) => {
    token && (req.headers.Authorization = `Bearer ${token}`);
    return req;
};
/** @type {?} */
const defaultOptions = {
    endpoint: '/upload',
    autoUpload: true,
    concurrency: 2,
    uploaderClass: UploaderX,
    authorize: (ɵ0)
};
/** @type {?} */
const UPLOADX_FACTORY_OPTIONS = new InjectionToken('uploadx.factory.options', { providedIn: 'root', factory: (/**
     * @return {?}
     */
    () => defaultOptions) });
/** @type {?} */
const UPLOADX_OPTIONS = new InjectionToken('uploadx.options');

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IdService {
    /**
     * @param {?} uploader
     * @return {?}
     */
    generateId(uploader) {
        /** @type {?} */
        const print = JSON.stringify(Object.assign({}, uploader.metadata, { type: uploader.constructor.name, endpoint: uploader.endpoint }));
        return createHash(print).toString(16);
    }
}
IdService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ IdService.ngInjectableDef = defineInjectable({ factory: function IdService_Factory() { return new IdService(); }, token: IdService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const stateKeys = [
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
const DUE_TIME = 5;
class UploadxService {
    /**
     * @param {?} options
     * @param {?} defaults
     * @param {?} ajax
     * @param {?} ngZone
     * @param {?} idService
     */
    constructor(options, defaults, ajax, ngZone, idService) {
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
        (evt) => {
            this.ngZone.run((/**
             * @return {?}
             */
            () => this.eventsStream.next(pick(evt, stateKeys))));
            if (evt.status !== 'uploading' && evt.status !== 'added') {
                this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => setTimeout((/**
                 * @return {?}
                 */
                () => this.processQueue()))));
            }
        });
        this.options = Object.assign({}, defaults, options);
        if (typeof window !== 'undefined') {
            this.subs.push(fromEvent(window, 'online').subscribe((/**
             * @return {?}
             */
            () => this.control({ action: 'upload' }))), fromEvent(window, 'offline').subscribe((/**
             * @return {?}
             */
            () => this.control({ action: 'pause' }))));
        }
    }
    /**
     * Upload status events
     * @return {?}
     */
    get events() {
        return this.eventsStream.asObservable();
    }
    /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits a new value on progress or status changes
     */
    init(options = {}) {
        Object.assign(this.options, options);
        return this.events;
    }
    /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits the current array of uploaders
     */
    connect(options) {
        return this.init(options).pipe(startWith(null), map((/**
         * @return {?}
         */
        () => this.queue)), debounceTime(DUE_TIME));
    }
    /**
     * Terminates all uploads and clears the queue
     * @return {?}
     */
    disconnect() {
        this.queue.forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        uploader => (uploader.status = 'paused')));
        this.queue = [];
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.disconnect();
        this.subs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * Creates uploaders for files and adds them to the upload queue
     * @param {?} files
     * @param {?=} options
     * @return {?}
     */
    handleFiles(files, options = (/** @type {?} */ ({}))) {
        /** @type {?} */
        const instanceOptions = Object.assign({}, this.options, options);
        this.options.concurrency = instanceOptions.concurrency;
        ('name' in files ? [files] : Array.from(files)).forEach((/**
         * @param {?} file
         * @return {?}
         */
        file => this.addUploaderInstance(file, instanceOptions)));
    }
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
    control(evt) {
        /** @type {?} */
        const target = evt.uploadId
            ? this.queue.filter((/**
             * @param {?} __0
             * @return {?}
             */
            ({ uploadId }) => uploadId === evt.uploadId))
            : this.queue;
        target.forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        uploader => uploader.configure(evt)));
    }
    /**
     * Returns number of active uploads
     * @return {?}
     */
    runningProcess() {
        return this.queue.filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ status }) => status === 'uploading' || status === 'retry')).length;
    }
    /**
     * Performs http requests
     * @template T
     * @param {?} config
     * @return {?}
     */
    request(config) {
        return __awaiter(this, void 0, void 0, function* () {
            config.data = config.body ? config.body : config.data;
            return this.ajax.request(config);
        });
    }
    /**
     * @private
     * @param {?} file
     * @param {?} options
     * @return {?}
     */
    addUploaderInstance(file, options) {
        return __awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const uploader = new options.uploaderClass(file, options, this.stateChange, this.ajax);
            ((/** @type {?} */ (uploader.uploadId))) = yield this.idService.generateId(uploader);
            this.queue.push(uploader);
            uploader.status = options.autoUpload && onLine() ? 'queue' : 'added';
        });
    }
    /**
     * @private
     * @return {?}
     */
    processQueue() {
        this.queue = this.queue.filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ status }) => status !== 'cancelled'));
        this.queue
            .filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ status }) => status === 'queue'))
            .slice(0, Math.max(this.options.concurrency - this.runningProcess(), 0))
            .forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        uploader => uploader.upload()));
    }
}
UploadxService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
UploadxService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [UPLOADX_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [UPLOADX_FACTORY_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [UPLOADX_AJAX,] }] },
    { type: NgZone },
    { type: IdService }
];
/** @nocollapse */ UploadxService.ngInjectableDef = defineInjectable({ factory: function UploadxService_Factory() { return new UploadxService(inject(UPLOADX_OPTIONS, 8), inject(UPLOADX_FACTORY_OPTIONS), inject(UPLOADX_AJAX), inject(NgZone), inject(IdService)); }, token: UploadxService, providedIn: "root" });
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
class UploadxDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} uploadService
     */
    constructor(elementRef, renderer, uploadService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.uploadService = uploadService;
        this.options = {};
        this.state = new EventEmitter();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set uploadx(value) {
        if (value) {
            this.options = value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set control(value) {
        if (value) {
            this.uploadService.control(value);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const { multiple, allowedTypes } = this.options;
        multiple !== false && this.renderer.setAttribute(this.elementRef.nativeElement, 'multiple', '');
        allowedTypes &&
            this.renderer.setAttribute(this.elementRef.nativeElement, 'accept', allowedTypes);
        this.uploadService.events
            .pipe(takeWhile((/**
         * @param {?} _
         * @return {?}
         */
        _ => this.state.observers.length > 0)))
            .subscribe(this.state);
    }
    /**
     * @param {?} files
     * @return {?}
     */
    fileListener(files) {
        if (files && files.item(0)) {
            this.uploadService.handleFiles(files, this.options);
        }
    }
}
UploadxDirective.decorators = [
    { type: Directive, args: [{ selector: '[uploadx]' },] }
];
/** @nocollapse */
UploadxDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: UploadxService }
];
UploadxDirective.propDecorators = {
    uploadx: [{ type: Input }],
    options: [{ type: Input }],
    control: [{ type: Input }],
    state: [{ type: Output }],
    fileListener: [{ type: HostListener, args: ['change', ['$event.target.files'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UploadxDropDirective {
    /**
     * @param {?} uploadService
     */
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.active = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dropHandler(event) {
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.item(0)) {
            event.stopPropagation();
            event.preventDefault();
            this.active = false;
            this.fileInput
                ? this.fileInput.fileListener(event.dataTransfer.files)
                : this.uploadService.handleFiles(event.dataTransfer.files);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragOver(event) {
        if (event.dataTransfer && event.dataTransfer.files) {
            event.dataTransfer.dropEffect = 'copy';
            event.stopPropagation();
            event.preventDefault();
            this.active = true;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragLeave(event) {
        this.active = false;
    }
}
UploadxDropDirective.decorators = [
    { type: Directive, args: [{ selector: '[uploadxDrop]' },] }
];
/** @nocollapse */
UploadxDropDirective.ctorParameters = () => [
    { type: UploadxService }
];
UploadxDropDirective.propDecorators = {
    active: [{ type: HostBinding, args: ['class.uploadx-drop-active',] }],
    fileInput: [{ type: ContentChild, args: [UploadxDirective,] }],
    dropHandler: [{ type: HostListener, args: ['drop', ['$event'],] }],
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class UploadxModule {
    /**
     * @param {?} options
     * @return {?}
     */
    static withConfig(options) {
        return {
            ngModule: UploadxModule,
            providers: [{ provide: UPLOADX_OPTIONS, useValue: options }]
        };
    }
}
UploadxModule.decorators = [
    { type: NgModule, args: [{
                declarations: [UploadxDirective, UploadxDropDirective],
                exports: [UploadxDirective, UploadxDropDirective]
            },] }
];

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