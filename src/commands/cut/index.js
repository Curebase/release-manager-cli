const simpleGit = require('simple-git');
const semver = require('semver');
import { BASE_PATH } from '../../env';
import createPR from './createPR';

const COMMAND_NAME = 'cut <type>';

const DESCRIPTION = 'Cut a release based on gitflow';

const action = async (type) => {
  const git = simpleGit().cwd(BASE_PATH);

  // checkout to master to get the list of tags
  await git.checkout('master');

  // Get the latest tag name
  const tags = await git.tags();
  console.log('TAGS:', tags);
  const latestTag = tags.latest;
  if (!latestTag) throw new Error('No git tags found!');

  // Determine the next version based on the type of release
  const nextVersion = semver.inc(latestTag, type);
  if (!nextVersion) throw new Error('Failed to generate next version!');

  // checkout back to develop to cut the release from it
  await git.checkout('develop');

  // Create a release branch
  const releaseBranch = `release/${nextVersion}`;
  await git.checkoutBranch(releaseBranch, 'develop');

  // Push release branch
  await git.push('origin', releaseBranch);

  await createPR(nextVersion);

  console.log(`Cut release version ${nextVersion}`);
};

export default {
  COMMAND_NAME,
  DESCRIPTION,
  action,
};
