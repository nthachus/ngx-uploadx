/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { UploadxService } from './uploadx.service';
export class UploadxDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} uploadService
     */
    constructor(elementRef, renderer, uploadService) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.uploadService = uploadService;
        this.options = {};
        this.state = new EventEmitter();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set uploadx(value) {
        if (value) {
            this.options = value;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set control(value) {
        if (value) {
            this.uploadService.control(value);
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const { multiple, allowedTypes } = this.options;
        multiple !== false && this.renderer.setAttribute(this.elementRef.nativeElement, 'multiple', '');
        allowedTypes &&
            this.renderer.setAttribute(this.elementRef.nativeElement, 'accept', allowedTypes);
        this.uploadService.events
            .pipe(takeWhile((/**
         * @param {?} _
         * @return {?}
         */
        _ => this.state.observers.length > 0)))
            .subscribe(this.state);
    }
    /**
     * @param {?} files
     * @return {?}
     */
    fileListener(files) {
        if (files && files.item(0)) {
            this.uploadService.handleFiles(files, this.options);
        }
    }
}
UploadxDirective.decorators = [
    { type: Directive, args: [{ selector: '[uploadx]' },] }
];
/** @nocollapse */
UploadxDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: UploadxService }
];
UploadxDirective.propDecorators = {
    uploadx: [{ type: Input }],
    options: [{ type: Input }],
    control: [{ type: Input }],
    state: [{ type: Output }],
    fileListener: [{ type: HostListener, args: ['change', ['$event.target.files'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkeC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi91cGxvYWR4LmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHM0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR25ELE1BQU0sT0FBTyxnQkFBZ0I7Ozs7OztJQWtCM0IsWUFDVSxVQUFzQixFQUN0QixRQUFtQixFQUNuQixhQUE2QjtRQUY3QixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBYjlCLFlBQU8sR0FBbUIsRUFBRSxDQUFDO1FBUTVCLFVBQUssR0FBRyxJQUFJLFlBQVksRUFBZSxDQUFDO0lBTS9DLENBQUM7Ozs7O0lBckJKLElBQ0ksT0FBTyxDQUFDLEtBQTBCO1FBQ3BDLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDdEI7SUFDSCxDQUFDOzs7OztJQUlELElBQWEsT0FBTyxDQUFDLEtBQStCO1FBQ2xELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkM7SUFDSCxDQUFDOzs7O0lBVUQsUUFBUTtjQUNBLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPO1FBQy9DLFFBQVEsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hHLFlBQVk7WUFDVixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFcEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQ3RCLElBQUksQ0FBQyxTQUFTOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFDLENBQUM7YUFDckQsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDOzs7OztJQUdELFlBQVksQ0FBQyxLQUFlO1FBQzFCLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNyRDtJQUNILENBQUM7OztZQXpDRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFFOzs7O1lBYmxDLFVBQVU7WUFNVixTQUFTO1lBS0YsY0FBYzs7O3NCQUlwQixLQUFLO3NCQU9MLEtBQUs7c0JBRUwsS0FBSztvQkFNTCxNQUFNOzJCQW1CTixZQUFZLFNBQUMsUUFBUSxFQUFFLENBQUMscUJBQXFCLENBQUM7Ozs7SUEzQi9DLG1DQUFzQzs7SUFRdEMsaUNBQWtEOzs7OztJQUdoRCxzQ0FBOEI7Ozs7O0lBQzlCLG9DQUEyQjs7Ozs7SUFDM0IseUNBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlV2hpbGUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVcGxvYWRTdGF0ZSwgVXBsb2FkeENvbnRyb2xFdmVudCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBVcGxvYWR4T3B0aW9ucyB9IGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgeyBVcGxvYWR4U2VydmljZSB9IGZyb20gJy4vdXBsb2FkeC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3VwbG9hZHhdJyB9KVxuZXhwb3J0IGNsYXNzIFVwbG9hZHhEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKVxuICBzZXQgdXBsb2FkeCh2YWx1ZTogVXBsb2FkeE9wdGlvbnMgfCAnJykge1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgdGhpcy5vcHRpb25zID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgQElucHV0KCkgb3B0aW9uczogVXBsb2FkeE9wdGlvbnMgPSB7fTtcblxuICBASW5wdXQoKSBzZXQgY29udHJvbCh2YWx1ZTogVXBsb2FkeENvbnRyb2xFdmVudCB8ICcnKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB0aGlzLnVwbG9hZFNlcnZpY2UuY29udHJvbCh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgQE91dHB1dCgpIHN0YXRlID0gbmV3IEV2ZW50RW1pdHRlcjxVcGxvYWRTdGF0ZT4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgdXBsb2FkU2VydmljZTogVXBsb2FkeFNlcnZpY2VcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgbXVsdGlwbGUsIGFsbG93ZWRUeXBlcyB9ID0gdGhpcy5vcHRpb25zO1xuICAgIG11bHRpcGxlICE9PSBmYWxzZSAmJiB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ211bHRpcGxlJywgJycpO1xuICAgIGFsbG93ZWRUeXBlcyAmJlxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhY2NlcHQnLCBhbGxvd2VkVHlwZXMpO1xuXG4gICAgdGhpcy51cGxvYWRTZXJ2aWNlLmV2ZW50c1xuICAgICAgLnBpcGUodGFrZVdoaWxlKF8gPT4gdGhpcy5zdGF0ZS5vYnNlcnZlcnMubGVuZ3RoID4gMCkpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuc3RhdGUpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2hhbmdlJywgWyckZXZlbnQudGFyZ2V0LmZpbGVzJ10pXG4gIGZpbGVMaXN0ZW5lcihmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMgJiYgZmlsZXMuaXRlbSgwKSkge1xuICAgICAgdGhpcy51cGxvYWRTZXJ2aWNlLmhhbmRsZUZpbGVzKGZpbGVzLCB0aGlzLm9wdGlvbnMpO1xuICAgIH1cbiAgfVxufVxuIl19