import { Element, Relationship, IImpliedRelationshipsStrategy } from "..";
export declare abstract class AbstractImpliedRelationshipsStrategy implements IImpliedRelationshipsStrategy {
    protected impliedRelationshipIsAllowed(source: Element, destination: Element): boolean;
    abstract createImpliedRelationships(relationship: Relationship): void;
}
