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
exports.Component = void 0;
var staticStructureElement_1 = require("./staticStructureElement");
var codeElement_1 = require("./codeElement");
var element_1 = require("./element");
var tags_1 = require("./tags");
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.size = 0;
        _this.codeElements = [];
        return _this;
    }
    Object.defineProperty(Component.prototype, "type", {
        get: function () { return Component.type; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "primaryCodeElement", {
        get: function () {
            return this.codeElements.find(function (c) { return c.role === codeElement_1.CodeElementRole.Primary; }) || null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "primaryType", {
        get: function () {
            var _a;
            return ((_a = this.primaryCodeElement) === null || _a === void 0 ? void 0 : _a.type) || null;
        },
        set: function (value) {
            if (value === this.primaryType) {
                return;
            }
            this.codeElements = this.codeElements.filter(function (c) { return c.role !== codeElement_1.CodeElementRole.Primary; });
            if (value && value.trim().length) {
                var primaryCodeElement = new codeElement_1.CodeElement();
                primaryCodeElement.type = value;
                primaryCodeElement.name = value;
                primaryCodeElement.role = codeElement_1.CodeElementRole.Primary;
                this.codeElements.push(primaryCodeElement);
            }
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.addSupportingType = function (type, name) {
        var codeElement = new codeElement_1.CodeElement();
        codeElement.type = type;
        codeElement.name = name || type;
        codeElement.role = codeElement_1.CodeElementRole.Supporting;
        if (!this.codeElements.some(function (c) { return c.equals(codeElement); })) {
            this.codeElements.push(codeElement);
        }
        return codeElement;
    };
    Object.defineProperty(Component.prototype, "container", {
        get: function () {
            return this.parent;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "canonicalName", {
        get: function () {
            return this.parent.canonicalName + element_1.Element.CanonicalNameSeparator + _super.prototype.formatForCanonicalName.call(this, this.name);
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        dto.technology = this.technology;
        dto.size = this.size;
        dto.code = this.codeElements.map(function (c) { return c.toDto(); });
        return dto;
    };
    Component.prototype.fromDto = function (dto) {
        _super.prototype.fromDto.call(this, dto);
        this.technology = dto.technology;
        this.size = dto.size;
        this.codeElements = dto.code ? dto.code.map(function (c) { return new codeElement_1.CodeElement().fromDto(c); }) : [];
    };
    Component.prototype.getRequiredTags = function () {
        return [tags_1.Tags.Element, tags_1.Tags.Component];
    };
    Component.type = "Component";
    return Component;
}(staticStructureElement_1.StaticStructureElement));
exports.Component = Component;
