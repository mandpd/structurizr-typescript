import { DeploymentElement } from "./deploymentElement";
import { Container } from "./container";
import { Element } from "./element";
import { HttpHealthCheck } from "./httpHealthCheck";
export declare class ContainerInstance extends DeploymentElement {
    static type: string;
    get type(): string;
    constructor();
    get canonicalName(): string;
    get parent(): Element | null;
    set parent(p: Element | null);
    instanceId: number;
    containerId?: string;
    container?: Container;
    healthChecks: HttpHealthCheck[];
    addHealthCheck(name: string, url: string, interval?: number, timeout?: number): void;
    toDto(): any;
    fromDto(dto: any): void;
}
