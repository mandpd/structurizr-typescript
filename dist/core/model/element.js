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
exports.Element = void 0;
var modelItem_1 = require("./modelItem");
var relationships_1 = require("./relationships");
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    function Element() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.relationships = new relationships_1.Relationships(_this);
        return _this;
    }
    Element.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        dto.name = this.name;
        dto.description = this.description;
        dto.url = this.url;
        dto.relationships = this.relationships.toDto();
        return dto;
    };
    Element.prototype.fromDto = function (dto) {
        _super.prototype.fromDto.call(this, dto);
        this.name = dto.name;
        this.description = dto.description;
        this.url = dto.url;
        this.relationships.fromDto(dto.relationships);
    };
    Element.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        if (other === this) {
            return true;
        }
        if (other.type !== this.type) {
            return false;
        }
        return this.canonicalName === other.canonicalName;
    };
    Element.prototype.formatForCanonicalName = function (name) {
        return name.replace(Element.CanonicalNameSeparator, "");
    };
    Element.CanonicalNameSeparator = "/";
    return Element;
}(modelItem_1.ModelItem));
exports.Element = Element;
