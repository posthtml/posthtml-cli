import path from 'path';

export default (input, output, root, allInOutput) => new Promise(resolve => {
  if (output && path.extname(output)) {
    return resolve(output);
  }

  if (output) {
    const inputPath = allInOutput ? path.relative(root, input) : path.basename(input);
    return resolve(path.join(output, inputPath));
  }

  resolve(input);
});
