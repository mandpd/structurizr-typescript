import { Element } from "../model/element";
import { Format } from "./format";
export declare class Section {
    element?: Element;
    title?: string;
    order?: number;
    format?: Format;
    content?: string;
    private _elementId?;
    get elementId(): string | undefined;
    set elementId(value: string | undefined);
    toDto(): {
        title: string | undefined;
        content: string | undefined;
        format: Format | undefined;
        order: number | undefined;
        elementId: string | null;
    };
    fromDto(dto: any): void;
}
