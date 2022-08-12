import { View } from "./view";
import { Model } from "../model/model";
import { DeploymentNode } from "../model/deploymentNode";
export declare class DeploymentView extends View {
    private _model;
    get model(): Model;
    set model(m: Model);
    environment?: string;
    toDto(): any;
    fromDto(dto: any): void;
    get name(): string;
    addAllDeploymentNodes(): void;
    addDeploymentNode(deploymentNode: DeploymentNode): void;
    private addContainerInstancesAndDeploymentNodes;
}
