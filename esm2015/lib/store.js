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
if (false) {
    /** @type {?} */
    Store.prototype.prefix;
}
/** @type {?} */
export const store = typeof window !== 'undefined' && 'localStorage' in window
    ? new Store()
    : new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxLQUFLO0lBQVg7UUFDRSxXQUFNLEdBQUcsZUFBZSxDQUFDO0lBYTNCLENBQUM7Ozs7OztJQVhDLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBYTtRQUM1QixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRUQsR0FBRyxDQUFDLEdBQVc7UUFDYixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUVELE1BQU0sQ0FBQyxHQUFXO1FBQ2hCLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7OztJQWJDLHVCQUF5Qjs7O0FBZTNCLE1BQU0sT0FBTyxLQUFLLEdBQ2hCLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxjQUFjLElBQUksTUFBTTtJQUN2RCxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUU7SUFDYixDQUFDLENBQUMsSUFBSSxHQUFHLEVBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgU3RvcmUge1xuICBwcmVmaXggPSAnVVBMT0FEWC1WMy4wLSc7XG5cbiAgc2V0KGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5wcmVmaXggKyBrZXksIHZhbHVlKTtcbiAgfVxuXG4gIGdldChrZXk6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLnByZWZpeCArIGtleSk7XG4gIH1cblxuICBkZWxldGUoa2V5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnByZWZpeCArIGtleSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0b3JlID1cbiAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2xvY2FsU3RvcmFnZScgaW4gd2luZG93XG4gICAgPyBuZXcgU3RvcmUoKVxuICAgIDogbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcbiJdfQ==