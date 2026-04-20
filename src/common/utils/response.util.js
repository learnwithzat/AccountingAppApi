"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (data, message = 'success') => {
    return {
        success: true,
        message,
        data,
    };
};
exports.successResponse = successResponse;
const errorResponse = (message = 'error') => {
    return {
        success: false,
        message,
    };
};
exports.errorResponse = errorResponse;
//# sourceMappingURL=response.util.js.map