import { ModelItem } from "./modelItem";
export declare class Tags {
    private _owner;
    static Synchronous: string;
    static Asynchronous: string;
    static Relationship: string;
    static Element: string;
    static Person: string;
    static SoftwareSystem: string;
    static Container: string;
    static Component: string;
    static ContainerInstance: string;
    private _all;
    constructor(_owner: ModelItem);
    asArray(): string[];
    add(tag: string): void;
    remove(tag: string): void;
    contains(tag: string): boolean;
    clear(): void;
    toDto(): string;
    fromDto(value: string): void;
}
