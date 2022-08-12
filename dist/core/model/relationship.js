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
exports.Relationship = void 0;
var modelItem_1 = require("./modelItem");
var interactionStyle_1 = require("./interactionStyle");
var tags_1 = require("./tags");
var Relationship = /** @class */ (function (_super) {
    __extends(Relationship, _super);
    function Relationship(source, destination, description, technology, interactionStyle) {
        if (interactionStyle === void 0) { interactionStyle = interactionStyle_1.InteractionStyle.Synchronous; }
        var _this = _super.call(this) || this;
        _this.interactionStlye = interactionStyle_1.InteractionStyle.Synchronous;
        if (source) {
            _this.source = source;
            _this.sourceId = source.id;
        }
        if (destination) {
            _this.destination = destination;
            _this.destinationId = destination.id;
        }
        if (description) {
            _this.description = description;
        }
        _this.technology = technology;
        _this.interactionStlye = interactionStyle;
        if (interactionStyle == interactionStyle_1.InteractionStyle.Synchronous) {
            _this.tags.add(tags_1.Tags.Synchronous);
        }
        else {
            _this.tags.add(tags_1.Tags.Asynchronous);
        }
        return _this;
    }
    Relationship.prototype.toDto = function () {
        var dto = _super.prototype.toDto.call(this);
        dto.description = this.description;
        if (this.technology) {
            dto.technology = this.technology;
        }
        if (this.interactionStlye != interactionStyle_1.InteractionStyle.Synchronous) {
            dto.interactionStlye = this.interactionStlye;
        }
        dto.sourceId = this.sourceId;
        dto.destinationId = this.destinationId;
        if (this.linkedRelationshipId) {
            dto.linkedRelationshipId = this.linkedRelationshipId;
        }
        return dto;
    };
    Relationship.prototype.fromDto = function (dto) {
        _super.prototype.fromDto.call(this, dto);
        this.description = dto.description;
        this.technology = dto.technology;
        this.interactionStlye = dto.interactionStlye;
        this.linkedRelationshipId = dto.linkedRelationshipId;
        this.sourceId = dto.sourceId;
        this.destinationId = dto.destinationId;
    };
    Relationship.prototype.getRequiredTags = function () {
        if (!this.linkedRelationshipId) {
            return [tags_1.Tags.Relationship];
        }
        return [];
    };
    Relationship.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        if (this.description !== other.description) {
            return false;
        }
        if (!this.destination.equals(other.destination)) {
            return false;
        }
        if (!this.source.equals(other.source)) {
            return false;
        }
        return true;
    };
    return Relationship;
}(modelItem_1.ModelItem));
exports.Relationship = Relationship;
