/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
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
export function resolveUrl(url, base) {
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
export function unfunc(value, ref) {
    return value instanceof Function ? value(ref) : value;
}
/** @type {?} */
export var pick = (/**
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
export function isNumber(x) {
    return x === Number(x);
}
/**
 * 32-bit FNV-1a hash function
 * @param {?} str
 * @return {?}
 */
export function createHash(str) {
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
export var b64 = {
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
            for (var kvPairs_1 = tslib_1.__values(kvPairs), kvPairs_1_1 = kvPairs_1.next(); !kvPairs_1_1.done; kvPairs_1_1 = kvPairs_1.next()) {
                var _b = tslib_1.__read(kvPairs_1_1.value, 2), key = _b[0], value = _b[1];
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
export { DynamicChunk };
if (false) {
    /**
     * Maximum chunk size in bytes
     * @type {?}
     */
    DynamicChunk.maxSize;
    /**
     * Minimum chunk size in bytes
     * @type {?}
     */
    DynamicChunk.minSize;
    /**
     * Initial chunk size in bytes
     * @type {?}
     */
    DynamicChunk.size;
    /** @type {?} */
    DynamicChunk.minChunkTime;
    /** @type {?} */
    DynamicChunk.maxChunkTime;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUlBLFNBQVMsU0FBUyxDQUFDLElBQVksRUFBRSxFQUFVO0lBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUN6QyxDQUFDOzs7Ozs7QUFFRCxNQUFNLFVBQVUsVUFBVSxDQUFDLEdBQVcsRUFBRSxJQUFZO0lBQ2xELElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMxRCxPQUFPLEdBQUcsQ0FBQztLQUNaO0lBQ0QsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMzQixPQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQzVDO0lBQ0QsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMxQixPQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUsa0NBQWtDLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDbEU7SUFDRCxPQUFPLFNBQVMsQ0FBQyxJQUFJLEVBQUUseUNBQXlDLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDMUUsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxNQUFNLENBQU8sS0FBMEIsRUFBRSxHQUFNO0lBQzdELE9BQU8sS0FBSyxZQUFZLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDeEQsQ0FBQzs7QUFFRCxNQUFNLEtBQU8sSUFBSTs7Ozs7O0FBQUcsVUFBdUIsR0FBTSxFQUFFLFNBQWM7O1FBQ3pELE1BQU0sR0FBRyxtQkFBQSxFQUFFLEVBQWM7SUFDL0IsU0FBUyxDQUFDLE9BQU87Ozs7SUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUF4QixDQUF3QixFQUFDLENBQUM7SUFDbkQsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFBOzs7OztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsQ0FBVTtJQUNqQyxPQUFPLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDekIsQ0FBQzs7Ozs7O0FBS0QsTUFBTSxVQUFVLFVBQVUsQ0FBQyxHQUFXOztRQUNoQyxJQUFJLEdBQUcsVUFBVTs7UUFDZixHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU07SUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QixJQUFJLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7S0FDOUU7SUFDRCxPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7QUFDcEIsQ0FBQzs7QUFFRCxNQUFNLEtBQU8sR0FBRyxHQUFHO0lBQ2pCLE1BQU07Ozs7SUFBRSxVQUFDLEdBQVc7UUFDbEIsT0FBQSxJQUFJLENBQ0Ysa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQjs7Ozs7UUFBRSxVQUFDLEtBQUssRUFBRSxFQUFFO1lBQzNELE9BQUEsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUE1QyxDQUE0QyxFQUM3QyxDQUNGO0lBSkQsQ0FJQyxDQUFBO0lBQ0gsTUFBTTs7OztJQUFFLFVBQUMsR0FBVztRQUNsQixPQUFBLGtCQUFrQixDQUNoQixJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ04sS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUNULEdBQUc7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFyRCxDQUFxRCxFQUFDO2FBQy9ELElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDWjtJQUxELENBS0MsQ0FBQTtJQUNILFNBQVM7Ozs7SUFBRSxVQUFDLEdBQTRDO1FBQ3RELE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7YUFDYixHQUFHOzs7O1FBQUMsVUFBQSxHQUFHLElBQUksT0FBRyxHQUFHLFNBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUcsRUFBeEMsQ0FBd0MsRUFBQzthQUNwRCxRQUFRLEVBQUU7SUFGYixDQUVhLENBQUE7SUFFZixLQUFLOzs7O0lBQUUsVUFBQyxPQUFlOzs7WUFDZixPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxFQUFFLElBQUksT0FBQSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFiLENBQWEsRUFBQzs7WUFDckQsT0FBTyxHQUEyQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzs7WUFDM0QsS0FBMkIsSUFBQSxZQUFBLGlCQUFBLE9BQU8sQ0FBQSxnQ0FBQSxxREFBRTtnQkFBekIsSUFBQSx5Q0FBWSxFQUFYLFdBQUcsRUFBRSxhQUFLO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQzs7Ozs7Ozs7O1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQyxDQUFBO0NBQ0Y7Ozs7QUFLRDtJQUFBO0lBb0JBLENBQUM7Ozs7O0lBVlEsa0JBQUs7Ozs7SUFBWixVQUFhLFVBQWtCOztZQUN2QixXQUFXLEdBQUcsWUFBWSxDQUFDLElBQUksR0FBRyxVQUFVO1FBQ2xELElBQUksV0FBVyxHQUFHLFlBQVksQ0FBQyxZQUFZLEVBQUU7WUFDM0MsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMzRTtRQUNELElBQUksV0FBVyxHQUFHLFlBQVksQ0FBQyxZQUFZLEVBQUU7WUFDM0MsWUFBWSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztTQUMzRTtRQUNELE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQztJQUMzQixDQUFDOzs7O0lBakJNLG9CQUFPLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDOzs7O0lBRWxDLG9CQUFPLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQzs7OztJQUVyQixpQkFBSSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7SUFDbEIseUJBQVksR0FBRyxDQUFDLENBQUM7SUFDakIseUJBQVksR0FBRyxDQUFDLENBQUM7SUFZMUIsbUJBQUM7Q0FBQSxBQXBCRCxJQW9CQztTQXBCWSxZQUFZOzs7Ozs7SUFFdkIscUJBQXlDOzs7OztJQUV6QyxxQkFBNEI7Ozs7O0lBRTVCLGtCQUF5Qjs7SUFDekIsMEJBQXdCOztJQUN4QiwwQkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTogbm8tYml0d2lzZVxuXG5pbXBvcnQgeyBQcmltaXRpdmUgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5mdW5jdGlvbiBzYWZlTWF0Y2goYmFzZTogc3RyaW5nLCByZTogUmVnRXhwKTogc3RyaW5nIHtcbiAgcmV0dXJuIChiYXNlLm1hdGNoKHJlKSB8fCBbXSlbMF0gfHwgJyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlVXJsKHVybDogc3RyaW5nLCBiYXNlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAodXJsLmluZGV4T2YoJ2h0dHBzOi8vJykgKiB1cmwuaW5kZXhPZignaHR0cDovLycpID09PSAwKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICBpZiAodXJsLmluZGV4T2YoJy8vJykgPT09IDApIHtcbiAgICByZXR1cm4gc2FmZU1hdGNoKGJhc2UsIC9eKGh0dHBzPzopLykgKyB1cmw7XG4gIH1cbiAgaWYgKHVybC5pbmRleE9mKCcvJykgPT09IDApIHtcbiAgICByZXR1cm4gc2FmZU1hdGNoKGJhc2UsIC9eKD86aHR0cHM/Oik/KD86XFwvXFwvKT8oW15cXC9cXD9dKykvKSArIHVybDtcbiAgfVxuICByZXR1cm4gc2FmZU1hdGNoKGJhc2UsIC9eKD86aHR0cHM/Oik/KD86XFwvXFwvKT8oW15cXC9cXD9dKyk/KC4qXFwvKS8pICsgdXJsO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5mdW5jPFQsIFY+KHZhbHVlOiBUIHwgKChyZWY6IFYpID0+IFQpLCByZWY6IFYpOiBUIHtcbiAgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgRnVuY3Rpb24gPyB2YWx1ZShyZWYpIDogdmFsdWU7XG59XG5cbmV4cG9ydCBjb25zdCBwaWNrID0gPFQsIEsgZXh0ZW5kcyBrZXlvZiBUPihvYmo6IFQsIHdoaXRlbGlzdDogS1tdKTogUGljazxULCBLPiA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9IGFzIFBpY2s8VCwgSz47XG4gIHdoaXRlbGlzdC5mb3JFYWNoKGtleSA9PiAocmVzdWx0W2tleV0gPSBvYmpba2V5XSkpO1xuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyKHg/OiBudW1iZXIpOiB4IGlzIG51bWJlciB7XG4gIHJldHVybiB4ID09PSBOdW1iZXIoeCk7XG59XG5cbi8qKlxuICogMzItYml0IEZOVi0xYSBoYXNoIGZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVIYXNoKHN0cjogc3RyaW5nKTogbnVtYmVyIHtcbiAgbGV0IGhhc2ggPSAyMTY2MTM2MjYxO1xuICBjb25zdCBsZW4gPSBzdHIubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgaGFzaCBePSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICBoYXNoICs9IChoYXNoIDw8IDEpICsgKGhhc2ggPDwgNCkgKyAoaGFzaCA8PCA3KSArIChoYXNoIDw8IDgpICsgKGhhc2ggPDwgMjQpO1xuICB9XG4gIHJldHVybiBoYXNoID4+PiAwO1xufVxuXG5leHBvcnQgY29uc3QgYjY0ID0ge1xuICBlbmNvZGU6IChzdHI6IHN0cmluZykgPT5cbiAgICBidG9hKFxuICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cikucmVwbGFjZSgvJShbMC05QS1GXXsyfSkvZywgKG1hdGNoLCBwMSkgPT5cbiAgICAgICAgU3RyaW5nLmZyb21DaGFyQ29kZShOdW1iZXIucGFyc2VJbnQocDEsIDE2KSlcbiAgICAgIClcbiAgICApLFxuICBkZWNvZGU6IChzdHI6IHN0cmluZykgPT5cbiAgICBkZWNvZGVVUklDb21wb25lbnQoXG4gICAgICBhdG9iKHN0cilcbiAgICAgICAgLnNwbGl0KCcnKVxuICAgICAgICAubWFwKGMgPT4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMikpXG4gICAgICAgIC5qb2luKCcnKVxuICAgICksXG4gIHNlcmlhbGl6ZTogKG9iajogUmVjb3JkPHN0cmluZywgUHJpbWl0aXZlIHwgUHJpbWl0aXZlW10+KSA9PlxuICAgIE9iamVjdC5rZXlzKG9iailcbiAgICAgIC5tYXAoa2V5ID0+IGAke2tleX0gJHtiNjQuZW5jb2RlKFN0cmluZyhvYmpba2V5XSkpfWApXG4gICAgICAudG9TdHJpbmcoKSxcblxuICBwYXJzZTogKGVuY29kZWQ6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IGt2UGFpcnMgPSBlbmNvZGVkLnNwbGl0KCcsJykubWFwKGt2ID0+IGt2LnNwbGl0KCcgJykpO1xuICAgIGNvbnN0IGRlY29kZWQ6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIGt2UGFpcnMpIHtcbiAgICAgIGRlY29kZWRba2V5XSA9IGI2NC5kZWNvZGUodmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlZDtcbiAgfVxufTtcblxuLyoqXG4gKiBBZGFwdGl2ZSBjaHVuayBzaXplXG4gKi9cbmV4cG9ydCBjbGFzcyBEeW5hbWljQ2h1bmsge1xuICAvKiogTWF4aW11bSBjaHVuayBzaXplIGluIGJ5dGVzICovXG4gIHN0YXRpYyBtYXhTaXplID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gIC8qKiBNaW5pbXVtIGNodW5rIHNpemUgaW4gYnl0ZXMgKi9cbiAgc3RhdGljIG1pblNpemUgPSAxMDI0ICogMjU2O1xuICAvKiogSW5pdGlhbCBjaHVuayBzaXplIGluIGJ5dGVzICovXG4gIHN0YXRpYyBzaXplID0gNDA5NiAqIDI1NjtcbiAgc3RhdGljIG1pbkNodW5rVGltZSA9IDI7XG4gIHN0YXRpYyBtYXhDaHVua1RpbWUgPSA4O1xuXG4gIHN0YXRpYyBzY2FsZSh0aHJvdWdocHV0OiBudW1iZXIpOiBudW1iZXIge1xuICAgIGNvbnN0IGVsYXBzZWRUaW1lID0gRHluYW1pY0NodW5rLnNpemUgLyB0aHJvdWdocHV0O1xuICAgIGlmIChlbGFwc2VkVGltZSA8IER5bmFtaWNDaHVuay5taW5DaHVua1RpbWUpIHtcbiAgICAgIER5bmFtaWNDaHVuay5zaXplID0gTWF0aC5taW4oRHluYW1pY0NodW5rLm1heFNpemUsIER5bmFtaWNDaHVuay5zaXplICogMik7XG4gICAgfVxuICAgIGlmIChlbGFwc2VkVGltZSA+IER5bmFtaWNDaHVuay5tYXhDaHVua1RpbWUpIHtcbiAgICAgIER5bmFtaWNDaHVuay5zaXplID0gTWF0aC5tYXgoRHluYW1pY0NodW5rLm1pblNpemUsIER5bmFtaWNDaHVuay5zaXplIC8gMik7XG4gICAgfVxuICAgIHJldHVybiBEeW5hbWljQ2h1bmsuc2l6ZTtcbiAgfVxufVxuIl19