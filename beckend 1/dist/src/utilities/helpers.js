"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapImage = void 0;
const mapImage = (file) => {
    return {
        originalname: file.originalname,
        size: file.size,
        filename: file.filename,
        destination: file.destination,
    };
};
exports.mapImage = mapImage;
//# sourceMappingURL=helpers.js.map