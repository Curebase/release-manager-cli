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


# How it works

Setup CLI running this:
```
./install.sh
```

Note: Make sure that `/usr/local/bin` is included in your system's PATH environment variable. If it's not, you can add it by editing your shell profile file (e.g. ~/.bash_profile, ~/.zshrc) and adding the following line:

```
export PATH="/usr/local/bin:$PATH"
```

## Cut Github Release
