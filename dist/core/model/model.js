"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
var relationship_1 = require("./relationship");
var interactionStyle_1 = require("./interactionStyle");
var sequentialIntegerIdGeneratorStrategy_1 = require("./sequentialIntegerIdGeneratorStrategy");
var location_1 = require("./location");
var person_1 = require("./person");
var softwareSystem_1 = require("./softwareSystem");
var container_1 = require("./container");
var deploymentNode_1 = require("./deploymentNode");
var containerInstance_1 = require("./containerInstance");
var component_1 = require("./component");
var isChildOf_1 = require("./isChildOf");
var defaultImpliedRelationshipsStrategy_1 = require("./defaultImpliedRelationshipsStrategy");
var Model = /** @class */ (function () {
    function Model() {
        this.relationships = [];
        this._idGenerator = new sequentialIntegerIdGeneratorStrategy_1.SequentialIntegerIdGeneratorStrategy();
        this.people = [];
        this.softwareSystems = [];
        this.containerInstances = [];
        this.deploymentNodes = [];
        this.impliedRelationshipsStrategy = new defaultImpliedRelationshipsStrategy_1.DefaultImpliedRelationshipsStrategy();
        this._elementsById = {};
    }
    Model.prototype.toDto = function () {
        return {
            people: this.people.map(function (p) { return p.toDto(); }),
            softwareSystems: this.softwareSystems.map(function (s) { return s.toDto(); }),
            deploymentNodes: this.deploymentNodes.map(function (d) { return d.toDto(); })
        };
    };
    Model.prototype.fromDto = function (dto) {
        if (dto.people) {
            this.people = dto.people.map(function (personDto) {
                var p = new person_1.Person();
                p.fromDto(personDto);
                return p;
            });
        }
        if (dto.softwareSystems) {
            this.softwareSystems = dto.softwareSystems.map(function (softwareSystemDto) {
                var s = new softwareSystem_1.SoftwareSystem();
                s.fromDto(softwareSystemDto);
                return s;
            });
        }
        if (dto.deploymentNodes) {
            this.deploymentNodes = dto.deploymentNodes.map(function (deploymentNodeDto) {
                var d = new deploymentNode_1.DeploymentNode();
                d.fromDto(deploymentNodeDto);
                return d;
            });
        }
    };
    Model.prototype.hydrate = function () {
        var _this = this;
        this.people.forEach(function (p) { return _this.addElementToInternalStructures(p); });
        this.softwareSystems.forEach(function (s) {
            _this.addElementToInternalStructures(s);
            s.containers.forEach(function (c) {
                _this.addElementToInternalStructures(c);
                c.components.forEach(function (co) {
                    _this.addElementToInternalStructures(co);
                });
            });
        });
        this.deploymentNodes.forEach(function (n) { return _this.hydrateDeploymentNode(n, null); });
        this.people.forEach(function (p) { return _this.hydrateRelationships(p); });
        this.softwareSystems.forEach(function (s) {
            _this.hydrateRelationships(s);
            s.containers.forEach(function (c) {
                _this.hydrateRelationships(c);
                c.components.forEach(function (co) { return _this.hydrateRelationships(co); });
            });
        });
        this.deploymentNodes.forEach(function (n) { return _this.hydrateDeploymentNodeRelationships(n); });
    };
    Model.prototype.hasRelationshipTargeting = function (target) {
        return this.relationships.some(function (r) { return r.destination.equals(target); });
    };
    Model.prototype.containsElement = function (element) {
        return this.getElement(element.id) == element;
    };
    Model.prototype.addRelationship = function (source, destination, description, technology, interactionStyle, createImpliedRelationships) {
        if (interactionStyle === void 0) { interactionStyle = interactionStyle_1.InteractionStyle.Synchronous; }
        if (createImpliedRelationships === void 0) { createImpliedRelationships = true; }
        var relationship = new relationship_1.Relationship(source, destination, description, technology, interactionStyle);
        if ((0, isChildOf_1.isChildOf)(source, destination) || (0, isChildOf_1.isChildOf)(destination, source)) {
            throw 'Relationships cannot be added between parents and children.';
        }
        if (!source.relationships.has(relationship)) {
            relationship.id = this._idGenerator.generateId(relationship);
            source.relationships.add(relationship);
            this.addRelationshipToInternalStructures(relationship);
            if (createImpliedRelationships) {
                if ((source.type === person_1.Person.type || source.type === softwareSystem_1.SoftwareSystem.type || source.type === container_1.Container.type || source.type === component_1.Component.type) &&
                    (destination.type === person_1.Person.type || destination.type === softwareSystem_1.SoftwareSystem.type || destination.type === container_1.Container.type || destination.type === component_1.Component.type)) {
                    this.impliedRelationshipsStrategy.createImpliedRelationships(relationship);
                }
            }
            return relationship;
        }
        return null;
    };
    Model.prototype.addPerson = function (name, description, location) {
        if (location === void 0) { location = location_1.Location.Unspecified; }
        if (this.getPersonWithName(name)) {
            return null;
        }
        var person = new person_1.Person();
        person.name = name;
        person.description = description;
        person.location = location;
        this.people.push(person);
        person.id = this._idGenerator.generateId(person);
        this.addElementToInternalStructures(person);
        return person;
    };
    Model.prototype.addSoftwareSystem = function (name, description, location) {
        if (location === void 0) { location = location_1.Location.Unspecified; }
        if (this.getSoftwareSystemWithName(name)) {
            return null;
        }
        var softwareSystem = new softwareSystem_1.SoftwareSystem();
        softwareSystem.name = name;
        softwareSystem.description = description;
        softwareSystem.location = location;
        this.softwareSystems.push(softwareSystem);
        softwareSystem.id = this._idGenerator.generateId(softwareSystem);
        this.addElementToInternalStructures(softwareSystem);
        return softwareSystem;
    };
    Model.prototype.addContainer = function (parent, name, description, technology) {
        if (parent.containers.some(function (c) { return c.name == name; })) {
            return null;
        }
        var container = new container_1.Container();
        container.name = name;
        container.description = description;
        container.technology = technology;
        container.parent = parent;
        parent.containers.push(container);
        container.id = this._idGenerator.generateId(container);
        this.addElementToInternalStructures(container);
        return container;
    };
    Model.prototype.addComponent = function (parent, name, description, type, technology) {
        if (parent.components.some(function (c) { return c.name == name; })) {
            return null;
        }
        var component = new component_1.Component();
        component.name = name;
        component.description = description;
        component.technology = technology;
        component.parent = parent;
        if (type) {
            component.primaryType = type;
        }
        parent.components.push(component);
        component.id = this._idGenerator.generateId(component);
        this.addElementToInternalStructures(component);
        return component;
    };
    Model.prototype.addContainerInstance = function (deploymentNode, container) {
        var _this = this;
        var instanceNumber = this.containerInstances.filter(function (i) { return i.container.equals(container); }).length + 1;
        var instance = new containerInstance_1.ContainerInstance();
        instance.container = container;
        instance.containerId = container.id;
        instance.instanceId = instanceNumber;
        instance.environment = deploymentNode.environment;
        instance.id = this._idGenerator.generateId(instance);
        var instancesInSameEnvironment = this.containerInstances.filter(function (f) { return f.environment === deploymentNode.environment; });
        instancesInSameEnvironment.forEach(function (i) {
            var c = i.container;
            container.relationships.forEach(function (r) {
                if (r.destination.equals(c)) {
                    var newRelation = _this.addRelationship(instance, i, r.description, r.technology, r.interactionStlye);
                    if (newRelation) {
                        newRelation.tags.clear();
                        newRelation.linkedRelationshipId = r.id;
                    }
                }
            });
            c.relationships.forEach(function (r) {
                if (r.destination.equals(container)) {
                    var newRelation = _this.addRelationship(i, instance, r.description, r.technology, r.interactionStlye);
                    if (newRelation) {
                        newRelation.tags.clear();
                        newRelation.linkedRelationshipId = r.id;
                    }
                }
            });
        });
        this.addElementToInternalStructures(instance);
        this.containerInstances.push(instance);
        return instance;
    };
    Model.prototype.addDeploymentNode = function (name, description, technology, parent, environment, instances) {
        if (parent === void 0) { parent = null; }
        if (environment === void 0) { environment = "Default"; }
        if (instances === void 0) { instances = 1; }
        var nodes = parent ? parent.children : this.deploymentNodes;
        if (nodes.some(function (c) { return c.name == name && c.environment == environment; })) {
            return null;
        }
        var node = new deploymentNode_1.DeploymentNode();
        node.name = name;
        node.description = description;
        node.technology = technology;
        node.environment = environment;
        node.instances = instances;
        node.parent = parent;
        if (!parent) {
            this.deploymentNodes.push(node);
        }
        node.id = this._idGenerator.generateId(node);
        this.addElementToInternalStructures(node);
        return node;
    };
    Model.prototype.getElement = function (id) {
        return this._elementsById[id];
    };
    Model.prototype.getRelationship = function (id) {
        return this.relationships.find(function (r) { return r.id == id; });
    };
    Model.prototype.addRelationshipToInternalStructures = function (relationship) {
        this.relationships.push(relationship);
        this._idGenerator.found(relationship.id);
    };
    Model.prototype.addElementToInternalStructures = function (element) {
        this._elementsById[element.id] = element;
        element.model = this;
        this._idGenerator.found(element.id);
    };
    Model.prototype.hydrateRelationships = function (element) {
        var _this = this;
        element.relationships.forEach(function (r) {
            r.source = _this.getElement(r.sourceId);
            r.destination = _this.getElement(r.destinationId);
            _this.addRelationshipToInternalStructures(r);
        });
    };
    Model.prototype.hydrateDeploymentNode = function (deploymentNode, parent) {
        var _this = this;
        deploymentNode.parent = parent;
        this.addElementToInternalStructures(deploymentNode);
        deploymentNode.children.forEach(function (child) { return _this.hydrateDeploymentNode(child, deploymentNode); });
        deploymentNode.containerInstances.forEach(function (containerInstance) {
            containerInstance.container = _this._elementsById[containerInstance.containerId];
            _this.addElementToInternalStructures(containerInstance);
        });
    };
    Model.prototype.hydrateDeploymentNodeRelationships = function (deploymentNode) {
        var _this = this;
        this.hydrateRelationships(deploymentNode);
        deploymentNode.children.forEach(function (child) { return _this.hydrateDeploymentNodeRelationships(child); });
        deploymentNode.containerInstances.forEach(function (c) { return _this.hydrateRelationships(c); });
    };
    Model.prototype.getPersonWithName = function (name) {
        for (var i = 0; i < this.people.length; i++) {
            if (this.people[i].name == name) {
                return this.people[i];
            }
        }
        return null;
    };
    Model.prototype.getSoftwareSystemWithName = function (name) {
        for (var i = 0; i < this.softwareSystems.length; i++) {
            if (this.softwareSystems[i].name == name) {
                return this.softwareSystems[i];
            }
        }
        return null;
    };
    return Model;
}());
exports.Model = Model;
