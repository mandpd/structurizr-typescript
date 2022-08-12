"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractImpliedRelationshipsStrategy = void 0;
var __1 = require("..");
var AbstractImpliedRelationshipsStrategy = /** @class */ (function () {
    function AbstractImpliedRelationshipsStrategy() {
    }
    AbstractImpliedRelationshipsStrategy.prototype.impliedRelationshipIsAllowed = function (source, destination) {
        if (source.equals(destination)) {
            return false;
        }
        return !((0, __1.isChildOf)(source, destination) || (0, __1.isChildOf)(destination, source));
    };
    return AbstractImpliedRelationshipsStrategy;
}());
exports.AbstractImpliedRelationshipsStrategy = AbstractImpliedRelationshipsStrategy;
