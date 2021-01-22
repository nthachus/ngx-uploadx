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
var /**
 * Implements tus resumable upload protocol
 *
 * {\@link https://github.com/tus/tus-resumable-upload-protocol/blob/master/protocol.md|Github}
 */
Tus = /** @class */ (function (_super) {
    tslib_1.__extends(Tus, _super);
    function Tus() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.headers = { 'Tus-Resumable': '1.0.0' };
        return _this;
    }
    /**
     * @return {?}
     */
    Tus.prototype.getFileUrl = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var encodedMetaData, headers, location;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        encodedMetaData = b64.serialize(this.metadata);
                        headers = {
                            'Upload-Length': "" + this.size,
                            'Upload-Metadata': "" + encodedMetaData
                        };
                        return [4 /*yield*/, this.request({ method: 'POST', url: this.endpoint, headers: headers })];
                    case 1:
                        _a.sent();
                        location = this.getValueFromResponse('location');
                        if (!location) {
                            throw new Error('Invalid or missing Location header');
                        }
                        this.offset = this.responseStatus === 201 ? 0 : undefined;
                        return [2 /*return*/, resolveUrl(location, this.endpoint)];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    Tus.prototype.sendFileContent = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var body, headers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = this.getChunk().body;
                        headers = {
                            'Content-Type': 'application/offset+octet-stream',
                            'Upload-Offset': "" + this.offset
                        };
                        return [4 /*yield*/, this.request({ method: 'PATCH', body: body, headers: headers })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getOffsetFromResponse()];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    Tus.prototype.getOffset = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request({ method: 'HEAD' })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.getOffsetFromResponse()];
                }
            });
        });
    };
    /**
     * @protected
     * @return {?}
     */
    Tus.prototype.getOffsetFromResponse = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var offsetStr = this.getValueFromResponse('Upload-Offset');
        return offsetStr ? parseInt(offsetStr, 10) : undefined;
    };
    return Tus;
}(Uploader));
/**
 * Implements tus resumable upload protocol
 *
 * {\@link https://github.com/tus/tus-resumable-upload-protocol/blob/master/protocol.md|Github}
 */
