import { InjectionToken } from '@angular/core';
import { AuthorizeRequest, UploaderClass, UploaderOptions } from './interfaces';
/**
 * Global Module Options
 */
export interface UploadxOptions extends UploaderOptions {
    /**
     * Provide a user-defined class to support another upload protocol or to extend an existing one.
     * @defaultValue UploadX
     */
    uploaderClass?: UploaderClass;
    /**
     * Set the maximum parallel uploads
     * @defaultValue 2
     */
    concurrency?: number;
    /**
     * Automatically start upload when files added
     * @defaultValue true
     */
    autoUpload?: boolean;
    /**
     * File types the user can pick from the file input
     */
    allowedTypes?: string;
    /**
     * Add 'multiple' attribute
     * @defaultValue true
     */
    multiple?: boolean;
}
export interface UploadxFactoryOptions extends UploadxOptions {
    endpoint: string;
    autoUpload: boolean;
    concurrency: number;
    uploaderClass: UploaderClass;
    authorize: AuthorizeRequest;
}
export declare const UPLOADX_FACTORY_OPTIONS: InjectionToken<UploadxFactoryOptions>;
export declare const UPLOADX_OPTIONS: InjectionToken<UploadxOptions>;
