"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceUtils = void 0;
var Workspace_1 = require("../../core/model/Workspace");
var fs_1 = require("fs");
var WorkspaceUtils = /** @class */ (function () {
    function WorkspaceUtils() {
    }
    /**
     * Converts the specified JSON string to a Workspace instance.
     *
     * @param json      the JSON definition of the workspace
     * @return  a Workspace instance
     * @throws Exception    if the JSON can not be deserialized
     */
    WorkspaceUtils.fromJson = function (json) {
        if (json == null || json.length == 0) {
            throw new Error("A JSON string must be provided.");
        }
        var dto = JSON.parse(json);
        if (!dto || (dto["success"] != undefined && !dto["success"])) {
            throw new Error("Response from API seems to indicate an error: " + json);
        }
        var w = new Workspace_1.Workspace("", "");
        w.fromDto(JSON.parse(json));
        w.hydrate();
        return w;
    };
    /**
     * Loads a workspace from a JSON definition saved as a file.
     *
     * @param filePath a File representing the JSON definition
     * @return a Workspace object
     * @throws Exception if something goes wrong
     */
    WorkspaceUtils.loadWorkspaceFromJson = function (filePath) {
        if (filePath == null) {
            throw new Error("The path to a JSON file must be specified.");
        }
        else if (!(0, fs_1.existsSync)(filePath)) {
            throw new Error("The specified JSON file does not exist.");
        }
        var jsonString = (0, fs_1.readFileSync)(filePath, "utf8");
        return this.fromJson(jsonString);
    };
    return WorkspaceUtils;
}());
exports.WorkspaceUtils = WorkspaceUtils;
