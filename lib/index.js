#!/usr/bin/env ts-node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var notification_1 = require("./notification");
var name_channel_1 = require("./name-channel");
commander_1.program.version('1.0.0');
var _a = process.env, defaultReleaseChannel = _a.RELEASE_CHANNEL, defaultPrNumber = _a.SEMAPHORE_GIT_PR_NUMBER, defaultCommitHash = _a.SEMAPHORE_GIT_PR_SHA, defaultBranchName = _a.SEMAPHORE_GIT_PR_BRANCH, defaultGithubAccessToken = _a.GITHUB_ACCESS_TOKEN;
commander_1.program.name('expo-review-apps').description("\nSome glue and duct-tape that helps you add review apps to your expo app')\n\nAll arguments can also be provided by the environment.\nThe defaults are based on semaphoreCi environment variables.\nThe mapping is as follows:\n\nRELEASE_CHANNEL: --channel\nSEMAPHORE_GIT_PR_NUMBER: --pr-number\nSEMAPHORE_GIT_PR_SHA: --sha\nSEMAPHORE_GIT_PR_BRANCH: --token\nGITHUB_ACCESS_TOKEN: --branch-name\n\nGeneral Usage example, using semaphore env:\n\nexport RELEASE_CHANNEL=$(expo-review-apps channel-name)\nexpo release --release-channel=$RELEASE_CHANNEL\nexpo-review-apps notify --github-repo railslove/expo-review-apps\\\n                        --expo-name @railslove/expo-review-apps\n");
commander_1.program
    .command('channel-name')
    .description('Genearates the channel name based on the branch name')
    .option('-b, --branch-name <branchName>', 'GitHub branch name', defaultBranchName)
    .action(name_channel_1.nameChannel);
commander_1.program
    .command('notify')
    .description('Generates the expo qr code and adds the comment to the pr')
    .option('-c, --channel <channel>', 'expo release channel', defaultReleaseChannel)
    .requiredOption('--expo-name <expoName>', 'full qualified expo app name (@user/app)')
    .requiredOption('--github-repo <githubRepo>', 'full qualified github repo name (user/repo)')
    .option('--pr-number <prNumber>', 'GitHub pull request number', defaultPrNumber)
    .option('--sha <sha>', 'Git commit sha', defaultCommitHash)
    .option('-t, --token <token>', 'GitHub access token', defaultGithubAccessToken)
    .action(notification_1.sendNotification);
commander_1.program.parse(process.argv);