export { Tus };
if (false) {
    /** @type {?} */
    Tus.prototype.headers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVwbG9hZHgvIiwic291cmNlcyI6WyJsaWIvdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7O0FBTzFDOzs7Ozs7SUFBeUIsK0JBQVE7SUFBakM7UUFBQSxxRUFxQ0M7UUFwQ0MsYUFBTyxHQUFHLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSxDQUFDOztJQW9DekMsQ0FBQzs7OztJQWxDTyx3QkFBVTs7O0lBQWhCOzs7Ozs7d0JBQ1EsZUFBZSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzt3QkFDOUMsT0FBTyxHQUFHOzRCQUNkLGVBQWUsRUFBRSxLQUFHLElBQUksQ0FBQyxJQUFNOzRCQUMvQixpQkFBaUIsRUFBRSxLQUFHLGVBQWlCO3lCQUN4Qzt3QkFDRCxxQkFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLFNBQUEsRUFBRSxDQUFDLEVBQUE7O3dCQUFuRSxTQUFtRSxDQUFDO3dCQUM5RCxRQUFRLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFVBQVUsQ0FBQzt3QkFDdEQsSUFBSSxDQUFDLFFBQVEsRUFBRTs0QkFDYixNQUFNLElBQUksS0FBSyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7eUJBQ3ZEO3dCQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO3dCQUMxRCxzQkFBTyxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQzs7OztLQUM1Qzs7OztJQUVLLDZCQUFlOzs7SUFBckI7Ozs7Ozt3QkFDVSxJQUFJLEdBQUssSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFwQjt3QkFDTixPQUFPLEdBQUc7NEJBQ2QsY0FBYyxFQUFFLGlDQUFpQzs0QkFDakQsZUFBZSxFQUFFLEtBQUcsSUFBSSxDQUFDLE1BQVE7eUJBQ2xDO3dCQUNELHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsRUFBQTs7d0JBQXRELFNBQXNELENBQUM7d0JBQ3ZELHNCQUFPLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFDOzs7O0tBQ3JDOzs7O0lBRUssdUJBQVM7OztJQUFmOzs7OzRCQUNFLHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBQTs7d0JBQXRDLFNBQXNDLENBQUM7d0JBQ3ZDLHNCQUFPLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFDOzs7O0tBQ3JDOzs7OztJQUVTLG1DQUFxQjs7OztJQUEvQjs7WUFDUSxTQUFTLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQztRQUM1RCxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3pELENBQUM7SUFDSCxVQUFDO0FBQUQsQ0FBQyxBQXJDRCxDQUF5QixRQUFRLEdBcUNoQzs7Ozs7Ozs7O0lBcENDLHNCQUF1QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVwbG9hZGVyIH0gZnJvbSAnLi91cGxvYWRlcic7XG5pbXBvcnQgeyBiNjQsIHJlc29sdmVVcmwgfSBmcm9tICcuL3V0aWxzJztcblxuLyoqXG4gKiBJbXBsZW1lbnRzIHR1cyByZXN1bWFibGUgdXBsb2FkIHByb3RvY29sXG4gKlxuICoge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS90dXMvdHVzLXJlc3VtYWJsZS11cGxvYWQtcHJvdG9jb2wvYmxvYi9tYXN0ZXIvcHJvdG9jb2wubWR8R2l0aHVifVxuICovXG5leHBvcnQgY2xhc3MgVHVzIGV4dGVuZHMgVXBsb2FkZXIge1xuICBoZWFkZXJzID0geyAnVHVzLVJlc3VtYWJsZSc6ICcxLjAuMCcgfTtcblxuICBhc3luYyBnZXRGaWxlVXJsKCk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3QgZW5jb2RlZE1ldGFEYXRhID0gYjY0LnNlcmlhbGl6ZSh0aGlzLm1ldGFkYXRhKTtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgJ1VwbG9hZC1MZW5ndGgnOiBgJHt0aGlzLnNpemV9YCxcbiAgICAgICdVcGxvYWQtTWV0YWRhdGEnOiBgJHtlbmNvZGVkTWV0YURhdGF9YFxuICAgIH07XG4gICAgYXdhaXQgdGhpcy5yZXF1ZXN0KHsgbWV0aG9kOiAnUE9TVCcsIHVybDogdGhpcy5lbmRwb2ludCwgaGVhZGVycyB9KTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VmFsdWVGcm9tUmVzcG9uc2UoJ2xvY2F0aW9uJyk7XG4gICAgaWYgKCFsb2NhdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG9yIG1pc3NpbmcgTG9jYXRpb24gaGVhZGVyJyk7XG4gICAgfVxuICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5yZXNwb25zZVN0YXR1cyA9PT0gMjAxID8gMCA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzb2x2ZVVybChsb2NhdGlvbiwgdGhpcy5lbmRwb2ludCk7XG4gIH1cblxuICBhc3luYyBzZW5kRmlsZUNvbnRlbnQoKTogUHJvbWlzZTxudW1iZXIgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCB7IGJvZHkgfSA9IHRoaXMuZ2V0Q2h1bmsoKTtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9vZmZzZXQrb2N0ZXQtc3RyZWFtJyxcbiAgICAgICdVcGxvYWQtT2Zmc2V0JzogYCR7dGhpcy5vZmZzZXR9YFxuICAgIH07XG4gICAgYXdhaXQgdGhpcy5yZXF1ZXN0KHsgbWV0aG9kOiAnUEFUQ0gnLCBib2R5LCBoZWFkZXJzIH0pO1xuICAgIHJldHVybiB0aGlzLmdldE9mZnNldEZyb21SZXNwb25zZSgpO1xuICB9XG5cbiAgYXN5bmMgZ2V0T2Zmc2V0KCk6IFByb21pc2U8bnVtYmVyIHwgdW5kZWZpbmVkPiB7XG4gICAgYXdhaXQgdGhpcy5yZXF1ZXN0KHsgbWV0aG9kOiAnSEVBRCcgfSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T2Zmc2V0RnJvbVJlc3BvbnNlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0T2Zmc2V0RnJvbVJlc3BvbnNlKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3Qgb2Zmc2V0U3RyID0gdGhpcy5nZXRWYWx1ZUZyb21SZXNwb25zZSgnVXBsb2FkLU9mZnNldCcpO1xuICAgIHJldHVybiBvZmZzZXRTdHIgPyBwYXJzZUludChvZmZzZXRTdHIsIDEwKSA6IHVuZGVmaW5lZDtcbiAgfVxufVxuIl19