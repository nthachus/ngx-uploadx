import { NgZone, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { Ajax, AjaxRequestConfig, AjaxResponse } from './ajax';
import { IdService } from './id.service';
import { UploadState, UploadxControlEvent } from './interfaces';
import { UploadxFactoryOptions, UploadxOptions } from './options';
import { Uploader } from './uploader';
export declare class UploadxService implements OnDestroy {
    readonly ajax: Ajax;
    private ngZone;
    private idService;
    /** Upload Queue */
    queue: Uploader[];
    options: UploadxFactoryOptions;
    private readonly eventsStream;
    private subs;
    /** Upload status events */
    readonly events: Observable<UploadState>;
    constructor(options: UploadxOptions | null, defaults: UploadxFactoryOptions, ajax: Ajax, ngZone: NgZone, idService: IdService);
    /**
     * Initializes service
     * @param options global module options
     * @returns Observable that emits a new value on progress or status changes
     */
    init(options?: UploadxOptions): Observable<UploadState>;
    /**
     * Initializes service
     * @param options global module options
     * @returns Observable that emits the current array of uploaders
     */
    connect(options?: UploadxOptions): Observable<Uploader[]>;
    /**
     * Terminates all uploads and clears the queue
     */
    disconnect(): void;
    ngOnDestroy(): void;
    /**
     * Creates uploaders for files and adds them to the upload queue
     */
    handleFiles(files: FileList | File | File[], options?: UploadxOptions): void;
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
    control(evt: UploadxControlEvent): void;
    /**
     * Returns number of active uploads
     */
    runningProcess(): number;
    /**
     * Performs http requests
     */
    request<T = string>(config: AjaxRequestConfig): Promise<AjaxResponse<T>>;
    private stateChange;
    private addUploaderInstance;
    private processQueue;
}
