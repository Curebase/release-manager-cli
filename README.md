# release-manager-cli
Release Manager CLI helps you run repetitive tasks for our Release Process. Because who got time for that right?


## Roadmap
- [] Cut Github Release
- [] Run workflow in Process Street
- [] Create Slack Thread
- [] Create Jira Release
- [] Create CR in Enzyme (challenge)
- [] Merge and deploy (select which envs)
- [] Send release notes on #general


# Install

Setup CLI running this:
```
./install.sh
```

Note: Make sure that `/usr/local/bin` is included in your system's PATH environment variable. If it's not, you can add it by editing your shell profile file (e.g. ~/.bash_profile, ~/.zshrc) and adding the following line:

```
export PATH="/usr/local/bin:$PATH"
```

ENV

Don't forget to change your path to web-app project on `/src/env.js`. We will improve this in the future.

## Cut Github Release

Release
```
mycli cut minor
```

Hotfix
```
mycli cut patch --hotfix
```


