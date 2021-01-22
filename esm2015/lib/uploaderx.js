/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Uploader } from './uploader';
import { resolveUrl } from './utils';
/**
 * Implements XHR/CORS Resumable Upload
 *
 * {\@link https://github.com/kukhariev/node-uploadx/blob/master/proto.md|Github}
 * @see {\@link https://developers.google.com/drive/api/v3/manage-uploads#resumable|Google Drive API documentation}
 */
export class UploaderX extends Uploader {
    constructor() {
        super(...arguments);
        this.responseType = (/** @type {?} */ ('json'));
    }
    /**
     * @return {?}
     */
    getFileUrl() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const headers = {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Upload-Content-Length': this.size.toString(),
                'X-Upload-Content-Type': this.file.type || 'application/octet-stream'
            };
            yield this.request({
                method: 'POST',
                body: JSON.stringify(this.metadata),
                url: this.endpoint,
                headers
            });
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
            const { end, body } = this.getChunk();
            /** @type {?} */
            const headers = {
                'Content-Type': 'application/octet-stream',
                'Content-Range': `bytes ${this.offset}-${end - 1}/${this.size}`
            };
            yield this.request({ method: 'PUT', body, headers });
            return this.getOffsetFromResponse();
        });
    }
    /**
     * @return {?}
     */
    getOffset() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            /** @type {?} */
            const headers = {
                'Content-Type': 'application/octet-stream',
                'Content-Range': `bytes */${this.size}`
            };
            yield this.request({ method: 'PUT', headers });
            return this.getOffsetFromResponse();
        });
    }
    /**
     * @protected
     * @return {?}
     */
    getOffsetFromResponse() {
        if (this.responseStatus > 201) {
            /** @type {?} */
            const range = this.getValueFromResponse('Range');
            return range ? getRangeEnd(range) + 1 : undefined;
        }
        return this.size;
    }
}
if (false) {
    /** @type {?} */
    UploaderX.prototype.responseType;
}
/**
 * @param {?=} range
 * @return {?}
 */
