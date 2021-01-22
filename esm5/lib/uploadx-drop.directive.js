/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ContentChild, Directive, HostBinding, HostListener } from '@angular/core';
import { UploadxDirective } from './uploadx.directive';
import { UploadxService } from './uploadx.service';
var UploadxDropDirective = /** @class */ (function () {
    function UploadxDropDirective(uploadService) {
        this.uploadService = uploadService;
        this.active = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    UploadxDropDirective.prototype.dropHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.item(0)) {
            event.stopPropagation();
            event.preventDefault();
            this.active = false;
            this.fileInput
                ? this.fileInput.fileListener(event.dataTransfer.files)
                : this.uploadService.handleFiles(event.dataTransfer.files);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UploadxDropDirective.prototype.onDragOver = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.dataTransfer && event.dataTransfer.files) {
            event.dataTransfer.dropEffect = 'copy';
            event.stopPropagation();
            event.preventDefault();
            this.active = true;
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    UploadxDropDirective.prototype.onDragLeave = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.active = false;
    };
    UploadxDropDirective.decorators = [
        { type: Directive, args: [{ selector: '[uploadxDrop]' },] }
    ];
    /** @nocollapse */
    UploadxDropDirective.ctorParameters = function () { return [
        { type: UploadxService }
    ]; };
    UploadxDropDirective.propDecorators = {
        active: [{ type: HostBinding, args: ['class.uploadx-drop-active',] }],
        fileInput: [{ type: ContentChild, args: [UploadxDirective,] }],
        dropHandler: [{ type: HostListener, args: ['drop', ['$event'],] }],
        onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
        onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }]
    };
    return UploadxDropDirective;
}());
export { UploadxDropDirective };
if (false) {
    /** @type {?} */
    UploadxDropDirective.prototype.active;
    /** @type {?} */
    UploadxDropDirective.prototype.fileInput;
    /**
     * @type {?}
     * @private
     */
    UploadxDropDirective.prototype.uploadService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkeC1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11cGxvYWR4LyIsInNvdXJjZXMiOlsibGliL3VwbG9hZHgtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRW5EO0lBUUUsOEJBQW9CLGFBQTZCO1FBQTdCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUxqRCxXQUFNLEdBQUcsS0FBSyxDQUFDO0lBS3FDLENBQUM7Ozs7O0lBR3JELDBDQUFXOzs7O0lBRFgsVUFDWSxLQUFnQjtRQUMxQixJQUFJLEtBQUssQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3RGLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN4QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVM7Z0JBQ1osQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2dCQUN2RCxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5RDtJQUNILENBQUM7Ozs7O0lBR0QseUNBQVU7Ozs7SUFEVixVQUNXLEtBQWdCO1FBQ3pCLElBQUksS0FBSyxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRTtZQUNsRCxLQUFLLENBQUMsWUFBWSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUM7WUFDdkMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUNwQjtJQUNILENBQUM7Ozs7O0lBR0QsMENBQVc7Ozs7SUFEWCxVQUNZLEtBQWdCO1FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7O2dCQW5DRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFOzs7O2dCQUYvQixjQUFjOzs7eUJBSXBCLFdBQVcsU0FBQywyQkFBMkI7NEJBR3ZDLFlBQVksU0FBQyxnQkFBZ0I7OEJBSzdCLFlBQVksU0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7NkJBWS9CLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7OEJBVW5DLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7O0lBSXZDLDJCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7U0FuQ1ksb0JBQW9COzs7SUFDL0Isc0NBQ2U7O0lBRWYseUNBQzZCOzs7OztJQUVqQiw2Q0FBcUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250ZW50Q2hpbGQsIERpcmVjdGl2ZSwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBsb2FkeERpcmVjdGl2ZSB9IGZyb20gJy4vdXBsb2FkeC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVXBsb2FkeFNlcnZpY2UgfSBmcm9tICcuL3VwbG9hZHguc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t1cGxvYWR4RHJvcF0nIH0pXG5leHBvcnQgY2xhc3MgVXBsb2FkeERyb3BEaXJlY3RpdmUge1xuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnVwbG9hZHgtZHJvcC1hY3RpdmUnKVxuICBhY3RpdmUgPSBmYWxzZTtcblxuICBAQ29udGVudENoaWxkKFVwbG9hZHhEaXJlY3RpdmUpXG4gIGZpbGVJbnB1dD86IFVwbG9hZHhEaXJlY3RpdmU7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSB1cGxvYWRTZXJ2aWNlOiBVcGxvYWR4U2VydmljZSkge31cblxuICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgZHJvcEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGlmIChldmVudC5kYXRhVHJhbnNmZXIgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzICYmIGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcy5pdGVtKDApKSB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5maWxlSW5wdXRcbiAgICAgICAgPyB0aGlzLmZpbGVJbnB1dC5maWxlTGlzdGVuZXIoZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzKVxuICAgICAgICA6IHRoaXMudXBsb2FkU2VydmljZS5oYW5kbGVGaWxlcyhldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdvdmVyJywgWyckZXZlbnQnXSlcbiAgb25EcmFnT3ZlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMpIHtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gJ2NvcHknO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIFsnJGV2ZW50J10pXG4gIG9uRHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICB9XG59XG4iXX0=