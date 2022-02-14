import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { sep } from 'path';
import * as webpack from 'webpack';

const POINTER_FILENAME = 'pointer.current';
const URL_VER = 'v1';

export default class CreatePointerFilePlugin {
  public constructor(private readonly outputPath: string, private readonly outputName: string) {}
  apply(compiler: webpack.Compiler) {
    compiler.hooks.emit.tap('CreatePointerFilePlugin', (compilation) => {
      const pointerPath = compilation.hash;
      const destDir = this.outputPath.slice(0, -7);
      writeFileSync(
        destDir + sep + pointerPath + sep + POINTER_FILENAME,
        sep + URL_VER + sep + destDir + sep + this.outputName
      );
    });
  }

  createDirectory(path) {
    const pathComponents = path.split(sep);
    for (let index = 1; index <= pathComponents.length; index++) {
      const pathToCheck = pathComponents.slice(0, index).join(sep);
      if (pathToCheck.trim().length === 0) {
        continue;
      }
      if (existsSync(pathToCheck)) {
        continue;
      }

      mkdirSync(pathToCheck);
    }
  }
}
