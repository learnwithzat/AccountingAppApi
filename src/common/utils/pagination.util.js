"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    return {
        skip: (page - 1) * limit,
        take: limit,
    };
};
exports.getPagination = getPagination;
//# sourceMappingURL=pagination.util.js.map