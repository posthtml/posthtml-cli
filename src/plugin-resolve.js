import path from 'path';

const pluginExist = (pluginPath) => {
  try {
    require(pluginPath);
    return true;
  } catch {}

  return false;
}

export default (pluginName, root = './') => {
  if (pluginExist(pluginName)) {
    return pluginName;
  }

  const pluginResolvePath = path.resolve(path.join(root, pluginName));
  if (pluginExist(pluginResolvePath)) {
    return pluginResolvePath;
  }

  return pluginName;
}