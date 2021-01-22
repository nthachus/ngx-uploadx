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
var /**
 * Implements XHR/CORS Resumable Upload
 *
 * {\@link https://github.com/kukhariev/node-uploadx/blob/master/proto.md|Github}
 * @see {\@link https://developers.google.com/drive/api/v3/manage-uploads#resumable|Google Drive API documentation}
 */
UploaderX = /** @class */ (function (_super) {
    tslib_1.__extends(UploaderX, _super);
    function UploaderX() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.responseType = (/** @type {?} */ ('json'));
        return _this;
    }
    /**
     * @return {?}
     */
    UploaderX.prototype.getFileUrl = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headers, location;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            'Content-Type': 'application/json; charset=utf-8',
                            'X-Upload-Content-Length': this.size.toString(),
                            'X-Upload-Content-Type': this.file.type || 'application/octet-stream'
                        };
                        return [4 /*yield*/, this.request({
                                method: 'POST',
                                body: JSON.stringify(this.metadata),
                                url: this.endpoint,
                                headers: headers
                            })];
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
    UploaderX.prototype.sendFileContent = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, end, body, headers;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getChunk(), end = _a.end, body = _a.body;
                        headers = {
                            'Content-Type': 'application/octet-stream',
                            'Content-Range': "bytes " + this.offset + "-" + (end - 1) + "/" + this.size
                        };
                        return [4 /*yield*/, this.request({ method: 'PUT', body: body, headers: headers })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, this.getOffsetFromResponse()];
                }
            });
        });
    };
    /**
     * @return {?}
     */
    UploaderX.prototype.getOffset = /**
     * @return {?}
     */
    function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var headers;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = {
                            'Content-Type': 'application/octet-stream',
                            'Content-Range': "bytes */" + this.size
                        };
                        return [4 /*yield*/, this.request({ method: 'PUT', headers: headers })];
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
    UploaderX.prototype.getOffsetFromResponse = /**
     * @protected
     * @return {?}
     */
    function () {
        if (this.responseStatus > 201) {
            /** @type {?} */
            var range = this.getValueFromResponse('Range');
            return range ? getRangeEnd(range) + 1 : undefined;
        }
        return this.size;
    };
    return UploaderX;
}(Uploader));
/**
 * Implements XHR/CORS Resumable Upload
 *
 * {\@link https://github.com/kukhariev/node-uploadx/blob/master/proto.md|Github}
 * @see {\@link https://developers.google.com/drive/api/v3/manage-uploads#resumable|Google Drive API documentation}
 */
export { UploaderX };
if (false) {
    /** @type {?} */
    UploaderX.prototype.responseType;
}
/**
 * @param {?=} range
 * @return {?}
 */
