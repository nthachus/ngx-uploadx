/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const ErrorType = {
    NotFound: 0,
    Auth: 1,
    Retryable: 2,
    Fatal: 3,
};
export { ErrorType };
ErrorType[ErrorType.NotFound] = 'NotFound';
ErrorType[ErrorType.Auth] = 'Auth';
ErrorType[ErrorType.Retryable] = 'Retryable';
ErrorType[ErrorType.Fatal] = 'Fatal';
/**
 * @record
 */
export function RetryConfig() { }
if (false) {
    /**
     * Maximum number of retry attempts
     * @type {?|undefined}
     */
    RetryConfig.prototype.maxAttempts;
    /**
     * Upload not exist status codes
     * @type {?|undefined}
     */
    RetryConfig.prototype.shouldRestartCodes;
    /**
     * Bad token? status codes
     * @type {?|undefined}
     */
    RetryConfig.prototype.authErrorCodes;
    /**
     * Retryable 4xx status codes
     * @type {?|undefined}
     */
    RetryConfig.prototype.shouldRetryCodes;
    /** @type {?|undefined} */
    RetryConfig.prototype.minDelay;
    /** @type {?|undefined} */
    RetryConfig.prototype.maxDelay;
}
/** @type {?} */
const defaultRetryConfig = {
    maxAttempts: 8,
    shouldRestartCodes: [404, 410],
    authErrorCodes: [401],
    shouldRetryCodes: [423, 429],
    minDelay: 500,
    maxDelay: 50000
};
/**
 * Retryable ErrorHandler
 */
