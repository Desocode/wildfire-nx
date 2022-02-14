import { Configuration } from 'webpack';
import CreatePointerFilePlugin from './CreatePointerFilePlugin';

module.exports = function (baseConfig: Configuration) {
  baseConfig.output.filename = 'bundle.js';
  baseConfig.plugins = [new CreatePointerFilePlugin(baseConfig.output.path, baseConfig.output.filename)];
  return baseConfig;
};
