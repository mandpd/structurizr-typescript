"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutomaticLayout = void 0;
var AutomaticLayout = /** @class */ (function () {
    function AutomaticLayout() {
    }
    AutomaticLayout.prototype.toDto = function () {
        return {
            rankDirection: this.rankDirection,
            rankSeparation: this.rankSeparation,
            nodeSeparation: this.nodeSeparation,
            edgeSeparation: this.edgeSeparation,
            vertices: this.vertices
        };
    };
    AutomaticLayout.prototype.fromDto = function (dto) {
        this.rankDirection = dto.rankDirection;
        this.rankSeparation = dto.rankSeparation;
        this.nodeSeparation = dto.nodeSeparation;
        this.edgeSeparation = dto.edgeSeparation;
        this.vertices = dto.vertices;
    };
    return AutomaticLayout;
}());
exports.AutomaticLayout = AutomaticLayout;
