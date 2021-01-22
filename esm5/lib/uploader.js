/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Canceler } from './canceler';
import { ErrorType, RetryHandler } from './retry-handler';
import { store } from './store';
import { DynamicChunk, isNumber, unfunc } from './utils';
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
var /**
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
        function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var _a;
            return tslib_1.__generator(this, function (_b) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, e_1, _e;
            return tslib_1.__generator(this, function (_f) {
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var req, _a, _b, body, headers, method, _c, url, ajaxRequestConfig, response;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        this.responseStatus = 0;
                        this.response = null;
                        this.responseHeaders = {};
                        req = {
                            body: requestOptions.body || null,
                            canceler: this.canceler,
                            headers: tslib_1.__assign({}, this.headers, requestOptions.headers),
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
                            headers: tslib_1.__assign({}, req.headers, headers),
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
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
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
 * Uploader Base Class
 * @abstract
 */
export { Uploader };
if (false) {
    /** @type {?} */
    Uploader.prototype.name;
    /** @type {?} */
    Uploader.prototype.size;
    /** @type {?} */
    Uploader.prototype.uploadId;
    /** @type {?} */
    Uploader.prototype.response;
    /** @type {?} */
    Uploader.prototype.responseStatus;
    /** @type {?} */
    Uploader.prototype.responseHeaders;
    /** @type {?} */
    Uploader.prototype.progress;
    /** @type {?} */
    Uploader.prototype.remaining;
    /** @type {?} */
    Uploader.prototype.speed;
    /**
     * Custom headers
     * @type {?}
     */
    Uploader.prototype.headers;
    /**
     * Metadata Object
     * @type {?}
     */
    Uploader.prototype.metadata;
    /**
     * Upload endpoint
     * @type {?}
     */
    Uploader.prototype.endpoint;
    /**
     * Chunk size in bytes
     * @type {?}
     */
    Uploader.prototype.chunkSize;
    /**
     * Auth token/tokenGetter
     * @type {?}
     */
    Uploader.prototype.token;
    /**
     * Byte offset within the whole file
     * @type {?}
     */
    Uploader.prototype.offset;
    /**
     * Retries handler
     * @type {?}
     */
    Uploader.prototype.retry;
    /** @type {?} */
    Uploader.prototype.canceler;
    /**
     * Set HttpRequest responseType
     * @type {?}
     * @protected
     */
    Uploader.prototype.responseType;
    /**
     * @type {?}
     * @private
     */
    Uploader.prototype._authorize;
    /**
     * @type {?}
     * @private
     */
    Uploader.prototype._prerequest;
    /**
     * @type {?}
     * @private
     */
    Uploader.prototype.startTime;
    /**
     * @type {?}
     * @private
     */
    Uploader.prototype._token;
    /**
     * @type {?}
     * @private
     */
    Uploader.prototype._url;
    /**
     * @type {?}
     * @private
     */
    Uploader.prototype._status;
    /**
     * Set auth token cache
     * @type {?}
     */
    Uploader.prototype.updateToken;
    /**
     * @type {?}
     * @private
     */
    Uploader.prototype.cleanup;
    /** @type {?} */
    Uploader.prototype.file;
    /** @type {?} */
    Uploader.prototype.options;
    /** @type {?} */
    Uploader.prototype.stateChange;
    /** @type {?} */
    Uploader.prototype.ajax;
    /**
     * Get file URI
     * @abstract
     * @protected
     * @return {?}
     */
    Uploader.prototype.getFileUrl = function () { };
    /**
     * Send file content and return an offset for the next request
     * @abstract
     * @protected
     * @return {?}
     */
    Uploader.prototype.sendFileContent = function () { };
    /**
     * Get an offset for the next request
     * @abstract
     * @protected
     * @return {?}
     */
    Uploader.prototype.getOffset = function () { };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi91cGxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFldEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQzs7SUFFbkQsaUJBQWlCLEdBQTBDO0lBQy9ELEtBQUssRUFBRSxRQUFRO0lBQ2YsTUFBTSxFQUFFLE9BQU87SUFDZixNQUFNLEVBQUUsV0FBVztDQUNwQjs7Ozs7QUFLRDs7Ozs7SUE2REUsa0JBQ1csSUFBVSxFQUNWLE9BQWtDLEVBQ2xDLFdBQXVDLEVBQ3ZDLElBQVU7UUFKckIsaUJBb0JDO1FBbkJVLFNBQUksR0FBSixJQUFJLENBQU07UUFDVixZQUFPLEdBQVAsT0FBTyxDQUEyQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBNEI7UUFDdkMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQTdEckIsYUFBUSxHQUFpQixJQUFJLENBQUM7UUFDOUIsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUFDbkIsb0JBQWUsR0FBMkIsRUFBRSxDQUFDOzs7O1FBSzdDLFlBQU8sR0FBbUIsRUFBRSxDQUFDOzs7O1FBSTdCLGFBQVEsR0FBRyxTQUFTLENBQUM7Ozs7UUFNckIsV0FBTSxHQUFJLENBQUMsQ0FBQztRQUdaLGFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBT2xCLFNBQUksR0FBRyxFQUFFLENBQUM7Ozs7UUFrSmxCLGdCQUFXOzs7UUFBRzs7Ozs7d0JBQ1osS0FBQSxJQUFJLENBQUE7d0JBQVUscUJBQU0sTUFBTSxDQUFDLElBQUksQ0FB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QUNuQixtQ0FBNkM7O0lBQzdDLDRCQUFrQjs7SUFDbEIsNkJBQW1COztJQUNuQix5QkFBZTs7Ozs7SUFFZiwyQkFBNkI7Ozs7O0lBRTdCLDRCQUFtQjs7Ozs7SUFFbkIsNEJBQXFCOzs7OztJQUVyQiw2QkFBa0I7Ozs7O0lBRWxCLHlCQUFvQzs7Ozs7SUFFcEMsMEJBQVk7Ozs7O0lBRVoseUJBQW9COztJQUNwQiw0QkFBMEI7Ozs7OztJQUUxQixnQ0FBeUM7Ozs7O0lBQ3pDLDhCQUE4Qzs7Ozs7SUFDOUMsK0JBQXlDOzs7OztJQUN6Qyw2QkFBMkI7Ozs7O0lBQzNCLDBCQUF3Qjs7Ozs7SUFDeEIsd0JBQWtCOzs7OztJQVdsQiwyQkFBK0I7Ozs7O0lBdUkvQiwrQkFFRTs7Ozs7SUE2Q0YsMkJBQW9EOztJQWxLbEQsd0JBQW1COztJQUNuQiwyQkFBMkM7O0lBQzNDLCtCQUFnRDs7SUFDaEQsd0JBQW1COzs7Ozs7O0lBdUhyQixnREFBaUQ7Ozs7Ozs7SUFLakQscURBQWtFOzs7Ozs7O0lBS2xFLCtDQUE0RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFqYXgsIEFqYXhSZXF1ZXN0Q29uZmlnIH0gZnJvbSAnLi9hamF4JztcbmltcG9ydCB7IENhbmNlbGVyIH0gZnJvbSAnLi9jYW5jZWxlcic7XG5pbXBvcnQge1xuICBBdXRob3JpemVSZXF1ZXN0LFxuICBNZXRhZGF0YSxcbiAgUHJlUmVxdWVzdCxcbiAgUmVxdWVzdENvbmZpZyxcbiAgUmVxdWVzdEhlYWRlcnMsXG4gIFJlcXVlc3RPcHRpb25zLFxuICBSZXNwb25zZUJvZHksXG4gIFVwbG9hZEFjdGlvbixcbiAgVXBsb2FkZXJPcHRpb25zLFxuICBVcGxvYWRTdGF0ZSxcbiAgVXBsb2FkU3RhdHVzLFxuICBVcGxvYWR4Q29udHJvbEV2ZW50XG59IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBFcnJvclR5cGUsIFJldHJ5SGFuZGxlciB9IGZyb20gJy4vcmV0cnktaGFuZGxlcic7XG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gJy4vc3RvcmUnO1xuaW1wb3J0IHsgRHluYW1pY0NodW5rLCBpc051bWJlciwgdW5mdW5jIH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IGFjdGlvblRvU3RhdHVzTWFwOiB7IFtLIGluIFVwbG9hZEFjdGlvbl06IFVwbG9hZFN0YXR1cyB9ID0ge1xuICBwYXVzZTogJ3BhdXNlZCcsXG4gIHVwbG9hZDogJ3F1ZXVlJyxcbiAgY2FuY2VsOiAnY2FuY2VsbGVkJ1xufTtcblxuLyoqXG4gKiBVcGxvYWRlciBCYXNlIENsYXNzXG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBVcGxvYWRlciBpbXBsZW1lbnRzIFVwbG9hZFN0YXRlIHtcbiAgbmFtZTogc3RyaW5nO1xuICByZWFkb25seSBzaXplOiBudW1iZXI7XG4gIHJlYWRvbmx5IHVwbG9hZElkITogc3RyaW5nO1xuICByZXNwb25zZTogUmVzcG9uc2VCb2R5ID0gbnVsbDtcbiAgcmVzcG9uc2VTdGF0dXMgPSAwO1xuICByZXNwb25zZUhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgcHJvZ3Jlc3MhOiBudW1iZXI7XG4gIHJlbWFpbmluZyE6IG51bWJlcjtcbiAgc3BlZWQhOiBudW1iZXI7XG4gIC8qKiBDdXN0b20gaGVhZGVycyAqL1xuICBoZWFkZXJzOiBSZXF1ZXN0SGVhZGVycyA9IHt9O1xuICAvKiogTWV0YWRhdGEgT2JqZWN0ICovXG4gIG1ldGFkYXRhOiBNZXRhZGF0YTtcbiAgLyoqIFVwbG9hZCBlbmRwb2ludCAqL1xuICBlbmRwb2ludCA9ICcvdXBsb2FkJztcbiAgLyoqIENodW5rIHNpemUgaW4gYnl0ZXMgKi9cbiAgY2h1bmtTaXplOiBudW1iZXI7XG4gIC8qKiBBdXRoIHRva2VuL3Rva2VuR2V0dGVyICovXG4gIHRva2VuOiBVcGxvYWR4Q29udHJvbEV2ZW50Wyd0b2tlbiddO1xuICAvKiogQnl0ZSBvZmZzZXQgd2l0aGluIHRoZSB3aG9sZSBmaWxlICovXG4gIG9mZnNldD8gPSAwO1xuICAvKiogUmV0cmllcyBoYW5kbGVyICovXG4gIHJldHJ5OiBSZXRyeUhhbmRsZXI7XG4gIGNhbmNlbGVyID0gbmV3IENhbmNlbGVyKCk7XG4gIC8qKiBTZXQgSHR0cFJlcXVlc3QgcmVzcG9uc2VUeXBlICovXG4gIHByb3RlY3RlZCByZXNwb25zZVR5cGU/OiAnanNvbicgfCAndGV4dCc7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2F1dGhvcml6ZTogQXV0aG9yaXplUmVxdWVzdDtcbiAgcHJpdmF0ZSByZWFkb25seSBfcHJlcmVxdWVzdDogUHJlUmVxdWVzdDtcbiAgcHJpdmF0ZSBzdGFydFRpbWUhOiBudW1iZXI7XG4gIHByaXZhdGUgX3Rva2VuITogc3RyaW5nO1xuICBwcml2YXRlIF91cmwgPSAnJztcblxuICBnZXQgdXJsKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3VybCB8fCBzdG9yZS5nZXQodGhpcy51cGxvYWRJZCkgfHwgJyc7XG4gIH1cblxuICBzZXQgdXJsKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl91cmwgIT09IHZhbHVlICYmIHN0b3JlLnNldCh0aGlzLnVwbG9hZElkLCB2YWx1ZSk7XG4gICAgdGhpcy5fdXJsID0gdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF9zdGF0dXMhOiBVcGxvYWRTdGF0dXM7XG5cbiAgZ2V0IHN0YXR1cygpOiBVcGxvYWRTdGF0dXMge1xuICAgIHJldHVybiB0aGlzLl9zdGF0dXM7XG4gIH1cblxuICBzZXQgc3RhdHVzKHM6IFVwbG9hZFN0YXR1cykge1xuICAgIGlmICh0aGlzLl9zdGF0dXMgPT09ICdjYW5jZWxsZWQnIHx8ICh0aGlzLl9zdGF0dXMgPT09ICdjb21wbGV0ZScgJiYgcyAhPT0gJ2NhbmNlbGxlZCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzICE9PSB0aGlzLl9zdGF0dXMpIHtcbiAgICAgIHRoaXMuc3RhdHVzID09PSAncmV0cnknICYmIHRoaXMucmV0cnkuY2FuY2VsKCk7XG4gICAgICB0aGlzLl9zdGF0dXMgPSBzO1xuICAgICAgcyA9PT0gJ3BhdXNlZCcgJiYgdGhpcy5hYm9ydCgpO1xuICAgICAgWydjYW5jZWxsZWQnLCAnY29tcGxldGUnLCAnZXJyb3InXS5pbmRleE9mKHMpICE9PSAtMSAmJiB0aGlzLmNsZWFudXAoKTtcbiAgICAgIHMgPT09ICdjYW5jZWxsZWQnID8gdGhpcy5jYW5jZWwoKSA6IHRoaXMuc3RhdGVDaGFuZ2UodGhpcyk7XG4gICAgfVxuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVhZG9ubHkgZmlsZTogRmlsZSxcbiAgICByZWFkb25seSBvcHRpb25zOiBSZWFkb25seTxVcGxvYWRlck9wdGlvbnM+LFxuICAgIHJlYWRvbmx5IHN0YXRlQ2hhbmdlOiAoZXZ0OiBVcGxvYWRTdGF0ZSkgPT4gdm9pZCxcbiAgICByZWFkb25seSBhamF4OiBBamF4XG4gICkge1xuICAgIHRoaXMucmV0cnkgPSBuZXcgUmV0cnlIYW5kbGVyKG9wdGlvbnMucmV0cnlDb25maWcpO1xuICAgIHRoaXMubmFtZSA9IGZpbGUubmFtZTtcbiAgICB0aGlzLnNpemUgPSBmaWxlLnNpemU7XG4gICAgdGhpcy5tZXRhZGF0YSA9IHtcbiAgICAgIG5hbWU6IGZpbGUubmFtZSxcbiAgICAgIG1pbWVUeXBlOiBmaWxlLnR5cGUgfHwgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICAgICBzaXplOiBmaWxlLnNpemUsXG4gICAgICBsYXN0TW9kaWZpZWQ6XG4gICAgICAgIGZpbGUubGFzdE1vZGlmaWVkIHx8IChmaWxlIGFzIEZpbGUgJiB7IGxhc3RNb2RpZmllZERhdGU6IERhdGUgfSkubGFzdE1vZGlmaWVkRGF0ZS5nZXRUaW1lKClcbiAgICB9O1xuICAgIHRoaXMuY2h1bmtTaXplID0gb3B0aW9ucy5jaHVua1NpemUgfHwgdGhpcy5zaXplO1xuICAgIHRoaXMuX3ByZXJlcXVlc3QgPSBvcHRpb25zLnByZXJlcXVlc3QgfHwgKHJlcSA9PiByZXEpO1xuICAgIHRoaXMuX2F1dGhvcml6ZSA9IG9wdGlvbnMuYXV0aG9yaXplIHx8IChyZXEgPT4gcmVxKTtcbiAgICB0aGlzLmNvbmZpZ3VyZShvcHRpb25zKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25maWd1cmUgdXBsb2FkZXJcbiAgICovXG4gIGNvbmZpZ3VyZSh7IG1ldGFkYXRhLCBoZWFkZXJzLCB0b2tlbiwgZW5kcG9pbnQsIGFjdGlvbiB9OiBVcGxvYWR4Q29udHJvbEV2ZW50KTogdm9pZCB7XG4gICAgZW5kcG9pbnQgJiYgKHRoaXMuZW5kcG9pbnQgPSBlbmRwb2ludCk7XG4gICAgdG9rZW4gJiYgKHRoaXMudG9rZW4gPSB0b2tlbik7XG4gICAgbWV0YWRhdGEgJiYgT2JqZWN0LmFzc2lnbih0aGlzLm1ldGFkYXRhLCB1bmZ1bmMobWV0YWRhdGEsIHRoaXMuZmlsZSkpO1xuICAgIGhlYWRlcnMgJiYgT2JqZWN0LmFzc2lnbih0aGlzLmhlYWRlcnMsIHVuZnVuYyhoZWFkZXJzLCB0aGlzLmZpbGUpKTtcbiAgICBhY3Rpb24gJiYgKHRoaXMuc3RhdHVzID0gYWN0aW9uVG9TdGF0dXNNYXBbYWN0aW9uXSk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnRzIHVwbG9hZGluZ1xuICAgKi9cbiAgYXN5bmMgdXBsb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuX3N0YXR1cyA9ICd1cGxvYWRpbmcnO1xuICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgYXdhaXQgdGhpcy51cGRhdGVUb2tlbigpO1xuICAgIHdoaWxlICh0aGlzLnN0YXR1cyA9PT0gJ3VwbG9hZGluZycgfHwgdGhpcy5zdGF0dXMgPT09ICdyZXRyeScpIHtcbiAgICAgIHRoaXMuc3RhdHVzID0gJ3VwbG9hZGluZyc7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnVybCA9IHRoaXMudXJsIHx8IChhd2FpdCB0aGlzLmdldEZpbGVVcmwoKSk7XG4gICAgICAgIHRoaXMub2Zmc2V0ID0gaXNOdW1iZXIodGhpcy5vZmZzZXQpID8gYXdhaXQgdGhpcy5zZW5kRmlsZUNvbnRlbnQoKSA6IGF3YWl0IHRoaXMuZ2V0T2Zmc2V0KCk7XG4gICAgICAgIHRoaXMucmV0cnkucmVzZXQoKTtcbiAgICAgICAgaWYgKHRoaXMub2Zmc2V0ID09PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICB0aGlzLnJlbWFpbmluZyA9IDA7XG4gICAgICAgICAgdGhpcy5wcm9ncmVzcyA9IDEwMDtcbiAgICAgICAgICB0aGlzLnN0YXR1cyA9ICdjb21wbGV0ZSc7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgZSBpbnN0YW5jZW9mIEVycm9yICYmIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyAhPT0gJ3VwbG9hZGluZycpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoICh0aGlzLnJldHJ5LmtpbmQodGhpcy5yZXNwb25zZVN0YXR1cykpIHtcbiAgICAgICAgICBjYXNlIEVycm9yVHlwZS5GYXRhbDpcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzID0gJ2Vycm9yJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBjYXNlIEVycm9yVHlwZS5Ob3RGb3VuZDpcbiAgICAgICAgICAgIHRoaXMudXJsID0gJyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEVycm9yVHlwZS5BdXRoOlxuICAgICAgICAgICAgYXdhaXQgdGhpcy51cGRhdGVUb2tlbigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRoaXMucmVzcG9uc2VTdGF0dXMgPj0gNDAwICYmICh0aGlzLm9mZnNldCA9IHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9ICdyZXRyeSc7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnJldHJ5LndhaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBodHRwIHJlcXVlc3RzXG4gICAqL1xuICBhc3luYyByZXF1ZXN0KHJlcXVlc3RPcHRpb25zOiBSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMucmVzcG9uc2VTdGF0dXMgPSAwO1xuICAgIHRoaXMucmVzcG9uc2UgPSBudWxsO1xuICAgIHRoaXMucmVzcG9uc2VIZWFkZXJzID0ge307XG4gICAgbGV0IHJlcTogUmVxdWVzdENvbmZpZyA9IHtcbiAgICAgIGJvZHk6IHJlcXVlc3RPcHRpb25zLmJvZHkgfHwgbnVsbCxcbiAgICAgIGNhbmNlbGVyOiB0aGlzLmNhbmNlbGVyLFxuICAgICAgaGVhZGVyczogeyAuLi50aGlzLmhlYWRlcnMsIC4uLnJlcXVlc3RPcHRpb25zLmhlYWRlcnMgfSxcbiAgICAgIG1ldGhvZDogcmVxdWVzdE9wdGlvbnMubWV0aG9kIHx8ICdHRVQnLFxuICAgICAgdXJsOiByZXF1ZXN0T3B0aW9ucy51cmwgfHwgdGhpcy51cmxcbiAgICB9O1xuICAgIHJlcSA9IGF3YWl0IHRoaXMuX2F1dGhvcml6ZShyZXEsIHRoaXMuX3Rva2VuKTtcbiAgICBjb25zdCB7IGJvZHkgPSBudWxsLCBoZWFkZXJzLCBtZXRob2QsIHVybCA9IHJlcS51cmwgfSA9IChhd2FpdCB0aGlzLl9wcmVyZXF1ZXN0KHJlcSkpIHx8IHJlcTtcbiAgICBjb25zdCBhamF4UmVxdWVzdENvbmZpZzogQWpheFJlcXVlc3RDb25maWcgPSB7XG4gICAgICBtZXRob2QsXG4gICAgICBoZWFkZXJzOiB7IC4uLnJlcS5oZWFkZXJzLCAuLi5oZWFkZXJzIH0sXG4gICAgICB1cmwsXG4gICAgICBkYXRhOiBib2R5LFxuICAgICAgcmVzcG9uc2VUeXBlOiB0aGlzLnJlc3BvbnNlVHlwZSxcbiAgICAgIHdpdGhDcmVkZW50aWFsczogISF0aGlzLm9wdGlvbnMud2l0aENyZWRlbnRpYWxzLFxuICAgICAgY2FuY2VsZXI6IHRoaXMuY2FuY2VsZXIsXG4gICAgICB2YWxpZGF0ZVN0YXR1czogKCkgPT4gdHJ1ZVxuICAgIH07XG4gICAgaWYgKGJvZHkgJiYgdHlwZW9mIGJvZHkgIT09ICdzdHJpbmcnKSB7XG4gICAgICBhamF4UmVxdWVzdENvbmZpZy5vblVwbG9hZFByb2dyZXNzID0gdGhpcy5vblByb2dyZXNzKCk7XG4gICAgfVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5hamF4LnJlcXVlc3QoYWpheFJlcXVlc3RDb25maWcpO1xuICAgIHRoaXMucmVzcG9uc2UgPSByZXNwb25zZS5kYXRhO1xuICAgIHRoaXMucmVzcG9uc2VIZWFkZXJzID0gcmVzcG9uc2UuaGVhZGVycztcbiAgICB0aGlzLnJlc3BvbnNlU3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzO1xuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPj0gNDAwKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IGF1dGggdG9rZW4gY2FjaGVcbiAgICovXG4gIHVwZGF0ZVRva2VuID0gYXN5bmMgKCk6IFByb21pc2U8c3RyaW5nIHwgdm9pZD4gPT4ge1xuICAgIHRoaXMuX3Rva2VuID0gYXdhaXQgdW5mdW5jKHRoaXMudG9rZW4gfHwgJycsIHRoaXMucmVzcG9uc2VTdGF0dXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXQgZmlsZSBVUklcbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRGaWxlVXJsKCk6IFByb21pc2U8c3RyaW5nPjtcblxuICAvKipcbiAgICogU2VuZCBmaWxlIGNvbnRlbnQgYW5kIHJldHVybiBhbiBvZmZzZXQgZm9yIHRoZSBuZXh0IHJlcXVlc3RcbiAgICovXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBzZW5kRmlsZUNvbnRlbnQoKTogUHJvbWlzZTxudW1iZXIgfCB1bmRlZmluZWQ+O1xuXG4gIC8qKlxuICAgKiBHZXQgYW4gb2Zmc2V0IGZvciB0aGUgbmV4dCByZXF1ZXN0XG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0T2Zmc2V0KCk6IFByb21pc2U8bnVtYmVyIHwgdW5kZWZpbmVkPjtcblxuICBwcm90ZWN0ZWQgYWJvcnQoKTogdm9pZCB7XG4gICAgdGhpcy5vZmZzZXQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jYW5jZWxlci5jYW5jZWwoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBhc3luYyBjYW5jZWwoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5hYm9ydCgpO1xuICAgIGlmICh0aGlzLnVybCkge1xuICAgICAgYXdhaXQgdGhpcy5yZXF1ZXN0KHsgbWV0aG9kOiAnREVMRVRFJyB9KS5jYXRjaCgoKSA9PiB7fSk7XG4gICAgfVxuICAgIHRoaXMuc3RhdGVDaGFuZ2UodGhpcyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgdmFsdWUgZnJvbSB0aGUgcmVzcG9uc2VcbiAgICovXG4gIHByb3RlY3RlZCBnZXRWYWx1ZUZyb21SZXNwb25zZShrZXk6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLnJlc3BvbnNlSGVhZGVyc1trZXkudG9Mb3dlckNhc2UoKV0gfHwgbnVsbDtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRDaHVuaygpOiB7IHN0YXJ0OiBudW1iZXI7IGVuZDogbnVtYmVyOyBib2R5OiBCbG9iIH0ge1xuICAgIHRoaXMuY2h1bmtTaXplID0gaXNOdW1iZXIodGhpcy5vcHRpb25zLmNodW5rU2l6ZSkgPyB0aGlzLmNodW5rU2l6ZSA6IER5bmFtaWNDaHVuay5zaXplO1xuICAgIGNvbnN0IHN0YXJ0ID0gdGhpcy5vZmZzZXQgfHwgMDtcbiAgICBjb25zdCBlbmQgPSBNYXRoLm1pbihzdGFydCArIHRoaXMuY2h1bmtTaXplLCB0aGlzLnNpemUpO1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmZpbGUuc2xpY2UodGhpcy5vZmZzZXQsIGVuZCk7XG4gICAgcmV0dXJuIHsgc3RhcnQsIGVuZCwgYm9keSB9O1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhbnVwID0gKCkgPT4gc3RvcmUuZGVsZXRlKHRoaXMudXBsb2FkSWQpO1xuXG4gIHByaXZhdGUgb25Qcm9ncmVzcygpOiAoZXZ0OiBQcm9ncmVzc0V2ZW50KSA9PiB2b2lkIHtcbiAgICBsZXQgdGhyb3R0bGU6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgdW5kZWZpbmVkO1xuICAgIHJldHVybiAoeyBsb2FkZWQgfSkgPT4ge1xuICAgICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICBjb25zdCB1cGxvYWRlZCA9ICh0aGlzLm9mZnNldCBhcyBudW1iZXIpICsgbG9hZGVkO1xuICAgICAgY29uc3QgZWxhcHNlZFRpbWUgPSAobm93IC0gdGhpcy5zdGFydFRpbWUpIC8gMTAwMDtcbiAgICAgIHRoaXMuc3BlZWQgPSBNYXRoLnJvdW5kKHVwbG9hZGVkIC8gZWxhcHNlZFRpbWUpO1xuICAgICAgRHluYW1pY0NodW5rLnNjYWxlKHRoaXMuc3BlZWQpO1xuICAgICAgaWYgKCF0aHJvdHRsZSkge1xuICAgICAgICB0aHJvdHRsZSA9IHNldFRpbWVvdXQoKCkgPT4gKHRocm90dGxlID0gdW5kZWZpbmVkKSwgNTAwKTtcbiAgICAgICAgdGhpcy5wcm9ncmVzcyA9ICsoKHVwbG9hZGVkIC8gdGhpcy5zaXplKSAqIDEwMCkudG9GaXhlZCgyKTtcbiAgICAgICAgdGhpcy5yZW1haW5pbmcgPSBNYXRoLmNlaWwoKHRoaXMuc2l6ZSAtIHVwbG9hZGVkKSAvIHRoaXMuc3BlZWQpO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlKHRoaXMpO1xuICAgICAgfVxuICAgIH07XG4gIH1cbn1cbiJdfQ==