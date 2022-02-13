"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFlagEnabled = exports.onlyHasFields = void 0;
function onlyHasFields(obj, fields) {
    return Object.keys(obj).every((key) => fields.includes(key));
}
exports.onlyHasFields = onlyHasFields;
function isFlagEnabled(Flags, checkFlag) {
    return (checkFlag & Flags) === checkFlag;
}
exports.isFlagEnabled = isFlagEnabled;
//# sourceMappingURL=index.js.map