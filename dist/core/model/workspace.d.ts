import { Model } from "./model";
import { ViewSet } from "../view/viewSet";
import { Documentation } from "../documentation/documentation";
import { WorkspaceConfiguration } from "./workspaceConfiguration";
export declare abstract class AbstractWorkspace {
    name: string;
    description: string;
    id: number;
    lastModifiedDate: Date;
    version: string;
    configuration: WorkspaceConfiguration;
    constructor(name: string, description: string);
    toDto(): any;
    fromDto(dto: any): void;
}
export declare class Workspace extends AbstractWorkspace {
    model: Model;
    views: ViewSet;
    documentation: Documentation;
    toDto(): any;
    fromDto(dto: any): void;
    hydrate(): void;
}
