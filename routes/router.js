const { readdir } = require('node:fs/promises');
const path = require('node:path');

const getModulesDefinitions = async (modulesPath, specificRoute, doRequire = true) => {
  const files = await readdir(modulesPath);
  const parseRoute = (fileName) =>
    specificRoute && fileName in specificRoute[fileName]
      ? specificRoute[fileName]
      : `/${fileName.replace(/\.js$/i, '').replace(/_/g, '/')}`;
  const modules = files
    .reverse()
    .filter((file) => file.endsWith('.js'))
    .map((file) => {
      const identifier = file.split('.').shift();
      const route = parseRoute(file);
      const module = doRequire ? require(path.join(modulesPath, file)) : path.join(modulesPath, file);
      return { identifier, route, module };
    });
  return modules;
};

module.exports = getModulesDefinitions