import { DeploymentElement } from "./deploymentElement";
import { Element } from "./element";
import { ContainerInstance } from "./containerInstance";
import { Container } from "./container";
import { Relationship } from "./relationship";
export declare class DeploymentNode extends DeploymentElement {
    private _parent?;
    get parent(): Element | null;
    set parent(p: Element | null);
    static type: string;
    get type(): string;
    get canonicalName(): string;
    technology: string;
    instances: number;
    children: DeploymentNode[];
    containerInstances: ContainerInstance[];
    add(container: Container): ContainerInstance;
    addDeploymentNode(name: string, description: string, technology: string, instances?: number): DeploymentNode | null;
    uses(destination: DeploymentNode, description: string, technology: string): Relationship | null;
    toDto(): any;
    fromDto(dto: any): void;
}
