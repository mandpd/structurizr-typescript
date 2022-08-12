"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaperSize = exports.Orientation = void 0;
var Orientation;
(function (Orientation) {
    Orientation["Portrait"] = "Portrait";
    Orientation["Landscape"] = "Landscape";
})(Orientation = exports.Orientation || (exports.Orientation = {}));
var PaperSize = /** @class */ (function () {
    function PaperSize(key, name, orientation, width, height) {
        this.key = key;
        this.name = name;
        this.orientation = orientation;
        this.width = width;
        this.height = height;
        PaperSize.paperSizes[key] = this;
    }
    PaperSize.getPaperSize = function (key) {
        return this.paperSizes[key] || this.A4_Portrait;
    };
    PaperSize.paperSizes = {};
    PaperSize.A6_Portrait = new PaperSize("A6_Portrait", "A6", Orientation.Portrait, 1240, 1748);
    PaperSize.A6_Landscape = new PaperSize("A6_Landscape", "A6", Orientation.Landscape, 1748, 1240);
    PaperSize.A5_Portrait = new PaperSize("A5_Portrait", "A5", Orientation.Portrait, 1748, 2480);
    PaperSize.A5_Landscape = new PaperSize("A5_Landscape", "A5", Orientation.Landscape, 2480, 1748);
    PaperSize.A4_Portrait = new PaperSize("A4_Portrait", "A4", Orientation.Portrait, 2480, 3508);
    PaperSize.A4_Landscape = new PaperSize("A4_Landscape", "A4", Orientation.Landscape, 3508, 2480);
    PaperSize.A3_Portrait = new PaperSize("A3_Portrait", "A3", Orientation.Portrait, 3508, 4961);
    PaperSize.A3_Landscape = new PaperSize("A3_Landscape", "A3", Orientation.Landscape, 4961, 3508);
    PaperSize.A2_Portrait = new PaperSize("A2_Portrait", "A2", Orientation.Portrait, 4961, 7016);
    PaperSize.A2_Landscape = new PaperSize("A2_Landscape", "A2", Orientation.Landscape, 7016, 4961);
    PaperSize.A1_Portrait = new PaperSize("A1_Portrait", "A1", Orientation.Portrait, 7016, 9933);
    PaperSize.A1_Landscape = new PaperSize("A1_Landscape", "A1", Orientation.Landscape, 9933, 7016);
    PaperSize.A0_Portrait = new PaperSize("A0_Portrait", "A0", Orientation.Portrait, 9933, 14043);
    PaperSize.A0_Landscape = new PaperSize("A0_Landscape", "A0", Orientation.Landscape, 14043, 9933);
    PaperSize.Letter_Portrait = new PaperSize("Letter_Portrait", "Letter", Orientation.Portrait, 2550, 3300);
    PaperSize.Letter_Landscape = new PaperSize("Letter_Landscape", "Letter", Orientation.Landscape, 3300, 2550);
    PaperSize.Legal_Portrait = new PaperSize("Legal_Portrait", "Legal", Orientation.Portrait, 2550, 4200);
    PaperSize.Legal_Landscape = new PaperSize("Legal_Landscape", "Legal", Orientation.Landscape, 4200, 2550);
    PaperSize.Slide_4_3 = new PaperSize("Slide_4_3", "Slide 4:3", Orientation.Landscape, 3306, 2480);
    PaperSize.Slide_16_9 = new PaperSize("Slide_16_9", "Slide 16:9", Orientation.Landscape, 3508, 1973);
    return PaperSize;
}());
exports.PaperSize = PaperSize;
