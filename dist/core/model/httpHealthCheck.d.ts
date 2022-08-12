import { IEquatable } from "./iequatable";
export declare class HttpHealthCheck implements IEquatable<HttpHealthCheck> {
    name: string;
    url: string;
    headers: {
        [key: string]: string;
    };
    interval: number;
    timeout: number;
    equals(other: HttpHealthCheck): boolean;
    toDto(): any;
    fromDto(dto: any): void;
}
