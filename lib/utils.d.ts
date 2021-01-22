import { Primitive } from './interfaces';
export declare function resolveUrl(url: string, base: string): string;
export declare function unfunc<T, V>(value: T | ((ref: V) => T), ref: V): T;
export declare const pick: <T, K extends keyof T>(obj: T, whitelist: K[]) => Pick<T, K>;
export declare function isNumber(x?: number): x is number;
/**
 * 32-bit FNV-1a hash function
 */
export declare function createHash(str: string): number;
export declare const b64: {
    encode: (str: string) => string;
    decode: (str: string) => string;
    serialize: (obj: Record<string, string | number | boolean | Primitive[]>) => string;
    parse: (encoded: string) => Record<string, string>;
};
/**
 * Adaptive chunk size
 */
export declare class DynamicChunk {
    /** Maximum chunk size in bytes */
    static maxSize: number;
    /** Minimum chunk size in bytes */
    static minSize: number;
    /** Initial chunk size in bytes */
    static size: number;
    static minChunkTime: number;
    static maxChunkTime: number;
    static scale(throughput: number): number;
}
