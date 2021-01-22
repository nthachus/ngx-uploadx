/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function RequestConfig() { }
if (false) {
    /** @type {?|undefined} */
    RequestConfig.prototype.body;
    /** @type {?} */
    RequestConfig.prototype.canceler;
    /** @type {?} */
    RequestConfig.prototype.headers;
    /** @type {?} */
    RequestConfig.prototype.method;
    /** @type {?|undefined} */
    RequestConfig.prototype.onUploadProgress;
    /** @type {?|undefined} */
    RequestConfig.prototype.responseType;
    /** @type {?} */
    RequestConfig.prototype.url;
    /** @type {?|undefined} */
    RequestConfig.prototype.validateStatus;
    /** @type {?|undefined} */
    RequestConfig.prototype.withCredentials;
}
/**
 * @record
 */
export function UploadState() { }
if (false) {
    /**
     * Uploaded file
     * @type {?}
     */
    UploadState.prototype.file;
    /**
     * Original file name
     * @type {?}
     */
    UploadState.prototype.name;
    /**
     * Progress percentage
     * @type {?}
     */
    UploadState.prototype.progress;
    /**
     * Estimated remaining time
     * @type {?}
     */
    UploadState.prototype.remaining;
    /**
     * HTTP response body
     * @type {?}
     */
    UploadState.prototype.response;
    /**
     * HTTP response status code
     * @type {?}
     */
    UploadState.prototype.responseStatus;
    /**
     * HTTP response headers
     * @type {?}
     */
    UploadState.prototype.responseHeaders;
    /**
     * File size in bytes
     * @type {?}
     */
    UploadState.prototype.size;
    /**
     * Upload speed bytes/sec
     * @type {?}
     */
    UploadState.prototype.speed;
    /**
     * Upload status
     * @type {?}
     */
    UploadState.prototype.status;
    /**
     * Unique upload id
     * @type {?}
     */
    UploadState.prototype.uploadId;
    /**
     * File url
     * @type {?}
     */
    UploadState.prototype.url;
}
/**
 * @record
 */
function UploadItem() { }
if (false) {
    /**
     * URL to create new uploads.
     * \@defaultValue '/upload'
     * @type {?|undefined}
     */
    UploadItem.prototype.endpoint;
    /**
     * Headers to be appended to each HTTP request
     * @type {?|undefined}
     */
    UploadItem.prototype.headers;
    /**
     * Custom uploads metadata
     * @type {?|undefined}
     */
    UploadItem.prototype.metadata;
    /**
     * Authorization  token as a `string` or function returning a `string` or `Promise<string>`
     * @type {?|undefined}
     */
    UploadItem.prototype.token;
}
/**
 * @record
 */
export function UploadxControlEvent() { }
if (false) {
    /** @type {?|undefined} */
    UploadxControlEvent.prototype.uploadId;
    /** @type {?|undefined} */
    UploadxControlEvent.prototype.action;
}
/**
 * @record
 */
