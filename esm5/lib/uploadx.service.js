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
var stateKeys = [
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
var DUE_TIME = 5;
var UploadxService = /** @class */ (function () {
    function UploadxService(options, defaults, ajax, ngZone, idService) {
        var _this = this;
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
        function (evt) {
            _this.ngZone.run((/**
             * @return {?}
             */
            function () { return _this.eventsStream.next(pick(evt, stateKeys)); }));
            if (evt.status !== 'uploading' && evt.status !== 'added') {
                _this.ngZone.runOutsideAngular((/**
                 * @return {?}
                 */
                function () { return setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.processQueue(); })); }));
            }
        });
        this.options = Object.assign({}, defaults, options);
        if (typeof window !== 'undefined') {
            this.subs.push(fromEvent(window, 'online').subscribe((/**
             * @return {?}
             */
            function () { return _this.control({ action: 'upload' }); })), fromEvent(window, 'offline').subscribe((/**
             * @return {?}
             */
            function () { return _this.control({ action: 'pause' }); })));
        }
    }
    Object.defineProperty(UploadxService.prototype, "events", {
        /** Upload status events */
        get: /**
         * Upload status events
         * @return {?}
         */
        function () {
            return this.eventsStream.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Initializes service
     * @param options global module options
     * @returns Observable that emits a new value on progress or status changes
     */
    /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits a new value on progress or status changes
     */
    UploadxService.prototype.init = /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits a new value on progress or status changes
     */
    function (options) {
        if (options === void 0) { options = {}; }
        Object.assign(this.options, options);
        return this.events;
    };
    /**
     * Initializes service
     * @param options global module options
     * @returns Observable that emits the current array of uploaders
     */
    /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits the current array of uploaders
     */
    UploadxService.prototype.connect = /**
     * Initializes service
     * @param {?=} options global module options
     * @return {?} Observable that emits the current array of uploaders
     */
    function (options) {
        var _this = this;
        return this.init(options).pipe(startWith(null), map((/**
         * @return {?}
         */
        function () { return _this.queue; })), debounceTime(DUE_TIME));
    };
    /**
     * Terminates all uploads and clears the queue
     */
    /**
     * Terminates all uploads and clears the queue
     * @return {?}
     */
    UploadxService.prototype.disconnect = /**
     * Terminates all uploads and clears the queue
     * @return {?}
     */
    function () {
        this.queue.forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        function (uploader) { return (uploader.status = 'paused'); }));
        this.queue = [];
    };
    /**
     * @return {?}
     */
    UploadxService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.disconnect();
        this.subs.forEach((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) { return sub.unsubscribe(); }));
    };
    /**
     * Creates uploaders for files and adds them to the upload queue
     */
    /**
     * Creates uploaders for files and adds them to the upload queue
     * @param {?} files
     * @param {?=} options
     * @return {?}
     */
    UploadxService.prototype.handleFiles = /**
     * Creates uploaders for files and adds them to the upload queue
     * @param {?} files
     * @param {?=} options
     * @return {?}
     */
    function (files, options) {
        var _this = this;
        if (options === void 0) { options = (/** @type {?} */ ({})); }
        /** @type {?} */
        var instanceOptions = tslib_1.__assign({}, this.options, options);
        this.options.concurrency = instanceOptions.concurrency;
        ('name' in files ? [files] : Array.from(files)).forEach((/**
         * @param {?} file
         * @return {?}
         */
        function (file) {
            return _this.addUploaderInstance(file, instanceOptions);
        }));
    };
    /**
     * Upload control
     * @example
     * // pause all
     * this.uploadService.control({ action: 'pause' });
     * // pause upload with uploadId
     * this.uploadService.control({ action: 'pause', uploadId});
     * // set token
     * this.uploadService.control({ token: `TOKEN` });
     */
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
    UploadxService.prototype.control = /**
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
    function (evt) {
        /** @type {?} */
        var target = evt.uploadId
            ? this.queue.filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var uploadId = _a.uploadId;
                return uploadId === evt.uploadId;
            }))
            : this.queue;
        target.forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        function (uploader) { return uploader.configure(evt); }));
    };
    /**
     * Returns number of active uploads
     */
    /**
     * Returns number of active uploads
     * @return {?}
     */
    UploadxService.prototype.runningProcess = /**
     * Returns number of active uploads
     * @return {?}
     */
    function () {
        return this.queue.filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var status = _a.status;
            return status === 'uploading' || status === 'retry';
        })).length;
    };
    /**
     * Performs http requests
     */
    /**
     * Performs http requests
     * @template T
     * @param {?} config
     * @return {?}
     */
    UploadxService.prototype.request = /**
     * Performs http requests
     * @template T
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                config.data = config.body ? config.body : config.data;
                return [2 /*return*/, this.ajax.request(config)];
            });
        });
    };
    /**
     * @private
     * @param {?} file
     * @param {?} options
     * @return {?}
     */
    UploadxService.prototype.addUploaderInstance = /**
     * @private
     * @param {?} file
     * @param {?} options
     * @return {?}
     */
    function (file, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var uploader;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uploader = new options.uploaderClass(file, options, this.stateChange, this.ajax);
                        return [4 /*yield*/, this.idService.generateId(uploader)];
                    case 1:
                        ((/** @type {?} */ (uploader.uploadId))) = _a.sent();
                        this.queue.push(uploader);
                        uploader.status = options.autoUpload && onLine() ? 'queue' : 'added';
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @private
     * @return {?}
     */
    UploadxService.prototype.processQueue = /**
     * @private
     * @return {?}
     */
    function () {
        this.queue = this.queue.filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var status = _a.status;
            return status !== 'cancelled';
        }));
        this.queue
            .filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var status = _a.status;
            return status === 'queue';
        }))
            .slice(0, Math.max(this.options.concurrency - this.runningProcess(), 0))
            .forEach((/**
         * @param {?} uploader
         * @return {?}
         */
        function (uploader) { return uploader.upload(); }));
    };
    UploadxService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    UploadxService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [UPLOADX_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [UPLOADX_FACTORY_OPTIONS,] }] },
        { type: undefined, decorators: [{ type: Inject, args: [UPLOADX_AJAX,] }] },
        { type: NgZone },
        { type: IdService }
    ]; };
    /** @nocollapse */ UploadxService.ngInjectableDef = i0.defineInjectable({ factory: function UploadxService_Factory() { return new UploadxService(i0.inject(i1.UPLOADX_OPTIONS, 8), i0.inject(i1.UPLOADX_FACTORY_OPTIONS), i0.inject(i2.UPLOADX_AJAX), i0.inject(i0.NgZone), i0.inject(i3.IdService)); }, token: UploadxService, providedIn: "root" });
    return UploadxService;
}());
export { UploadxService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkeC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVwbG9hZHgvIiwic291cmNlcyI6WyJsaWIvdXBsb2FkeC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFhLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUUsU0FBUyxFQUFjLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUQsT0FBTyxFQUF5QyxZQUFZLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDN0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGVBQWUsRUFHaEIsTUFBTSxXQUFXLENBQUM7QUFFbkIsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7O0lBRXpCLFNBQVMsR0FBNkI7SUFDMUMsTUFBTTtJQUNOLE1BQU07SUFDTixVQUFVO0lBQ1YsV0FBVztJQUNYLFVBQVU7SUFDVixpQkFBaUI7SUFDakIsZ0JBQWdCO0lBQ2hCLE1BQU07SUFDTixPQUFPO0lBQ1AsUUFBUTtJQUNSLFVBQVU7SUFDVixLQUFLO0NBQ047O0lBRUssUUFBUSxHQUFHLENBQUM7QUFFbEI7SUFhRSx3QkFDdUMsT0FBOEIsRUFDbEMsUUFBK0IsRUFDakMsSUFBVSxFQUNqQyxNQUFjLEVBQ2QsU0FBb0I7UUFMOUIsaUJBY0M7UUFYZ0MsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNqQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsY0FBUyxHQUFULFNBQVMsQ0FBVzs7OztRQWY5QixVQUFLLEdBQWUsRUFBRSxDQUFDO1FBRU4saUJBQVksR0FBeUIsSUFBSSxPQUFPLEVBQUUsQ0FB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LE9BQUEsTUFBTSxLQUFLLE9BQU87UUFBbEIsQ0FBa0IsRUFBQzthQUMxQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3ZFLE9BQU87Ozs7UUFBQyxVQUFBLFFBQVEsSUFBSSxPQUFBLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBakIsQ0FBaUIsRUFBQyxDQUFDO0lBQzVDLENBQUM7O2dCQWhJRixVQUFVLFNBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFOzs7O2dEQWM3QixRQUFRLFlBQUksTUFBTSxTQUFDLGVBQWU7Z0RBQ2xDLE1BQU0sU0FBQyx1QkFBdUI7Z0RBQzlCLE1BQU0sU0FBQyxZQUFZO2dCQWhESyxNQUFNO2dCQUkxQixTQUFTOzs7eUJBSmxCO0NBaUtDLEFBaklELElBaUlDO1NBaElZLGNBQWM7Ozs7OztJQUV6QiwrQkFBdUI7O0lBQ3ZCLGlDQUErQjs7Ozs7SUFDL0Isc0NBQW9FOzs7OztJQUNwRSw4QkFBa0M7Ozs7O0lBc0dsQyxxQ0FLRTs7SUFqR0EsOEJBQXlDOzs7OztJQUN6QyxnQ0FBc0I7Ozs7O0lBQ3RCLG1DQUE0Qjs7Ozs7QUFpSGhDLFNBQVMsTUFBTTtJQUNiLE9BQU8sT0FBTyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIE5nWm9uZSwgT25EZXN0cm95LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgbWFwLCBzdGFydFdpdGggfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBBamF4LCBBamF4UmVxdWVzdENvbmZpZywgQWpheFJlc3BvbnNlLCBVUExPQURYX0FKQVggfSBmcm9tICcuL2FqYXgnO1xuaW1wb3J0IHsgSWRTZXJ2aWNlIH0gZnJvbSAnLi9pZC5zZXJ2aWNlJztcbmltcG9ydCB7IFVwbG9hZFN0YXRlLCBVcGxvYWR4Q29udHJvbEV2ZW50LCBXcml0YWJsZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5pbXBvcnQge1xuICBVUExPQURYX0ZBQ1RPUllfT1BUSU9OUyxcbiAgVVBMT0FEWF9PUFRJT05TLFxuICBVcGxvYWR4RmFjdG9yeU9wdGlvbnMsXG4gIFVwbG9hZHhPcHRpb25zXG59IGZyb20gJy4vb3B0aW9ucyc7XG5pbXBvcnQgeyBVcGxvYWRlciB9IGZyb20gJy4vdXBsb2FkZXInO1xuaW1wb3J0IHsgcGljayB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBzdGF0ZUtleXM6IEFycmF5PGtleW9mIFVwbG9hZFN0YXRlPiA9IFtcbiAgJ2ZpbGUnLFxuICAnbmFtZScsXG4gICdwcm9ncmVzcycsXG4gICdyZW1haW5pbmcnLFxuICAncmVzcG9uc2UnLFxuICAncmVzcG9uc2VIZWFkZXJzJyxcbiAgJ3Jlc3BvbnNlU3RhdHVzJyxcbiAgJ3NpemUnLFxuICAnc3BlZWQnLFxuICAnc3RhdHVzJyxcbiAgJ3VwbG9hZElkJyxcbiAgJ3VybCdcbl07XG5cbmNvbnN0IERVRV9USU1FID0gNTtcblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBVcGxvYWR4U2VydmljZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIC8qKiBVcGxvYWQgUXVldWUgKi9cbiAgcXVldWU6IFVwbG9hZGVyW10gPSBbXTtcbiAgb3B0aW9uczogVXBsb2FkeEZhY3RvcnlPcHRpb25zO1xuICBwcml2YXRlIHJlYWRvbmx5IGV2ZW50c1N0cmVhbTogU3ViamVjdDxVcGxvYWRTdGF0ZT4gPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIHN1YnM6IFN1YnNjcmlwdGlvbltdID0gW107XG5cbiAgLyoqIFVwbG9hZCBzdGF0dXMgZXZlbnRzICovXG4gIGdldCBldmVudHMoKTogT2JzZXJ2YWJsZTxVcGxvYWRTdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50c1N0cmVhbS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoVVBMT0FEWF9PUFRJT05TKSBvcHRpb25zOiBVcGxvYWR4T3B0aW9ucyB8IG51bGwsXG4gICAgQEluamVjdChVUExPQURYX0ZBQ1RPUllfT1BUSU9OUykgZGVmYXVsdHM6IFVwbG9hZHhGYWN0b3J5T3B0aW9ucyxcbiAgICBASW5qZWN0KFVQTE9BRFhfQUpBWCkgcmVhZG9ubHkgYWpheDogQWpheCxcbiAgICBwcml2YXRlIG5nWm9uZTogTmdab25lLFxuICAgIHByaXZhdGUgaWRTZXJ2aWNlOiBJZFNlcnZpY2VcbiAgKSB7XG4gICAgdGhpcy5vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5zdWJzLnB1c2goXG4gICAgICAgIGZyb21FdmVudCh3aW5kb3csICdvbmxpbmUnKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb250cm9sKHsgYWN0aW9uOiAndXBsb2FkJyB9KSksXG4gICAgICAgIGZyb21FdmVudCh3aW5kb3csICdvZmZsaW5lJykuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29udHJvbCh7IGFjdGlvbjogJ3BhdXNlJyB9KSlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIHNlcnZpY2VcbiAgICogQHBhcmFtIG9wdGlvbnMgZ2xvYmFsIG1vZHVsZSBvcHRpb25zXG4gICAqIEByZXR1cm5zIE9ic2VydmFibGUgdGhhdCBlbWl0cyBhIG5ldyB2YWx1ZSBvbiBwcm9ncmVzcyBvciBzdGF0dXMgY2hhbmdlc1xuICAgKi9cbiAgaW5pdChvcHRpb25zOiBVcGxvYWR4T3B0aW9ucyA9IHt9KTogT2JzZXJ2YWJsZTxVcGxvYWRTdGF0ZT4ge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5vcHRpb25zLCBvcHRpb25zKTtcbiAgICByZXR1cm4gdGhpcy5ldmVudHM7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZXMgc2VydmljZVxuICAgKiBAcGFyYW0gb3B0aW9ucyBnbG9iYWwgbW9kdWxlIG9wdGlvbnNcbiAgICogQHJldHVybnMgT2JzZXJ2YWJsZSB0aGF0IGVtaXRzIHRoZSBjdXJyZW50IGFycmF5IG9mIHVwbG9hZGVyc1xuICAgKi9cbiAgY29ubmVjdChvcHRpb25zPzogVXBsb2FkeE9wdGlvbnMpOiBPYnNlcnZhYmxlPFVwbG9hZGVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5pbml0KG9wdGlvbnMpLnBpcGUoXG4gICAgICBzdGFydFdpdGgobnVsbCksXG4gICAgICBtYXAoKCkgPT4gdGhpcy5xdWV1ZSksXG4gICAgICBkZWJvdW5jZVRpbWUoRFVFX1RJTUUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUZXJtaW5hdGVzIGFsbCB1cGxvYWRzIGFuZCBjbGVhcnMgdGhlIHF1ZXVlXG4gICAqL1xuICBkaXNjb25uZWN0KCk6IHZvaWQge1xuICAgIHRoaXMucXVldWUuZm9yRWFjaCh1cGxvYWRlciA9PiAodXBsb2FkZXIuc3RhdHVzID0gJ3BhdXNlZCcpKTtcbiAgICB0aGlzLnF1ZXVlID0gW107XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICB0aGlzLnN1YnMuZm9yRWFjaChzdWIgPT4gc3ViLnVuc3Vic2NyaWJlKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdXBsb2FkZXJzIGZvciBmaWxlcyBhbmQgYWRkcyB0aGVtIHRvIHRoZSB1cGxvYWQgcXVldWVcbiAgICovXG4gIGhhbmRsZUZpbGVzKGZpbGVzOiBGaWxlTGlzdCB8IEZpbGUgfCBGaWxlW10sIG9wdGlvbnMgPSB7fSBhcyBVcGxvYWR4T3B0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IGluc3RhbmNlT3B0aW9uczogVXBsb2FkeEZhY3RvcnlPcHRpb25zID0geyAuLi50aGlzLm9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgICB0aGlzLm9wdGlvbnMuY29uY3VycmVuY3kgPSBpbnN0YW5jZU9wdGlvbnMuY29uY3VycmVuY3k7XG4gICAgKCduYW1lJyBpbiBmaWxlcyA/IFtmaWxlc10gOiBBcnJheS5mcm9tKGZpbGVzKSkuZm9yRWFjaChmaWxlID0+XG4gICAgICB0aGlzLmFkZFVwbG9hZGVySW5zdGFuY2UoZmlsZSwgaW5zdGFuY2VPcHRpb25zKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXBsb2FkIGNvbnRyb2xcbiAgICogQGV4YW1wbGVcbiAgICogLy8gcGF1c2UgYWxsXG4gICAqIHRoaXMudXBsb2FkU2VydmljZS5jb250cm9sKHsgYWN0aW9uOiAncGF1c2UnIH0pO1xuICAgKiAvLyBwYXVzZSB1cGxvYWQgd2l0aCB1cGxvYWRJZFxuICAgKiB0aGlzLnVwbG9hZFNlcnZpY2UuY29udHJvbCh7IGFjdGlvbjogJ3BhdXNlJywgdXBsb2FkSWR9KTtcbiAgICogLy8gc2V0IHRva2VuXG4gICAqIHRoaXMudXBsb2FkU2VydmljZS5jb250cm9sKHsgdG9rZW46IGBUT0tFTmAgfSk7XG4gICAqL1xuICBjb250cm9sKGV2dDogVXBsb2FkeENvbnRyb2xFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHRhcmdldCA9IGV2dC51cGxvYWRJZFxuICAgICAgPyB0aGlzLnF1ZXVlLmZpbHRlcigoeyB1cGxvYWRJZCB9KSA9PiB1cGxvYWRJZCA9PT0gZXZ0LnVwbG9hZElkKVxuICAgICAgOiB0aGlzLnF1ZXVlO1xuICAgIHRhcmdldC5mb3JFYWNoKHVwbG9hZGVyID0+IHVwbG9hZGVyLmNvbmZpZ3VyZShldnQpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIG51bWJlciBvZiBhY3RpdmUgdXBsb2Fkc1xuICAgKi9cbiAgcnVubmluZ1Byb2Nlc3MoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZS5maWx0ZXIoKHsgc3RhdHVzIH0pID0+IHN0YXR1cyA9PT0gJ3VwbG9hZGluZycgfHwgc3RhdHVzID09PSAncmV0cnknKS5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgaHR0cCByZXF1ZXN0c1xuICAgKi9cbiAgYXN5bmMgcmVxdWVzdDxUID0gc3RyaW5nPihjb25maWc6IEFqYXhSZXF1ZXN0Q29uZmlnKTogUHJvbWlzZTxBamF4UmVzcG9uc2U8VD4+IHtcbiAgICBjb25maWcuZGF0YSA9IGNvbmZpZy5ib2R5ID8gY29uZmlnLmJvZHkgOiBjb25maWcuZGF0YTtcbiAgICByZXR1cm4gdGhpcy5hamF4LnJlcXVlc3QoY29uZmlnKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGVDaGFuZ2UgPSAoZXZ0OiBVcGxvYWRTdGF0ZSkgPT4ge1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB0aGlzLmV2ZW50c1N0cmVhbS5uZXh0KHBpY2soZXZ0LCBzdGF0ZUtleXMpKSk7XG4gICAgaWYgKGV2dC5zdGF0dXMgIT09ICd1cGxvYWRpbmcnICYmIGV2dC5zdGF0dXMgIT09ICdhZGRlZCcpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzUXVldWUoKSkpO1xuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGFzeW5jIGFkZFVwbG9hZGVySW5zdGFuY2UoZmlsZTogRmlsZSwgb3B0aW9uczogVXBsb2FkeEZhY3RvcnlPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgdXBsb2FkZXIgPSBuZXcgb3B0aW9ucy51cGxvYWRlckNsYXNzKGZpbGUsIG9wdGlvbnMsIHRoaXMuc3RhdGVDaGFuZ2UsIHRoaXMuYWpheCk7XG4gICAgKHVwbG9hZGVyLnVwbG9hZElkIGFzIFdyaXRhYmxlPHN0cmluZz4pID0gYXdhaXQgdGhpcy5pZFNlcnZpY2UuZ2VuZXJhdGVJZCh1cGxvYWRlcik7XG4gICAgdGhpcy5xdWV1ZS5wdXNoKHVwbG9hZGVyKTtcbiAgICB1cGxvYWRlci5zdGF0dXMgPSBvcHRpb25zLmF1dG9VcGxvYWQgJiYgb25MaW5lKCkgPyAncXVldWUnIDogJ2FkZGVkJztcbiAgfVxuXG4gIHByaXZhdGUgcHJvY2Vzc1F1ZXVlKCk6IHZvaWQge1xuICAgIHRoaXMucXVldWUgPSB0aGlzLnF1ZXVlLmZpbHRlcigoeyBzdGF0dXMgfSkgPT4gc3RhdHVzICE9PSAnY2FuY2VsbGVkJyk7XG4gICAgdGhpcy5xdWV1ZVxuICAgICAgLmZpbHRlcigoeyBzdGF0dXMgfSkgPT4gc3RhdHVzID09PSAncXVldWUnKVxuICAgICAgLnNsaWNlKDAsIE1hdGgubWF4KHRoaXMub3B0aW9ucy5jb25jdXJyZW5jeSAtIHRoaXMucnVubmluZ1Byb2Nlc3MoKSwgMCkpXG4gICAgICAuZm9yRWFjaCh1cGxvYWRlciA9PiB1cGxvYWRlci51cGxvYWQoKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb25MaW5lKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cubmF2aWdhdG9yLm9uTGluZSA6IHRydWU7XG59XG4iXX0=