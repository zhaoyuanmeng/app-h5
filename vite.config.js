import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import styleImport, { VantResolve } from "vite-plugin-style-import";
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => `../es/${name}/style`,
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  build: {
    // 取消计算文件大小，加快打包速度
    reportCompressedSize: false,
    sourcemap: true,
    // assetsDir: 'static/img',
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js",
        entryFileNames: "js/[name]-[hash].js",
        assetFileNames: "[ext]/[name]-[hash].[ext]",
      },
    },
  },
  server: {
    base: "./",
    host: "0.0.0.0",
    proxy: {
      "^/api": {
        // target: 'http://video.zpkang.top:8080/', //老蒋的地址
        // target: "http://127.0.0.1:4523/mock/930299/", //api/fox地址
        target: "http://video.zpkang.top:8080/", //api/fox地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
