"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Documentation = void 0;
var assert = require("assert");
var section_1 = require("./section");
var decision_1 = require("./decision");
var Documentation = /** @class */ (function () {
    function Documentation(model) {
        this.sections = new Set();
        this.decisions = new Set();
        this.model = model;
    }
    Documentation.prototype.addSection = function (element, title, format, content) {
        if (element && !this.model.containsElement(element)) {
            throw new Error("The element named ".concat(element.name, " does not exist in the model associated with this documentation."));
        }
        assert(title, "A title must be specified.");
        assert(content, "Content must be specified.");
        assert(format, "A format must be specified.");
        this.checkSectionIsUnqiue(title, element);
        var section = new section_1.Section();
        section.fromDto({
            elementId: element && element.id,
            title: title,
            order: this.sections.size + 1,
            format: format,
            content: content
        });
        section.element = element;
        this.sections.add(section);
        return section;
    };
    Documentation.prototype.addDecision = function (element, id, date, title, status, format, content) {
        assert(id, "An id must be specifed");
        assert(date, "A date must be specified");
        assert(title, "A title must be specified");
        assert(status, "A status must be specified");
        assert(format, "A format must be specified");
        this.checkDecisionIsUnqiue(id, element);
        var decision = new decision_1.Decision();
        decision.fromDto({ id: id, date: date, title: title, status: status, format: format, content: content, elementId: element && element.id });
        decision.element = element;
        this.decisions.add(decision);
        return decision;
    };
    Documentation.prototype.toDto = function () {
        return {
            sections: Array.from(this.sections.values()).map(function (section) {
                return section.toDto();
            }),
            decisions: Array.from(this.decisions.values()).map(function (decision) {
                return decision.toDto();
            })
        };
    };
    Documentation.prototype.fromDto = function (dto) {
        var _this = this;
        if (dto.sections) {
            dto.sections.forEach(function (sectionDto) {
                var section = new section_1.Section();
                section.fromDto(sectionDto);
                _this.sections.add(section);
            });
        }
        if (dto.decisions) {
            dto.decisions.forEach(function (decisionDto) {
                var decision = new decision_1.Decision();
                decision.fromDto(decisionDto);
                _this.decisions.add(decision);
            });
        }
    };
    Documentation.prototype.hydrate = function () {
        var _this = this;
        this.sections.forEach(function (section) { return _this.findElementAndHydrate(section); });
        this.decisions.forEach(function (decision) {
            return _this.findElementAndHydrate(decision);
        });
    };
    Documentation.prototype.findElementAndHydrate = function (documentationElement) {
        if (documentationElement.elementId) {
            documentationElement.element = this.model.getElement(documentationElement.elementId);
        }
    };
    Documentation.prototype.checkSectionIsUnqiue = function (title, element) {
        if (!element) {
            this.sections.forEach(function (section) {
                if (!section.element && section.title === title) {
                    throw new Error("A section with a title of ".concat(title, " already exists for this workspace."));
                }
            });
        }
        else {
            this.sections.forEach(function (section) {
                if (element.id === section.elementId &&
                    section.title === title) {
                    throw new Error("A section with a title of ".concat(title, " already exists for element named ").concat(element.name, "."));
                }
            });
        }
    };
    Documentation.prototype.checkDecisionIsUnqiue = function (id, element) {
        if (!element) {
            this.decisions.forEach(function (decision) {
                if (!decision.element && decision.id === id) {
                    throw new Error("A decision with an id of ".concat(id, " already exists for this workspace."));
                }
            });
        }
        else {
            this.decisions.forEach(function (decision) {
                if (element.id === decision.elementId && decision.id === id) {
                    throw new Error("A decision with an title of ".concat(id, " already exists for element named ").concat(element.name, "."));
                }
            });
        }
    };
    return Documentation;
}());
exports.Documentation = Documentation;
