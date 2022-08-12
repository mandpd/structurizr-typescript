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
exports.StaticView = void 0;
var view_1 = require("./view");
var StaticView = /** @class */ (function (_super) {
    __extends(StaticView, _super);
    function StaticView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StaticView.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        dto.animations = [];
        return dto;
    };
    StaticView.prototype.addAllSoftwareSystems = function () {
        var _this = this;
        this.model.softwareSystems.forEach(function (s) {
            _this.addSoftwareSystem(s);
        });
    };
    StaticView.prototype.addAllPeople = function () {
        var _this = this;
        this.model.people.forEach(function (p) {
            _this.addPerson(p);
        });
    };
    StaticView.prototype.addAllContainers = function () {
        var _this = this;
        this.softwareSystem.containers.forEach(function (c) { return _this.addElement(c, true); });
    };
    StaticView.prototype.addSoftwareSystem = function (softwareSystem) {
        this.addElement(softwareSystem, true);
    };
    StaticView.prototype.addPerson = function (person) {
        this.addElement(person, true);
    };
    StaticView.prototype.addNearestNeighboursOfType = function (element, typeOfElement) {
        var _this = this;
        if (!element) {
            return;
        }
        this.addElement(element, true);
        this.model.relationships.forEach(function (r) {
            if (r.source.equals(element) && r.destination.type == typeOfElement) {
                _this.addElement(r.destination, true);
            }
            if (r.destination.equals(element) && r.source.type == typeOfElement) {
                _this.addElement(r.source, true);
            }
        });
    };
    return StaticView;
}(view_1.View));
exports.StaticView = StaticView;
