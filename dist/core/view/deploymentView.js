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
exports.DeploymentView = void 0;
var view_1 = require("./view");
var DeploymentView = /** @class */ (function (_super) {
    __extends(DeploymentView, _super);
    function DeploymentView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DeploymentView.prototype, "model", {
        get: function () {
            return this._model;
        },
        set: function (m) {
            this._model = m;
        },
        enumerable: false,
        configurable: true
    });
    DeploymentView.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        dto.environment = this.environment;
        return dto;
    };
    DeploymentView.prototype.fromDto = function (dto) {
        _super.prototype.fromDto.call(this, dto);
        this.environment = dto.environment;
    };
    Object.defineProperty(DeploymentView.prototype, "name", {
        get: function () {
            return this.softwareSystem ? this.softwareSystem.name + " - Deployment" : "Deployment";
        },
        enumerable: false,
        configurable: true
    });
    DeploymentView.prototype.addAllDeploymentNodes = function () {
        var _this = this;
        this.model.deploymentNodes.forEach(function (n) { return _this.addDeploymentNode(n); });
    };
    DeploymentView.prototype.addDeploymentNode = function (deploymentNode) {
        if (deploymentNode && this.addContainerInstancesAndDeploymentNodes(deploymentNode)) {
            var parent = deploymentNode.parent;
            while (parent != null) {
                this.addElement(parent, false);
                parent = parent.parent;
            }
        }
    };
    DeploymentView.prototype.addContainerInstancesAndDeploymentNodes = function (deploymentNode) {
        var _this = this;
        var hasContainers = false;
        deploymentNode.containerInstances.forEach(function (containerInstance) {
            if (!_this.softwareSystem || containerInstance.container.parent.equals(_this.softwareSystem)) {
                _this.addElement(containerInstance, true);
                hasContainers = true;
            }
        });
        deploymentNode.children.forEach(function (child) {
            if (_this.addContainerInstancesAndDeploymentNodes(child)) {
                hasContainers = true;
            }
        });
        if (hasContainers) {
            this.addElement(deploymentNode, false);
        }
        return hasContainers;
    };
    return DeploymentView;
}(view_1.View));
exports.DeploymentView = DeploymentView;
