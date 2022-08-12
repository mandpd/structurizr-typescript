import { IEquatable } from "./iequatable";
import { Role } from "./role";
export declare class User implements IEquatable<User> {
    username: string;
    role: Role;
    equals(other: User): boolean;
    toDto(): any;
    fromDto(dto: any): void;
}
