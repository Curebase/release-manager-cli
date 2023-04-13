import fs from 'fs';
import { BASE_PATH } from '../../env';

const updatePackageVersion = async (nextVersion, git) => {
  const PACKAGE_PATH = `${BASE_PATH}/package.json`;

  const packageJson = require(PACKAGE_PATH);
  packageJson.version = nextVersion;

  fs.writeFileSync(PACKAGE_PATH, JSON.stringify(packageJson, null, 2));

  await git.add('package.json');
  await git.commit(`feat: bump version to ${nextVersion}`);
};

export default updatePackageVersion;
