/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { InjectionToken } from '@angular/core';
import { UploaderX } from './uploaderx';
/**
 * Global Module Options
 * @record
 */
export function UploadxOptions() { }
if (false) {
    /**
     * Provide a user-defined class to support another upload protocol or to extend an existing one.
     * \@defaultValue UploadX
     * @type {?|undefined}
     */
    UploadxOptions.prototype.uploaderClass;
    /**
     * Set the maximum parallel uploads
     * \@defaultValue 2
     * @type {?|undefined}
     */
    UploadxOptions.prototype.concurrency;
    /**
     * Automatically start upload when files added
     * \@defaultValue true
     * @type {?|undefined}
     */
    UploadxOptions.prototype.autoUpload;
    /**
     * File types the user can pick from the file input
     * @type {?|undefined}
     */
    UploadxOptions.prototype.allowedTypes;
    /**
     * Add 'multiple' attribute
     * \@defaultValue true
     * @type {?|undefined}
     */
    UploadxOptions.prototype.multiple;
}
/**
 * @record
 */
export function UploadxFactoryOptions() { }
if (false) {
    /** @type {?} */
    UploadxFactoryOptions.prototype.endpoint;
    /** @type {?} */
    UploadxFactoryOptions.prototype.autoUpload;
    /** @type {?} */
    UploadxFactoryOptions.prototype.concurrency;
    /** @type {?} */
    UploadxFactoryOptions.prototype.uploaderClass;
    /** @type {?} */
    UploadxFactoryOptions.prototype.authorize;
}
var ɵ0 = /**
 * @param {?} req
 * @param {?} token
 * @return {?}
 */
function (req, token) {
    token && (req.headers.Authorization = "Bearer " + token);
    return req;
};
/** @type {?} */
var defaultOptions = {
    endpoint: '/upload',
    autoUpload: true,
    concurrency: 2,
    uploaderClass: UploaderX,
    authorize: (ɵ0)
};
/** @type {?} */
export var UPLOADX_FACTORY_OPTIONS = new InjectionToken('uploadx.factory.options', { providedIn: 'root', factory: (/**
     * @return {?}
     */
    function () { return defaultOptions; }) });
