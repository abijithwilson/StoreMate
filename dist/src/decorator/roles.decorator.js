"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = void 0;
const common_1 = require("@nestjs/common");
const Roles = (...userRoles) => (0, common_1.SetMetadata)('roles', userRoles);
exports.Roles = Roles;
//# sourceMappingURL=roles.decorator.js.map