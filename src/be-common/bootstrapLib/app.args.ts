import { parseArgs } from "util";

export const _args = parseArgs({
    args: Bun.argv,
    options: {
        env: {
            type: "string"
        },
        configPath: {
            type: "string"
        }
    },
    strict: true,
    allowPositionals: true
})