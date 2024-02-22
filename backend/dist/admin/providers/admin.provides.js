"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminProviders = void 0;
const admin_schema_1 = require("../schema/admin.schema");
exports.adminProviders = [
    {
        provide: 'ADMIN_MODEL',
        useFactory: (connection) => connection.model('Cat', admin_schema_1.adminSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=admin.provides.js.map