import { Octokit } from "octokit";

const core = require('@actions/core');
const github = require('@actions/github');
const ghToken = core.getInput('org-admin-token');
const targetRepoName = core.getInput('repo-name');
const targetRepoDescription = core.getInput('repo-description');
const targetOrgName = github.context.payload.repository.owner.login;
const templateName = core.getInput('template-name')

const octokit = new Octokit({
    auth: ghToken
})

await octokit.request('POST /repos/{template_owner}/{template_repo}/generate', {
    template_owner: targetOrgName,
    template_repo: templateName,
    owner: targetOrgName,
    name: targetRepoName,
    description: targetRepoDescription,
    include_all_branches: false,
    'private': false,
    headers: {
        'X-GitHub-Api-Version': '2022-11-28'
    }
}).then(function (response) {
    console.log("Repo "+targetRepoName+' created successfully!');
    core.setOutput("repo-url", "https://github.com/"+targetOrgName+"/"+targetRepoName);
}).catch(function (error) {
    core.setOutput("repo-url", "");
    core.setFailed(error.message);
});