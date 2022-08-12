import { Workspace, RelationshipView, Relationship } from "../../core";
declare class StringWriter {
    private value;
    write(content: string): void;
    writeLine(content: string): void;
    newline(): void;
    toString(): string;
}
export declare class PlantUMLWriter {
    toPlantUML(workspace: Workspace): string;
    private writeSystemContextView;
    private writeContainerView;
    private writeComponentView;
    private writeStaticView;
    private writeDeploymentView;
    private writeDeploymentNode;
    private writeContainerInstance;
    private writeElement;
    writeRelationships(relationships: RelationshipView[], writer: StringWriter): void;
    writeRelationship(r: Relationship, writer: StringWriter): void;
    private writeHeader;
    private by;
    private typeOf;
    private nameOf;
    private writeFooter;
}
export {};
