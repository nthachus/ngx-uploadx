/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { createHash } from './utils';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function UidService() { }
if (false) {
    /**
     * @param {?} uploader
     * @return {?}
     */
    UidService.prototype.generateId = function (uploader) { };
}
var IdService = /** @class */ (function () {
    function IdService() {
    }
    /**
     * @param {?} uploader
     * @return {?}
     */
    IdService.prototype.generateId = /**
     * @param {?} uploader
     * @return {?}
     */
    function (uploader) {
        /** @type {?} */
        var print = JSON.stringify(tslib_1.__assign({}, uploader.metadata, { type: uploader.constructor.name, endpoint: uploader.endpoint }));
        return createHash(print).toString(16);
    };
    IdService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ IdService.ngInjectableDef = i0.defineInjectable({ factory: function IdService_Factory() { return new IdService(); }, token: IdService, providedIn: "root" });
    return IdService;
}());
export { IdService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11cGxvYWR4LyIsInNvdXJjZXMiOlsibGliL2lkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7O0FBRXJDLGdDQUVDOzs7Ozs7SUFEQywwREFBeUQ7O0FBRzNEO0lBQUE7S0FZQzs7Ozs7SUFSQyw4QkFBVTs7OztJQUFWLFVBQVcsUUFBa0I7O1lBQ3JCLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxzQkFDdkIsUUFBUSxDQUFDLFFBQVEsSUFDcEIsSUFBSSxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUMvQixRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVEsSUFDM0I7UUFDRixPQUFPLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7Z0JBWEYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7O29CQVZEO0NBb0JDLEFBWkQsSUFZQztTQVRZLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGxvYWRlciB9IGZyb20gJy4vdXBsb2FkZXInO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVpZFNlcnZpY2Uge1xuICBnZW5lcmF0ZUlkKHVwbG9hZGVyOiBVcGxvYWRlcik6IFByb21pc2U8c3RyaW5nPiB8IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSWRTZXJ2aWNlIGltcGxlbWVudHMgVWlkU2VydmljZSB7XG4gIGdlbmVyYXRlSWQodXBsb2FkZXI6IFVwbG9hZGVyKTogUHJvbWlzZTxzdHJpbmc+IHwgc3RyaW5nIHtcbiAgICBjb25zdCBwcmludCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIC4uLnVwbG9hZGVyLm1ldGFkYXRhLFxuICAgICAgdHlwZTogdXBsb2FkZXIuY29uc3RydWN0b3IubmFtZSxcbiAgICAgIGVuZHBvaW50OiB1cGxvYWRlci5lbmRwb2ludFxuICAgIH0pO1xuICAgIHJldHVybiBjcmVhdGVIYXNoKHByaW50KS50b1N0cmluZygxNik7XG4gIH1cbn1cbiJdfQ==