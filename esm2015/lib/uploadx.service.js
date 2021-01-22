/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, NgZone, Optional } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { UPLOADX_AJAX } from './ajax';
import { IdService } from './id.service';
import { UPLOADX_FACTORY_OPTIONS, UPLOADX_OPTIONS } from './options';
import { pick } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./options";
import * as i2 from "./ajax";
import * as i3 from "./id.service";
/** @type {?} */
const stateKeys = [
    'file',
    'name',
    'progress',
    'remaining',
    'response',
    'responseHeaders',
    'responseStatus',
    'size',
    'speed',
    'status',
    'uploadId',
    'url'
];
/** @type {?} */
const DUE_TIME = 5;
export class UploadxService {
    /**
     * @param {?} options
     * @param {?} defaults
     * @param {?} ajax
     * @param {?} ngZone
     * @param {?} idService
     */
    constructor(options, defaults, ajax, ngZone, idService) {
        this.ajax = ajax;
        this.ngZone = ngZone;
        this.idService = idService;
        /**
         * Upload Queue
         */
        this.queue = [];
        this.eventsStream = new Subject();
        this.subs = [];
        this.stateChange = (/**
         * @param {?} evt
         * @return {?}
         */
        (evt) => {
            this.ngZone.run((/**
             * @return {?}
             */
            () => this.eventsStream.next(pick(evt, stateKeys))));
            if (evt.status !== 'uploading' && evt.status !== 'added') {
                this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                () => setTimeout((/**
                 * @return {?}
                 */
                () => this.processQueue()))));
            }
        });
        this.options = Object.assign({}, defaults, options);
        if (typeof window !== 'undefined') {
            this.subs.push(fromEvent(window, 'online').subscribe((/**
             * @return {?}
             */
            () => this.control({ action: 'upload' }))), fromEvent(window, 'offline').subscribe((/**
             * @return {?}
             */
            () => this.control({ action: 'pause' }))));
        }
    }
    /**
     * Upload status events
     * @return {?}
     */
    get events() {
        return this.eventsStream.asObservable();
    }
    /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits a new value on progress or status changes
     */
    init(options = {}) {
        Object.assign(this.options, options);
        return this.events;
    }
    /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits the current array of uploaders
     */
    connect(options) {
        return this.init(options).pipe(startWith(null), map((/**
         * @return {?}
         */
        () => this.queue)), debounceTime(DUE_TIME));
    }
    /**
     * Terminates all uploads and clears the queue
     * @return {?}
     */
    disconnect() {
        this.queue.forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        uploader => (uploader.status = 'paused')));
        this.queue = [];
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.disconnect();
        this.subs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        sub => sub.unsubscribe()));
    }
    /**
     * Creates uploaders for files and adds them to the upload queue
     * @param {?} files
     * @param {?=} options
     * @return {?}
     */
    handleFiles(files, options = (/** @type {?} */ ({}))) {
        /** @type {?} */
        const instanceOptions = Object.assign({}, this.options, options);
        this.options.concurrency = instanceOptions.concurrency;
        ('name' in files ? [files] : Array.from(files)).forEach((/**
         * @param {?} file
         * @return {?}
         */
        file => this.addUploaderInstance(file, instanceOptions)));
    }
    /**
     * Upload control
     * \@example
     * // pause all
     * this.uploadService.control({ action: 'pause' });
     * // pause upload with uploadId
     * this.uploadService.control({ action: 'pause', uploadId});
     * // set token
     * this.uploadService.control({ token: `TOKEN` });
     * @param {?} evt
     * @return {?}
     */
    control(evt) {
        /** @type {?} */
        const target = evt.uploadId
            ? this.queue.filter((/**
             * @param {?} __0
             * @return {?}
             */
            ({ uploadId }) => uploadId === evt.uploadId))
            : this.queue;
        target.forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        uploader => uploader.configure(evt)));
    }
    /**
     * Returns number of active uploads
     * @return {?}
     */
    runningProcess() {
        return this.queue.filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ status }) => status === 'uploading' || status === 'retry')).length;
    }
    /**
     * Performs http requests
     * @template T
     * @param {?} config
     * @return {?}
     */
    request(config) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            config.data = config.body ? config.body : config.data;
            return this.ajax.request(config);
        });
    }
    /**
     * @private
     * @param {?} file
     * @param {?} options
     * @return {?}
     */
    addUploaderInstance(file, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const uploader = new options.uploaderClass(file, options, this.stateChange, this.ajax);
            ((/** @type {?} */ (uploader.uploadId))) = yield this.idService.generateId(uploader);
            this.queue.push(uploader);
            uploader.status = options.autoUpload && onLine() ? 'queue' : 'added';
        });
    }
    /**
     * @private
     * @return {?}
     */
    processQueue() {
        this.queue = this.queue.filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ status }) => status !== 'cancelled'));
        this.queue
            .filter((/**
         * @param {?} __0
         * @return {?}
         */
        ({ status }) => status === 'queue'))
            .slice(0, Math.max(this.options.concurrency - this.runningProcess(), 0))
            .forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        uploader => uploader.upload()));
    }
}
UploadxService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */
UploadxService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [UPLOADX_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [UPLOADX_FACTORY_OPTIONS,] }] },
    { type: undefined, decorators: [{ type: Inject, args: [UPLOADX_AJAX,] }] },
    { type: NgZone },
    { type: IdService }
];
/** @nocollapse */ UploadxService.ngInjectableDef = i0.defineInjectable({ factory: function UploadxService_Factory() { return new UploadxService(i0.inject(i1.UPLOADX_OPTIONS, 8), i0.inject(i1.UPLOADX_FACTORY_OPTIONS), i0.inject(i2.UPLOADX_AJAX), i0.inject(i0.NgZone), i0.inject(i3.IdService)); }, token: UploadxService, providedIn: "root" });
if (false) {
    /**
     * Upload Queue
     * @type {?}
     */
    UploadxService.prototype.queue;
    /** @type {?} */
    UploadxService.prototype.options;
    /**
     * @type {?}
     * @private
     */
    UploadxService.prototype.eventsStream;
    /**
     * @type {?}
     * @private
     */
    UploadxService.prototype.subs;
    /**
     * @type {?}
     * @private
     */
    UploadxService.prototype.stateChange;
    /** @type {?} */
    UploadxService.prototype.ajax;
    /**
     * @type {?}
     * @private
     */
    UploadxService.prototype.ngZone;
    /**
     * @type {?}
     * @private
     */
    UploadxService.prototype.idService;
}
/**
 * @return {?}
 */
