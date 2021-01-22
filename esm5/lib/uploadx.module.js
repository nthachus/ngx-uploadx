/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { UPLOADX_OPTIONS } from './options';
import { UploadxDropDirective } from './uploadx-drop.directive';
import { UploadxDirective } from './uploadx.directive';
var UploadxModule = /** @class */ (function () {
    function UploadxModule() {
    }
    /**
     * @param {?} options
     * @return {?}
     */
    UploadxModule.withConfig = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        return {
            ngModule: UploadxModule,
            providers: [{ provide: UPLOADX_OPTIONS, useValue: options }]
        };
    };
    UploadxModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [UploadxDirective, UploadxDropDirective],
                    exports: [UploadxDirective, UploadxDropDirective]
                },] }
    ];
    return UploadxModule;
}());
export { UploadxModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkeC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi91cGxvYWR4Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSxXQUFXLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdkQ7SUFBQTtJQVdBLENBQUM7Ozs7O0lBTlEsd0JBQVU7Ozs7SUFBakIsVUFBa0IsT0FBdUI7UUFDdkMsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7U0FDN0QsQ0FBQztJQUNKLENBQUM7O2dCQVZGLFFBQVEsU0FBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQztvQkFDdEQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUM7aUJBQ2xEOztJQVFELG9CQUFDO0NBQUEsQUFYRCxJQVdDO1NBUFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVUExPQURYX09QVElPTlMsIFVwbG9hZHhPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zJztcbmltcG9ydCB7IFVwbG9hZHhEcm9wRGlyZWN0aXZlIH0gZnJvbSAnLi91cGxvYWR4LWRyb3AuZGlyZWN0aXZlJztcbmltcG9ydCB7IFVwbG9hZHhEaXJlY3RpdmUgfSBmcm9tICcuL3VwbG9hZHguZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbVXBsb2FkeERpcmVjdGl2ZSwgVXBsb2FkeERyb3BEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbVXBsb2FkeERpcmVjdGl2ZSwgVXBsb2FkeERyb3BEaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIFVwbG9hZHhNb2R1bGUge1xuICBzdGF0aWMgd2l0aENvbmZpZyhvcHRpb25zOiBVcGxvYWR4T3B0aW9ucyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VXBsb2FkeE1vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogVXBsb2FkeE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW3sgcHJvdmlkZTogVVBMT0FEWF9PUFRJT05TLCB1c2VWYWx1ZTogb3B0aW9ucyB9XVxuICAgIH07XG4gIH1cbn1cbiJdfQ==