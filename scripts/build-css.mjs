import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcDir = path.join(root, 'src');
const outDir = path.join(srcDir, 'generated');

const files = ['tailwind.css', 'typography.css'];

fs.mkdirSync(outDir, { recursive: true });

const plugins = [
  tailwindcss({ config: path.join(root, 'tailwind.config.js') }),
  autoprefixer(),
];
if (process.env.NODE_ENV === 'production') {
  plugins.push(cssnano({ preset: 'default' }));
}

for (const file of files) {
  const inputPath = path.join(srcDir, file);
  const outputPath = path.join(outDir, file);
  const css = fs.readFileSync(inputPath, 'utf8');
  const result = await postcss(plugins).process(css, {
    from: inputPath,
    to: outputPath,
  });
  fs.writeFileSync(outputPath, result.css);
}
