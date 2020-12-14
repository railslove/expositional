Some glue and duct-tape that helps you add review apps to your expo app')

Usage: expo-review-apps [options] [command]

All arguments can also be provided by the environment. The defaults are based on semaphoreCi environment variables.
The mapping is as follows:

```
RELEASE_CHANNEL: --channel
SEMAPHORE_GIT_PR_NUMBER: --pr-number
SEMAPHORE_GIT_PR_SHA: --sha
SEMAPHORE_GIT_PR_BRANCH: --token
GITHUB_ACCESS_TOKEN: --branch-name
```

General Usage example, using semaphore env:

```
export RELEASE_CHANNEL=$(expo-review-apps channel-name)
expo release --release-channel=$RELEASE_CHANNEL
expo-review-apps notify --github-repo railslove/expo-review-apps                        --expo-name @railslove/expo-review-apps
```

Options:
  -V, --version           output the version number
  -h, --help              display help for command

Commands:
  channel-name [options]  Genearates the channel name based on the branch name
  notify [options]        Generates the expo qr code and adds the comment to the pr
  help [command]          display help for command
