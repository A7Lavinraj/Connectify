import * as esbuild from "esbuild";
import postcss from "esbuild-postcss";

let context;

try {
  context = await esbuild.context({
    entryPoints: ["src/client/index.tsx"],
    bundle: true,
    minify: false,
    sourcemap: true,
    outfile: "public/static/bundle.js",
    plugins: [postcss()],
    define: {
      "process.env.NODE_ENV": "'development'"
    }
  });

  await context.watch();
  console.log("Client bundled and watching...");

  const { host, port } = await context.serve({
    servedir: "public",
    fallback: "public/index.html"
  });
  console.log(`Hot reload at http://${host}:${port}`);
} catch (error) {
  console.error("ERROR OCCURRED:", error);
  process.exit(1);
}
