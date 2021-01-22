export declare enum ErrorType {
    NotFound = 0,
    Auth = 1,
    Retryable = 2,
    Fatal = 3
}
export interface RetryConfig {
    /** Maximum number of retry attempts */
    maxAttempts?: number;
    /** Upload not exist status codes */
    shouldRestartCodes?: number[];
    /** Bad token? status codes */
    authErrorCodes?: number[];
    /** Retryable 4xx status codes */
    shouldRetryCodes?: number[];
    minDelay?: number;
    maxDelay?: number;
}
/**
 * Retryable ErrorHandler
 */
export declare class RetryHandler {
    attempts: number;
    config: Required<RetryConfig>;
    cancel: () => void;
    constructor(configOptions?: RetryConfig);
    kind(code: number): ErrorType;
    wait(): Promise<void>;
    reset(): void;
}
