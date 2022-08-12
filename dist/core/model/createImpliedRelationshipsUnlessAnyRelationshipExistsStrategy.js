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
exports.CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy = void 0;
var __1 = require("..");
var CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy = /** @class */ (function (_super) {
    __extends(CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy, _super);
    function CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy.prototype.createImpliedRelationships = function (relationship) {
        var source = relationship.source;
        var destination = relationship.destination;
        var model = source.model;
        while (source) {
            var _loop_1 = function () {
                if (this_1.impliedRelationshipIsAllowed(source, destination)) {
                    var createRelationship = !source.relationships.getEfferentRelationshipWith(destination);
                    if (createRelationship) {
                        var newRelationship_1 = model.addRelationship(source, destination, relationship.description, relationship.technology, relationship.interactionStlye, false);
                        relationship.tags.asArray().forEach(function (t) { return newRelationship_1.tags.add(t); });
                    }
                }
                destination = destination.parent;
            };
            var this_1 = this;
            while (destination) {
                _loop_1();
            }
            destination = relationship.destination;
            source = source.parent;
        }
    };
    return CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy;
}(__1.AbstractImpliedRelationshipsStrategy));
exports.CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy = CreateImpliedRelationshipsUnlessAnyRelationshipExistsStrategy;
