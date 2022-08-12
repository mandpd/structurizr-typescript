import { Model } from "../model/model";
import { Element } from "../model/element";
import { Section } from "./section";
import { Decision } from "./decision";
import { SoftwareSystem } from "../model/softwareSystem";
import { DecisionStatus } from "./decisionStatus";
import { Format } from "./format";
export declare class Documentation {
    private model;
    sections: Set<Section>;
    decisions: Set<Decision>;
    constructor(model: Model);
    addSection(element: Element | undefined, title: string, format: any, content: string): Section;
    addDecision(element: SoftwareSystem | undefined, id: string, date: Date, title: string, status: DecisionStatus, format: Format, content: string): Decision;
    toDto(): {
        sections: {
            title: string | undefined;
            content: string | undefined;
            format: Format | undefined;
            order: number | undefined;
            elementId: string | null;
        }[];
        decisions: {
            id: string | undefined;
            date: string;
            status: DecisionStatus | undefined;
            title: string | undefined;
            content: string | undefined;
            format: Format | undefined;
            elementId: string | undefined;
        }[];
    };
    fromDto(dto: any): void;
    hydrate(): void;
    private findElementAndHydrate;
    private checkSectionIsUnqiue;
    private checkDecisionIsUnqiue;
}
