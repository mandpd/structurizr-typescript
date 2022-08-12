"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workspace = exports.AbstractWorkspace = void 0;
var model_1 = require("./model");
var viewSet_1 = require("../view/viewSet");
var documentation_1 = require("../documentation/documentation");
var workspaceConfiguration_1 = require("./workspaceConfiguration");
var AbstractWorkspace = /** @class */ (function () {
    function AbstractWorkspace(name, description) {
        this.name = name;
        this.description = description;
        this.configuration = new workspaceConfiguration_1.WorkspaceConfiguration();
    }
    AbstractWorkspace.prototype.toDto = function () {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            lastModifiedDate: this.lastModifiedDate,
            version: this.version,
            documentation: {
                sections: [],
                decisions: [],
                images: []
            },
            configuration: this.configuration.toDto()
        };
    };
    AbstractWorkspace.prototype.fromDto = function (dto) {
        this.id = dto.id;
        this.name = dto.name;
        this.description = dto.description;
        this.lastModifiedDate = dto.lastModifiedDate;
        this.version = dto.version;
        this.configuration.fromDto(dto.configuration);
    };
    return AbstractWorkspace;
}());
exports.AbstractWorkspace = AbstractWorkspace;
var Workspace = /** @class */ (function (_super) {
    __extends(Workspace, _super);
    function Workspace() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new model_1.Model();
        _this.views = new viewSet_1.ViewSet(_this.model);
        _this.documentation = new documentation_1.Documentation(_this.model);
        return _this;
    }
    Workspace.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        dto.model = this.model.toDto();
        dto.views = this.views.toDto();
        dto.documentation = this.documentation.toDto();
        return dto;
    };
    Workspace.prototype.fromDto = function (dto) {
        _super.prototype.fromDto.call(this, dto);
        this.model.fromDto(dto.model);
        this.views.fromDto(dto.views);
        this.documentation.fromDto(dto.documentation);
    };
    Workspace.prototype.hydrate = function () {
        this.model.hydrate();
        this.views.hydrate();
        this.documentation.hydrate();
    };
    return Workspace;
}(AbstractWorkspace));
exports.Workspace = Workspace;
