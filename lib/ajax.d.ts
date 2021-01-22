import { InjectionToken } from '@angular/core';
import { RequestOptions } from './interfaces';
export interface AjaxRequestConfig extends RequestOptions {
    [x: string]: any;
    data?: BodyInit | null;
    url: string;
}
export interface AjaxResponse<T> {
    data: T;
    status: number;
    headers: Record<string, string>;
}
export interface Ajax {
    request: <T = string>(config: AjaxRequestConfig) => Promise<AjaxResponse<T>>;
}
export declare class UploadxAjax {
    private buildXhr;
    constructor(buildXhr: () => XMLHttpRequest);
    request: <T = string>({ method, data, headers, url, responseType, canceler, onUploadProgress, withCredentials, validateStatus }: AjaxRequestConfig) => Promise<AjaxResponse<T>>;
    getResponseHeaders(xhr: XMLHttpRequest): Record<string, string>;
    getResponseBody<T = string>(xhr: XMLHttpRequest, json?: boolean): T;
}
export declare const UPLOADX_AJAX: InjectionToken<Ajax>;