export function UploaderOptions() { }
if (false) {
    /** @type {?|undefined} */
    UploaderOptions.prototype.retryConfig;
    /**
     * Set a fixed chunk size.
     * If not specified, the optimal size will be automatically adjusted based on the network speed.
     * @type {?|undefined}
     */
    UploaderOptions.prototype.chunkSize;
    /** @type {?|undefined} */
    UploaderOptions.prototype.withCredentials;
    /**
     * Function called before every request
     * @type {?|undefined}
     */
    UploaderOptions.prototype.prerequest;
    /**
     * Function used to apply authorization token
     * @type {?|undefined}
     */
    UploaderOptions.prototype.authorize;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJmYWNlcy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11cGxvYWR4LyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWNBLG1DQVVDOzs7SUFUQyw2QkFBdUI7O0lBQ3ZCLGlDQUFtQjs7SUFDbkIsZ0NBQXdCOztJQUN4QiwrQkFBeUU7O0lBQ3pFLHlDQUFnRDs7SUFDaEQscUNBQXFFOztJQUNyRSw0QkFBWTs7SUFDWix1Q0FBNkM7O0lBQzdDLHdDQUEwQjs7Ozs7QUF1QjVCLGlDQW9DQzs7Ozs7O0lBbENDLDJCQUFvQjs7Ozs7SUFHcEIsMkJBQXNCOzs7OztJQUd0QiwrQkFBMEI7Ozs7O0lBRzFCLGdDQUEyQjs7Ozs7SUFHM0IsK0JBQWdDOzs7OztJQUdoQyxxQ0FBZ0M7Ozs7O0lBR2hDLHNDQUFpRDs7Ozs7SUFHakQsMkJBQXNCOzs7OztJQUd0Qiw0QkFBdUI7Ozs7O0lBR3ZCLDZCQUE4Qjs7Ozs7SUFHOUIsK0JBQTBCOzs7OztJQUcxQiwwQkFBcUI7Ozs7O0FBR3ZCLHlCQWtCQzs7Ozs7OztJQWJDLDhCQUFrQjs7Ozs7SUFJbEIsNkJBQTREOzs7OztJQUk1RCw4QkFBaUQ7Ozs7O0lBSWpELDJCQUFvRTs7Ozs7QUFHdEUseUNBR0M7OztJQUZDLHVDQUEyQjs7SUFDM0IscUNBQXNCOzs7OztBQUd4QixxQ0FnQkM7OztJQWZDLHNDQUEwQjs7Ozs7O0lBSzFCLG9DQUFtQjs7SUFDbkIsMENBQTBCOzs7OztJQUkxQixxQ0FBd0I7Ozs7O0lBSXhCLG9DQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFqYXggfSBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IHsgQ2FuY2VsZXIgfSBmcm9tICcuL2NhbmNlbGVyJztcbmltcG9ydCB7IFJldHJ5Q29uZmlnIH0gZnJvbSAnLi9yZXRyeS1oYW5kbGVyJztcbmltcG9ydCB7IFVwbG9hZGVyIH0gZnJvbSAnLi91cGxvYWRlcic7XG5cbmV4cG9ydCB0eXBlIFByaW1pdGl2ZSA9IG51bGwgfCBib29sZWFuIHwgbnVtYmVyIHwgc3RyaW5nO1xuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG5leHBvcnQgdHlwZSBSZXNwb25zZUJvZHkgPSBhbnk7XG5cbmV4cG9ydCB0eXBlIFJlcXVlc3RIZWFkZXJzID0gUmVjb3JkPHN0cmluZywgUHJpbWl0aXZlIHwgUHJpbWl0aXZlW10+O1xuXG5leHBvcnQgdHlwZSBNZXRhZGF0YSA9IFJlY29yZDxzdHJpbmcsIFByaW1pdGl2ZSB8IFByaW1pdGl2ZVtdPjtcblxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0Q29uZmlnIHtcbiAgYm9keT86IEJvZHlJbml0IHwgbnVsbDtcbiAgY2FuY2VsZXI6IENhbmNlbGVyO1xuICBoZWFkZXJzOiBSZXF1ZXN0SGVhZGVycztcbiAgbWV0aG9kOiAnR0VUJyB8ICdQT1NUJyB8ICdQVVQnIHwgJ0RFTEVURScgfCAnUEFUQ0gnIHwgJ0hFQUQnIHwgJ09QVElPTlMnO1xuICBvblVwbG9hZFByb2dyZXNzPzogKGV2dDogUHJvZ3Jlc3NFdmVudCkgPT4gdm9pZDtcbiAgcmVzcG9uc2VUeXBlPzogJ2FycmF5YnVmZmVyJyB8ICdibG9iJyB8ICdkb2N1bWVudCcgfCAnanNvbicgfCAndGV4dCc7XG4gIHVybDogc3RyaW5nO1xuICB2YWxpZGF0ZVN0YXR1cz86IChzdGF0dXM6IG51bWJlcikgPT4gYm9vbGVhbjtcbiAgd2l0aENyZWRlbnRpYWxzPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgUmVxdWVzdE9wdGlvbnMgPSBQYXJ0aWFsPFJlcXVlc3RDb25maWc+O1xuZXhwb3J0IHR5cGUgQXV0aG9yaXplUmVxdWVzdCA9IChcbiAgcmVxOiBSZXF1ZXN0Q29uZmlnLFxuICB0b2tlbj86IHN0cmluZ1xuKSA9PiBSZXF1ZXN0Q29uZmlnIHwgUHJvbWlzZTxSZXF1ZXN0Q29uZmlnPjtcblxuZXhwb3J0IHR5cGUgUHJlUmVxdWVzdCA9IChyZXE6IFJlcXVlc3RDb25maWcpID0+IFByb21pc2U8UmVxdWVzdE9wdGlvbnM+IHwgUmVxdWVzdE9wdGlvbnMgfCB2b2lkO1xuXG5leHBvcnQgdHlwZSBVcGxvYWRTdGF0dXMgPVxuICB8ICdhZGRlZCdcbiAgfCAncXVldWUnXG4gIHwgJ3VwbG9hZGluZydcbiAgfCAnY29tcGxldGUnXG4gIHwgJ2Vycm9yJ1xuICB8ICdjYW5jZWxsZWQnXG4gIHwgJ3BhdXNlZCdcbiAgfCAncmV0cnknO1xuXG5leHBvcnQgdHlwZSBVcGxvYWRBY3Rpb24gPSAndXBsb2FkJyB8ICdjYW5jZWwnIHwgJ3BhdXNlJztcblxuZXhwb3J0IGludGVyZmFjZSBVcGxvYWRTdGF0ZSB7XG4gIC8qKiBVcGxvYWRlZCBmaWxlICovXG4gIHJlYWRvbmx5IGZpbGU6IEZpbGU7XG5cbiAgLyoqIE9yaWdpbmFsIGZpbGUgbmFtZSAqL1xuICByZWFkb25seSBuYW1lOiBzdHJpbmc7XG5cbiAgLyoqIFByb2dyZXNzIHBlcmNlbnRhZ2UgKi9cbiAgcmVhZG9ubHkgcHJvZ3Jlc3M6IG51bWJlcjtcblxuICAvKiogRXN0aW1hdGVkIHJlbWFpbmluZyB0aW1lICovXG4gIHJlYWRvbmx5IHJlbWFpbmluZzogbnVtYmVyO1xuXG4gIC8qKiBIVFRQIHJlc3BvbnNlIGJvZHkgKi9cbiAgcmVhZG9ubHkgcmVzcG9uc2U6IFJlc3BvbnNlQm9keTtcblxuICAvKiogSFRUUCByZXNwb25zZSBzdGF0dXMgY29kZSAqL1xuICByZWFkb25seSByZXNwb25zZVN0YXR1czogbnVtYmVyO1xuXG4gIC8qKiBIVFRQIHJlc3BvbnNlIGhlYWRlcnMgKi9cbiAgcmVhZG9ubHkgcmVzcG9uc2VIZWFkZXJzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xuXG4gIC8qKiBGaWxlIHNpemUgaW4gYnl0ZXMgKi9cbiAgcmVhZG9ubHkgc2l6ZTogbnVtYmVyO1xuXG4gIC8qKiBVcGxvYWQgc3BlZWQgYnl0ZXMvc2VjICovXG4gIHJlYWRvbmx5IHNwZWVkOiBudW1iZXI7XG5cbiAgLyoqIFVwbG9hZCBzdGF0dXMgKi9cbiAgcmVhZG9ubHkgc3RhdHVzOiBVcGxvYWRTdGF0dXM7XG5cbiAgLyoqIFVuaXF1ZSB1cGxvYWQgaWQgKi9cbiAgcmVhZG9ubHkgdXBsb2FkSWQ6IHN0cmluZztcblxuICAvKiogRmlsZSB1cmwgKi9cbiAgcmVhZG9ubHkgdXJsOiBzdHJpbmc7XG59XG5cbmludGVyZmFjZSBVcGxvYWRJdGVtIHtcbiAgLyoqXG4gICAqIFVSTCB0byBjcmVhdGUgbmV3IHVwbG9hZHMuXG4gICAqIEBkZWZhdWx0VmFsdWUgJy91cGxvYWQnXG4gICAqL1xuICBlbmRwb2ludD86IHN0cmluZztcbiAgLyoqXG4gICAqIEhlYWRlcnMgdG8gYmUgYXBwZW5kZWQgdG8gZWFjaCBIVFRQIHJlcXVlc3RcbiAgICovXG4gIGhlYWRlcnM/OiBSZXF1ZXN0SGVhZGVycyB8ICgoZmlsZTogRmlsZSkgPT4gUmVxdWVzdEhlYWRlcnMpO1xuICAvKipcbiAgICogQ3VzdG9tIHVwbG9hZHMgbWV0YWRhdGFcbiAgICovXG4gIG1ldGFkYXRhPzogTWV0YWRhdGEgfCAoKGZpbGU6IEZpbGUpID0+IE1ldGFkYXRhKTtcbiAgLyoqXG4gICAqIEF1dGhvcml6YXRpb24gIHRva2VuIGFzIGEgYHN0cmluZ2Agb3IgZnVuY3Rpb24gcmV0dXJuaW5nIGEgYHN0cmluZ2Agb3IgYFByb21pc2U8c3RyaW5nPmBcbiAgICovXG4gIHRva2VuPzogc3RyaW5nIHwgKChodHRwU3RhdHVzOiBudW1iZXIpID0+IHN0cmluZyB8IFByb21pc2U8c3RyaW5nPik7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBsb2FkeENvbnRyb2xFdmVudCBleHRlbmRzIFVwbG9hZEl0ZW0ge1xuICByZWFkb25seSB1cGxvYWRJZD86IHN0cmluZztcbiAgYWN0aW9uPzogVXBsb2FkQWN0aW9uO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVwbG9hZGVyT3B0aW9ucyBleHRlbmRzIFVwbG9hZEl0ZW0ge1xuICByZXRyeUNvbmZpZz86IFJldHJ5Q29uZmlnO1xuICAvKipcbiAgICogU2V0IGEgZml4ZWQgY2h1bmsgc2l6ZS5cbiAgICogSWYgbm90IHNwZWNpZmllZCwgdGhlIG9wdGltYWwgc2l6ZSB3aWxsIGJlIGF1dG9tYXRpY2FsbHkgYWRqdXN0ZWQgYmFzZWQgb24gdGhlIG5ldHdvcmsgc3BlZWQuXG4gICAqL1xuICBjaHVua1NpemU/OiBudW1iZXI7XG4gIHdpdGhDcmVkZW50aWFscz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBGdW5jdGlvbiBjYWxsZWQgYmVmb3JlIGV2ZXJ5IHJlcXVlc3RcbiAgICovXG4gIHByZXJlcXVlc3Q/OiBQcmVSZXF1ZXN0O1xuICAvKipcbiAgICogRnVuY3Rpb24gdXNlZCB0byBhcHBseSBhdXRob3JpemF0aW9uIHRva2VuXG4gICAqL1xuICBhdXRob3JpemU/OiBBdXRob3JpemVSZXF1ZXN0O1xufVxuXG5leHBvcnQgdHlwZSBVcGxvYWRlckNsYXNzID0gbmV3IChcbiAgZmlsZTogRmlsZSxcbiAgb3B0aW9uczogVXBsb2FkZXJPcHRpb25zLFxuICBzdGF0ZUNoYW5nZTogKGV2dDogVXBsb2FkU3RhdGUpID0+IHZvaWQsXG4gIGFqYXg6IEFqYXhcbikgPT4gVXBsb2FkZXI7XG5cbmV4cG9ydCB0eXBlIFdyaXRhYmxlPFQ+ID0geyAtcmVhZG9ubHkgW0sgaW4ga2V5b2YgVF06IFRbS10gfTtcbiJdfQ==