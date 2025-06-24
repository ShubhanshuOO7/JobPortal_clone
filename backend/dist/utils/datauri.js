"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = __importDefault(require("datauri/parser"));
const path_1 = __importDefault(require("path"));
const getDataUri = (file) => {
    const parser = new parser_1.default();
    const extName = path_1.default.extname(file === null || file === void 0 ? void 0 : file.originalname).toString(); // heplp to get extension of the filename like .jpg etc.
    return parser.format(extName, file.buffer);
};
exports.default = getDataUri;
