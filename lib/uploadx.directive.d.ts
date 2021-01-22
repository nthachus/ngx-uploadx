import { ElementRef, EventEmitter, OnInit, Renderer2 } from '@angular/core';
import { UploadState, UploadxControlEvent } from './interfaces';
import { UploadxOptions } from './options';
import { UploadxService } from './uploadx.service';
export declare class UploadxDirective implements OnInit {
    private elementRef;
    private renderer;
    private uploadService;
    uploadx: UploadxOptions | '';
    options: UploadxOptions;
    control: UploadxControlEvent | '';
    state: EventEmitter<UploadState>;
    constructor(elementRef: ElementRef, renderer: Renderer2, uploadService: UploadxService);
    ngOnInit(): void;
    fileListener(files: FileList): void;
}
