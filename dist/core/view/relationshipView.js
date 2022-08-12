"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipView = exports.Routing = void 0;
var Routing;
(function (Routing) {
    Routing["Direct"] = "Direct";
    Routing["Orthogonal"] = "Orthogonal";
})(Routing = exports.Routing || (exports.Routing = {}));
var RelationshipView = /** @class */ (function () {
    function RelationshipView(relationship) {
        this.vertices = [];
        this._position = undefined;
        if (relationship) {
            this.relationship = relationship;
            this.id = relationship.id;
        }
    }
    Object.defineProperty(RelationshipView.prototype, "type", {
        get: function () {
            return "RelationshipView";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RelationshipView.prototype, "position", {
        get: function () {
            return this._position;
        },
        set: function (value) {
            if (value != undefined) {
                if (value < 0) {
                    this._position = 0;
                }
                else if (value > 100) {
                    this._position = 100;
                }
                else {
                    this._position = value;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    RelationshipView.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        if (other === this) {
            return true;
        }
        if (other.type !== this.type) {
            return false;
        }
        if (this.description != other.description) {
            return false;
        }
        if (this.id != other.id) {
            return false;
        }
        return !(this.order != undefined ? this.order != other.order : other.order != undefined);
    };
    RelationshipView.prototype.copyLayoutInformationFrom = function (source) {
        if (source) {
            this.vertices = source.vertices;
            this.routing = source.routing;
            this.position = source.position;
        }
    };
    RelationshipView.prototype.toDto = function () {
        return {
            id: this.id,
            order: this.order,
            description: this.description,
            vertices: this.vertices,
            routing: this.routing,
            position: this.position
        };
    };
    RelationshipView.prototype.fromDto = function (dto) {
        this.id = dto.id;
        this.order = dto.order;
        this.description = dto.description;
        this.vertices = dto.vertices;
        this.routing = dto.routing;
        this.position = dto.position;
    };
    return RelationshipView;
}());
exports.RelationshipView = RelationshipView;
