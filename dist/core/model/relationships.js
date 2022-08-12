"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Relationships = void 0;
var relationship_1 = require("./relationship");
var Relationships = /** @class */ (function () {
    function Relationships(owner) {
        this.owner = owner;
        this._all = [];
    }
    Relationships.prototype.add = function (relationship) {
        if (!this.has(relationship)) {
            this._all.push(relationship);
        }
    };
    Relationships.prototype.has = function (relationship) {
        return this._all.some(function (r) { return r.equals(relationship); });
    };
    Relationships.prototype.hasAfferentRelationships = function () {
        return this.owner.model.hasRelationshipTargeting(this.owner);
    };
    Relationships.prototype.getEfferentRelationshipWith = function (element, description) {
        if (!element) {
            return null;
        }
        var relationship = this._all.filter(function (r) { return r.destination.equals(element); });
        if (description) {
            relationship = relationship.filter(function (r) { return r.description === description; });
        }
        if (relationship.length) {
            return relationship[0];
        }
        return null;
    };
    Relationships.prototype.toDto = function () {
        return this._all.map(function (r) { return r.toDto(); });
    };
    Relationships.prototype.fromDto = function (dto) {
        this._all = dto
            ? dto.map(function (relationshipDto) {
                var r = new relationship_1.Relationship();
                r.fromDto(relationshipDto);
                return r;
            })
            : [];
    };
    Relationships.prototype.forEach = function (callback) {
        this._all.forEach(callback);
    };
    return Relationships;
}());
exports.Relationships = Relationships;
