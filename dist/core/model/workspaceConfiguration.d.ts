import { Role } from "./role";
export declare class WorkspaceConfiguration {
    private users;
    addUser(username: string, role: Role): void;
    toDto(): any;
    fromDto(dto: any): void;
}
