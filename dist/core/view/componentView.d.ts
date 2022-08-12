import { StaticView } from "./staticView";
import { Container } from "../model/container";
import { Element } from "../model/element";
import { Component } from "../model/component";
export declare class ComponentView extends StaticView {
    container?: Container | undefined;
    containerId?: string;
    get name(): string;
    constructor(container?: Container | undefined, key?: string, description?: string);
    addAllElements(): void;
    addAllComponents(): void;
    addNearestNeighbours(element: Element): void;
    addComponent(component: Component): void;
    protected addElement(element: Element, addRelationships: boolean): void;
    toDto(): any;
    fromDto(dto: any): void;
}
