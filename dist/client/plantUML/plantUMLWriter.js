"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantUMLWriter = void 0;
var core_1 = require("../../core");
var deploymentNode_1 = require("../../core/model/deploymentNode");
var containerInstance_1 = require("../../core/model/containerInstance");
var StringWriter = /** @class */ (function () {
    function StringWriter() {
        this.value = "";
    }
    StringWriter.prototype.write = function (content) {
        this.value += content;
    };
    StringWriter.prototype.writeLine = function (content) {
        this.write(content);
        this.newline();
    };
    StringWriter.prototype.newline = function () {
        this.write("\r\n");
    };
    StringWriter.prototype.toString = function () {
        return this.value;
    };
    return StringWriter;
}());
var PlantUMLWriter = /** @class */ (function () {
    function PlantUMLWriter() {
    }
    PlantUMLWriter.prototype.toPlantUML = function (workspace) {
        var _this = this;
        var result = new StringWriter();
        if (workspace) {
            workspace.views.systemContextViews.forEach(function (v) {
                _this.writeSystemContextView(v, result);
            });
            workspace.views.containerViews.forEach(function (v) {
                _this.writeContainerView(v, result);
            });
            workspace.views.componentViews.forEach(function (v) {
                _this.writeComponentView(v, result);
            });
            workspace.views.deploymentViews.forEach(function (v) {
                _this.writeDeploymentView(v, result);
            });
        }
        return result.toString();
    };
    PlantUMLWriter.prototype.writeSystemContextView = function (v, writer) {
        var _this = this;
        this.writeHeader(v, writer);
        v.elements
            .map(function (e) { return e.element; })
            .sort(this.by(function (e) { return e.name; }))
            .forEach(function (e) { return _this.writeElement(e, writer, false); });
        this.writeRelationships(v.relationships, writer);
        this.writeFooter(writer);
    };
    PlantUMLWriter.prototype.writeContainerView = function (v, writer) {
        this.writeStaticView(v, core_1.Container.type, v.softwareSystem, writer);
    };
    PlantUMLWriter.prototype.writeComponentView = function (v, writer) {
        this.writeStaticView(v, core_1.Component.type, v.container, writer);
    };
    PlantUMLWriter.prototype.writeStaticView = function (v, type, element, writer) {
        var _this = this;
        this.writeHeader(v, writer);
        v.elements
            .map(function (e) { return e.element; })
            .filter(function (e) { return e.type !== type; })
            .sort(this.by(function (e) { return e.name; }))
            .forEach(function (e) { return _this.writeElement(e, writer, false); });
        writer.writeLine("package " + this.nameOf(element.name) + " {");
        v.elements
            .map(function (e) { return e.element; })
            .filter(function (e) { return e.type === type; })
            .sort(this.by(function (e) { return e.name; }))
            .forEach(function (e) { return _this.writeElement(e, writer, true); });
        writer.writeLine("}");
        this.writeRelationships(v.relationships, writer);
        this.writeFooter(writer);
    };
    PlantUMLWriter.prototype.writeDeploymentView = function (v, writer) {
        var _this = this;
        this.writeHeader(v, writer);
        v.elements
            .filter(function (e) { return e.element.type === deploymentNode_1.DeploymentNode.type && !e.element.parent; })
            .map(function (e) { return e.element; })
            .sort(this.by(function (e) { return e.name; }))
            .forEach(function (e) { return _this.writeDeploymentNode(e, writer, 0); });
        this.writeRelationships(v.relationships, writer);
        this.writeFooter(writer);
    };
    PlantUMLWriter.prototype.writeDeploymentNode = function (e, writer, indent) {
        var _this = this;
        writer.writeLine("".concat("  ".repeat(indent), "node \"").concat(e.name + (e.instances > 1 ? " (x" + e.instances + ")" : ""), "\" <<").concat(this.typeOf(e), ">> as ").concat(e.id, " {"));
        e.children.forEach(function (d) { return _this.writeDeploymentNode(d, writer, indent + 1); });
        e.containerInstances.forEach(function (i) { return _this.writeContainerInstance(i, writer, indent + 1); });
        writer.writeLine("  ".repeat(indent) + "}");
    };
    PlantUMLWriter.prototype.writeContainerInstance = function (i, writer, indent) {
        writer.writeLine("".concat("  ".repeat(indent), "artifact \"").concat(i.container.name, "\" <<").concat(this.typeOf(i), ">> as ").concat(i.id));
    };
    PlantUMLWriter.prototype.writeElement = function (e, writer, indent) {
        writer.writeLine("".concat((indent ? "  " : "")).concat((e.type === core_1.Person.type ? "actor" : "component"), " \"").concat(e.name, "\" <<").concat(this.typeOf(e), ">> as ").concat(e.id));
    };
    PlantUMLWriter.prototype.writeRelationships = function (relationships, writer) {
        var _this = this;
        relationships.map(function (r) { return r.relationship; })
            .sort(this.by(function (r) { return r.source.name + r.destination.name; }))
            .forEach(function (r) { return _this.writeRelationship(r, writer); });
    };
    PlantUMLWriter.prototype.writeRelationship = function (r, writer) {
        writer.writeLine("".concat(r.source.id, " ..> ").concat(r.destination.id, " ").concat((r.description && r.description.length ? ": " + r.description : "")).concat((r.technology && r.technology.length ? " <<" + r.technology + ">>" : "")));
    };
    PlantUMLWriter.prototype.writeHeader = function (v, writer) {
        writer.write("@startuml");
        writer.newline();
        writer.write("title " + v.name);
        writer.newline();
        if (v.description) {
            writer.write("caption " + v.description);
            writer.newline();
        }
    };
    PlantUMLWriter.prototype.by = function (value) {
        return function (a, b) {
            var va = value(a);
            var vb = value(b);
            return va > vb ? 1 : va < vb ? -1 : 0;
        };
    };
    PlantUMLWriter.prototype.typeOf = function (e) {
        if (e.type === core_1.Person.type) {
            return "Person";
        }
        if (e.type === core_1.SoftwareSystem.type) {
            return "Software System";
        }
        if (e.type === core_1.Container.type) {
            return "Container";
        }
        if (e.type === deploymentNode_1.DeploymentNode.type) {
            var deploymentNode = e;
            return deploymentNode.technology && deploymentNode.technology.length ? deploymentNode.technology : "Deployment Node";
        }
        if (e.type === containerInstance_1.ContainerInstance.type) {
            return "Container";
        }
        return "";
    };
    PlantUMLWriter.prototype.nameOf = function (s) {
        return s ? "\"".concat(s, "\"") : "";
    };
    PlantUMLWriter.prototype.writeFooter = function (writer) {
        writer.write("@enduml");
        writer.newline();
        writer.newline();
    };
    return PlantUMLWriter;
}());
exports.PlantUMLWriter = PlantUMLWriter;