function onLine() {
    return typeof window !== 'undefined' ? window.navigator.onLine : true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkeC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVwbG9hZHgvIiwic291cmNlcyI6WyJsaWIvdXBsb2FkeC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsU0FBUyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUF5QyxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDN0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFHaEIsTUFBTSxXQUFXLENBQUM7QUFFbkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7O01BRXpCLFNBQVMsR0FBNkI7SUFDMUMsTUFBTTtJQUNOLE1BQU07SUFDTixVQUFVO0lBQ1YsV0FBVztJQUNYLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLE1BQU07SUFDTixPQUFPO0lBQ1AsUUFBUTtJQUNSLFVBQVU7SUFDVixLQUFLO0NBQ047O01BRUssUUFBUSxHQUFHLENBQUM7QUFHbEIsTUFBTSxPQUFPLGNBQWM7Ozs7Ozs7O0lBWXpCLFlBQ3VDLE9BQThCLEVBQ2xDLFFBQStCLEVBQ2pDLElBQVUsRUFDakMsTUFBYyxFQUNkLFNBQW9CO1FBRkcsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNqQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBVzs7OztRQWY5QixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBRU4saUJBQVksR0FBeUIsSUFBSSxPQUFP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dUI7O0lBQ3ZCLGlDQUErQjs7Ozs7SUFDL0Isc0NBQW9FOzs7OztJQUNwRSw4QkFBa0M7Ozs7O0lBc0dsQyxxQ0FLRTs7SUFqR0EsOEJBQXlDOzs7OztJQUN6QyxnQ0FBc0I7Ozs7O0lBQ3RCLG1DQUE0Qjs7Ozs7QUFpSGhDLFNBQVMsTUFBTTtJQUNiLE9BQU8sT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBamF4LCBBamF4UmVxdWVzdENvbmZpZywgQWpheFJlc3BvbnNlLCBVUExPQURYX0FKQVggfSBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IHsgSWRTZXJ2aWNlIH0gZnJvbSAnLi9pZC5zZXJ2aWNlJztcbmltcG9ydCB7IFVwbG9hZFN0YXRlLCBVcGxvYWR4Q29udHJvbEV2ZW50LCBXcml0YWJsZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBVUExPQURYX0ZBQ1RPUllfT1BUSU9OUyxcbiAgVVBMT0FEWF9PUFRJT05TLFxuICBVcGxvYWR4RmFjdG9yeU9wdGlvbnMsXG4gIFVwbG9hZHhPcHRpb25zXG59IGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgeyBVcGxvYWRlciB9IGZyb20gJy4vdXBsb2FkZXInO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBzdGF0ZUtleXM6IEFycmF5PGtleW9mIFVwbG9hZFN0YXRlPiA9IFtcbiAgJ2ZpbGUnLFxuICAnbmFtZScsXG4gICdwcm9ncmVzcycsXG4gICdyZW1haW5pbmcnLFxuICAncmVzcG9uc2UnLFxuICAncmVzcG9uc2VIZWFkZXJzJyxcbiAgJ3Jlc3BvbnNlU3RhdHVzJyxcbiAgJ3NpemUnLFxuICAnc3BlZWQnLFxuICAnc3RhdHVzJyxcbiAgJ3VwbG9hZElkJyxcbiAgJ3VybCdcbl07XG5cbmNvbnN0IERVRV9USU1FID0gNTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBVcGxvYWR4U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBVcGxvYWQgUXVldWUgKi9cbiAgcXVldWU6IFVwbG9hZGVyW10gPSBbXTtcbiAgb3B0aW9uczogVXBsb2FkeEZhY3RvcnlPcHRpb25zO1xuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50c1N0cmVhbTogU3ViamVjdDxVcGxvYWRTdGF0ZT4gPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLyoqIFVwbG9hZCBzdGF0dXMgZXZlbnRzICovXG4gIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxVcGxvYWRTdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50c1N0cmVhbS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVVBMT0FEWF9PUFRJT05TKSBvcHRpb25zOiBVcGxvYWR4T3B0aW9ucyB8IG51bGwsXG4gICAgQEluamVjdChVUExPQURYX0ZBQ1RPUllfT1BUSU9OUykgZGVmYXVsdHM6IFVwbG9hZHhGYWN0b3J5T3B0aW9ucyxcbiAgICBASW5qZWN0KFVQTE9BRFhfQUpBWCkgcmVhZG9ubHkgYWpheDogQWpheCxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgaWRTZXJ2aWNlOiBJZFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5zdWJzLnB1c2goXG4gICAgICAgIGZyb21FdmVudCh3aW5kb3csICdvbmxpbmUnKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb250cm9sKHsgYWN0aW9uOiAndXBsb2FkJyB9KSksXG4gICAgICAgIGZyb21FdmVudCh3aW5kb3csICdvZmZsaW5lJykuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29udHJvbCh7IGFjdGlvbjogJ3BhdXNlJyB9KSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHNlcnZpY2VcbiAgICogQHBhcmFtIG9wdGlvbnMgZ2xvYmFsIG1vZHVsZSBvcHRpb25zXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhIG5ldyB2YWx1ZSBvbiBwcm9ncmVzcyBvciBzdGF0dXMgY2hhbmdlc1xuICAgKi9cbiAgaW5pdChvcHRpb25zOiBVcGxvYWR4T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxVcGxvYWRTdGF0ZT4ge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5ldmVudHM7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgc2VydmljZVxuICAgKiBAcGFyYW0gb3B0aW9ucyBnbG9iYWwgbW9kdWxlIG9wdGlvbnNcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBjdXJyZW50IGFycmF5IG9mIHVwbG9hZGVyc1xuICAgKi9cbiAgY29ubmVjdChvcHRpb25zPzogVXBsb2FkeE9wdGlvbnMpOiBPYnNlcnZhYmxlPFVwbG9hZGVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5pbml0KG9wdGlvbnMpLnBpcGUoXG4gICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICBtYXAoKCkgPT4gdGhpcy5xdWV1ZSksXG4gICAgICBkZWJvdW5jZVRpbWUoRFVFX1RJTUUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXJtaW5hdGVzIGFsbCB1cGxvYWRzIGFuZCBjbGVhcnMgdGhlIHF1ZXVlXG4gICAqL1xuICBkaXNjb25uZWN0KCk6IHZvaWQge1xuICAgIHRoaXMucXVldWUuZm9yRWFjaCh1cGxvYWRlciA9PiAodXBsb2FkZXIuc3RhdHVzID0gJ3BhdXNlZCcpKTtcbiAgICB0aGlzLnF1ZXVlID0gW107XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLnN1YnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdXBsb2FkZXJzIGZvciBmaWxlcyBhbmQgYWRkcyB0aGVtIHRvIHRoZSB1cGxvYWQgcXVldWVcbiAgICovXG4gIGhhbmRsZUZpbGVzKGZpbGVzOiBGaWxlTGlzdCB8IEZpbGUgfCBGaWxlW10sIG9wdGlvbnMgPSB7fSBhcyBVcGxvYWR4T3B0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IGluc3RhbmNlT3B0aW9uczogVXBsb2FkeEZhY3RvcnlPcHRpb25zID0geyAuLi50aGlzLm9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgICB0aGlzLm9wdGlvbnMuY29uY3VycmVuY3kgPSBpbnN0YW5jZU9wdGlvbnMuY29uY3VycmVuY3k7XG4gICAgKCduYW1lJyBpbiBmaWxlcyA/IFtmaWxlc10gOiBBcnJheS5mcm9tKGZpbGVzKSkuZm9yRWFjaChmaWxlID0+XG4gICAgICB0aGlzLmFkZFVwbG9hZGVySW5zdGFuY2UoZmlsZSwgaW5zdGFuY2VPcHRpb25zKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRyb2xcbiAgICogQGV4YW1wbGVcbiAgICogLy8gcGF1c2UgYWxsXG4gICAqIHRoaXMudXBsb2FkU2VydmljZS5jb250cm9sKHsgYWN0aW9uOiAncGF1c2UnIH0pO1xuICAgKiAvLyBwYXVzZSB1cGxvYWQgd2l0aCB1cGxvYWRJZFxuICAgKiB0aGlzLnVwbG9hZFNlcnZpY2UuY29udHJvbCh7IGFjdGlvbjogJ3BhdXNlJywgdXBsb2FkSWR9KTtcbiAgICogLy8gc2V0IHRva2VuXG4gICAqIHRoaXMudXBsb2FkU2VydmljZS5jb250cm9sKHsgdG9rZW46IGBUT0tFTmAgfSk7XG4gICAqL1xuICBjb250cm9sKGV2dDogVXBsb2FkeENvbnRyb2xFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2dC51cGxvYWRJZFxuICAgICAgPyB0aGlzLnF1ZXVlLmZpbHRlcigoeyB1cGxvYWRJZCB9KSA9PiB1cGxvYWRJZCA9PT0gZXZ0LnVwbG9hZElkKVxuICAgICAgOiB0aGlzLnF1ZXVlO1xuICAgIHRhcmdldC5mb3JFYWNoKHVwbG9hZGVyID0+IHVwbG9hZGVyLmNvbmZpZ3VyZShldnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG51bWJlciBvZiBhY3RpdmUgdXBsb2Fkc1xuICAgKi9cbiAgcnVubmluZ1Byb2Nlc3MoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5maWx0ZXIoKHsgc3RhdHVzIH0pID0+IHN0YXR1cyA9PT0gJ3VwbG9hZGluZycgfHwgc3RhdHVzID09PSAncmV0cnknKS5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgaHR0cCByZXF1ZXN0c1xuICAgKi9cbiAgYXN5bmMgcmVxdWVzdDxUID0gc3RyaW5nPihjb25maWc6IEFqYXhSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBamF4UmVzcG9uc2U8VD4+IHtcbiAgICBjb25maWcuZGF0YSA9IGNvbmZpZy5ib2R5ID8gY29uZmlnLmJvZHkgOiBjb25maWcuZGF0YTtcbiAgICByZXR1cm4gdGhpcy5hamF4LnJlcXVlc3QoY29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGVDaGFuZ2UgPSAoZXZ0OiBVcGxvYWRTdGF0ZSkgPT4ge1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmV2ZW50c1N0cmVhbS5uZXh0KHBpY2soZXZ0LCBzdGF0ZUtleXMpKSk7XG4gICAgaWYgKGV2dC5zdGF0dXMgIT09ICd1cGxvYWRpbmcnICYmIGV2dC5zdGF0dXMgIT09ICdhZGRlZCcpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzUXVldWUoKSkpO1xuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGFzeW5jIGFkZFVwbG9hZGVySW5zdGFuY2UoZmlsZTogRmlsZSwgb3B0aW9uczogVXBsb2FkeEZhY3RvcnlPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdXBsb2FkZXIgPSBuZXcgb3B0aW9ucy51cGxvYWRlckNsYXNzKGZpbGUsIG9wdGlvbnMsIHRoaXMuc3RhdGVDaGFuZ2UsIHRoaXMuYWpheCk7XG4gICAgKHVwbG9hZGVyLnVwbG9hZElkIGFzIFdyaXRhYmxlPHN0cmluZz4pID0gYXdhaXQgdGhpcy5pZFNlcnZpY2UuZ2VuZXJhdGVJZCh1cGxvYWRlcik7XG4gICAgdGhpcy5xdWV1ZS5wdXNoKHVwbG9hZGVyKTtcbiAgICB1cGxvYWRlci5zdGF0dXMgPSBvcHRpb25zLmF1dG9VcGxvYWQgJiYgb25MaW5lKCkgPyAncXVldWUnIDogJ2FkZGVkJztcbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc1F1ZXVlKCk6IHZvaWQge1xuICAgIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLmZpbHRlcigoeyBzdGF0dXMgfSkgPT4gc3RhdHVzICE9PSAnY2FuY2VsbGVkJyk7XG4gICAgdGhpcy5xdWV1ZVxuICAgICAgLmZpbHRlcigoeyBzdGF0dXMgfSkgPT4gc3RhdHVzID09PSAncXVldWUnKVxuICAgICAgLnNsaWNlKDAsIE1hdGgubWF4KHRoaXMub3B0aW9ucy5jb25jdXJyZW5jeSAtIHRoaXMucnVubmluZ1Byb2Nlc3MoKSwgMCkpXG4gICAgICAuZm9yRWFjaCh1cGxvYWRlciA9PiB1cGxvYWRlci51cGxvYWQoKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb25MaW5lKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cubmF2aWdhdG9yLm9uTGluZSA6IHRydWU7XG59XG4iXX0=