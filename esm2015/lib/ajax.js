/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class UploadxAjax {
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
                    releaseXhr(xhr);
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
export const UPLOADX_AJAX = new InjectionToken('uploadx.ajax', {
    factory: (/**
     * @return {?}
     */
    () => new UploadxAjax(createXhr)),
    providedIn: 'root'
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWpheC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11cGxvYWR4LyIsInNvdXJjZXMiOlsibGliL2FqYXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7QUFHL0MsdUNBTUM7OztJQUZDLGlDQUF1Qjs7SUFDdkIsZ0NBQVk7Ozs7Ozs7QUFHZCxrQ0FJQzs7O0lBSEMsNEJBQVE7O0lBQ1IsOEJBQWU7O0lBQ2YsK0JBQWdDOzs7OztBQUdsQywwQkFFQzs7O0lBREMsdUJBQTZFOzs7OztBQUcvRSxTQUFTLFNBQVM7SUFDaEIsT0FBTyxJQUFJLGNBQWMsRUFBRSxDQUFDO0FBQzlCLENBQUM7Ozs7O0FBRUQsU0FBUyxVQUFVLENBQUMsR0FBWTtJQUM5QixHQUFHLEdBQUcsSUFBSSxDQUFDO0FBQ2IsQ0FBQztBQUVELE1BQU0sT0FBTyxXQUFXOzs7O0lBQ3RCLFlBQW9CLFFBQThCO1FBQTlCLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBRWxELFlBQU87Ozs7O1FBQUcsQ0FBYSxFQUNyQixNQUFNLEdBQUcsS0FBSyxFQUNkLElBQUksR0FBRyxJQUFJLEVBQ1gsT0FBTyxHQUFHLEVBQUUsRUFDWixHQUFHLEVBQ0gsWUFBWSxFQUNaLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsZUFBZSxHQUFHLEtBQUssRUFDdkIsY0FBYzs7OztRQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxNQUFNLElBQUksR0FBRyxDQUFBLEVBQ3RDLEVBQTRCLEVBQUU7O2tCQUMxQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMzQixRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUTs7O1lBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUEsQ0FBQyxD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QUksS0FBSyxRQUFRLEVBQUU7WUFDNUMsSUFBSTtnQkFDRixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6QjtZQUFDLFdBQU0sR0FBRTtTQUNYO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7OztJQXZEQyw4QkFtQ0U7Ozs7O0lBckNVLCtCQUFzQzs7O0FBMkRwRCxNQUFNLE9BQU8sWUFBWSxHQUF5QixJQUFJLGNBQWMsQ0FBQyxjQUFjLEVBQUU7SUFDbkYsT0FBTzs7O0lBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDekMsVUFBVSxFQUFFLE1BQU07Q0FDbkIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGlvblRva2VuIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpheFJlcXVlc3RDb25maWcgZXh0ZW5kcyBSZXF1ZXN0T3B0aW9ucyB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgW3g6IHN0cmluZ106IGFueTtcblxuICBkYXRhPzogQm9keUluaXQgfCBudWxsO1xuICB1cmw6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBamF4UmVzcG9uc2U8VD4ge1xuICBkYXRhOiBUO1xuICBzdGF0dXM6IG51bWJlcjtcbiAgaGVhZGVyczogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBamF4IHtcbiAgcmVxdWVzdDogPFQgPSBzdHJpbmc+KGNvbmZpZzogQWpheFJlcXVlc3RDb25maWcpID0+IFByb21pc2U8QWpheFJlc3BvbnNlPFQ+Pjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlWGhyKCk6IFhNTEh0dHBSZXF1ZXN0IHtcbiAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufVxuXG5mdW5jdGlvbiByZWxlYXNlWGhyKHhocjogdW5rbm93bik6IHZvaWQge1xuICB4aHIgPSBudWxsO1xufVxuXG5leHBvcnQgY2xhc3MgVXBsb2FkeEFqYXgge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGJ1aWxkWGhyOiAoKSA9PiBYTUxIdHRwUmVxdWVzdCkge31cblxuICByZXF1ZXN0ID0gPFQgPSBzdHJpbmc+KHtcbiAgICBtZXRob2QgPSAnR0VUJyxcbiAgICBkYXRhID0gbnVsbCxcbiAgICBoZWFkZXJzID0ge30sXG4gICAgdXJsLFxuICAgIHJlc3BvbnNlVHlwZSxcbiAgICBjYW5jZWxlcixcbiAgICBvblVwbG9hZFByb2dyZXNzLFxuICAgIHdpdGhDcmVkZW50aWFscyA9IGZhbHNlLFxuICAgIHZhbGlkYXRlU3RhdHVzID0gc3RhdHVzID0+IHN0YXR1cyA8IDQwMCAmJiBzdGF0dXMgPj0gMjAwXG4gIH06IEFqYXhSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBamF4UmVzcG9uc2U8VD4+ID0+IHtcbiAgICBjb25zdCB4aHIgPSB0aGlzLmJ1aWxkWGhyKCk7XG4gICAgY2FuY2VsZXIgJiYgKGNhbmNlbGVyLm9uQ2FuY2VsID0gKCkgPT4geGhyICYmIHhoci5yZWFkeVN0YXRlICE9PSB4aHIuRE9ORSAmJiB4aHIuYWJvcnQoKSk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcbiAgICAgIHdpdGhDcmVkZW50aWFscyAmJiAoeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWUpO1xuICAgICAgcmVzcG9uc2VUeXBlICYmICh4aHIucmVzcG9uc2VUeXBlID0gcmVzcG9uc2VUeXBlKTtcbiAgICAgIHJlc3BvbnNlVHlwZSA9PT0gJ2pzb24nICYmICFoZWFkZXJzLkFjY2VwdCAmJiAoaGVhZGVycy5BY2NlcHQgPSAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgT2JqZWN0LmtleXMoaGVhZGVycykuZm9yRWFjaChrZXkgPT4geGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBTdHJpbmcoaGVhZGVyc1trZXldKSkpO1xuICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gb25VcGxvYWRQcm9ncmVzcyB8fCBudWxsO1xuICAgICAgeGhyLm9uZXJyb3IgPSB4aHIub250aW1lb3V0ID0geGhyLm9uYWJvcnQgPSBldnQgPT4ge1xuICAgICAgICByZWxlYXNlWGhyKHhocik7XG4gICAgICAgIHJldHVybiByZWplY3QoeyBlcnJvcjogZXZ0LnR5cGUsIHVybCwgbWV0aG9kIH0pO1xuICAgICAgfTtcbiAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0ge1xuICAgICAgICAgIGRhdGE6IHRoaXMuZ2V0UmVzcG9uc2VCb2R5PFQ+KHhociwgcmVzcG9uc2VUeXBlID09PSAnanNvbicpLFxuICAgICAgICAgIHN0YXR1czogeGhyLnN0YXR1cyxcbiAgICAgICAgICBoZWFkZXJzOiB0aGlzLmdldFJlc3BvbnNlSGVhZGVycyh4aHIpXG4gICAgICAgIH07XG4gICAgICAgIHJlbGVhc2VYaHIoeGhyKTtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykgPyByZXNvbHZlKHJlc3BvbnNlKSA6IHJlamVjdChyZXNwb25zZSk7XG4gICAgICB9O1xuICAgICAgeGhyLnNlbmQoZGF0YSk7XG4gICAgfSk7XG4gIH07XG5cbiAgZ2V0UmVzcG9uc2VIZWFkZXJzKHhocjogWE1MSHR0cFJlcXVlc3QpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+IHtcbiAgICBjb25zdCByb3dzID0geGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpLnNwbGl0KC9bXFxyXFxuXSsvKTtcbiAgICByZXR1cm4gcm93cy5yZWR1Y2UoKGhlYWRlcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIGN1cnJlbnQpID0+IHtcbiAgICAgIGNvbnN0IFtuYW1lLCB2YWx1ZV0gPSBjdXJyZW50LnNwbGl0KCc6ICcpO1xuICAgICAgbmFtZSAmJiAoaGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gdmFsdWUpO1xuICAgICAgcmV0dXJuIGhlYWRlcnM7XG4gICAgfSwge30pO1xuICB9XG5cbiAgZ2V0UmVzcG9uc2VCb2R5PFQgPSBzdHJpbmc+KHhocjogWE1MSHR0cFJlcXVlc3QsIGpzb24/OiBib29sZWFuKTogVCB7XG4gICAgbGV0IGJvZHkgPSAncmVzcG9uc2UnIGluICh4aHIgYXMgWE1MSHR0cFJlcXVlc3QpID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dDtcbiAgICBpZiAoYm9keSAmJiBqc29uICYmIHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSk7XG4gICAgICB9IGNhdGNoIHt9XG4gICAgfVxuICAgIHJldHVybiBib2R5O1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBVUExPQURYX0FKQVg6IEluamVjdGlvblRva2VuPEFqYXg+ID0gbmV3IEluamVjdGlvblRva2VuKCd1cGxvYWR4LmFqYXgnLCB7XG4gIGZhY3Rvcnk6ICgpID0+IG5ldyBVcGxvYWR4QWpheChjcmVhdGVYaHIpLFxuICBwcm92aWRlZEluOiAncm9vdCdcbn0pO1xuIl19