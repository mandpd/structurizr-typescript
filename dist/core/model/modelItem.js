"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelItem = void 0;
var tags_1 = require("./tags");
var ModelItem = /** @class */ (function () {
    function ModelItem() {
        this._tags = new tags_1.Tags(this);
    }
    Object.defineProperty(ModelItem.prototype, "tags", {
        get: function () {
            return this._tags;
        },
        enumerable: false,
        configurable: true
    });
    ModelItem.prototype.toDto = function () {
        return {
            id: this.id,
            tags: this.tags.toDto(),
            properties: {}
        };
    };
    ModelItem.prototype.fromDto = function (dto) {
        this.id = dto.id;
        this.tags.fromDto(dto.tags);
    };
    ModelItem.prototype.getRequiredTags = function () {
        return [];
    };
    return ModelItem;
}());
exports.ModelItem = ModelItem;
