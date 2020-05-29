import path from 'path';

export default (input, output, root) => new Promise(resolve => {
  if (output && path.extname(output)) {
    return resolve(output);
  }

  if (output) {
    const rootPath = root ? path.resolve(input).replace(path.resolve(root), '') : path.basename(input);
    return resolve(path.join(output, rootPath));
  }

  resolve(input);
});
