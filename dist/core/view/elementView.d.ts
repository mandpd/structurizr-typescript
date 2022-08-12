import { IEquatable } from "../model/iequatable";
import { Element } from "../model/element";
export declare class ElementView implements IEquatable<ElementView> {
    element: Element;
    id: string;
    x?: number;
    y?: number;
    protected get type(): string;
    constructor(element?: Element);
    equals(other: ElementView): boolean;
    copyLayoutInformationFrom(source: ElementView): void;
    toDto(): any;
    fromDto(dto: any): void;
}