/** @type {?} */
export var UPLOADX_OPTIONS = new InjectionToken('uploadx.options');
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11cGxvYWR4LyIsInNvdXJjZXMiOlsibGliL29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFLeEMsb0NBeUJDOzs7Ozs7O0lBcEJDLHVDQUE4Qjs7Ozs7O0lBSzlCLHFDQUFxQjs7Ozs7O0lBS3JCLG9DQUFxQjs7Ozs7SUFJckIsc0NBQXNCOzs7Ozs7SUFLdEIsa0NBQW1COzs7OztBQUdyQiwyQ0FNQzs7O0lBTEMseUNBQWlCOztJQUNqQiwyQ0FBb0I7O0lBQ3BCLDRDQUFvQjs7SUFDcEIsOENBQTZCOztJQUM3QiwwQ0FBNEI7Ozs7Ozs7QUFRakIsVUFBQyxHQUFHLEVBQUUsS0FBSztJQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsR0FBRyxZQUFVLEtBQU8sQ0FBQyxDQUFDO0lBQ3pELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQzs7SUFSRyxjQUFjLEdBQTBCO0lBQzVDLFFBQVEsRUFBRSxTQUFTO0lBQ25CLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsYUFBYSxFQUFFLFNBQVM7SUFDeEIsU0FBUyxNQUdSO0NBQ0Y7O0FBRUQsTUFBTSxLQUFPLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUN2RCx5QkFBeUIsRUFDekIsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU87OztJQUFFLGNBQU0sT0FBQSxjQUFjLEVBQWQsQ0FBYyxDQUFBLEVBQUUsQ0FDdEQ7O0FBQ0QsTUFBTSxLQUFPLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBaUIsaUJBQWlCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3Rpb25Ub2tlbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXV0aG9yaXplUmVxdWVzdCwgVXBsb2FkZXJDbGFzcywgVXBsb2FkZXJPcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcbmltcG9ydCB7IFVwbG9hZGVyWCB9IGZyb20gJy4vdXBsb2FkZXJ4JztcblxuLyoqXG4gKiBHbG9iYWwgTW9kdWxlIE9wdGlvbnNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBVcGxvYWR4T3B0aW9ucyBleHRlbmRzIFVwbG9hZGVyT3B0aW9ucyB7XG4gIC8qKlxuICAgKiBQcm92aWRlIGEgdXNlci1kZWZpbmVkIGNsYXNzIHRvIHN1cHBvcnQgYW5vdGhlciB1cGxvYWQgcHJvdG9jb2wgb3IgdG8gZXh0ZW5kIGFuIGV4aXN0aW5nIG9uZS5cbiAgICogQGRlZmF1bHRWYWx1ZSBVcGxvYWRYXG4gICAqL1xuICB1cGxvYWRlckNsYXNzPzogVXBsb2FkZXJDbGFzcztcbiAgLyoqXG4gICAqIFNldCB0aGUgbWF4aW11bSBwYXJhbGxlbCB1cGxvYWRzXG4gICAqIEBkZWZhdWx0VmFsdWUgMlxuICAgKi9cbiAgY29uY3VycmVuY3k/OiBudW1iZXI7XG4gIC8qKlxuICAgKiBBdXRvbWF0aWNhbGx5IHN0YXJ0IHVwbG9hZCB3aGVuIGZpbGVzIGFkZGVkXG4gICAqIEBkZWZhdWx0VmFsdWUgdHJ1ZVxuICAgKi9cbiAgYXV0b1VwbG9hZD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBGaWxlIHR5cGVzIHRoZSB1c2VyIGNhbiBwaWNrIGZyb20gdGhlIGZpbGUgaW5wdXRcbiAgICovXG4gIGFsbG93ZWRUeXBlcz86IHN0cmluZztcbiAgLyoqXG4gICAqIEFkZCAnbXVsdGlwbGUnIGF0dHJpYnV0ZVxuICAgKiBAZGVmYXVsdFZhbHVlIHRydWVcbiAgICovXG4gIG11bHRpcGxlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBVcGxvYWR4RmFjdG9yeU9wdGlvbnMgZXh0ZW5kcyBVcGxvYWR4T3B0aW9ucyB7XG4gIGVuZHBvaW50OiBzdHJpbmc7XG4gIGF1dG9VcGxvYWQ6IGJvb2xlYW47XG4gIGNvbmN1cnJlbmN5OiBudW1iZXI7XG4gIHVwbG9hZGVyQ2xhc3M6IFVwbG9hZGVyQ2xhc3M7XG4gIGF1dGhvcml6ZTogQXV0aG9yaXplUmVxdWVzdDtcbn1cblxuY29uc3QgZGVmYXVsdE9wdGlvbnM6IFVwbG9hZHhGYWN0b3J5T3B0aW9ucyA9IHtcbiAgZW5kcG9pbnQ6ICcvdXBsb2FkJyxcbiAgYXV0b1VwbG9hZDogdHJ1ZSxcbiAgY29uY3VycmVuY3k6IDIsXG4gIHVwbG9hZGVyQ2xhc3M6IFVwbG9hZGVyWCxcbiAgYXV0aG9yaXplOiAocmVxLCB0b2tlbikgPT4ge1xuICAgIHRva2VuICYmIChyZXEuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJlYXJlciAke3Rva2VufWApO1xuICAgIHJldHVybiByZXE7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBVUExPQURYX0ZBQ1RPUllfT1BUSU9OUyA9IG5ldyBJbmplY3Rpb25Ub2tlbjxVcGxvYWR4RmFjdG9yeU9wdGlvbnM+KFxuICAndXBsb2FkeC5mYWN0b3J5Lm9wdGlvbnMnLFxuICB7IHByb3ZpZGVkSW46ICdyb290JywgZmFjdG9yeTogKCkgPT4gZGVmYXVsdE9wdGlvbnMgfVxuKTtcbmV4cG9ydCBjb25zdCBVUExPQURYX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48VXBsb2FkeE9wdGlvbnM+KCd1cGxvYWR4Lm9wdGlvbnMnKTtcbiJdfQ==