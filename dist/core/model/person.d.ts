import { StaticStructureElement } from "./staticStructureElement";
import { IEquatable } from "./iequatable";
import { Location } from "./location";
import { Element } from "./element";
import { InteractionStyle } from "./interactionStyle";
import { Relationship } from "./relationship";
export declare class Person extends StaticStructureElement implements IEquatable<Person> {
    static type: string;
    get type(): string;
    location: Location;
    get canonicalName(): string;
    get parent(): Element | null;
    set parent(p: Element | null);
    getRequiredTags(): string[];
    interactsWith(destination: Person, description: string, technology?: string, interactionStyle?: InteractionStyle): Relationship | null;
    delivers(destination: Person, description: string, technology?: string, interactionStyle?: InteractionStyle): Relationship | null;
    toDto(): any;
    fromDto(dto: any): void;
}
