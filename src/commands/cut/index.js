const simpleGit = require('simple-git');
const semver = require('semver');
import { BASE_PATH } from '../../env';
import createPR from './createPR';
import createGithubDraftRelease from './createGithubDraftRelease';
import updatePackageVersion from './updatePackageVersion';

const COMMAND_NAME = 'cut <type>';

const DESCRIPTION = 'Cut a release based on gitflow';

const OPTIONS = [
  {
    name: '--hotfix',
    description:
      'With this option the release will be cut from master and not develop',
  },
];

const action = async (type, options) => {
  console.log({ type, options });
  const git = simpleGit().cwd(BASE_PATH);

  // checkout to master to get the list of tags
  await git.checkout('master');
  await git.pull();

  // Get the latest tag name
  const tags = await git.tags();
  const latestTag = tags.latest;

  console.log('latest tag:', latestTag);

  if (!latestTag) throw new Error('No git tags found!');

  // Determine the next version based on the type of release
  const nextVersion = semver.inc(latestTag, type);
  if (!nextVersion) throw new Error('Failed to generate next version!');

  console.log('nextVersion:', nextVersion);

  // checkout back to develop to cut the release from it
  if (!options.hotfix) await git.checkout('develop');

  // Create a release branch
  console.log(`Cut release version ${nextVersion}`);
  const releaseBranch = `release/${nextVersion}`;
  await git.checkoutBranch(
    releaseBranch,
    options.hotfix ? 'master' : 'develop'
  );

  await updatePackageVersion(nextVersion, git);

  // Push release branch
  await git.push(['--set-upstream', 'origin', releaseBranch]);

  await createPR(nextVersion);
  await createGithubDraftRelease(nextVersion);
};

export default {
  COMMAND_NAME,
  DESCRIPTION,
  OPTIONS,
  action,
};
