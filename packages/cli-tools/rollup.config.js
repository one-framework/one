import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
  ],
  output: [
    {
      file: 'lib/one-cli-tools.js',
      format: 'cjs',
    },
  ],
};