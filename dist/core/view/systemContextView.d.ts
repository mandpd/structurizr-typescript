import { StaticView } from "./staticView";
import { SoftwareSystem } from "../model/softwareSystem";
import { Element } from "../model/element";
export declare class SystemContextView extends StaticView {
    get name(): string;
    constructor(softwareSystem?: SoftwareSystem, key?: string, description?: string);
    addAllElements(): void;
    addNearestNeighbours(element: Element): void;
}
