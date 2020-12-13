const { Octokit } = require('@octokit/core')

const {
  RELEASE_CHANNEL: release_channel,
  SEMAPHORE_GIT_PR_NUMBER: pr_number,
  SEMAPHORE_GIT_PR_SHA: commit_hash,
  GITHUB_ACCESS_TOKEN: github_access_token,
} = process.env

if (pr_number == null) {
  console.log('Not a pull request, exiting')
  process.exit()
}

const expo_link = `exp://exp.host/@railslove/fleetbee?release-channel=${release_channel}`
const qr_code_link = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURI(
  expo_link,
)}`

const body = `
  Successfully deployed ${commit_hash} to expo release-channel ${release_channel}.

  ![](${qr_code_link})
`

const octokit = new Octokit({ auth: github_access_token })

octokit
  .request('POST /repos/eMobilityDV/fleetbee/issues/{pr_number}/comments', {
    owner: 'eMobilityDV',
    repo: 'fleetbee',
    pr_number,
    body,
  })
  .catch(console.error)
