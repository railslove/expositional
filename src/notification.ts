import { Octokit } from '@octokit/core'

export const sendNotification = function (options: {
  channel: string
  prNumber: string
  sha: string
  token: string
  expoName: string
  githubRepo: string
}): void {
  const { channel, prNumber, sha, token, expoName, githubRepo } = options

  if (prNumber == null) {
    console.log('Not a pull request, exiting')
    return
  }

  const expoLink = `exp://exp.host/${expoName}?release-channel=${channel}`
  const qrCodeLink = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURI(
    expoLink,
  )}`

  const body = `
    Successfully deployed ${sha} to expo release-channel ${channel}.

    ![](${qrCodeLink})
  `

  const octokit = new Octokit({ auth: token })

  octokit
    .request(`POST /repos/${githubRepo}/issues/{prNumber}/comments`, {
      githubRepo,
      prNumber,
      body,
    })
    .catch(console.error)
}
