/// <reference types="node" />
import * as https from "https";
export declare class HttpClient {
    private baseUri;
    constructor(baseUri: string);
    get(path: string, additionalHeaders?: {}): HttpResponse;
    put(path: string, content: {}, additionalHeaders?: {}): HttpResponse;
    private getRequestOptions;
}
export declare class HttpResponse {
    private data;
    private promise;
    constructor(options: https.RequestOptions, content?: any);
    get done(): Promise<string>;
    get responseBody(): string;
}
