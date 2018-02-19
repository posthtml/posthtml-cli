import path from 'path';

export default (input, output) => {
    if (output && path.extname(output)) {
        return output;
    }

    if (output) {
        return path.join(output, input);
    }

    return input;
};
