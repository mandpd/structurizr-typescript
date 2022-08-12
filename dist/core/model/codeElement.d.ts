import { IEquatable } from "./iequatable";
export declare enum CodeElementRole {
    Primary = "Primary",
    Supporting = "Supporting"
}
export declare class CodeElement implements IEquatable<CodeElement> {
    role: CodeElementRole;
    name?: string;
    type?: string;
    description?: string;
    url?: string;
    language?: string;
    category?: string;
    visibility?: string;
    size: number;
    toDto(): any;
    fromDto(dto: any): CodeElement;
    equals(other: CodeElement): boolean;
}
