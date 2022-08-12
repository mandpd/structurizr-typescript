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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeploymentNode = void 0;
var deploymentElement_1 = require("./deploymentElement");
var element_1 = require("./element");
var containerInstance_1 = require("./containerInstance");
var DeploymentNode = /** @class */ (function (_super) {
    __extends(DeploymentNode, _super);
    function DeploymentNode() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.children = [];
        _this.containerInstances = [];
        return _this;
    }
    Object.defineProperty(DeploymentNode.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        set: function (p) {
            this._parent = p && p.type == DeploymentNode.type ? p : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DeploymentNode.prototype, "type", {
        get: function () { return DeploymentNode.type; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DeploymentNode.prototype, "canonicalName", {
        get: function () {
            return this.parent
                ? this.parent.canonicalName + element_1.Element.CanonicalNameSeparator + _super.prototype.formatForCanonicalName.call(this, this.name)
                : element_1.Element.CanonicalNameSeparator + "Deployment" + element_1.Element.CanonicalNameSeparator + _super.prototype.formatForCanonicalName.call(this, this.environment) + element_1.Element.CanonicalNameSeparator + _super.prototype.formatForCanonicalName.call(this, this.name);
        },
        enumerable: false,
        configurable: true
    });
    DeploymentNode.prototype.add = function (container) {
        var containerInstance = this.model.addContainerInstance(this, container);
        this.containerInstances.push(containerInstance);
        return containerInstance;
    };
    DeploymentNode.prototype.addDeploymentNode = function (name, description, technology, instances) {
        if (instances === void 0) { instances = 1; }
        var node = this.model.addDeploymentNode(name, description, technology, this, this.environment, instances);
        if (node) {
            this.children.push(node);
        }
        return node;
    };
    DeploymentNode.prototype.uses = function (destination, description, technology) {
        return this.model.addRelationship(this, destination, description, technology);
    };
    DeploymentNode.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        return __assign(__assign({}, dto), { environment: this.environment, technology: this.technology, instances: this.instances, children: this.children.map(function (h) { return h.toDto(); }), containerInstances: this.containerInstances.map(function (h) { return h.toDto(); }) });
    };
    DeploymentNode.prototype.fromDto = function (dto) {
        _super.prototype.fromDto.call(this, dto);
        this.environment = dto.environment;
        this.technology = dto.technology;
        this.instances = dto.instances;
        this.children = dto.children ? dto.children.map(function (h) {
            var c = new DeploymentNode();
            c.fromDto(h);
            return c;
        }) : [];
        this.containerInstances = dto.containerInstances ? dto.containerInstances.map(function (h) {
            var c = new containerInstance_1.ContainerInstance();
            c.fromDto(h);
            return c;
        }) : [];
    };
    DeploymentNode.type = "DeploymentNode";
    return DeploymentNode;
}(deploymentElement_1.DeploymentElement));
exports.DeploymentNode = DeploymentNode;
