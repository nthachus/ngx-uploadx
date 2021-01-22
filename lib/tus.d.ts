import { Uploader } from './uploader';
/**
 * Implements tus resumable upload protocol
 *
 * {@link https://github.com/tus/tus-resumable-upload-protocol/blob/master/protocol.md|Github}
 */
export declare class Tus extends Uploader {
    headers: {
        'Tus-Resumable': string;
    };
    getFileUrl(): Promise<string>;
    sendFileContent(): Promise<number | undefined>;
    getOffset(): Promise<number | undefined>;
    protected getOffsetFromResponse(): number | undefined;
}
