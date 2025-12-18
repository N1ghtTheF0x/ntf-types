import { defineConfig } from "tsup"
import Metadata from "./package.json"

export default defineConfig({
    entry: ["./source/index.ts"],
    clean: true,
    dts: true,
    format: ["cjs","esm"],
    target: "esnext",
    platform: "neutral",
    define: {
        PKG_NAME: JSON.stringify(Metadata.name),
        PKG_VERSION: JSON.stringify(Metadata.version)
    }
})