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
exports.Person = void 0;
var staticStructureElement_1 = require("./staticStructureElement");
var location_1 = require("./location");
var tags_1 = require("./tags");
var element_1 = require("./element");
var interactionStyle_1 = require("./interactionStyle");
var Person = /** @class */ (function (_super) {
    __extends(Person, _super);
    function Person() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.location = location_1.Location.Unspecified;
        return _this;
    }
    Object.defineProperty(Person.prototype, "type", {
        get: function () { return Person.type; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "canonicalName", {
        get: function () {
            return element_1.Element.CanonicalNameSeparator + _super.prototype.formatForCanonicalName.call(this, this.name);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "parent", {
        get: function () { return null; },
        set: function (p) { },
        enumerable: false,
        configurable: true
    });
    Person.prototype.getRequiredTags = function () {
        return [tags_1.Tags.Element, tags_1.Tags.Person];
    };
    Person.prototype.interactsWith = function (destination, description, technology, interactionStyle) {
        if (interactionStyle === void 0) { interactionStyle = interactionStyle_1.InteractionStyle.Synchronous; }
        return this.model.addRelationship(this, destination, description, technology, interactionStyle);
    };
    Person.prototype.delivers = function (destination, description, technology, interactionStyle) {
        throw "Person cannot be the source of 'delivers' relations";
    };
    Person.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        dto.location = this.location;
        return dto;
    };
    Person.prototype.fromDto = function (dto) {
        _super.prototype.fromDto.call(this, dto);
        this.location = dto.location;
    };
    Person.type = "Person";
    return Person;
}(staticStructureElement_1.StaticStructureElement));
exports.Person = Person;
