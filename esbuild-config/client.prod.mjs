import * as esbuild from "esbuild";
import postcss from "esbuild-postcss";

try {
  await esbuild.build({
    entryPoints: ["src/client/index.tsx"],
    bundle: true,
    sourcemap: false,
    minify: true,
    outfile: "public/static/bundle.js",
    plugins: [postcss()],
    define: {
      "process.env.NODE_ENV": "'production'"
    }
  });

  console.log("Client bundled successfully for production!");
} catch (error) {
  console.error("ERROR OCCURRED:", error);
  process.exit(1);
}
