import { Tags } from "./tags";
export declare abstract class ModelItem {
    id: string;
    private _tags;
    get tags(): Tags;
    toDto(): any;
    fromDto(dto: any): void;
    getRequiredTags(): string[];
}
