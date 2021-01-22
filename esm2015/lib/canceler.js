/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
export class Canceler {
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
if (false) {
    /** @type {?} */
    Canceler.prototype.onCancel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuY2VsZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi9jYW5jZWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTSxPQUFPLFFBQVE7SUFBckI7UUFDRSxhQUFROzs7UUFBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQUM7SUFNdEIsQ0FBQzs7OztJQUpDLE1BQU07UUFDSixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxDQUFDLFFBQVE7OztRQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQSxDQUFDO0lBQzNCLENBQUM7Q0FDRjs7O0lBTkMsNEJBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENhbmNlbGVyIHtcbiAgb25DYW5jZWwgPSAoKSA9PiB7fTtcblxuICBjYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5vbkNhbmNlbCgpO1xuICAgIHRoaXMub25DYW5jZWwgPSAoKSA9PiB7fTtcbiAgfVxufVxuIl19