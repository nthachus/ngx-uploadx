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
const actionToStatusMap = {
    pause: 'paused',
    upload: 'queue',
    cancel: 'cancelled'
};
/**
 * Uploader Base Class
 * @abstract
 */
export class Uploader {
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
        () => tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi91cGxvYWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFldEMsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ2hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLFNBQVMsQ0FBQzs7TUFFbkQsaUJBQWlCLEdBQTBDO0lBQy9ELEtBQUssRUFBRSxRQUFRO0lBQ2YsTUFBTSxFQUFFLE9BQU87SUFDZixNQUFNLEVBQUUsV0FBVztDQUNwQjs7Ozs7QUFLRCxNQUFNLE9BQWdCLFFBQVE7Ozs7Ozs7SUE2RDVCLFlBQ1csSUFBVSxFQUNWLE9BQWtDLEVBQ2xDLFdBQXVDLEVBQ3ZDLElBQVU7UUFIVixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsWUFBTyxHQUFQLE9BQU8sQ0FBMkI7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQTRCO1FBQ3ZDLFNBQUksR0FBSixJQUFJLENBQU07UUE3RHJCLGFBQVEsR0FBaUIsSUFBSSxDQUFDO1FBQzlCLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLG9CQUFlLEdBQTJCLEVBQUUsQ0FBQzs7OztRQUs3QyxZQUFPLEdBQW1CLEVBQUUsQ0FBQzs7OztRQUk3QixhQUFRLEdBQUcsU0FBUyxDQUFDOzs7O1FBTXJCLFdBQU0sR0FBSSxDQUFDLENBQUM7UUFHWixhQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQU9sQixTQUFJLEdBQUcsRUFBRSxDQUFDOzs7O1FBa0psQixnQkFBVzs7O1FBQUcsR0FBaUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFD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LEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QjtRQUNILENBQUMsRUFBQztJQUNKLENBQUM7Q0FDRjs7O0lBalBDLHdCQUFhOztJQUNiLHdCQUFzQjs7SUFDdEIsNEJBQTJCOztJQUMzQiw0QkFBOEI7O0lBQzlCLGtDQUFtQjs7SUFDbkIsbUNBQTZDOztJQUM3Qyw0QkFBa0I7O0lBQ2xCLDZCQUFtQjs7SUFDbkIseUJBQWU7Ozs7O0lBRWYsMkJBQTZCOzs7OztJQUU3Qiw0QkFBbUI7Ozs7O0lBRW5CLDRCQUFxQjs7Ozs7SUFFckIsNkJBQWtCOzs7OztJQUVsQix5QkFBb0M7Ozs7O0lBRXBDLDBCQUFZOzs7OztJQUVaLHlCQUFvQjs7SUFDcEIsNEJBQTBCOzs7Ozs7SUFFMUIsZ0NBQXlDOzs7OztJQUN6Qyw4QkFBOEM7Ozs7O0lBQzlDLCtCQUF5Qzs7Ozs7SUFDekMsNkJBQTJCOzs7OztJQUMzQiwwQkFBd0I7Ozs7O0lBQ3hCLHdCQUFrQjs7Ozs7SUFXbEIsMkJBQStCOzs7OztJQXVJL0IsK0JBRUU7Ozs7O0lBNkNGLDJCQUFvRDs7SUFsS2xELHdCQUFtQjs7SUFDbkIsMkJBQTJDOztJQUMzQywrQkFBZ0Q7O0lBQ2hELHdCQUFtQjs7Ozs7OztJQXVIckIsZ0RBQWlEOzs7Ozs7O0lBS2pELHFEQUFrRTs7Ozs7OztJQUtsRSwrQ0FBNEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBamF4LCBBamF4UmVxdWVzdENvbmZpZyB9IGZyb20gJy4vYWpheCc7XG5pbXBvcnQgeyBDYW5jZWxlciB9IGZyb20gJy4vY2FuY2VsZXInO1xuaW1wb3J0IHtcbiAgQXV0aG9yaXplUmVxdWVzdCxcbiAgTWV0YWRhdGEsXG4gIFByZVJlcXVlc3QsXG4gIFJlcXVlc3RDb25maWcsXG4gIFJlcXVlc3RIZWFkZXJzLFxuICBSZXF1ZXN0T3B0aW9ucyxcbiAgUmVzcG9uc2VCb2R5LFxuICBVcGxvYWRBY3Rpb24sXG4gIFVwbG9hZGVyT3B0aW9ucyxcbiAgVXBsb2FkU3RhdGUsXG4gIFVwbG9hZFN0YXR1cyxcbiAgVXBsb2FkeENvbnRyb2xFdmVudFxufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRXJyb3JUeXBlLCBSZXRyeUhhbmRsZXIgfSBmcm9tICcuL3JldHJ5LWhhbmRsZXInO1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tICcuL3N0b3JlJztcbmltcG9ydCB7IER5bmFtaWNDaHVuaywgaXNOdW1iZXIsIHVuZnVuYyB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBhY3Rpb25Ub1N0YXR1c01hcDogeyBbSyBpbiBVcGxvYWRBY3Rpb25dOiBVcGxvYWRTdGF0dXMgfSA9IHtcbiAgcGF1c2U6ICdwYXVzZWQnLFxuICB1cGxvYWQ6ICdxdWV1ZScsXG4gIGNhbmNlbDogJ2NhbmNlbGxlZCdcbn07XG5cbi8qKlxuICogVXBsb2FkZXIgQmFzZSBDbGFzc1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgVXBsb2FkZXIgaW1wbGVtZW50cyBVcGxvYWRTdGF0ZSB7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVhZG9ubHkgc2l6ZTogbnVtYmVyO1xuICByZWFkb25seSB1cGxvYWRJZCE6IHN0cmluZztcbiAgcmVzcG9uc2U6IFJlc3BvbnNlQm9keSA9IG51bGw7XG4gIHJlc3BvbnNlU3RhdHVzID0gMDtcbiAgcmVzcG9uc2VIZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge307XG4gIHByb2dyZXNzITogbnVtYmVyO1xuICByZW1haW5pbmchOiBudW1iZXI7XG4gIHNwZWVkITogbnVtYmVyO1xuICAvKiogQ3VzdG9tIGhlYWRlcnMgKi9cbiAgaGVhZGVyczogUmVxdWVzdEhlYWRlcnMgPSB7fTtcbiAgLyoqIE1ldGFkYXRhIE9iamVjdCAqL1xuICBtZXRhZGF0YTogTWV0YWRhdGE7XG4gIC8qKiBVcGxvYWQgZW5kcG9pbnQgKi9cbiAgZW5kcG9pbnQgPSAnL3VwbG9hZCc7XG4gIC8qKiBDaHVuayBzaXplIGluIGJ5dGVzICovXG4gIGNodW5rU2l6ZTogbnVtYmVyO1xuICAvKiogQXV0aCB0b2tlbi90b2tlbkdldHRlciAqL1xuICB0b2tlbjogVXBsb2FkeENvbnRyb2xFdmVudFsndG9rZW4nXTtcbiAgLyoqIEJ5dGUgb2Zmc2V0IHdpdGhpbiB0aGUgd2hvbGUgZmlsZSAqL1xuICBvZmZzZXQ/ID0gMDtcbiAgLyoqIFJldHJpZXMgaGFuZGxlciAqL1xuICByZXRyeTogUmV0cnlIYW5kbGVyO1xuICBjYW5jZWxlciA9IG5ldyBDYW5jZWxlcigpO1xuICAvKiogU2V0IEh0dHBSZXF1ZXN0IHJlc3BvbnNlVHlwZSAqL1xuICBwcm90ZWN0ZWQgcmVzcG9uc2VUeXBlPzogJ2pzb24nIHwgJ3RleHQnO1xuICBwcml2YXRlIHJlYWRvbmx5IF9hdXRob3JpemU6IEF1dGhvcml6ZVJlcXVlc3Q7XG4gIHByaXZhdGUgcmVhZG9ubHkgX3ByZXJlcXVlc3Q6IFByZVJlcXVlc3Q7XG4gIHByaXZhdGUgc3RhcnRUaW1lITogbnVtYmVyO1xuICBwcml2YXRlIF90b2tlbiE6IHN0cmluZztcbiAgcHJpdmF0ZSBfdXJsID0gJyc7XG5cbiAgZ2V0IHVybCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl91cmwgfHwgc3RvcmUuZ2V0KHRoaXMudXBsb2FkSWQpIHx8ICcnO1xuICB9XG5cbiAgc2V0IHVybCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fdXJsICE9PSB2YWx1ZSAmJiBzdG9yZS5zZXQodGhpcy51cGxvYWRJZCwgdmFsdWUpO1xuICAgIHRoaXMuX3VybCA9IHZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhdHVzITogVXBsb2FkU3RhdHVzO1xuXG4gIGdldCBzdGF0dXMoKTogVXBsb2FkU3RhdHVzIHtcbiAgICByZXR1cm4gdGhpcy5fc3RhdHVzO1xuICB9XG5cbiAgc2V0IHN0YXR1cyhzOiBVcGxvYWRTdGF0dXMpIHtcbiAgICBpZiAodGhpcy5fc3RhdHVzID09PSAnY2FuY2VsbGVkJyB8fCAodGhpcy5fc3RhdHVzID09PSAnY29tcGxldGUnICYmIHMgIT09ICdjYW5jZWxsZWQnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocyAhPT0gdGhpcy5fc3RhdHVzKSB7XG4gICAgICB0aGlzLnN0YXR1cyA9PT0gJ3JldHJ5JyAmJiB0aGlzLnJldHJ5LmNhbmNlbCgpO1xuICAgICAgdGhpcy5fc3RhdHVzID0gcztcbiAgICAgIHMgPT09ICdwYXVzZWQnICYmIHRoaXMuYWJvcnQoKTtcbiAgICAgIFsnY2FuY2VsbGVkJywgJ2NvbXBsZXRlJywgJ2Vycm9yJ10uaW5kZXhPZihzKSAhPT0gLTEgJiYgdGhpcy5jbGVhbnVwKCk7XG4gICAgICBzID09PSAnY2FuY2VsbGVkJyA/IHRoaXMuY2FuY2VsKCkgOiB0aGlzLnN0YXRlQ2hhbmdlKHRoaXMpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IGZpbGU6IEZpbGUsXG4gICAgcmVhZG9ubHkgb3B0aW9uczogUmVhZG9ubHk8VXBsb2FkZXJPcHRpb25zPixcbiAgICByZWFkb25seSBzdGF0ZUNoYW5nZTogKGV2dDogVXBsb2FkU3RhdGUpID0+IHZvaWQsXG4gICAgcmVhZG9ubHkgYWpheDogQWpheFxuICApIHtcbiAgICB0aGlzLnJldHJ5ID0gbmV3IFJldHJ5SGFuZGxlcihvcHRpb25zLnJldHJ5Q29uZmlnKTtcbiAgICB0aGlzLm5hbWUgPSBmaWxlLm5hbWU7XG4gICAgdGhpcy5zaXplID0gZmlsZS5zaXplO1xuICAgIHRoaXMubWV0YWRhdGEgPSB7XG4gICAgICBuYW1lOiBmaWxlLm5hbWUsXG4gICAgICBtaW1lVHlwZTogZmlsZS50eXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICAgc2l6ZTogZmlsZS5zaXplLFxuICAgICAgbGFzdE1vZGlmaWVkOlxuICAgICAgICBmaWxlLmxhc3RNb2RpZmllZCB8fCAoZmlsZSBhcyBGaWxlICYgeyBsYXN0TW9kaWZpZWREYXRlOiBEYXRlIH0pLmxhc3RNb2RpZmllZERhdGUuZ2V0VGltZSgpXG4gICAgfTtcbiAgICB0aGlzLmNodW5rU2l6ZSA9IG9wdGlvbnMuY2h1bmtTaXplIHx8IHRoaXMuc2l6ZTtcbiAgICB0aGlzLl9wcmVyZXF1ZXN0ID0gb3B0aW9ucy5wcmVyZXF1ZXN0IHx8IChyZXEgPT4gcmVxKTtcbiAgICB0aGlzLl9hdXRob3JpemUgPSBvcHRpb25zLmF1dGhvcml6ZSB8fCAocmVxID0+IHJlcSk7XG4gICAgdGhpcy5jb25maWd1cmUob3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlIHVwbG9hZGVyXG4gICAqL1xuICBjb25maWd1cmUoeyBtZXRhZGF0YSwgaGVhZGVycywgdG9rZW4sIGVuZHBvaW50LCBhY3Rpb24gfTogVXBsb2FkeENvbnRyb2xFdmVudCk6IHZvaWQge1xuICAgIGVuZHBvaW50ICYmICh0aGlzLmVuZHBvaW50ID0gZW5kcG9pbnQpO1xuICAgIHRva2VuICYmICh0aGlzLnRva2VuID0gdG9rZW4pO1xuICAgIG1ldGFkYXRhICYmIE9iamVjdC5hc3NpZ24odGhpcy5tZXRhZGF0YSwgdW5mdW5jKG1ldGFkYXRhLCB0aGlzLmZpbGUpKTtcbiAgICBoZWFkZXJzICYmIE9iamVjdC5hc3NpZ24odGhpcy5oZWFkZXJzLCB1bmZ1bmMoaGVhZGVycywgdGhpcy5maWxlKSk7XG4gICAgYWN0aW9uICYmICh0aGlzLnN0YXR1cyA9IGFjdGlvblRvU3RhdHVzTWFwW2FjdGlvbl0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyB1cGxvYWRpbmdcbiAgICovXG4gIGFzeW5jIHVwbG9hZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLl9zdGF0dXMgPSAndXBsb2FkaW5nJztcbiAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGF3YWl0IHRoaXMudXBkYXRlVG9rZW4oKTtcbiAgICB3aGlsZSAodGhpcy5zdGF0dXMgPT09ICd1cGxvYWRpbmcnIHx8IHRoaXMuc3RhdHVzID09PSAncmV0cnknKSB7XG4gICAgICB0aGlzLnN0YXR1cyA9ICd1cGxvYWRpbmcnO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy51cmwgPSB0aGlzLnVybCB8fCAoYXdhaXQgdGhpcy5nZXRGaWxlVXJsKCkpO1xuICAgICAgICB0aGlzLm9mZnNldCA9IGlzTnVtYmVyKHRoaXMub2Zmc2V0KSA/IGF3YWl0IHRoaXMuc2VuZEZpbGVDb250ZW50KCkgOiBhd2FpdCB0aGlzLmdldE9mZnNldCgpO1xuICAgICAgICB0aGlzLnJldHJ5LnJlc2V0KCk7XG4gICAgICAgIGlmICh0aGlzLm9mZnNldCA9PT0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgdGhpcy5yZW1haW5pbmcgPSAwO1xuICAgICAgICAgIHRoaXMucHJvZ3Jlc3MgPSAxMDA7XG4gICAgICAgICAgdGhpcy5zdGF0dXMgPSAnY29tcGxldGUnO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGUgaW5zdGFuY2VvZiBFcnJvciAmJiBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgICBpZiAodGhpcy5zdGF0dXMgIT09ICd1cGxvYWRpbmcnKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodGhpcy5yZXRyeS5raW5kKHRoaXMucmVzcG9uc2VTdGF0dXMpKSB7XG4gICAgICAgICAgY2FzZSBFcnJvclR5cGUuRmF0YWw6XG4gICAgICAgICAgICB0aGlzLnN0YXR1cyA9ICdlcnJvcic7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgY2FzZSBFcnJvclR5cGUuTm90Rm91bmQ6XG4gICAgICAgICAgICB0aGlzLnVybCA9ICcnO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBFcnJvclR5cGUuQXV0aDpcbiAgICAgICAgICAgIGF3YWl0IHRoaXMudXBkYXRlVG9rZW4oKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aGlzLnJlc3BvbnNlU3RhdHVzID49IDQwMCAmJiAodGhpcy5vZmZzZXQgPSB1bmRlZmluZWQpO1xuICAgICAgICAgICAgdGhpcy5zdGF0dXMgPSAncmV0cnknO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5yZXRyeS53YWl0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgaHR0cCByZXF1ZXN0c1xuICAgKi9cbiAgYXN5bmMgcmVxdWVzdChyZXF1ZXN0T3B0aW9uczogUmVxdWVzdE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnJlc3BvbnNlU3RhdHVzID0gMDtcbiAgICB0aGlzLnJlc3BvbnNlID0gbnVsbDtcbiAgICB0aGlzLnJlc3BvbnNlSGVhZGVycyA9IHt9O1xuICAgIGxldCByZXE6IFJlcXVlc3RDb25maWcgPSB7XG4gICAgICBib2R5OiByZXF1ZXN0T3B0aW9ucy5ib2R5IHx8IG51bGwsXG4gICAgICBjYW5jZWxlcjogdGhpcy5jYW5jZWxlcixcbiAgICAgIGhlYWRlcnM6IHsgLi4udGhpcy5oZWFkZXJzLCAuLi5yZXF1ZXN0T3B0aW9ucy5oZWFkZXJzIH0sXG4gICAgICBtZXRob2Q6IHJlcXVlc3RPcHRpb25zLm1ldGhvZCB8fCAnR0VUJyxcbiAgICAgIHVybDogcmVxdWVzdE9wdGlvbnMudXJsIHx8IHRoaXMudXJsXG4gICAgfTtcbiAgICByZXEgPSBhd2FpdCB0aGlzLl9hdXRob3JpemUocmVxLCB0aGlzLl90b2tlbik7XG4gICAgY29uc3QgeyBib2R5ID0gbnVsbCwgaGVhZGVycywgbWV0aG9kLCB1cmwgPSByZXEudXJsIH0gPSAoYXdhaXQgdGhpcy5fcHJlcmVxdWVzdChyZXEpKSB8fCByZXE7XG4gICAgY29uc3QgYWpheFJlcXVlc3RDb25maWc6IEFqYXhSZXF1ZXN0Q29uZmlnID0ge1xuICAgICAgbWV0aG9kLFxuICAgICAgaGVhZGVyczogeyAuLi5yZXEuaGVhZGVycywgLi4uaGVhZGVycyB9LFxuICAgICAgdXJsLFxuICAgICAgZGF0YTogYm9keSxcbiAgICAgIHJlc3BvbnNlVHlwZTogdGhpcy5yZXNwb25zZVR5cGUsXG4gICAgICB3aXRoQ3JlZGVudGlhbHM6ICEhdGhpcy5vcHRpb25zLndpdGhDcmVkZW50aWFscyxcbiAgICAgIGNhbmNlbGVyOiB0aGlzLmNhbmNlbGVyLFxuICAgICAgdmFsaWRhdGVTdGF0dXM6ICgpID0+IHRydWVcbiAgICB9O1xuICAgIGlmIChib2R5ICYmIHR5cGVvZiBib2R5ICE9PSAnc3RyaW5nJykge1xuICAgICAgYWpheFJlcXVlc3RDb25maWcub25VcGxvYWRQcm9ncmVzcyA9IHRoaXMub25Qcm9ncmVzcygpO1xuICAgIH1cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuYWpheC5yZXF1ZXN0KGFqYXhSZXF1ZXN0Q29uZmlnKTtcbiAgICB0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2UuZGF0YTtcbiAgICB0aGlzLnJlc3BvbnNlSGVhZGVycyA9IHJlc3BvbnNlLmhlYWRlcnM7XG4gICAgdGhpcy5yZXNwb25zZVN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID49IDQwMCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhdXRoIHRva2VuIGNhY2hlXG4gICAqL1xuICB1cGRhdGVUb2tlbiA9IGFzeW5jICgpOiBQcm9taXNlPHN0cmluZyB8IHZvaWQ+ID0+IHtcbiAgICB0aGlzLl90b2tlbiA9IGF3YWl0IHVuZnVuYyh0aGlzLnRva2VuIHx8ICcnLCB0aGlzLnJlc3BvbnNlU3RhdHVzKTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0IGZpbGUgVVJJXG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0RmlsZVVybCgpOiBQcm9taXNlPHN0cmluZz47XG5cbiAgLyoqXG4gICAqIFNlbmQgZmlsZSBjb250ZW50IGFuZCByZXR1cm4gYW4gb2Zmc2V0IGZvciB0aGUgbmV4dCByZXF1ZXN0XG4gICAqL1xuICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc2VuZEZpbGVDb250ZW50KCk6IFByb21pc2U8bnVtYmVyIHwgdW5kZWZpbmVkPjtcblxuICAvKipcbiAgICogR2V0IGFuIG9mZnNldCBmb3IgdGhlIG5leHQgcmVxdWVzdFxuICAgKi9cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGdldE9mZnNldCgpOiBQcm9taXNlPG51bWJlciB8IHVuZGVmaW5lZD47XG5cbiAgcHJvdGVjdGVkIGFib3J0KCk6IHZvaWQge1xuICAgIHRoaXMub2Zmc2V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuY2FuY2VsZXIuY2FuY2VsKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXN5bmMgY2FuY2VsKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMuYWJvcnQoKTtcbiAgICBpZiAodGhpcy51cmwpIHtcbiAgICAgIGF3YWl0IHRoaXMucmVxdWVzdCh7IG1ldGhvZDogJ0RFTEVURScgfSkuY2F0Y2goKCkgPT4ge30pO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlQ2hhbmdlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHZhbHVlIGZyb20gdGhlIHJlc3BvbnNlXG4gICAqL1xuICBwcm90ZWN0ZWQgZ2V0VmFsdWVGcm9tUmVzcG9uc2Uoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5yZXNwb25zZUhlYWRlcnNba2V5LnRvTG93ZXJDYXNlKCldIHx8IG51bGw7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0Q2h1bmsoKTogeyBzdGFydDogbnVtYmVyOyBlbmQ6IG51bWJlcjsgYm9keTogQmxvYiB9IHtcbiAgICB0aGlzLmNodW5rU2l6ZSA9IGlzTnVtYmVyKHRoaXMub3B0aW9ucy5jaHVua1NpemUpID8gdGhpcy5jaHVua1NpemUgOiBEeW5hbWljQ2h1bmsuc2l6ZTtcbiAgICBjb25zdCBzdGFydCA9IHRoaXMub2Zmc2V0IHx8IDA7XG4gICAgY29uc3QgZW5kID0gTWF0aC5taW4oc3RhcnQgKyB0aGlzLmNodW5rU2l6ZSwgdGhpcy5zaXplKTtcbiAgICBjb25zdCBib2R5ID0gdGhpcy5maWxlLnNsaWNlKHRoaXMub2Zmc2V0LCBlbmQpO1xuICAgIHJldHVybiB7IHN0YXJ0LCBlbmQsIGJvZHkgfTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYW51cCA9ICgpID0+IHN0b3JlLmRlbGV0ZSh0aGlzLnVwbG9hZElkKTtcblxuICBwcml2YXRlIG9uUHJvZ3Jlc3MoKTogKGV2dDogUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZCB7XG4gICAgbGV0IHRocm90dGxlOiBSZXR1cm5UeXBlPHR5cGVvZiBzZXRUaW1lb3V0PiB8IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gKHsgbG9hZGVkIH0pID0+IHtcbiAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgY29uc3QgdXBsb2FkZWQgPSAodGhpcy5vZmZzZXQgYXMgbnVtYmVyKSArIGxvYWRlZDtcbiAgICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gKG5vdyAtIHRoaXMuc3RhcnRUaW1lKSAvIDEwMDA7XG4gICAgICB0aGlzLnNwZWVkID0gTWF0aC5yb3VuZCh1cGxvYWRlZCAvIGVsYXBzZWRUaW1lKTtcbiAgICAgIER5bmFtaWNDaHVuay5zY2FsZSh0aGlzLnNwZWVkKTtcbiAgICAgIGlmICghdGhyb3R0bGUpIHtcbiAgICAgICAgdGhyb3R0bGUgPSBzZXRUaW1lb3V0KCgpID0+ICh0aHJvdHRsZSA9IHVuZGVmaW5lZCksIDUwMCk7XG4gICAgICAgIHRoaXMucHJvZ3Jlc3MgPSArKCh1cGxvYWRlZCAvIHRoaXMuc2l6ZSkgKiAxMDApLnRvRml4ZWQoMik7XG4gICAgICAgIHRoaXMucmVtYWluaW5nID0gTWF0aC5jZWlsKCh0aGlzLnNpemUgLSB1cGxvYWRlZCkgLyB0aGlzLnNwZWVkKTtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZSh0aGlzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59XG4iXX0=