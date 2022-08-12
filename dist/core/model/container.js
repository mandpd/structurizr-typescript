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
exports.Container = void 0;
var staticStructureElement_1 = require("./staticStructureElement");
var element_1 = require("./element");
var tags_1 = require("./tags");
var component_1 = require("./component");
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    function Container() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.components = [];
        return _this;
    }
    Object.defineProperty(Container.prototype, "type", {
        get: function () { return Container.type; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "softwareSystem", {
        get: function () {
            return this.parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "canonicalName", {
        get: function () {
            return this.parent.canonicalName + element_1.Element.CanonicalNameSeparator + _super.prototype.formatForCanonicalName.call(this, this.name);
        },
        enumerable: false,
        configurable: true
    });
    Container.prototype.addComponent = function (name, description, type, technology) {
        return this.model.addComponent(this, name, description, type, technology);
    };
    Container.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        dto.technology = this.technology;
        dto.components = this.components.map(function (c) { return c.toDto(); });
        return dto;
    };
    Container.prototype.fromDto = function (dto) {
        var _this = this;
        _super.prototype.fromDto.call(this, dto);
        this.technology = dto.technology;
        this.components = dto.components ? dto.components.map(function (cd) {
            var c = new component_1.Component();
            c.fromDto(cd);
            c.parent = _this;
            return c;
        }) : [];
    };
    Container.prototype.getRequiredTags = function () {
        return [tags_1.Tags.Element, tags_1.Tags.Container];
    };
    Container.type = "Container";
    return Container;
}(staticStructureElement_1.StaticStructureElement));
exports.Container = Container;
