import { basename, dirname, normalize, Path, PathFragment } from '@angular-devkit/core';

export interface Location {
  name: string;
  path: Path;
}

export function parseName(options: any): Location {
  const { name, path, dirName, feature, parentDir } = options;
  const nameWithoutPath = basename(name as Path);
  const namePath = dirname((path + '/' + name) as Path);
  const normalizedPath = feature
    ? normalizeFeaturePath({
      dirName,
      namePath,
      nameWithoutPath,
      parentDir
    })
    : normalize('/' + namePath);

  return {
    name: nameWithoutPath,
    path: normalizedPath
  };
}

function normalizeFeaturePath(options: {
  dirName: string;
  namePath: Path;
  nameWithoutPath: PathFragment;
  parentDir: string;
}): Path {
  const { dirName, namePath, nameWithoutPath, parentDir } = options;

  return parentDir
    ? normalize('/' + namePath + '/' + parentDir + '/' + nameWithoutPath)
    : normalize('/' + namePath + '/' + dirName);
}
