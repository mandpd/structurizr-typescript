import { ModelItem } from "./modelItem";
import { IEquatable } from "./iequatable";
import { Element } from "./element";
import { InteractionStyle } from "./interactionStyle";
export declare class Relationship extends ModelItem implements IEquatable<Relationship> {
    description: string;
    technology?: string;
    interactionStlye: InteractionStyle;
    sourceId: string;
    source: Element;
    destinationId: string;
    destination: Element;
    linkedRelationshipId?: string;
    constructor(source?: Element, destination?: Element, description?: string, technology?: string, interactionStyle?: InteractionStyle);
    toDto(): {};
    fromDto(dto: any): void;
    getRequiredTags(): string[];
    equals(other: Relationship): boolean;
}