export class RetryHandler {
    /**
     * @param {?=} configOptions
     */
    constructor(configOptions = {}) {
        this.attempts = 0;
        this.cancel = (/**
         * @return {?}
         */
        () => { });
        this.config = Object.assign({}, defaultRetryConfig, configOptions);
    }
    /**
     * @param {?} code
     * @return {?}
     */
    kind(code) {
        this.attempts++;
        if (this.attempts > this.config.maxAttempts) {
            return ErrorType.Fatal;
        }
        if (this.config.authErrorCodes.indexOf(code) !== -1) {
            return ErrorType.Auth;
        }
        if (this.config.shouldRestartCodes.indexOf(code) !== -1) {
            return ErrorType.NotFound;
        }
        if (code < 400 || code >= 500 || this.config.shouldRetryCodes.indexOf(code) !== -1) {
            return ErrorType.Retryable;
        }
        return ErrorType.Fatal;
    }
    /**
     * @return {?}
     */
    wait() {
        /** @type {?} */
        const ms = Math.min(Math.pow(2, (this.attempts - 1)) * this.config.minDelay, this.config.maxDelay) +
            Math.floor(Math.random() * this.config.minDelay);
        /** @type {?} */
        let id;
        return new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        resolve => {
            this.cancel = (/**
             * @return {?}
             */
            () => {
                clearTimeout(id);
                resolve();
            });
            id = setTimeout(this.cancel, ms);
        }));
    }
    /**
     * @return {?}
     */
    reset() {
        this.attempts = 0;
    }
}
if (false) {
    /** @type {?} */
    RetryHandler.prototype.attempts;
    /** @type {?} */
    RetryHandler.prototype.config;
    /** @type {?} */
    RetryHandler.prototype.cancel;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cnktaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11cGxvYWR4LyIsInNvdXJjZXMiOlsibGliL3JldHJ5LWhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0lBQ0UsV0FBUTtJQUNSLE9BQUk7SUFDSixZQUFTO0lBQ1QsUUFBSzs7Ozs7Ozs7OztBQUdQLGlDQVdDOzs7Ozs7SUFUQyxrQ0FBcUI7Ozs7O0lBRXJCLHlDQUE4Qjs7Ozs7SUFFOUIscUNBQTBCOzs7OztJQUUxQix1Q0FBNEI7O0lBQzVCLCtCQUFrQjs7SUFDbEIsK0JBQWtCOzs7TUFHZCxrQkFBa0IsR0FBMEI7SUFDaEQsV0FBVyxFQUFFLENBQUM7SUFDZCxrQkFBa0IsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDOUIsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQ3JCLGdCQUFnQixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUM1QixRQUFRLEVBQUUsR0FBRztJQUNiLFFBQVEsRUFBRSxLQUFLO0NBQ2hCOzs7O0FBS0QsTUFBTSxPQUFPLFlBQVk7Ozs7SUFLdkIsWUFBWSxnQkFBNkIsRUFBRTtRQUpwQyxhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRXBCLFdBQU07OztRQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFBQztRQUc1QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7Ozs7O0lBRUQsSUFBSSxDQUFDLElBQVk7UUFDZixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEIsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO1lBQzNDLE9BQU8sU0FBUyxDQUFDLEtBQUssQ0FBQztTQUN4QjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ25ELE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQztTQUN2QjtRQUNELElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDdkQsT0FBTyxTQUFTLENBQUMsUUFBUSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbEYsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Ozs7SUFFRCxJQUFJOztjQUNJLEVBQUUsR0FDTixJQUFJLENBQUMsR0FBRyxDQUFDLFNBQUEsQ0FBQyxFQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQy9FLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDOztZQUM5QyxFQUFpQztRQUNyQyxPQUFPLElBQUksT0FBTzs7OztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNOzs7WUFBRyxHQUFHLEVBQUU7Z0JBQ2pCLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakIsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLENBQUEsQ0FBQztZQUNGLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxDQUFDLEVBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7SUFDcEIsQ0FBQztDQUNGOzs7SUExQ0MsZ0NBQW9COztJQUNwQiw4QkFBOEI7O0lBQzlCLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtIEVycm9yVHlwZSB7XG4gIE5vdEZvdW5kLFxuICBBdXRoLFxuICBSZXRyeWFibGUsXG4gIEZhdGFsXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmV0cnlDb25maWcge1xuICAvKiogTWF4aW11bSBudW1iZXIgb2YgcmV0cnkgYXR0ZW1wdHMgKi9cbiAgbWF4QXR0ZW1wdHM/OiBudW1iZXI7XG4gIC8qKiBVcGxvYWQgbm90IGV4aXN0IHN0YXR1cyBjb2RlcyAqL1xuICBzaG91bGRSZXN0YXJ0Q29kZXM/OiBudW1iZXJbXTtcbiAgLyoqIEJhZCB0b2tlbj8gc3RhdHVzIGNvZGVzICovXG4gIGF1dGhFcnJvckNvZGVzPzogbnVtYmVyW107XG4gIC8qKiBSZXRyeWFibGUgNHh4IHN0YXR1cyBjb2RlcyAqL1xuICBzaG91bGRSZXRyeUNvZGVzPzogbnVtYmVyW107XG4gIG1pbkRlbGF5PzogbnVtYmVyO1xuICBtYXhEZWxheT86IG51bWJlcjtcbn1cblxuY29uc3QgZGVmYXVsdFJldHJ5Q29uZmlnOiBSZXF1aXJlZDxSZXRyeUNvbmZpZz4gPSB7XG4gIG1heEF0dGVtcHRzOiA4LFxuICBzaG91bGRSZXN0YXJ0Q29kZXM6IFs0MDQsIDQxMF0sXG4gIGF1dGhFcnJvckNvZGVzOiBbNDAxXSxcbiAgc2hvdWxkUmV0cnlDb2RlczogWzQyMywgNDI5XSxcbiAgbWluRGVsYXk6IDUwMCxcbiAgbWF4RGVsYXk6IDUwMDAwXG59O1xuXG4vKipcbiAqIFJldHJ5YWJsZSBFcnJvckhhbmRsZXJcbiAqL1xuZXhwb3J0IGNsYXNzIFJldHJ5SGFuZGxlciB7XG4gIHB1YmxpYyBhdHRlbXB0cyA9IDA7XG4gIGNvbmZpZzogUmVxdWlyZWQ8UmV0cnlDb25maWc+O1xuICBjYW5jZWw6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihjb25maWdPcHRpb25zOiBSZXRyeUNvbmZpZyA9IHt9KSB7XG4gICAgdGhpcy5jb25maWcgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UmV0cnlDb25maWcsIGNvbmZpZ09wdGlvbnMpO1xuICB9XG5cbiAga2luZChjb2RlOiBudW1iZXIpOiBFcnJvclR5cGUge1xuICAgIHRoaXMuYXR0ZW1wdHMrKztcbiAgICBpZiAodGhpcy5hdHRlbXB0cyA+IHRoaXMuY29uZmlnLm1heEF0dGVtcHRzKSB7XG4gICAgICByZXR1cm4gRXJyb3JUeXBlLkZhdGFsO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcuYXV0aEVycm9yQ29kZXMuaW5kZXhPZihjb2RlKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBFcnJvclR5cGUuQXV0aDtcbiAgICB9XG4gICAgaWYgKHRoaXMuY29uZmlnLnNob3VsZFJlc3RhcnRDb2Rlcy5pbmRleE9mKGNvZGUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIEVycm9yVHlwZS5Ob3RGb3VuZDtcbiAgICB9XG4gICAgaWYgKGNvZGUgPCA0MDAgfHwgY29kZSA+PSA1MDAgfHwgdGhpcy5jb25maWcuc2hvdWxkUmV0cnlDb2Rlcy5pbmRleE9mKGNvZGUpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIEVycm9yVHlwZS5SZXRyeWFibGU7XG4gICAgfVxuICAgIHJldHVybiBFcnJvclR5cGUuRmF0YWw7XG4gIH1cblxuICB3YWl0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG1zID1cbiAgICAgIE1hdGgubWluKDIgKiogKHRoaXMuYXR0ZW1wdHMgLSAxKSAqIHRoaXMuY29uZmlnLm1pbkRlbGF5LCB0aGlzLmNvbmZpZy5tYXhEZWxheSkgK1xuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb25maWcubWluRGVsYXkpO1xuICAgIGxldCBpZDogUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD47XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy5jYW5jZWwgPSAoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dChpZCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH07XG4gICAgICBpZCA9IHNldFRpbWVvdXQodGhpcy5jYW5jZWwsIG1zKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuYXR0ZW1wdHMgPSAwO1xuICB9XG59XG4iXX0=