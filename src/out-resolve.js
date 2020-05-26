import path from 'path';

export default (input, output, base) => new Promise(resolve => {
  if (output && path.extname(output)) {
    return resolve(output);
  }

  if (output) {
    const basePath = base ? path.resolve(input).replace(path.resolve(base), '') : path.basename(input);
    return resolve(path.join(output, basePath));
  }

  resolve(input);
});
