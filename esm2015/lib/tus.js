/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Uploader } from './uploader';
import { b64, resolveUrl } from './utils';
/**
 * Implements tus resumable upload protocol
 *
 * {\@link https://github.com/tus/tus-resumable-upload-protocol/blob/master/protocol.md|Github}
 */
export class Tus extends Uploader {
    constructor() {
        super(...arguments);
        this.headers = { 'Tus-Resumable': '1.0.0' };
    }
    /**
     * @return {?}
     */
    getFileUrl() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const encodedMetaData = b64.serialize(this.metadata);
            /** @type {?} */
            const headers = {
                'Upload-Length': `${this.size}`,
                'Upload-Metadata': `${encodedMetaData}`
            };
            yield this.request({ method: 'POST', url: this.endpoint, headers });
            /** @type {?} */
            const location = this.getValueFromResponse('location');
            if (!location) {
                throw new Error('Invalid or missing Location header');
            }
            this.offset = this.responseStatus === 201 ? 0 : undefined;
            return resolveUrl(location, this.endpoint);
        });
    }
    /**
     * @return {?}
     */
    sendFileContent() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { body } = this.getChunk();
            /** @type {?} */
            const headers = {
                'Content-Type': 'application/offset+octet-stream',
                'Upload-Offset': `${this.offset}`
            };
            yield this.request({ method: 'PATCH', body, headers });
            return this.getOffsetFromResponse();
        });
    }
    /**
     * @return {?}
     */
    getOffset() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.request({ method: 'HEAD' });
            return this.getOffsetFromResponse();
        });
    }
    /**
     * @protected
     * @return {?}
     */
    getOffsetFromResponse() {
        /** @type {?} */
        const offsetStr = this.getValueFromResponse('Upload-Offset');
        return offsetStr ? parseInt(offsetStr, 10) : undefined;
    }
}
if (false) {
    /** @type {?} */
    Tus.prototype.headers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVwbG9hZHgvIiwic291cmNlcyI6WyJsaWIvdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBTzFDLE1BQU0sT0FBTyxHQUFJLFNBQVEsUUFBUTtJQUFqQzs7UUFDRSxZQUFPLEdBQUcsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLENBQUM7SUFvQ3pDLENBQUM7Ozs7SUFsQ08sVUFBVTs7O2tCQUNSLGVBQWUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7O2tCQUM5QyxPQUFPLEdBQUc7Z0JBQ2QsZUFBZSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDL0IsaUJBQWlCLEVBQUUsR0FBRyxlQUFlLEVBQUU7YUFDeEM7WUFDRCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7O2tCQUM5RCxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQztZQUN0RCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQzthQUN2RDtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFELE9BQU8sVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBOzs7O0lBRUssZUFBZTs7a0JBQ2IsRUFBRSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFOztrQkFDMUIsT0FBTyxHQUFHO2dCQUNkLGNBQWMsRUFBRSxpQ0FBaUM7Z0JBQ2pELGVBQWUsRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7YUFDbEM7WUFDRCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7UUFDdEMsQ0FBQztLQUFBOzs7O0lBRUssU0FBUzs7WUFDYixNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztZQUN2QyxPQUFPLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3RDLENBQUM7S0FBQTs7Ozs7SUFFUyxxQkFBcUI7O2NBQ3ZCLFNBQVMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDO1FBQzVELE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDekQsQ0FBQztDQUNGOzs7SUFwQ0Msc0JBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXBsb2FkZXIgfSBmcm9tICcuL3VwbG9hZGVyJztcbmltcG9ydCB7IGI2NCwgcmVzb2x2ZVVybCB9IGZyb20gJy4vdXRpbHMnO1xuXG4vKipcbiAqIEltcGxlbWVudHMgdHVzIHJlc3VtYWJsZSB1cGxvYWQgcHJvdG9jb2xcbiAqXG4gKiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL3R1cy90dXMtcmVzdW1hYmxlLXVwbG9hZC1wcm90b2NvbC9ibG9iL21hc3Rlci9wcm90b2NvbC5tZHxHaXRodWJ9XG4gKi9cbmV4cG9ydCBjbGFzcyBUdXMgZXh0ZW5kcyBVcGxvYWRlciB7XG4gIGhlYWRlcnMgPSB7ICdUdXMtUmVzdW1hYmxlJzogJzEuMC4wJyB9O1xuXG4gIGFzeW5jIGdldEZpbGVVcmwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBlbmNvZGVkTWV0YURhdGEgPSBiNjQuc2VyaWFsaXplKHRoaXMubWV0YWRhdGEpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAnVXBsb2FkLUxlbmd0aCc6IGAke3RoaXMuc2l6ZX1gLFxuICAgICAgJ1VwbG9hZC1NZXRhZGF0YSc6IGAke2VuY29kZWRNZXRhRGF0YX1gXG4gICAgfTtcbiAgICBhd2FpdCB0aGlzLnJlcXVlc3QoeyBtZXRob2Q6ICdQT1NUJywgdXJsOiB0aGlzLmVuZHBvaW50LCBoZWFkZXJzIH0pO1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRWYWx1ZUZyb21SZXNwb25zZSgnbG9jYXRpb24nKTtcbiAgICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgb3IgbWlzc2luZyBMb2NhdGlvbiBoZWFkZXInKTtcbiAgICB9XG4gICAgdGhpcy5vZmZzZXQgPSB0aGlzLnJlc3BvbnNlU3RhdHVzID09PSAyMDEgPyAwIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXNvbHZlVXJsKGxvY2F0aW9uLCB0aGlzLmVuZHBvaW50KTtcbiAgfVxuXG4gIGFzeW5jIHNlbmRGaWxlQ29udGVudCgpOiBQcm9taXNlPG51bWJlciB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IHsgYm9keSB9ID0gdGhpcy5nZXRDaHVuaygpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL29mZnNldCtvY3RldC1zdHJlYW0nLFxuICAgICAgJ1VwbG9hZC1PZmZzZXQnOiBgJHt0aGlzLm9mZnNldH1gXG4gICAgfTtcbiAgICBhd2FpdCB0aGlzLnJlcXVlc3QoeyBtZXRob2Q6ICdQQVRDSCcsIGJvZHksIGhlYWRlcnMgfSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T2Zmc2V0RnJvbVJlc3BvbnNlKCk7XG4gIH1cblxuICBhc3luYyBnZXRPZmZzZXQoKTogUHJvbWlzZTxudW1iZXIgfCB1bmRlZmluZWQ+IHtcbiAgICBhd2FpdCB0aGlzLnJlcXVlc3QoeyBtZXRob2Q6ICdIRUFEJyB9KTtcbiAgICByZXR1cm4gdGhpcy5nZXRPZmZzZXRGcm9tUmVzcG9uc2UoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRPZmZzZXRGcm9tUmVzcG9uc2UoKTogbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBvZmZzZXRTdHIgPSB0aGlzLmdldFZhbHVlRnJvbVJlc3BvbnNlKCdVcGxvYWQtT2Zmc2V0Jyk7XG4gICAgcmV0dXJuIG9mZnNldFN0ciA/IHBhcnNlSW50KG9mZnNldFN0ciwgMTApIDogdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=