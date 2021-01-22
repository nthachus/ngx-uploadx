/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class IdService {
    /**
     * @param {?} uploader
     * @return {?}
     */
    generateId(uploader) {
        /** @type {?} */
        const print = JSON.stringify(Object.assign({}, uploader.metadata, { type: uploader.constructor.name, endpoint: uploader.endpoint }));
        return createHash(print).toString(16);
    }
}
IdService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */ IdService.ngInjectableDef = i0.defineInjectable({ factory: function IdService_Factory() { return new IdService(); }, token: IdService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11cGxvYWR4LyIsInNvdXJjZXMiOlsibGliL2lkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7QUFFckMsZ0NBRUM7Ozs7OztJQURDLDBEQUF5RDs7QUFNM0QsTUFBTSxPQUFPLFNBQVM7Ozs7O0lBQ3BCLFVBQVUsQ0FBQyxRQUFrQjs7Y0FDckIsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLG1CQUN2QixRQUFRLENBQUMsUUFBUSxJQUNwQixJQUFJLEVBQUUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQy9CLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxJQUMzQjtRQUNGLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs7WUFYRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVcGxvYWRlciB9IGZyb20gJy4vdXBsb2FkZXInO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gJy4vdXRpbHMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFVpZFNlcnZpY2Uge1xuICBnZW5lcmF0ZUlkKHVwbG9hZGVyOiBVcGxvYWRlcik6IFByb21pc2U8c3RyaW5nPiB8IHN0cmluZztcbn1cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgSWRTZXJ2aWNlIGltcGxlbWVudHMgVWlkU2VydmljZSB7XG4gIGdlbmVyYXRlSWQodXBsb2FkZXI6IFVwbG9hZGVyKTogUHJvbWlzZTxzdHJpbmc+IHwgc3RyaW5nIHtcbiAgICBjb25zdCBwcmludCA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIC4uLnVwbG9hZGVyLm1ldGFkYXRhLFxuICAgICAgdHlwZTogdXBsb2FkZXIuY29uc3RydWN0b3IubmFtZSxcbiAgICAgIGVuZHBvaW50OiB1cGxvYWRlci5lbmRwb2ludFxuICAgIH0pO1xuICAgIHJldHVybiBjcmVhdGVIYXNoKHByaW50KS50b1N0cmluZygxNik7XG4gIH1cbn1cbiJdfQ==