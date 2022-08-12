import { RankDirection } from "./rankDirection";
export declare class AutomaticLayout {
    rankDirection?: RankDirection;
    rankSeparation?: number;
    nodeSeparation?: number;
    edgeSeparation?: number;
    vertices?: boolean;
    toDto(): {
        rankDirection: RankDirection | undefined;
        rankSeparation: number | undefined;
        nodeSeparation: number | undefined;
        edgeSeparation: number | undefined;
        vertices: boolean | undefined;
    };
    fromDto(dto: any): void;
}
