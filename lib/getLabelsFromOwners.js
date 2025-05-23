"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLabelsFromOwners = getLabelsFromOwners;
const randomcolor_1 = __importDefault(require("randomcolor"));
function getLabelsFromOwners(owners, label_map) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const labels = new Set([]);
        for (const owner of owners) {
            const label = (_a = label_map === null || label_map === void 0 ? void 0 : label_map.get(owner)) !== null && _a !== void 0 ? _a : owner;
            labels.add({
                name: `${label}`,
                // From the documentation: https://octokit.github.io/rest.js/#octokit-routes-issues-create-label
                // > The hexadecimal color code for the label, without the leading #
                // randomcolor() returns a color code with a '#' prefix, so we remove it
                color: (0, randomcolor_1.default)().substr(1)
            });
        }
        return labels;
    });
}