export function getRangeEnd(range) {
    if (range === void 0) { range = ''; }
    /** @type {?} */
    var end = parseInt(range.split(/-/)[1], 10);
    return end >= 0 ? end : -1;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkZXJ4LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVwbG9hZHgvIiwic291cmNlcyI6WyJsaWIvdXBsb2FkZXJ4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7Ozs7O0FBUXJDOzs7Ozs7O0lBQStCLHFDQUFRO0lBQXZDO1FBQUEscUVBaURDO1FBaERDLGtCQUFZLEdBQUcsbUJBQUEsTUFBTSxFQUFVLENBQUM7O0lBZ0RsQyxDQUFDOzs7O0lBOUNPLDhCQUFVOzs7SUFBaEI7Ozs7Ozt3QkFDUSxPQUFPLEdBQUc7NEJBQ2QsY0FBYyxFQUFFLGlDQUFpQzs0QkFDakQseUJBQXlCLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7NEJBQy9DLHVCQUF1QixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLDBCQUEwQjt5QkFDdEU7d0JBQ0QscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQztnQ0FDakIsTUFBTSxFQUFFLE1BQU07Z0NBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQ0FDbkMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRO2dDQUNsQixPQUFPLFNBQUE7NkJBQ1IsQ0FBQyxFQUFBOzt3QkFMRixTQUtFLENBQUM7d0JBQ0csUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLENBQUM7d0JBQ3RELElBQUksQ0FBQyxRQUFRLEVBQUU7NEJBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO3lCQUN2RDt3QkFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzt3QkFDMUQsc0JBQU8sVUFBVSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUM7Ozs7S0FDNUM7Ozs7SUFFSyxtQ0FBZTs7O0lBQXJCOzs7Ozs7d0JBQ1EsS0FBZ0IsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUE3QixHQUFHLFNBQUEsRUFBRSxJQUFJLFVBQUE7d0JBQ1gsT0FBTyxHQUFHOzRCQUNkLGNBQWMsRUFBRSwwQkFBMEI7NEJBQzFDLGVBQWUsRUFBRSxXQUFTLElBQUksQ0FBQyxNQUFNLFVBQUksR0FBRyxHQUFHLENBQUMsVUFBSSxJQUFJLENBQUMsSUFBTTt5QkFDaEU7d0JBQ0QscUJBQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxNQUFBLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQyxFQUFBOzt3QkFBcEQsU0FBb0QsQ0FBQzt3QkFDckQsc0JBQU8sSUFBSSxDQUFDLHFCQUFxQixFQUFFLEVBQUM7Ozs7S0FDckM7Ozs7SUFFSyw2QkFBUzs7O0lBQWY7Ozs7Ozt3QkFDUSxPQUFPLEdBQUc7NEJBQ2QsY0FBYyxFQUFFLDBCQUEwQjs0QkFDMUMsZUFBZSxFQUFFLGFBQVcsSUFBSSxDQUFDLElBQU07eUJBQ3hDO3dCQUNELHFCQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUMsRUFBQTs7d0JBQTlDLFNBQThDLENBQUM7d0JBQy9DLHNCQUFPLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUFDOzs7O0tBQ3JDOzs7OztJQUVTLHlDQUFxQjs7OztJQUEvQjtRQUNFLElBQUksSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLEVBQUU7O2dCQUN2QixLQUFLLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQztZQUNoRCxPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1NBQ25EO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFqREQsQ0FBK0IsUUFBUSxHQWlEdEM7Ozs7Ozs7Ozs7SUFoREMsaUNBQWdDOzs7Ozs7QUFrRGxDLE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBVTtJQUFWLHNCQUFBLEVBQUEsVUFBVTs7UUFDOUIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUM3QyxPQUFPLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFVwbG9hZGVyIH0gZnJvbSAnLi91cGxvYWRlcic7XG5pbXBvcnQgeyByZXNvbHZlVXJsIH0gZnJvbSAnLi91dGlscyc7XG5cbi8qKlxuICogSW1wbGVtZW50cyBYSFIvQ09SUyBSZXN1bWFibGUgVXBsb2FkXG4gKlxuICoge0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9rdWtoYXJpZXYvbm9kZS11cGxvYWR4L2Jsb2IvbWFzdGVyL3Byb3RvLm1kfEdpdGh1Yn1cbiAqIEBzZWUge0BsaW5rIGh0dHBzOi8vZGV2ZWxvcGVycy5nb29nbGUuY29tL2RyaXZlL2FwaS92My9tYW5hZ2UtdXBsb2FkcyNyZXN1bWFibGV8R29vZ2xlIERyaXZlIEFQSSBkb2N1bWVudGF0aW9ufVxuICovXG5leHBvcnQgY2xhc3MgVXBsb2FkZXJYIGV4dGVuZHMgVXBsb2FkZXIge1xuICByZXNwb25zZVR5cGUgPSAnanNvbicgYXMgJ2pzb24nO1xuXG4gIGFzeW5jIGdldEZpbGVVcmwoKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICdYLVVwbG9hZC1Db250ZW50LUxlbmd0aCc6IHRoaXMuc2l6ZS50b1N0cmluZygpLFxuICAgICAgJ1gtVXBsb2FkLUNvbnRlbnQtVHlwZSc6IHRoaXMuZmlsZS50eXBlIHx8ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nXG4gICAgfTtcbiAgICBhd2FpdCB0aGlzLnJlcXVlc3Qoe1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh0aGlzLm1ldGFkYXRhKSxcbiAgICAgIHVybDogdGhpcy5lbmRwb2ludCxcbiAgICAgIGhlYWRlcnNcbiAgICB9KTtcbiAgICBjb25zdCBsb2NhdGlvbiA9IHRoaXMuZ2V0VmFsdWVGcm9tUmVzcG9uc2UoJ2xvY2F0aW9uJyk7XG4gICAgaWYgKCFsb2NhdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG9yIG1pc3NpbmcgTG9jYXRpb24gaGVhZGVyJyk7XG4gICAgfVxuICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5yZXNwb25zZVN0YXR1cyA9PT0gMjAxID8gMCA6IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzb2x2ZVVybChsb2NhdGlvbiwgdGhpcy5lbmRwb2ludCk7XG4gIH1cblxuICBhc3luYyBzZW5kRmlsZUNvbnRlbnQoKTogUHJvbWlzZTxudW1iZXIgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCB7IGVuZCwgYm9keSB9ID0gdGhpcy5nZXRDaHVuaygpO1xuICAgIGNvbnN0IGhlYWRlcnMgPSB7XG4gICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICAgICAnQ29udGVudC1SYW5nZSc6IGBieXRlcyAke3RoaXMub2Zmc2V0fS0ke2VuZCAtIDF9LyR7dGhpcy5zaXplfWBcbiAgICB9O1xuICAgIGF3YWl0IHRoaXMucmVxdWVzdCh7IG1ldGhvZDogJ1BVVCcsIGJvZHksIGhlYWRlcnMgfSk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T2Zmc2V0RnJvbVJlc3BvbnNlKCk7XG4gIH1cblxuICBhc3luYyBnZXRPZmZzZXQoKTogUHJvbWlzZTxudW1iZXIgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBoZWFkZXJzID0ge1xuICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nLFxuICAgICAgJ0NvbnRlbnQtUmFuZ2UnOiBgYnl0ZXMgKi8ke3RoaXMuc2l6ZX1gXG4gICAgfTtcbiAgICBhd2FpdCB0aGlzLnJlcXVlc3QoeyBtZXRob2Q6ICdQVVQnLCBoZWFkZXJzIH0pO1xuICAgIHJldHVybiB0aGlzLmdldE9mZnNldEZyb21SZXNwb25zZSgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIGdldE9mZnNldEZyb21SZXNwb25zZSgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLnJlc3BvbnNlU3RhdHVzID4gMjAxKSB7XG4gICAgICBjb25zdCByYW5nZSA9IHRoaXMuZ2V0VmFsdWVGcm9tUmVzcG9uc2UoJ1JhbmdlJyk7XG4gICAgICByZXR1cm4gcmFuZ2UgPyBnZXRSYW5nZUVuZChyYW5nZSkgKyAxIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zaXplO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSYW5nZUVuZChyYW5nZSA9ICcnKTogbnVtYmVyIHtcbiAgY29uc3QgZW5kID0gcGFyc2VJbnQocmFuZ2Uuc3BsaXQoLy0vKVsxXSwgMTApO1xuICByZXR1cm4gZW5kID49IDAgPyBlbmQgOiAtMTtcbn1cbiJdfQ==