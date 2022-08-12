"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementView = void 0;
var ElementView = /** @class */ (function () {
    function ElementView(element) {
        if (element) {
            this.element = element;
            this.id = element.id;
        }
    }
    Object.defineProperty(ElementView.prototype, "type", {
        get: function () {
            return "ElementView";
        },
        enumerable: false,
        configurable: true
    });
    ElementView.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        if (other === this) {
            return true;
        }
        if (other.type !== this.type) {
            return false;
        }
        return this.id === other.id;
    };
    ElementView.prototype.copyLayoutInformationFrom = function (source) {
        if (source) {
            this.x = source.x;
            this.y = source.y;
        }
    };
    ElementView.prototype.toDto = function () {
        return {
            id: this.id,
            x: this.x,
            y: this.y
        };
    };
    ElementView.prototype.fromDto = function (dto) {
        this.id = dto.id;
        this.x = dto.x;
        this.y = dto.y;
    };
    return ElementView;
}());
exports.ElementView = ElementView;
