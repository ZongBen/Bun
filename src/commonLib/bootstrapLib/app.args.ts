import { parseArgs } from "util";

export const _args = parseArgs({
    args: Bun.argv,
    options: {
    },
    strict: true,
    allowPositionals: true
})