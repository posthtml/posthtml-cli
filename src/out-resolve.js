import path from 'path';

export default (input, {output, root, allInOutput} = {}) => new Promise(resolve => {
  if (output && path.extname(output)) {
    return resolve(output);
  }

  if (output) {
    let inputPath = path.basename(input);

    if (allInOutput) {
      inputPath = path.relative(root, input);
    }

    return resolve(path.join(output, inputPath));
  }

  return resolve(input);
});
