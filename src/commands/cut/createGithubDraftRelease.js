import util from 'util';
import { exec } from 'child_process';
import { BASE_PATH } from '../../env';

console.log('PARAMS:', process.argv);

// Promisify the exec function
const execPromise = util.promisify(exec);

// Define the command to execute
const githubReleaseCreate = (version) =>
  `gh release create "${version}" --draft --notes "### [JIRA: Release ${version}](https://curebase.atlassian.net/projects/APP?contains=${version}&orderField=RANK&selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page&status=all)" --title "Release ${version}" --target master`;

const createGithubDraftRelease = async (version) => {
  const output = await execPromise(githubReleaseCreate(version), {
    cwd: BASE_PATH,
  });
  console.log('Github Release:', output?.stdout);

  return output?.stdout;
};

export default createGithubDraftRelease;
