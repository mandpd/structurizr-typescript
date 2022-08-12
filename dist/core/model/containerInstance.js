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
exports.ContainerInstance = void 0;
var deploymentElement_1 = require("./deploymentElement");
var httpHealthCheck_1 = require("./httpHealthCheck");
var tags_1 = require("./tags");
var ContainerInstance = /** @class */ (function (_super) {
    __extends(ContainerInstance, _super);
    function ContainerInstance() {
        var _this = _super.call(this) || this;
        _this.healthChecks = [];
        _this.tags.add(tags_1.Tags.ContainerInstance);
        return _this;
    }
    Object.defineProperty(ContainerInstance.prototype, "type", {
        get: function () { return ContainerInstance.type; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContainerInstance.prototype, "canonicalName", {
        get: function () {
            return this.container.canonicalName + "[" + this.instanceId + "]";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContainerInstance.prototype, "parent", {
        get: function () {
            return this.container.parent;
        },
        set: function (p) {
        },
        enumerable: false,
        configurable: true
    });
    ContainerInstance.prototype.addHealthCheck = function (name, url, interval, timeout) {
        if (interval === void 0) { interval = 60; }
        if (timeout === void 0) { timeout = 0; }
        var healthCheck = new httpHealthCheck_1.HttpHealthCheck();
        healthCheck.name = name;
        healthCheck.url = url;
        healthCheck.interval = interval;
        healthCheck.timeout = timeout;
        if (!this.healthChecks.find(function (h) { return h.equals(healthCheck); })) {
            this.healthChecks.push(healthCheck);
        }
    };
    ContainerInstance.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        return __assign(__assign({}, dto), { environment: this.environment, containerId: this.containerId, instanceId: this.instanceId, healthChecks: this.healthChecks.map(function (h) { return h.toDto(); }) });
    };
    ContainerInstance.prototype.fromDto = function (dto) {
        _super.prototype.fromDto.call(this, dto);
        this.environment = dto.environment;
        this.containerId = dto.containerId;
        this.instanceId = dto.instanceId;
        this.healthChecks = dto.healthChecks ? dto.healthChecks.map(function (h) {
            var c = new httpHealthCheck_1.HttpHealthCheck();
            c.fromDto(h);
            return c;
        }) : [];
    };
    ContainerInstance.type = "ContainerInstance";
    return ContainerInstance;
}(deploymentElement_1.DeploymentElement));
exports.ContainerInstance = ContainerInstance;
