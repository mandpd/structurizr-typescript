import { Relationship } from "./relationship";
import { Element } from "./element";
export declare class Relationships {
    private owner;
    private _all;
    constructor(owner: Element);
    add(relationship: Relationship): void;
    has(relationship: Relationship): boolean;
    hasAfferentRelationships(): boolean;
    getEfferentRelationshipWith(element: Element, description?: string): Relationship | null;
    toDto(): {}[];
    fromDto(dto: any[]): void;
    forEach(callback: (r: Relationship) => void): void;
}
