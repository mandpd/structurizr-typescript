import { Routing } from "./relationshipView";
export declare enum Shape {
    Box = "Box",
    RoundedBox = "RoundedBox",
    Circle = "Circle",
    Ellipse = "Ellipse",
    Hexagon = "Hexagon",
    Cylinder = "Cylinder",
    Pipe = "Pipe",
    Person = "Person",
    Robot = "Robot",
    Folder = "Folder",
    WebBrowser = "WebBrowser",
    MobileDevicePortrait = "MobileDevicePortrait",
    MobileDeviceLandscape = "MobileDeviceLandscape"
}
export declare enum Border {
    Solid = "Solid",
    Dashed = "Dashed"
}
export interface IRelationshipStyle {
    thickness?: number;
    color?: string;
    fontSize?: number;
    width?: number;
    dashed?: boolean;
    routing?: Routing;
    opacity?: number;
    position?: number;
}
export declare class RelationshipStyle implements IRelationshipStyle {
    tag: string;
    thickness?: number;
    color?: string;
    fontSize?: number;
    width?: number;
    dashed?: boolean;
    routing?: Routing;
    opacity?: number;
    position?: number;
    constructor(tag: string);
    toDto(): any;
    fromDto(dto: any): RelationshipStyle;
}
export interface IElementStyle {
    width?: number;
    height?: number;
    background?: string;
    color?: string;
    stroke?: string;
    fontSize?: number;
    shape?: Shape;
    icon?: string;
    border?: Border;
    opacity?: number;
    metadata?: boolean;
    description?: boolean;
}
export declare class ElementStyle implements IElementStyle {
    tag: string;
    width?: number;
    height?: number;
    background?: string;
    color?: string;
    stroke?: string;
    fontSize?: number;
    shape?: Shape;
    icon?: string;
    border?: Border;
    opacity?: number;
    metadata?: boolean;
    description?: boolean;
    constructor(tag: string);
    toDto(): any;
    fromDto(dto: any): ElementStyle;
}
export interface ITheme {
    relationships: IRelationshipStyle[];
    elements: IElementStyle[];
}
export declare class Styles {
    private relationships;
    private elements;
    addRelationshipStyle(style: RelationshipStyle): void;
    addElementStyle(style: ElementStyle): void;
    toDto(): any;
    fromDto(dto: any): void;
    toTheme(): ITheme;
}
