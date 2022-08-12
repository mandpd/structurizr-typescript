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
exports.SystemContextView = void 0;
var staticView_1 = require("./staticView");
var softwareSystem_1 = require("../model/softwareSystem");
var person_1 = require("../model/person");
var SystemContextView = /** @class */ (function (_super) {
    __extends(SystemContextView, _super);
    function SystemContextView(softwareSystem, key, description) {
        var _this = _super.call(this, softwareSystem, key, description) || this;
        if (softwareSystem) {
            _this.addElement(softwareSystem, true);
        }
        return _this;
    }
    Object.defineProperty(SystemContextView.prototype, "name", {
        get: function () {
            return this.softwareSystem.name + " - System Context";
        },
        enumerable: false,
        configurable: true
    });
    SystemContextView.prototype.addAllElements = function () {
        this.addAllSoftwareSystems();
        this.addAllPeople();
    };
    SystemContextView.prototype.addNearestNeighbours = function (element) {
        this.addNearestNeighboursOfType(element, softwareSystem_1.SoftwareSystem.type);
        this.addNearestNeighboursOfType(element, person_1.Person.type);
    };
    return SystemContextView;
}(staticView_1.StaticView));
exports.SystemContextView = SystemContextView;
