import { StaticStructureElement } from "./staticStructureElement";
import { IEquatable } from "./iequatable";
import { SoftwareSystem } from "./softwareSystem";
import { Element } from "./element";
import { Component } from "./component";
export declare class Container extends StaticStructureElement implements IEquatable<Container> {
    static type: string;
    get type(): string;
    parent: Element | null;
    technology?: string;
    components: Component[];
    get softwareSystem(): SoftwareSystem | null;
    get canonicalName(): string;
    addComponent(name: string, description: string, type?: string, technology?: string): Component | null;
    toDto(): any;
    fromDto(dto: any): void;
    getRequiredTags(): string[];
}
