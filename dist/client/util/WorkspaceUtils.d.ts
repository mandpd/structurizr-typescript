import { Workspace } from "../../core/model/Workspace";
export declare class WorkspaceUtils {
    /**
     * Converts the specified JSON string to a Workspace instance.
     *
     * @param json      the JSON definition of the workspace
     * @return  a Workspace instance
     * @throws Exception    if the JSON can not be deserialized
     */
    static fromJson(json: string): Workspace;
    /**
     * Loads a workspace from a JSON definition saved as a file.
     *
     * @param filePath a File representing the JSON definition
     * @return a Workspace object
     * @throws Exception if something goes wrong
     */
    static loadWorkspaceFromJson(filePath: string): Workspace;
}
