import { Element } from "./element";
import { SoftwareSystem } from "./softwareSystem";
import { Relationship } from "./relationship";
import { InteractionStyle } from "./interactionStyle";
import { Container } from "./container";
import { Component } from "./component";
import { Person } from "./person";
export declare abstract class StaticStructureElement extends Element {
    uses(destination: SoftwareSystem | Container | Component, description: string, technology?: string, interactionStyle?: InteractionStyle): Relationship | null;
    delivers(destination: Person, description: string, technology?: string, interactionStyle?: InteractionStyle): Relationship | null;
}
