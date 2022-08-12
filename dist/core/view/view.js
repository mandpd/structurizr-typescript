"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
var elementView_1 = require("./elementView");
var relationshipView_1 = require("./relationshipView");
var automaticLayout_1 = require("./automaticLayout");
var rankDirection_1 = require("./rankDirection");
var paperSize_1 = require("./paperSize");
var View = /** @class */ (function () {
    function View(softwareSystem, key, description) {
        this.elements = [];
        this.relationships = [];
        if (softwareSystem) {
            this.softwareSystem = softwareSystem;
            this.softwareSystemId = softwareSystem ? softwareSystem.id : undefined;
            this.key = key;
            this.description = description;
        }
    }
    Object.defineProperty(View.prototype, "model", {
        get: function () {
            return this.softwareSystem.model;
        },
        set: function (m) {
        },
        enumerable: false,
        configurable: true
    });
    View.prototype.toDto = function () {
        var _a;
        return {
            key: this.key,
            description: this.description,
            softwareSystemId: this.softwareSystemId,
            title: this.title,
            elements: this.elements.map(function (e) { return e.toDto(); }),
            relationships: this.relationships.map(function (r) { return r.toDto(); }),
            automaticLayout: this.automaticLayout ? this.automaticLayout.toDto() : null,
            paperSize: (_a = this.paperSize) === null || _a === void 0 ? void 0 : _a.key
        };
    };
    View.prototype.fromDto = function (dto) {
        this.key = dto.key;
        this.description = dto.description;
        this.softwareSystemId = dto.softwareSystemId;
        this.title = dto.title;
        this.elements = (dto.elements || []).map(function (elementDto) {
            var e = new elementView_1.ElementView();
            e.fromDto(elementDto);
            return e;
        });
        this.relationships = (dto.relationships || []).map(function (relationshipDto) {
            var r = new relationshipView_1.RelationshipView();
            r.fromDto(relationshipDto);
            return r;
        });
        if (dto.automaticLayout) {
            this.automaticLayout = new automaticLayout_1.AutomaticLayout();
            this.automaticLayout.fromDto(dto.automaticLayout);
        }
        if (dto.paperSize) {
            this.paperSize = paperSize_1.PaperSize.getPaperSize(dto.paperSize);
        }
    };
    View.prototype.add = function (relationship) {
        if (relationship && this.isElementInView(relationship.source) && this.isElementInView(relationship.destination)) {
            return this._addRelationship(relationship);
        }
        return null;
    };
    View.prototype.addRelationship = function (relationship, description, order) {
        var view = this.add(relationship);
        if (view) {
            view.description = description;
            view.order = order;
        }
        return view;
    };
    View.prototype.isElementInView = function (element) {
        return this.elements.some(function (e) { return e.element.equals(element); });
    };
    View.prototype.remove = function (relationship) {
        if (relationship) {
            this.relationships = this.relationships.filter(function (r) { return !r.relationship.equals(relationship); });
        }
    };
    View.prototype.copyLayoutInformationFrom = function (source) {
        var _this = this;
        if (!this.paperSize) {
            this.paperSize = source.paperSize;
        }
        source.elements.forEach(function (e) {
            var target = _this.elements.find(function (t) { return t.element.equals(e.element); });
            if (target) {
                target.copyLayoutInformationFrom(e);
            }
        });
        source.relationships.forEach(function (r) {
            var target = _this.relationships.find(function (t) { return t.relationship.equals(r.relationship); });
            if (target) {
                target.copyLayoutInformationFrom(r);
            }
        });
    };
    View.prototype.setAutomaticLayout = function (directionOrEnable, rankSeparation, nodeSeparation, edgeSeparation, vertices) {
        if (typeof directionOrEnable === 'boolean') {
            if (directionOrEnable) {
                this.automaticLayout = new automaticLayout_1.AutomaticLayout();
                this.automaticLayout.fromDto({ rankDirection: rankDirection_1.RankDirection.TopBottom, rankSeparation: 300, nodeSeparation: 600, edgeSeparation: 200, vertices: false });
            }
            else {
                this.automaticLayout = undefined;
            }
        }
        else {
            this.automaticLayout = new automaticLayout_1.AutomaticLayout();
            this.automaticLayout.fromDto({ rankDirection: directionOrEnable, rankSeparation: rankSeparation, nodeSeparation: nodeSeparation, edgeSeparation: edgeSeparation, vertices: vertices });
        }
    };
    View.prototype.addElement = function (element, addRelationships) {
        if (element) {
            if (this.elements.some(function (e) { return e.element === element; })) {
                return;
            }
            if (this.model.containsElement(element)) {
                this.elements.push(new elementView_1.ElementView(element));
                if (addRelationships) {
                    this.addRelationships(element);
                }
            }
        }
    };
    View.prototype.removeElement = function (element) {
        if (element) {
            this.elements = this.elements.filter(function (e) { return !e.element.equals(element); });
            this.relationships = this.relationships.filter(function (r) { return !r.relationship.source.equals(element) && !r.relationship.destination.equals(element); });
        }
    };
    View.prototype.addRelationships = function (element) {
        var _this = this;
        var elements = this.elements.map(function (e) { return e.element; });
        element.relationships.forEach(function (r) {
            if (elements.some(function (e) { return e.equals(r.destination); })) {
                _this._addRelationship(r);
            }
        });
        elements.forEach(function (e) {
            e.relationships.forEach(function (r) {
                if (r.destination.equals(element)) {
                    _this._addRelationship(r);
                }
            });
        });
    };
    View.prototype._addRelationship = function (relationship) {
        var view = this.relationships.find(function (r) { return r.relationship.equals(relationship); });
        if (!view) {
            view = new relationshipView_1.RelationshipView(relationship);
            this.relationships.push(view);
        }
        return view;
    };
    return View;
}());
exports.View = View;
