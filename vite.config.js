import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    optimizeDeps: {
        include: ['styled-components'],
    },
    resolve: {
        alias: {
            '@mui/styled-engine': '@mui/styled-engine-sc',
        },
    },
    root: "src",
    test: {
        environment: "happy-dom",
        setupFiles: [
            "./setupVitest.js"
        ]
    }
});
