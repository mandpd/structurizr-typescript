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
exports.SoftwareSystem = void 0;
var staticStructureElement_1 = require("./staticStructureElement");
var element_1 = require("./element");
var location_1 = require("./location");
var tags_1 = require("./tags");
var container_1 = require("./container");
var SoftwareSystem = /** @class */ (function (_super) {
    __extends(SoftwareSystem, _super);
    function SoftwareSystem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.location = location_1.Location.Unspecified;
        _this.containers = [];
        return _this;
    }
    Object.defineProperty(SoftwareSystem.prototype, "type", {
        get: function () { return SoftwareSystem.type; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SoftwareSystem.prototype, "parent", {
        get: function () { return null; },
        set: function (p) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SoftwareSystem.prototype, "canonicalName", {
        get: function () {
            return element_1.Element.CanonicalNameSeparator + _super.prototype.formatForCanonicalName.call(this, this.name);
        },
        enumerable: false,
        configurable: true
    });
    SoftwareSystem.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        dto.location = this.location;
        dto.containers = this.containers.map(function (c) { return c.toDto(); });
        return dto;
    };
    SoftwareSystem.prototype.fromDto = function (dto) {
        var _this = this;
        _super.prototype.fromDto.call(this, dto);
        this.location = dto.location;
        this.containers = dto.containers
            ? dto.containers.map(function (containerDto) {
                var c = new container_1.Container();
                c.parent = _this;
                c.fromDto(containerDto);
                return c;
            })
            : [];
    };
    SoftwareSystem.prototype.getRequiredTags = function () {
        return [tags_1.Tags.Element, tags_1.Tags.SoftwareSystem];
    };
    SoftwareSystem.prototype.addContainer = function (name, description, technology) {
        return this.model.addContainer(this, name, description, technology);
    };
    SoftwareSystem.type = "SoftwareSystem";
    return SoftwareSystem;
}(staticStructureElement_1.StaticStructureElement));
exports.SoftwareSystem = SoftwareSystem;
