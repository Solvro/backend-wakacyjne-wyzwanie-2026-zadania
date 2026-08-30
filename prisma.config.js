"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("prisma/config");
exports.default = (0, config_1.defineConfig)({
    migrations: {
        seed: "npx tsx prisma/seed.ts",
    },
    datasource: {
        url: "postgresql://postgres:28302007@localhost:5432/trip?schema=public",
    },
});
