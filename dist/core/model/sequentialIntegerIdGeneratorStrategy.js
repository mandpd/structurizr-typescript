"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequentialIntegerIdGeneratorStrategy = void 0;
var SequentialIntegerIdGeneratorStrategy = /** @class */ (function () {
    function SequentialIntegerIdGeneratorStrategy() {
        this._id = 0;
    }
    SequentialIntegerIdGeneratorStrategy.prototype.found = function (id) {
        var idInt = parseInt(id);
        if (idInt > this._id) {
            this._id = idInt;
        }
    };
    SequentialIntegerIdGeneratorStrategy.prototype.generateId = function (item) {
        this._id += 1;
        var idString = "" + this._id;
        return idString;
    };
    return SequentialIntegerIdGeneratorStrategy;
}());
exports.SequentialIntegerIdGeneratorStrategy = SequentialIntegerIdGeneratorStrategy;
