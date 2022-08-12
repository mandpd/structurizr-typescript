"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewSet = void 0;
var systemContextView_1 = require("./systemContextView");
var containerView_1 = require("./containerView");
var deploymentView_1 = require("./deploymentView");
var viewConfiguration_1 = require("./viewConfiguration");
var componentView_1 = require("./componentView");
var filteredView_1 = require("./filteredView");
var ViewSet = /** @class */ (function () {
    function ViewSet(model) {
        this.model = model;
        this.systemContextViews = [];
        this.containerViews = [];
        this.componentViews = [];
        this.deploymentViews = [];
        this.filteredViews = [];
        this.configuration = new viewConfiguration_1.ViewConfiguration();
    }
    ViewSet.prototype.createSystemContextView = function (softwareSystem, key, description) {
        this.assertThatTheViewKeyIsUnique(key);
        var view = new systemContextView_1.SystemContextView(softwareSystem, key, description);
        this.systemContextViews.push(view);
        return view;
    };
    ViewSet.prototype.createContainerView = function (softwareSystem, key, description) {
        this.assertThatTheViewKeyIsUnique(key);
        var view = new containerView_1.ContainerView(softwareSystem, key, description);
        this.containerViews.push(view);
        return view;
    };
    ViewSet.prototype.createComponentView = function (container, key, description) {
        this.assertThatTheViewKeyIsUnique(key);
        var view = new componentView_1.ComponentView(container, key, description);
        this.componentViews.push(view);
        return view;
    };
    ViewSet.prototype.createDeploymentView = function (key, description, softwareSystem) {
        this.assertThatTheViewKeyIsUnique(key);
        var view = new deploymentView_1.DeploymentView(softwareSystem, key, description);
        view.model = this.model;
        this.deploymentViews.push(view);
        return view;
    };
    ViewSet.prototype.createFilteredView = function (view, key, description, mode) {
        var tags = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            tags[_i - 4] = arguments[_i];
        }
        this.assertThatTheViewKeyIsUnique(key);
        var filteredView = new (filteredView_1.FilteredView.bind.apply(filteredView_1.FilteredView, __spreadArray([void 0, view, key, description, mode], tags, false)))();
        this.filteredViews.push(filteredView);
        return filteredView;
    };
    ViewSet.prototype.toDto = function () {
        return {
            systemLandscapeViews: [],
            systemContextViews: this.systemContextViews.map(function (v) { return v.toDto(); }),
            containerViews: this.containerViews.map(function (v) { return v.toDto(); }),
            componentViews: this.componentViews.map(function (v) { return v.toDto(); }),
            dynamicViews: [],
            deploymentViews: this.deploymentViews.map(function (v) { return v.toDto(); }),
            filteredViews: this.filteredViews.map(function (v) { return v.toDto(); }),
            configuration: this.configuration.toDto()
        };
    };
    ViewSet.prototype.fromDto = function (dto) {
        this.systemContextViews = this.viewsFromDto(dto.systemContextViews, function () { return new systemContextView_1.SystemContextView(); });
        this.containerViews = this.viewsFromDto(dto.containerViews, function () { return new containerView_1.ContainerView(); });
        this.componentViews = this.viewsFromDto(dto.componentViews, function () { return new componentView_1.ComponentView(); });
        this.deploymentViews = this.viewsFromDto(dto.deploymentViews, function () { return new deploymentView_1.DeploymentView(); });
        this.filteredViews = this.viewsFromDto(dto.filteredViews, function () { return new filteredView_1.FilteredView(); });
        if (dto.configuration) {
            this.configuration.fromDto(dto.configuration);
        }
    };
    ViewSet.prototype.hydrate = function () {
        var _this = this;
        this.systemContextViews.forEach(function (v) {
            v.softwareSystem = _this.model.softwareSystems.find(function (s) { return s.id === v.softwareSystemId; });
            _this.hydrateView(v);
        });
        this.containerViews.forEach(function (v) {
            v.softwareSystem = _this.model.softwareSystems.find(function (s) { return s.id === v.softwareSystemId; });
            _this.hydrateView(v);
        });
        this.componentViews.forEach(function (v) {
            v.container = _this.model.getElement(v.containerId);
            v.softwareSystem = v.container.softwareSystem;
            _this.hydrateView(v);
        });
        this.deploymentViews.forEach(function (v) {
            if (v.softwareSystemId) {
                v.softwareSystem = _this.model.softwareSystems.find(function (s) { return s.id == v.softwareSystemId; });
            }
            v.model = _this.model;
            _this.hydrateView(v);
        });
        this.filteredViews.forEach(function (v) {
            v.baseView = _this.getViewWithKey(v.baseViewKey);
        });
    };
    ViewSet.prototype.copyLayoutInformationFrom = function (source) {
        this.systemContextViews.forEach(function (v) {
            var s = ViewSet.findView(v.key, source.systemContextViews);
            if (s) {
                v.copyLayoutInformationFrom(s);
            }
        });
        this.containerViews.forEach(function (v) {
            var s = ViewSet.findView(v.key, source.containerViews);
            if (s) {
                v.copyLayoutInformationFrom(s);
            }
        });
        this.deploymentViews.forEach(function (v) {
            var s = ViewSet.findView(v.key, source.deploymentViews);
            if (s) {
                v.copyLayoutInformationFrom(s);
            }
        });
    };
    ViewSet.prototype.getViewWithKey = function (key) {
        if (!key) {
            throw "A key must be specified.";
        }
        return this.systemContextViews.find(function (v) { return v.key == key; })
            || this.containerViews.find(function (v) { return v.key == key; })
            || this.componentViews.find(function (v) { return v.key == key; })
            || this.deploymentViews.find(function (v) { return v.key == key; });
    };
    ViewSet.prototype.assertThatTheViewKeyIsUnique = function (key) {
        if (this.getViewWithKey(key) || this.filteredViews.some(function (v) { return v.key == key; })) {
            throw "A view with the key " + key + " already exists.";
        }
    };
    ViewSet.findView = function (key, views) {
        return views.find(function (v) { return v.key == key; });
    };
    ViewSet.prototype.hydrateView = function (view) {
        var _this = this;
        view.elements.forEach(function (e) {
            e.element = _this.model.getElement(e.id);
        });
        view.relationships.forEach(function (r) {
            r.relationship = _this.model.getRelationship(r.id);
        });
    };
    ViewSet.prototype.viewsFromDto = function (viewDtos, ctor) {
        if (!viewDtos) {
            return [];
        }
        return viewDtos.map(function (viewDto) {
            var view = ctor();
            view.fromDto(viewDto);
            return view;
        });
    };
    return ViewSet;
}());
exports.ViewSet = ViewSet;
