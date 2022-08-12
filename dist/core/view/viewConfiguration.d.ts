import { Styles } from "./styles";
import { Terminology } from "./terminology";
import { Branding } from "./branding";
export declare class ViewConfiguration {
    styles: Styles;
    theme?: string;
    terminology: Terminology;
    branding: Branding;
    toDto(): any;
    fromDto(dto: any): void;
}
