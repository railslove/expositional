export const nameChannel = function (options: { branchName: string }): void {
  const { branchName } = options

  const channelName = branchName.replace('/', '-').toLowerCase()

  console.log(channelName)
}
