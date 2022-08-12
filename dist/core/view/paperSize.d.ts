export declare enum Orientation {
    Portrait = "Portrait",
    Landscape = "Landscape"
}
export declare class PaperSize {
    key: string;
    name: string;
    orientation: Orientation;
    width: number;
    height: number;
    private static paperSizes;
    static readonly A6_Portrait: PaperSize;
    static readonly A6_Landscape: PaperSize;
    static readonly A5_Portrait: PaperSize;
    static readonly A5_Landscape: PaperSize;
    static readonly A4_Portrait: PaperSize;
    static readonly A4_Landscape: PaperSize;
    static readonly A3_Portrait: PaperSize;
    static readonly A3_Landscape: PaperSize;
    static readonly A2_Portrait: PaperSize;
    static readonly A2_Landscape: PaperSize;
    static readonly A1_Portrait: PaperSize;
    static readonly A1_Landscape: PaperSize;
    static readonly A0_Portrait: PaperSize;
    static readonly A0_Landscape: PaperSize;
    static readonly Letter_Portrait: PaperSize;
    static readonly Letter_Landscape: PaperSize;
    static readonly Legal_Portrait: PaperSize;
    static readonly Legal_Landscape: PaperSize;
    static readonly Slide_4_3: PaperSize;
    static readonly Slide_16_9: PaperSize;
    private constructor();
    static getPaperSize(key: string): PaperSize;
}
