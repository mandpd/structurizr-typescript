import { Element } from "../model/element";
import { Format } from "./format";
import { DecisionStatus } from "./decisionStatus";
export declare class Decision {
    id?: string;
    date?: Date;
    status?: DecisionStatus;
    element?: Element;
    title?: string;
    format?: Format;
    content?: string;
    private _elementId?;
    get elementId(): string | undefined;
    set elementId(value: string | undefined);
    toDto(): {
        id: string | undefined;
        date: string;
        status: DecisionStatus | undefined;
        title: string | undefined;
        content: string | undefined;
        format: Format | undefined;
        elementId: string | undefined;
    };
    fromDto(dto: any): void;
}
