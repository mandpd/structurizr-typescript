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
exports.ContainerView = void 0;
var staticView_1 = require("./staticView");
var softwareSystem_1 = require("../model/softwareSystem");
var person_1 = require("../model/person");
var container_1 = require("../model/container");
var ContainerView = /** @class */ (function (_super) {
    __extends(ContainerView, _super);
    function ContainerView(softwareSystem, key, description) {
        return _super.call(this, softwareSystem, key, description) || this;
    }
    Object.defineProperty(ContainerView.prototype, "name", {
        get: function () {
            return this.softwareSystem.name + " - Containers";
        },
        enumerable: false,
        configurable: true
    });
    ContainerView.prototype.addAllElements = function () {
        this.addAllSoftwareSystems();
        this.addAllPeople();
        this.addAllContainers();
    };
    ContainerView.prototype.addNearestNeighbours = function (element) {
        this.addNearestNeighboursOfType(element, person_1.Person.type);
        this.addNearestNeighboursOfType(element, softwareSystem_1.SoftwareSystem.type);
        this.addNearestNeighboursOfType(element, container_1.Container.type);
    };
    ContainerView.prototype.addContainer = function (container) {
        this.addElement(container, true);
    };
    ContainerView.prototype.addElement = function (element, addRelationships) {
        if (element === this.softwareSystem) {
            return;
        }
        _super.prototype.addElement.call(this, element, addRelationships);
    };
    return ContainerView;
}(staticView_1.StaticView));
exports.ContainerView = ContainerView;
