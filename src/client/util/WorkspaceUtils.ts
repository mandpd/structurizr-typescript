import { Workspace } from "../../core/model/Workspace"
import { readFileSync, existsSync } from "fs"

export class WorkspaceUtils {
  /**
   * Converts the specified JSON string to a Workspace instance.
   *
   * @param json      the JSON definition of the workspace
   * @return  a Workspace instance
   * @throws Exception    if the JSON can not be deserialized
   */
  public static fromJson(json: string): Workspace {
    if (json == null || json.length == 0) {
      throw new Error("A JSON string must be provided.")
    }

    var dto = JSON.parse(json)
    if (!dto || (dto["success"] != undefined && !dto["success"])) {
      throw new Error("Response from API seems to indicate an error: " + json)
    }

    var w = new Workspace("", "")
    w.fromDto(JSON.parse(json))
    w.hydrate()
    return w
  }

  /**
   * Loads a workspace from a JSON definition saved as a file.
   *
   * @param filePath a File representing the JSON definition
   * @return a Workspace object
   * @throws Exception if something goes wrong
   */
  public static loadWorkspaceFromJson(filePath: string): Workspace {
    if (filePath == null) {
      throw new Error("The path to a JSON file must be specified.")
    } else if (!existsSync(filePath)) {
      throw new Error("The specified JSON file does not exist.")
    }
    const jsonString = readFileSync(filePath, "utf8")
    return this.fromJson(jsonString)
  }
}
