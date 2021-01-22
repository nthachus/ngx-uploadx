import { Uploader } from './uploader';
export interface UidService {
    generateId(uploader: Uploader): Promise<string> | string;
}
export declare class IdService implements UidService {
    generateId(uploader: Uploader): Promise<string> | string;
}
