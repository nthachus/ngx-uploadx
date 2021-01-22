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
export const pick = (/**
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
export const b64 = {
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
export class DynamicChunk {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBSUEsU0FBUyxTQUFTLENBQUMsSUFBWSxFQUFFLEVBQVU7SUFDekMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3pDLENBQUM7Ozs7OztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsR0FBVyxFQUFFLElBQVk7SUFDbEQsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzFELE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFDRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzNCLE9BQU8sU0FBUyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDNUM7SUFDRCxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQzFCLE9BQU8sU0FBUyxDQUFDLElBQUksRUFBRSxrQ0FBa0MsQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUNsRTtJQUNELE9BQU8sU0FBUyxDQUFDLElBQUksRUFBRSx5Q0FBeUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMxRSxDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLE1BQU0sQ0FBTyxLQUEwQixFQUFFLEdBQU07SUFDN0QsT0FBTyxLQUFLLFlBQVksUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUN4RCxDQUFDOztBQUVELE1BQU0sT0FBTyxJQUFJOzs7Ozs7QUFB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TUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQyxDQUFBO0NBQ0Y7Ozs7QUFLRCxNQUFNLE9BQU8sWUFBWTs7Ozs7SUFVdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFrQjs7Y0FDdkIsV0FBVyxHQUFHLFlBQVksQ0FBQyxJQUFJLEdBQUcsVUFBVTtRQUNsRCxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQzNDLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0U7UUFDRCxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQzNDLFlBQVksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQVksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDM0U7UUFDRCxPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDM0IsQ0FBQzs7Ozs7QUFqQk0sb0JBQU8sR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7Ozs7QUFFbEMsb0JBQU8sR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDOzs7O0FBRXJCLGlCQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNsQix5QkFBWSxHQUFHLENBQUMsQ0FBQztBQUNqQix5QkFBWSxHQUFHLENBQUMsQ0FBQzs7Ozs7O0lBTnhCLHFCQUF5Qzs7Ozs7SUFFekMscUJBQTRCOzs7OztJQUU1QixrQkFBeUI7O0lBQ3pCLDBCQUF3Qjs7SUFDeEIsMEJBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6IG5vLWJpdHdpc2VcblxuaW1wb3J0IHsgUHJpbWl0aXZlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuZnVuY3Rpb24gc2FmZU1hdGNoKGJhc2U6IHN0cmluZywgcmU6IFJlZ0V4cCk6IHN0cmluZyB7XG4gIHJldHVybiAoYmFzZS5tYXRjaChyZSkgfHwgW10pWzBdIHx8ICcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZVVybCh1cmw6IHN0cmluZywgYmFzZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgaWYgKHVybC5pbmRleE9mKCdodHRwczovLycpICogdXJsLmluZGV4T2YoJ2h0dHA6Ly8nKSA9PT0gMCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgaWYgKHVybC5pbmRleE9mKCcvLycpID09PSAwKSB7XG4gICAgcmV0dXJuIHNhZmVNYXRjaChiYXNlLCAvXihodHRwcz86KS8pICsgdXJsO1xuICB9XG4gIGlmICh1cmwuaW5kZXhPZignLycpID09PSAwKSB7XG4gICAgcmV0dXJuIHNhZmVNYXRjaChiYXNlLCAvXig/Omh0dHBzPzopPyg/OlxcL1xcLyk/KFteXFwvXFw/XSspLykgKyB1cmw7XG4gIH1cbiAgcmV0dXJuIHNhZmVNYXRjaChiYXNlLCAvXig/Omh0dHBzPzopPyg/OlxcL1xcLyk/KFteXFwvXFw/XSspPyguKlxcLykvKSArIHVybDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuZnVuYzxULCBWPih2YWx1ZTogVCB8ICgocmVmOiBWKSA9PiBUKSwgcmVmOiBWKTogVCB7XG4gIHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIEZ1bmN0aW9uID8gdmFsdWUocmVmKSA6IHZhbHVlO1xufVxuXG5leHBvcnQgY29uc3QgcGljayA9IDxULCBLIGV4dGVuZHMga2V5b2YgVD4ob2JqOiBULCB3aGl0ZWxpc3Q6IEtbXSk6IFBpY2s8VCwgSz4gPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fSBhcyBQaWNrPFQsIEs+O1xuICB3aGl0ZWxpc3QuZm9yRWFjaChrZXkgPT4gKHJlc3VsdFtrZXldID0gb2JqW2tleV0pKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBpc051bWJlcih4PzogbnVtYmVyKTogeCBpcyBudW1iZXIge1xuICByZXR1cm4geCA9PT0gTnVtYmVyKHgpO1xufVxuXG4vKipcbiAqIDMyLWJpdCBGTlYtMWEgaGFzaCBmdW5jdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFzaChzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gIGxldCBoYXNoID0gMjE2NjEzNjI2MTtcbiAgY29uc3QgbGVuID0gc3RyLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGhhc2ggXj0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGFzaCArPSAoaGFzaCA8PCAxKSArIChoYXNoIDw8IDQpICsgKGhhc2ggPDwgNykgKyAoaGFzaCA8PCA4KSArIChoYXNoIDw8IDI0KTtcbiAgfVxuICByZXR1cm4gaGFzaCA+Pj4gMDtcbn1cblxuZXhwb3J0IGNvbnN0IGI2NCA9IHtcbiAgZW5jb2RlOiAoc3RyOiBzdHJpbmcpID0+XG4gICAgYnRvYShcbiAgICAgIGVuY29kZVVSSUNvbXBvbmVudChzdHIpLnJlcGxhY2UoLyUoWzAtOUEtRl17Mn0pL2csIChtYXRjaCwgcDEpID0+XG4gICAgICAgIFN0cmluZy5mcm9tQ2hhckNvZGUoTnVtYmVyLnBhcnNlSW50KHAxLCAxNikpXG4gICAgICApXG4gICAgKSxcbiAgZGVjb2RlOiAoc3RyOiBzdHJpbmcpID0+XG4gICAgZGVjb2RlVVJJQ29tcG9uZW50KFxuICAgICAgYXRvYihzdHIpXG4gICAgICAgIC5zcGxpdCgnJylcbiAgICAgICAgLm1hcChjID0+ICclJyArICgnMDAnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTIpKVxuICAgICAgICAuam9pbignJylcbiAgICApLFxuICBzZXJpYWxpemU6IChvYmo6IFJlY29yZDxzdHJpbmcsIFByaW1pdGl2ZSB8IFByaW1pdGl2ZVtdPikgPT5cbiAgICBPYmplY3Qua2V5cyhvYmopXG4gICAgICAubWFwKGtleSA9PiBgJHtrZXl9ICR7YjY0LmVuY29kZShTdHJpbmcob2JqW2tleV0pKX1gKVxuICAgICAgLnRvU3RyaW5nKCksXG5cbiAgcGFyc2U6IChlbmNvZGVkOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBrdlBhaXJzID0gZW5jb2RlZC5zcGxpdCgnLCcpLm1hcChrdiA9PiBrdi5zcGxpdCgnICcpKTtcbiAgICBjb25zdCBkZWNvZGVkOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBrdlBhaXJzKSB7XG4gICAgICBkZWNvZGVkW2tleV0gPSBiNjQuZGVjb2RlKHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlY29kZWQ7XG4gIH1cbn07XG5cbi8qKlxuICogQWRhcHRpdmUgY2h1bmsgc2l6ZVxuICovXG5leHBvcnQgY2xhc3MgRHluYW1pY0NodW5rIHtcbiAgLyoqIE1heGltdW0gY2h1bmsgc2l6ZSBpbiBieXRlcyAqL1xuICBzdGF0aWMgbWF4U2l6ZSA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAvKiogTWluaW11bSBjaHVuayBzaXplIGluIGJ5dGVzICovXG4gIHN0YXRpYyBtaW5TaXplID0gMTAyNCAqIDI1NjtcbiAgLyoqIEluaXRpYWwgY2h1bmsgc2l6ZSBpbiBieXRlcyAqL1xuICBzdGF0aWMgc2l6ZSA9IDQwOTYgKiAyNTY7XG4gIHN0YXRpYyBtaW5DaHVua1RpbWUgPSAyO1xuICBzdGF0aWMgbWF4Q2h1bmtUaW1lID0gODtcblxuICBzdGF0aWMgc2NhbGUodGhyb3VnaHB1dDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBlbGFwc2VkVGltZSA9IER5bmFtaWNDaHVuay5zaXplIC8gdGhyb3VnaHB1dDtcbiAgICBpZiAoZWxhcHNlZFRpbWUgPCBEeW5hbWljQ2h1bmsubWluQ2h1bmtUaW1lKSB7XG4gICAgICBEeW5hbWljQ2h1bmsuc2l6ZSA9IE1hdGgubWluKER5bmFtaWNDaHVuay5tYXhTaXplLCBEeW5hbWljQ2h1bmsuc2l6ZSAqIDIpO1xuICAgIH1cbiAgICBpZiAoZWxhcHNlZFRpbWUgPiBEeW5hbWljQ2h1bmsubWF4Q2h1bmtUaW1lKSB7XG4gICAgICBEeW5hbWljQ2h1bmsuc2l6ZSA9IE1hdGgubWF4KER5bmFtaWNDaHVuay5taW5TaXplLCBEeW5hbWljQ2h1bmsuc2l6ZSAvIDIpO1xuICAgIH1cbiAgICByZXR1cm4gRHluYW1pY0NodW5rLnNpemU7XG4gIH1cbn1cbiJdfQ==