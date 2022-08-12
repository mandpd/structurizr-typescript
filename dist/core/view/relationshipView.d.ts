import { IEquatable } from "../model/iequatable";
import { Relationship } from "../model/relationship";
export declare enum Routing {
    Direct = "Direct",
    Orthogonal = "Orthogonal"
}
export declare class RelationshipView implements IEquatable<RelationshipView> {
    relationship: Relationship;
    id: string;
    order?: string;
    description: string;
    vertices: {
        x?: number;
        y?: number;
    }[];
    routing?: Routing;
    protected get type(): string;
    private _position?;
    get position(): number | undefined;
    set position(value: number | undefined);
    constructor(relationship?: Relationship);
    equals(other: RelationshipView): boolean;
    copyLayoutInformationFrom(source: RelationshipView): void;
    toDto(): any;
    fromDto(dto: any): void;
}
