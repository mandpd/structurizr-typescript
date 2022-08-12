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
exports.StaticStructureElement = void 0;
var element_1 = require("./element");
var interactionStyle_1 = require("./interactionStyle");
var StaticStructureElement = /** @class */ (function (_super) {
    __extends(StaticStructureElement, _super);
    function StaticStructureElement() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StaticStructureElement.prototype.uses = function (destination, description, technology, interactionStyle) {
        if (interactionStyle === void 0) { interactionStyle = interactionStyle_1.InteractionStyle.Synchronous; }
        return this.model.addRelationship(this, destination, description, technology, interactionStyle);
    };
    StaticStructureElement.prototype.delivers = function (destination, description, technology, interactionStyle) {
        return this.model.addRelationship(this, destination, description, technology, interactionStyle);
    };
    return StaticStructureElement;
}(element_1.Element));
exports.StaticStructureElement = StaticStructureElement;
