import * as esbuild from "esbuild";

let context;

try {
  context = await esbuild.context({
    entryPoints: ["src/server/server.ts"],
    bundle: true,
    sourcemap: true,
    minify: false,
    platform: "node",
    target: ["node18.19"],
    packages: "external",
    outfile: "dist/server.js",
    define: {
      "process.env.NODE_ENV": "'development'"
    }
  });

  await context.watch();
  console.log("Server bundled and watching...");
} catch (error) {
  console.error("ERROR OCCURRED:", error);
  process.exit(1);
}
