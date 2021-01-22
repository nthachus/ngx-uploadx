/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { UPLOADX_OPTIONS } from './options';
import { UploadxDropDirective } from './uploadx-drop.directive';
import { UploadxDirective } from './uploadx.directive';
export class UploadxModule {
    /**
     * @param {?} options
     * @return {?}
     */
    static withConfig(options) {
        return {
            ngModule: UploadxModule,
            providers: [{ provide: UPLOADX_OPTIONS, useValue: options }]
        };
    }
}
UploadxModule.decorators = [
    { type: NgModule, args: [{
                declarations: [UploadxDirective, UploadxDropDirective],
                exports: [UploadxDirective, UploadxDropDirective]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkeC5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdXBsb2FkeC8iLCJzb3VyY2VzIjpbImxpYi91cGxvYWR4Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUF1QixRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLGVBQWUsRUFBa0IsTUFBTSxXQUFXLENBQUM7QUFDNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFNdkQsTUFBTSxPQUFPLGFBQWE7Ozs7O0lBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBdUI7UUFDdkMsT0FBTztZQUNMLFFBQVEsRUFBRSxhQUFhO1lBQ3ZCLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUM7U0FDN0QsQ0FBQztJQUNKLENBQUM7OztZQVZGLFFBQVEsU0FBQztnQkFDUixZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQztnQkFDdEQsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUM7YUFDbEQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVVBMT0FEWF9PUFRJT05TLCBVcGxvYWR4T3B0aW9ucyB9IGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgeyBVcGxvYWR4RHJvcERpcmVjdGl2ZSB9IGZyb20gJy4vdXBsb2FkeC1kcm9wLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBVcGxvYWR4RGlyZWN0aXZlIH0gZnJvbSAnLi91cGxvYWR4LmRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1VwbG9hZHhEaXJlY3RpdmUsIFVwbG9hZHhEcm9wRGlyZWN0aXZlXSxcbiAgZXhwb3J0czogW1VwbG9hZHhEaXJlY3RpdmUsIFVwbG9hZHhEcm9wRGlyZWN0aXZlXVxufSlcbmV4cG9ydCBjbGFzcyBVcGxvYWR4TW9kdWxlIHtcbiAgc3RhdGljIHdpdGhDb25maWcob3B0aW9uczogVXBsb2FkeE9wdGlvbnMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFVwbG9hZHhNb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IFVwbG9hZHhNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFt7IHByb3ZpZGU6IFVQTE9BRFhfT1BUSU9OUywgdXNlVmFsdWU6IG9wdGlvbnMgfV1cbiAgICB9O1xuICB9XG59XG4iXX0=