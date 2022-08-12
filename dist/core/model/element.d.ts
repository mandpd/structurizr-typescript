import { ModelItem } from "./modelItem";
import { IEquatable } from "./iequatable";
import { Model } from "./model";
import { Relationships } from "./relationships";
export declare abstract class Element extends ModelItem implements IEquatable<Element> {
    static CanonicalNameSeparator: string;
    name: string;
    description: string;
    url: string;
    model: Model;
    relationships: Relationships;
    toDto(): any;
    fromDto(dto: any): void;
    abstract get canonicalName(): string;
    abstract get parent(): Element | null;
    abstract set parent(p: Element | null);
    abstract get type(): string;
    equals(other: Element): boolean;
    protected formatForCanonicalName(name: string): string;
}
