import { Uploader } from './uploader';
/**
 * Implements XHR/CORS Resumable Upload
 *
 * {@link https://github.com/kukhariev/node-uploadx/blob/master/proto.md|Github}
 * @see {@link https://developers.google.com/drive/api/v3/manage-uploads#resumable|Google Drive API documentation}
 */
export declare class UploaderX extends Uploader {
    responseType: "json";
    getFileUrl(): Promise<string>;
    sendFileContent(): Promise<number | undefined>;
    getOffset(): Promise<number | undefined>;
    protected getOffsetFromResponse(): number | undefined;
}
export declare function getRangeEnd(range?: string): number;
