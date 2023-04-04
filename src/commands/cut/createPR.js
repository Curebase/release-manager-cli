import util from 'util';
import { exec } from 'child_process';
import { BASE_PATH } from '../../env';

// Promisify the exec function
const execPromise = util.promisify(exec);

// Define the command to execute
const githubCreatePR = (version) =>
  `gh pr create -B master -t "Release ${version}" --body "# [JIRA: Release ${version}](https://curebase.atlassian.net/projects/APP?contains=${version}&orderField=RANK&selectedItem=com.atlassian.jira.jira-projects-plugin%3Arelease-page&status=all)"`;

const createPR = async (version) => {
  /**
   [createPR]: {
     stdout: 'https://github.com/Curebase/web-app/pull/<number>\n',
     stderr: ''
    }
   */
  const output = await execPromise(githubCreatePR(version), { cwd: BASE_PATH });
  console.log('Release PR:', output?.stdout);

  return output?.stdout;
};

export default createPR;
