import { View } from "./view";
export declare enum FilterMode {
    Include = "Include",
    Exclude = "Exclude"
}
export declare class FilteredView {
    baseViewKey: string;
    baseView?: View;
    key: string;
    description: string;
    mode: FilterMode;
    tags: string[];
    constructor(baseView?: View, key?: string, description?: string, mode?: FilterMode, ...tags: string[]);
    toDto(): any;
    fromDto(dto: any): void;
}
