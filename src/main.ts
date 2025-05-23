import * as core from '@actions/core'
import {getChangedFiles} from './getChangedFiles'
import * as github from '@actions/github'
import * as octokit from '@octokit/rest'
import {getCodeOwnersFromPaths} from './getCodeOwnersFromPaths'
import {getLabelsFromOwners, Label} from './getLabelsFromOwners'
import {applyLabels} from './applyLabels'

const toMap = (data: Map<any, any>) => new Map(Object.entries(data))

async function run(): Promise<void> {
  try {
    const client = <octokit.Octokit>(
      (<unknown>github.getOctokit(core.getInput('githubToken')))
    )
    const label_map = toMap(
      JSON.parse(core.getInput('owners-to-labels') ?? '{}')
    )

    // get all paths (file paths) changed in the PR
    const paths: string[] = await getChangedFiles(github.context, client)
    core.info(`Obtained paths: ${paths}`)

    // paths -> set of codeowners for the paths
    const owners: Set<string> = await getCodeOwnersFromPaths(paths)
    core.info(`Obtained owners for paths: ${Array.from(owners)}`)

    // set of codeowners -> set of labels
    const labels: Set<Label> = await getLabelsFromOwners(owners, label_map)
    core.info(
      `Obtained labels for change: ${JSON.stringify(Array.from(labels), null, 2)}`
    )

    // apply the set of labels to the PR
    await applyLabels(github.context, client, labels)
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message)
    }
  }
}

run()
