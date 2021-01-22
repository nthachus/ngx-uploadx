/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ContentChild, Directive, HostBinding, HostListener } from '@angular/core';
import { UploadxDirective } from './uploadx.directive';
import { UploadxService } from './uploadx.service';
export class UploadxDropDirective {
    /**
     * @param {?} uploadService
     */
    constructor(uploadService) {
        this.uploadService = uploadService;
        this.active = false;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dropHandler(event) {
        if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files.item(0)) {
            event.stopPropagation();
            event.preventDefault();
            this.active = false;
            this.fileInput
                ? this.fileInput.fileListener(event.dataTransfer.files)
                : this.uploadService.handleFiles(event.dataTransfer.files);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragOver(event) {
        if (event.dataTransfer && event.dataTransfer.files) {
            event.dataTransfer.dropEffect = 'copy';
            event.stopPropagation();
            event.preventDefault();
            this.active = true;
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onDragLeave(event) {
        this.active = false;
    }
}
UploadxDropDirective.decorators = [
    { type: Directive, args: [{ selector: '[uploadxDrop]' },] }
];
/** @nocollapse */
UploadxDropDirective.ctorParameters = () => [
    { type: UploadxService }
];
UploadxDropDirective.propDecorators = {
    active: [{ type: HostBinding, args: ['class.uploadx-drop-active',] }],
    fileInput: [{ type: ContentChild, args: [UploadxDirective,] }],
    dropHandler: [{ type: HostListener, args: ['drop', ['$event'],] }],
    onDragOver: [{ type: HostListener, args: ['dragover', ['$event'],] }],
    onDragLeave: [{ type: HostListener, args: ['dragleave', ['$event'],] }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkeC1kcm9wLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11cGxvYWR4LyIsInNvdXJjZXMiOlsibGliL3VwbG9hZHgtZHJvcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR25ELE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFPL0IsWUFBb0IsYUFBNkI7UUFBN0Isa0JBQWEsR0FBYixhQUFhLENBQWdCO1FBTGpELFdBQU0sR0FBRyxLQUFLLENBQUM7SUFLcUMsQ0FBQzs7Ozs7SUFHckQsV0FBVyxDQUFDLEtBQWdCO1FBQzFCLElBQUksS0FBSyxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdEYsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsU0FBUztnQkFDWixDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZELENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzlEO0lBQ0gsQ0FBQzs7Ozs7SUFHRCxVQUFVLENBQUMsS0FBZ0I7UUFDekIsSUFBSSxLQUFLLENBQUMsWUFBWSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFO1lBQ2xELEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQztZQUN2QyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7Ozs7SUFHRCxXQUFXLENBQUMsS0FBZ0I7UUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQzs7O1lBbkNGLFNBQVMsU0FBQyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQUU7Ozs7WUFGL0IsY0FBYzs7O3FCQUlwQixXQUFXLFNBQUMsMkJBQTJCO3dCQUd2QyxZQUFZLFNBQUMsZ0JBQWdCOzBCQUs3QixZQUFZLFNBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDO3lCQVkvQixZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOzBCQVVuQyxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBOUJyQyxzQ0FDZTs7SUFFZix5Q0FDNkI7Ozs7O0lBRWpCLDZDQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRlbnRDaGlsZCwgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGxvYWR4RGlyZWN0aXZlIH0gZnJvbSAnLi91cGxvYWR4LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBVcGxvYWR4U2VydmljZSB9IGZyb20gJy4vdXBsb2FkeC5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW3VwbG9hZHhEcm9wXScgfSlcbmV4cG9ydCBjbGFzcyBVcGxvYWR4RHJvcERpcmVjdGl2ZSB7XG4gIEBIb3N0QmluZGluZygnY2xhc3MudXBsb2FkeC1kcm9wLWFjdGl2ZScpXG4gIGFjdGl2ZSA9IGZhbHNlO1xuXG4gIEBDb250ZW50Q2hpbGQoVXBsb2FkeERpcmVjdGl2ZSlcbiAgZmlsZUlucHV0PzogVXBsb2FkeERpcmVjdGl2ZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHVwbG9hZFNlcnZpY2U6IFVwbG9hZHhTZXJ2aWNlKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2Ryb3AnLCBbJyRldmVudCddKVxuICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMgJiYgZXZlbnQuZGF0YVRyYW5zZmVyLmZpbGVzLml0ZW0oMCkpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLmZpbGVJbnB1dFxuICAgICAgICA/IHRoaXMuZmlsZUlucHV0LmZpbGVMaXN0ZW5lcihldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMpXG4gICAgICAgIDogdGhpcy51cGxvYWRTZXJ2aWNlLmhhbmRsZUZpbGVzKGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcyk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ292ZXInLCBbJyRldmVudCddKVxuICBvbkRyYWdPdmVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcykge1xuICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnY29weSc7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignZHJhZ2xlYXZlJywgWyckZXZlbnQnXSlcbiAgb25EcmFnTGVhdmUoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gIH1cbn1cbiJdfQ==