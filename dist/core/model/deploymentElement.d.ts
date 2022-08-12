import { Element } from "./element";
export declare abstract class DeploymentElement extends Element {
    static DefaultDeploymentEnvironment: string;
    environment: string;
}
