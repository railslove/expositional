export const nameChannel = function({ branchName }) {
  const channelName = branchName.replace('/', '-').toLowerCase()

  console.log(channelName)
}
