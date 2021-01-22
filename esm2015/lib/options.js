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
const ɵ0 = /**
 * @param {?} req
 * @param {?} token
 * @return {?}
 */
(req, token) => {
    token && (req.headers.Authorization = `Bearer ${token}`);
    return req;
};
/** @type {?} */
const defaultOptions = {
    endpoint: '/upload',
    autoUpload: true,
    concurrency: 2,
    uploaderClass: UploaderX,
    authorize: (ɵ0)
};
/** @type {?} */
export const UPLOADX_FACTORY_OPTIONS = new InjectionToken('uploadx.factory.options', { providedIn: 'root', factory: (/**
     * @return {?}
     */
    () => defaultOptions) });
/** @type {?} */
export const UPLOADX_OPTIONS = new InjectionToken('uploadx.options');
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11cGxvYWR4LyIsInNvdXJjZXMiOlsibGliL29wdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0MsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7Ozs7QUFLeEMsb0NBeUJDOzs7Ozs7O0lBcEJDLHVDQUE4Qjs7Ozs7O0lBSzlCLHFDQUFxQjs7Ozs7O0lBS3JCLG9DQUFxQjs7Ozs7SUFJckIsc0NBQXNCOzs7Ozs7SUFLdEIsa0NBQW1COzs7OztBQUdyQiwyQ0FNQzs7O0lBTEMseUNBQWlCOztJQUNqQiwyQ0FBb0I7O0lBQ3BCLDRDQUFvQjs7SUFDcEIsOENBQTZCOztJQUM3QiwwQ0FBNEI7Ozs7Ozs7QUFRakIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUU7SUFDeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEdBQUcsVUFBVSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQzs7TUFSRyxjQUFjLEdBQTBCO0lBQzVDLFFBQVEsRUFBRSxTQUFTO0lBQ25CLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsYUFBYSxFQUFFLFNBQVM7SUFDeEIsU0FBUyxNQUdSO0NBQ0Y7O0FBRUQsTUFBTSxPQUFPLHVCQUF1QixHQUFHLElBQUksY0FBYyxDQUN2RCx5QkFBeUIsRUFDekIsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU87OztJQUFFLEdBQUcsRUFBRSxDQUFDLGNBQWMsQ0FBQSxFQUFFLENBQ3REOztBQUNELE1BQU0sT0FBTyxlQUFlLEdBQUcsSUFBSSxjQUFjLENBQWlCLGlCQUFpQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0aW9uVG9rZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGhvcml6ZVJlcXVlc3QsIFVwbG9hZGVyQ2xhc3MsIFVwbG9hZGVyT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBVcGxvYWRlclggfSBmcm9tICcuL3VwbG9hZGVyeCc7XG5cbi8qKlxuICogR2xvYmFsIE1vZHVsZSBPcHRpb25zXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgVXBsb2FkeE9wdGlvbnMgZXh0ZW5kcyBVcGxvYWRlck9wdGlvbnMge1xuICAvKipcbiAgICogUHJvdmlkZSBhIHVzZXItZGVmaW5lZCBjbGFzcyB0byBzdXBwb3J0IGFub3RoZXIgdXBsb2FkIHByb3RvY29sIG9yIHRvIGV4dGVuZCBhbiBleGlzdGluZyBvbmUuXG4gICAqIEBkZWZhdWx0VmFsdWUgVXBsb2FkWFxuICAgKi9cbiAgdXBsb2FkZXJDbGFzcz86IFVwbG9hZGVyQ2xhc3M7XG4gIC8qKlxuICAgKiBTZXQgdGhlIG1heGltdW0gcGFyYWxsZWwgdXBsb2Fkc1xuICAgKiBAZGVmYXVsdFZhbHVlIDJcbiAgICovXG4gIGNvbmN1cnJlbmN5PzogbnVtYmVyO1xuICAvKipcbiAgICogQXV0b21hdGljYWxseSBzdGFydCB1cGxvYWQgd2hlbiBmaWxlcyBhZGRlZFxuICAgKiBAZGVmYXVsdFZhbHVlIHRydWVcbiAgICovXG4gIGF1dG9VcGxvYWQ/OiBib29sZWFuO1xuICAvKipcbiAgICogRmlsZSB0eXBlcyB0aGUgdXNlciBjYW4gcGljayBmcm9tIHRoZSBmaWxlIGlucHV0XG4gICAqL1xuICBhbGxvd2VkVHlwZXM/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBBZGQgJ211bHRpcGxlJyBhdHRyaWJ1dGVcbiAgICogQGRlZmF1bHRWYWx1ZSB0cnVlXG4gICAqL1xuICBtdWx0aXBsZT86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBsb2FkeEZhY3RvcnlPcHRpb25zIGV4dGVuZHMgVXBsb2FkeE9wdGlvbnMge1xuICBlbmRwb2ludDogc3RyaW5nO1xuICBhdXRvVXBsb2FkOiBib29sZWFuO1xuICBjb25jdXJyZW5jeTogbnVtYmVyO1xuICB1cGxvYWRlckNsYXNzOiBVcGxvYWRlckNsYXNzO1xuICBhdXRob3JpemU6IEF1dGhvcml6ZVJlcXVlc3Q7XG59XG5cbmNvbnN0IGRlZmF1bHRPcHRpb25zOiBVcGxvYWR4RmFjdG9yeU9wdGlvbnMgPSB7XG4gIGVuZHBvaW50OiAnL3VwbG9hZCcsXG4gIGF1dG9VcGxvYWQ6IHRydWUsXG4gIGNvbmN1cnJlbmN5OiAyLFxuICB1cGxvYWRlckNsYXNzOiBVcGxvYWRlclgsXG4gIGF1dGhvcml6ZTogKHJlcSwgdG9rZW4pID0+IHtcbiAgICB0b2tlbiAmJiAocmVxLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9IGBCZWFyZXIgJHt0b2tlbn1gKTtcbiAgICByZXR1cm4gcmVxO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgVVBMT0FEWF9GQUNUT1JZX09QVElPTlMgPSBuZXcgSW5qZWN0aW9uVG9rZW48VXBsb2FkeEZhY3RvcnlPcHRpb25zPihcbiAgJ3VwbG9hZHguZmFjdG9yeS5vcHRpb25zJyxcbiAgeyBwcm92aWRlZEluOiAncm9vdCcsIGZhY3Rvcnk6ICgpID0+IGRlZmF1bHRPcHRpb25zIH1cbik7XG5leHBvcnQgY29uc3QgVVBMT0FEWF9PUFRJT05TID0gbmV3IEluamVjdGlvblRva2VuPFVwbG9hZHhPcHRpb25zPigndXBsb2FkeC5vcHRpb25zJyk7XG4iXX0=