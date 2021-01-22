/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { InjectionToken } from '@angular/core';
/**
 * @record
 */
export function AjaxRequestConfig() { }
if (false) {
    /** @type {?|undefined} */
    AjaxRequestConfig.prototype.data;
    /** @type {?} */
    AjaxRequestConfig.prototype.url;
    /* Skipping unhandled member: [x: string]: any;*/
}
/**
 * @record
 * @template T
 */
export function AjaxResponse() { }
if (false) {
    /** @type {?} */
    AjaxResponse.prototype.data;
    /** @type {?} */
    AjaxResponse.prototype.status;
    /** @type {?} */
    AjaxResponse.prototype.headers;
}
/**
 * @record
 */
export function Ajax() { }
if (false) {
    /** @type {?} */
    Ajax.prototype.request;
}
/**
 * @return {?}
 */
function createXhr() {
    return new XMLHttpRequest();
}
/**
 * @param {?} xhr
 * @return {?}
 */
function releaseXhr(xhr) {
    xhr = null;
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
                    releaseXhr(xhr);
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
                    releaseXhr(xhr);
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
            var _a = tslib_1.__read(current.split(': '), 2), name = _a[0], value = _a[1];
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
export { UploadxAjax };
if (false) {
    /** @type {?} */
    UploadxAjax.prototype.request;
    /**
     * @type {?}
     * @private
     */
    UploadxAjax.prototype.buildXhr;
}
/** @type {?} */
export var UPLOADX_AJAX = new InjectionToken('uploadx.ajax', {
    factory: (/**
     * @return {?}
     */
    function () { return new UploadxAjax(createXhr); }),
    providedIn: 'root'
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWpheC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11cGxvYWR4LyIsInNvdXJjZXMiOlsibGliL2FqYXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7O0FBRy9DLHVDQU1DOzs7SUFGQyxpQ0FBdUI7O0lBQ3ZCLGdDQUFZOzs7Ozs7O0FBR2Qsa0NBSUM7OztJQUhDLDRCQUFROztJQUNSLDhCQUFlOztJQUNmLCtCQUFnQzs7Ozs7QUFHbEMsMEJBRUM7OztJQURDLHVCQUE2RTs7Ozs7QUFHL0UsU0FBUyxTQUFTO0lBQ2hCLE9BQU8sSUFBSSxjQUFjLEVBQUUsQ0FBQztBQUM5QixDQUFDOzs7OztBQUVELFNBQVMsVUFBVSxDQUFDLEdBQVk7SUFDOUIsR0FBRyxHQUFHLElBQUksQ0FBQztBQUNiLENBQUM7QUFFRDtJQUNFLHFCQUFvQixRQUE4QjtRQUFsRCxpQkFBc0Q7UUFBbEMsYUFBUSxHQUFSLFFBQVEsQ0FBc0I7UUFFbEQsWUFBTzs7Ozs7UUFBRyxVQUFhLEVBVUg7Z0JBVGxCLGNBQWMsRUFBZCxtQ0FBYyxFQUNkLFlBQVcsRUFBWCxnQ0FBVyxFQUNYLGVBQVksRUFBWixpQ0FBWSxFQUNaLFlBQUcsRUFDSCw4QkFBWSxFQUNaLHNCQUFRLEVBQ1Isc0NBQWdCLEVBQ2hCLHVCQUF1QixFQUF2Qiw0Q0FBdUIsRUFDdkIsc0JBQXdELEVBQXhEOzs7OzZFQUF3RDs7Z0JBRWxELEdBQUcsR0FBRyxLQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNCLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFROzs7WUFBRyxjQUFNLE9BQUEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLEVBQWpELENBQWlELENBQUEsQ0FBQyxDQUFDO1lBQzFGLE9BQU8sSUFBSSxPQUFPOzs7OztZQUFDLFVBQUMsT0FBTyxFQUFF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QUFJLENBQUMsQ0FBQzthQUN6QjtZQUFDLFdBQU0sR0FBRTtTQUNYO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBMURELElBMERDOzs7O0lBdkRDLDhCQW1DRTs7Ozs7SUFyQ1UsK0JBQXNDOzs7QUEyRHBELE1BQU0sS0FBTyxZQUFZLEdBQXlCLElBQUksY0FBYyxDQUFDLGNBQWMsRUFBRTtJQUNuRixPQUFPOzs7SUFBRSxjQUFNLE9BQUEsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQTFCLENBQTBCLENBQUE7SUFDekMsVUFBVSxFQUFFLE1BQU07Q0FDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpheFJlcXVlc3RDb25maWcgZXh0ZW5kcyBSZXF1ZXN0T3B0aW9ucyB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgW3g6IHN0cmluZ106IGFueTtcblxuICBkYXRhPzogQm9keUluaXQgfCBudWxsO1xuICB1cmw6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBamF4UmVzcG9uc2U8VD4ge1xuICBkYXRhOiBUO1xuICBzdGF0dXM6IG51bWJlcjtcbiAgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBamF4IHtcbiAgcmVxdWVzdDogPFQgPSBzdHJpbmc+KGNvbmZpZzogQWpheFJlcXVlc3RDb25maWcpID0+IFByb21pc2U8QWpheFJlc3BvbnNlPFQ+Pjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlWGhyKCk6IFhNTEh0dHBSZXF1ZXN0IHtcbiAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufVxuXG5mdW5jdGlvbiByZWxlYXNlWGhyKHhocjogdW5rbm93bik6IHZvaWQge1xuICB4aHIgPSBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgVXBsb2FkeEFqYXgge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1aWxkWGhyOiAoKSA9PiBYTUxIdHRwUmVxdWVzdCkge31cblxuICByZXF1ZXN0ID0gPFQgPSBzdHJpbmc+KHtcbiAgICBtZXRob2QgPSAnR0VUJyxcbiAgICBkYXRhID0gbnVsbCxcbiAgICBoZWFkZXJzID0ge30sXG4gICAgdXJsLFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBjYW5jZWxlcixcbiAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgIHdpdGhDcmVkZW50aWFscyA9IGZhbHNlLFxuICAgIHZhbGlkYXRlU3RhdHVzID0gc3RhdHVzID0+IHN0YXR1cyA8IDQwMCAmJiBzdGF0dXMgPj0gMjAwXG4gIH06IEFqYXhSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBamF4UmVzcG9uc2U8VD4+ID0+IHtcbiAgICBjb25zdCB4aHIgPSB0aGlzLmJ1aWxkWGhyKCk7XG4gICAgY2FuY2VsZXIgJiYgKGNhbmNlbGVyLm9uQ2FuY2VsID0gKCkgPT4geGhyICYmIHhoci5yZWFkeVN0YXRlICE9PSB4aHIuRE9ORSAmJiB4aHIuYWJvcnQoKSk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcbiAgICAgIHdpdGhDcmVkZW50aWFscyAmJiAoeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWUpO1xuICAgICAgcmVzcG9uc2VUeXBlICYmICh4aHIucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlKTtcbiAgICAgIHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nICYmICFoZWFkZXJzLkFjY2VwdCAmJiAoaGVhZGVycy5BY2NlcHQgPSAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaChrZXkgPT4geGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBTdHJpbmcoaGVhZGVyc1trZXldKSkpO1xuICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gb25VcGxvYWRQcm9ncmVzcyB8fCBudWxsO1xuICAgICAgeGhyLm9uZXJyb3IgPSB4aHIub250aW1lb3V0ID0geGhyLm9uYWJvcnQgPSBldnQgPT4ge1xuICAgICAgICByZWxlYXNlWGhyKHhocik7XG4gICAgICAgIHJldHVybiByZWplY3QoeyBlcnJvcjogZXZ0LnR5cGUsIHVybCwgbWV0aG9kIH0pO1xuICAgICAgfTtcbiAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0UmVzcG9uc2VCb2R5PFQ+KHhociwgcmVzcG9uc2VUeXBlID09PSAnanNvbicpLFxuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBoZWFkZXJzOiB0aGlzLmdldFJlc3BvbnNlSGVhZGVycyh4aHIpXG4gICAgICAgIH07XG4gICAgICAgIHJlbGVhc2VYaHIoeGhyKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykgPyByZXNvbHZlKHJlc3BvbnNlKSA6IHJlamVjdChyZXNwb25zZSk7XG4gICAgICB9O1xuICAgICAgeGhyLnNlbmQoZGF0YSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZ2V0UmVzcG9uc2VIZWFkZXJzKHhocjogWE1MSHR0cFJlcXVlc3QpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICBjb25zdCByb3dzID0geGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnNwbGl0KC9bXFxyXFxuXSsvKTtcbiAgICByZXR1cm4gcm93cy5yZWR1Y2UoKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIGN1cnJlbnQpID0+IHtcbiAgICAgIGNvbnN0IFtuYW1lLCB2YWx1ZV0gPSBjdXJyZW50LnNwbGl0KCc6ICcpO1xuICAgICAgbmFtZSAmJiAoaGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gdmFsdWUpO1xuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfSwge30pO1xuICB9XG5cbiAgZ2V0UmVzcG9uc2VCb2R5PFQgPSBzdHJpbmc+KHhocjogWE1MSHR0cFJlcXVlc3QsIGpzb24/OiBib29sZWFuKTogVCB7XG4gICAgbGV0IGJvZHkgPSAncmVzcG9uc2UnIGluICh4aHIgYXMgWE1MSHR0cFJlcXVlc3QpID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICBpZiAoYm9keSAmJiBqc29uICYmIHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICB9IGNhdGNoIHt9XG4gICAgfVxuICAgIHJldHVybiBib2R5O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBVUExPQURYX0FKQVg6IEluamVjdGlvblRva2VuPEFqYXg+ID0gbmV3IEluamVjdGlvblRva2VuKCd1cGxvYWR4LmFqYXgnLCB7XG4gIGZhY3Rvcnk6ICgpID0+IG5ldyBVcGxvYWR4QWpheChjcmVhdGVYaHIpLFxuICBwcm92aWRlZEluOiAncm9vdCdcbn0pO1xuIl19