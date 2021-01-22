import { Ajax } from './ajax';
import { Canceler } from './canceler';
import { Metadata, RequestHeaders, RequestOptions, ResponseBody, UploaderOptions, UploadState, UploadStatus, UploadxControlEvent } from './interfaces';
import { RetryHandler } from './retry-handler';
/**
 * Uploader Base Class
 */
export declare abstract class Uploader implements UploadState {
    readonly file: File;
    readonly options: Readonly<UploaderOptions>;
    readonly stateChange: (evt: UploadState) => void;
    readonly ajax: Ajax;
    name: string;
    readonly size: number;
    readonly uploadId: string;
    response: ResponseBody;
    responseStatus: number;
    responseHeaders: Record<string, string>;
    progress: number;
    remaining: number;
    speed: number;
    /** Custom headers */
    headers: RequestHeaders;
    /** Metadata Object */
    metadata: Metadata;
    /** Upload endpoint */
    endpoint: string;
    /** Chunk size in bytes */
    chunkSize: number;
    /** Auth token/tokenGetter */
    token: UploadxControlEvent['token'];
    /** Byte offset within the whole file */
    offset?: number;
    /** Retries handler */
    retry: RetryHandler;
    canceler: Canceler;
    /** Set HttpRequest responseType */
    protected responseType?: 'json' | 'text';
    private readonly _authorize;
    private readonly _prerequest;
    private startTime;
    private _token;
    private _url;
    url: string;
    private _status;
    status: UploadStatus;
    constructor(file: File, options: Readonly<UploaderOptions>, stateChange: (evt: UploadState) => void, ajax: Ajax);
    /**
     * Configure uploader
     */
    configure({ metadata, headers, token, endpoint, action }: UploadxControlEvent): void;
    /**
     * Starts uploading
     */
    upload(): Promise<void>;
    /**
     * Performs http requests
     */
    request(requestOptions: RequestOptions): Promise<void>;
    /**
     * Set auth token cache
     */
    updateToken: () => Promise<string | void>;
    /**
     * Get file URI
     */
    protected abstract getFileUrl(): Promise<string>;
    /**
     * Send file content and return an offset for the next request
     */
    protected abstract sendFileContent(): Promise<number | undefined>;
    /**
     * Get an offset for the next request
     */
    protected abstract getOffset(): Promise<number | undefined>;
    protected abort(): void;
    protected cancel(): Promise<void>;
    /**
     * Gets the value from the response
     */
    protected getValueFromResponse(key: string): string | null;
    protected getChunk(): {
        start: number;
        end: number;
        body: Blob;
    };
    private cleanup;
    private onProgress;
}
