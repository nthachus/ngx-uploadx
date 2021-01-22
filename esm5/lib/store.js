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
if (false) {
    /** @type {?} */
    Store.prototype.prefix;
}
/** @type {?} */
export var store = typeof window !== 'undefined' && 'localStorage' in window
    ? new Store()
    : new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi9zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7SUFBQTtRQUNFLFdBQU0sR0FBRyxlQUFlLENBQUM7SUFhM0IsQ0FBQzs7Ozs7O0lBWEMsbUJBQUc7Ozs7O0lBQUgsVUFBSSxHQUFXLEVBQUUsS0FBYTtRQUM1QixZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7Ozs7O0lBRUQsbUJBQUc7Ozs7SUFBSCxVQUFJLEdBQVc7UUFDYixPQUFPLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7OztJQUVELHNCQUFNOzs7O0lBQU4sVUFBTyxHQUFXO1FBQ2hCLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBQ0gsWUFBQztBQUFELENBQUMsQUFkRCxJQWNDOzs7SUFiQyx1QkFBeUI7OztBQWUzQixNQUFNLEtBQU8sS0FBSyxHQUNoQixPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksY0FBYyxJQUFJLE1BQU07SUFDdkQsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFO0lBQ2IsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFN0b3JlIHtcbiAgcHJlZml4ID0gJ1VQTE9BRFgtVjMuMC0nO1xuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMucHJlZml4ICsga2V5LCB2YWx1ZSk7XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5wcmVmaXggKyBrZXkpO1xuICB9XG5cbiAgZGVsZXRlKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5wcmVmaXggKyBrZXkpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzdG9yZSA9XG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICdsb2NhbFN0b3JhZ2UnIGluIHdpbmRvd1xuICAgID8gbmV3IFN0b3JlKClcbiAgICA6IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KCk7XG4iXX0=