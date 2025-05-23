import {Context} from '@actions/github/lib/context'
import * as octokit from '@octokit/rest'

export async function getChangedFiles(
  context: Context,
  client: octokit.Octokit
): Promise<string[]> {
  if (!['push', 'pull_request'].includes(context.eventName)) {
    throw new Error(`Unexpected event: ${context.eventName}`)
  }

  // Note: the per_page param is set to the max value for a single page (100)
  // TODO: implement pagination to get all files if > 100
  // TODO: use graphql api
  const files = await client.rest.pulls.listFiles({
    owner: context.issue.owner,
    repo: context.issue.repo,
    // eslint-disable-next-line @typescript-eslint/camelcase
    pull_number: context.issue.number,
    // eslint-disable-next-line @typescript-eslint/camelcase
    per_page: 100
  })

  return files.data.map(x => x['filename'])
}
