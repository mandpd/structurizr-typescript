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
exports.ComponentView = void 0;
var staticView_1 = require("./staticView");
var softwareSystem_1 = require("../model/softwareSystem");
var person_1 = require("../model/person");
var container_1 = require("../model/container");
var component_1 = require("../model/component");
var ComponentView = /** @class */ (function (_super) {
    __extends(ComponentView, _super);
    function ComponentView(container, key, description) {
        var _this = _super.call(this, container && container.softwareSystem ? container.softwareSystem : undefined, key, description) || this;
        _this.container = container;
        if (container) {
            _this.containerId = container.id;
        }
        return _this;
    }
    Object.defineProperty(ComponentView.prototype, "name", {
        get: function () {
            return this.softwareSystem.name + " - " + this.container.name + " - Components";
        },
        enumerable: false,
        configurable: true
    });
    ComponentView.prototype.addAllElements = function () {
        this.addAllSoftwareSystems();
        this.addAllPeople();
        this.addAllContainers();
        this.addAllComponents();
    };
    ComponentView.prototype.addAllComponents = function () {
        var _this = this;
        var _a;
        (_a = this.container) === null || _a === void 0 ? void 0 : _a.components.forEach(function (c) { return _this.addElement(c, true); });
    };
    ComponentView.prototype.addNearestNeighbours = function (element) {
        this.addNearestNeighboursOfType(element, person_1.Person.type);
        this.addNearestNeighboursOfType(element, softwareSystem_1.SoftwareSystem.type);
        this.addNearestNeighboursOfType(element, container_1.Container.type);
        this.addNearestNeighboursOfType(element, component_1.Component.type);
    };
    ComponentView.prototype.addComponent = function (component) {
        if (component.container != this.container) {
            return;
        }
        this.addElement(component, true);
    };
    ComponentView.prototype.addElement = function (element, addRelationships) {
        if (element === this.softwareSystem || element === this.container) {
            return;
        }
        _super.prototype.addElement.call(this, element, addRelationships);
    };
    ComponentView.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        dto.containerId = this.containerId;
        return dto;
    };
    ComponentView.prototype.fromDto = function (dto) {
        _super.prototype.fromDto.call(this, dto);
        this.containerId = dto.containerId;
    };
    return ComponentView;
}(staticView_1.StaticView));
exports.ComponentView = ComponentView;
