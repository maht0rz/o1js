import esbuild from 'esbuild';
import fse, { move } from 'fs-extra';
import glob from 'glob';
import { readFile, rename } from 'node:fs/promises';
import path from 'node:path';

const outputPath = 'dist/web/index.js';
const temporaryOutputPath = 'dist/web/index.bundle.js';

await fse.copy('src/bindings.web.js', 'dist/web/bindings.js', {
  overwrite: true,
});
await fse.copy('src/bindings.d.ts', 'dist/web/bindings.d.ts', {
  overwrite: true,
});
await fse.copy('src/bindings/js/web', 'dist/web/bindings/js/web', {
  overwrite: true,
});

const webFiles = glob.sync('dist/web/**/*.web.js');
await Promise.all(
  webFiles.map((file) => move(file, file.replace('.web.js', '.js'), { overwrite: true })),
);

await esbuild.build({
  entryPoints: [outputPath],
  bundle: true,
  format: 'esm',
  outfile: temporaryOutputPath,
  resolveExtensions: ['.js', '.ts'],
  plugins: [srcStringPlugin()],
  dropLabels: ['CJS'],
  external: ['*.bc.js'],
  target: 'es2022',
  allowOverwrite: true,
  logLevel: 'error',
  minify: true,
  sourcemap: true,
});

await rename(temporaryOutputPath, outputPath);

function srcStringPlugin() {
  return {
    name: 'src-string-plugin',
    setup(build) {
      build.onResolve(
        { filter: /^string:/ },
        async ({ path: importPath, resolveDir }) => ({
          path: path.resolve(resolveDir, importPath.replace('string:', '')),
          namespace: 'src-string',
        }),
      );

      build.onLoad(
        { filter: /.*/, namespace: 'src-string' },
        async ({ path: sourcePath }) => ({
          contents: await readFile(sourcePath, 'utf8'),
          loader: 'text',
        }),
      );
    },
  };
}
