import { Workspace } from "../../core/model/workspace";
export declare class StructurizrClient {
    private apiKey;
    private apiSecret;
    private url;
    private httpClient;
    mergeFromRemote: boolean;
    verbose: boolean;
    constructor(apiKey: string, apiSecret: string, url?: string);
    getWorkspace(workspaceId: number): Promise<Workspace>;
    putWorkspace(workspaceId: number, workspace: Workspace): Promise<string>;
    private headers;
    private getAuthorizationHeader;
    private gethmac;
    private getMD5digest;
    private toBase64EncodedUTF8;
    private log;
}
