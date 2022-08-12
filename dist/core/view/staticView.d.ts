import { View } from "./view";
import { SoftwareSystem } from "../model/softwareSystem";
import { Person } from "../model/person";
import { Element } from "../model/element";
export declare abstract class StaticView extends View {
    toDto(): any;
    abstract addAllElements(): void;
    abstract addNearestNeighbours(element: Element): void;
    addAllSoftwareSystems(): void;
    addAllPeople(): void;
    addAllContainers(): void;
    addSoftwareSystem(softwareSystem: SoftwareSystem): void;
    addPerson(person: Person): void;
    addNearestNeighboursOfType(element: Element, typeOfElement: string): void;
}