export function getRangeEnd(range = '') {
    /** @type {?} */
    const end = parseInt(range.split(/-/)[1], 10);
    return end >= 0 ? end : -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkZXJ4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVwbG9hZHgvIiwic291cmNlcyI6WyJsaWIvdXBsb2FkZXJ4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7O0FBUXJDLE1BQU0sT0FBTyxTQUFVLFNBQVEsUUFBUTtJQUF2Qzs7UUFDRSxpQkFBWSxHQUFHLG1CQUFBLE1BQU0sRUFBVSxDQUFDO0lBZ0RsQyxDQUFDOzs7O0lBOUNPLFVBQVU7OztrQkFDUixPQUFPLEdBQUc7Z0JBQ2QsY0FBYyxFQUFFLGlDQUFpQztnQkFDakQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQy9DLHVCQUF1QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLDBCQUEwQjthQUN0RTtZQUNELE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDbkMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRO2dCQUNsQixPQUFPO2FBQ1IsQ0FBQyxDQUFDOztrQkFDRyxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQztZQUN0RCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLE1BQU0sSUFBSSxLQUFLLENBQUMsb0NBQW9DLENBQUMsQ0FBQzthQUN2RDtZQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFELE9BQU8sVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDN0MsQ0FBQztLQUFBOzs7O0lBRUssZUFBZTs7a0JBQ2IsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTs7a0JBQy9CLE9BQU8sR0FBRztnQkFDZCxjQUFjLEVBQUUsMEJBQTBCO2dCQUMxQyxlQUFlLEVBQUUsU0FBUyxJQUFJLENBQUMsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTthQUNoRTtZQUNELE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDckQsT0FBTyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUN0QyxDQUFDO0tBQUE7Ozs7SUFFSyxTQUFTOzs7a0JBQ1AsT0FBTyxHQUFHO2dCQUNkLGNBQWMsRUFBRSwwQkFBMEI7Z0JBQzFDLGVBQWUsRUFBRSxXQUFXLElBQUksQ0FBQyxJQUFJLEVBQUU7YUFDeEM7WUFDRCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7WUFDL0MsT0FBTyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUN0QyxDQUFDO0tBQUE7Ozs7O0lBRVMscUJBQXFCO1FBQzdCLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLEVBQUU7O2tCQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztZQUNoRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Q0FDRjs7O0lBaERDLGlDQUFnQzs7Ozs7O0FBa0RsQyxNQUFNLFVBQVUsV0FBVyxDQUFDLEtBQUssR0FBRyxFQUFFOztVQUM5QixHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzdDLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXBsb2FkZXIgfSBmcm9tICcuL3VwbG9hZGVyJztcbmltcG9ydCB7IHJlc29sdmVVcmwgfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBJbXBsZW1lbnRzIFhIUi9DT1JTIFJlc3VtYWJsZSBVcGxvYWRcbiAqXG4gKiB7QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2t1a2hhcmlldi9ub2RlLXVwbG9hZHgvYmxvYi9tYXN0ZXIvcHJvdG8ubWR8R2l0aHVifVxuICogQHNlZSB7QGxpbmsgaHR0cHM6Ly9kZXZlbG9wZXJzLmdvb2dsZS5jb20vZHJpdmUvYXBpL3YzL21hbmFnZS11cGxvYWRzI3Jlc3VtYWJsZXxHb29nbGUgRHJpdmUgQVBJIGRvY3VtZW50YXRpb259XG4gKi9cbmV4cG9ydCBjbGFzcyBVcGxvYWRlclggZXh0ZW5kcyBVcGxvYWRlciB7XG4gIHJlc3BvbnNlVHlwZSA9ICdqc29uJyBhcyAnanNvbic7XG5cbiAgYXN5bmMgZ2V0RmlsZVVybCgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgJ1gtVXBsb2FkLUNvbnRlbnQtTGVuZ3RoJzogdGhpcy5zaXplLnRvU3RyaW5nKCksXG4gICAgICAnWC1VcGxvYWQtQ29udGVudC1UeXBlJzogdGhpcy5maWxlLnR5cGUgfHwgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSdcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMucmVxdWVzdCh7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHRoaXMubWV0YWRhdGEpLFxuICAgICAgdXJsOiB0aGlzLmVuZHBvaW50LFxuICAgICAgaGVhZGVyc1xuICAgIH0pO1xuICAgIGNvbnN0IGxvY2F0aW9uID0gdGhpcy5nZXRWYWx1ZUZyb21SZXNwb25zZSgnbG9jYXRpb24nKTtcbiAgICBpZiAoIWxvY2F0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgb3IgbWlzc2luZyBMb2NhdGlvbiBoZWFkZXInKTtcbiAgICB9XG4gICAgdGhpcy5vZmZzZXQgPSB0aGlzLnJlc3BvbnNlU3RhdHVzID09PSAyMDEgPyAwIDogdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXNvbHZlVXJsKGxvY2F0aW9uLCB0aGlzLmVuZHBvaW50KTtcbiAgfVxuXG4gIGFzeW5jIHNlbmRGaWxlQ29udGVudCgpOiBQcm9taXNlPG51bWJlciB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IHsgZW5kLCBib2R5IH0gPSB0aGlzLmdldENodW5rKCk7XG4gICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAgICdDb250ZW50LVJhbmdlJzogYGJ5dGVzICR7dGhpcy5vZmZzZXR9LSR7ZW5kIC0gMX0vJHt0aGlzLnNpemV9YFxuICAgIH07XG4gICAgYXdhaXQgdGhpcy5yZXF1ZXN0KHsgbWV0aG9kOiAnUFVUJywgYm9keSwgaGVhZGVycyB9KTtcbiAgICByZXR1cm4gdGhpcy5nZXRPZmZzZXRGcm9tUmVzcG9uc2UoKTtcbiAgfVxuXG4gIGFzeW5jIGdldE9mZnNldCgpOiBQcm9taXNlPG51bWJlciB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICAgICAnQ29udGVudC1SYW5nZSc6IGBieXRlcyAqLyR7dGhpcy5zaXplfWBcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMucmVxdWVzdCh7IG1ldGhvZDogJ1BVVCcsIGhlYWRlcnMgfSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T2Zmc2V0RnJvbVJlc3BvbnNlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0T2Zmc2V0RnJvbVJlc3BvbnNlKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMucmVzcG9uc2VTdGF0dXMgPiAyMDEpIHtcbiAgICAgIGNvbnN0IHJhbmdlID0gdGhpcy5nZXRWYWx1ZUZyb21SZXNwb25zZSgnUmFuZ2UnKTtcbiAgICAgIHJldHVybiByYW5nZSA/IGdldFJhbmdlRW5kKHJhbmdlKSArIDEgOiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnNpemU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJhbmdlRW5kKHJhbmdlID0gJycpOiBudW1iZXIge1xuICBjb25zdCBlbmQgPSBwYXJzZUludChyYW5nZS5zcGxpdCgvLS8pWzFdLCAxMCk7XG4gIHJldHVybiBlbmQgPj0gMCA/IGVuZCA6IC0xO1xufVxuIl19