"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
var core_1 = require("@octokit/core");
var sendNotification = function (options) {
    var channel = options.channel, prNumber = options.prNumber, sha = options.sha, token = options.token, expoName = options.expoName, githubRepo = options.githubRepo;
    if (prNumber == null) {
        console.log('Not a pull request, exiting');
        return;
    }
    var expoLink = "exp://exp.host/" + expoName + "?release-channel=" + channel;
    var qrCodeLink = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" + encodeURI(expoLink);
    var body = "\n    Successfully deployed " + sha + " to expo release-channel " + channel + ".\n\n    ![](" + qrCodeLink + ")\n  ";
    var octokit = new core_1.Octokit({ auth: token });
    octokit
        .request('POST /repos/{githubRepo}/issues/{pr_number}/comments', {
        githubRepo: githubRepo,
        prNumber: prNumber,
        body: body,
    })
        .catch(console.error);
};
exports.sendNotification = sendNotification;
