import { StaticView } from "./staticView";
import { SoftwareSystem } from "../model/softwareSystem";
import { Container } from "../model/container";
import { Element } from "../model/element";
export declare class ContainerView extends StaticView {
    get name(): string;
    constructor(softwareSystem?: SoftwareSystem, key?: string, description?: string);
    addAllElements(): void;
    addNearestNeighbours(element: Element): void;
    addContainer(container: Container): void;
    protected addElement(element: Element, addRelationships: boolean): void;
}
