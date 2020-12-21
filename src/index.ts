#!/usr/bin/env node

import { program } from 'commander'

import { sendNotification } from './notification'
import { nameChannel } from './name-channel'

program.version('1.0.0')

const {
  RELEASE_CHANNEL: defaultReleaseChannel,
  SEMAPHORE_GIT_PR_NUMBER: defaultPrNumber,
  SEMAPHORE_GIT_PR_SHA: defaultCommitHash,
  SEMAPHORE_GIT_PR_BRANCH: defaultBranchName,
  GITHUB_ACCESS_TOKEN: defaultGithubAccessToken,
} = process.env

program.name('expo-review-apps').description(`
Some glue and duct-tape that helps you add review apps to your expo app')

All arguments can also be provided by the environment.
The defaults are based on semaphoreCi environment variables.
The mapping is as follows:

  RELEASE_CHANNEL: --channel
  SEMAPHORE_GIT_PR_NUMBER: --pr-number
  SEMAPHORE_GIT_PR_SHA: --sha
  SEMAPHORE_GIT_PR_BRANCH: --token
  GITHUB_ACCESS_TOKEN: --branch-name

General Usage example, using semaphore env:

  export RELEASE_CHANNEL=$(expo-review-apps channel-name)
  expo release --release-channel=$RELEASE_CHANNEL
  expo-review-apps notify --github-repo railslove/expo-review-apps\\
                          --expo-name @railslove/expo-review-apps
`)

program
  .command('channel-name')
  .description('Genearates the channel name based on the branch name')
  .option(
    '-b, --branch-name <branchName>',
    'GitHub branch name',
    defaultBranchName,
  )
  .action(nameChannel)

program
  .command('notify')
  .description('Generates the expo qr code and adds the comment to the pr')
  .option(
    '-c, --channel <channel>',
    'expo release channel',
    defaultReleaseChannel,
  )
  .requiredOption(
    '--expo-name <expoName>',
    'full qualified expo app name (@user/app)',
  )
  .requiredOption(
    '--github-repo <githubRepo>',
    'full qualified github repo name (user/repo)',
  )
  .option(
    '--pr-number <prNumber>',
    'GitHub pull request number',
    defaultPrNumber,
  )
  .option('--sha <sha>', 'Git commit sha', defaultCommitHash)
  .option(
    '-t, --token <token>',
    'GitHub access token',
    defaultGithubAccessToken,
  )
  .action(sendNotification)

program.parse(process.argv)
