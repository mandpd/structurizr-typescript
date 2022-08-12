import { StaticStructureElement } from "./staticStructureElement";
import { IEquatable } from "./iequatable";
import { Container } from "./container";
import { CodeElement } from "./codeElement";
import { Element } from "./element";
export declare class Component extends StaticStructureElement implements IEquatable<Component> {
    static type: string;
    get type(): string;
    parent: Element | null;
    technology?: string;
    size: number;
    codeElements: CodeElement[];
    get primaryCodeElement(): CodeElement | null;
    get primaryType(): string | null;
    set primaryType(value: string | null);
    addSupportingType(type: string, name?: string): CodeElement;
    get container(): Container | null;
    get canonicalName(): string;
    toDto(): any;
    fromDto(dto: any): void;
    getRequiredTags(): string[];
}
