import { StaticStructureElement } from "./staticStructureElement";
import { IEquatable } from "./iequatable";
import { Element } from "./element";
import { Location } from "./location";
import { Container } from "./container";
export declare class SoftwareSystem extends StaticStructureElement implements IEquatable<SoftwareSystem> {
    static type: string;
    get type(): string;
    get parent(): Element | null;
    set parent(p: Element | null);
    location: Location;
    containers: Container[];
    get canonicalName(): string;
    toDto(): any;
    fromDto(dto: any): void;
    getRequiredTags(): string[];
    addContainer(name: string, description: string, technology: string): Container | null;
}
