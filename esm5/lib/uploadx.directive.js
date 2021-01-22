/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { UploadxService } from './uploadx.service';
var UploadxDirective = /** @class */ (function () {
    function UploadxDirective(elementRef, renderer, uploadService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.uploadService = uploadService;
        this.options = {};
        this.state = new EventEmitter();
    }
    Object.defineProperty(UploadxDirective.prototype, "uploadx", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.options = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UploadxDirective.prototype, "control", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (value) {
                this.uploadService.control(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    UploadxDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var _a = this.options, multiple = _a.multiple, allowedTypes = _a.allowedTypes;
        multiple !== false && this.renderer.setAttribute(this.elementRef.nativeElement, 'multiple', '');
        allowedTypes &&
            this.renderer.setAttribute(this.elementRef.nativeElement, 'accept', allowedTypes);
        this.uploadService.events
            .pipe(takeWhile((/**
         * @param {?} _
         * @return {?}
         */
        function (_) { return _this.state.observers.length > 0; })))
            .subscribe(this.state);
    };
    /**
     * @param {?} files
     * @return {?}
     */
    UploadxDirective.prototype.fileListener = /**
     * @param {?} files
     * @return {?}
     */
    function (files) {
        if (files && files.item(0)) {
            this.uploadService.handleFiles(files, this.options);
        }
    };
    UploadxDirective.decorators = [
        { type: Directive, args: [{ selector: '[uploadx]' },] }
    ];
    /** @nocollapse */
    UploadxDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: UploadxService }
    ]; };
    UploadxDirective.propDecorators = {
        uploadx: [{ type: Input }],
        options: [{ type: Input }],
        control: [{ type: Input }],
        state: [{ type: Output }],
        fileListener: [{ type: HostListener, args: ['change', ['$event.target.files'],] }]
    };
    return UploadxDirective;
}());
export { UploadxDirective };
if (false) {
    /** @type {?} */
    UploadxDirective.prototype.options;
    /** @type {?} */
    UploadxDirective.prototype.state;
    /**
     * @type {?}
     * @private
     */
    UploadxDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    UploadxDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    UploadxDirective.prototype.uploadService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkeC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi91cGxvYWR4LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5EO0lBbUJFLDBCQUNVLFVBQXNCLEVBQ3RCLFFBQW1CLEVBQ25CLGFBQTZCO1FBRjdCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBZ0I7UUFiOUIsWUFBTyxHQUFtQixFQUFFLENBQUM7UUFRNUIsVUFBSyxHQUFHLElBQUksWUFBWSxFQUFlLENBQUM7SUFNL0MsQ0FBQztJQXJCSixzQkFDSSxxQ0FBTzs7Ozs7UUFEWCxVQUNZLEtBQTBCO1lBQ3BDLElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQzs7O09BQUE7SUFJRCxzQkFBYSxxQ0FBTzs7Ozs7UUFBcEIsVUFBcUIsS0FBK0I7WUFDbEQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbkM7UUFDSCxDQUFDOzs7T0FBQTs7OztJQVVELG1DQUFROzs7SUFBUjtRQUFBLGlCQVNDO1FBUk8sSUFBQSxpQkFBeUMsRUFBdkMsc0JBQVEsRUFBRSw4QkFBNkI7UUFDL0MsUUFBUSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDaEcsWUFBWTtZQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUVwRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDdEIsSUFBSSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQS9CLENBQStCLEVBQUMsQ0FBQzthQUNyRCxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNCLENBQUM7Ozs7O0lBR0QsdUNBQVk7Ozs7SUFEWixVQUNhLEtBQWU7UUFDMUIsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ3JEO0lBQ0gsQ0FBQzs7Z0JBekNGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUU7Ozs7Z0JBYmxDLFVBQVU7Z0JBTVYsU0FBUztnQkFLRixjQUFjOzs7MEJBSXBCLEtBQUs7MEJBT0wsS0FBSzswQkFFTCxLQUFLO3dCQU1MLE1BQU07K0JBbUJOLFlBQVksU0FBQyxRQUFRLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQzs7SUFNakQsdUJBQUM7Q0FBQSxBQTFDRCxJQTBDQztTQXpDWSxnQkFBZ0I7OztJQVEzQixtQ0FBc0M7O0lBUXRDLGlDQUFrRDs7Ozs7SUFHaEQsc0NBQThCOzs7OztJQUM5QixvQ0FBMkI7Ozs7O0lBQzNCLHlDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgdGFrZVdoaWxlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVXBsb2FkU3RhdGUsIFVwbG9hZHhDb250cm9sRXZlbnQgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgVXBsb2FkeE9wdGlvbnMgfSBmcm9tICcuL29wdGlvbnMnO1xuaW1wb3J0IHsgVXBsb2FkeFNlcnZpY2UgfSBmcm9tICcuL3VwbG9hZHguc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t1cGxvYWR4XScgfSlcbmV4cG9ydCBjbGFzcyBVcGxvYWR4RGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KClcbiAgc2V0IHVwbG9hZHgodmFsdWU6IFVwbG9hZHhPcHRpb25zIHwgJycpIHtcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIHRoaXMub3B0aW9ucyA9IHZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIEBJbnB1dCgpIG9wdGlvbnM6IFVwbG9hZHhPcHRpb25zID0ge307XG5cbiAgQElucHV0KCkgc2V0IGNvbnRyb2wodmFsdWU6IFVwbG9hZHhDb250cm9sRXZlbnQgfCAnJykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy51cGxvYWRTZXJ2aWNlLmNvbnRyb2wodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIEBPdXRwdXQoKSBzdGF0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8VXBsb2FkU3RhdGU+KCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIHVwbG9hZFNlcnZpY2U6IFVwbG9hZHhTZXJ2aWNlXG4gICkge31cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBjb25zdCB7IG11bHRpcGxlLCBhbGxvd2VkVHlwZXMgfSA9IHRoaXMub3B0aW9ucztcbiAgICBtdWx0aXBsZSAhPT0gZmFsc2UgJiYgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdtdWx0aXBsZScsICcnKTtcbiAgICBhbGxvd2VkVHlwZXMgJiZcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnYWNjZXB0JywgYWxsb3dlZFR5cGVzKTtcblxuICAgIHRoaXMudXBsb2FkU2VydmljZS5ldmVudHNcbiAgICAgIC5waXBlKHRha2VXaGlsZShfID0+IHRoaXMuc3RhdGUub2JzZXJ2ZXJzLmxlbmd0aCA+IDApKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLnN0YXRlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2NoYW5nZScsIFsnJGV2ZW50LnRhcmdldC5maWxlcyddKVxuICBmaWxlTGlzdGVuZXIoZmlsZXM6IEZpbGVMaXN0KTogdm9pZCB7XG4gICAgaWYgKGZpbGVzICYmIGZpbGVzLml0ZW0oMCkpIHtcbiAgICAgIHRoaXMudXBsb2FkU2VydmljZS5oYW5kbGVGaWxlcyhmaWxlcywgdGhpcy5vcHRpb25zKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==