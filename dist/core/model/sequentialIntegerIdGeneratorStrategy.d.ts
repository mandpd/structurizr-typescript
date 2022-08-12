import { Element } from "./element";
import { Relationship } from "./relationship";
export declare class SequentialIntegerIdGeneratorStrategy {
    private _id;
    found(id: string): void;
    generateId(item: Element | Relationship): string;
}
